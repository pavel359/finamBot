const aEmitentIds = require('../finamTickersData/aEmitentIds.js');
const aEmitentDecp = require('../finamTickersData/aEmitentDecp.js');
const aEmitentCodes = require('../finamTickersData/aEmitentCodes.js');
const aEmitentMarkets = require('../finamTickersData/aEmitentMarkets.js');
const aEmitentNames = require('../finamTickersData/aEmitentNames.js');
const aEmitentUrls = require('../finamTickersData/aEmitentUrls.js');


const getInfoForTicker = (ticker, market)=>{
  let tickerInfo = undefined;
  aEmitentCodes.forEach((el, i)=>{
    if(el!==ticker)return;
    if(market.id!==aEmitentMarkets[i])return;
    tickerInfo = {
      name:el,
      id:aEmitentIds[i],
      marketId:aEmitentMarkets[i],
    }
  })
  return tickerInfo;
}
module.exports = {getInfoForTicker}