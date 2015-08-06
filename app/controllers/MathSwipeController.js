// Generated by CoffeeScript 1.9.3
var $, AdjacentCellsCalculator, Board, Cell, ClickHandler, Colors, DFS, ExpressionGenerator, GoalContainer, InputSolver, MathSwipeController, RandomizedFitLength, ResetButton, SolutionService, Tuple,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

AdjacentCellsCalculator = require('../services/AdjacentCellsCalculator');

ClickHandler = require('../services/ClickHandler');

DFS = require('../services/DFS');

ExpressionGenerator = require('../services/ExpressionGenerator');

InputSolver = require('../services/InputSolver');

ResetButton = require('../services/ResetButton');

SolutionService = require('../services/SolutionService');

RandomizedFitLength = require('../services/RandomizedFitLength');

Tuple = require('../models/Tuple');

Board = require('../views/Board');

GoalContainer = require('../views/GoalContainer');

Cell = require('../views/Cell');

Colors = require('../views/Colors');

$ = require('jquery');

MathSwipeController = (function() {
  function MathSwipeController() {
    this.testDFS = bind(this.testDFS, this);
    this.testInputSolver = bind(this.testInputSolver, this);
    this.testCellDelete = bind(this.testCellDelete, this);
    this.testExpGen = bind(this.testExpGen, this);
    this.testResetButton = bind(this.testResetButton, this);
    this.testRandomizedFitLength = bind(this.testRandomizedFitLength, this);
    this.tests = bind(this.tests, this);
    var answers, boardSymbols, expression, gameModel, gameScene, goalsScene, goalsSymbols, i, inputs, k, length, ref;
    length = 3;
    inputs = [];
    answers = [];
    gameScene = this.createGameScene();
    goalsScene = this.createGoalsScene();
    for (i = k = 0, ref = length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      expression = ExpressionGenerator.generate(length);
      inputs.push(expression.split(''));
      answers.push(InputSolver.compute(expression));
    }
    boardSymbols = this.getSymbolsFor(gameScene);
    gameModel = this.generateBoard(inputs, length);
    this.board = new Board(gameModel, gameScene, Cell, Colors, ClickHandler, SolutionService, answers, boardSymbols);
    goalsSymbols = this.getSymbolsFor(goalsScene);
    this.goalContainer = new GoalContainer(goalsScene, answers, goalsSymbols, Colors);
    this.tests();
  }

  MathSwipeController.prototype.createGameScene = function() {
    var gameDom, scene, size;
    gameDom = document.getElementById('game');
    size = Math.min(Math.max($(window).width(), 310), 500);
    scene = new Two({
      fullscreen: false,
      autostart: true,
      width: size,
      height: size
    }).appendTo(gameDom);
    return scene;
  };

  MathSwipeController.prototype.createGoalsScene = function() {
    var goalsDom, scene;
    goalsDom = document.getElementById('goals');
    scene = new Two({
      fullscreen: false,
      autostart: true,
      height: goalsDom.clientWidth,
      width: goalsDom.clientWidth
    }).appendTo(goalsDom);
    return scene;
  };

  MathSwipeController.prototype.getSymbolsFor = function(scene) {
    var index, k, len, svg, svgs, symbols;
    svgs = $('#assets svg');
    symbols = [];
    for (index = k = 0, len = svgs.length; k < len; index = ++k) {
      svg = svgs[index];
      symbols.push(scene.interpret(svg));
      symbols[index].visible = false;
    }
    return symbols;
  };

  MathSwipeController.prototype.randExpression = function(length) {
    return ExpressionGenerator.generate(length);
  };

  MathSwipeController.prototype.generateInputs = function(length) {
    var i, inputs, k, ref;
    inputs = [];
    for (i = k = 0, ref = length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      inputs.push(this.randExpression(length).split(''));
    }
    return inputs;
  };

  MathSwipeController.prototype.generateBoard = function(inputs, length) {
    return DFS.setEquationsOnGrid(length, inputs, AdjacentCellsCalculator);
  };

  MathSwipeController.prototype.tests = function() {
    this.testResetButton();
    this.testRandomizedFitLength();
    this.testExpGen();
    this.testInputSolver();
    return this.testDFS();
  };

  MathSwipeController.prototype.testRandomizedFitLength = function() {
    var i, j, k, l, len, list, size, sum;
    size = 25;
    for (i = k = 0; k < 100; i = ++k) {
      list = RandomizedFitLength.generate(size);
      sum = 0;
      for (l = 0, len = list.length; l < len; l++) {
        j = list[l];
        sum += j;
      }
      if (sum !== size) {
        console.log("Something went wrong with RandomizedFitLength");
        console.log(list);
        break;
      }
    }
    console.log(list);
    return console.log("Passed RandomizedFitLength");
  };

  MathSwipeController.prototype.testResetButton = function() {
    return ResetButton.bindClick(this.board);
  };

  MathSwipeController.prototype.testExpGen = function() {
    var expression, k, length, results;
    results = [];
    for (length = k = 1; k <= 30; length = ++k) {
      expression = ExpressionGenerator.generate(length);
      results.push(console.log(length, expression, InputSolver.compute(expression)));
    }
    return results;
  };

  MathSwipeController.prototype.testCellDelete = function() {
    var solution;
    solution = [new Tuple(0, 0), new Tuple(1, 1), new Tuple(0, 2)];
    return this.board.deleteCells(solution);
  };

  MathSwipeController.prototype.testInputSolver = function() {
    return console.log(InputSolver.compute('1+2*3'));
  };

  MathSwipeController.prototype.testDFS = function() {
    var each, i, inputList, j, k, l, len, len1, len2, length, line, m, n, ref, ref1, results;
    length = 5;
    inputList = [];
    for (i = k = 0, ref = length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
      inputList.push((ExpressionGenerator.generate(length)).split(''));
    }
    for (l = 0, len = inputList.length; l < len; l++) {
      each = inputList[l];
      console.log(each);
    }
    console.log('\n');
    ref1 = DFS.setEquationsOnGrid(length, inputList, AdjacentCellsCalculator);
    results = [];
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      each = ref1[m];
      line = '';
      for (n = 0, len2 = each.length; n < len2; n++) {
        j = each[n];
        line += j + '\t';
      }
      results.push(console.log(line));
    }
    return results;
  };

  return MathSwipeController;

})();

module.exports = MathSwipeController;
