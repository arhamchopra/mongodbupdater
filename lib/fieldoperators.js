var _ = require ("lodash");
var set = function(change, doc){
  _.forEach(change, function(val, field){
    _.set(doc, field, val);
  });
}

var incr = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(curval){
      _.set(doc,field, curval+val);
    }
    else if (_.isNull(curval)){
      throw("Increment a null value");
    }
    else {
      _.set(doc, field, val);
    }
  });
}

var mul = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(curval){
      _.set(doc, field, curval*val);
    }
    else{
      _.set(doc, field, 0);
    }
  });
}


var rename = function(changes, doc){
  _.forEach(changes, function(val, field){
    _.unset(doc, val);
    var curval = _.get(doc, field);
    _.unset(doc, field);
    if(!_.isUndefined(curval)){
      _.set(doc, val, curval);
    }
  });
}

var unset = function(changes, doc){
  _.forEach(changes, function(val, field){
    _.unset(doc, field);
  });
}

var min = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(_.isUndefined(curval)){
      _.set(doc, field, val);
    }
    else if(curval < val){
      _.set(doc, field, val);
    }
  });
}


var max = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(_.isUndefined(curval)){
      _.set(doc, field, val);
    }
    else if(curval > val){
      _.set(doc, field, val);
    }
  });
}

var currentDate = function(changes, doc){
  _.forEach(changes, function(val, field){
    if(_.isBoolean(val)){
      if(val === true){
        _.set(doc, field, new Date());
      }
      else{
        _.set(doc, field, new Date().valueOf());
      }
    }
    if(_.isObject(val)){
      if(val.$type === 'timestamp'){
        _.set(doc, field, new Date().valueOf());
      }
      if(val.$type === 'date'){
        _.set(doc, field, new Date());
      }
    }
  });
}

// $setOnInsert in not included in this module

module.exports = {
  incr : incr,
  set : set,
  unset : unset,
  rename : rename,
  currentDate : currentDate,
  mul : mul,
  max : max,
  min : min
}
