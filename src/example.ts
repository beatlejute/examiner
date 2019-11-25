import {exam} from './index';
import {test} from './test';

const testEx = exam(test, module);
// @ts-ignore
testEx(2);
