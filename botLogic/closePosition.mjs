import fs from 'fs'
function closePosition (ticker, share, logFIleDir, close = false) {
    let profitability
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
        if (share.position == 'long') {
            profitability = (share.closePositionPrice - share.openPositionPrice) / share.openPositionPrice
        } else {
            profitability = (share.openPositionPrice - share.closePositionPrice)/ share.openPositionPrice
        }
        let obj = {
            ticker: ticker,
            openPositionPrice: share.openPositionPrice,
            openPositionTime: share.openPositionTime,
            closePositionPrice: share.closePositionPrice,
            closePositionTime: share.closePositionTime,
            profitability: profitability
        }
        let newObj = fs.readFileSync(logFIleDir, "utf8", function(error,data){ });
        newObj = JSON.parse(newObj)
        newObj.push(obj)
        fs.writeFileSync(logFIleDir, JSON.stringify(newObj), function(error){
            if(error)
                throw error
        })
        share.signal = false
    }
}

export {closePosition}