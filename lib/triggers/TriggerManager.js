var
Class = require("class.extend"),
triggers = require("./triggers"),
utils = require("../utils"),
TriggerManager = Class.extend({
  entity : null,
  triggers : null,
  triggerIdMap : null,

  init : function(entity, initTriggers) {
    this.entity = entity;
    this.triggers = [];
    this.triggerIdMap = {};

    if(initTriggers) {
      for(var i = 0; i < initTriggers.length; i++) {
        this.addTrigger(initTriggers[i]);
      }
    }
  },

  addTrigger : function(triggerData) {
    var trigger = utils.getInstanceFromData(triggerData, triggers, "trgr_class", "base", this.triggers, this.triggerIdMap, "trgr_type_id");

    trigger.wasAdded(this);
  },

  removeTrigger : function(triggerData) {
    var trigger = utils.removeInstanceFromArray(triggerData, this.triggers, triggers.base, this.triggerIdMap, "trgr_type_id");

    if(trigger) {
      trigger.wasRemoved(this);
    }
  },

  trigger : function(triggerTypeId, newValue, oldValue) {
    var trigger = this.triggerIdMap[triggerTypeId];
    if(trigger) {
      trigger.trigger(newValue, oldValue);
    }
  },
});
