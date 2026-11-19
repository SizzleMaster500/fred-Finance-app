import test from 'node:test';import assert from 'node:assert/strict';import {income,bills,spending,remaining,byCategory} from '../src/lib/finance.js';
const s={income:3000,bills:[{amount:1000}],transactions:[{amount:200,type:'expense',category:'Food'},{amount:100,type:'income',category:'Salary'}]};
test('monthly totals and remaining estimate',()=>{assert.equal(income(s),3100);assert.equal(bills(s),1000);assert.equal(spending(s),200);assert.equal(remaining(s),1900)});
test('spending chart excludes income',()=>assert.deepEqual(byCategory(s),[{name:'Food',value:200}]));
