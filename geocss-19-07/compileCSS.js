const fs = require('fs');
const path = require('path');

(function () {

	//console.log(JSON.stringify(process.argv));
	
	var inPath = path.join(__dirname,process.argv[2]);
	
	//console.log("Reading from "+inPath);
	
	var input = fs.readFileSync(inPath,'utf8');
	var stuff = selectorsAndProps(input);
	
	
	function selectorsAndProps (input) {
	
		var stuff = [];
		var start = 0;
		var end = 0;
		var openChars = 0;
		var closeChars = 0;
	
	
		for (var i = 0; i < input.length; i++) {
	
			if (input[i] === "{") {
		
				
				start = i;
			
			
				openChars++;
			}
			else if (input[i] === "}") {
				closeChars++;
			
				if (openChars === closeChars) {
					stuff.push(
						input.substr(end,start - end),
						input.substr(start,i - start + 1)
					);
					end = i + 1;
				}
			}
		
		
		}
		
		return stuff;
	}
	
	function selectorsAndProps2 (input) {
	
		var stuff = [];
		var start = 0;
		var end = 0;
		var openChars = 0;
		var closeChars = 0;
	
	
		for (var i = 0; i < input.length; i++) {
	
			if (input[i] === "{") {
		
				if (openChars === 0) {
					start = i;
				}
			
				openChars++;
			}
			else if (input[i] === "}") {
				closeChars++;
			
				if (openChars === closeChars) {
					stuff.push(
						input.substr(end,start - end),
						input.substr(start + 1,i - start - 1)
					);
					end = i + 1;
				}
			}
		
		
		}
		
		return stuff;
	}
	
	var every = [];
	var media = [];
	
	for (var i = 0; i < stuff.length; i += 2) {
		if (stuff[i].substr(0,6) === "@media") {
			media.push(selectorsAndProps2([stuff[i],stuff[i+1]].join("")));
		}
		else {
			every.push(stuff[i],stuff[i+1]);
		}
	}
	
	var media2 = {};
	
	for (var i = 0; i < media.length; i++) {
		media2[media[i][0]] = media2[media[i][0]] || "";
		media2[media[i][0]] += media[i][1];
	}
	
	media = "";
	
	for (var select in media2) {
		media += select + "{" + media2[select] + "}";
	}
	
	console.log(every.join("") + media);

})();
