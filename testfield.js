var _ = require("lodash");

var f = require("./fieldoperators.js");
var a = require("./arrayoperators.js");

var ob = {
  _id: 1,
  sku: "abc123",
  quantity: 10,
  metrics: {
      orders: 2,
      ratings: 3.5
    }
};

var ob = {
  "_id": 1,
  "alias": [ "The American Cincinnatus", "The American Fabius" ],
  "mobile": "555-555-5555",
  "nmae": { "first" : "george", "last" : "washington" }
};

var ob = {
  _id: 100,
  sku: "abc123",
  quantity: 250,
  instock: true,
  reorder: false,
  details: { model: "14Q2", make: "xyz" },
  tags: [ "apparel", "clothing" ],
  ratings: [{by:"ijk", rating:4} ]
};

var ob = { _id: 1, highScore: 800, lowScore: 200 };

//f.incr({quantity:-2, "metrics.orders":1, "metrics.ratings":-0.5, price:20 }, ob);

//f.mul({quantity:3, "metrics.orders":5.0, "metrics.ratings": 1.25, price:2}, ob);
//f.rename({ "nmae": "name" }, ob);
//f.rename({ "name.first": "name.fname", wife:"spuse" }, ob);
var set = {
        quantity: 500,
        details: { model: "14Q3", make: "xyz" },
        tags: [ "coats", "outerwear", "clothing" ],
        "details.make": "zzz",
        "tags.1": "rain gear",
        "ratings.0.rating": 2
      };
//f.set(set, ob);

f.min({lowScore:400},ob);
f.max({highScore:900},ob);
console.log(ob);
console.log(_.difference([ 0, 2, 5, 5, 1, 0 ], [ 0, 5 ] ));

console.log(_.isArray({}));
