// Generated by CoffeeScript 1.9.3
var RandomizedFitLength;

RandomizedFitLength = (function() {
  function RandomizedFitLength() {}

  RandomizedFitLength.randInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  RandomizedFitLength.generate = function(size, list) {
    var length;
    if (list == null) {
      list = [];
    }
    if (size === 0) {
      return list;
    }
    length = this.randInclusive(3, 5);
    if (size - length < 0 && list.length !== 0) {
      return this.generate(size + list.pop(), list);
    } else {
      list.push(length);
      return this.generate(size - length, list);
    }
  };

  return RandomizedFitLength;

})();

module.exports = RandomizedFitLength;