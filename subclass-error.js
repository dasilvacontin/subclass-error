/*global define*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory)
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.SubclassError = factory()
  }
}(this, function () {
  var ErrorInheritor = function () {}
  function SubclassError (name, BaseError, props) {
    if (name === undefined) throw new Error('Name of subclass must be provided as first argument.')
    if (!(BaseError instanceof Function)) {
      props = BaseError
      BaseError = Error
    }
    ErrorInheritor.prototype = BaseError.prototype
    var e = function (message) {
      if (message) this.message = message

      // stack "hack"
      var sample = (new Error())
      if (!sample.stack) sample.stack = ''
      var goodStack = sample.stack.split('\n')
      goodStack.splice(1, 1)
      goodStack[0] = name
      if (message) goodStack[0] += ': ' + message
      this.stack = goodStack.join('\n')
    }
    e.prototype = new ErrorInheritor()
    e.prototype.constructor = e
    e.prototype.name = name
    for (var prop in props) {
      e.prototype[prop] = props[prop]
    }
    return e
  }

  return SubclassError
}))
