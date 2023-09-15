const csvtojsonV2 = require("csvtojson");
const fs = require("fs");
const { pipeline } = require("stream");

const CSV_PATH = "csv/data.csv";
const TXT_PATH = "csv/data.txt";

const readStream = fs.createReadStream(CSV_PATH);
const converter = csvtojsonV2({
    delimiter: ";"
});
const writeStream = fs.createWriteStream(TXT_PATH);

pipeline(readStream, converter, writeStream, (err) => {
    if (err) {
        console.error(err);
    }
});