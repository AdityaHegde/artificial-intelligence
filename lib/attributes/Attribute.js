var
Class = require("class.extend"),
attrID = 0,
Attribute = Class.extend({
  attr_id      : "",
  attr_class   : "base",
  attr_type_id : "",

  attr_value   : 0,

  init : function(attrData) {
    this.id = this.attr_id = attrID++;
    this.attr_type_id = attrData.attr_type_id;
    this.attr_value = attrData.attr_value;
  },
});

module.exports = Attribute;
