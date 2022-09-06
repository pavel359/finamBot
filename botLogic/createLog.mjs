import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createLog (timer, version, tickers) {
    const timeout = (ms) => new Promise(res=>{
        setTimeout(res, ms)
    })

    await timeout(timer)

    let ticker = ' '
    for (let prop of tickers) {
        ticker = ticker + prop + ' '
    }

    let date = []
    date[0] = new Date().getDate()
    date[1] = new Date().getMonth() + 1
    date[2] = new Date().getFullYear()
    date = date.join('-')
    let time = []
    time[0] = new Date().getHours()
    time[1] = new Date().getMinutes()
    time[2] = new Date().getSeconds()
    time[3] = new Date().getMilliseconds()
    time = time.join('.')
    date = date + ' ' + time
    let name = version + ticker + ' ' + date
    let data = []
    data = JSON.stringify(data)
    fs.writeFileSync(path.join(__dirname, 'logs', `${name}.json`)
        , data, 'utf8', function () {})
    return name
}

export {createLog}