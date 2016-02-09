var
Class = require("class.extend"),
behaviors = require("./behaviors"),
utils = require("../utils"),
BehaviorManager = Class.extend({
  entity    : null,
  behaviors : null,
  behaviorIdMap : null,

  init : function(entity, initBehaviors) {
    this.entity = entity;
    this.behaviors = [];
    this.behaviorIdMap = {};

    if(initBehaviors) {
      for(var i = 0; i < initBehaviors.length; i++) {
        this.addBehavior(initBehaviors[i]);
      }
    }
  },

  addBehavior : function(behaviorData) {
    var behavior = utils.getInstanceFromData(behaviorData, behaviors, "bhvr_class", "base", this.behaviors, this.behaviorIdMap, "bhvr_type_id");

    behavior.wasAdded(this);
  },

  removeBehavior : function(behaviorData) {
    var behavior = utils.removeInstanceFromArray(behaviorData, this.behaviors, behaviors.base, this.behaviorIdMap, "bhvr_type_id");

    if(behavior) {
      behavior.wasRemoved(this);
    }
  },
});

module.extends = BehaviorManager;
