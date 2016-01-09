/* jshint esnext: true */
'use strict';
let aspect = (function () {
  var threeParams = (...args) => {
    if (args.length !== 3) {
      throw Error('Aspect requires three parameters.');
    }
    if (typeof args[0] !== 'object') {
      throw Error('Aspect requires an object-type parameter for "object".');
    }
    if (typeof args[1] !== 'string') {
      throw Error('Aspect requires an string-type parameter for "method".');
    }
    if (typeof args[2] !== 'function') {
      throw Error('Aspect requires an function-type parameter for "advice".');
    }
  };

  return {
    before: (obj, method, advice) => {
      let args = [obj, method, advice];
      threeParams.apply(null, args);
      let orig = obj[method];
      obj[method] = () => {
        advice.apply(null, args);
        return orig.apply(null, args);
      };
    },

    after: (obj, method, advice) => {
      let args = [obj, method, advice];
      threeParams.apply(null, args);
      let orig = obj[method];
      obj[method] = () => {
        let value;
        try {
          value = orig.apply(null, args);
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
      let args = [obj, method, advice];
      threeParams.apply(null, args);
      let orig = obj[method];
      obj[method] = () => {
        let value = orig.apply(null, args);
        args.unshift(value);
        advice.apply(null, args);
        return value;
      };
    },

    afterThrow: (obj, method, advice) => {
      let args = [obj, method, advice];
      threeParams.apply(null, args);
      let orig = obj[method];
      obj[method] = () => {
        try {
          return orig.apply(null, args);
        } catch (err) {
          args.unshift(err);
          advice.apply(null, args);
          throw err;
        }
      };
    },

    around: (obj, method, advice) => {
      let args = [obj, method, advice];
      threeParams.apply(null, args);
      let orig = obj[method];
      obj[method] = () => {
        args.unshift(orig);
        return advice.apply(null, args);
      };
    }

  };
})();

export default aspect;
