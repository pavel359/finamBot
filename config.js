const {finam} = require("./config");
module.exports = {
  tinkoffAPIToken: 't.ggQBKkcHFZQNmMtdXB3mDkbbX_sTF7g_UBBrIPQz_E2RXOPllXDARh68HTxFcv5MkIsk2tWcoech07_3DbqGOg',
  tickers: [
  ],

  finam: {
    exportFolder: `dist`,
    data:{
      from:"19.04.2022",
      to:"20.04.2022"
    },
    markets:{
      spb: {
        id: 517,
        name: 'SPB_Exchange',
        prefix:'SPBEX.',
        tickers: [
          "AAPL", "MSFT", "GOOGL", "GOOG", "TSLA", "NVDA", "UNH", "JNJ", "V",
          "JPM", "PG", "MA", "BAC", "CVX", "HD", "BABA", "PFE", "LLY", "KO",
          "AVGO", "COST", "CSCO", "ADBE", "VZ", "NKE", "CRM", "INTC", "WFC",
          "AMD", "QCOM", "BMY", "PYPL", "LOW", "BA", "C", "JD", "MU", "SHOP",
          "SQ", "MRNA", "PANW", "OXY", "PLAN", "NFLX", "DOCU"
        ],
      },
      moex: {
        id: 1,
        name: 'Moscow Exchange',
        tickers: []
      }
    },
    intervals:['5000','3000']
  }
}