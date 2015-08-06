AdjacentCellsCalculator = require '../services/AdjacentCellsCalculator'
ClickHandler            = require '../services/ClickHandler'
DFS                     = require '../services/DFS'
ExpressionGenerator     = require '../services/ExpressionGenerator'
InputSolver             = require '../services/InputSolver'
ResetButton             = require '../services/ResetButton'
SolutionService         = require '../services/SolutionService'
RandomizedFitLength     = require '../services/RandomizedFitLength'
Tuple                   = require '../models/Tuple'
Board                   = require '../views/Board'
GoalContainer           = require '../views/GoalContainer'
Cell                    = require '../views/Cell'
Colors                  = require '../views/Colors'
$                       = require 'jquery'

class MathSwipeController

  constructor: ->
    length = 3
    inputs = []
    answers = []
    gameScene = @createGameScene()
    goalsScene = @createGoalsScene()

    for i in [0...length]
      expression = (ExpressionGenerator.generate length)
      inputs.push expression.split('')
      answers.push (InputSolver.compute expression)

    boardSymbols = @getSymbolsFor gameScene
    gameModel = @generateBoard inputs, length
    @board = new Board gameModel, gameScene, Cell, Colors, ClickHandler, SolutionService, answers, boardSymbols

    goalsSymbols = @getSymbolsFor goalsScene
    @goalContainer = new GoalContainer goalsScene, answers, goalsSymbols, Colors

    @tests()

  createGameScene: ->
    gameDom = document.getElementById('game')
    size = Math.min(Math.max($( window ).width(), 310), 500)
    scene = new Two(
      fullscreen: false
      autostart: true
      width: size
      height: size
    ).appendTo(gameDom);
    return scene

  createGoalsScene: ->
    goalsDom = document.getElementById('goals')
    scene = new Two(
      fullscreen: false
      autostart: true
      height: goalsDom.clientWidth
      width: goalsDom.clientWidth
    ).appendTo(goalsDom);
    return scene

  getSymbolsFor: (scene) ->
    svgs = $('#assets svg')
    symbols = []
    for svg, index in svgs
      symbols.push (scene.interpret svg)
      symbols[index].visible = false
    symbols

  randExpression: (length) ->
    ExpressionGenerator.generate length

  generateInputs: (length) ->
    inputs = []
    inputs.push @randExpression(length).split('') for i in [0...length]
    inputs

  generateBoard: (inputs, length) ->
    DFS.setEquationsOnGrid length, inputs, AdjacentCellsCalculator

  tests: =>
    @testResetButton()
    @testRandomizedFitLength()
    @testExpGen()
    # @testCellDelete()
    @testInputSolver()
    @testDFS()

  testRandomizedFitLength: =>
    size = 25
    for i in [0...100]
      list = RandomizedFitLength.generate size
      sum = 0
      for j in list
        sum += j
      if sum != size
        console.log "Something went wrong with RandomizedFitLength"
        console.log list
        break
    console.log list
    console.log "Passed RandomizedFitLength"

  testResetButton: =>
    ResetButton.bindClick @board

  testExpGen: =>
    for length in [1..30]
      expression = ExpressionGenerator.generate length
      console.log length, expression, InputSolver.compute expression

  testCellDelete: =>
    solution = [(new Tuple 0, 0), (new Tuple 1, 1), (new Tuple 0, 2)]
    @board.deleteCells solution

  testInputSolver: =>
    console.log InputSolver.compute('1+2*3')

  testDFS: =>
    length = 5
    inputList = []

    for i in [0...length]
      inputList.push (ExpressionGenerator.generate length).split('')
    for each in inputList
      console.log each

    console.log '\n'
    for each in DFS.setEquationsOnGrid length, inputList, AdjacentCellsCalculator
      line = ''
      for j in each
        line += j + '\t'
      console.log line

module.exports = MathSwipeController
