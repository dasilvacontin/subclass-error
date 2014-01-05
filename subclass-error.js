

// subclass-error.js


function SubclassError (name, error, props) {

	if (name === undefined) throw new Error ("Name of subclass must be provided as first argument.");
	if (!(error instanceof Function)) {
		props = error;
		error = Error;
	}

	var e = function (message) {

		this.message = message;

		//stack "hack"
		var goodStack = (new Error ()).stack.split('\n');
		goodStack.splice(1,1);
		goodStack[0] = name;
		if (message) goodStack[0] += ": "+message;
		this.stack = goodStack.join('\n');

	}
	e.prototype = new error ();	
	e.prototype.constructor = e;
	e.prototype.name = name;
	for (var prop in props) {
		e.prototype[prop] = props[prop];
	}

	return e;

}

module.exports = SubclassError;