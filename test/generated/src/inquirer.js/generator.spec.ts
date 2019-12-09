
import {assert, expect} from "chai";
import {generator} from "../../../../src/inquirer";
import {mock} from "../../../../test/generated/mocks/src/inquirer.js/generator";
const mockArr: any = Object.values(mock);


describe("inquirer/generator", () => {
    it("Test result", () => {
        expect(() => generator.apply(this, Object.values(mockArr[0].input)), "Don't generated code").to.throw();
    });
});
