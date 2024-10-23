const { log } = require("console");
const fs = require("fs");

// function deleteExistingOutputFile() {
// 	//
// }

function parseFile(inputData, outData, delimiter = ";") {
	if (!fs.existsSync(inputData)) {
		return -1;
	}

	if (fs.existsSync(outData)) {
		fs.unlinkSync(outData);
	}

	const data = fs.readFileSync(inputData, "utf-8");
	const lines = data.split(/\n/);
	let count = 0;

	for (let i = 1; i < lines.length; i++) {
		let line = lines[i].split(delimiter);

		// const [review, sentiment] = lines[i].split(delimiter).map(item => item.trim())
		let sentiment = line[1].trim();
		let review = line[0].trim();
		review = review.substring(0, 20);

		let newData = `${sentiment}${delimiter}${review}\n`;
		fs.appendFileSync(outData, newData);
		count++;
	}
	return count;
}

// Leave this code here for the automated tests
module.exports = {
	parseFile,
};

//deleteExistingOutputFile();
parseFile("./datafile.csv", "./outputfile.csv");
