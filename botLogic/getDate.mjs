function getDate (date) {
    date = date.split('.')

    let newDate
    newDate = Date.UTC(date[2], date[1]-1, date[0])
    newDate -= 3600000 * 24
    newDate = new Date(newDate)
    date[0] = newDate.getDate()
    date[1] = newDate.getMonth()+1
    date[2] = newDate.getFullYear()
    date = date.join('.')
    return date
}

export {getDate};