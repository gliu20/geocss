let modScale = {};

modScale.rangeParser = (range) => {
	const match = range.match(/^(\d*(?:\.|)\d*)(?:\.\.\.)(\d*(?:\.|)\d*)(\D*)$/);

	if (match && match.length === 4) {
		return match.slice(1);
	}
	else {
		throw new Error("Expected range to be of the form #...#unit.");
	}
}
	
modScale.insertArithmeticMeans = (first, last, numOfMeans) => {
	const [a, b, n] = [Number(first), Number(last), Number(numOfMeans)];

	let means = [];
	let commonDiff = (b - a) / (n - 1);

	for (let i = 0; i < n; i++) {
		means.push(commonDiff * i + a);
	}

	return means;
}

modScale.insertGeometricMeans = (first, last, numOfMeans) => {
	const [a, b, n] = [Number(first), Number(last), Number(numOfMeans)];

	let means = [];
	let commonRatio = (b / a) ** (1 / (n - 1));

	for (let i = 0; i < n; i++) {
		means.push((commonRatio ** i) * a);
	}

	return means;
}

modScale.generate = (scaleParams) => {
	const range = modScale.rangeParser(scaleParams["range"]);
	const type = scaleParams["type"];
	const length = scaleParams["length"];
	
	let means;
	
	if (type === "arithmetic") {
		means = modScale.insertArithmeticMeans(
			range[0],
			range[1],
			length
		);
	}
	else if (type === "geometric") {
		means = modScale.insertGeometricMeans(
			range[0],
			range[1],
			length
		);
	}
	else {
		throw new Error("Type of mean must be either arithmetic or geometric.");
	}
	
	return {
		means,
		unit:range[2]
	};
}
