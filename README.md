### AspectJS

Supporting AOP in JavaScript.

#### Installation

##### Node.JS

~~~js
var aspect = require('aspect-js');
~~~

##### Browser

Import by `<script>` tag. `aspect` is then attached to `window`.

~~~html
<script src="path/to/aspect-js.js"></script>
<script>
    aspect.before(...);
</script>
~~~

#### APIs

aspect.before(`context`, `method`, `advice`)
--------------------------

Run `advice` before the execution of `method` of `context`.

e.g.:

~~~javascript
// In browser.
var getName = function (id) {
    return id + ': Example';
}

aspect.before(this, 'getName', function (id) {
    console.log('Getting name of ' + id + ' now...');
});
~~~

aspect.after(`context`, `method`, `advice`)
-------------------------

Run `advice` after the execution of `method` of `context` no matter if `method` is returned normally or has thrown an exception.

e.g.:

~~~javascript
// In browser.
var test = function (name, age) {
    console.log('Hi, ' + name);
    if (age > 26) {
        throw new Error('Big age :-)');
    }
    return '[' + age + ']';
};

aspect.after(this, "test", function (data, name, age) {
    console.log('Process returned: ' + data)
});
~~~

aspect.afterReturn(`context`, `method`, `advice`)
-------------------------

Run `advice` after the execution of `method` of `context` only if `method` is returned normally.

e.g.:

~~~javascript
// In browser.
var test = function (name, age) {
    console.log('Hi, ' + name);
    if (age > 26) {
        throw new Error('Big age :-)');
    }
    return '[' + age + ']';
};

aspect.afterReturn(this, "test", function (data, name) {
    console.log('Process returned: ' + data)
});
~~~

aspect.afterThrow(`context`, `method`, `advice`)
-------------------------

Run `advice` after the execution of `method` of `context` only if `method` has thrown an exception.

e.g.:

~~~javascript
// In browser.
var test = function (name, age) {
    console.log('Hi, ' + name);
    if (age > 26) {
        throw new Error('Big age :-)');
    }
    return '[' + age + ']';
};

aspect.afterThrow(this, "test", function (err, name) {
    console.log('Test has thrown: ' + err.message);
});
~~~

aspect.around(`context`, `method`, `advice`)
-------------------------

Surrounds `method` of `context` with `advice`.

`advice` will automatically received a copy of the original function as its first parameter.

e.g.:

~~~javascript
// In browser.
var test = function (name, age) {
    console.log('Hi, ' + name);
    if (age > 26) {
        throw new Error('Big age :-)');
    }
    return '[' + age + ']';
};

aspect.around(this, "test", function (orig, name, age) {
    console.log('====================');
    orig(name, age);
    console.log('====================');
});
~~~


#### License

MIT
