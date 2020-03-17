#!/usr/bin/env node
const argv = require("minimist")(process.argv.slice(2), {
    alias: {
        a: "arguments",
        f: "function",
        m: "module",
    },
});
if (argv["amd-loader"]) {
    require("amd-loader");
}
require("ts-node").register({project: "test/tsconfig.json"});
require("./global.ts").run(argv);
