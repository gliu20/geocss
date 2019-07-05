let cssify = {};

// borderRadius-sm-0

cssify.camelToHyphen = (camelCase) => {
	let match = camelCase.match(/([A-Z]|)[a-z\d]+/g) || [];
	
	for (var i = 0; i < match.length; i++) {
		match[i] = match[i].toLowerCase();
	}
	
	return match.join("-");
}

cssify.addModifiersToName = (className,modifiers) => {
	for (var i = 0; i < modifiers.length; i++) {
		className += "-"+modifiers[i];
	}
	return className;
}

cssify.pxToRem = (value) => {
	return Number(value) / 16;
}

cssify.atomicClass = (className,prop,val) => {
	return `.${className}{${prop}:${val}}[${className}]{${prop}:${val}}`;
}

cssify.mediaQuery = (minWidth,content) => {
	return `@media (min-width:${minWidth}){${content}}`;
}
