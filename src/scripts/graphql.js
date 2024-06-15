// addToPersistedOperations.js
const { promises: fsp } = require("fs");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

function findPkgRoot(currentDir) {
  const packagePath = path.join(currentDir, "package.json");

  if (fs.existsSync(packagePath)) {
    return currentDir;
  }

  return findPkgRoot(path.join(currentDir, ".."));
}
function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function main() {
  const pkgRoot = findPkgRoot(__dirname);
  const jsonExists = fs.existsSync(pkgRoot, "allowlist.json");
  if (!jsonExists) {
    throw new Error(`Expected to find allowlist.json at ${pkgRoot}`);
  }

  const file = fs.readFileSync(path.join(pkgRoot, "allowlist.json"));
  const allowlist = JSON.parse(file.toString("utf-8"));
  console.log(allowlist);
  await Promise.all(
    Object.values(allowlist).map((query) => {
      const hash = sha256(query);
      const graphqlPart = `${hash}.graphql`;
      const filePath = path.join(
        pkgRoot,
        "src",
        "postgraphile",
        "allowlist",
        graphqlPart
      );

      console.log(filePath);

      return fsp.writeFile(filePath, query);
    })
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
