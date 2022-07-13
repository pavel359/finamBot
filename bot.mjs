import fs from 'fs'
import path from 'path'
import {getDate} from "./algorithms/getDate.mjs";

let tickers = [
    "NFLX"
]

import * as s5 from "./algorithms/s5.mjs";
import * as s5v2 from "./algorithms/s5v2.mjs";
import * as s3 from './algorithms/s3.mjs';
import * as s3v2 from './algorithms/s3v2.mjs';
let startDate = "12.7.2022"
let endDate = "12.6.2022"
while (startDate != endDate) {
    for (let ticker of tickers) {
        let data
        try {
            data = fs.readFileSync(`finamExport/dist/SPB_Exchange/${startDate}/${ticker}.json`);
        } catch (e) {
            continue;
        }
        data = JSON.parse(data);
        s5.openPosition(data)
        s5v2.openPosition(data)
        s3.openPosition(data)
        s3v2.openPosition(data)
    }
    startDate = getDate(startDate)
}
