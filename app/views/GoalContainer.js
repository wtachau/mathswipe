// Generated by CoffeeScript 1.9.3
var $, GoalContainer;

$ = require('jquery');

GoalContainer = (function() {
  function GoalContainer(inputs, Colors) {
    var goal, i, len, ref;
    this.inputs = inputs;
    this.Colors = Colors;
    this.container = $('#goals');
    ref = this.inputs;
    for (i = 0, len = ref.length; i < len; i++) {
      goal = ref[i];
      this.container.append('<span class="goal-span">' + goal + '</span>');
    }
  }

  GoalContainer.prototype.deleteGoal = function(idx) {
    return $(this.container.children()[idx]).css('color', this.Colors.deletedGoalGrey);
  };

  GoalContainer.prototype.resetGoals = function() {
    return $(this.container.children()).css('color', this.Colors.cell);
  };

  GoalContainer.prototype.clearGoals = function() {
    return this.container.empty();
  };

  return GoalContainer;

})();

module.exports = GoalContainer;
