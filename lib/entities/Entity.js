var
Class = require("class.extend"),
BehaviorManager = require("../behaviors/BehaviorManager"),
AttributeManager = require("../attributes/AttributeManager"),
TriggerManager = require("../triggers/TriggerManager"),
utils = require("../utils"),

entityID = 0,

Entity = Class.extend({
  entity_id      : "",
  entity_class   : "base",
  entity_type_id : "",

  parentEntity : null,
  childEntities : null,

  behaviorManager  : null,
  attributeManager : null,
  triggerManager   : null,

  init : function(entityData) {
    this.entity_id = entityID++;
    this.entity_type_id = entityData.entity_type_id;
    this.behaviorManager  = new BehaviorManager(this, entityData.initBehaviors);
    this.attributeManager = new AttributeManager(this, entityData.initAttributes);
    this.triggerManager   = new TriggerManager(this, entityData.initTriggers);

    this.childEntities = [];
    if(entityData.childEntities) {
      for(var i = 0; i < entityData.childEntities.length; i++) {
        var ce = utils.getInstanceFromData(entityData.childEntities[i], Entity.entities, "entity_class", "base", this.childEntities);
        ce.parentEntity = this;
      }
    }
  },
});

module.exports = Entity;
