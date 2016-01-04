'use strict';
(function (define) {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = define;
  }
  else {
    window.aspect = define;
  }
})(
(function () {
  var threeParams = function () {
    if (arguments.length !== 3) {
      throw new Error('Aspect requires three parameters.');
    }
    if (typeof arguments[0] !== 'object') {
      throw new Error('Aspect requires an object-type parameter for "object".');
    }
    if (typeof arguments[1] !== 'string') {
      throw new Error('Aspect requires an string-type parameter for "method".');
    }
    if (typeof arguments[2] !== 'function') {
      throw new Error('Aspect requires an function-type parameter for "advice".');
    }
  };

  return {
    before: function (obj, method, advice) {
      threeParams.apply(this, arguments);
      var orig = obj[method];
      obj[method] = function () {
        advice.apply(null, arguments);
        return orig.apply(null, arguments);
      };
    },

    after: function (obj, method, advice) {
     threeParams.apply(this, arguments);
     var orig = obj[method];
     obj[method] = function () {
      var value;
      var args = Array.prototype.slice.call(arguments, 0);
      try {
        value = orig.apply(null, arguments);
        args.unshift(value);
        advice.apply(null, args);
        return value;
      } catch (err) {
        value = err;
        args.unshift(value);
        advice.apply(null, args);
        throw err;
      }
     };
    },

    afterReturn: function (obj, method, advice) {
     threeParams.apply(this, arguments);
     var orig = obj[method];
     obj[method] = function () {
      var value = orig.apply(null, arguments);
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift(value);
      advice.apply(null, args);
      return value;
    };
   },

   afterThrow: function (obj, method, advice) {
    threeParams.apply(this, arguments);
    var orig = obj[method];
     obj[method] = function () {
      try {
        return orig.apply(null, arguments);
      } catch (err) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(err);
        advice.apply(null, args);
        throw err;
      }
     };
   },

    around: function (obj, method, advice) {
      threeParams.apply(this, arguments);
      var orig = obj[method];
      obj[method] = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(orig);
        return advice.apply(null, args);
      };
    }

  };

})()
);