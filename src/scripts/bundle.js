const esbuild = require("esbuild");
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
    minify: false,
    target: "node12",
    platform: "node",
    outfile: "dist/esbuild-main.js",
    ...extraArgs,
    external: ["pg", "pg-native", "graphql"],
    sourcemap: true,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
