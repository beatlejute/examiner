// @ts-ignore
import config from "config-js";
const conf: any = new config("examconfig.js");
import {inquirer} from "../src/inquirer.js";

/**
 * Mutator for listen function inputs and outputs.
 * Create unit tests.
 * @param func Function for which you need to create tests.
 * @param context Scope for function
 * @returns mutant Function with listener for create test
 */
export function exam(func: any, context: any) {
    const module = (
        context.exports[func.name] === func
        ? context
        : context.children.find((m: any) => m.exports[func.name] === func)
    ) ?? context;
    return function mutant(this: any) {
        let ret: any;
        let isThrow: boolean = false;
        try {
            ret = func.apply(this, arguments);
        } catch (e) {
            isThrow = true;
            ret = e;
        }

        const filename = module.filename.split(conf.get("mainCat"))[1] ?? module.filename;

        inquirer({
            [JSON.stringify(arguments)]: {
                input: arguments,
                output: ret,
                throw: isThrow,
            },
            fileName: filename.replace(/^\/+|\/+$/g, ""),
            funcName: func.name,
        });

        return ret;
    };
}
