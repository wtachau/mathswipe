GameGrid                = require ("../models/GameGrid")
AdjacentCellsCalculator = require ("./AdjacentCellsCalculator")
LastInColumn            = require ("./LastInColumn")

class DFS
  constructor: (@grid) ->

  getSeed: (@grid) =>
    for i in @grid
      x = Math.floor(Math.random()*@grid.length) + 1
      y = Math.floor(Math.random()*@grid.length) + 1
      unless @grid[y][x] is null
        return [y, x]
    return false

  shuffle: (array) =>
    # Fisher-Yates shuffle
    m = array.length
    t = undefined
    i = undefined
    # While there remain elements to shuffle…
    while m
      # Pick a remaining element…
      i = Math.floor(Math.random() * m--)
      # And swap it with the current element.
      t = array[m]
      array[m] = array[i]
      array[i] = t
    array

  search: (seed, input) =>
    return true if input.length is 0
    toVisit = @shuffle ((new AdjacentCellsCalculator( @grid, null, seed.x, seed.y)).calculate())
    curr = toVisit.pop()
    checker = (new LastInColumn).isLastAndBlocking @grid.grid
    return false if checker or toVisit.length is 0
    while curr != undefined
      @grid.grid[curr.x][curr.y] = input[0]
      solution = @search curr, input.slice(1, input.length)
      if solution
        return true
      else
        curr = toVisit.pop()
    false

module.exports = DFS
