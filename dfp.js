const { log } = require("console");
const fs = require("fs");

function parseFile(inputData, outData, delimiter = ";") {
	const data = fs.readFileSync(inputData, "utf-8");
	const lines = data.split(/\n/);
	let count = 0;

	for (let i = 1; i < lines.length; i++) {
		let line = lines[i].split(delimiter);

		let sentiment = line[1].trim();
		let review = line[0].trim();
		review = review.substring(0, 20);

		let newData = `${sentiment};${review}\n`;
		fs.appendFileSync(outData, newData);
		count++;
	}
	return count;
}

// Leave this code here for the automated tests
module.exports = {
	parseFile,
};

parseFile("./datafile.csv", "./outputfile.csv");
