/*
 * Computes the actual numbers in style scale
 * - example: parseStyleScale({
			range: "1...8px",
			type: "geometric", // can be 'geometric' | 'arithmetic'
			length: 4 // number of total values for this style
		},3)
 */
const parseStyleScale = (function () {
	function rangeParser(range) {
		const match = range.match(/^(\d*(?:\.|)\d*)(?:\.\.\.)(\d*(?:\.|)\d*)(\D*)$/);

		if (match && match.length === 4) {
			return match.slice(1);
		}

		else {
			throw new Error("Expected range to be of the form #...#unit.");
		}
	}
	// 0...9px => [0,9,px]
	// 0.0...9px => [0.0,9,px]
	// 0.0...9.9px => [0.0,9.9,px]
	// .0...9.9px => [.0,9.9,px]
	// .0....9px => [.0,.9,px]
	// 0....9.px => [0.,9.,px]
	// .....px => [.,.,px]
	// .....% => [.,.,%]
	// ....rem => [.,.,rem]

	function insertArithmeticMeans(first, last, numOfMeans) {

		const [a, b, n] = [Number(first), Number(last), Number(numOfMeans)];

		let means = [];
		let commonDiff = (b - a) / (n - 1);

		for (let i = 0; i < n; i++) {
			means.push(commonDiff * i + a);
		}

		return means;
	}
	//0,10,11 --> [0,1,2,3,4,5,6,7,8,9,10]

	function insertGeometricMeans(first, last, numOfMeans) {

		const [a, b, n] = [Number(first), Number(last), Number(numOfMeans)];

		let means = [];
		let commonRatio = (b / a) ** (1 / (n - 1));

		for (let i = 0; i < n; i++) {
			means.push((commonRatio ** i) * a);
		}

		return means;
	}
	//1,8,4 --> [1,2,4,8]

	function parseStyleScale(styleScale, precision) {
		const range = rangeParser(styleScale["range"]);
		const type = styleScale["type"];
		const length = styleScale["length"];
	
		let means;
	
		if (type === "arithmetic") {
			means = insertArithmeticMeans(
				range[0],
				range[1],
				length
			);
		}
		else if (type === "geometric") {
			means = insertGeometricMeans(
				range[0],
				range[1],
				length
			);
		}
		else {
			throw new Error("Type of mean must be either arithmetic or geometric.");
		}
	
		for (let i = 0; i < means.length; i++) {
			means[i] = Number(means[i].toPrecision(precision));
		}
	
		return means;
	}
	
	return parseStyleScale;
})();

function camelToHyphen (camelCase) {
	var match = camelCase.match(/([A-Z]|)[a-z\d]+/g) || [];
	
	for (var i = 0; i < match.length; i++) {
		match[i] = match[i].toLowerCase();
	}
	
	return match.join("-");
}

function parseBasicStyles (basicStyles,precision) {
	let parsedStyles = [];

	for (var prop in basicStyles) {
		let styleList = basicStyles[prop];
		for (i = 0; i < styleList.length; i++) {
			parsedStyles.push({
				name: camelToHyphen(prop),
				styles: parseStyleScale(styleList[i],precision)
			});
		}
	}
	
	return parsedStyles;
}
