import {initial} from './data';
const key='fred-prototype-v3';
export function load(){try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&typeof saved==='object')return {...structuredClone(initial),...saved}}catch{}return structuredClone(initial)}
export function persist(s){try{localStorage.setItem(key,JSON.stringify(s))}catch(e){console.warn('Could not save browser data',e)}}
