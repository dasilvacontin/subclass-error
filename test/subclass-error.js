/*global describe, it*/
var SubclassError = require('../subclass-error')

describe('SubclassError', function () {
  var ClientError = new SubclassError('ClientError', {statusCode: 400})
  var ForbiddenError = new SubclassError('ForbiddenError', ClientError, {statusCode: 403})
  describe('instanceof', function () {
    it('should work', function () {
      var err = new ClientError()
      ;(err instanceof ForbiddenError).should.be.false
      ;(err instanceof ClientError).should.be.true
      ;(err instanceof Error).should.be.true

      err = new ForbiddenError()
      ;(err instanceof ForbiddenError).should.be.true
      ;(err instanceof ClientError).should.be.true
      ;(err instanceof Error).should.be.true
    })
  })
  describe('properties', function () {
    it('should be inherited in instances', function () {
      (new ClientError()).statusCode.should.equal(400)
    })
    it('should be inherited in instances of a subclass', function () {
      var FruitError = new SubclassError('FruitError', {type: 'food'})
      var AppleError = new SubclassError('AppleError', FruitError)
      var err = new AppleError()
      err.type.should.equal('food')
    })
  })
  describe('stack trace', function () {
    it('should be correct', function () {
      var NoFoodError = new SubclassError('NoFoodError')
      function eat () {
        throw new NoFoodError()
      }
      function hungry () {
        eat()
      }
      try {
        hungry()
      } catch (e) {
        var lines = e.stack.split('\n')
        lines[0].should.equal('NoFoodError')
        ;(!!lines[1].match(/at eat .*test\/subclass-error\.js/)).should.be.true
        ;(!!lines[2].match(/at hungry .*test\/subclass-error\.js/)).should.be.true
        ;(!!lines[3].match(/at Context.<anonymous> .*test\/subclass-error\.js/)).should.be.true
      }
    })
  })
})
