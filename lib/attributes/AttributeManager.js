var
Class = require("class.extend"),
AttributeSet = require("./AttributeSet"),
AttributeManager = Class.extend({
  entity : null,
  attrTypeMap : null,

  init : function(entity, initAttrs) {
    this.entity = entity;

    this.attrTypeMap = {};
    if(initAttrs) {
      for(var i = 0; i < initAttrs.length; i++) {
        this.addAttribute(initAttrs[i]);
      }
    }
  },

  addAttribute : function(attrData) {
    this.attrTypeMap[attrData.attr_type_id] = this.attrTypeMap[attrData.attr_type_id] || new AttributeSet(attrData.attr_type_id);

    this.attrTypeMap[attrData.attr_type_id].addAttribute(attrData);
  },

  removeAttribute : function(attrData) {
    if(this.attrTypeMap[attrData.attr_type_id]) {
      return this.attrTypeMap[attrData.attr_type_id].removeAttribute(attrData);
    }

    return attrData;
  },

  addAttributeListener : function(trigger, attrData) {
    this.attrTypeMap[attrData.attr_type_id] = this.attrTypeMap[attrData.attr_type_id] || new AttributeSet(attrData.attr_type_id);

    this.attrTypeMap[attrData.attr_type_id].addAttributeListener(trigger, attrData);
  },

  removeAttributeListener : function(trigger, attrData) {
    this.attrTypeMap[attrData.attr_type_id] = this.attrTypeMap[attrData.attr_type_id] || new AttributeSet(attrData.attr_type_id);

    this.attrTypeMap[attrData.attr_type_id].removeAttributeListener(trigger, attrData);
  },

  getAttributeValue : function(attr_type_id) {
    return (this.attrTypeMap[attr_type_id] && this.attrTypeMap[attr_type_id].attr_value) || 0;
  },
});

module.exports = AttributeManager;
