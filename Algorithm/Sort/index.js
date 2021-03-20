// import {insert} from './Insert'
const {insert} = require('./insert');
const {quickBase} = require('./quick');


const demoArray = [1, 9, 3, 44, 33, 2, 31, 9, 81, 2, 34, 4, 53, 3];

const insertArray = insert(demoArray)
const quickBaseArray = quickBase(demoArray)

console.log(insertArray);
// console.log(quickBaseArray);