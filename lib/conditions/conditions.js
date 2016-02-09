var
Condition = require("./Condition"),
OrCondition = require("./OrCondition"),
AndCondition = require("./AndCondition"),

conditions = {
  "base" : Condition,
  "or"   : OrCondition,
  "and"  : AndCondition,
};

OrCondition.conditions = conditions;
AndCondition.conditions = conditions;

module.exports = conditions;
