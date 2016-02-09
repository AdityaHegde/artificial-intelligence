var
Class = require("class.extend"),
condID = 0,
Condition = Class.extend({
  cond_id      : 0,
  cond_class   : "base",
  cond_type_id : "",

  attr_data : null,
  negate    : false,
  curResult : null,

  trigger : null,

  init : function(condData) {
    this.cond_id = condID++;
    this.cond_type_id = condData.cond_type_id;
    this.attr_data = condData.attr_data;
    this.negate = condData.negate || this.negate;
    this.trigger = condData.trigger;
  },

  updateAttrTypeIDMap : function(attrTypeIdMap) {
    if(attrTypeIdMap) {
      attrTypeIdMap[this.attr_data.attr_type_id] = attrTypeIdMap[this.attr_data.attr_type_id] || [];
      attrTypeIdMap[this.attr_data.attr_type_id].push(this);
    }
  },

  triggerWasAdded : function() {
    var
    entity = this.trigger.triggerManager.entity;

    entity.attributeManager.addAttributeListener(this.trigger, this.attr_data.attr_type_id);
    return this.check(entity, null) ? 1 : 0;
  },

  triggerWasRemoved : function() {
    var
    entity = this.trigger.triggerManager.entity;

    this.curResult = null;
    entity.attributeManager.removeAttributeListener(this.trigger, this.attr_data.attr_type_id);
  },

  attributeChanged : function(attr_type_id, newValue, oldValue) {
    var
    lv = this.curResult;

    this.check(this.trigger.triggerManager.entity, newValue, oldValue);

    return lv === this.curResult ? 0 : (lv ? -1 : 1);
  },

  check : function(entity, value, oldValue) {
    value = value === null ? entity.attributeManager.getAttributeValue(this.attr_data.attr_type_id) : value;

    var res = value >= this.attr_data.attr_value;
    res = this.negate ? !res : res;

    this.curResult = res;
    return res;
  },
});

module.exports = Condition;
