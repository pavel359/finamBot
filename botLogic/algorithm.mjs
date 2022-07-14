import{timeStamp} from "./timeStamp.mjs";
import {moveStopLoss} from "./moveStopLoss.mjs";
import {closePosition} from "./closePosition.mjs";
import {getSignal} from "./getSignal.mjs";

let arrTrades = []

function openPosition(data, timer, timing, stopLossCoefficient, keyPercent, botVersion, logFileName) {
    let ticker = data[0]['<TICKER>']
    let logFileDir = `botLogic/logs/${logFileName}`
    let share = {
        signal : false,
        currentAveragePrice : 0,
        pastAveragePrice : 0,
        currentPercent : 0,
        pastPercent : 0,
        pastPastPercent : 0,
        stopLoss : 0,
        openPositionPrice : 0,
        openPositionTime : 0,
        closePositionPrice: 0,
        closePositionTime: 0,
        position : undefined
    }
    for (let prop of data) {
        if (timeStamp(prop['<TIME>']) <= timer) {
            arrTrades.push(Number(prop['<LAST>']))
        } else {
            let price = 0;
            let i = 0;
            for (let trade of arrTrades) {
                price += trade
                i++
            }
            share.pastAveragePrice = share.currentAveragePrice
            share.currentAveragePrice = price/i

            if (share.signal == true) {
                share.stopLoss = moveStopLoss(share, stopLossCoefficient)
                share.closePositionPrice = Number(prop['<LAST>'])
                share.closePositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
                closePosition(ticker, share, logFileDir)
            }

            share.pastPastPercent = share.pastPercent
            share.pastPercent = share.currentPercent

            if (share.pastAveragePrice !=0 && share.currentAveragePrice !=0) {
                share.currentPercent = (share.currentAveragePrice - share.pastAveragePrice) / share.pastAveragePrice
            }

            if (share.signal != true) {
                getSignal(prop, share, keyPercent, stopLossCoefficient, botVersion)
            }

            arrTrades = []
            while (timer < timeStamp(prop['<TIME>'])) {
                timer += timing
            }
            arrTrades.push(Number(prop['<LAST>']))
        }
    }
    if (share.signal == true) {
        let end = true
        closePosition(ticker, share, logFileDir, end)
    }
}

export {openPosition}
