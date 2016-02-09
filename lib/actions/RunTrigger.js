var
Action = require("./Action"),
RunTrigger = Action.extend({
  action_class : "runTrigger",

  trgr_type_id : "",

  init : function(triggerData) {
    this._super(triggerData);

    this.trgr_type_id = triggerData.trgr_type_id;
  },

  runCore : function(entity) {
    entity.triggerManager.trigger({
      trgr_type_id : this.trgr_type_id,
    });
  },
});

module.exports = RunTrigger;
