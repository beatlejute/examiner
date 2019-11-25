// @ts-ignore
const fork = require('child_process').fork;
const config = require('config-js');
const conf = new config('examconfig.js');

export function exam(func: any, context: any) {
    const inquirer = fork(__dirname + '/inquirer.js');
    const module = context.exports[func.name] === func
        ? context
        : context.children.find((m: any) => m.exports[func.name] === func);
    return function mutant(this: any) {
        const ret = func.apply(this, arguments);

        inquirer.send({
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
