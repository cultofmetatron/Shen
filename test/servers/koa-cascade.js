var koa = require('koa');
var app = koa();

var shen = require('../../index.js');

app.use(function *(next) {
  this.status = 200;
  this.body = yield next;
});

var foo = shen.cascade(
  function *(next) {
    return yield next;
  },
  shen.branch(function *( path1, path2) {
      return yield path2;
    },
    function *(next) {
      return yield next;
    },
    shen.cascade(
      function *(next) {
        return yield next;
      },
      function *(next) {
        return yield next;
      },
      function *(next) {
        return yield next;
      })),
 function *(next) {
    return yield next;
 });

app.use(foo);


app.use(function *() {
  return "hello world";
});


app.listen(3000);




