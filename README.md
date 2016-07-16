## MongoDBUpdater

A simple module to determine what changes mongoDB update operation will have on the stored documents. This module replicates the functionality of mongoDB update operations.

As of now **pull** operation is not implemented.
It will be added in the later versions.

## Code Example

<code>
  var doc = {
    a:1,
    b:[1,2,3],
    c:{
      d:5
    }
  }

  preUpdate(doc,{$inc:{a:5}, $set:{"c.d":"Hello"}, $push:{b:{$each:[5,10]}}});

  console.log(doc);
  
  doc = {
    a:6,
    b:[1,2,3,5,10],
    c:{
      d:"Hello"
    }
  }
</code>

## Installation

<code> npm install mongodbupdater </code>

## Tests

<code> npm test </code>

## Contributors

Arham Chopra

## License
ISC
