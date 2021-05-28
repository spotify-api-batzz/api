const esbuild = require("esbuild");
const { readFileSync } = require("fs");

const localPkgJson = JSON.parse(readFileSync("./package.json", "utf-8"));

const acceptedArgs = ["watch"];

const applyArg = (arg, args) => {
  switch (arg) {
    case "watch":
      args.watch = true;
      return args;
    default:
      return args;
  }
};

async function main() {
  let extraArgs = {
    watch: false,
  };
  process.argv
    .filter((v) => acceptedArgs.includes(v))
    .forEach((arg) => (extraArgs = applyArg(arg, extraArgs)));
  await esbuild.build({
    entryPoints: [`src/app.ts`],
    bundle: true,
    target: "esm",
    outfile: "dist/esbuild-main.js",
    ...extraArgs,
    sourcemap: true,
    external: Object.keys({
      ...(localPkgJson.dependencies || {}),
      ...(localPkgJson.devDependencies || {}),
      ...(localPkgJson.peerDependencies || {}),
    }),
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
