generator-fuu
=============

##higher order flow control functions for creating generators
#####(work in progress, feel free to contribute ideas)

##The dream

Generators are the new concurrency being implimented for ecmascript 6.
There is scant information on how generators work. The one really useful 
library I've seen out there is TJHollowaychuck's co module.

```javascript
  var co      = require('co');
  co(function *() {
    var data = yield someAsyncTask();
    doStuffWithData(data);
    return data;
  })();
```

Shen is a set of tools for constructing generators from smaller generators.
The end result is a fully asynchronous control flow coroutine in which we can write 
asychronous code that looks synchronous!

### cascade

Takes a set of generators and returns a massive generator that we can pass
into a koa app's .use() or co() function. 

####shen.cascade(gen1, gen2...genN);

Takes one or more generators and returns a new generator that can be passed
into a coroutine function. each generator is passed a *next* which allows you
to yield downstream to the next generator on the list. 

```javascript

  it('should pass returned values to the next function', function(done) {
    var list = [];
    var genFunc = shen.cascade(
      function *(next) {
        list.push(1);
        var b = yield next;
        list.push(3);
        return b;
      },
      shen.cascade(
        function *(next) {
          list.push(2);
          return yield next;
        },
        function *() {
          list.push(7);
          return 'ret';
        }));

    co(genFunc)(function(err, val) {
      list.should.have.property('0', 1);
      list.should.have.property('1', 2);
      list.should.have.property('2', 7);
      list.should.have.property('3', 3);
      val.should.equal('ret');
      done();
    });
  });
```





