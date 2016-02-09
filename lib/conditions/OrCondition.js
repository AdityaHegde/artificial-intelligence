var
AndCondition = require("./AndCondition"),
OrCondition = AndCondition.extend({
  check : function() {
    return this.trueCount > 0;
  },
});

module.exports = OrCondition;
