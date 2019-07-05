const config = {
	
	parserSettings: {
		precision: 4
	},
	
	modifiers: {
		mediaQuery: {
			sm: { minWidth: "480px" },
			md: { minWidth: "840px" },
			lg: { minWidth: "1024px" }
		},
	},
	
	baseStyles: {
		
		padding: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		paddingTop: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		paddingBottom: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		paddingLeft: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		paddingRight: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		margin: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		marginTop: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		marginBottom: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		marginLeft: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		marginRight: [{
			range: "0...80px",
			type: "arithmetic",
			length: 21
		}],
		
		borderRadius: [{
			range: "0...20px",
			type: "arithmetic",
			length: 6
		}],
		
		fontSize: [{
			range: "64...14px",
			type: "geometric",
			length: 8,
			pxToRem: true
		}],
		
		fontWeight: [{
			range: "100...800",
			type: "arithmetic",
			length: 8
		}],
		
		lineHeight: [{
			range: "1...2",
			type: "arithmetic",
			length: 7
		}],
		
		width: [{
			range: "0...100%",
			type: "arithmetic",
			length: 13
		}],
		
		maxWidth: [{
			range: "600...1200px",
			type: "arithmetic",
			length: 4
		}],
		
		height: [{
			range: "0...100%",
			type: "arithmetic",
			length: 13
		}]
		
		/*special styles
		color: [{
			range: "0...100%",
			type: "arithmetic",
			length: 12
		}],
		
		bg-color*/
		
	}

}
