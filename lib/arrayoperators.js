var _ = require("lodash");

var addToSet = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(_.isUndefined(curval)){
      _.set(doc, field, (val.$each ? val.$each : (_.isArray(val)? val : [val])));
    }
    if(_.isArray(curval)){
      if(val.$each){
        _.forEach(val.$each, function(element){
          addToSet({[field]:element}, doc);
        });
        //call same function again and again
      }
      else{
        if(_.indexOf(curval, val) === -1 ){
          curval.push(val);
          _.set(doc, field, curval);
        }
      }
    }
  });
}

var pop = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(_.isArray(curval)){
      if(val == 1){
        var newval = _.dropRight(curval);
        _.set(doc, field, newval);
      }
      if(val == -1){
        var newval = _.drop(curval);
        _.set(doc, field, newval);
      }
    }
  });
}

var pullAll = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(_.isArray(curval)){
      _.pullAll(curval, val);
      _.set(doc, field, curval);
    }
  });
}

var pushAll = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(_.isUndefined(curval)){
      var newval = _.isArray(val)?val:[val];
      _.set(doc, field, newval);
    }
    else if(_.isArray(val)){
      var newval = _.concat(curval, val);
      _.set(doc, field, newval);
    }
  });
}

var push = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    var newval = [];
    if(_.isUndefined(curval)){
      newval = _.isArray(val)?val:[val];
    }
    else if(_.isArray(curval) && val.$each){
      if(!_.isUndefined(val.$position)){
        var begin = curval.slice(0, val.$position);
        var end = curval.slice(val.$position);
        newval = _.concat(begin, val.$each);
        newval = _.concat(newval, end);
      }
      else{
        newval = _.concat(curval, val.$each);
      }
    }
    else{
      newval = curval.push(val);
      newval = curval;
    }

    if(val.$sort && val.$each){
      if(_.isObject(val.$sort)){
        var key = Object.keys(val.$sort)[0];
        newval.sort(function(a,b){
          if(val.$sort[key] == 1){
            if(_.get(a,key)>_.get(b,key)){
              return 1;
            }
            else{
              return -1;
            }
          }
          if(val.$sort[key] == -1){
            if(_.get(a,key)<_.get(b,key)){
              return 1;
            }
            else{
              return -1;
            }
          }
        });
      }
      else{
        newval.sort(function(a,b){
          if(val.$sort == 1){
            if(a>b){return 1;}
            else{return -1;}
          }
          if(val.$sort == -1){
            if(a<b){return 1;}
            else{return -1;}
          }
        });
      }
    }

    if(val.$slice && val.$each){
      if(val.$slice>0){
        newval = _.slice(newval,0,val.$slice);
      }
      else{
        newval = _.slice(newval,val.$slice);
      }
    }
    if((val.$slice || val.$sort || val.$position) && !val.$each){
      throw("Invalid modifiers");
    }

    _.set(doc, field, newval);
});
}

module.exports = {
  "addToSet":addToSet,
  "pullAll":pullAll,
  "push":push,
  "pushAll":pushAll,
  "pop":pop,
};
