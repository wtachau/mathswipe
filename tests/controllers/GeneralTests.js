// Generated by CoffeeScript 1.9.3
var AdjacentCellsCalculator, DFS, ExpressionGenerator, GeneralTests, InputSolver, RandomizedFitLength, Tuple;

AdjacentCellsCalculator = require('../../app/services/AdjacentCellsCalculator');

DFS = require('../../app/services/DFS');

ExpressionGenerator = require('../../app/services/ExpressionGenerator');

InputSolver = require('../../app/services/InputSolver');

RandomizedFitLength = require('../../app/services/RandomizedFitLength');

Tuple = require('../../app/models/Tuple');

GeneralTests = (function() {
  function GeneralTests() {}

  GeneralTests.tests = function(board) {
    this.testRandomizedFitLength();
    this.testExpGen();
    this.testCellDelete(board);
    this.testInputSolver();
    return this.testDFS();
  };

  GeneralTests.testRandomizedFitLength = function() {
    var list, size;
    console.log('Testing RandomizedFitLength');
    size = 25;
    list = RandomizedFitLength.generate(size);
    console.log(list);
    return console.log('Passed RandomizedFitLength\n\n');
  };

  GeneralTests.testExpGen = function() {
    var expression, j, length;
    console.log('Testing ExpressionGenerator');
    for (length = j = 1; j <= 10; length = ++j) {
      expression = ExpressionGenerator.generate(length);
      console.log(length, expression, InputSolver.compute(expression));
    }
    return console.log('Passed ExpressionGenerator\n\n');
  };

  GeneralTests.testCellDelete = function(board) {
    var solution;
    console.log('Testing Cell Delete');
    solution = [new Tuple(0, 0), new Tuple(1, 1), new Tuple(0, 2)];
    board.deleteCells(solution);
    return console.log('Passed Cell Delete\n\n');
  };

  GeneralTests.testInputSolver = function() {
    console.log('Testing Input Solver');
    console.log('1+2*3 =', InputSolver.compute('1+2*3'));
    return console.log('Passed Input Solver\n\n');
  };

  GeneralTests.testDFS = function() {
    var char, expression, i, inputList, j, k, l, len, len1, len2, length, line, m, ref, ref1, row;
    console.log('Testing DFS');
    length = 5;
    inputList = [];
    for (i = j = 0, ref = length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      inputList.push((ExpressionGenerator.generate(length)).split(''));
    }
    console.log('Expressions are:');
    for (k = 0, len = inputList.length; k < len; k++) {
      expression = inputList[k];
      console.log(expression);
    }
    console.log('\n');
    ref1 = DFS.setEquationsOnGrid(length, inputList, AdjacentCellsCalculator);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      row = ref1[l];
      line = '';
      for (m = 0, len2 = row.length; m < len2; m++) {
        char = row[m];
        line += char + '\t';
      }
      console.log(line);
    }
    return console.log('Passed DFS\n\n');
  };

  return GeneralTests;

})();

module.exports = GeneralTests;
