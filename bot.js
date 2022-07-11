import fs from 'fs'
import path from 'path'

let tickers =  [
    "NFLX"
]

import * as s5 from "./algorithms/s5.js"; // импорт функционала модуля plus.js как объекта obj
import * as s5v2 from "./algorithms/s5v2.js";
import * as s3 from './algorithms/s3.js';
import * as s3v2 from './algorithms/s3v2.js';

for (let ticker of tickers) {
    let data = fs.readFileSync(`finamExport/dist/SPB_Exchange/${ticker}.json`);
    data = JSON.parse(data);
    s5.openPosition(data)
    s5v2.openPosition(data)
    s3.openPosition(data)
    s3v2.openPosition(data)
}