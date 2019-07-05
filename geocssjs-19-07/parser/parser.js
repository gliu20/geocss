let parser = {};

parser.parseBaseStyles = (baseStyles,precision) => {
	let parsedStyles = [];
	
	for (var prop in baseStyles) {
		let styleList = baseStyles[prop];
		
		for (var i = 0; i < styleList.length; i++) {
			let styleScale = modScale.generate(styleList[i]);
			
			if (styleList[i].pxToRem) {
				styleScale.means = styleScale.means.map(cssify.pxToRem);
				styleScale.unit = "rem";
			}
			
			for (let i = 0; i < styleScale.means.length; i++) {
				// forces numbers into certain number of decimal places
				// e.g. 4.000; 3.141 etc.
				styleScale.means[i] = styleScale.means[i].toFixed(precision);
				
				// removes unecessary .000 at end of number
				styleScale.means[i] = Number(styleScale.means[i]);
			}
			
			parsedStyles.push({
				name:prop,
				styleScale:styleScale,
			});
		}
	}	
	
	return parsedStyles;
}

parser.genBaseStyleRules = (parsedBaseStyles,modifier) => {
	
	modifier = modifier || [];
	
	let rules = [];
	
	for (var i = 0; i < parsedBaseStyles.length; i++) {
		let baseStyle = parsedBaseStyles[i];
		
		let propName = baseStyle.name;
		let means = baseStyle.styleScale.means;
		let unit = baseStyle.styleScale.unit;
		
		for (var j = 0; j < means.length; j++) {
			let className = cssify.addModifiersToName(propName,[...modifier,j]);
			let value = means[j] + unit;
			
			rules.push(cssify.atomicClass(
				className,
				cssify.camelToHyphen(propName),
				value
			));
		}
	}
	
	return rules;
}

/*
Scoped means pertaining only when a modifier condition is met
e.g. when minWidth matches that of media query
*/
parser.genMediaQueryStyleRules = (parsedBaseStyles,mediaQuery) => {
	let rules = [];
	
	for (var modifier in mediaQuery) {
		let subsetRule = parser.genBaseStyleRules(parsedBaseStyles,[modifier]);
		let minWidth = mediaQuery[modifier].minWidth;
		
		subsetRule = cssify.mediaQuery(minWidth,subsetRule.join(""));
		rules.push(subsetRule);
	}
	
	return rules;
}

parser.parse = (config) => {
	let parsedBaseStyles = parser.parseBaseStyles(config.baseStyles,3);

	let finalCss = "";

	finalCss += parser.genBaseStyleRules(parsedBaseStyles).join("")
	finalCss += parser.genMediaQueryStyleRules(
		parsedBaseStyles,
		config.modifiers.mediaQuery
	).join("");

	return finalCss
}
