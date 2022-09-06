import fs from 'fs'
function closePosition (ticker, share, logFIleDir, close = false) {
    if (share.position == 'long') {
        if (share.currentAveragePrice <= share.stopLoss) {
            close = true
        }
    }
    if (share.position == 'short') {
        if (share.currentAveragePrice >= share.stopLoss) {
            close = true
        }
    }
    if (close == true) {
        let profitability
        if (share.position == 'long') {
            profitability = (share.closePositionPrice - share.openPositionPrice) / share.openPositionPrice
        } else {
            profitability = (share.openPositionPrice - share.closePositionPrice)/ share.openPositionPrice
        }
        let obj = {
            ticker: ticker,
            openPositionPrice: share.openPositionPrice,
            direction: share.position,
            openPositionTime: share.openPositionTime,
            closePositionPrice: share.closePositionPrice,
            closePositionTime: share.closePositionTime,
            profitability: profitability
        }
        let newObj = fs.readFileSync(`${logFIleDir}.json`, "utf8", function(error,data){ });
        newObj = JSON.parse(newObj)
        newObj.push(obj)
        fs.writeFileSync(`${logFIleDir}.json`, JSON.stringify(newObj), function(error){
            if(error)
                throw error
        })
        share.signal = false
        share.currentPercent = 0
        share.pastPercent = 0
        share.pastPastPercent = 0
    }
}

export {closePosition}