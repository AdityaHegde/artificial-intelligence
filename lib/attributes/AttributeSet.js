var
Class = require("class.extend"),
attributes = require("./attributes"),
AttributeSet = Class.extend({
  attr_type_id : "",
  attr_value   : 0,
  attrs        : null,
  listeners    : null,

  init : function(attr_type_id) {
    this.attr_type_id = attr_type_id;
    this.attrs = [];
    this.listeners = [];
  },

  addAttribute : function(attrData) {
    var oldValue = this.attr_value;

    if(attrData.increment) {
      this.attrs[0].attr_value += attrData.attr_value;
    }
    else {
      this.attrs.push(new attributes[attrData.attr_class](attrData));
      this.attr_value += attrData.attr_value;
    }

    this.attributeChanged(this.attr_value, oldValue);
  },

  removeAttribute : function(attrData) {
    var oldValue = this.attr_value;

    for(var i = this.attrs.length - 1; i >= 0; i--) {
      if(this.attrs[i].attr_value > attrData.attr_value) {
        this.attrs[i].attr_value -= attrData.attr_value;
        this.attr_value -= attrData.attr_value;
      }
      else {
        attrData.attr_value -= this.attrs[i].attr_value;
        this.attr_value -= this.attrs[i].attr_value;
        this.attrs.pop();
      }

      if(attrData.attr_value === 0) {
        break;
      }
    }

    this.attributeChanged(this.attr_value, oldValue);

    if(attrData.attr_value === 0) {
      return null;
    }

    return attrData;
  },

  addAttributeListener : function(listener, attrData) {
    this.listeners.push({
      listener   : listener,
      attr_value : attrData.attr_value,
    });
  },

  removeAttributeListener : function(listener, attrData) {
    for(var i = 0; i < this.listeners.length; i++) {
      if(this.listeners[i].listener.id === listener.id) {
        this.listeners.splice(i, 1);
        break;
      }
    }
  },

  attributeChanged : function(newValue, oldValue) {
    for(var i = 0; i < this.listeners.length; i++) {
      this.listeners[i].listener.attributeChanged(this.attr_type_id, newValue, oldValue);
    }
  },
});

module.exports = AttributeSet;
