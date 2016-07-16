var assert = require("chai").assert;

var arrayop = require("../lib/arrayoperators.js");

//var should = chai.should();


describe("ArrayOperators", function(){
  it('should add the elemets to set only if they don"t already exist', function(){
    var ob1 = {
      a:[1,2,3,4,5],
      b : {
        c:["1","2","3","4","5"]
      },
    }
    var ob2 = {
      a:[1,2,3,4,5,7],
      b : {
        c:["1","2","3","4","5","6","8"]
      },
      d:{
        e:{
          f:[-1,"-1","21"]
        }
      },
      g:[10]
    }
    arrayop.addToSet({a:{$each:[1,3,5,7]},"b.c":{$each:["2","4","6","8"]},"d.e.f":[-1,"-1","21"], g:10}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should pop the element from beginning or end of array', function(){
    var ob1 = {
      a:[1,2,3,4,5],
      b : {
        c:["1","2","3","4","5"]
      },
    }
    var ob2 = {
      a:[1,2,3,4],
      b : {
        c:["2","3","4","5"]
      },
    }
    arrayop.pop({a:1,"b.c":-1,"d.e.f":-1}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should remove all the elements matching a set of elements from the array', function(){
    var ob1 = {
      a:[1,2,3,4,5],
      b : {
        c:["1","2","3","4","5","1","2","3","4","5"]
      },
    }
    var ob2 = {
      a:[1,3,5],
      b : {
        c:["2","4","5","2","4","5"]
      },
    }
    arrayop.pullAll({a:[2,4,6,8], "b.c":["1","3"], d:[1,3,"5","7"]}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  it('should push all the elements into the array', function(){
    var ob1 = {
      a:[1,5],
      b : {
        c:["2","4","5"]
      },
    }
    var ob2 = {
      a:[1,5,3],
      b : {
        c:["2","4","5","2","4","5"]
      },
      d:{
        e:[1,2,3,4]
      },
      f:["Bye"]
    }
    arrayop.pushAll({a:[3], "b.c":["2","4","5"], "d.e":[1,2,3,4], f:["Bye"]}, ob1);
    assert.deepEqual(ob2,ob1);
  });
  describe("push modifiers", function(){
    it('should push the each element as separate entity', function(){
      var ob1 = {
        a:[1,2,3],
        b:["1","2","3"],
        c:{
          d:[{no:1},{no:2},{no:3}]
        },
      };
      var ob2 = {
        a:[1,2,3,[20,30]],
        b:["1","2","3"],
        c:{
          d:[{no:1},{no:2},{no:3},{no:4},{no:5}]
        },
        e:{
          f:[1,2,3,4]
        },
        g:["HI"]
      };
      arrayop.push({a:[20,30], "c.d":{$each:[{no:4},{no:5}]}, "e.f":[1,2,3,4], g:"HI"}, ob1);
      assert.deepEqual(ob2,ob1);
    });
    it('should push the elements at specified position', function(){
      var ob1 = {
        c:{
          d:[{no:1},{no:2},{no:3}]
        },
        a:[1,2,3,4]
      };
      var ob2 = {
        c:{
          d:[{no:1},{no:2},{no:3},{no:4},{no:5}]
        },
        a:[1,7,8,9,2,3,4]
      };
      arrayop.push({"c.d":{$each:[{no:4},{no:5}], $position:20}, a:{$each:[7,8,9], $position:1}}, ob1);
      assert.deepEqual(ob2,ob1);
    });
    it('should sort the array', function(){
      var ob1 = {
        a:[1,2,3],
        b:["1","2","3"],
        c:{
          d:[{no:1},{no:2},{no:3}]
        },
      };
      var ob2 = {
        a:[-100,-1,1,2,3,5,21],
        b:["1","2","3"],
        c:{
          d:[{no:5},{no:4},{no:3},{no:2},{no:1}]
        }
      };
      arrayop.push({a:{$each:[-1,5,21,-100], $sort:1}, "c.d":{$each:[{no:4},{no:5}], $sort:{"no":-1}}}, ob1);
      assert.deepEqual(ob2,ob1);
    });
    it('should slice the array to a fixed size', function(){
      var ob1 = {
        a:[1,2,3],
        b:["1","2","3"],
        c:{
          d:[{no:1},{no:2},{no:3}]
        },
      };
      var ob2 = {
        a:[-21,-1,1,2,3],
        b:["1","2","3"],
        c:{
          d:[{no:5},{no:4},{no:3},{no:2},{no:1}]
        },
      };
      arrayop.push({a:{$each:[20,30,-1,34,-21], $sort:1, $slice:5}, "c.d":{$each:[{no:4},{no:5}], $sort:{no:-1}, $slice:20}}, ob1);
      assert.deepEqual(ob2,ob1);
    });
  })
});
