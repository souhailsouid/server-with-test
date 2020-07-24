module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2020": true,
		"mocha": true 
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 11,
		"sourceType": "module",
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		]
	}
}
