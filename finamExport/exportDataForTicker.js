const fetch = require('node-fetch');
const timeout = require('./timeout.js');

const exportDataForTicker = async (ticker, from, to) => {
  await timeout(500);
  const dateFromDivided= from.split('.');
  const dateToDivided= to.split('.');
  let data = await fetch(`https://export.finam.ru/export9.out?market=${ticker.marketId}&em=${ticker.id}&token=&code=${ticker.name}&apply=0&df=${dateFromDivided[0]}&mf=${dateFromDivided[1]-1}&yf=${dateFromDivided[2]}&from=${from}&dt=${dateToDivided[0]}&mt=${dateToDivided[1]-1}&yt=${dateToDivided[2]}&to=${to}&p=1&f=${ticker.name}&e=.txt&cn=${ticker.name}&dtf=4&tmf=3&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=6&at=1`, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://www.finam.ru/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  })
  if(data.status!==200){
    await timeout(5000)
    return exportDataForTicker(ticker, from, to)
  }
  data = await data.text();
  return data
}

module.exports = exportDataForTicker;