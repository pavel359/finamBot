function moveStopLoss (position, stopLoss, averagePrice, timing) {
    if (timing == '5s') {
        if (position == 'long') {
            if (averagePrice * 0.95 > stopLoss) {
                return averagePrice * 0.95
            }
        }
        if (position == 'short') {
            if (averagePrice * 1.05 < stopLoss) {
                return averagePrice * 1.05
            }
        }
    }

    if (timing == '3s') {
        if (position == 'long') {
            if (averagePrice * 0.93 > stopLoss) {
                return averagePrice * 0.93
            }
        }
        if (position == 'short') {
            if (averagePrice * 1.07 < stopLoss) {
                return averagePrice * 1.07
            }
        }
    }
    return stopLoss
}

export {moveStopLoss}