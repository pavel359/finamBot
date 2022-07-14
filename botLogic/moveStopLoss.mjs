function moveStopLoss (share, stopLossCoefficient) {
    if (share.position == 'long') {
        if (share.currentAveragePrice * stopLossCoefficient[0] > share.stopLoss) {
            return share.currentAveragePrice * stopLossCoefficient[0]
        }
    }
    if (share.position == 'short') {
        if (share.currentAveragePrice * stopLossCoefficient[1] < share.stopLoss) {
            return share.currentAveragePrice * stopLossCoefficient[1]
        }
    }
    return share.stopLoss
}

export {moveStopLoss}