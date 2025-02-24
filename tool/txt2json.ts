import * as fs from 'fs';

const txtFilePath = './strict-sensitive-word.txt';
const txtContent = fs.readFileSync(txtFilePath, 'utf-8');

const sensitiveWordsArray = txtContent.split('\n').map(line => line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter(line => line.length > 0);
const jsonString = JSON.stringify(sensitiveWordsArray, null, 2);

const jsonFilePath = './sensitive-words.json';
fs.writeFileSync(jsonFilePath, jsonString, 'utf-8');

// const reg = new RegExp(`\\*统|维尼|维`, 'g');
// console.log('系统'.replace(reg, '*'));