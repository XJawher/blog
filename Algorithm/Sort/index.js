// import {insert} from './Insert'
const {insert} = require('./insert');
const {quickBase} = require('./quick');


// const demoArray = [10, 9, 3, 44, 33, 2, 31, 9, 81, 2, 34, 4, 53, 3];

const demoArray = [];

for (let index = 0; index < 10000; index++) {
    demoArray.push(Math.floor(Math.random() * index));
}

console.time('quickBase');
const quickBaseArray = quickBase(demoArray)
console.timeEnd('quickBase');
console.log(quickBaseArray);


const insertArray = insert(demoArray)
console.log(insertArray);