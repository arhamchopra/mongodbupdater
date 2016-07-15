var bit = function(changes, doc){
  _.forEach(changes, function(val, field){
    var curval = _.get(doc, field);
    if(val.and){
      var newval = curval & val.and;
      _.set(doc, field, newval);
    }
    if(val.or){
      var newval = curval | val.or;
      _.set(doc, field, newval);
    }
    if(val.xor){
      var newval = curval ^ val.xor;
      _.set(doc, field, newval);
    }
    else{
      throw ("Invalid bitwise operator");
    }
  });
}

module.exports = {
  "bit":bit
}
