var
Class = require("class.extend"),
behaviorID = 0,
Behavior = Class.extend({
  bhvr_id      : "",
  bhvr_class   : "base",
  bhvr_type_id : "",

  attributes   : null,
  triggers     : null,

  behaviorManager : null,

  init : function(behaviorData) {
    this.bhvr_id = behaviorID++;
    this.bhvr_type_id = behaviorData.bhvr_type_id;

    this.attributes = behaviorData.attributes;
    this.triggers = behaviorData.triggers;
  },
  
  wasAdded : function(behaviorManager) {
    this.behaviorManager = behaviorManager;

    for(var i = 0; i < this.attributes.length; i++) {
      behaviorManager.entity.attributeManager.addAttribute(this.attributes[i]);
    }

    for(var i = 0; i < this.triggers.length; i++) {
      behaviorManager.entity.triggerManager.addTrigger(this.triggers[i]);
    }
  },
  
  wasRemoved : function(behaviorManager) {
    this.behaviorManager = null;

    for(var i = 0; i < this.attributes.length; i++) {
      behaviorManager.entity.attributeManager.removeAttribute(this.attributes[i]);
    }

    for(var i = 0; i < this.triggers.length; i++) {
      behaviorManager.entity.triggerManager.removeTrigger(this.triggers[i]);
    }
  },
});

module.exports = Behavior;
