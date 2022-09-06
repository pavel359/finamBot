import{timeStamp} from "./timeStamp.mjs";
import {moveStopLoss} from "./moveStopLoss.mjs";
import {closePosition} from "./closePosition.mjs";
import {getSignal} from "./getSignal.mjs";

function openPosition(data, timer, timing, stopLossCoefficient, keyPercent, botVersion, logFileName) {
    let arrTrades = []
    let ticker = data[0]['<TICKER>']
    let logFileDir = `botLogic/logs/${logFileName}`
    let share = {
        signal : false,
        lastPrice: 0,
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
        share.lastPrice = Number(prop['<LAST>'])

        if (share.signal == true) {
            share.stopLoss = moveStopLoss(share, stopLossCoefficient)
            share.closePositionPrice = share.lastPrice
            share.closePositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
            closePosition(ticker, share, logFileDir)
        }

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

            if (price == 0) {
                share.currentAveragePrice = 0
            } else share.currentAveragePrice = price/i

            share.pastPastPercent = share.pastPercent
            share.pastPercent = share.currentPercent

            if (share.pastAveragePrice !=0 && share.currentAveragePrice !=0) {
                share.currentPercent = (share.currentAveragePrice - share.pastAveragePrice) / share.pastAveragePrice
            }

            if (share.signal != true) {
                getSignal(prop, share, keyPercent, stopLossCoefficient, botVersion)
            }

            arrTrades = []
            let j = 0
            while (timer < timeStamp(prop['<TIME>'])) {
                timer += timing
                j++
                if (j>=2) {
                    share.pastPastPercent = share.pastPercent
                    share.pastPercent = share.currentPercent
                    share.currentPercent = 0
                    share.pastAveragePrice = share.currentAveragePrice
                    share.currentAveragePrice = 0
                }
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
