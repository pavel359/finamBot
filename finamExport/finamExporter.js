const {getInfoForTicker} = require('./finamTickersDataProcessor.js');
const exportDataForTicker = require('./exportDataForTicker.js');
const saveData = require('./saveData.js');
const {finam} = require('../config.js');
const convertCSVStringToJSONString = require('./convertCSVStringToJSONString.js')
const dateConstructor = require('./dateConstructor')

let tradingSessionDate = []
tradingSessionDate[0] = finam.data.from
tradingSessionDate[1] = finam.data.to

const finamExporter = async () => {
  while (tradingSessionDate[0] != finam.data.end) {
    nextDay: for (const marketKey of Object.keys(finam.markets)) {

      const market = finam.markets[marketKey];

      for (const tickerIndex in market.tickers) {

        const ticker = market.tickers[tickerIndex];

        const tickerInfo = getInfoForTicker(ticker, market);

        // eslint-disable-next-line no-await-in-loop
        let data = await convertCSVStringToJSONString(await exportDataForTicker(tickerInfo, tradingSessionDate[0], tradingSessionDate[1]));

        if (data.length<=2) {
          console.log(`NOT FOUND ${ticker} ON FINAM ON MARKET: ${market.name}`);
          continue
        }

        data = JSON.parse(data)
        let newData = []
        data.forEach((element) => {
          let time = element['<TIME>'].split(':')
          let date = element['<DATE>'].split('/')
          if (Number(date[0]).toString() == tradingSessionDate[0].split('.')[0]) {
            if ((time[0] * 3600 + time[1] * 60 + Number(time[2])) >= 52200) {
              newData.push(element)
            }
          }
          if (Number(date[0]).toString() == tradingSessionDate[1].split('.')[0]) {
            if ((time[0] * 3600 + time[1] * 60 + Number(time[2])) <= 5400) {
              newData.push(element)
            }
          }
        })

        if (newData.length == 0) {
          console.log(`NOT FOUND ${ticker} ON FINAM ON MARKET: ${market.name} ON THIS DATE (${tradingSessionDate[0]})`);
          continue;
        }

        newData = JSON.stringify(newData)
        saveData(newData, finam.exportFolder, market.name, tradingSessionDate[0], `${ticker}.json`)
            .catch(e => console.error(e))
            .then(() => console.log(`successfully downloaded data for ticker ${ticker}`))
      }
    }
    tradingSessionDate[0] = dateConstructor(tradingSessionDate[0])
    tradingSessionDate[1] = dateConstructor(tradingSessionDate[1])
  }
}
finamExporter();