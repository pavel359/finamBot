import fs from 'fs'
import path from 'path'
import {getDate} from "./botLogic/getDate.mjs";
import {createLog} from "./botLogic/createLog.mjs";
import * as algorithm from './botLogic/algorithm.mjs'

let tickers = [
    "NFLX"
]
let timer = 52202 // 14:30:02
let arrTrades = []
let timing = 3
let stopLoss = [0.93, 1.07]
let keyPercent = 0.014
let botVersion = 'v2'

let startDate = "19.4.2022"
let endDate = "18.4.2022"
let logFileName = createLog()

while (startDate != endDate) {
    for (let ticker of tickers) {
        let data
        try {
            data = fs.readFileSync(`finamExport/dist/SPB_Exchange/${startDate}/${ticker}.json`);
        } catch (e) {
            continue;
        }
        data = JSON.parse(data);
        algorithm.openPosition(data, timer, timing, stopLoss, keyPercent, botVersion, logFileName)
    }
    startDate = getDate(startDate)
}
