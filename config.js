module.exports = {
  tinkoffAPIToken: 't.ggQBKkcHFZQNmMtdXB3mDkbbX_sTF7g_UBBrIPQz_E2RXOPllXDARh68HTxFcv5MkIsk2tWcoech07_3DbqGOg',
  tickers: [
  ],

  finam: {
    exportFolder: `dist`,
    data:{
      from:"24.6.2022",
      to:"25.6.2022",
      end:"22.6.2022"
    },
    markets:{
      spb: {
        id: 517,
        name: 'SPB_Exchange',
        prefix:'SPBEX.',
        tickers: ['ZEN'
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