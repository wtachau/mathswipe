// Generated by CoffeeScript 1.9.3
var $, ClickHandler, Tuple,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$ = require('jquery');

Tuple = require('../models/Tuple');

ClickHandler = (function() {
  function ClickHandler(board1, two, solutionService, clicked) {
    var cell, i, j, len, len1, ref, row;
    this.board = board1;
    this.solutionService = solutionService;
    this.clicked = clicked != null ? clicked : [];
    if (this.board.cells == null) {
      return;
    }
    ref = this.board.cells;
    for (i = 0, len = ref.length; i < len; i++) {
      row = ref[i];
      if (row.length === 0) {
        break;
      }
      for (j = 0, len1 = row.length; j < len1; j++) {
        cell = row[j];
        if (cell.isSelected) {
          this.addToClicked(cell);
        }
      }
    }
  }

  ClickHandler.prototype.bindDefaultClick = function(board) {
    return $('body').click((function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.resetClicked();
      };
    })(this));
  };

  ClickHandler.prototype.bindClickTo = function(cells) {
    var cell, i, j, len, len1, row;
    if (cells.bindClick != null) {
      cells.bindClick();
      return;
    }
    for (i = 0, len = cells.length; i < len; i++) {
      row = cells[i];
      if (row.bindClick != null) {
        row.bindClick();
        return;
      }
      for (j = 0, len1 = row.length; j < len1; j++) {
        cell = row[j];
        if (cell.bindClick != null) {
          cell.bindClick();
        } else {
          console.log('WARN: object not 2D arrays or simpler or no BindClick method');
        }
      }
    }
  };

  ClickHandler.prototype.tuplesClicked = function() {
    var cell, i, len, ref, tuples;
    tuples = [];
    ref = this.clicked;
    for (i = 0, len = ref.length; i < len; i++) {
      cell = ref[i];
      tuples.push(new Tuple(cell.col, cell.row));
    }
    return tuples;
  };

  ClickHandler.prototype.addToClicked = function(cell) {
    if (cell.isDeleted) {
      return;
    }
    return this.clicked.push(cell);
  };

  ClickHandler.prototype.removeFromClicked = function() {
    return this.clicked.pop();
  };

  ClickHandler.prototype.resetClicked = function() {
    var cell, i, ref, results;
    ref = this.clicked;
    results = [];
    for (i = ref.length - 1; i >= 0; i += -1) {
      cell = ref[i];
      results.push(this.unclickCell(cell));
    }
    return results;
  };

  ClickHandler.prototype.lastClicked = function() {
    return this.clicked[this.clicked.length - 1];
  };

  ClickHandler.prototype.clickCell = function(cell) {
    var ref;
    if (this.clicked.length === 0 || this.areAdjacent(cell, this.lastClicked())) {
      if (ref = this.cell, indexOf.call(this.clicked, ref) < 0) {
        cell.select();
        this.addToClicked(cell);
        if (this.solutionService.isSolution(this.clicked)) {
          console.log('isSolution!');
          return this.board.deleteCells(this.tuplesClicked());
        } else {
          return console.log('not a solution');
        }
      }
    } else {
      this.resetClicked();
      return this.clickCell(cell);
    }
  };

  ClickHandler.prototype.areAdjacent = function(cell, otherCell) {
    return Math.abs(cell.row - otherCell.row) <= 1 && Math.abs(cell.col - otherCell.col) <= 1;
  };

  ClickHandler.prototype.unclickCell = function(cell) {
    var last;
    last = this.lastClicked();
    if (cell !== this.lastClicked()) {
      return null;
    }
    cell.unSelect();
    return this.removeFromClicked(cell);
  };

  return ClickHandler;

})();

module.exports = ClickHandler;
