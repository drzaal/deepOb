var assert = require('assert')
require('../index')

describe("Deep Properties", ()=> {
	describe("setter", ()=> {
		it("assigns a deep property", ()=> {
			var x = ({})
			console.log(x)
			console.log(x.deepOb("here.is.a.property"))
			x.deepOb("here.is.a.property", 5)
			console.log(x)
			assert.deepEqual(
				x,
				{ here: { is: { a: { property: 5 }}}}
			)
		})
		it("does not overwrite an existing property", ()=> {
			var x = ({ here: { also: 2 }})
			x.deepOb("here.is.a.property", 5)
			assert.deepEqual(
				x,
				{ here: { also: 2, is: { a: { property: 5 }}}}
			)
		})
		it("preserves an existing array by mapping it to object", ()=> {
			var x = { arr: [ "other", "values" ]}
			x.deepOb("arr.here.is.a.property", 5)
			assert.deepEqual(
				x,
				{ arr: { 0:"other", 1:"values", here: { is: { a: { property: 5 }}}}}
			)
		})
	})
	describe("getter", ()=> {

	})
})
