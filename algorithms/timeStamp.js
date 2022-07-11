function timeStamp (time) {
    time = time.split(':')
    if ((time[0] * 3600 + time[1]*60 + Number(time[2])) < 5410) {
        return (time[0] * 3600 + time[1]*60 + Number(time[2]) + 86400)
    } else return (time[0] * 3600 + time[1]*60 + Number(time[2]))
}

export {timeStamp}