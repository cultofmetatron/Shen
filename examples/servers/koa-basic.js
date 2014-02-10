/* here's a basic example showing how nested you can
 * embed the shen generator and still have it work in koa
 *
 * context is preserved throughout the chain
 */


var koa = require('koa');
var app = koa();

var shen = require('../../index.js');

app.use(function *(next) {
  this.status = 200;
  this.body = yield next;
});

var foo = shen.cascade(
  function *(next) {
    return (yield next) + 6;
  },
  shen.branch(function *( path1, path2) {
      return (yield path2)+ 5;
    },
    function *(next) {
      //this never runs
      return (yield next);
    },
    shen.cascade(
      function *(next) {
        return (yield next) + 4;
      },
      function *(next) {
        return (yield next) + 3;
      },
      function *(next) {
        return (yield next) + 2;
      })),
 function *(next) {
    return (yield next) + 1;
 });

app.use(foo);


app.use(function *() {
  return "hello world ";
});


console.log('now listening on port 3000');
app.listen(3000);




