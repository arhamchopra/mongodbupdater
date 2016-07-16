var assert = require("chai").assert;

var bitop = require("../lib/bitwiseoperators.js");

//var should = chai.should();


describe("BitOperators", function(){
  it('should increment the fields by the specified amount', function(){
    var ob1 = {
      a:1,
      b : {
        c:1
      },
      d : {
        e : {
          f:1
        }
      }
    }
    var ob2 = {
      a:1 & 5,
      b : {
        c:1 | 2
      },
      d : {
        e : {
          f:1 ^ -1
        }
      }
    }
    bitop.bit({a:{and:5},"b.c":{or:2},"d.e.f":{xor:-1}}, ob1);
    assert.deepEqual(ob2,ob1);
  });
});
