const { log } = require("console");
const fs = require("fs");

const deleteFileIfExists = (filePath) => {
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
};

// Function to read an input file and return its content as an array of lines
const readInputFile = (filePath) => {
	if (!fs.existsSync(filePath)) {
		throw new Error(`File does not exist: ${filePath}. Please try again.`);
	}
	return fs.readFileSync(filePath, "utf-8").split(/\n/); // Read file and split into lines
};

// Function to process a single line of input
const processLine = (line, delimiter) => {
	const splitLine = line.split(delimiter);
	const sentiment = splitLine[1].trim();
	const review = splitLine[0].trim().substring(0, 20);
	return `${sentiment}${delimiter}${review}`;
};

// Function to parse an input file and output the processed data to a new file
const parseFile = (inputData, outData, delimiter = ";") => {
	if (!fs.existsSync(inputData)) {
		// Check if the input file exists
		return -1; // Return -1 if the input file doesn't exist
	}

	deleteFileIfExists(outData);

	const lines = readInputFile(inputData);
	const processedData = lines
		.slice(1) // Ignore the first line (header)
		.map((line) => processLine(line, delimiter))
		.join("\n");

	fs.appendFileSync(outData, processedData + "\n");

	return lines.length - 1; // Return the count of processed lines (total lines minus the header)
};

// Leave this code here for the automated tests
module.exports = {
	parseFile,
};
