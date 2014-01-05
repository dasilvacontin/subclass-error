var SubclassError = require('./subclass-error');

var HTTPError = {};
HTTPError.ClientError = SubclassError ("ClientError", {statusCode:400});
HTTPError.Forbidden = SubclassError ("Forbidden", HTTPError.ClientError, {statusCode:403});
HTTPError.MuchForbidden = SubclassError ("MuchForbidden", HTTPError.Forbidden, {statusCode:4033});

var e1 = new HTTPError.ClientError ();
var e2 = new HTTPError.Forbidden ();
var e3 = new HTTPError.MuchForbidden ();

function test (err, arr, expected) {
	console.log("Tests for "+err.name+":");

	for (var i = 0; i < arr.length; ++i) {
		var result = eval(arr[i]);
		console.log(arr[i]+": "+result+", expected: "+expected[i]);
		if (result !== expected[i]) throw new Error ("Failed test.");
	}

	console.log();
}

var testArray = [
	"err instanceof HTTPError.ClientError",
	"err instanceof HTTPError.Forbidden",
	"err instanceof HTTPError.MuchForbidden",
	"err.statusCode"
];

test(e1, testArray, [true, false, false, 400]);
test(e2, testArray, [true, true, false, 403]);
test(e3, testArray, [true, true, true, 4033]);

function hungry2 () {
	var e = new HTTPError.MuchForbidden ("wow, much forbidden, very subclass");
	 throw e;
}

function hungry () {
	//very function
	hungry2();
}

hungry();