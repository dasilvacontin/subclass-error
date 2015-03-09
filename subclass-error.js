(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.SubclassError = factory();
  }
}(this, function () {
    var IntermediateInheritor = function() {}
    IntermediateInheritor.prototype = Error.prototype;

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

        };
        e.prototype = new IntermediateInheritor();
        e.prototype.constructor = e;
        e.prototype.name = name;
        for (var prop in props) {
            e.prototype[prop] = props[prop];
        }
        return e;
    }

    return SubclassError;
}));
