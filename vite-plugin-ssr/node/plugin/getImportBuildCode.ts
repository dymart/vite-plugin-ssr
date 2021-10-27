export { getImportBuildCode }
// import { getSsrEnv } from '../ssrEnv'

// const { serverDir } = getSsrEnv()
// const serverManifest = require("../../${serverDir}/server/manifest.json");

function getImportBuildCode(): string {
  return `const { pageFiles } = require("./pageFiles.js");
const clientManifest = require("../client/manifest.json");
const serverManifest = require("../server/manifest.json");
const { __private: { importBuild } } = require("vite-plugin-ssr");
importBuild({ pageFiles, clientManifest, serverManifest });
`
}
