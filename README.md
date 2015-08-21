# subclass-error

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-url]][daviddm-image]
[![Coverage Status][coveralls-image]][coveralls-url]
[![NPM downloads per month][downloads-image]][downloads-url]


Workaround for subclassing errors. Both `instanceof` and `stack` are functional.

## Install

```bash
$ npm install --save subclass-error
```

## Usage

```js
var SubclassError = require('subclass-error');

var ClientError = SubclassError("ClientError", {statusCode:400});
var ForbiddenError = SubclassError("ForbiddenError", ClientError, {statusCode:403});

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

Creates a new subclass of `error` (if given) or `Error` (by default). The instances of the new subclass will inherit data in the optional `properties` parameter.

## Why?

I couldn't find any existing solution in which both `instanceof` and `stack` worked as you would expect, back when I created this module.

## License

MIT © [David da Silva](http://dasilvacont.in)

[npm-url]: https://npmjs.org/package/subclass-error
[npm-image]: https://badge.fury.io/js/subclass-error.svg
[downloads-url]: https://www.npmjs.org/package/subclass-error
[downloads-image]: http://img.shields.io/npm/dm/subclass-error.svg
[travis-url]: https://travis-ci.org/dasilvacontin/subclass-error
[travis-image]: https://travis-ci.org/dasilvacontin/subclass-error.svg?branch=master
[daviddm-url]: https://david-dm.org/dasilvacontin/subclass-error.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/dasilvacontin/subclass-error
[coveralls-url]: https://coveralls.io/r/dasilvacontin/subclass-error?branch=master
[coveralls-image]: https://coveralls.io/repos/dasilvacontin/subclass-error/badge.svg?branch=master
