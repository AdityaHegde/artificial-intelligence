module.exports = {
  getInstanceFromData : function(data, classMap, classKey, baseKey, array, idMap, idKey) {
    var instance;
    if(data instanceof classMap[baseKey]) {
      instance = data;
    }
    else {
      instance = new (classMap[data[classKey]] || classMap[baseKey])(data);
    }

    if(array) {
      array.push(instance);
    }

    if(idMap) {
      idMap[instance[idKey]] = instance;
    }

    return instance;
  },

  removeInstanceFromArray : function(data, array, baseClass, idMap, idKey) {
    var instance, idx;

    if(data instanceof baseClass) {
      instance = data;
    }
    else {
      instance = idMap[data[idKey]];
    }
    
    if(instance) {
      idx = array.indexOf(instance);

      if(idx >= 0) {
        delete idMap[data[idKey]];
        array.splice(idx, 1);
      }
    }

    return instance;
  },
};
