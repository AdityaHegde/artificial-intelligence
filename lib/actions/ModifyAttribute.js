var
Action = require("./Action"),
ModifyAttribute = Action.extend({
  attr_type_id : "",
  attr_class   : "",
  attr_value   : 0,

  init : function(actionData) {
    this._super(actionData);

    this.attr_type_id = actionData.attr_type_id;
    this.attr_class = actionData.attr_class;
    this.attr_value = actionData.attr_value;
  },

  runCore : function(entity) {
    if(this.attr_value > 0) {
      entity.attributeManager.addAttribute({
        attr_type_id : this.attr_type_id,
        attr_class   : this.attr_class,
        attr_value   : this.attr_value,
      });
    }
    else {
      entity.attributeManager.removeAttribute({
        attr_type_id : this.attr_type_id,
        attr_class   : this.attr_class,
        attr_value   : -this.attr_value,
      });
    }
  },
});

module.exports = ModifyAttribute;
