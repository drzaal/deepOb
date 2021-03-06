module.exports = null;

function isString(ob) {
	return Object.prototype.toString.call(ob) == '[object String]';
}

Object.defineProperty(Object.prototype, "deepOb", {
	configurable: true,
	enumerable: false,
	value: function(path, val) {
		if (arguments.length===1) return deepGet.bind(this)(path)
		else return deepSet.bind(this)(path, val)
	}
})

function deepSet (path, value) {
	function isArray(ob) {
		return Object.prototype.toString.call(ob) == '[object Array]'
	}
	function isObject(ob) {
		return Object.prototype.toString.call(ob) == '[object Object]'
	}
	function isFunction(ob) {
		return Object.prototype.toString.call(ob) == '[object Function]'
	}

	var type = (isObject(this)<<2 | isFunction(this)<<1 | isArray(this))

	if (!type) throw new Error('Deep Ob is not an available method of Javascript Primitives')
	if (type&1) throw new Error('Deep Ob is not fully supported on bare Array')

	if (!isString(path)) { 
		throw new Error("Invalid path")
	}
	var pathArry = path.split('.')

	if (pathArry.some((val, key) => !val.match(/\w+/))) {
		throw new Error("Invalid property path " + path + " in " +
			this.toString)
	}

	var valueReceptor = pathArry.pop();

	var i,imax, cursor
	imax = pathArry.length
	cursor = this

	for (i=0;i<imax;i++) {
		var cursorName = pathArry[i]

		if (cursor[cursorName] === undefined) {
			cursor = cursor[cursorName] = {};
		} else if (isObject(cursor[cursorName]) || isFunction(cursor[cursorName])) {
			cursor = cursor[cursorName];
		} else if (isArray(cursor[cursorName])) {
			cursor = cursor[cursorName] = cursor[cursorName].reduce(function(ob, val, key) { ob[key] = val; return ob }, {})
		} else {
			cursor = cursor[cursorName] = Object.defineProperty({}, "valueOf",
				{ enumerable: false, value: (function(old) { return old }).bind( null, cursor[cursorName]) })
		}
	}
	cursor[valueReceptor] = value

	return value // this
}

function deepGet(path) {
	if (!isString(path)) { 
		throw new Error("Invalid path");
	}
	var pathArry = path.split('.');

	pathArry.forEach(function(val, key) {
			if (!val.match(/\w+/)) {
			throw new Error("Invalid property " + val + " in " + this.toString + " " + pathArry.slice(0,key).join('.'));
			}
			});

	var i,imax, cursor;
	imax = pathArry.length;
	cursor = this;

	for (i=0;i<imax;i++) {
		var cursorName = pathArry[i];

		if (cursor === undefined) {
			return undefined;
		}
		cursor = cursor[cursorName];
	}

	return cursor;
}
