var
Trigger = require("./Trigger"),
PeriodicTrigger = Trigger.extend({
  period : 0,
  ticks  : 1,

  wasAdded : function(triggerManager) {
    this._super(triggerManager);

    var that = this;

    setTimeout(function() {
      that.trigger();
    }, this.period);
  },
});

module.exports = PeriodicTrigger;
