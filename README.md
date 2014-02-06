generator-fuu
=============

##higher order flow control functions for creating generators
####(work in progress, feel free to contribute ideas)

##Todo list

get tests written!!

### cascade

Takes a set of generators and returns a massive generator that we can pass
into a koa app's .use() or co() function. 

```javascript
  var genFuu = require('generator-fuu');

  co(genFuu.cascade(
    function *(next) {
      console.log('here\'s example one')
      yield next;
    },
    function *(next) {
      console.log('here\'s our second');
      yield next;
    },
    function *() {
      console.log('here\'s our second');
    }
  ));
```
  outputs
```
  output goes here

```
