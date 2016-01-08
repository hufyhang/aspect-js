/* jshint esnext: true */
'use strict';
let aspect = (function () {
  var threeParams = () => {
    if (arguments.length !== 3) {
      throw Error('Aspect requires three parameters.');
    }
    if (typeof arguments[0] !== 'object') {
      throw Error('Aspect requires an object-type parameter for "object".');
    }
    if (typeof arguments[1] !== 'string') {
      throw Error('Aspect requires an string-type parameter for "method".');
    }
    if (typeof arguments[2] !== 'function') {
      throw Error('Aspect requires an function-type parameter for "advice".');
    }
  };

  return {
    before: (obj, method, advice) => {
      threeParams.apply(null, arguments);
      let orig = obj[method];
      obj[method] = () => {
        advice.apply(null, arguments);
        return orig.apply(null, arguments);
      };
    },

    after: (obj, method, advice) => {
      threeParams.apply(null, arguments);
      let orig = obj[method];
      obj[method] = () => {
        let value;
        let args = [...arguments];
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

    afterReturn: (obj, method, advice) => {
      threeParams.apply(null, arguments);
      let orig = obj[method];
      obj[method] = () => {
        let value = orig.apply(null, arguments);
        let args = [...arguments];
        args.unshift(value);
        advice.apply(null, args);
        return value;
      };
    },

    afterThrow: (obj, method, advice) => {
      threeParams.apply(null, arguments);
      let orig = obj[method];
      obj[method] = () => {
        try {
          return orig.apply(null, arguments);
        } catch (err) {
          let args = [...arguments];
          args.unshift(err);
          advice.apply(null, args);
          throw err;
        }
      };
    },

    around: (obj, method, advice) => {
      threeParams.apply(null, arguments);
      let orig = obj[method];
      obj[method] = () => {
        let args = [...arguments];
        args.unshift(orig);
        return advice.apply(null, args);
      };
    }

  };
})();

export default aspect;
