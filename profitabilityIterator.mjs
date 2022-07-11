let tickers = [
    "AAPL", "MSFT", "GOOGL", "GOOG", "TSLA", "NVDA", "UNH", "JNJ", "V",
    "JPM", "PG", "MA", "BAC", "CVX", "HD", "BABA", "PFE", "LLY", "KO",
    "AVGO", "COST", "CSCO", "ADBE", "VZ", "NKE", "CRM", "INTC", "WFC",
    "AMD", "QCOM", "BMY", "PYPL", "LOW", "BA", "C", "JD", "MU", "SHOP",
    "SQ", "MRNA", "PANW", "OXY", "PLAN", "NFLX", "DOCU"
]

import fs from 'fs'
import path from 'path'

var getFiles = function (dir, files_){

    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};

let arrDir = getFiles('./algorithms/logs');

for (let dir of arrDir) {
    let file = fs.readFileSync(dir, {encoding:'utf8', flag:'r'});
    let profit
    console.log(dir)
    for (let prop of file) {
        console.log(prop.ticker)
        console.log(prop.profitability)
        prop += prop.profitability
    }
    console.log(profit)
}
