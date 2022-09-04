import fs from 'fs'
import {getDate} from "./botLogic/getDate.mjs";
import {createLog} from "./botLogic/createLog.mjs";
import * as algorithm from './botLogic/algorithm.mjs'
import EventEmitter from "node:events";

let tickers = [
    "NFLX"
]
let startDate = "4.8.2022"
const endDate = "1.3.2022"

const logFileName1 = await createLog(5, 'v1')
const logFileName2 = await createLog(10, 'v2')
const logFileName3 = await createLog(15, 'v3')
const logFileName4 = await createLog(20, 'v4')
let logs = [logFileName1, logFileName2, logFileName3, logFileName4]

async function main () {
    while (startDate != endDate) {
        for (let ticker of tickers) {
            let data
            try {
                data = fs.readFileSync(`finamExport/dist/SPB_Exchange/${startDate}/${ticker}.json`);
            } catch (e) {
                continue;
            }

            data = JSON.parse(data);
            algorithm.openPosition(data, 52204, 5, [0.95, 1.05], 0.02, 'v1', logFileName1)
            algorithm.openPosition(data, 52204, 5, [0.95, 1.05], 0.02, 'v2', logFileName2)
            algorithm.openPosition(data, 52202, 3, [0.93, 1.05], 0.017, 'v1', logFileName3)
            algorithm.openPosition(data, 52202, 3, [0.93, 1.07], 0.014, 'v2', logFileName4)
        }
        startDate = getDate(startDate)
    }
}

await main()

for (let log of logs) {
    let data
    data = fs.readFileSync(`botLogic/logs/${log}.json`);

    if (data.length <= 2) {
        fs.unlinkSync(`botLogic/logs/${log}.json`,)
    }
}