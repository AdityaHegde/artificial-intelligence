var
Class = require("class.extend"),
utils = require("../utils"),
conditions = require("../conditions/conditions"),
actionID = 0,
Action = Class.extend({
  action_id      : "",
  action_class   : "base",
  action_type_id : "",

  condition : null,

  init : function(actionData) {
    this.id = this.action_id = actionID++;
    this.action_type_id = actionData.action_type_id;

    if(actionData.condition) {
      this.condition = utils.getInstanceFromData(actionData.condition, conditions, "cond_class");
    }
  },

  canRun : function() {
    return this.condition ? this.condition.check() : true;
  },

  run : function(entity) {
    if(this.canRun()) {
      this.runCore(entity);
    }
  },

  runCore : function(entity) {
  },
});

module.exports = Action;
