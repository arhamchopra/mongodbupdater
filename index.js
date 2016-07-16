var _ = require("lodash");

var fop = require("./lib/fieldoperators.js")
var aop = require("./lib/arrayoperators.js")
var bop = require("./lib/bitwiseoperators.js")

var preupdate = function(doc, changes){
  _.forEach(changes, function(val, field){
    switch(field){
      case "$inc":{
        fop.incr(val, doc);
        break;
      }
      case "$mul":{
        fop.mul(val, doc);
        break;
      }
      case "$rename":{
        fop.rename(val, doc);
        break;
      }
      case "$set":{
        fop.set(val, doc);
        break;
      }
      case "$unset":{
        fop.unset(val, doc);
        break;
      }
      case "$min":{
        fop.min(val, doc);
        break;
      }
      case "$max":{
        fop.max(val, doc);
        break;
      }
      case "$currentDate":{
        fop.currentDate(val, doc);
        break;
      }
      case "$addToSet":{
        aop.addToSet(val, doc);
        break;
      }
      case "$pop": {
        aop.pop(val, doc);
        break;
      }
      case "$pullAll": {
        aop.pullAll(val, doc);
        break;
      }
      case "$pushAll": {
        aop.pushAll(val, doc);
        break;
      }
      case "$push": {
        aop.push(val, doc);
        break;
      }
      case "$bit": {
        aop.bit(val, doc);
        break;
      }
      default :{
        fop.set({[field]:val}, doc)
      }
    }
  });
}

module.exports = preupdate;
