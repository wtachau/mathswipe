// Generated by CoffeeScript 1.9.3
var Tuple,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tuple = (function() {
  function Tuple(x, y) {
    this.x = x;
    this.y = y;
    this.equals = bind(this.equals, this);
  }

  Tuple.prototype.equals = function(otherTuple) {
    if (otherTuple === null) {
      return false;
    }
    return this.x === otherTuple.x && this.y === otherTuple.y;
  };

  return Tuple;

})();

module.exports = Tuple;
