// Generated by CoffeeScript 1.9.3
var InputSolver;

InputSolver = (function() {
  function InputSolver() {}

  InputSolver.parseInput = function(input) {
    var numberRegex, numbers;
    numberRegex = /([0-9]+|[\+\-\*])/g;
    return numbers = input.match(numberRegex);
  };

  InputSolver.isOperator = function(element) {
    return element === '+' || element === '-' || element === '*';
  };

  InputSolver.operation = function(sum, element, op) {
    if (op === '+') {
      return sum + parseInt(element);
    }
    if (op === '-') {
      return sum - parseInt(element);
    }
    if (op === '*') {
      return sum * parseInt(element);
    }
    return sum;
  };

  InputSolver.compute = function(input) {
    var i, len, previous, sum, term, terms;
    terms = this.parseInput(input);
    previous = '';
    sum = parseInt(terms[0]);
    if (terms[0] === '-') {
      sum = 0;
    }
    if ((isNaN(sum)) && (terms[0] !== '-')) {
      return NaN;
    }
    for (i = 0, len = terms.length; i < len; i++) {
      term = terms[i];
      if ((this.isOperator(previous)) && (this.isOperator(term))) {
        return NaN;
      }
      sum = this.operation(sum, term, previous);
      previous = term;
    }
    return sum;
  };

  return InputSolver;

})();

module.exports = InputSolver;
