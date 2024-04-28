/* https://docs.google.com/spreadsheets/d/1SPHghYOD0zk1NpdRk8gk75ZhHThvE1FjQvH7IXqFLT8/edit?usp=sharing */
export const fetchSheet = async (sheetPublicSharingUrl) => {
	const csvUrl = gSheetCsvUrl(sheetPublicSharingUrl)
	try {
		const res = await fetch(csvUrl);
		const csvData = await res.text();
		const jsonData = tsvJSON(csvData);
		return jsonData;
	} catch(e) {
		throw e
	}
}

/* https://docs.google.com/spreadsheets/d/e/2PACX-1vSw-AEViAF1qEmVE5wYLjYg7-4IBLBNWJx2dY3HTdLLhg43NP6kALVeGILtooeXMGMYsv5I6N3-cwak/pub?output=csv */
/* https://docs.google.com/spreadsheets/u/0/d/1uJ0a4cu2tFakaIZUfJoZwi5DAKSJxaENoY3iAjQt--o/export?format=csv*/
export const gSheetCsvUrl = (sheetPublicSharingUrl) => {
	try {
		const url = new URL("export", sheetPublicSharingUrl);
		url.searchParams.set("format", "tsv");
		return url.href;
	} catch (e) {
		throw e
	}
}

//var csv is the CSV file with headers
export const tsvJSON = (tsv) => {
	const cleanCell = (header) => {
		const $el = document.createElement("div");
		$el.innerText = header;
		return $el.innerText;
	};

	var lines = tsv.split("\n");
	var result = [];
	var headers = lines[0].split("\t").map(cleanCell);
	for (var i = 1; i < lines.length; i++) {
		var obj = {};
		var currentline = lines[i].split("\t");
		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = cleanCell(currentline[j]);
		}
		result.push(obj);
	}
	return result;
}
