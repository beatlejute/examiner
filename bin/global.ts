import rewire from "rewire";
import {exam} from "../src/index";

export function run(argv: any) {

    let traineeModule: string;
    let traineeFunction: string;
    let traineeArguments: string;
    let traineeModuleObj: any = {};
    let traineeModuleFuncs: any = [];

    let step: number = 0;

    const getModuleStep = (module: string): void => {
        traineeModuleObj = rewire(module);
        traineeModuleFuncs = Object.keys(traineeModuleObj);
        // tslint:disable-next-line:no-console
        console.log("Enter trainee function:");
        if (traineeModuleFuncs.length) {
            // tslint:disable-next-line:no-console
            console.log("\x1b[32m", "Select number of trainee function or enter name:");
            // tslint:disable-next-line:forin
            for (const index in traineeModuleFuncs) {
                // tslint:disable-next-line:no-console
                console.log("\x1b[32m", index + ":", traineeModuleFuncs[index]);
            }
        }
    };
    const getFunctionStep = (func: string): void => {
        traineeFunction = traineeModuleFuncs[func] ?? func;
        // tslint:disable-next-line:no-console
        console.log("Select " + traineeFunction + " function");
        // tslint:disable-next-line:no-console
        console.log("Enter input arguments object:");
    };
    const createTest = (): void => {
        const trainee = exam(
            traineeModuleObj[traineeFunction] ?? traineeModuleObj.__get__(traineeFunction),
            module.children[module.children.length - 1],
        );
        // @ts-ignore
        trainee.apply(this, Object.values(JSON.parse(traineeArguments)));
    };

    if (argv.module) {//console.log(rewire('src/P2P/utils'));
        traineeModule = argv.module;
        // tslint:disable-next-line:no-var-requires
        traineeModuleObj = rewire(traineeModule);
        step++;

        if (argv.function) {
            traineeFunction = argv.function;
            step++;

            if (argv.arguments) {
                traineeArguments = argv.arguments;
                step++;
                createTest();

            } else {
                getFunctionStep(traineeFunction);
            }
        } else {
            getModuleStep(traineeModule);
        }
    } else {
        // tslint:disable-next-line:no-console
        console.log("Enter trainee module:");
    }

    const stdin = process.openStdin();
    stdin.on("data", (chunk) => {
        const answer = chunk.toString().trim() || 0;

        switch (step) {
            case 0:
                traineeModule = answer;
                getModuleStep(traineeModule);
                break;
            case 1:
                traineeFunction = answer;
                getFunctionStep(traineeFunction);
                break;
            case 2:
                traineeArguments = answer;
                createTest();
                break;
        }

        step++;
    });
}
