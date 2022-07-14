function getSignal (prop, share, keyPercent, stopLossCoefficient, botVersion) {
    if (botVersion == 'v1') {
        if ((share.currentPercent <=-keyPercent && share.pastPercent <=-keyPercent) || (share.currentPercent >=keyPercent && share.pastPercent >=keyPercent)) {
            if (share.signal != true) {
                share.openPositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
                share.openPositionPrice = Number(prop['<LAST>'])
                share.position = (share.currentPercent > 0) ? 'long' : 'short';
                if (share.position == 'long') {
                    share.stopLoss = share.openPositionPrice * stopLossCoefficient[0]
                } else share.stopLoss = share.openPositionPrice * stopLossCoefficient[1]
                console.log(Number(prop['<LAST>']))
                console.log(prop['<TIME>'])
            }
            share.signal = true
        }
    }

    if (botVersion == 'v2') {
        if ((share.currentPercent >= keyPercent && share.pastPercent >= keyPercent) || (share.currentPercent >= keyPercent && share.pastPastPercent >= keyPercent)) {
            share.openPositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
            share.openPositionPrice = Number(prop['<LAST>'])
            share.position = 'long'
            share.stopLoss = share.openPositionPrice * stopLossCoefficient[0]
            console.log(Number(prop['<LAST>']))
            console.log(prop['<TIME>'])
            share.signal = true
        }
        if ((share.currentPercent <= -keyPercent && share.pastPercent <= -keyPercent) || (share.currentPercent <= -keyPercent && share.pastPastPercent <= -keyPercent)) {
            share.openPositionTime = `${prop['<DATE>']}' '${prop['<TIME>']}`
            share.openPositionPrice = Number(prop['<LAST>'])
            share.position = 'short'
            share.stopLoss = share.openPositionPrice * stopLossCoefficient[1]
            console.log(Number(prop['<LAST>']))
            console.log(prop['<TIME>'])
            share.signal = true
        }
    }
}

export {getSignal}