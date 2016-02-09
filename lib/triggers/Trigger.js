var
Class = require("class.extend"),
utils = require("../utils"),
actions = require("../actions/actions"),
conditions = require("../conditions/conditions"),
triggerID = 0,
Trigger = Class.extend({
  trgr_id      : "",
  trgr_class   : "base",
  trgr_type_id : "",

  attr_data : null,

  triggerManager : null,

  condition : null,

  actions : null,

  init : function(triggerData) {
    this.id = this.trgr_id = triggerID++;
    this.trgr_type_id = triggerData.trgr_type_id;
    this.attr_data = triggerData.attr_data;

    triggerData.conditions.trigger = this;
    this.condition = utils.getInstanceFromData(triggerData.conditions, conditions, "cond_class");

    this.actions = [];
    if(triggerData.actions) {
      for(var i = 0; i < triggerData.actions; i++) {
        this.actions.push(utils.getInstanceFromData(triggerData.actions[i], actions, "action_class"));
      }
    }
  },

  wasAdded : function(triggerManager) {
    this.triggerManager = triggerManager;

    this.condition.triggerWasAdded();

    for(var i = 0; i < triggerData.actions; i++) {
      //update condition's curResult
      triggerData.actions.canRun();
    }
  },

  wasRemoved : function(triggerManager) {
    this.triggerManager = null;

    this.condition.triggerWasRemoved();
  },

  attributeChanged : function(attr_type_id, newValue, oldValue) {
    this.condition.attributeChanged(attr_type_id, newValue, oldValue);

    this.trigger();
  },

  trigger : function() {
    if(this.condition.check()) {
      for(var i = 0; i < this.actions.length; i++) {
        this.actions[i].run(this.triggerManager.entity);
      }
      return true;
    }
    return false;
  },
});

module.exports = Trigger;
