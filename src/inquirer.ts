// @ts-ignore
import config from "config-js";
import fs from "fs";
import path from "path";
const conf = new config("examconfig.js");

let testCase: any;
let key: string;
let mockFilename: string;
let testFilename: string;
let mock: any;
let describe: any = null;
let it: any;
let its: any;
let describes: any;

export const inquirer = (tcase: any): void => {
    testCase = tcase;
    key = JSON.stringify(Object.values(testCase as object)[0].input);

    mockFilename = conf.get("mainCat")
        + conf.get("mocksCat")
        + testCase.fileName
        + "/" + testCase.funcName
        + conf.get("mockFilePostfix");
    testFilename = conf.get("mainCat")
        + conf.get("testsCat")
        + testCase.fileName
        + "/" + testCase.funcName
        + conf.get("testFilePostfix");
    mock = fs.existsSync(mockFilename)
        ? JSON.parse(fs.readFileSync(mockFilename, "utf8").replace("export const mock = ", ""))
        : {};

    if (mock[key]) {
        // tslint:disable-next-line:no-console
        console.log("\x1b[32m", "This test already exist.");
        describe = mock[key].describe;
        it = mock[key].it;
    }
    describes = [...new Set(Object.values(mock)
        .filter((p: any) => p.describe && p.describe !== describe)
        .map((p: any) => p.describe))];
    if (describe) {
        describes.unshift(describe);
    }
    its = [...new Set(Object.values(mock)
        .filter((p: any) => p.it && p.it !== it)
        .map((p: any) => p.it))];
    if (it) {
        its.unshift(it);
    }

    if (describes.length) {
        // tslint:disable-next-line:no-console
        console.log("\x1b[32m", "Select number of test describe or enter new:");
        // tslint:disable-next-line:forin
        for (const index in describes) {
            // tslint:disable-next-line:no-console
            console.log("\x1b[32m", index + ":", describes[index]);
        }
    } else {
        // tslint:disable-next-line:no-console
        console.log("\x1b[32m", "Enter test describe:");
    }

    let step: number = 0;
    const stdin = process.openStdin();
    stdin.on("data", (chunk: any) => {
        const answer = chunk.toString().trim() || 0;

        switch (step) {
            case 0:
                testCase[key].describe = describes[answer] ?? answer;
                if (its.length) {
                    // tslint:disable-next-line:no-console
                    console.log("\x1b[32m", "Select number of test it or enter new:");
                    // tslint:disable-next-line:forin
                    for (const index in its) {
                        // tslint:disable-next-line:no-console
                        console.log("\x1b[32m", index + ":", its[index]);
                    }
                } else {
                    // tslint:disable-next-line:no-console
                    console.log("Enter test it:");
                }
                break;
            case 1:
                testCase[key].it = its[answer] ?? answer;
                // tslint:disable-next-line:no-console
                console.log("Enter test message:");
                break;
            case 2:
                testCase[key].message = answer;
                // tslint:disable-next-line:no-console
                console.log("Test generate complete.");

                const newMock = Object.assign(mock, testCase);
                fs.mkdirSync(path.dirname(mockFilename), {recursive: true});
                fs.writeFileSync(mockFilename, "export const mock = " + JSON.stringify(newMock), "utf8");
                fs.mkdirSync(path.dirname(testFilename), {recursive: true});
                fs.writeFileSync(testFilename, _generator(newMock, conf), "utf8");
                process.exit();
                break;
            default:
                // tslint:disable-next-line:no-console
                console.log("ops");
                process.exit();
        }

        step++;
    });
};

// tslint:disable-next-line:no-shadowed-variable
function _getDescribes(mock: any) {
    // tslint:disable-next-line:no-shadowed-variable
    const describes: any = {};
    // tslint:disable-next-line:no-shadowed-variable
    for (const key in mock) {
        if (mock[key].describe) {
            if (!describes[mock[key].describe]) {
                describes[mock[key].describe] = {};
            }
            if (!describes[mock[key].describe][mock[key].it]) {
                describes[mock[key].describe][mock[key].it] = {};
            }
            describes[mock[key].describe][mock[key].it][key] = mock[key];
        }
    }
    return describes;
}

// tslint:disable-next-line:no-shadowed-variable
function _generator(mock: any, conf: any) {
    // tslint:disable-next-line:no-shadowed-variable
    const describes: any = _getDescribes(mock);
    const mockArr = Object.values(mock);
    const backToRootPath = conf.get("mocksCat").split("/").fill("..").join("/");
    const mockFile = backToRootPath
        + conf.get("mocksCat")
        + mock.fileName
        + "/" + mock.funcName
        + conf.get("mockFilePostfix");

    let code = `
import {assert, expect} from "chai";
import {${mock.funcName}} from "${backToRootPath + "/"}${mock.fileName.replace(/.js+$/g, "")}";
import {mock} from "${mockFile.replace(/.ts+$/g, "")}";
const mockArr: any = Object.values(mock).filter((e) => typeof e === "object");

`;

    // tslint:disable-next-line:forin no-shadowed-variable
    for (const describe in describes) {
        code += `
describe("${describe}", () => {`;

        // tslint:disable-next-line:forin no-shadowed-variable
        for (const it in describes[describe]) {
            code += `
    it("${it}", () => {`;

            // tslint:disable-next-line:forin no-shadowed-variable
            for (const test in describes[describe][it]) {
                const index = mockArr.findIndex((t: any) => t.input === mock[test].input);

                code += `
        assert.equal(${mock.funcName}.apply(this, Object.values(mockArr[${index}].input)) ,mockArr[${index}].output, "${mock[test].message}");`;
            }

            code += `
    });`;
        }

        code += `
});`;
    }

    return code;
}
