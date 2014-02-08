Shen
=============

####higher order flow control functions for creating generators
#####(work in progress, feel free to contribute ideas)

##Higher order functions for generators

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

Shen is a set of tools for constructing generators from smaller generators. Through,
composition Shen allows you to assemble coroutines from smaller coroutines. The asychronous 
code even looks synchronous! 

They are all nestable so you can build arbitrarily large generators from smaller ones like
lego pieces.

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

####shen.branch(cond, path1, path2)

Takes a three generators. The first one recieves links to the other two. 
With this you can set up conditional branches to either path1 or path2.

```javascript
  it('should yield to the second argument', function(done) {
    var stub;
    var genFunc = shen.branch(
      function *(path1, path2) {
        yield path1;
        stub.should.equal(5);
      },
      function *(next) {
        stub = 5;
      },
      function *() {
        stub = 6;
      });
    co(genFunc)(done);
  });

  it('should yield to the third argument', function(done) {
    var stub;
    var genFunc = shen.branch(
      function *(path1, path2) {
        yield path2;
        stub.should.equal(6);
      },
      function *(next) {
        stub = 5;
      },
      function *() {
        stub = 6;
      });
    co(genFunc)(done);
  });
```

####shen.dispatch(gen, map)

Takes a generator and an object of genertors. Inside gen, you can yield control
to one of the generators inside the map.

```javascript

  //code exmple coming soon

```

####shen.parallel(gen1, gen2, gen3... genN)

Takes one or more generators. All the generators are run asychronosly. The
returned values can be returned upstream into an array yelded from the generators
yielding to the parallel generator.

```javascript

  //code exmple coming soon

```



####shen.delay(gen, timeout)

Takes a generator and timeout. it returns a generator that runs the 
passed in generator after the timeout.




