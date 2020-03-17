#!/usr/bin/env node
import fs from "fs";
// @ts-ignore
import conf from "../examconfig.js";

let step: number = 0;

// tslint:disable-next-line:no-console
console.log("\x1b[32m", "Enter root catalog path (or empty for " + conf.mainCat + "):");

const stdin = process.openStdin();
stdin.on("data", (chunk) => {
    const answer = chunk.toString().trim() || 0;

    switch (step) {

        case 0:
            if (answer) {
                conf.mainCat = answer;
            }
            // tslint:disable-next-line:no-console
            console.log("\x1b[32m", "Enter tests catalog path (or empty for " + conf.testsCat + "):");
            break;
        case 1:
            if (answer) {
                conf.testsCat = answer;
            }
            // tslint:disable-next-line:no-console
            console.log("\x1b[32m", "Enter mocks catalog path (or empty for " + conf.mocksCat + "):");
            break;
        case 2:
            if (answer) {
                conf.mocksCat = answer;
            }
            // tslint:disable-next-line:no-console
            console.log("\x1b[32m", "Enter postfix for test files (or empty for " + conf.testFilePostfix + "):");
            break;
        case 3:
            if (answer) {
                conf.testFilePostfix = answer;
            }
            // tslint:disable-next-line:no-console
            console.log("\x1b[32m", "Enter postfix for mock files (or empty for " + conf.mockFilePostfix + "):");
            break;
        case 4:
            if (answer) {
                conf.mockFilePostfix = answer;
            }
            fs.writeFileSync("examconfig.js", "module.exports = " + JSON.stringify(conf), "utf8");
            // tslint:disable-next-line:no-console
            console.log("\x1b[32m", "Config generated!");
            process.exit();
            break;
        default:
            // tslint:disable-next-line:no-console
            console.log("ops");
            process.exit();
    }

    step++;
});
