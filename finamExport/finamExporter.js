const {getInfoForTicker} = require('./finamTickersDataProcessor.js');
const exportDataForTicker = require('./exportDataForTicker.js');
const saveData = require('./saveData.js');
const {finam} = require('../config.js');
const convertCSVStringToJSONString = require('./convertCSVStringToJSONString.js')

const finamExporter = async () => {
  for (const marketKey of Object.keys(finam.markets)) {

    const market = finam.markets[marketKey];

    for (const tickerIndex in market.tickers) {

      const ticker = market.tickers[tickerIndex];

      const tickerInfo = getInfoForTicker(ticker, market);

      // eslint-disable-next-line no-await-in-loop
      let data = await convertCSVStringToJSONString(await exportDataForTicker(tickerInfo, finam.data.from, finam.data.to));

      if (data.length===0) {
        console.log(`NOT FOUND ${ticker} ON FINAM ON MARKET: ${market.name}`);
        continue;
      }

      data = JSON.parse(data)
      let newData = []
      data.forEach((element) => {
        let time = element['<TIME>'].split(':')
        let date = element['<DATE>'].split('/')
        if (date[0] == finam.data.from.split('.')[0]) {
          if ((time[0] * 3600 + time[1] * 60 + Number(time[2])) >= 52200) {
            newData.push(element)
          }
        }
        if (date[0] == finam.data.to.split('.')[0]) {
          if ((time[0] * 3600 + time[1] * 60 + Number(time[2])) <= 5400) {
            newData.push(element)
          }
        }
      })
      newData = JSON.stringify(newData)
      saveData(newData, finam.exportFolder, market.name, `${ticker}.json`)
          .catch(e => console.error(e))
          .then(() => console.log(`successfully downloaded data for ticker ${ticker}`))
    }
  }
}
finamExporter();