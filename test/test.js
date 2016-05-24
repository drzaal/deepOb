var assert = require('assert')
require('../index')

describe("Deep Properties", ()=> {
	describe("setter", ()=> {
		it("assigns a deep property", ()=> {
			var x = ({}).deepSet("here.is.a.property", 5)
			assert.deepEqual(
				x,
				{ here: { is: { a: { property: 5 }}}}
			)
		})
		it("does not overwrite an existing property", ()=> {
			var x = ({ here: { also: 2 }}).deepSet("here.is.a.property", 5)
			assert.deepEqual(
				x,
				{ here: { also: 2, is: { a: { property: 5 }}}}
			)
		})
		it("preserves an existing array by mapping it to object", ()=> {
			var x = ([ "other", "values" ]).deepSet("here.is.a.property", 5)
			assert.deepEqual(
				x,
				{ "other", "values", here: { also: 2, is: { a: { property: 5 }}}}
			)
		})
	})
	describe("getter", ()=> {

	})
})
