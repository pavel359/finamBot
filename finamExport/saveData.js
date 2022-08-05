const fs = require('node:fs/promises')
const path = require('node:path')

const connect = async (exportFolder, market, date) => {
  await fs.stat(path.join(__dirname, exportFolder)).catch(async () => {
    await fs.mkdir(path.join(__dirname, exportFolder))
  })
  await fs.stat(path.join(__dirname, exportFolder, market)).catch(async () => {
    await fs.mkdir(path.join(__dirname, exportFolder, market))
  })
  await fs.stat(path.join(__dirname, exportFolder, market, date)).catch(async () => {
    await fs.mkdir(path.join(__dirname, exportFolder, market, date))
  })
}

const saveData = async (data='', exportFolder = 'test', market = 'test', date = 'test', ticker = 'test') => {
  await connect(exportFolder, market, date);
  await fs.writeFile(path.join(__dirname, exportFolder, market, date, ticker)
    , data, 'utf8')
}

module.exports = saveData;