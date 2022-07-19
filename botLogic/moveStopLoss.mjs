function moveStopLoss (share, stopLossCoefficient) {
    if (share.position == 'long') {
        if (share.lastPrice * stopLossCoefficient[0] > share.stopLoss) {
            return share.lastPrice * stopLossCoefficient[0]
        }
    }
    if (share.position == 'short') {
        if (share.lastPrice * stopLossCoefficient[1] < share.stopLoss) {
            return share.lastPrice * stopLossCoefficient[1]
        }
    }
    return share.stopLoss
}

export {moveStopLoss}