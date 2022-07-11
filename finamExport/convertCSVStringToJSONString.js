const csvtojson = require('csvtojson');

const convertCSVStringToJSONString = async (string) => {
  return JSON.stringify(await csvtojson({}).fromString(string));
}
module.exports = convertCSVStringToJSONString