import fs from 'fs'
import path from 'path'

let tickers = [
    "AAPL", "MSFT", "GOOGL", "GOOG", "TSLA", "NVDA", "UNH", "JNJ", "V",
    "JPM", "PG", "MA", "BAC", "CVX", "HD", "BABA", "PFE", "LLY", "KO",
    "AVGO", "COST", "CSCO", "ADBE", "VZ", "NKE", "CRM", "INTC", "WFC",
    "AMD", "QCOM", "BMY", "PYPL", "LOW", "BA", "C", "JD", "MU", "SHOP",
    "SQ", "MRNA", "PANW", "OXY", "PLAN", "NFLX", "DOCU"
]

import * as s5 from "./algorithms/s5.mjs"; // импорт функционала модуля plus.js как объекта obj
import * as s5v2 from "./algorithms/s5v2.mjs";
import * as s3 from './algorithms/s3.mjs';
import * as s3v2 from './algorithms/s3v2.mjs';

for (let ticker of tickers) {
    let data = fs.readFileSync(`finamExport/dist/SPB_Exchange/${ticker}.json`);
    data = JSON.parse(data);
    s5.openPosition(data)
    s5v2.openPosition(data)
    s3.openPosition(data)
    s3v2.openPosition(data)
}