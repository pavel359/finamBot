import{timeStamp} from "./timeStamp.mjs";
import {moveStopLoss} from "./moveStopLoss.mjs";
import {closePosition} from "./closePosition.mjs";

let timer2 = 52203 // 14:30:03
let arrTrades = []
let timing = '3s'
let dirName = 'algorithms/logs/s3.json'
function openPosition(data) {
    let ticker = data[0]['<TICKER>']
    let share = {
        [`${ticker}`] : {
            signal : false,
            currentAveragePrice : 0,
            pastAveragePrice : 0,
            currentPercent : 0,
            pastPercent : 0,
            stopLoss : 0,
            openPositionPrice : 0,
            openPositionTime : 0,
            closePositionPrice: 0,
            closePositionTime: 0,
            position : undefined
        }
    }
    for (let prop of data) {
        if (timeStamp(prop['<TIME>']) <= timer2) {
            arrTrades.push(Number(prop['<LAST>']))
        } else {
            let price = 0;
            let i = 0;
            for (let trade of arrTrades) {
                price += trade
                i++
            }
            share[`${ticker}`].pastAveragePrice = share[`${ticker}`].currentAveragePrice
            share[`${ticker}`].currentAveragePrice = price/i
            if (share[`${ticker}`].signal == true) {
                share[`${ticker}`].stopLoss = moveStopLoss(share[`${ticker}`].position, share[`${ticker}`].stopLoss, share[`${ticker}`].currentAveragePrice, timing)
                share[`${ticker}`].closePositionPrice = Number(prop['<LAST>'])
                share[`${ticker}`].closePositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
                closePosition(ticker, share[`${ticker}`], dirName)
            }
            share[`${ticker}`].pastPercent = share[`${ticker}`].currentPercent
            share[`${ticker}`].currentPercent = (share[`${ticker}`].currentAveragePrice - share[`${ticker}`].pastAveragePrice) / share[`${ticker}`].pastAveragePrice
            if ((share[`${ticker}`].currentPercent <=-0.017 && share[`${ticker}`].pastPercent <=-0.017) || (share[`${ticker}`].currentPercent >=0.017 && share[`${ticker}`].pastPercent >=0.017)) {
                if (share[`${ticker}`].signal != true) {
                    share[`${ticker}`].openPositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
                    share[`${ticker}`].openPositionPrice = Number(prop['<LAST>'])
                    share[`${ticker}`].position = (share[`${ticker}`].currentPercent > 0) ? 'long' : 'short';
                    if (share[`${ticker}`].position == 'long') {
                        share[`${ticker}`].stopLoss = share[`${ticker}`].openPositionPrice * 0.93
                    } else share[`${ticker}`].stopLoss = share[`${ticker}`].openPositionPrice * 1.07
                    console.log(Number(prop['<LAST>']))
                    console.log(prop['<TIME>'])
                }
                share[`${ticker}`].signal = true
            }
            arrTrades = []
            while (timer2 < timeStamp(prop['<TIME>'])) {
                timer2 += 3
            }
            arrTrades.push(Number(prop['<LAST>']))
        }
    }
    if (share[`${ticker}`].signal == true) {
        let end = true
        closePosition(ticker, share[`${ticker}`], dirName, end)
    }
}

export {openPosition}