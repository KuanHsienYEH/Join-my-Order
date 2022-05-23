const { GoogleSpreadsheet } = require("google-spreadsheet");

const sheetID = 0,
  docID = "1O-8kkGOSlCnAwoMWh9M8zP2CQT9nff3KqT6vuVB-kNQ",
  credentialsPath = "./credential.json";

const doc = new GoogleSpreadsheet(docID);
const creds = require(credentialsPath);

async function getData() {
  const result = [];
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.getRows();
  for (row of rows) {
    let obj = {
      name: row._rawData[0],
      drink: row._rawData[1],
      size: row._rawData[2],
      sugar: row._rawData[3],
      ice: row._rawData[4],
      price: row._rawData[5],
    };
    result.push(obj);
  }
  return result;
}

async function updateData(data) {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const result = await sheet.addRow({
    name: data.name,
    drink: data.drink,
    size: data.size,
    sugar: data.sugar,
    ice: data.ice,
    price: data.price,
  });

  console.log("result", result);
}

module.exports = {
  getData,
  updateData,
};
