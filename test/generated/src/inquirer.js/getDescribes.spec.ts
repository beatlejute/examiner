
import {assert, expect} from "chai";
import {getDescribes} from "../../../../src/inquirer";
import {mock} from "../../../../test/generated/mocks/src/inquirer.js/getDescribes";
const mockArr: any = Object.values(mock);


describe("inquirer/getDescribes", () => {
    it("Test result", () => {
        assert.equal(JSON.stringify(getDescribes.apply(this, Object.values(mockArr[0].input))) ,JSON.stringify(mockArr[0].output), "Get describes");
    });
});
