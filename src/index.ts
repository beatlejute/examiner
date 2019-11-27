import config from "config-js";
const conf = new config("examconfig.js");
import {inquirer} from "../src/inquirer.js";

export function exam(func: any, context: any) {
    const module = context.exports[func.name] === func
        ? context
        : context.children.find((m: any) => m.exports[func.name] === func);
    return function mutant(this: any) {
        const ret = func.apply(this, arguments);

        inquirer({
            [JSON.stringify(arguments)]: {
                input: arguments,
                output: ret,
            },
            funcName: func.name,
            fileName: module.filename.split(conf.get("mainCat"))[1],
        });

        return ret;
    };
}
