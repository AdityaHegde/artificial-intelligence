var
utils = require("../utils"),
Condition = require("./Condition"),
AndCondition = Condition.extend({
  conditions : null,
  attrTypeIdMap : null,

  trigger : null,
  trueCount : 0,

  init : function(condData) {
    this._super(condData);

    this.conditions = [];
    this.attrTypeIdMap = {};
    for(var i = 0; i < condData.conditions.length; i++) {
      var
      cond = utils.getInstanceFromData(condData.conditions[i], AndCondition.conditions, "cond_class", "base", this.conditions);
    }
  },

  updateAttrTypeIDMap : function(attrTypeIdMap) {
    for(var i = 0; i < this.conditions.length; i++) {
      this.trueCount += this.conditions[i].updateAttrTypeIDMap(this.attrTypeIdMap);
    }

    if(attrTypeIdMap) {
      for(var attrTypeId in this.attrTypeIdMap) {
        attrTypeIdMap[attrTypeId] = attrTypeIdMap[attrTypeId] || [];
        attrTypeIdMap[attrTypeId].push(this);
      }
    }
  },

  triggerWasAdded : function() {
    for(var i = 0; i < this.conditions.length; i++) {
      this.trueCount += this.conditions[i].triggerWasAdded();
    }

    return this.check() ? 1 : 0;
  },

  triggerWasRemoved : function() {
    this.trueCount = 0;

    for(var i = 0; i < this.conditions.length; i++) {
      this.conditions[i].triggerWasRemoved();
    }
  },

  attributeChanged : function(attr_type_id, newValue, oldValue) {
    var
    conds = this.attrTypeIdMap[attr_type_id],
    lv = this.curResult;
    for(var i = 0; i < conds.length; i++) {
      this.trueCount += conds[i].attributeChanged(attr_type_id, newValue, oldValue);
    }

    this.check();

    return lv === this.curResult ? 0 : (lv ? -1 : 1);
  },

  check : function() {
    var res = this.trueCount === this.conditions.length;
    this.curResult = res;
    return res;
  },
});

module.exports = AndCondition;
