subclass-error
==============

Workaround for subclassing errors. Both instanceof and stack are functional.

## Use:

```bash
$ npm install subclass-error
```

```js
var SubclassError = require('subclass-error');

var ClientError = SubclassError ("ClientError", {statusCode:400});
var ForbiddenError = SubclassError ("ForbiddenError", ClientError, {statusCode:403});

var clientErr = new ClientError ();

clientErr instanceof Error // true
clientErr instanceof ClientError // true
clientErr instanceof ForbiddenError // false
clientErr.statusCode // 400

var forbidErr = new ForbiddenError ();

forbidErr instanceof Error // true
forbidErr instanceof ClientError // true
forbidErr instanceof ForbiddenError // true
forbidErr.statusCode // 403

function hungry () {
	throw new ForbiddenError ("wow, much forbidden, very subclass");
}

hungry();
/* 
	ForbiddenError: wow, much forbidden, very subclass
	    at hungry (filePath:19:8)
	    etc expected stack
*/
```

### SubclassError(name, [error, properties])

Creates a new subclass of 'error' (if specified) or Error (by default). The instances of the new subclass will have the same properties as those provided in the optional 'properties' parameter.

### Notes:

I didn't find any other workaround in which both 'instanceof' and 'stack' work as you would expect, so I ended up creating this.

### License

MIT
