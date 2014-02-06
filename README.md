generator-fuu
=============
###work in progress, feel free to contribute ideas

higher order flow control functions for creating generators

```javascript
  var genFuu = require('generator-fuu');

  co(genFuu.cascade(
    function *(next) {
      console.log('here\'s example one')
      yield next;
    },
    function *(next) {
      console.log('here\'s our second');
    }
  ));
```
