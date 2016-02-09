var
Entity = require("./Entity"),
World = Entity.extend({
  init : function(entityData) {
    this._super(entityData);
  },
});

module.exports = World;
