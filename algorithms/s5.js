import{timeStamp} from "./timeStamp.js";
import {moveStopLoss} from "./moveStopLoss.js";
import {closePosition} from "./closePosition.js";

let timer1 = 52205 // 14:30:05
let arrTrades = []
let timing = '5s'
let dirName = 'algorithms/logs/s5.json'
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
        if (timeStamp(prop['<TIME>']) <= timer1) {
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
            if ((share[`${ticker}`].currentPercent <=-0.02 && share[`${ticker}`].pastPercent <=-0.02) || (share[`${ticker}`].currentPercent >=0.02 && share[`${ticker}`].pastPercent >=0.02)) {
                if (share[`${ticker}`].signal != true) {
                    share[`${ticker}`].openPositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
                    share[`${ticker}`].openPositionPrice = Number(prop['<LAST>'])
                    share[`${ticker}`].position = (share[`${ticker}`].currentPercent > 0) ? 'long' : 'short';
                    if (share[`${ticker}`].position == 'long') {
                        share[`${ticker}`].stopLoss = share[`${ticker}`].openPositionPrice * 0.95
                    } else share[`${ticker}`].stopLoss = share[`${ticker}`].openPositionPrice * 1.05
                    console.log(Number(prop['<LAST>']))
                    console.log(prop['<TIME>'])
                }
                share[`${ticker}`].signal = true
            }
            arrTrades = []
            while (timer1 < timeStamp(prop['<TIME>'])) {
                timer1 += 5
            }
            arrTrades.push(Number(prop['<LAST>']))
        }
    }
    let end = true
    closePosition(ticker, share[`${ticker}`], dirName, end)
}

export {openPosition}