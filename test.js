describe('extendible', function () {
  'use strict';

  var assume = require('assume')
    , extend = require('./')
    , Foo;

  beforeEach(function each() {
    Foo = function Foo() {};
    Foo.extend = extend;
  });

  it('is exported as function', function () {
    assume(extend).is.a('function');
  });

  it('returns the newly extended function', function () {
    var Bar = Foo.extend();
    assume(Bar).does.not.equal(Foo);
  });

  it('can override properties and methods', function () {
    Foo.prototype.bar = function () { return true; };
    Foo.prototype.prop = 10;

    var Bar = Foo.extend({
      bar: function () {
        return false;
      },
      prop: 'foo'
    });

    var bar = new Bar();

    assume(bar.bar()).is.false();
    assume(bar.prop).equals('foo');
  });

  it('correctly inherits and overrides getters', function () {
    var Bar = Foo.extend({
      get hello() {
        return 'hi';
      }
    });

    var Baz = Bar.extend({
      yes: false
    });

    var bar = new Baz();

    assume(bar.yes).equals(false);
    assume(bar.hello).equals('hi');

    var Override = Bar.extend({
      hello: 'world'
    });

    var override = new Override();
    assume(override.hello).equals('world');
  });
});
