// Generated by CoffeeScript 1.9.3
var AdjacentCellsCalculator, Tuple, TupleSet,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Tuple = require("../models/Tuple");

TupleSet = require("../models/TupleSet");

AdjacentCellsCalculator = (function() {
  function AdjacentCellsCalculator(grid1, cells, x1, y1) {
    this.grid = grid1;
    this.cells = cells != null ? cells : new TupleSet;
    this.x = x1;
    this.y = y1;
    this.empty = bind(this.empty, this);
    this.validLocation = bind(this.validLocation, this);
    this.calculate = bind(this.calculate, this);
  }

  AdjacentCellsCalculator.prototype.calculate = function() {
    var each, i, j, k, l, len, len1, len2, m, ref, ref1, ref2;
    console.log("@grid in adj is ");
    ref = this.grid.grid;
    for (k = 0, len = ref.length; k < len; k++) {
      each = ref[k];
      console.log(each);
    }
    ref1 = [this.x - 1, this.x, this.x + 1];
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      i = ref1[l];
      ref2 = [this.y - 1, this.y, this.y + 1];
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        j = ref2[m];
        if (i === this.x && j === this.y) {
          continue;
        }
        this.cells.push(this.validLocation(this.grid, i, j));
      }
    }
    return this.cells.set;
  };

  AdjacentCellsCalculator.prototype.validLocation = function(grid, x, y) {
    while (grid.validIndices(x, y)) {
      if (this.empty(grid, x, y)) {
        return new Tuple(x, y);
      }
      y--;
    }
    return null;
  };

  AdjacentCellsCalculator.prototype.empty = function(grid, x, y) {
    return (grid.at(x, y)) === null;
  };

  return AdjacentCellsCalculator;

})();

module.exports = AdjacentCellsCalculator;
