var assert = require("chai").assert;

var fieldop = require("../lib/fieldoperators.js");

//var should = chai.should();


describe("FieldOperators", function(){
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
      a:2,
      b : {
        c:3
      },
      d : {
        e : {
          f:0
        }
      },
      g:10
    }
    fieldop.incr({a:1,"b.c":2,"d.e.f":-1,g:10}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should multiply the fields by the specified amount', function(){
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
      a:1,
      b : {
        c:2
      },
      d : {
        e : {
          f:-1
        }
      },
      g:0
    }
    fieldop.mul({a:1,"b.c":2,"d.e.f":-1, g:10}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should rename the fields to the specified names', function(){
    var ob1 = {
      a:"HI",
      b:{
        c:"Hello"
      },
      d:["a","b","c"],
    };
    var ob2 = {
      "greeting":"HI",
      "greeting_ob":{
        "greeting":"Hello"
      },
      "greeting_array":["a","b","c"]
    }
    fieldop.rename({a:"greeting", b:"greeting_ob","greeting_ob.c":"greeting_ob.greeting", d:"greeting_array"}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should set the fields to the specified values', function(){
    var ob1 = {
      a:1,
      b:"str",
      c:{
        d:"Hi"
      },
      d:{
        e:["a","b"]
      }
    };
    var ob2 = {
      a:20,
      b:"Newstr",
      c:{
        d:"Hey"
      },
      d:{
        e:[1,2,3,4]
      },
      f:"Bye"
    };
    fieldop.set({a:20, b:"Newstr","c.d":"Hey", "d.e":[1,2,3,4], f:"Bye"}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should unset the fields', function(){
    var ob1 = {
      a:1,
      b:"str",
      c:{
        d:"Hi"
      },
      d:{
        e:["a","b"]
      }
    };
    var ob2 = {
      b:"str",
      d:{}
    };
    fieldop.unset({a:20, "c":"Hey", "d.e":[1,2,3,4], f:"Bye"}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should set the fields with less than min values to the min value', function(){
    var ob1 = {
      a:25,
      b:12
    }
    var ob2 = {
      a:25,
      b:15
    }
    fieldop.min({a:20, b:15}, ob1);
    assert.deepEqual(ob2, ob1);
  });
  it('should set the fields with greater than max values to the max value', function(){
    var ob1 = {
      a:25,
      b:12
    }
    var ob2 = {
      a:20,
      b:12
    }
    fieldop.max({a:20, b:15}, ob1);
    assert.deepEqual(ob2, ob1);
  });
  it('should set the fields to the currentDate', function(){
    var ob1 = {
      a:"HI",
      b:"Hey",
      c:1,
      d:2
    };
    var ob2 = {
      a: new Date(),
      b: new Date().valueOf(),
      c:new Date(),
      d:new Date().valueOf()
    }
    fieldop.currentDate({a:true,b:false, c:{$type:"date"}, d:{$type:"timestamp"}}, ob1);
    assert.deepEqual(ob1, ob2);
  });
});
