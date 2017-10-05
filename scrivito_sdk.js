/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1187);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSFORM_SOURCE_ERROR_PREFIX = 'binary.unprocessable.image.transform.source.';
var TRANSFORM_SOURCE_TOO_LARGE = 'binary.unprocessable.image.transform.source.too_large';

// From https://phabricator.babeljs.io/T3083#65595
function ExtendableError() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  Error.apply(this, args);
}

ExtendableError.prototype = Object.create(Error.prototype);

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(ExtendableError, Error);
} else {
  ExtendableError.__proto__ = Error;
}

var ScrivitoError = function (_ExtendableError) {
  _inherits(ScrivitoError, _ExtendableError);

  function ScrivitoError(message) {
    var captureStackTrace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, ScrivitoError);

    // message should be set before capturing stacktrace
    // since it is featured in the stacktrace in some environments.
    var _this = _possibleConstructorReturn(this, (ScrivitoError.__proto__ || Object.getPrototypeOf(ScrivitoError)).call(this));

    _this.message = message;
    _this._captureStackTrace = captureStackTrace;

    if (captureStackTrace) {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(_this, _this.constructor);
      } else {
        var stack = void 0;

        try {
          throw new Error();
        } catch (error) {
          stack = error.stack;
        }

        Object.defineProperty(_this, 'stack', { value: stack });
      }
    }
    return _this;
  }

  _createClass(ScrivitoError, [{
    key: 'name',
    get: function get() {
      return this.constructor.name;
    }

    // For test purpose only.

  }, {
    key: 'captureStackTrace',
    get: function get() {
      return !!this._captureStackTrace;
    }
  }]);

  return ScrivitoError;
}(ExtendableError);

var ClientError = function (_ScrivitoError) {
  _inherits(ClientError, _ScrivitoError);

  function ClientError(message, httpCode, backendCode) {
    _classCallCheck(this, ClientError);

    var _this2 = _possibleConstructorReturn(this, (ClientError.__proto__ || Object.getPrototypeOf(ClientError)).call(this, message));

    _this2.httpCode = httpCode;
    _this2.backendCode = backendCode;
    return _this2;
  }

  _createClass(ClientError, null, [{
    key: 'for',
    value: function _for(message, httpCode, backendCode) {
      if (backendCode === TRANSFORM_SOURCE_TOO_LARGE) {
        return new TransformationSourceTooLargeError(message, httpCode, backendCode);
      }

      if (backendCode && backendCode.indexOf(TRANSFORM_SOURCE_ERROR_PREFIX) !== -1) {
        return new TransformationSourceInvalidError(message, httpCode, backendCode);
      }

      return new ClientError(message, httpCode, backendCode);
    }
  }]);

  return ClientError;
}(ScrivitoError);

var AccessDeniedError = function (_ClientError) {
  _inherits(AccessDeniedError, _ClientError);

  function AccessDeniedError(message, httpCode, backendCode) {
    _classCallCheck(this, AccessDeniedError);

    return _possibleConstructorReturn(this, (AccessDeniedError.__proto__ || Object.getPrototypeOf(AccessDeniedError)).call(this, message, httpCode, backendCode));
  }

  return AccessDeniedError;
}(ClientError);

var ArgumentError = function (_ScrivitoError2) {
  _inherits(ArgumentError, _ScrivitoError2);

  function ArgumentError(message) {
    _classCallCheck(this, ArgumentError);

    return _possibleConstructorReturn(this, (ArgumentError.__proto__ || Object.getPrototypeOf(ArgumentError)).call(this, message));
  }

  return ArgumentError;
}(ScrivitoError);

var CommunicationError = function (_ScrivitoError3) {
  _inherits(CommunicationError, _ScrivitoError3);

  function CommunicationError(message, httpCode) {
    _classCallCheck(this, CommunicationError);

    var _this5 = _possibleConstructorReturn(this, (CommunicationError.__proto__ || Object.getPrototypeOf(CommunicationError)).call(this, message));

    _this5.httpCode = httpCode;
    return _this5;
  }

  return CommunicationError;
}(ScrivitoError);

var BackendError = function (_CommunicationError) {
  _inherits(BackendError, _CommunicationError);

  function BackendError(message, httpCode) {
    _classCallCheck(this, BackendError);

    return _possibleConstructorReturn(this, (BackendError.__proto__ || Object.getPrototypeOf(BackendError)).call(this, message, httpCode));
  }

  return BackendError;
}(CommunicationError);

var InternalError = function (_ScrivitoError4) {
  _inherits(InternalError, _ScrivitoError4);

  function InternalError(message) {
    _classCallCheck(this, InternalError);

    return _possibleConstructorReturn(this, (InternalError.__proto__ || Object.getPrototypeOf(InternalError)).call(this, message));
  }

  return InternalError;
}(ScrivitoError);

var NetworkError = function (_CommunicationError2) {
  _inherits(NetworkError, _CommunicationError2);

  function NetworkError(response) {
    _classCallCheck(this, NetworkError);

    var status = response.status;

    var _this8 = _possibleConstructorReturn(this, (NetworkError.__proto__ || Object.getPrototypeOf(NetworkError)).call(this, status === 0 ? response.statusText : response.responseText, status));

    _this8.response = response;
    return _this8;
  }

  return NetworkError;
}(CommunicationError);

var RateLimitExceededError = function (_CommunicationError3) {
  _inherits(RateLimitExceededError, _CommunicationError3);

  function RateLimitExceededError(message, httpCode) {
    _classCallCheck(this, RateLimitExceededError);

    return _possibleConstructorReturn(this, (RateLimitExceededError.__proto__ || Object.getPrototypeOf(RateLimitExceededError)).call(this, message, httpCode));
  }

  return RateLimitExceededError;
}(CommunicationError);

// public API


var ResourceNotFoundError = function (_ScrivitoError5) {
  _inherits(ResourceNotFoundError, _ScrivitoError5);

  function ResourceNotFoundError(message) {
    _classCallCheck(this, ResourceNotFoundError);

    return _possibleConstructorReturn(this, (ResourceNotFoundError.__proto__ || Object.getPrototypeOf(ResourceNotFoundError)).call(this, message));
  }

  return ResourceNotFoundError;
}(ScrivitoError);

var UnauthorizedError = function (_ClientError2) {
  _inherits(UnauthorizedError, _ClientError2);

  function UnauthorizedError(message, httpCode, backendCode, details) {
    _classCallCheck(this, UnauthorizedError);

    var _this11 = _possibleConstructorReturn(this, (UnauthorizedError.__proto__ || Object.getPrototypeOf(UnauthorizedError)).call(this, message, httpCode, backendCode));

    _this11.details = details || {};
    return _this11;
  }

  return UnauthorizedError;
}(ClientError);

var TransformationSourceTooLargeError = function (_ClientError3) {
  _inherits(TransformationSourceTooLargeError, _ClientError3);

  function TransformationSourceTooLargeError(message, httpCode, backendCode) {
    _classCallCheck(this, TransformationSourceTooLargeError);

    return _possibleConstructorReturn(this, (TransformationSourceTooLargeError.__proto__ || Object.getPrototypeOf(TransformationSourceTooLargeError)).call(this, message, httpCode, backendCode));
  }

  return TransformationSourceTooLargeError;
}(ClientError);

var TransformationSourceInvalidError = function (_ClientError4) {
  _inherits(TransformationSourceInvalidError, _ClientError4);

  function TransformationSourceInvalidError(message, httpCode, backendCode) {
    _classCallCheck(this, TransformationSourceInvalidError);

    return _possibleConstructorReturn(this, (TransformationSourceInvalidError.__proto__ || Object.getPrototypeOf(TransformationSourceInvalidError)).call(this, message, httpCode, backendCode));
  }

  return TransformationSourceInvalidError;
}(ClientError);

var TranslationError = function (_InternalError) {
  _inherits(TranslationError, _InternalError);

  function TranslationError(message) {
    _classCallCheck(this, TranslationError);

    return _possibleConstructorReturn(this, (TranslationError.__proto__ || Object.getPrototypeOf(TranslationError)).call(this, message));
  }

  return TranslationError;
}(InternalError);

var NavigateToEmptyBinaryError = function (_InternalError2) {
  _inherits(NavigateToEmptyBinaryError, _InternalError2);

  function NavigateToEmptyBinaryError(message) {
    _classCallCheck(this, NavigateToEmptyBinaryError);

    return _possibleConstructorReturn(this, (NavigateToEmptyBinaryError.__proto__ || Object.getPrototypeOf(NavigateToEmptyBinaryError)).call(this, message));
  }

  return NavigateToEmptyBinaryError;
}(InternalError);

var InterpolationError = function (_TranslationError) {
  _inherits(InterpolationError, _TranslationError);

  function InterpolationError(message) {
    _classCallCheck(this, InterpolationError);

    return _possibleConstructorReturn(this, (InterpolationError.__proto__ || Object.getPrototypeOf(InterpolationError)).call(this, message));
  }

  return InterpolationError;
}(TranslationError);

exports.AccessDeniedError = AccessDeniedError;
exports.ArgumentError = ArgumentError;
exports.BackendError = BackendError;
exports.ClientError = ClientError;
exports.InternalError = InternalError;
exports.InterpolationError = InterpolationError;
exports.NavigateToEmptyBinaryError = NavigateToEmptyBinaryError;
exports.NetworkError = NetworkError;
exports.RateLimitExceededError = RateLimitExceededError;
exports.ResourceNotFoundError = ResourceNotFoundError;
exports.ScrivitoError = ScrivitoError;
exports.TransformationSourceInvalidError = TransformationSourceInvalidError;
exports.TransformationSourceTooLargeError = TransformationSourceTooLargeError;
exports.TranslationError = TranslationError;
exports.UnauthorizedError = UnauthorizedError;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deferred = function Deferred() {
  var _this = this;

  _classCallCheck(this, Deferred);

  this.promise = new scrivito.Promise(function (resolveFn, rejectFn) {
    _this.resolve = resolveFn;
    _this.reject = rejectFn;
  });
};

exports.default = Deferred;

/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validClassesForWidgetlistField;

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _widget_class = __webpack_require__(24);

var _widget_class2 = _interopRequireDefault(_widget_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALLOWED_CLASSES_ATTR = 'data-scrivito-private-field-widget-allowed-classes';

var cache = {};

function validClassesForWidgetlistField(field) {
  var validClasses = cache[field.id()];

  if (validClasses) {
    return validClasses;
  }

  return _underscore2.default.pluck(_widget_class2.default.all(), 'name');
}

function init() {
  if (!scrivito.editingContext.isViewMode()) {
    scrivito.on('content', function (root) {
      var widgetlistElements = scrivito.WidgetlistFieldElement.all($(root));
      _underscore2.default.each(widgetlistElements, function (element) {
        var field = element.basicField();
        cache[field.id()] = JSON.parse(element.dom_element().attr(ALLOWED_CLASSES_ATTR));
      });
    });
  }
}

function clearCache() {
  cache = {};
}

validClassesForWidgetlistField.init = init;
validClassesForWidgetlistField.clearCache = clearCache;

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = findWidgetPlacement;

var _attribute = __webpack_require__(26);

var _attribute2 = _interopRequireDefault(_attribute);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findWidgetPlacement(objData, widgetId) {
  var placement = findWidgetPlacementIn(objData, widgetId);

  if (placement) {
    return placement;
  }

  var widgetPool = objData._widget_pool;

  _underscore2.default.find(widgetPool, function (parentWidgetData, parentWidgetId) {
    placement = findWidgetPlacementIn(parentWidgetData, widgetId);

    if (placement) {
      placement.parentWidgetId = parentWidgetId;
      return true;
    }
  });

  return placement;
}

function findWidgetPlacementIn(objOrWidgetData, widgetId) {
  var placement = void 0;

  _underscore2.default.find(objOrWidgetData, function (attributeDict, attributeName) {
    if (_attribute2.default.isSystemAttribute(attributeName)) {
      return;
    }

    var _attributeDict = _slicedToArray(attributeDict, 2),
        attributeType = _attributeDict[0],
        attributeValue = _attributeDict[1];

    if (attributeValue && attributeType === 'widgetlist') {
      var index = attributeValue.indexOf(widgetId);

      if (index !== -1) {
        placement = { attributeName: attributeName, index: index };
        return true;
      }
    }
  });

  return placement;
}

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FRAGMENT_VALUE_LOCATOR = '&scrivito.authFailedCount=';
var failureCount = void 0;

function init(addressWindow) {
  reset();
  var location = addressWindow.location;
  var fragment = location.hash;
  var offset = fragment.indexOf(FRAGMENT_VALUE_LOCATOR);
  if (offset < 0) {
    return;
  }
  var countAsString = fragment.substr(offset + FRAGMENT_VALUE_LOCATOR.length, 3);
  var remainingFragment = fragment.substring(0, offset);
  if (remainingFragment === '#') {
    remainingFragment = '';
  }
  var newLocation = location.href.toString().replace(fragment, remainingFragment);
  failureCount = parseInt(countAsString, 10) || 0;
  addressWindow.history.replaceState({}, '', newLocation);
}

function reset() {
  failureCount = 0;
}

function augmentedRedirectUrl(currentLocation) {
  var returnTo = currentLocation.toString();
  if (!currentLocation.hash) {
    returnTo = returnTo + '#';
  }
  return '' + returnTo + FRAGMENT_VALUE_LOCATOR + (failureCount + 1);
}

function currentFailureCount() {
  return failureCount;
}

exports.default = {
  init: init,
  augmentedRedirectUrl: augmentedRedirectUrl,
  reset: reset,
  currentFailureCount: currentFailureCount
};

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(186);


/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* this module is package-private, i.e. do not import from outside of loadable. */
Object.defineProperty(exports, "__esModule", { value: true });
var underscore_1 = __webpack_require__(0);
var globalCaptureList;
function capture(fn) {
    var globalCaptureBefore = globalCaptureList;
    try {
        globalCaptureList = [];
        fn();
        return new CaptureReport(globalCaptureList);
    }
    finally {
        globalCaptureList = globalCaptureBefore;
    }
}
exports.capture = capture;
function notifyMissingData(loader) {
    if (globalCaptureList) {
        globalCaptureList.push({ reason: 'missing', loader: loader });
    }
}
exports.notifyMissingData = notifyMissingData;
function notifyOutdatedData(loader) {
    if (globalCaptureList) {
        globalCaptureList.push({ reason: 'outdated', loader: loader });
    }
}
exports.notifyOutdatedData = notifyOutdatedData;
var CaptureReport = /** @class */ (function () {
    function CaptureReport(captureList) {
        this.captureList = captureList;
    }
    /* returns true iff no data is missing, doesn't care about outdated  */
    CaptureReport.prototype.isAllDataLoaded = function () {
        return !underscore_1.findWhere(this.captureList, { reason: 'missing' });
    };
    /* returns true iff no data is missing or outdated */
    CaptureReport.prototype.isAllDataUpToDate = function () {
        return this.captureList.length === 0;
    };
    /* triggers (re-)loading of all missing or outdated data that was captured */
    CaptureReport.prototype.loadRequiredData = function () {
        if (this.captureList.length === 0) {
            // without this, a resolved promise would be returned.
            // a careless caller could easily produce a hard-to-debug infinite loop.
            // returning no promise lets a careless caller fail early - easier to debug.
            return null;
        }
        this.captureList.forEach(function (captured) { return captured.loader(); });
    };
    return CaptureReport;
}());
exports.CaptureReport = CaptureReport;


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_es6_1 = __webpack_require__(1);
var loadingState = {};
var EMPTY_STATE = { status: undefined };
// A wrapper around a value that is retrieved asynchronously.
// This class is stateless and (almost) pure:
// * it does not perform any I/O
// * the only side-effect it has is changing the provided state container
// * it does not keep any state itself
// * state is replaced, not mutated
// * it does not use Promises
var LoadableValue = /** @class */ (function () {
    // stateContainer is where the LoadableValue should store its state.
    function LoadableValue(stateContainer) {
        if (!stateContainer) {
            throw new errors_es6_1.InternalError('LoadableValue needs stateContainer');
        }
        this.container = stateContainer;
        this.id = stateContainer.id();
    }
    LoadableValue.resetLoadingState = function () {
        loadingState = {};
    };
    // store a loadId to identify the current load operation.
    // this allows you to distinguish different load operations
    // to facilitate concurrency protection, like optimistic locking.
    LoadableValue.prototype.setLoading = function (loadId) {
        loadingState[this.id] = loadId;
    };
    // return the current loadId. should only be called if loading.
    LoadableValue.prototype.getLoading = function () {
        return loadingState[this.id];
    };
    LoadableValue.prototype.status = function () {
        return this.getState().status || 'MISSING';
    };
    LoadableValue.prototype.value = function () {
        var state = this.getState();
        if (state.status !== 'AVAILABLE') {
            return;
        }
        return state.value;
    };
    LoadableValue.prototype.error = function () {
        var state = this.getState();
        if (state.status !== 'ERROR') {
            return;
        }
        return state.error;
    };
    LoadableValue.prototype.version = function () {
        var state = this.getState();
        if (state.status === undefined) {
            return;
        }
        return state.version;
    };
    LoadableValue.prototype.transitionToMissing = function () {
        this.setState({ status: undefined });
    };
    LoadableValue.prototype.transitionToAvailable = function (value, version) {
        this.setState({ status: 'AVAILABLE', value: value, version: version });
    };
    LoadableValue.prototype.transitionToError = function (error, version) {
        this.setState({ status: 'ERROR', error: error, version: version });
    };
    LoadableValue.prototype.setState = function (state) {
        delete loadingState[this.id];
        this.container.set(state);
    };
    LoadableValue.prototype.getState = function () {
        return this.container.get() || EMPTY_STATE;
    };
    return LoadableValue;
}());
exports.default = LoadableValue;


/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_es6_1 = __webpack_require__(1);
var underscore_1 = __webpack_require__(0);
var treeIdCounter = 0;
// use native assign where available, since it's faster
var assign = Object.assign || underscore_1.extend;
// abstract interface for managing state
var AbstractStateStore = /** @class */ (function () {
    function AbstractStateStore() {
    }
    // return current state
    AbstractStateStore.prototype.get = function () {
        var _this = this;
        var valueWhenAccessed = this.untrackedGet();
        this.recordDetector(function () { return valueWhenAccessed !== _this.untrackedGet(); });
        return valueWhenAccessed;
    };
    AbstractStateStore.prototype.recordDetector = function (detector) {
        this.getTree().recordDetector(detector);
    };
    // reset the state back to undefined
    AbstractStateStore.prototype.clear = function () {
        this.set(undefined);
    };
    // this method may only be called when StateType is fully partial,
    // i.e. all properties defined by StateType are optional.
    AbstractStateStore.prototype.subState = function (key) {
        return new StateTreeNode(this, key);
    };
    // this method may only be called when StateType is fully partial,
    // i.e. all properties defined by StateType are optional.
    AbstractStateStore.prototype.setSubState = function (key, newSubState) {
        var priorState = this.untrackedGet();
        if (priorState === undefined) {
            var newState = (_a = {}, _a[key] = newSubState, _a);
            // Since StateType is fully partial, newState is a valid StateType.
            // No way to tell TypeScript this, though, therefore using `any`.
            this.set(newState);
        }
        else {
            var duplicate = assign({}, priorState);
            duplicate[key] = newSubState;
            this.set(duplicate);
        }
        var _a;
    };
    AbstractStateStore.prototype.getSubState = function (key) {
        var state = this.untrackedGet();
        if (state !== undefined) {
            return state[key];
        }
    };
    return AbstractStateStore;
}());
// a state tree, which can be used to store state.
// this is the root of the tree, which keeps the state of the entire tree.
var StateTree = /** @class */ (function (_super) {
    __extends(StateTree, _super);
    function StateTree() {
        var _this = _super.call(this) || this;
        _this.treeId = (treeIdCounter++).toString();
        _this.clearListeners();
        _this.batchUpdates = false;
        _this.version = 0;
        return _this;
    }
    StateTree.prototype.untrackedGet = function () {
        return this.state;
    };
    StateTree.prototype.set = function (newState) {
        this.state = newState;
        this.version++;
        if (!this.batchUpdates) {
            this.notifyListeners();
        }
    };
    /* Executes the given function and tracks read access to this tree.
      * All substates that are accessed while the function runs are considered "relevant".
      *
      * Returns a change detector function. The detector function returns:
      * - truthy if any relevant state has changed in the meantime
      * - falsey if all relevant state is still as it was
      *
      * The detector function can be used for cache invalidation:
      * If the detector returns false, then running the function again
      * will yield the same result - provided that all relevant data is stored inside this tree.
      */
    StateTree.prototype.trackChanges = function (fn) {
        var _this = this;
        var versionBefore = this.version;
        var individualDetectors = this.recordDetectors(fn);
        // checking the version first, to avoid running all detectors
        // when the tree is unchanged
        var overallDetector = function () {
            return _this.version !== versionBefore &&
                !!underscore_1.find(individualDetectors, function (detector) { return detector(); });
        };
        return overallDetector;
    };
    StateTree.prototype.recordDetector = function (detector) {
        var recording = this.detectorRecording;
        if (recording !== undefined) {
            recording.push(detector);
        }
    };
    StateTree.prototype.getTree = function () {
        return this;
    };
    StateTree.prototype.id = function () {
        return this.treeId;
    };
    StateTree.prototype.subscribe = function (listener) {
        var _this = this;
        var active = true;
        var guardedListener = function () { if (active) {
            listener();
        } };
        this.ensureCanMutateListeners();
        this.listeners.push(guardedListener);
        return function () {
            active = false;
            var index = _this.listeners.indexOf(guardedListener);
            _this.ensureCanMutateListeners();
            _this.listeners.splice(index, 1);
        };
    };
    StateTree.prototype.withBatchedUpdates = function (fn) {
        var stateBefore = this.state;
        var batchBefore = this.batchUpdates;
        try {
            this.batchUpdates = true;
            fn();
        }
        finally {
            this.batchUpdates = batchBefore;
            if (!this.batchUpdates && stateBefore !== this.state) {
                this.notifyListeners();
            }
        }
    };
    // For test purpose only.
    StateTree.prototype.listenerCount = function () {
        return this.listeners.length;
    };
    // public for test purpose only.
    StateTree.prototype.clearListeners = function () {
        this.listeners = [];
    };
    StateTree.prototype.recordDetectors = function (fn) {
        if (this.detectorRecording !== undefined) {
            throw new errors_es6_1.InternalError('no nested detector recording!');
        }
        try {
            this.detectorRecording = [];
            fn();
            return this.detectorRecording;
        }
        finally {
            this.detectorRecording = undefined;
        }
    };
    StateTree.prototype.notifyListeners = function () {
        this.listenersToNotify = this.listeners;
        this.listenersToNotify.forEach(function (listener) { return listener(); });
    };
    StateTree.prototype.ensureCanMutateListeners = function () {
        if (this.listenersToNotify === this.listeners) {
            // make shallow copy to avoid messing up a running notification loop
            this.listeners = this.listeners.slice();
        }
    };
    return StateTree;
}(AbstractStateStore));
exports.default = StateTree;
// a node of a state tree.
// does not actually keep state, but provides
// access scoped to a subtree of a StateTree.
var StateTreeNode = /** @class */ (function (_super) {
    __extends(StateTreeNode, _super);
    function StateTreeNode(parentState, key) {
        var _this = _super.call(this) || this;
        _this.parentState = parentState;
        _this.key = key;
        // cache tree locally (performance)
        _this.tree = parentState.getTree();
        return _this;
    }
    StateTreeNode.prototype.getTree = function () {
        return this.tree;
    };
    StateTreeNode.prototype.untrackedGet = function () {
        return this.parentState.getSubState(this.key);
    };
    StateTreeNode.prototype.set = function (newState) {
        this.parentState.setSubState(this.key, newState);
    };
    StateTreeNode.prototype.id = function () {
        // first convert backslash to double-backslash
        // then convert slash to backslash-slash
        var escapedKey = this.key.replace(/\\/g, '\\\\').replace(/\//g, '\\/');
        return this.parentState.id() + "/" + escapedKey;
    };
    return StateTreeNode;
}(AbstractStateStore));


/***/ }),

/***/ 1187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _connect_to_ui = __webpack_require__(80);

var _connect_to_ui2 = _interopRequireDefault(_connect_to_ui);

var _scrivito_sdk = __webpack_require__(190);

var _is_inside_extensions_document = __webpack_require__(557);

var _is_inside_extensions_document2 = _interopRequireDefault(_is_inside_extensions_document);

var _asset_loading = __webpack_require__(97);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This is the webpack entry file used by pure JS applications (i.e. no Rails)
 */
var ui = (0, _connect_to_ui2.default)();

(0, _scrivito_sdk.initializeSdk)(ui);

if (ui && !(0, _is_inside_extensions_document2.default)()) {
  (0, _asset_loading.loadCss)('/scrivito/scrivito_editing.css');
  (0, _asset_loading.loadJs)('/scrivito/scrivito_editing.js');
}

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deferred = __webpack_require__(10);

var _deferred2 = _interopRequireDefault(_deferred);

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load triggers the loading of all resource that the passed in
// function needs and returns a Promise to the result of the function.
//
// It can be used to convert synchronous code (the loadable function)
// into asynchronous code (Promise to the return value).
//
// A loadable function is a function that:
// * may throw a NotLoadedError
// * is pure, i.e. idempotent, doesn't perform I/O, is free of side-effects
//
// load will run the provided function as many times as needed,
// and trigger loading of any NotLoadedError that should occur.
//
// It returns a Promise that fulfills once the function returns a value.
// If the function throws an Exception (other than NotLoadedError),
// the Promise is rejected.
function load(loadableFunction) {
  function tryToSettle() {
    var run = void 0;
    var error = void 0;

    var captured = _loadable_data2.default.capture(function () {
      try {
        run = _loadable_data2.default.run(loadableFunction);
      } catch (e) {
        error = e;
      }
    });

    if (!captured.isAllDataUpToDate()) {
      captured.loadRequiredData();

      var deferred = new _deferred2.default();

      var unsubscribe = (0, _global_state.subscribe)(function () {
        deferred.resolve();
        unsubscribe();
      });

      return deferred.promise.then(tryToSettle);
    }

    if (error) {
      throw error;
    }

    return run.result;
  }

  return new scrivito.Promise(function (resolve) {
    return resolve(tryToSettle());
  });
}

exports.default = load;

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeRailsThumbnails = exports.getRailsThumbnail = undefined;

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRailsThumbnail(objClassName) {
  return loadableData().get()[objClassName] || null;
}

// For test purpose only.
function storeRailsThumbnails(thumbnails) {
  loadableData().set(thumbnails);
}

function loadableData() {
  var state = _global_state.uiState.subState('railsThumbnails');
  return new _loadable_data2.default({ state: state, loader: loader, throwNotLoaded: true });
}

function loader() {
  return scrivito.ajax('GET', 'obj_class/thumbnails');
}

exports.getRailsThumbnail = getRailsThumbnail;
exports.storeRailsThumbnails = storeRailsThumbnails;

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function setupDragstartEvent(e) {
  e.dataTransfer.effectAllowed = 'move';

  // Is required in order to dragover event is triggered in FF and Safari.
  // http://stackoverflow.com/questions/21507189/dragenter-dragover-and-drop-events-not-working-in-firefox
  // IE 11 however does not allow to set the data, which results in a security exception.
  try {
    e.dataTransfer.setData('text/plain', e.target.id);
  } catch (error) {
    // Ignore.
  }
}

exports.default = setupDragstartEvent;

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeValidRailsPageClasses = exports.validRailsPageClasses = undefined;

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validRailsPageClasses(path) {
  return loadableDataFor(path).get();
}

function loadableDataFor(path) {
  var state = void 0;
  var baseState = _global_state.uiState.subState('validRailsPageClasses');

  if (path) {
    state = baseState.subState('byPath').subState(path);
  } else {
    state = baseState.subState('withoutPath');
  }

  return new _loadable_data2.default({
    state: state,
    loader: loaderFor(path),
    throwNotLoaded: true
  });
}

// For test purpose only
function storeValidRailsPageClasses(path, objClassNames) {
  loadableDataFor(path).set(objClassNames);
}

function loaderFor(path) {
  var queryString = '';

  if (path) {
    queryString = '?' + $.param({ parent_path: path });
  }

  return function () {
    return scrivito.ajax('GET', 'objs/valid_page_classes' + queryString);
  };
}

exports.validRailsPageClasses = validRailsPageClasses;
exports.storeValidRailsPageClasses = storeValidRailsPageClasses;

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetIsConfigured = exports.isConfigured = exports.configure = undefined;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _underscore = __webpack_require__(0);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isConfigured = false;

function configure(_ref) {
  var endpoint = _ref.endpoint,
      forceVerification = _ref.forceVerification,
      homepage = _ref.homepage,
      routingBasePath = _ref.routingBasePath,
      routingMethod = _ref.routingMethod,
      tenant = _ref.tenant;

  if (!tenant) {
    throw new _errors.ArgumentError('Required configuration "tenant" missing.');
  }

  scrivito.CmsRestApi.init(endpoint || 'api.scrivito.com', tenant);
  if (forceVerification) {
    scrivito.CmsRestApi.enableForceVerification();
  }
  scrivito.RoutingPath.init(homepageCallback(homepage));
  scrivito.Routing.init(routingOptions(routingMethod, routingBasePath));
  _isConfigured = true;
}

function homepageCallback(homepage) {
  if (!homepage) {
    // use the default homepage
    return function () {
      return _basic_obj2.default.root();
    };
  }
  if (!(0, _underscore.isFunction)(homepage)) {
    throw new _errors.ArgumentError('The "homepage" configuration option is invalid. Please provide a function' + ' returning a "scrivito.Obj", e.g. "() => scrivito.Obj.findByPath(\'/en\')"');
  }
  return homepage;
}

function routingOptions(routingMethod, routingBasePath) {
  if (routingMethod) {
    if (!(0, _underscore.contains)(['path', 'hash'], routingMethod)) {
      throw new _errors.ArgumentError('Expected the configuration option "routingMethod" to be set to "hash" or "path", ' + ('but saw "' + routingMethod + '" instead.'));
    }
  }
  if (routingBasePath && !(0, _underscore.isString)(routingBasePath)) {
    throw new _errors.ArgumentError('Configuration "routingBasePath" needs to be a String.');
  }
  return { routingMethod: routingMethod, routingBasePath: routingBasePath };
}

function isConfigured() {
  return _isConfigured;
}

// for test purpose only
function resetIsConfigured() {
  _isConfigured = false;
}

exports.configure = configure;
exports.isConfigured = isConfigured;
exports.resetIsConfigured = resetIsConfigured;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.isComponentMounted = exports.mountComponent = undefined;

var _errors = __webpack_require__(1);

var _component_registry = __webpack_require__(50);

var _window_context = __webpack_require__(30);

var _window_proxy = __webpack_require__(31);

var _on_element_resize = __webpack_require__(261);

var _on_element_resize2 = _interopRequireDefault(_on_element_resize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isComponentMounted = false;

function mountComponent(componentId, props) {
  if (_isComponentMounted) {
    return;
  }

  var componentClass = (0, _component_registry.getById)(componentId);

  if (!componentClass) {
    throw new _errors.ArgumentError('Component with ID "' + componentId + '" not found. ' + 'Please make sure you registered it using "Scrivito.registerComponent".');
  }

  var obj = void 0;
  var widget = void 0;

  if (props.widgetId) {
    widget = (0, _window_context.getWindowContext)().Obj.get(props.objId).widget(props.widgetId);
  } else {
    obj = (0, _window_context.getWindowContext)().Obj.get(props.objId);
  }

  _isComponentMounted = true;

  var element = appendComponentToDOM((0, _window_proxy.getDocument)(), componentClass, { obj: obj, widget: widget });

  (0, _on_element_resize2.default)(element, function () {
    return scrivito.uiAdapter.notifyDocumentResize();
  });
  scrivito.uiAdapter.notifyDocumentResize();
}

function isComponentMounted() {
  return _isComponentMounted;
}

function reset() {
  _isComponentMounted = false;
}

function appendComponentToDOM(doc, componentClass, props) {
  var element = doc.createElement('div');

  doc.body.innerHTML = '';
  doc.body.appendChild(element);

  ReactDOM.render(React.createElement(componentClass, props), element);

  return element;
}

exports.mountComponent = mountComponent;
exports.isComponentMounted = isComponentMounted;
exports.reset = reset;

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUiConfigPropertyFor = exports.provideEditingConfig = undefined;

var _window_registry = __webpack_require__(48);

var _errors = __webpack_require__(1);

var uiConfigForClass = {};

function getUiConfigPropertyFor(className, propertyName) {
  if (!className) {
    throw new _errors.ArgumentError('Missing argument "className"');
  }
  if (!propertyName) {
    throw new _errors.ArgumentError('Missing argument "propertyName"');
  }

  var config = uiConfigForClass[className];
  if (!config) {
    return;
  }

  return config[propertyName];
}

function provideEditingConfig(appClass, uiConfig) {
  var className = (0, _window_registry.getWindowRegistry)().objClassNameFor(appClass);
  if (!className) {
    throw new _errors.ArgumentError('Expected an Obj or Widget class.');
  }
  uiConfigForClass[className] = uiConfig;
}

exports.provideEditingConfig = provideEditingConfig;
exports.getUiConfigPropertyFor = getUiConfigPropertyFor;

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// I/O with the (rails) server the document was loaded from
(function () {
  var isDisabled = false;

  function ajax(type, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var isWriteRequest = _underscore2.default.contains(['PUT', 'POST', 'DELETE'], type);
    var skipWriteMonitor = options && options.skip_write_monitor;

    if (isWriteRequest) {
      options.timeout = 15000; // miliseconds

      if (!skipWriteMonitor) {
        scrivito.WriteMonitor.startWrite();
      }
    }

    var ajaxPromise = performRequest(type, path, options);

    if (isWriteRequest && !skipWriteMonitor) {
      scrivito.WriteMonitor.endWriteWhenDone(ajaxPromise);
    }

    return ajaxPromise;
  }

  function ajaxWithErrorDialog(type, path, options) {
    return scrivito.ajax(type, path, options).catch(function (error) {
      displayAjaxError(error);
      throw error;
    });
  }

  function displayAjaxError(error) {
    var message = void 0;
    var messageForEditor = void 0;

    if (_underscore2.default.isObject(error)) {
      message = scrivito.t('ajax_error', error.message);
      messageForEditor = error.message_for_editor;
    } else if (_underscore2.default.contains(['abort', 'parsererror', 'timeout'], error)) {
      message = scrivito.t('ajax_error.communication');
    } else {
      message = scrivito.t('ajax_error', error);
    }

    if (scrivito.isDevelopmentMode) {
      scrivito.AlertDialog.open(message);
    } else {
      scrivito.logError(message);
      scrivito.ErrorDialog.open(messageForEditor || scrivito.t('ajax_error.message_for_editor'), [error.timestamp, message]);
    }
  }

  // For test purpose only
  function disableAjax() {
    isDisabled = true;
  }

  // For test purpose only
  function enableAjax() {
    isDisabled = false;
  }

  function performRequest(type, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (isDisabled) {
      return scrivito.Promise.reject('scrivito.ajax is disabled due to scrivito.disableAjax()!');
    }

    var baseUrl = window.location.protocol + '//' + window.location.host + '/__scrivito/';
    if (options.data) {
      options.data = JSON.stringify(options.data);
    }
    var ajaxRequest = $.ajax(baseUrl + path, _underscore2.default.extend({
      type: type,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      cache: false }, options));

    return new scrivito.Promise(function (resolve, reject) {
      ajaxRequest.then(resolve);
      ajaxRequest.fail(function (xhr, _textStatus, xhrError) {
        try {
          return reject(JSON.parse(xhr.responseText));
        } catch (_error) {
          return reject(xhrError);
        }
      });
    });
  }

  scrivito.ajax = ajax;
  scrivito.ajaxWithErrorDialog = ajaxWithErrorDialog;
  scrivito.displayAjaxError = displayAjaxError;

  scrivito.disableAjax = disableAjax;
  scrivito.enableAjax = enableAjax;
})();

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _load = __webpack_require__(12);

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function provideAsyncInstanceMethods(klass, methods) {
    return provideAsyncMethods(klass.prototype, methods);
  }

  function provideAsyncMethods(klass, methods) {
    _underscore2.default.each(methods, function (asyncName, syncName) {
      klass[asyncName] = asyncMethodFor(syncName);
    });
  }

  function asyncMethodFor(syncName) {
    return function asyncMethod() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return scrivito.PublicPromise.resolve((0, _load2.default)(function () {
        return _this[syncName].apply(_this, args);
      }));
    };
  }

  function asyncMethodStub() {
    throw new _errors.InternalError('this method is supposed to be overwritten by calling provideAsyncMethods');
  }

  // export
  scrivito.provideAsyncMethods = provideAsyncMethods;
  scrivito.provideAsyncClassMethods = provideAsyncMethods;
  scrivito.provideAsyncInstanceMethods = provideAsyncInstanceMethods;
  scrivito.asyncMethodStub = asyncMethodStub;
})();

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global_state = __webpack_require__(4);

(function () {
  var bufferedUpdates = [];

  var isUpdateScheduled = function isUpdateScheduled() {
    return bufferedUpdates.length;
  };

  function add(callback) {
    if (!isUpdateScheduled()) {
      scrivito.nextTick(function () {
        (0, _global_state.withBatchedUpdates)(function () {
          return performUpdate(bufferedUpdates);
        });
      });
    }

    bufferedUpdates.push(callback);
  }

  function performUpdate(callbacks) {
    bufferedUpdates = [];

    try {
      callbacks.forEach(function (callback) {
        return callback();
      });
    } finally {
      if (isUpdateScheduled()) {
        performUpdate(bufferedUpdates);
      }
    }
  }

  scrivito.batchedStateUpdater = { add: add };
})();

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONVERT_TO_CAMELCASE = /(_+)(\w)/g;
var CONVERT_TO_UNDERSCORE = /([A-Z])/g;

var TEST_CAMEL_CASE = /^_?(_+[A-Z0-9]|[^_])+$/;
var TEST_UNDERSCORE = /^[a-z0-9_:]+$/;

function isUnderscore(name) {
  return TEST_UNDERSCORE.test(name);
}

function isCamelCase(name) {
  return TEST_CAMEL_CASE.test(name);
}

function underscore(name) {
  return name.replace(CONVERT_TO_UNDERSCORE, function (_match, group) {
    return '_' + group.toLowerCase();
  });
}

function camelCase(name) {
  return name.replace(CONVERT_TO_CAMELCASE, function (match, underscores, nextChar, index) {
    if (!index) {
      return match;
    }
    if (nextChar.toUpperCase() === nextChar) {
      return match;
    }

    return '' + underscores.substr(1) + nextChar.toUpperCase();
  });
}

function classify(name) {
  var camelCased = camelCase(name);
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}

function titleCase(name) {
  return underscore(name).replace(/[_\s]+/g, ' ').trim().replace(/\w\S*/g, capitalize);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

scrivito.attributeInflection = {
  camelCase: camelCase,
  classify: classify,
  isCamelCase: isCamelCase,
  isUnderscore: isUnderscore,
  underscore: underscore
};

exports.camelCase = camelCase;
exports.classify = classify;
exports.isCamelCase = isCamelCase;
exports.isUnderscore = isUnderscore;
exports.titleCase = titleCase;
exports.underscore = underscore;

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deferred = __webpack_require__(10);

var _deferred2 = _interopRequireDefault(_deferred);

var _urijs = __webpack_require__(38);

var _urijs2 = _interopRequireDefault(_urijs);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _auth_failure_counter = __webpack_require__(102);

var _auth_failure_counter2 = _interopRequireDefault(_auth_failure_counter);

var _public_authentication = __webpack_require__(170);

var _public_authentication2 = _interopRequireDefault(_public_authentication);

var _window_proxy = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MIN_REQUEST_TIME = 5;
  var DEFAULT_REQUEST_TIMEOUT = 15000;

  var backendEndpoint = void 0;
  var tenant = void 0;
  var initDeferred = void 0;
  var authHeaderValueProvider = void 0;
  var forceVerification = void 0;

  scrivito.CmsRestApi = {
    init: function init(endpoint, initTenant, authorizationProvider) {
      if (initTenant) {
        backendEndpoint = endpoint;
        tenant = initTenant;

        if (initDeferred) {
          initDeferred.resolve();
        }
      }
      authHeaderValueProvider = authorizationProvider || authHeaderValueProvider || _public_authentication2.default;
    },


    // For test purpose only.
    reset: function reset() {
      backendEndpoint = undefined;
      tenant = undefined;
      initDeferred = undefined;
      authHeaderValueProvider = undefined;
      forceVerification = undefined;
    },
    get: function get(path, requestParams) {
      return fetch('GET', path, requestParams);
    },
    put: function put(path, requestParams) {
      return fetch('PUT', path, requestParams);
    },
    post: function post(path, requestParams) {
      return fetch('POST', path, requestParams);
    },
    delete: function _delete(path, requestParams) {
      return fetch('DELETE', path, requestParams);
    },
    requestBuiltInUserSession: function requestBuiltInUserSession(sessionId) {
      return ensureInitialized().then(function () {
        var method = 'PUT';
        var path = 'sessions/' + sessionId;
        var promise = retryRequest(method, function (timeout) {
          return requestAjaxDeferred(ajax({ method: method, path: path, timeout: timeout }));
        });
        promise.then(_auth_failure_counter2.default.reset);
        return promise;
      });
    },


    // For test purpose only.
    enableForceVerification: function enableForceVerification() {
      forceVerification = true;
    },


    // For test purpose only.
    currentPublicAuthorizationState: function currentPublicAuthorizationState() {
      if (authHeaderValueProvider) {
        if (authHeaderValueProvider.currentState) {
          return '[API] ' + authHeaderValueProvider.currentState();
        }
        return '[API]: authorization provider without currentState()';
      }
      return '[API]: no authorization provider';
    },


    get endpoint() {
      return backendEndpoint;
    },

    // For test purpose only.
    get tenant() {
      return tenant;
    }
  };

  var Timer = function () {
    function Timer() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_REQUEST_TIMEOUT;

      _classCallCheck(this, Timer);

      this.timesOutAt = Date.now() + timeout;
    }

    _createClass(Timer, [{
      key: 'timedOut',
      value: function timedOut() {
        return this.remainingTime() < MIN_REQUEST_TIME;
      }
    }, {
      key: 'remainingTime',
      value: function remainingTime() {
        return Math.max(this.timesOutAt - Date.now(), 0);
      }
    }, {
      key: 'cover',
      value: function cover(time) {
        return time <= this.timesOutAt - MIN_REQUEST_TIME;
      }
    }]);

    return Timer;
  }();

  function ensureInitialized() {
    if (tenant) {
      return scrivito.Promise.resolve();
    }

    if (!initDeferred) {
      initDeferred = new _deferred2.default();
    }

    return initDeferred.promise;
  }

  function fetch(method, path, requestParams) {
    return ensureInitialized().then(function () {
      return request(method, path, requestParams).then(function (result) {
        if (result && result.task && _underscore2.default.size(result) === 1) {
          return handleTask(result.task);
        }

        return result;
      });
    });
  }

  function request(method, path, requestParams) {
    return retryRequest(method, function (timeout) {
      return authHeaderValueProvider.perform(function (authorization) {
        return requestAjaxDeferred(ajax({ method: method, path: path, requestParams: requestParams, timeout: timeout, authorization: authorization }));
      });
    });
  }

  function requestAjaxDeferred(ajaxDeferred) {
    return scrivito.Promise.resolve(ajaxDeferred).catch(handleAjaxError);
  }

  function retryRequest(method, actualRequest) {
    var timer = new Timer();
    return retryOnceOnError(timer, method, function () {
      return retryOnRateLimit(timer, function () {
        return actualRequest(timer.remainingTime());
      });
    });
  }

  function retryOnceOnError(timer, method, requestCallback) {
    if (method === 'POST') {
      return requestCallback();
    }

    return requestCallback().catch(function (error) {
      if (!timer.timedOut()) {
        if (error instanceof _errors.BackendError) {
          return requestCallback();
        }
        if (error instanceof _errors.NetworkError) {
          return requestCallback();
        }
      }
      throw error;
    });
  }

  function retryOnRateLimit(timer, requestCallback) {
    var retry = function retry(retryCount) {
      return requestCallback().catch(function (e) {
        if (e instanceof _errors.NetworkError && e.httpCode === 429) {
          var error = e.response;
          var timeout = calculateTimeout(error.getResponseHeader('Retry-After'), retryCount);
          if (timer.cover(Date.now() + timeout)) {
            return scrivito.Promise.resolve(scrivito.waitMs(timeout)).then(function () {
              return retry(retryCount + 1);
            });
          }
          throw new _errors.RateLimitExceededError('rate limit exceeded', 429);
        }
        throw e;
      });
    };

    return retry(0);
  }

  function calculateTimeout(retryAfter, retryCount) {
    var calculatedTimeout = Math.pow(2, retryCount) * 0.5 * 1000;
    return Math.max(calculatedTimeout, retryAfter * 1000);
  }

  function handleAjaxError(error) {
    if (error.status === undefined || !_underscore2.default.isNumber(error.status)) {
      throw error;
    }

    var errorBody = void 0;
    try {
      errorBody = JSON.parse(error.responseText);
    } catch (e) {
      throw new _errors.NetworkError(error);
    }

    if (errorBody.code === 'auth_missing' && errorBody.details) {
      var returnTo = _auth_failure_counter2.default.augmentedRedirectUrl((0, _window_proxy.location)());
      var redirectTo = errorBody.details.visit.replace('retry=RETRY', 'retry=' + _auth_failure_counter2.default.currentFailureCount()).replace(/\$RETURN_TO/, encodeURIComponent(returnTo));
      return (0, _window_proxy.redirectTo)(redirectTo);
    }

    var specificOutput = errorBody.error;
    if (error.status === 401) {
      throw new _errors.UnauthorizedError(specificOutput, error.status, errorBody.code, errorBody.details);
    }
    if (error.status === 403) {
      throw new _errors.AccessDeniedError(specificOutput, error.status, errorBody.code);
    }
    if (error.status === 429) {
      throw new _errors.NetworkError(error);
    }
    if (specificOutput) {
      if (error.status === 500) {
        throw new _errors.BackendError(specificOutput, error.status);
      }
      if (error.status.toString()[0] === '4' && errorBody.error) {
        throw _errors.ClientError.for(specificOutput, error.status, errorBody.code);
      }
    }
    throw new _errors.NetworkError(error);
  }

  function prepareAjaxParams(method, path) {
    var requestParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var ajaxParams = {
      path: path,
      verb: method,
      params: requestParams
    };

    return ajaxParams;
  }

  function ajax(_ref) {
    var method = _ref.method,
        path = _ref.path,
        requestParams = _ref.requestParams,
        timeout = _ref.timeout,
        authorization = _ref.authorization;

    var url = (0, _urijs2.default)(backendEndpoint + '/tenants/' + tenant + '/perform').scheme('https').toString();
    var params = prepareAjaxParams(method, path, requestParams);

    return scrivito.fetch(method, url, { params: params, timeout: timeout, authorization: authorization, forceVerification: forceVerification });
  }

  function handleTask(task) {
    switch (task.status) {
      case 'success':
        return task.result;
      case 'error':
        throw _errors.ClientError.for(task.message, 412, task.code);
      case 'open':
        return scrivito.wait(2).then(function () {
          return request('GET', 'tasks/' + task.id).then(function (result) {
            return handleTask(result);
          });
        });
      default:
        throw new _errors.ScrivitoError('Invalid task response (unknown status)');
    }
  }
})();

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.computeCacheKey = function (data) {
    var normalizedData = normalizeData(data);
    return JSON.stringify(normalizedData);
  };

  function normalizeData(data) {
    if (_underscore2.default.isArray(data)) {
      return _underscore2.default.map(data, normalizeData);
    }

    if (_underscore2.default.isObject(data)) {
      return _underscore2.default.chain(data).mapObject(normalizeData).pairs().sortBy(_underscore2.default.first);
    }

    return data;
  }
})();

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertToSlug;

var _speakingurl = __webpack_require__(112);

var _speakingurl2 = _interopRequireDefault(_speakingurl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertToSlug(input) {
  return (0, _speakingurl2.default)(input);
}

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var PUBLISHED_WORKSPACE_ID = 'published';

  scrivito.currentWorkspaceId = function () {
    if (scrivito.uiAdapter) {
      return scrivito.uiAdapter.currentWorkspaceId();
    }

    return PUBLISHED_WORKSPACE_ID;
  };
})();

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errorStackParser = __webpack_require__(176);

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var consoleErrorIsDisabled = false;

  function logError() {
    if (window && window.console && !consoleErrorIsDisabled) {
      var _window$console;

      (_window$console = window.console).error.apply(_window$console, arguments);
    }
  }

  function disableConsoleError() {
    consoleErrorIsDisabled = true;
  }

  function printError(error) {
    if (error instanceof Error) {
      var stackTrace = _errorStackParser2.default.parse(error);
      scrivito.logError([error.message].concat(_toConsumableArray(_underscore2.default.pluck(stackTrace, 'source'))).join('\n'));
    } else {
      scrivito.logError(error);
    }
  }

  scrivito.logError = logError;
  scrivito.disableConsoleError = disableConsoleError;
  scrivito.printError = printError;
})();

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_obj_facet_value = __webpack_require__(144);

var _basic_obj_facet_value2 = _interopRequireDefault(_basic_obj_facet_value);

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _global_state = __webpack_require__(4);

var _errors = __webpack_require__(1);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VALID_OPTIONS = ['limit', 'includeObjs'];

var FacetQuery = function () {
  function FacetQuery(attribute, options, searchQuery) {
    var _this = this;

    _classCallCheck(this, FacetQuery);

    assertValidOptions(options);

    this._requestParams = buildRequestParams(attribute, options, searchQuery);

    this._loadableData = new _loadable_data2.default({
      state: modelStateFor(this._requestParams),
      loader: function loader() {
        return _this._loadData();
      },
      invalidation: invalidation
    });
  }

  _createClass(FacetQuery, [{
    key: 'result',
    value: function result() {
      var restApiResult = this._loadableData.get();
      if (!restApiResult) {
        return [];
      }

      var firstFacetResult = _underscore2.default.first(restApiResult.facets);

      return _underscore2.default.map(firstFacetResult, function (rawFacetValue) {
        var name = rawFacetValue.value;
        var count = rawFacetValue.total;
        var includedObjs = rawFacetValue.results.map(function (result) {
          return result.id;
        });

        return new _basic_obj_facet_value2.default(name, count, includedObjs);
      });
    }
  }, {
    key: '_loadData',
    value: function _loadData() {
      var workspaceId = scrivito.currentWorkspaceId();
      return scrivito.CmsRestApi.get('workspaces/' + workspaceId + '/objs/search', this._requestParams);
    }
  }], [{
    key: 'store',
    value: function store(attribute, options, searchQuery, cmsRestApiResponse) {
      assertValidOptions(options);

      var requestParams = buildRequestParams(attribute, options, searchQuery);
      var loadableData = new _loadable_data2.default({
        state: modelStateFor(requestParams),
        invalidation: invalidation,
        throwNotLoaded: true
      });
      loadableData.set(cmsRestApiResponse);
    }
  }]);

  return FacetQuery;
}();

exports.default = FacetQuery;


function invalidation() {
  return scrivito.ObjReplication.getWorkspaceVersion();
}

function modelStateFor(requestParams) {
  var subStateKey = scrivito.computeCacheKey(requestParams);
  return _global_state.cmsState.subState('facetQuery').subState(subStateKey);
}

function assertValidOptions(options) {
  var invalidOptions = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(options)].concat(VALID_OPTIONS));
  if (invalidOptions.length) {
    throw new _errors.ArgumentError('Invalid options: ' + ((0, _pretty_print2.default)(invalidOptions) + '. Valid options: ' + VALID_OPTIONS));
  }
}

function buildRequestParams(attribute, options, searchQuery) {
  var requestParams = {
    facets: [{
      attribute: attribute,
      limit: options.limit || 10,
      include_objs: options.includeObjs || 0
    }],
    size: 0
  };
  if (searchQuery && searchQuery.length) {
    requestParams.query = searchQuery;
  }

  return requestParams;
}

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _deferred = __webpack_require__(10);

var _deferred2 = _interopRequireDefault(_deferred);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var isDisabled = false;
  var connectionCounter = 0;

  // For test purpose only
  scrivito.isFetchingActive = function () {
    return connectionCounter > 0;
  };

  // For test purpose only
  scrivito.disableFetching = function () {
    isDisabled = true;
  };

  scrivito.fetch = function (method, url, _ref) {
    var params = _ref.params,
        timeout = _ref.timeout,
        authorization = _ref.authorization,
        forceVerification = _ref.forceVerification;

    if (isDisabled) {
      return new _deferred2.default().promise;
    }

    connectionCounter += 1;

    return new scrivito.Promise(function (resolve, reject) {
      var request = createRequestObj(method, url, timeout, resolve, reject);
      if (authorization) {
        request.setRequestHeader('Authorization', authorization);
      }
      if (forceVerification) {
        request.setRequestHeader('Scrivito-Force-Verification', 'true');
      }
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send(JSON.stringify(params));
    });
  };

  function createRequestObj(method, url, timeout, resolve, reject) {
    var request = new XMLHttpRequest();

    request.open(method === 'POST' ? 'POST' : 'PUT', url);

    request.timeout = timeout;
    request.withCredentials = true;

    request.onload = function () {
      return onAjaxLoad(request, resolve, reject);
    };
    request.onerror = function (error) {
      return onAjaxError(error, reject);
    };

    return request;
  }

  function onAjaxLoad(request, resolve, reject) {
    connectionCounter -= 1;

    if (request.status >= 200 && request.status < 300) {
      try {
        return resolve(JSON.parse(request.responseText));
      } catch (error) {
        if (error instanceof SyntaxError) {
          return resolve(request.responseText);
        }

        throw error;
      }
    }

    return reject(request);
  }

  function onAjaxError(error, reject) {
    connectionCounter -= 1;

    reject(new Error('Network Error: ' + error));
  }
})();

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _realm = __webpack_require__(157);

var _realm2 = _interopRequireDefault(_realm);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  // if the UI is present, these modules are "connected" to the UI,
  // i.e. the local client module is replaced with
  // the matching module from the client inside the UI.
  var modulesToConnect = ['BinaryRequest', 'CmsRestApi', 'ObjReplication'];

  function connectModulesToUi(ui) {
    var uiModules = ui.clientModulesForExport();
    modulesToConnect.forEach(function (moduleName) {
      scrivito[moduleName] = uiModules[moduleName];
    });
  }

  function modulesForExport() {
    var modules = {};

    modulesToConnect.forEach(function (moduleName) {
      modules[moduleName] = scrivito[moduleName];
    });

    return modules;
  }

  function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        ui = _ref.ui,
        realmContext = _ref.realmContext;

    if (realmContext) {
      _realm2.default.init(realmContext);
    }
    if (ui) {
      connectModulesToUi(ui);
    }

    (0, _global_state.initializeGlobalState)(ui);
  }

  // export
  scrivito.client.init = init;
  scrivito.client.modulesForExport = modulesForExport;
})();

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function loadAllUntil(iterator, size) {
    var objs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var run = _loadable_data2.default.run(function () {
      return iterator.next();
    });

    if (!run.allDataLoaded) {
      return { done: false, objs: objs };
    }

    var _run$result = run.result,
        obj = _run$result.value,
        done = _run$result.done;


    if (done || size === 0) {
      return { done: done, objs: objs };
    }

    return loadAllUntil(iterator, size - 1, objs.concat([obj]));
  }

  scrivito.loadAllUntil = loadAllUntil;
})();

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function loadableWithDefault(theDefault, loadableFunction) {
    var run = _loadable_data2.default.run(loadableFunction);

    return run.allDataLoaded ? run.result : theDefault;
  }

  // export
  scrivito.loadableWithDefault = loadableWithDefault;

  // legacy, keeping this for now to avoid conflicts.
  scrivito.loadWithDefault = loadableWithDefault;
})();

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attribute_serializer = __webpack_require__(69);

var AttributeSerializer = _interopRequireWildcard(_attribute_serializer);

var _basic_attribute_content = __webpack_require__(59);

var _basic_attribute_content2 = _interopRequireDefault(_basic_attribute_content);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _attribute_inflection = __webpack_require__(13);

var _errors = __webpack_require__(1);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SYSTEM_ATTRIBUTES = {
  _id: 'id',
  _obj_class: 'objClass'
};

var BasicWidget = function (_BasicAttributeConten) {
  _inherits(BasicWidget, _BasicAttributeConten);

  _createClass(BasicWidget, null, [{
    key: 'build',
    value: function build(id, obj) {
      var instance = Object.create(BasicWidget.prototype);
      instance._obj = obj;
      instance._id = id;

      return instance;
    }
  }, {
    key: 'newWithSerializedAttributes',
    value: function newWithSerializedAttributes(attributes) {
      var unserializedAttributes = {};
      var serializedAttributes = {};

      _underscore2.default.each(attributes, function (value, name) {
        if (name === '_obj_class') {
          unserializedAttributes._objClass = [value];
          return;
        }

        if (_underscore2.default.isArray(value) && _underscore2.default.first(value) === 'widgetlist') {
          var newWidgets = _underscore2.default.map(_underscore2.default.last(value), function (serializedWidget) {
            return BasicWidget.newWithSerializedAttributes(serializedWidget);
          });

          var attrName = (0, _attribute_inflection.camelCase)(name);
          unserializedAttributes[attrName] = [newWidgets, ['widgetlist']];
          return;
        }

        serializedAttributes[name] = value;
      });

      var widget = new BasicWidget(unserializedAttributes);
      widget.preserializedAttributes = serializedAttributes;
      return widget;
    }
  }]);

  function BasicWidget(attributes) {
    _classCallCheck(this, BasicWidget);

    var _this = _possibleConstructorReturn(this, (BasicWidget.__proto__ || Object.getPrototypeOf(BasicWidget)).call(this));

    _this._attributesToBeSaved = scrivito.typeInfo.normalizeAttrs(attributes);

    assertWidgetClassExists(attributes._objClass);
    return _this;
  }

  _createClass(BasicWidget, [{
    key: 'id',
    value: function id() {
      if (this.isPersisted()) {
        return this._id;
      }

      this._throwUnpersistedError();
    }
  }, {
    key: 'objClass',
    value: function objClass() {
      return this._current._obj_class;
    }
  }, {
    key: 'obj',
    value: function obj() {
      if (this.isPersisted()) {
        return this._obj;
      }

      this._throwUnpersistedError();
    }
  }, {
    key: 'widget',
    value: function widget(id) {
      return this.obj().widget(id);
    }
  }, {
    key: 'update',
    value: function update(attributes) {
      var _this2 = this;

      var normalizedAttributes = scrivito.typeInfo.normalizeAttrs(attributes);

      (0, _global_state.withBatchedUpdates)(function () {
        _this2._persistWidgets(_this2.obj(), normalizedAttributes);
        var patch = AttributeSerializer.serialize(normalizedAttributes);
        _this2._updateSelf(patch);
      });
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(widget) {
      widget.obj().insertWidget(this, { before: widget });
    }
  }, {
    key: 'insertAfter',
    value: function insertAfter(widget) {
      widget.obj().insertWidget(this, { after: widget });
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.obj().removeWidget(this);
    }
  }, {
    key: 'copy',
    value: function copy() {
      var serializedAttributes = this.serializeAttributes();
      return BasicWidget.newWithSerializedAttributes(serializedAttributes);
    }
  }, {
    key: 'persistInObj',
    value: function persistInObj(obj) {
      this._persistWidgets(obj, this._attributesToBeSaved);
      var patch = AttributeSerializer.serialize(this._attributesToBeSaved);
      _underscore2.default.extend(patch, this.preserializedAttributes || {});

      this._obj = obj;
      this._id = obj.generateWidgetId();

      this._updateSelf(patch);
    }
  }, {
    key: 'isPersisted',
    value: function isPersisted() {
      return !!this._obj;
    }
  }, {
    key: 'finishSaving',
    value: function finishSaving() {
      return this.obj().finishSaving();
    }
  }, {
    key: 'equals',
    value: function equals(otherWidget) {
      if (!(otherWidget instanceof BasicWidget)) {
        return false;
      }

      return this.id() === otherWidget.id() && this.obj().id() === otherWidget.obj().id();
    }
  }, {
    key: 'containingField',
    value: function containingField() {
      return this.obj().fieldContainingWidget(this);
    }
  }, {
    key: '_throwUnpersistedError',
    value: function _throwUnpersistedError() {
      throw new _errors.ScrivitoError('Can not access a new widget before it has been saved.');
    }
  }, {
    key: '_updateSelf',
    value: function _updateSelf(patch) {
      var widgetPoolPatch = { _widgetPool: [_defineProperty({}, this.id(), patch)] };
      this.obj().update(widgetPoolPatch);
    }
  }, {
    key: 'attributesToBeSaved',
    get: function get() {
      return this._attributesToBeSaved;
    }
  }, {
    key: '_current',
    get: function get() {
      if (this.isPersisted()) {
        return this.obj().widgetData(this.id());
      }

      throw new _errors.ScrivitoError('Can not access an unpersisted widget.');
    }
  }, {
    key: '_systemAttributes',
    get: function get() {
      return SYSTEM_ATTRIBUTES;
    }
  }]);

  return BasicWidget;
}(_basic_attribute_content2.default);

exports.default = BasicWidget;


function assertWidgetClassExists(attrInfoAndValue) {
  if (!attrInfoAndValue) {
    throw new _errors.ArgumentError('Please provide a widget class as the "_objClass" property.');
  }
}

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _errors = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  /**
    * A `NotLoadedError` is thrown when data is accessed in a synchronous fashion but is not yet
    * available locally.
    */
  var NotLoadedError = function (_ScrivitoError) {
    _inherits(NotLoadedError, _ScrivitoError);

    function NotLoadedError(captureStackTrace) {
      _classCallCheck(this, NotLoadedError);

      return _possibleConstructorReturn(this, (NotLoadedError.__proto__ || Object.getPrototypeOf(NotLoadedError)).call(this, 'Data is not yet loaded.', captureStackTrace));
    }

    return NotLoadedError;
  }(_errors.ScrivitoError);

  // export


  scrivito.NotLoadedError = NotLoadedError;
})();

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = AppClassFactory;

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function AppClassFactory(definition, parent) {
  var schema = new _schema2.default(definition, parent);

  return function (_parent) {
    _inherits(_class, _parent);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, null, [{
      key: '_scrivitoPrivateSchema',
      get: function get() {
        return schema;
      }
    }]);

    return _class;
  }(parent);
}

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attribute = __webpack_require__(26);

var _attribute2 = _interopRequireDefault(_attribute);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  function AttributeContentFactory(appModelAccessor) {
    var AttributeContent = function () {
      function AttributeContent() {
        _classCallCheck(this, AttributeContent);
      }

      _createClass(AttributeContent, [{
        key: 'id',

        // public API
        value: function id() {
          return this._scrivitoPrivateContent.id();
        }

        // public API

      }, {
        key: 'objClass',
        value: function objClass() {
          return this._scrivitoPrivateContent.objClass();
        }

        /**
         * Resolves when all previous updates have been persisted.
         * If an update fails the promise is rejected.
         *
         * @returns {Promise}
         */

      }, {
        key: 'finishSaving',
        value: function finishSaving() {
          return this._scrivitoPrivateContent.finishSaving();
        }

        // public API

      }, {
        key: 'get',
        value: function get(attributeName) {
          return appModelAccessor.read(this, attributeName);
        }

        // public API

      }, {
        key: 'update',
        value: function update(attributes) {
          appModelAccessor.update(this, attributes);
        }
      }]);

      return AttributeContent;
    }();

    return AttributeContent;
  }

  function prepareAttributes(attributes, schema, appClassName) {
    return _underscore2.default.mapObject(attributes, function (value, name) {
      if (_attribute2.default.isSystemAttribute(name)) {
        return [value];
      }
      var typeInfo = schema.attributes[name];

      if (!typeInfo) {
        throw new _errors.ArgumentError('Attribute "' + name + '" is not defined for CMS object ' + ('class "' + appClassName + '".'));
      }

      var unwrappedValue = scrivito.unwrapAppClassValues(value);
      return [unwrappedValue, typeInfo];
    });
  }

  scrivito.AttributeContentFactory = AttributeContentFactory;
  scrivito.AttributeContentFactory.prepareAttributes = prepareAttributes;
})();

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.deserialize = deserialize;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _types = __webpack_require__(32);

var types = _interopRequireWildcard(_types);

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _binary = __webpack_require__(25);

var _binary2 = _interopRequireDefault(_binary);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deserialize(model, rawValue, type, options) {
  var _rawValue = _slicedToArray(rawValue, 2),
      typeFromBackend = _rawValue[0],
      valueFromBackend = _rawValue[1];

  switch (type) {
    case 'binary':
      return deserializeBinaryValue(typeFromBackend, valueFromBackend);
    case 'date':
      return deserializeDateValue(typeFromBackend, valueFromBackend);
    case 'float':
      return deserializeFloatValue(typeFromBackend, valueFromBackend);
    case 'enum':
      return deserializeEnumValue(typeFromBackend, valueFromBackend, options);
    case 'html':
      return deserializeHtmlValue(typeFromBackend, valueFromBackend);
    case 'integer':
      return deserializeIntegerValue(typeFromBackend, valueFromBackend);
    case 'link':
      return deserializeLinkValue(typeFromBackend, valueFromBackend);
    case 'linklist':
      return deserializeLinklistValue(typeFromBackend, valueFromBackend);
    case 'multienum':
      return deserializeMultienumValue(typeFromBackend, valueFromBackend, options);
    case 'reference':
      return deserializeReferenceValue(typeFromBackend, valueFromBackend);
    case 'referencelist':
      return deserializeReferencelistValue(typeFromBackend, valueFromBackend);
    case 'string':
      return deserializeStringValue(typeFromBackend, valueFromBackend);
    case 'stringlist':
      return deserializeStringlistValue(typeFromBackend, valueFromBackend);
    case 'widgetlist':
      return deserializeWidgetlistValue(typeFromBackend, valueFromBackend, model);
  }
}

function deserializeBinaryValue(typeFromBackend, valueFromBackend) {
  if (typeFromBackend === 'binary' && valueFromBackend) {
    var binaryId = valueFromBackend.id;
    var isPublic = scrivito.currentWorkspaceId() === 'published';

    return new _binary2.default(binaryId, isPublic).transform({});
  }

  return null;
}

function deserializeDateValue(typeFromBackend, valueFromBackend) {
  if (typeFromBackend !== 'date') {
    return null;
  }

  return types.deserializeAsDate(valueFromBackend);
}

function deserializeHtmlValue(typeFromBackend, valueFromBackend) {
  if (_underscore2.default.contains(['html', 'string'], typeFromBackend) && _underscore2.default.isString(valueFromBackend)) {
    return valueFromBackend;
  }

  return '';
}

function deserializeEnumValue(typeFromBackend, valueFromBackend, _ref) {
  var validValues = _ref.validValues;

  if (typeFromBackend === 'string' && _underscore2.default.contains(validValues, valueFromBackend)) {
    return valueFromBackend;
  }

  return null;
}

function deserializeMultienumValue(typeFromBackend, valueFromBackend, _ref2) {
  var validValues = _ref2.validValues;

  if (typeFromBackend !== 'stringlist' || !Array.isArray(valueFromBackend)) {
    return [];
  }

  return _underscore2.default.intersection(valueFromBackend, validValues);
}

function deserializeFloatValue(typeFromBackend, valueFromBackend) {
  switch (typeFromBackend) {
    case 'string':
      if (valueFromBackend.match(/^-?\d+(\.\d+)?$/)) {
        return convertToFloat(valueFromBackend);
      }
      return null;
    case 'number':
      return convertToFloat(valueFromBackend);
    default:
      return null;
  }
}

function convertToFloat(valueFromBackend) {
  var floatValue = parseFloat(valueFromBackend);

  if (types.isValidFloat(floatValue)) {
    return floatValue;
  }

  return null;
}

function deserializeIntegerValue(typeFromBackend, valueFromBackend) {
  switch (typeFromBackend) {
    case 'string':
    case 'number':
      return types.deserializeAsInteger(valueFromBackend);
    default:
      return null;
  }
}

function deserializeLinkValue(typeFromBackend, valueFromBackend) {
  if (typeFromBackend !== 'link' || !_underscore2.default.isObject(valueFromBackend)) {
    return null;
  }

  return convertToLink(valueFromBackend);
}

function deserializeLinklistValue(_typeFromBackend, valueFromBackend) {
  if (!_underscore2.default.isArray(valueFromBackend)) {
    return [];
  }

  return _underscore2.default.compact(valueFromBackend.map(convertToLink));
}

function convertToLink(valueFromBackend) {
  var linkParams = _underscore2.default.pick(valueFromBackend, 'title', 'query', 'fragment', 'target', 'url');

  linkParams.hash = linkParams.fragment;
  delete linkParams.fragment;

  linkParams.objId = valueFromBackend.obj_id;
  var link = _basic_link2.default.build(linkParams);

  if (link.isBroken()) {
    return null;
  }

  return link;
}

function convertReferenceToBasicObj(valueFromBackend) {
  var obj = _basic_obj2.default.get(valueFromBackend);

  if (obj) {
    return obj;
  }

  return null;
}

function deserializeReferenceValue(typeFromBackend, valueFromBackend) {
  if (typeFromBackend === 'reference' && valueFromBackend) {
    return convertReferenceToBasicObj(valueFromBackend);
  }

  return null;
}

function deserializeReferencelistValue(typeFromBackend, valueFromBackend) {
  if (typeFromBackend !== 'referencelist') {
    return [];
  }

  if (!valueFromBackend) {
    return [];
  }

  var objs = valueFromBackend.map(convertReferenceToBasicObj);

  return _underscore2.default.compact(objs);
}

function deserializeStringValue(typeFromBackend, valueFromBackend) {
  if (_underscore2.default.contains(['html', 'string'], typeFromBackend) && _underscore2.default.isString(valueFromBackend)) {
    return valueFromBackend;
  }

  return '';
}

function deserializeStringlistValue(typeFromBackend, valueFromBackend) {
  if (typeFromBackend !== 'stringlist' || !Array.isArray(valueFromBackend)) {
    return [];
  }

  return valueFromBackend;
}

function deserializeWidgetlistValue(typeFromBackend, valueFromBackend, model) {
  if (typeFromBackend !== 'widgetlist') {
    return [];
  }

  return _underscore2.default.map(valueFromBackend, function (widgetId) {
    return model.widget(widgetId);
  });
}

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicObjFacetValue = function () {
  function BasicObjFacetValue(name, count, includedObjs) {
    _classCallCheck(this, BasicObjFacetValue);

    this._name = name;
    this._count = count;
    this._includedObjs = includedObjs;
  }

  _createClass(BasicObjFacetValue, [{
    key: 'name',
    value: function name() {
      return this._name;
    }
  }, {
    key: 'count',
    value: function count() {
      return this._count;
    }
  }, {
    key: 'includedObjs',
    value: function includedObjs() {
      return _basic_obj2.default.get(this._includedObjs);
    }
  }]);

  return BasicObjFacetValue;
}();

exports.default = BasicObjFacetValue;

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = LinkFactory;

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function LinkFactory(registry) {
  // public API
  var Link = function (_BasicLink) {
    _inherits(Link, _BasicLink);

    // public API
    function Link(attributes) {
      _classCallCheck(this, Link);

      return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, attributes));
    }

    // public API


    _createClass(Link, [{
      key: 'obj',
      value: function obj() {
        return scrivito.wrapInAppClass(registry, _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), 'obj', this).call(this));
      }
    }, {
      key: 'fetchObj',
      value: function fetchObj(id) {
        return _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), 'fetchObj', this).call(this, id).then(function (basicObj) {
          return scrivito.wrapInAppClass(registry, basicObj);
        });
      }
    }, {
      key: '_scrivitoPrivateContent',
      get: function get() {
        return _basic_link2.default.build(this.buildAttributes());
      }
    }]);

    return Link;
  }(_basic_link2.default);

  return Link;
}

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = ObjFactory;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _errors = __webpack_require__(1);

var _app_model_accessor = __webpack_require__(49);

var _app_model_accessor2 = _interopRequireDefault(_app_model_accessor);

var _metadata_collection = __webpack_require__(71);

var _metadata_collection2 = _interopRequireDefault(_metadata_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ObjFactory(registry) {
  var appModelAccessor = new _app_model_accessor2.default(registry);

  function buildObjSearch(objClassName) {
    var search = new registry.ObjSearch();
    if (objClassName) {
      search.and('_objClass', 'equals', objClassName);
    }

    return search;
  }

  function wrap(response) {
    return scrivito.wrapInAppClass(registry, response);
  }

  // public API

  var Obj = function (_scrivito$AttributeCo) {
    _inherits(Obj, _scrivito$AttributeCo);

    function Obj() {
      _classCallCheck(this, Obj);

      return _possibleConstructorReturn(this, (Obj.__proto__ || Object.getPrototypeOf(Obj)).apply(this, arguments));
    }

    _createClass(Obj, [{
      key: 'lastChanged',


      // public API
      value: function lastChanged() {
        return this._scrivitoPrivateContent.lastChanged();
      }

      // public API

    }, {
      key: 'path',
      value: function path() {
        return this._scrivitoPrivateContent.path();
      }

      // public API

    }, {
      key: 'parent',
      value: function parent() {
        return wrap(this._scrivitoPrivateContent.parent());
      }

      // public API

    }, {
      key: 'ancestors',
      value: function ancestors() {
        return wrap(this._scrivitoPrivateContent.ancestors());
      }

      // public API

    }, {
      key: 'backlinks',
      value: function backlinks() {
        return wrap(this._scrivitoPrivateContent.backlinks());
      }

      // public API

    }, {
      key: 'children',
      value: function children() {
        return wrap(this._scrivitoPrivateContent.children());
      }
    }, {
      key: 'orderedChildren',
      value: function orderedChildren() {
        return wrap(this._scrivitoPrivateContent.orderedChildren());
      }

      // public API

    }, {
      key: 'permalink',
      value: function permalink() {
        return this._scrivitoPrivateContent.permalink();
      }

      // public API

    }, {
      key: 'slug',
      value: function slug() {
        return this._scrivitoPrivateContent.slug();
      }

      // public API

    }, {
      key: 'isBinary',
      value: function isBinary() {
        var schema = _schema2.default.forInstance(this);
        if (!schema) {
          return false;
        }

        return schema.isBinary();
      }

      // public API

    }, {
      key: 'contentLength',
      value: function contentLength() {
        if (this.isBinary()) {
          return this._scrivitoPrivateContent.contentLength();
        }
        return 0;
      }

      // public API

    }, {
      key: 'contentType',
      value: function contentType() {
        if (this.isBinary()) {
          return this._scrivitoPrivateContent.contentType();
        }
        return '';
      }

      // public API

    }, {
      key: 'contentUrl',
      value: function contentUrl() {
        if (this.isBinary()) {
          return this._scrivitoPrivateContent.contentUrl();
        }
        return '';
      }

      // public API

    }, {
      key: 'metadata',
      value: function metadata() {
        if (this.isBinary()) {
          return this._scrivitoPrivateContent.metadata();
        }
        return new _metadata_collection2.default();
      }

      // public API

    }, {
      key: 'destroy',
      value: function destroy() {
        this._scrivitoPrivateContent.destroy();
      }

      // public API

    }, {
      key: 'widget',
      value: function widget(id) {
        return wrap(this._scrivitoPrivateContent.widget(id));
      }

      // public API

    }, {
      key: 'widgets',
      value: function widgets() {
        return wrap(this._scrivitoPrivateContent.widgets());
      }
    }], [{
      key: 'get',

      // public API
      value: function get(id) {
        return appModelAccessor.getObj(this, id);
      }

      // public API

    }, {
      key: 'getIncludingDeleted',
      value: function getIncludingDeleted(id) {
        return appModelAccessor.getObjIncludingDeleted(this, id);
      }

      // public API

    }, {
      key: 'getByPath',
      value: function getByPath(path) {
        return wrap(_basic_obj2.default.getByPath(path));
      }

      // public API

    }, {
      key: 'getByPermalink',
      value: function getByPermalink(permalink) {
        return wrap(_basic_obj2.default.getByPermalink(permalink));
      }

      // public API

    }, {
      key: 'all',
      value: function all() {
        var objClassName = registry.objClassNameFor(this);
        return buildObjSearch(objClassName).batchSize(1000);
      }

      // public API

    }, {
      key: 'root',
      value: function root() {
        return wrap(_basic_obj2.default.root());
      }

      // public API

    }, {
      key: 'where',
      value: function where(attribute, operator, value) {
        var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        var objClassName = registry.objClassNameFor(this);
        return buildObjSearch(objClassName).and(attribute, operator, value, boost);
      }

      // public API

    }, {
      key: 'create',
      value: function create(attributes) {
        var schema = _schema2.default.forClass(this);
        var appClassName = registry.objClassNameFor(this);

        if (!appClassName) {
          throw new _errors.ArgumentError('Creating CMS objects is not supported for the class Obj or abstract classes.');
        }

        if (attributes.constructor !== Object) {
          throw new _errors.ArgumentError('The provided attributes are invalid. They have ' + 'to be an Object with valid Scrivito attribute values.');
        }

        if (attributes._objClass) {
          throw new _errors.ArgumentError('Invalid attribute "_objClass". ' + ('"' + attributes._objClass + '.create" will automatically set the CMS object class ') + 'correctly.');
        }

        attributes._objClass = appClassName;
        var attributesWithTypeInfo = scrivito.AttributeContentFactory.prepareAttributes(attributes, schema, appClassName);

        return wrap(_basic_obj2.default.create(attributesWithTypeInfo));
      }
    }]);

    return Obj;
  }(scrivito.AttributeContentFactory(appModelAccessor));

  return Obj;
}

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = ObjSearchFactory;

var _basic_obj_search_iterable = __webpack_require__(60);

var _basic_obj_search_iterable2 = _interopRequireDefault(_basic_obj_search_iterable);

var _obj_facet_value = __webpack_require__(87);

var _obj_facet_value2 = _interopRequireDefault(_obj_facet_value);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _iterable = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ObjSearchFactory(registry) {
  // public API
  var ObjSearch = function (_BasicObjSearchIterab) {
    _inherits(ObjSearch, _BasicObjSearchIterab);

    function ObjSearch() {
      _classCallCheck(this, ObjSearch);

      return _possibleConstructorReturn(this, (ObjSearch.__proto__ || Object.getPrototypeOf(ObjSearch)).apply(this, arguments));
    }

    _createClass(ObjSearch, [{
      key: 'iterator',

      // public API
      value: function iterator() {
        var basicIterator = _get(ObjSearch.prototype.__proto__ || Object.getPrototypeOf(ObjSearch.prototype), 'iterator', this).call(this);

        return {
          next: function next() {
            var _basicIterator$next = basicIterator.next(),
                done = _basicIterator$next.done,
                value = _basicIterator$next.value;

            if (done) {
              return { done: done };
            }

            return { done: done, value: scrivito.wrapInAppClass(registry, value) };
          }
        };
      }

      // public API

    }, {
      key: 'and',
      value: function and(attribute, operator, value) {
        var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        var unwrappedValue = scrivito.unwrapAppClassValues(value);
        return _get(ObjSearch.prototype.__proto__ || Object.getPrototypeOf(ObjSearch.prototype), 'and', this).call(this, attribute, operator, unwrappedValue, boost);
      }

      // public API

    }, {
      key: 'andNot',
      value: function andNot(attribute, operator, value) {
        var unwrappedValue = scrivito.unwrapAppClassValues(value);
        return _get(ObjSearch.prototype.__proto__ || Object.getPrototypeOf(ObjSearch.prototype), 'andNot', this).call(this, attribute, operator, unwrappedValue);
      }

      // public API

    }, {
      key: 'facet',
      value: function facet(attribute) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var result = _get(ObjSearch.prototype.__proto__ || Object.getPrototypeOf(ObjSearch.prototype), 'facet', this).call(this, attribute, options);
        return _underscore2.default.map(result, function (facetValue) {
          return new _obj_facet_value2.default(registry, facetValue);
        });
      }

      // public API

    }, {
      key: 'take',
      value: function take(count) {
        return (0, _iterable.arrayFromIterable)(this.batchSize(count), count);
      }
    }]);

    return ObjSearch;
  }(_basic_obj_search_iterable2.default);

  // check if the environment supports ES6 iterables
  // (either native or through some kind of polyfill)
  // if yes, make BasicObjSearchIterable an ES6 iterable.


  if (typeof window.Symbol === 'function') {
    var iteratorSymbol = window.Symbol.iterator;
    if (iteratorSymbol) {
      var proto = ObjSearch.prototype;
      proto[iteratorSymbol] = proto.iterator;
    }
  }

  return ObjSearch;
}

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = WidgetFactory;

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _errors = __webpack_require__(1);

var _app_model_accessor = __webpack_require__(49);

var _app_model_accessor2 = _interopRequireDefault(_app_model_accessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function WidgetFactory(registry) {
  var appModelAccessor = new _app_model_accessor2.default(registry);

  // public API

  var Widget = function (_scrivito$AttributeCo) {
    _inherits(Widget, _scrivito$AttributeCo);

    // public API
    function Widget(attributes) {
      _classCallCheck(this, Widget);

      var _this = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this));

      var schema = _schema2.default.forInstance(_this);
      var appClassName = registry.objClassNameFor(_this.constructor);

      if (!appClassName) {
        throw new _errors.ArgumentError('Creating widgets is not supported for the class Widget or abstract classes.');
      }

      if (attributes.constructor !== Object) {
        throw new _errors.ArgumentError('The provided attributes are invalid. They have ' + 'to be an Object with valid Scrivito attribute values.');
      }

      if (attributes._objClass) {
        throw new _errors.ArgumentError('Invalid attribute "_objClass". ' + ('"new ' + attributes._objClass + '" will automatically set the CMS object class correctly.'));
      }

      attributes._objClass = appClassName;
      var attributesWithTypeInfo = scrivito.AttributeContentFactory.prepareAttributes(attributes, schema, appClassName);

      _this._scrivitoPrivateContent = new _basic_widget2.default(attributesWithTypeInfo);
      return _this;
    }

    // public API


    _createClass(Widget, [{
      key: 'obj',
      value: function obj() {
        var basicObj = this._scrivitoPrivateContent.obj();
        return scrivito.wrapInAppClass(registry, basicObj);
      }

      // public API

    }, {
      key: 'copy',
      value: function copy() {
        var appClass = registry.widgetClassFor(this.objClass());
        var basicWidget = this._scrivitoPrivateContent.copy();

        return scrivito.buildAppClassInstance(basicWidget, appClass);
      }
    }]);

    return Widget;
  }(scrivito.AttributeContentFactory(appModelAccessor));

  return Widget;
}

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var capturedDelayedFunctions = [];
  var captureEnabled = void 0;

  _underscore2.default.extend(scrivito, {
    nextTick: function nextTick(delayedFunction) {
      if (captureEnabled) {
        capturedDelayedFunctions.push(delayedFunction);
      } else {
        setTimeout(delayedFunction, 0);
      }
    },


    // For test purpose only.
    simulateNextTicks: function simulateNextTicks() {
      if (!captureEnabled) {
        return;
      }

      var exceptions = [];

      while (capturedDelayedFunctions.length) {
        var currentFunctions = _underscore2.default.shuffle(capturedDelayedFunctions);
        capturedDelayedFunctions = [];
        _underscore2.default.each(currentFunctions, function (delayedFunction) {
          try {
            delayedFunction();
          } catch (e) {
            exceptions.push(e);
          }
        });
      }

      if (exceptions.length > 0) {
        throw exceptions[0];
      }
    },


    // For test purpose only.
    enableNextTickCapture: function enableNextTickCapture() {
      captureEnabled = true;
    },


    // For test purpose only.
    disableNextTickCapture: function disableNextTickCapture() {
      captureEnabled = false;
    }
  });
})();

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj_retrieval = __webpack_require__(155);

var ObjRetrieval = _interopRequireWildcard(_obj_retrieval);

var _obj_patch = __webpack_require__(53);

var ObjPatch = _interopRequireWildcard(_obj_patch);

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjData = function () {
  function ObjData(id, state) {
    var _this = this;

    _classCallCheck(this, ObjData);

    this._loadableData = new _loadable_data2.default({
      state: state,
      loader: function loader(push) {
        return ObjRetrieval.retrieveObj(_this._id).then(function (data) {
          push(function () {
            return _this._replication().notifyBackendState(data);
          });
          return data;
        });
      }
    });
    this._id = id;
  }

  _createClass(ObjData, [{
    key: 'set',
    value: function set(newState) {
      this._loadableData.set(newState);
    }
  }, {
    key: 'setError',
    value: function setError(error) {
      this._loadableData.setError(error);
    }
  }, {
    key: 'isAvailable',
    value: function isAvailable() {
      return this._loadableData.isAvailable();
    }
  }, {
    key: 'update',
    value: function update(objPatch) {
      var newState = ObjPatch.apply(this.current, objPatch);

      this._loadableData.set(newState);
      this._replication().notifyLocalState(newState);
    }
  }, {
    key: 'finishSaving',
    value: function finishSaving() {
      return this._replication().finishSaving();
    }
  }, {
    key: '_replication',
    value: function _replication() {
      return scrivito.ObjReplication.get(this._id);
    }
  }, {
    key: 'current',
    get: function get() {
      return this._loadableData.get();
    }
  }]);

  return ObjData;
}();

exports.default = ObjData;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj_data_store = __webpack_require__(41);

var ObjDataStore = _interopRequireWildcard(_obj_data_store);

var _errors = __webpack_require__(1);

var _obj_id_query = __webpack_require__(72);

var _obj_id_query2 = _interopRequireDefault(_obj_id_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjDataQuery = function () {
  function ObjDataQuery(params, batchSize) {
    _classCallCheck(this, ObjDataQuery);

    this._params = params;
    this._batchSize = batchSize;
  }

  _createClass(ObjDataQuery, [{
    key: 'iterator',
    value: function iterator() {
      return new ObjDataQueryIterator(this._params, this._batchSize);
    }
  }]);

  return ObjDataQuery;
}();

exports.default = ObjDataQuery;

var ObjDataQueryIterator = function () {
  function ObjDataQueryIterator(params, batchSize) {
    _classCallCheck(this, ObjDataQueryIterator);

    this._iterator = new _obj_id_query2.default(params, batchSize).iterator();
  }

  _createClass(ObjDataQueryIterator, [{
    key: 'next',
    value: function next() {
      if (!this._iterator) {
        return { done: true };
      }

      var id = this._iterator.next().value;
      if (!id) {
        return { done: true };
      }

      try {
        var objData = ObjDataStore.get(id);

        if (objData === undefined) {
          this._iterator = undefined;

          return { done: true };
        }

        if (isFinallyDeleted(objData)) {
          return this.next();
        }

        return { value: objData, done: false };
      } catch (error) {
        if (error instanceof _errors.ResourceNotFoundError) {
          return this.next();
        }

        throw error;
      }
    }
  }]);

  return ObjDataQueryIterator;
}();

function isFinallyDeleted(objData) {
  return !!objData.current._deleted;
}

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj_query_store = __webpack_require__(73);

var ObjQueryStore = _interopRequireWildcard(_obj_query_store);

var _obj_query_retrieval = __webpack_require__(153);

var ObjQueryRetrieval = _interopRequireWildcard(_obj_query_retrieval);

var _obj_data_store = __webpack_require__(41);

var ObjDataStore = _interopRequireWildcard(_obj_data_store);

var _underscore = __webpack_require__(0);

var _load2 = __webpack_require__(12);

var _load3 = _interopRequireDefault(_load2);

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FALLBACK_RESPONSE = { results: [] };

var ObjIdQueryBatch = function () {
  _createClass(ObjIdQueryBatch, null, [{
    key: 'store',
    value: function store(params, objIds) {
      var state = stateContainer(backendOrderedHitsParams(params), 0);
      var invalidation = invalidationFn(undefined);
      var loadableData = new _loadable_data2.default({ state: state, invalidation: invalidation });

      loadableData.set({ results: objIds });
    }
  }, {
    key: 'firstBatchFor',
    value: function firstBatchFor(params, batchSize) {
      return new ObjIdQueryBatch(backendOrderedHitsParams(params), batchSize);
    }

    // the constructor should only be called internally,
    // i.e. by ObjIdQueryBatch itself

  }]);

  function ObjIdQueryBatch(params, batchSize) {
    var previousBatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, ObjIdQueryBatch);

    this._params = params;
    this._batchSize = batchSize;

    if (previousBatch) {
      this._index = previousBatch.index + 1;
      this._continuation = previousBatch.continuationForNextBatch();
      this._previousBatch = previousBatch;
    } else {
      // First batch
      this._index = 0;
    }
  }

  // throws NotLoadedError if not available


  _createClass(ObjIdQueryBatch, [{
    key: 'objIds',
    value: function objIds() {
      return this._response().results;
    }

    // returns the next batch or undefined if this is the last batch
    // throws NotLoadedError if not available

  }, {
    key: 'nextBatch',
    value: function nextBatch() {
      if (this.continuationForNextBatch()) {
        return new ObjIdQueryBatch(this._params, this._batchSize, this);
      }
    }
  }, {
    key: 'continuationForNextBatch',
    value: function continuationForNextBatch() {
      return this._response().continuation;
    }
  }, {
    key: '_response',
    value: function _response() {
      return this._data().get() || FALLBACK_RESPONSE;
    }
  }, {
    key: '_data',
    value: function _data() {
      var _this = this;

      return new _loadable_data2.default({
        state: stateContainer(this._params, this._index),
        loader: function loader() {
          return _this._load();
        },
        invalidation: invalidationFn(this._continuation)
      });
    }
  }, {
    key: '_load',
    value: function _load() {
      var _this2 = this;

      return this._fetchContinuation().then(function (continuation) {
        var batchSpecificParams = { size: _this2._batchSize, continuation: continuation };

        var requestParams = (0, _underscore.extend)({}, _this2._params, batchSpecificParams);

        return ObjQueryRetrieval.retrieve(requestParams).then(function (response) {
          preloadObjData(response.results);

          return response;
        });
      });
    }
  }, {
    key: '_fetchContinuation',
    value: function _fetchContinuation() {
      var _this3 = this;

      if (this._previousBatch) {
        return (0, _load3.default)(function () {
          return _this3._previousBatch.continuationForNextBatch();
        });
      }

      return scrivito.Promise.resolve();
    }
  }, {
    key: 'index',
    get: function get() {
      return this._index;
    }
  }]);

  return ObjIdQueryBatch;
}();

exports.default = ObjIdQueryBatch;


function preloadObjData(ids) {
  (0, _underscore.each)(ids, function (id) {
    return ObjDataStore.preload(id);
  });
}

function stateContainer(params, index) {
  var paramsWithIndex = (0, _underscore.extend)({}, params, { index: index });
  var key = ObjQueryStore.computeCacheKey(paramsWithIndex);

  return ObjQueryStore.stateContainer().subState(key);
}

function invalidationFn(continuation) {
  return function () {
    return continuation + '|' + scrivito.ObjReplication.getWorkspaceVersion();
  };
}

function backendOrderedHitsParams(params) {
  var backendParams = (0, _underscore.omit)({
    query: params.query,
    offset: params.offset,
    sort_by: params.sortBy,
    sort_order: params.sortDirection
  }, _underscore.isUndefined);

  if (params.includeDeleted) {
    backendParams.options = { include_deleted: true };
  }

  return backendParams;
}

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieve = retrieve;

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retrieve(params) {
  var workspaceId = scrivito.currentWorkspaceId();
  var consistentParams = _underscore2.default.extend({ consistent: true }, params);
  return scrivito.CmsRestApi.get('workspaces/' + workspaceId + '/objs/search', consistentParams).then(function (response) {
    response.results = _underscore2.default.pluck(response.results, 'id');
    return _underscore2.default.pick(response, 'results', 'continuation');
  });
}

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deferred = __webpack_require__(10);

var _deferred2 = _interopRequireDefault(_deferred);

var _obj_patch = __webpack_require__(53);

var ObjPatch = _interopRequireWildcard(_obj_patch);

var _obj_data_store = __webpack_require__(41);

var ObjDataStore = _interopRequireWildcard(_obj_data_store);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var replicationCache = {};
  var disabled = void 0;
  var writeCallbacks = {};
  var subscriptionToken = 0;
  var workspaceVersion = 0;

  scrivito.ObjReplication = function () {
    _createClass(ObjReplication, null, [{
      key: 'get',
      value: function get(id) {
        if (!replicationCache[id]) {
          replicationCache[id] = new scrivito.ObjReplication(id);
        }

        return replicationCache[id];
      }
    }, {
      key: 'subscribeWrites',
      value: function subscribeWrites(callback) {
        subscriptionToken += 1;
        writeCallbacks[subscriptionToken] = callback;
        return subscriptionToken;
      }
    }, {
      key: 'unsubscribeWrites',
      value: function unsubscribeWrites(token) {
        delete writeCallbacks[token];
      }

      // a version counter that increases whenever an Obj in the Workspace is changed.

    }, {
      key: 'getWorkspaceVersion',
      value: function getWorkspaceVersion() {
        return workspaceVersion;
      }
    }]);

    function ObjReplication(id) {
      var _this = this;

      _classCallCheck(this, ObjReplication);

      this._id = id;
      this._replicationActive = false;
      this._scheduledReplication = false;
      this._currentRequestDeferred = null;
      this._nextRequestDeferred = null;
      this._performThrottledReplication = scrivito.throttle(function () {
        return _this._performReplication();
      }, 1000);
    }

    _createClass(ObjReplication, [{
      key: 'notifyLocalState',
      value: function notifyLocalState(localState) {
        if (disabled) {
          return;
        }

        if (this._backendState === undefined) {
          throw new _errors.InternalError('Can not set local state before backend state.');
        }
        if (this._backendState && this._backendState._deleted) {
          throw new _errors.InternalError('Can not update a fully deleted obj.');
        }

        this._localState = localState;
        this._startReplication();
      }
    }, {
      key: 'notifyBackendState',
      value: function notifyBackendState(newBackendState) {
        if (this._backendState === undefined) {
          this._updateBackendState(newBackendState);
          this._updateLocalState(newBackendState);
          return;
        }

        var newestKnownBackendState = this._bufferedBackendState || this._backendState;
        if (compareStates(newBackendState, newestKnownBackendState) > 0) {
          if (this._replicationActive) {
            this._bufferedBackendState = newBackendState;
          } else {
            if (newBackendState._deleted) {
              this._updateLocalState(null);
            } else {
              var patch = diff(this._backendState, newBackendState);
              this._updateLocalState(apply(this.localState, patch));
            }
            this._updateBackendState(newBackendState);
          }
        }
      }
    }, {
      key: 'finishSaving',
      value: function finishSaving() {
        var finishSavingPromise = void 0;

        if (this._nextRequestDeferred) {
          finishSavingPromise = this._nextRequestDeferred.promise;
        } else if (this._currentRequestDeferred) {
          finishSavingPromise = this._currentRequestDeferred.promise;
        } else {
          return scrivito.Promise.resolve();
        }

        return finishSavingPromise.catch(function () {
          return scrivito.Promise.reject();
        });
      }
    }, {
      key: '_startReplication',
      value: function _startReplication() {
        var _this2 = this;

        if (!_underscore2.default.isEmpty(diff(this._backendState, this._localState))) {
          if (!this._replicationActive) {
            if (!this._scheduledReplication) {
              this._scheduledReplication = true;
              this._initDeferredForRequest();

              writeStarted(this._currentRequestDeferred.promise);
              scrivito.nextTick(function () {
                return _this2._performThrottledReplication();
              });
            }
          } else {
            if (!this._nextRequestDeferred) {
              this._nextRequestDeferred = new _deferred2.default();
            }
          }
        } else {
          if (this._nextRequestDeferred) {
            this._nextRequestDeferred.resolve();
            this._nextRequestDeferred = null;
          }
        }
      }
    }, {
      key: '_performReplication',
      value: function _performReplication() {
        var _this3 = this;

        var localState = this._localState;
        var patch = diff(this._backendState, this._localState);

        this._scheduledReplication = false;
        this._replicationActive = true;

        this._replicatePatchToBackend(patch).then(function (backendState) {
          _this3._handleBackendUpdate(localState, backendState);
          _this3._currentRequestDeferred.resolve(_this3._id);
          _this3._currentRequestDeferred = null;
          _this3._replicationActive = false;

          _this3._startReplication();
        }, function (error) {
          _this3._currentRequestDeferred.reject(error);
          _this3._currentRequestDeferred = null;
          _this3._replicationActive = false;
        });
      }
    }, {
      key: '_replicatePatchToBackend',
      value: function _replicatePatchToBackend(patch) {
        if (patch._modification === 'deleted') {
          return this._deleteObj();
        }

        if (_underscore2.default.isEmpty(patch)) {
          return scrivito.Promise.resolve(this._backendState);
        }

        var workspaceId = scrivito.currentWorkspaceId();
        var path = 'workspaces/' + workspaceId + '/objs/' + this._id;
        return scrivito.CmsRestApi.put(path, { obj: patch });
      }
    }, {
      key: '_deleteObj',
      value: function _deleteObj() {
        var workspaceId = scrivito.currentWorkspaceId();
        var path = 'workspaces/' + workspaceId + '/objs/' + this._id;
        return scrivito.CmsRestApi.delete(path, { include_deleted: true });
      }
    }, {
      key: '_initDeferredForRequest',
      value: function _initDeferredForRequest() {
        if (this._nextRequestDeferred) {
          var currentDeferred = this._nextRequestDeferred;
          this._nextRequestDeferred = null;
          this._currentRequestDeferred = currentDeferred;
        } else {
          this._currentRequestDeferred = new _deferred2.default();
        }
      }
    }, {
      key: '_handleBackendUpdate',
      value: function _handleBackendUpdate(replicatedState, backendState) {
        var bufferedLocalChanges = diff(replicatedState, this._localState);

        this._updateBackendState(newerState(backendState, this._bufferedBackendState));
        this._bufferedBackendState = undefined;

        this._updateLocalState(apply(this._backendState, bufferedLocalChanges));
      }
    }, {
      key: '_updateLocalState',
      value: function _updateLocalState(localState) {
        this._localState = localState;
        ObjDataStore.set(this._id, this._localState);
      }
    }, {
      key: '_updateBackendState',
      value: function _updateBackendState(newBackendState) {
        if (this._backendState !== undefined) {
          workspaceVersion++;
        }
        this._backendState = newBackendState;
      }

      // For test purpose only.

    }, {
      key: 'isNotStoredInBackend',


      // For test purpose only.
      value: function isNotStoredInBackend() {
        return this._backendState === null;
      }

      // For test purpose only.

    }, {
      key: 'isRequestInFlight',
      value: function isRequestInFlight() {
        return this._replicationActive;
      }

      // For test purpose only.

    }, {
      key: 'backendState',
      get: function get() {
        return this._backendState;
      }

      // For test purpose only.

    }, {
      key: 'localState',
      get: function get() {
        return this._localState;
      }
    }], [{
      key: 'disableReplication',
      value: function disableReplication() {
        disabled = true;
      }

      // For test purpose only.

    }, {
      key: 'enableReplication',
      value: function enableReplication() {
        disabled = false;
      }

      // For test purpose only.

    }, {
      key: 'clearWriteCallbacks',
      value: function clearWriteCallbacks() {
        writeCallbacks = {};
      }

      // For test purpose only.

    }, {
      key: 'clearCache',
      value: function clearCache() {
        replicationCache = {};
      }
    }]);

    return ObjReplication;
  }();

  function diff(stateA, stateB) {
    return ObjPatch.diff(stateA, stateB);
  }

  function apply(stateA, patch) {
    return ObjPatch.apply(stateA, patch);
  }

  function newerState(stateA, stateB) {
    if (compareStates(stateA, stateB) > 0) {
      return stateA;
    }

    return stateB;
  }

  function compareStates(stateA, stateB) {
    if (!stateA) {
      return -1;
    }
    if (!stateB) {
      return 1;
    }
    return strCompare(stateA._version, stateB._version);
  }

  function strCompare(str1, str2) {
    if (str1 > str2) {
      return 1;
    }
    if (str2 > str1) {
      return -1;
    }
    return 0;
  }

  function writeStarted(promise) {
    _underscore2.default.each(writeCallbacks, function (callback) {
      callback(promise);
    });
  }
})();

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveObj = retrieveObj;
exports.reset = reset;

var _errors = __webpack_require__(1);

var _batch_retrieval = __webpack_require__(70);

var _batch_retrieval2 = _interopRequireDefault(_batch_retrieval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mget(ids) {
  var workspaceId = scrivito.currentWorkspaceId();

  return scrivito.CmsRestApi.get('workspaces/' + workspaceId + '/objs/mget', {
    ids: ids, include_deleted: true
  }).then(function (response) {
    return response.results;
  });
}

// Question: Why the magic batchSize: 17?
// Answer: Retrieval of up to 100 Objs is a common use-case (see ObjSearch)
// With a batchSize of 17, this leads to 6 concurrent requests, which is
// the concurrent request limit in many browsers for HTTP/1.
// This ensures maximum parallel loading.
var batchRetrieval = new _batch_retrieval2.default(mget, { batchSize: 17 });

function retrieveObj(id) {
  return batchRetrieval.retrieve(id).then(function (value) {
    if (value) {
      return value;
    }

    throw new _errors.ResourceNotFoundError('Obj with id "' + id + '" not found.');
  });
}

// For test purpose only.
function reset() {
  batchRetrieval.reset();
}

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _bluebird = __webpack_require__(175);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  _bluebird2.default.noConflict();

  _bluebird2.default.config({
    warnings: false,
    longStackTraces: false
  });

  _underscore2.default.extend(scrivito, {
    Promise: _bluebird2.default,

    promise: {
      enableDebugMode: function enableDebugMode() {
        _bluebird2.default.config({
          warnings: true,
          longStackTraces: true
        });
      },
      wrapInJqueryDeferred: function wrapInJqueryDeferred(promise, jQueryDeferred) {
        var d = jQueryDeferred;

        promise.then(function (data) {
          return d.resolve(data);
        }, function (error) {
          d.reject(error);
        });

        return d;
      },
      always: function always(promise, callback) {
        promise.then(callback, callback);
        return promise;
      },
      capturePromises: function capturePromises() {
        _bluebird2.default.setScheduler(function (promiseCallback) {
          scrivito.nextTick(promiseCallback);
        });
      }
    }
  });
})();

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _widget_factory = __webpack_require__(148);

var _widget_factory2 = _interopRequireDefault(_widget_factory);

var _obj_search_factory = __webpack_require__(147);

var _obj_search_factory2 = _interopRequireDefault(_obj_search_factory);

var _obj_factory = __webpack_require__(146);

var _obj_factory2 = _interopRequireDefault(_obj_factory);

var _link_factory = __webpack_require__(145);

var _link_factory2 = _interopRequireDefault(_link_factory);

var _app_class_factory = __webpack_require__(141);

var _app_class_factory2 = _interopRequireDefault(_app_class_factory);

var _registry = __webpack_require__(158);

var _registry2 = _interopRequireDefault(_registry);

var _errors = __webpack_require__(1);

var _app_model_accessor = __webpack_require__(49);

var _app_model_accessor2 = _interopRequireDefault(_app_model_accessor);

var _app_class_validations = __webpack_require__(167);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Realm = function () {
  _createClass(Realm, null, [{
    key: 'init',
    value: function init(context) {
      var realm = new Realm();

      context.Obj = realm.Obj;
      context.Widget = realm.Widget;
      context.Link = realm.Link;
      context.ObjSearch = realm.ObjSearch;
      context.appModelAccessor = realm.appModelAccessor;
      context.createObjClass = function () {
        return realm.createObjClass.apply(realm, arguments);
      };
      context.createWidgetClass = function () {
        return realm.createWidgetClass.apply(realm, arguments);
      };
      context.getClass = function () {
        return realm.getClass.apply(realm, arguments);
      };
      context.registerClass = function () {
        return realm.registerClass.apply(realm, arguments);
      };

      context.allObjClasses = function () {
        return realm.allObjClasses();
      };
      context.allWidgetClasses = function () {
        return realm.allWidgetClasses();
      };

      context._privateRealm = realm;
    }
  }]);

  function Realm() {
    _classCallCheck(this, Realm);

    this._registry = new _registry2.default();
    this._registry.defaultClassForObjs = (0, _obj_factory2.default)(this._registry);
    this._registry.defaultClassForWidgets = (0, _widget_factory2.default)(this._registry);
    this._registry.defaultClassForLinks = (0, _link_factory2.default)(this._registry);
    this._registry.ObjSearch = (0, _obj_search_factory2.default)(this._registry);

    this.appModelAccessor = new _app_model_accessor2.default(this._registry);
  }

  _createClass(Realm, [{
    key: 'createObjClass',


    // public API
    value: function createObjClass(definition) {
      (0, _app_class_validations.assertValidObjClassDefinition)(definition, this.Obj);
      return this._createAppClass(definition, this.Obj);
    }

    // public API

  }, {
    key: 'createWidgetClass',
    value: function createWidgetClass(definition) {
      (0, _app_class_validations.assertValidWidgetClassDefinition)(definition, this.Widget);

      var onlyInside = definition.onlyInside;

      if (onlyInside) {
        delete definition.onlyInside;
        definition.validContainerClasses = [onlyInside];
      }

      return this._createAppClass(definition, this.Widget);
    }

    // public API

  }, {
    key: 'getClass',
    value: function getClass(name) {
      return this._registry.getClass(name);
    }

    // public API

  }, {
    key: 'registerClass',
    value: function registerClass(name, appClass) {
      if (!appClass || !(0, _app_class_validations.isValidAppClass)(appClass, this.Obj, this.Widget)) {
        throw new _errors.ArgumentError('registerClass has to be called with a CMS Obj or Widget class.');
      }
      this._registry.register(name, appClass);
    }
  }, {
    key: 'allObjClasses',
    value: function allObjClasses() {
      return this._registry.allObjClasses();
    }
  }, {
    key: 'allWidgetClasses',
    value: function allWidgetClasses() {
      return this._registry.allWidgetClasses();
    }
  }, {
    key: '_createAppClass',
    value: function _createAppClass(definition, defaultBaseClass) {
      var baseClass = definition.extend || defaultBaseClass;
      var appClass = (0, _app_class_factory2.default)(definition, baseClass);
      var name = definition.name;

      if (name) {
        this._registry.register(name, appClass);
      }

      return appClass;
    }
  }, {
    key: 'Obj',
    get: function get() {
      return this._registry.defaultClassForObjs;
    }
  }, {
    key: 'Widget',
    get: function get() {
      return this._registry.defaultClassForWidgets;
    }
  }, {
    key: 'Link',
    get: function get() {
      return this._registry.defaultClassForLinks;
    }
  }, {
    key: 'ObjSearch',
    get: function get() {
      return this._registry.ObjSearch;
    }
  }]);

  return Realm;
}();

exports.default = Realm;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Registry = function () {
  function Registry() {
    _classCallCheck(this, Registry);

    this._mapping = {};
  }

  _createClass(Registry, [{
    key: 'register',
    value: function register(name, klass) {
      this._mapping[name] = klass;
    }
  }, {
    key: 'getClass',
    value: function getClass(name) {
      return this._mapping[name];
    }
  }, {
    key: 'allObjClasses',
    value: function allObjClasses() {
      return this._allForBaseClass(this.defaultClassForObjs);
    }
  }, {
    key: 'allWidgetClasses',
    value: function allWidgetClasses() {
      return this._allForBaseClass(this.defaultClassForWidgets);
    }
  }, {
    key: 'objClassFor',
    value: function objClassFor(name) {
      return this._appClassFor(name, this.defaultClassForObjs);
    }
  }, {
    key: 'widgetClassFor',
    value: function widgetClassFor(name) {
      return this._appClassFor(name, this.defaultClassForWidgets);
    }
  }, {
    key: 'objClassNameFor',
    value: function objClassNameFor(modelClass) {
      return _underscore2.default.findKey(this._mapping, function (klass) {
        return klass === modelClass;
      });
    }
  }, {
    key: '_appClassFor',
    value: function _appClassFor(name, baseClass) {
      var appClass = this.getClass(name);

      if (appClass && baseClass.isPrototypeOf(appClass)) {
        return appClass;
      }

      return baseClass;
    }
  }, {
    key: '_allForBaseClass',
    value: function _allForBaseClass(baseClass) {
      return _underscore2.default.pick(this._mapping, function (modelClass) {
        return baseClass.isPrototypeOf(modelClass);
      });
    }
  }]);

  return Registry;
}();

exports.default = Registry;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var shouldBypassThrottle = false;

  function throttle(fn, ms, options) {
    return shouldBypassThrottle ? fn : _underscore2.default.throttle(fn, ms, options);
  }

  function bypassThrottle() {
    shouldBypassThrottle = true;
  }

  scrivito.throttle = throttle;
  scrivito.bypassThrottle = bypassThrottle;
})();

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _attribute = __webpack_require__(26);

var _attribute2 = _interopRequireDefault(_attribute);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.typeInfo = {
    normalize: function normalize(typeInfo) {
      if (_underscore2.default.isString(typeInfo)) {
        return [typeInfo];
      }

      if (_underscore2.default.isArray(typeInfo)) {
        return typeInfo;
      }

      throw new _errors.InternalError('Type Info needs to be a string or an array containing a string and optionally a hash');
    },
    normalizeAttrs: function normalizeAttrs(attributes) {
      var _this = this;

      return _underscore2.default.mapObject(attributes, function (_ref, name) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[0],
            typeInfo = _ref2[1];

        if (_attribute2.default.isSystemAttribute(name)) {
          return [value];
        }

        return [value, _this.normalize(typeInfo)];
      });
    },
    unwrapAttributes: function unwrapAttributes(attributes) {
      return _underscore2.default.mapObject(attributes, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            value = _ref4[0];

        return value;
      });
    }
  };
})();

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function wrapInAppClass(registry, internalValue) {
    if (_underscore2.default.isArray(internalValue)) {
      return _underscore2.default.map(internalValue, function (value) {
        return wrapInAppClass(registry, value);
      });
    }

    if (internalValue instanceof _basic_obj2.default) {
      return buildAppClassInstance(internalValue, registry.objClassFor(internalValue.objClass()));
    }
    if (internalValue instanceof _basic_widget2.default) {
      return buildAppClassInstance(internalValue, registry.widgetClassFor(internalValue.objClass()));
    }
    if (internalValue instanceof _basic_link2.default) {
      return registry.defaultClassForLinks.build(internalValue.buildAttributes());
    }
    return internalValue;
  }

  function buildAppClassInstance(internalValue, appClass) {
    var externalValue = Object.create(appClass.prototype);
    externalValue._scrivitoPrivateContent = internalValue;
    return externalValue;
  }

  function unwrapAppClassValues(values) {
    if (_underscore2.default.isArray(values)) {
      return _underscore2.default.map(values, unwrapSingleValue);
    }

    return unwrapSingleValue(values);
  }

  function unwrapSingleValue(value) {
    if (value && value._scrivitoPrivateContent) {
      return value._scrivitoPrivateContent;
    }

    return value;
  }

  scrivito.wrapInAppClass = wrapInAppClass;
  scrivito.unwrapAppClassValues = unwrapAppClassValues;
  scrivito.buildAppClassInstance = buildAppClassInstance;
})();

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_editing_mode = __webpack_require__(47);

var _is_editing_mode2 = _interopRequireDefault(_is_editing_mode);

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _underscore = __webpack_require__(0);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _errors = __webpack_require__(1);

var _key_for_basic_content = __webpack_require__(166);

var _key_for_basic_content2 = _interopRequireDefault(_key_for_basic_content);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _attribute_value = __webpack_require__(163);

var _attribute_value2 = _interopRequireDefault(_attribute_value);

var _editor = __webpack_require__(249);

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentTag = function (_React$Component) {
  _inherits(ContentTag, _React$Component);

  function ContentTag() {
    _classCallCheck(this, ContentTag);

    return _possibleConstructorReturn(this, (ContentTag.__proto__ || Object.getPrototypeOf(ContentTag)).apply(this, arguments));
  }

  _createClass(ContentTag, [{
    key: 'render',
    value: function render() {
      var field = _schema2.default.basicFieldFor(this.props.content, this.props.attribute);

      if (!field) {
        var attributeName = this.props.attribute;
        throw new _errors.ArgumentError('Component "Scrivito.ContentTag" received prop "attribute" with invalid value: ' + ('Attribute "' + attributeName + '" is not defined for content specified in prop "content".'));
      }

      if ((0, _is_editing_mode2.default)()) {
        return this._renderEditor(field);
      }

      return this._renderValue(field);
    }
  }, {
    key: '_renderEditor',
    value: function _renderEditor(field) {
      return _react2.default.createElement(_editor2.default, {
        children: this.props.children,
        content: this.props.content,
        customProps: this._customProps(),
        field: field,
        key: this._keyForEditor(),
        tag: this.props.tag
      });
    }
  }, {
    key: '_renderValue',
    value: function _renderValue(field) {
      return _react2.default.createElement(_attribute_value2.default, {
        children: this.props.children,
        customProps: this._customProps(),
        field: field,
        tag: this.props.tag
      });
    }
  }, {
    key: '_customProps',
    value: function _customProps() {
      return (0, _underscore.omit)(this.props, 'content', 'attribute', 'tag');
    }
  }, {
    key: '_keyForEditor',
    value: function _keyForEditor() {
      var content = scrivito.unwrapAppClassValues(this.props.content);
      return this.props.tag + '|' + (0, _key_for_basic_content2.default)(content) + '|' + this.props.attribute;
    }
  }]);

  return ContentTag;
}(_react2.default.Component);

ContentTag.displayName = 'Scrivito.ContentTag';

ContentTag.defaultProps = { tag: 'div' };

exports.default = (0, _connect2.default)(ContentTag);

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_editing_mode = __webpack_require__(47);

var _is_editing_mode2 = _interopRequireDefault(_is_editing_mode);

var _internal_links = __webpack_require__(260);

var InternalLinks = _interopRequireWildcard(_internal_links);

var _underscore = __webpack_require__(0);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _navigate_to = __webpack_require__(57);

var _navigate_to2 = _interopRequireDefault(_navigate_to);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _widget = __webpack_require__(251);

var _widget2 = _interopRequireDefault(_widget);

var _widgetlist_placeholder = __webpack_require__(253);

var _widgetlist_placeholder2 = _interopRequireDefault(_widgetlist_placeholder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttributeValue = function (_React$Component) {
  _inherits(AttributeValue, _React$Component);

  function AttributeValue(props) {
    _classCallCheck(this, AttributeValue);

    var _this = _possibleConstructorReturn(this, (AttributeValue.__proto__ || Object.getPrototypeOf(AttributeValue)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(AttributeValue, [{
    key: 'render',
    value: function render() {
      switch (this.props.field.type()) {
        case 'html':
          return this._renderHtml();
        case 'string':
          return this._renderString();
        case 'widgetlist':
          return this._renderWidgetlist();
        default:
          return this._renderContent({ children: this.props.children });
      }
    }
  }, {
    key: '_renderHtml',
    value: function _renderHtml() {
      if (this.props.children) {
        return this._renderContent({ children: this.props.children });
      }

      var html = InternalLinks.transformHTML(this._attributeValue());
      var props = {
        dangerouslySetInnerHTML: { __html: html },
        onClick: this._onClick
      };

      return this._renderContent({ props: props });
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      var target = InternalLinks.findTarget(e.target, e.currentTarget);

      if (target) {
        e.preventDefault();
        e.stopPropagation();

        (0, _navigate_to2.default)(target);
      }
    }
  }, {
    key: '_renderString',
    value: function _renderString() {
      return this._renderContent({ children: this.props.children || this._attributeValue() });
    }
  }, {
    key: '_renderWidgetlist',
    value: function _renderWidgetlist() {
      var children = void 0;

      var widgets = this._attributeValue();
      if (widgets.length) {
        children = widgets.map(function (widget) {
          return _react2.default.createElement(_widget2.default, {
            key: widget.id(),
            widget: widget
          });
        });
      } else if ((0, _is_editing_mode2.default)()) {
        children = _react2.default.createElement(_widgetlist_placeholder2.default, { field: this.props.field });
      }

      return this._renderContent({ children: children });
    }
  }, {
    key: '_renderContent',
    value: function _renderContent(_ref) {
      var props = _ref.props,
          children = _ref.children;

      var contentProps = (0, _underscore.extend)({}, this.props.customProps, props, this._editingProps());
      return _react2.default.createElement(this.props.tag, contentProps, children);
    }
  }, {
    key: '_editingProps',
    value: function _editingProps() {
      if (this.props.onClick) {
        return { onClick: this.props.onClick };
      }

      return {};
    }
  }, {
    key: '_attributeValue',
    value: function _attributeValue() {
      return this.props.field.get();
    }
  }]);

  return AttributeValue;
}(_react2.default.Component);

AttributeValue.displayName = 'Scrivito.ContentTag.AttributeValue';

exports.default = (0, _connect2.default)(AttributeValue);

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _underscore = __webpack_require__(0);

var _navigate_to = __webpack_require__(57);

var _navigate_to2 = _interopRequireDefault(_navigate_to);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkTag = function (_React$Component) {
  _inherits(LinkTag, _React$Component);

  function LinkTag(props) {
    _classCallCheck(this, LinkTag);

    var _this = _possibleConstructorReturn(this, (LinkTag.__proto__ || Object.getPrototypeOf(LinkTag)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(LinkTag, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        this._linkProps(),
        this.props.children
      );
    }
  }, {
    key: '_linkProps',
    value: function _linkProps() {
      var linkProps = (0, _underscore.omit)(this.props, 'to');

      linkProps.href = this._href();
      linkProps.onClick = this._onClick;
      linkProps.target = this._target();

      return linkProps;
    }
  }, {
    key: '_href',
    value: function _href() {
      if (this.props.to) {
        return scrivito.urlFor(this.props.to);
      }

      return '#';
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      e.preventDefault();

      if (this.props.to) {
        var target = this._target();

        if (target) {
          scrivito.openLocation(this._href(), target);
        } else {
          (0, _navigate_to2.default)(this.props.to);
        }
      }
    }
  }, {
    key: '_target',
    value: function _target() {
      if (this.props.target) {
        return this.props.target;
      }

      if (this.props.to && this.props.to._scrivitoPrivateContent instanceof _basic_link2.default) {
        return this.props.to.target();
      }
    }
  }]);

  return LinkTag;
}(_react2.default.Component);

LinkTag.displayName = 'Scrivito.LinkTag';

exports.default = (0, _connect2.default)(LinkTag);

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OptionMarker = function (_React$Component) {
  _inherits(OptionMarker, _React$Component);

  function OptionMarker(props) {
    _classCallCheck(this, OptionMarker);

    var _this = _possibleConstructorReturn(this, (OptionMarker.__proto__ || Object.getPrototypeOf(OptionMarker)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(OptionMarker, [{
    key: 'render',
    value: function render() {
      var className = 'scrivito_option_marker scrivito_' + this.props.position;

      if (this.props.isAlwaysShown) {
        className += ' scrivito_visible';
      }

      return _react2.default.createElement(
        'span',
        {
          className: className,
          onClick: this._onClick
        },
        _react2.default.createElement('i', { className: 'scrivito_icon scrivito_icon_marker_plus' })
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      this.props.insertWidget(this.props.widget, this.props.position);
    }
  }]);

  return OptionMarker;
}(_react2.default.Component);

OptionMarker.displayName = 'Scrivito.OptionMarker';

exports.default = (0, _connect2.default)(OptionMarker);

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyForBasicContent;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _errors = __webpack_require__(1);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keyForBasicContent(content) {
  if (content instanceof _basic_obj2.default) {
    return content.id();
  }

  if (content instanceof _basic_widget2.default) {
    return content.obj().id() + '|' + content.id();
  }

  var formattedContent = (0, _pretty_print2.default)(content).substr(0, 100);
  throw new _errors.InternalError('keyForBasicContent called with "' + formattedContent + '". Expected an instance of' + ' BasicObj or BasicWidget.');
}

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidAppClass = exports.assertValidWidgetClassDefinition = exports.assertValidObjClassDefinition = undefined;

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

var _attribute_inflection = __webpack_require__(13);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VALID_KEYS_FOR_OBJ = ['attributes', 'extend', 'name'];
var VALID_KEYS_FOR_WIDGET = ['attributes', 'extend', 'name', 'onlyInside'];

function assertValidObjClassDefinition(definition, baseClass) {
  assertDefinitionIsValid(definition, VALID_KEYS_FOR_OBJ, baseClass, 'CMS object');
}

function assertValidWidgetClassDefinition(definition, baseClass) {
  assertDefinitionIsValid(definition, VALID_KEYS_FOR_WIDGET, baseClass, 'widget');
}

function isValidAppClass(appClass, defaultObjClass, defaultWidgetClass) {
  return defaultObjClass.isPrototypeOf(appClass) || defaultWidgetClass.isPrototypeOf(appClass);
}

function assertDefinitionIsValid(definition, validKeys, defaultBaseClass, type) {
  var invalidKeys = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(definition)].concat(_toConsumableArray(validKeys)));
  if (invalidKeys.length) {
    throw new _errors.ArgumentError('Invalid key(s) ' + (0, _pretty_print2.default)(invalidKeys) + ' ' + ('given. Valid keys are ' + (0, _pretty_print2.default)(validKeys) + '.'));
  }

  assertValidAttributesHash(definition.attributes);
  var baseClass = definition.extend;
  if (baseClass && defaultBaseClass !== baseClass && !defaultBaseClass.isPrototypeOf(baseClass)) {
    throw new _errors.ArgumentError('Invalid value for "extend": not a ' + type + ' class');
  }
}

function assertValidAttributesHash(attributes) {
  if (attributes === undefined) {
    return;
  }
  if (attributes.constructor === Object) {
    _underscore2.default.each(attributes, function (typeInfo, attributeName) {
      if (!(0, _attribute_inflection.isCamelCase)(attributeName)) {
        throw new _errors.ArgumentError('Attribute "' + attributeName + '" is not in camel case.');
      }
      if (!(_underscore2.default.isArray(typeInfo) || _underscore2.default.isString(typeInfo))) {
        throw new _errors.ArgumentError('Attribute definition for "' + attributeName + '" is invalid. ' + 'Should be a String or an Array.');
      }
    });
  } else {
    throw new _errors.ArgumentError('Required key "attributes" is invalid. Should be an Object.');
  }
}

exports.assertValidObjClassDefinition = assertValidObjClassDefinition;
exports.assertValidWidgetClassDefinition = assertValidWidgetClassDefinition;
exports.isValidAppClass = isValidAppClass;

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!window.scrivito) {
  window.scrivito = {};
}
window.scrivito.client = {};

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(168);

__webpack_require__(127);

__webpack_require__(128);

__webpack_require__(129);

__webpack_require__(130);

__webpack_require__(131);

__webpack_require__(133);

__webpack_require__(134);

__webpack_require__(136);

__webpack_require__(137);

__webpack_require__(138);

__webpack_require__(139);

__webpack_require__(140);

__webpack_require__(142);

__webpack_require__(3);

__webpack_require__(149);

__webpack_require__(154);

__webpack_require__(156);

__webpack_require__(171);

__webpack_require__(159);

__webpack_require__(160);

__webpack_require__(161);

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _urijs = __webpack_require__(38);

var _urijs2 = _interopRequireDefault(_urijs);

var _errors = __webpack_require__(1);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allowedAttributes = ['hash', 'obj', 'query', 'target', 'title', 'url'];

var BasicLink = function () {
  _createClass(BasicLink, null, [{
    key: 'build',
    value: function build(attributes) {
      var objId = attributes.objId;
      delete attributes.objId;
      var link = new this(attributes);
      if (objId) {
        link._objId = objId;
      }

      return link;
    }
  }]);

  function BasicLink(attributes) {
    _classCallCheck(this, BasicLink);

    assertValidPublicAttributes(attributes);

    this._hash = attributes.hash || null;
    this._query = attributes.query || null;
    this._target = attributes.target || null;
    this._title = attributes.title || null;
    this._url = attributes.url || null;

    this._objId = null;
    if (attributes.obj) {
      this._objId = attributes.obj.id();
    }
  }

  // public API


  _createClass(BasicLink, [{
    key: 'title',
    value: function title() {
      return this._title;
    }

    // public API

  }, {
    key: 'query',
    value: function query() {
      return this._query;
    }

    // public API

  }, {
    key: 'hash',
    value: function hash() {
      return this._hash;
    }

    // public API

  }, {
    key: 'target',
    value: function target() {
      return this._target;
    }

    // public API

  }, {
    key: 'url',
    value: function url() {
      return this._url;
    }
  }, {
    key: 'objId',
    value: function objId() {
      return this._objId;
    }

    // public API

  }, {
    key: 'obj',
    value: function obj() {
      if (this.objId()) {
        return _basic_obj2.default.get(this.objId());
      }

      return null;
    }
  }, {
    key: 'queryParameters',
    value: function queryParameters() {
      return _urijs2.default.parseQuery(this.query());
    }
  }, {
    key: 'fetchObj',
    value: function fetchObj() {
      if (this.isExternal()) {
        return scrivito.PublicPromise.reject(new _errors.ScrivitoError('The link is external and does not reference an object.'));
      }

      return _basic_obj2.default.fetch(this.objId());
    }

    // public API

  }, {
    key: 'isExternal',
    value: function isExternal() {
      return !!this.url();
    }

    // public API

  }, {
    key: 'isInternal',
    value: function isInternal() {
      return !this.isExternal();
    }

    // public API

  }, {
    key: 'copy',
    value: function copy(attributes) {
      assertValidPublicAttributes(attributes);

      var newAttributes = this.buildAttributes();
      if (_underscore2.default.has(attributes, 'obj')) {
        delete newAttributes.objId;
      }
      _underscore2.default.extend(newAttributes, attributes);

      return this.constructor.build(newAttributes);
    }
  }, {
    key: 'buildAttributes',
    value: function buildAttributes() {
      return {
        title: this.title(),
        query: this.query(),
        hash: this.hash(),
        target: this.target(),
        url: this.url(),
        objId: this.objId()
      };
    }
  }, {
    key: 'isBroken',
    value: function isBroken() {
      if (this.isExternal()) {
        return false;
      }

      try {
        return !this.obj();
      } catch (e) {
        if (e instanceof _errors.ResourceNotFoundError) {
          return true;
        }

        throw e;
      }
    }
  }]);

  return BasicLink;
}();

exports.default = BasicLink;


function assertValidPublicAttributes(attributes) {
  var unknownAttrs = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(attributes)].concat(allowedAttributes));
  if (!_underscore2.default.isEmpty(unknownAttrs)) {
    throw new _errors.ArgumentError('Unexpected attributes ' + (0, _pretty_print2.default)(unknownAttrs) + '.' + (' Available attributes: ' + (0, _pretty_print2.default)(allowedAttributes)));
  }
}

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = __webpack_require__(1);

var _verificator_functions = __webpack_require__(172);

var _verificator_functions2 = _interopRequireDefault(_verificator_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_CODE_CLIENT_VERIFICATION_REQUIRED = 'client_verification_required';

var computation = void 0;
var verification = void 0;

function perform(callback) {
  return new scrivito.Promise(function (resolve) {
    return resolve(callback(currentAuthorization()));
  }).catch(function (error) {
    if (!(error instanceof _errors.UnauthorizedError)) {
      throw error;
    }
    if (error.backendCode !== ERROR_CODE_CLIENT_VERIFICATION_REQUIRED) {
      throw error;
    }
    return computeVerification(error.details.verificator, error.details.data).then(function (computedVerification) {
      return callback(computedVerification.authorization);
    });
  });
}

// If a pending computation is present, verificator and data are ignored.
// It is about to return any authorization, and have not more than one
// computation at any time.
function computeVerification(verificator, data) {
  // isPending() is Bluebird
  if (!(computation && computation.isPending())) {
    computation = _verificator_functions2.default.fetch(verificator.id, verificator.url).then(function (computeAuthorization) {
      return new scrivito.Promise(function (r) {
        return computeAuthorization(data, r);
      });
    });
    computation.then(forgetComputationAndRememberVerification);
    computation.challenge = { verificator: verificator, data: data };
  }
  return computation;
}

function forgetComputationAndRememberVerification(verificationToRemember) {
  computation = undefined;
  verification = verificationToRemember;
}

function reset() {
  forgetComputationAndRememberVerification();
}

function currentAuthorization() {
  if (!verification) {
    return;
  }
  if (verification.expiresAfter < new Date()) {
    verification = undefined;
    return;
  }
  return verification.authorization;
}

// integration test support
function currentState() {
  var authorization = currentAuthorization();
  if (authorization) {
    return 'Authorization: ' + authorization;
  }

  if (!computation) {
    return null;
  }

  var challenge = computation.challenge;
  var verificator = challenge.verificator;
  var verificatorId = verificator.id;
  var data = challenge.data;
  if (computation.isPending()) {
    return 'Pending computation: ' + verificatorId + ' with ' + data;
  }

  // The following states are not expected to ever be returned.
  // It indicates a computation that has finished unsucessfully.
  var orphaned = 'Orphaned computation: ' + verificatorId + ' with ' + data;
  if (!verification) {
    return orphaned + ' (verification not present?!?)';
  }

  var expiresAfter = verification && verification.expiresAfter;
  if (!expiresAfter) {
    return orphaned + ' (verification present, but without expiry?)';
  }

  var expireDescription = '(verification expiresAfter: ' + expiresAfter + ')';
  if (new Date() <= expiresAfter) {
    return orphaned + ' ' + expireDescription;
  }
  return orphaned + ' ' + expireDescription + ' (expired)';
}

reset();

exports.default = { perform: perform, reset: reset, currentState: currentState, ERROR_CODE_CLIENT_VERIFICATION_REQUIRED: ERROR_CODE_CLIENT_VERIFICATION_REQUIRED };

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.PublicPromise = function () {
    _createClass(Promise, null, [{
      key: "all",
      value: function all(promises) {
        return new scrivito.PublicPromise(scrivito.Promise.all(promises));
      }
    }, {
      key: "race",
      value: function race(promises) {
        return new scrivito.PublicPromise(scrivito.Promise.race(promises));
      }
    }, {
      key: "resolve",
      value: function resolve(valueOrThenable) {
        return new scrivito.PublicPromise(scrivito.Promise.resolve(valueOrThenable));
      }
    }, {
      key: "reject",
      value: function reject(valueOrThenable) {
        return new scrivito.PublicPromise(scrivito.Promise.reject(valueOrThenable));
      }
    }]);

    function Promise(promise) {
      _classCallCheck(this, Promise);

      this._internalPromise = promise;
    }

    _createClass(Promise, [{
      key: "then",
      value: function then(resolve, reject) {
        return new scrivito.PublicPromise(this._internalPromise.then(resolve, reject));
      }
    }, {
      key: "catch",
      value: function _catch(reject) {
        return new scrivito.PublicPromise(this._internalPromise.catch(reject));
      }
    }]);

    return Promise;
  }();
})();

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deferred = __webpack_require__(10);

var _deferred2 = _interopRequireDefault(_deferred);

var _asset_loading = __webpack_require__(97);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registry = void 0;

function reset() {
  registry = {};
}

function fetch(verificatorId, verificatorUrl) {
  var deferred = registry[verificatorId];

  if (!deferred) {
    deferred = new _deferred2.default();
    registry[verificatorId] = deferred;

    (0, _asset_loading.loadJs)(verificatorUrl, function (e) {
      deferred.reject(e);
      delete registry[verificatorId];
    });
  }

  return deferred.promise;
}

reset();

window._scrivitoRegisterVerificator = function (verificatorId, verificatorFunction) {
  registry[verificatorId].resolve(verificatorFunction);
};

exports.default = {
  fetch: fetch,
  reset: reset
};

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inheritComponentName;
function inheritComponentName(subClass, _ref) {
  var superClass = _ref.from;

  subClass.displayName = superClass.displayName || superClass.name;
}

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isClassComponent;
function isClassComponent(component) {
    return typeof component === 'function' && component.prototype && component.prototype.isReactComponent;
}

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2015 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.4.7
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");
var util = _dereq_("./util");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype._drainQueue = function(queue) {
    while (queue.length() > 0) {
        var fn = queue.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (false) {
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (false) {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        (true ||
                         util.env("BLUEBIRD_DEBUG") ||
                         util.env("NODE_ENV") === "development"));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};

Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

return PassThroughHandlerContext;
};

},{"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", value) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (false) {
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (false) {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");

var getDomain;
if (util.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = _dereq_("./debuggability")(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }
    if (self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
}

function Promise(executor) {
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    if (executor !== INTERNAL) {
        check(this, executor);
        this._resolveFromExecutor(executor);
    }
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("expecting an object but got " +
                    "A catch statement predicate " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.4.7";
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./filter.js')(Promise, INTERNAL);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./any.js')(Promise);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (false) {
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util.tryCatch,
                    util.errorObj,
                    util.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
                toggleScheduled = true;
                div2.classList.toggle("foo");
            };

            return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string";
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    "object" !== "undefined";

function env(key) {
    return hasEnvVariables ? __webpack_require__.i({"NODE_ENV":"production"})[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44), __webpack_require__(34), __webpack_require__(188).setImmediate))

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(187)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
    } else {
        root.ErrorStackParser = factory(root.StackFrame);
    }
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    function _map(array, fn, thisArg) {
        if (typeof Array.prototype.map === 'function') {
            return array.map(fn, thisArg);
        } else {
            var output = new Array(array.length);
            for (var i = 0; i < array.length; i++) {
                output[i] = fn.call(thisArg, array[i]);
            }
            return output;
        }
    }

    function _filter(array, fn, thisArg) {
        if (typeof Array.prototype.filter === 'function') {
            return array.filter(fn, thisArg);
        } else {
            var output = [];
            for (var i = 0; i < array.length; i++) {
                if (fn.call(thisArg, array[i])) {
                    output.push(array[i]);
                }
            }
            return output;
        }
    }

    function _indexOf(array, target) {
        if (typeof Array.prototype.indexOf === 'function') {
            return array.indexOf(target);
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === target) {
                    return i;
                }
            }
            return -1;
        }
    }

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame(line);
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;
                    return new StackFrame(functionName,
                        undefined,
                        locationParts[0],
                        locationParts[1],
                        locationParts[2],
                        line);
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame(
                            match[3] || undefined,
                            undefined,
                            match[2],
                            match[1],
                            undefined,
                            lines[i]
                        )
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return _map(filtered, function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');
                return new StackFrame(
                    functionName,
                    args,
                    locationParts[0],
                    locationParts[1],
                    locationParts[2],
                    line);
            }, this);
        }
    };
}));



/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prettyPrint;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

var _underscore = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prettyPrint(input) {
  try {
    if ((0, _underscore.isFunction)(input)) {
      return printFunction(input);
    }

    if ((0, _underscore.isObject)(input)) {
      return printObject(input);
    }

    return printTruncated(input);
  } catch (_e) {
    return '';
  }
}

function printObject(object) {
  var basicContent = object._scrivitoPrivateContent;

  if (basicContent) {
    return printBasicContent(basicContent);
  }

  if ((0, _underscore.isElement)(object)) {
    return '[object HTMLElement ' + printTruncated(object.outerHTML) + ']';
  }

  if (object instanceof jQuery) {
    return '[object jQuery ' + printTruncated(object.get(0).outerHTML) + ']';
  }

  return printTruncated(object);
}

function printFunction(fn) {
  var schema = fn._scrivitoPrivateSchema;

  if (schema) {
    return '[class ' + schema.name + ']';
  }

  if (fn.prototype && fn.prototype.isReactComponent) {
    var name = fn.displayName || fn.name;
    return '[class React.Component "' + name + '"]';
  }

  return truncate(fn.toString());
}

function printBasicContent(content) {
  if (content instanceof _basic_obj2.default) {
    return '[object ' + content.objClass() + ' id="' + content.id() + '"]';
  } else if (content instanceof _basic_widget2.default) {
    var obj = content.obj();
    return '[object ' + content.objClass() + ' id="' + content.id() + '" objId="' + obj.id() + '"]';
  } else if (content instanceof _basic_link2.default) {
    if (content.isInternal()) {
      return '[object Link objId="' + content.objId() + '"]';
    }

    return '[object Link url="' + content.url() + '"]';
  }
}

function printTruncated(input) {
  var stringified = JSON.stringify(input);

  if (stringified) {
    return truncate(stringified);
  }

  return stringified;
}

function truncate(string) {
  if (string.length > 100) {
    return string.slice(0, 100) + '...';
  }

  return string;
}

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34), __webpack_require__(44)))

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, undefined) {
    'use strict';

    /**
     * getSlug
     * @param  {string} input input string
     * @param  {object|string} opts config object or separator string/char
     * @api    public
     * @return {string}  sluggified string
     */
    var getSlug = function getSlug(input, opts) {

        var separator = '-';
        var uricChars = [';', '?', ':', '@', '&', '=', '+', '$', ',', '/'];
        var uricNoSlashChars = [';', '?', ':', '@', '&', '=', '+', '$', ','];
        var markChars = ['.', '!', '~', '*', '\'', '(', ')'];
        var result = '';
        var diatricString = '';
        var convertSymbols = true;
        var customReplacements = {};
        var maintainCase;
        var titleCase;
        var truncate;
        var uricFlag;
        var uricNoSlashFlag;
        var markFlag;
        var symbol;
        var langChar;
        var lucky;
        var i;
        var ch;
        var l;
        var lastCharWasSymbol;
        var lastCharWasDiatric;
        var allowedChars;

        /**
         * charMap
         * @type {Object}
         */
        var charMap = {

            // latin
            'À': 'A',
            'Á': 'A',
            'Â': 'A',
            'Ã': 'A',
            'Ä': 'Ae',
            'Å': 'A',
            'Æ': 'AE',
            'Ç': 'C',
            'È': 'E',
            'É': 'E',
            'Ê': 'E',
            'Ë': 'E',
            'Ì': 'I',
            'Í': 'I',
            'Î': 'I',
            'Ï': 'I',
            'Ð': 'D',
            'Ñ': 'N',
            'Ò': 'O',
            'Ó': 'O',
            'Ô': 'O',
            'Õ': 'O',
            'Ö': 'Oe',
            'Ő': 'O',
            'Ø': 'O',
            'Ù': 'U',
            'Ú': 'U',
            'Û': 'U',
            'Ü': 'Ue',
            'Ű': 'U',
            'Ý': 'Y',
            'Þ': 'TH',
            'ß': 'ss',
            'à': 'a',
            'á': 'a',
            'â': 'a',
            'ã': 'a',
            'ä': 'ae',
            'å': 'a',
            'æ': 'ae',
            'ç': 'c',
            'è': 'e',
            'é': 'e',
            'ê': 'e',
            'ë': 'e',
            'ì': 'i',
            'í': 'i',
            'î': 'i',
            'ï': 'i',
            'ð': 'd',
            'ñ': 'n',
            'ò': 'o',
            'ó': 'o',
            'ô': 'o',
            'õ': 'o',
            'ö': 'oe',
            'ő': 'o',
            'ø': 'o',
            'ù': 'u',
            'ú': 'u',
            'û': 'u',
            'ü': 'ue',
            'ű': 'u',
            'ý': 'y',
            'þ': 'th',
            'ÿ': 'y',
            'ẞ': 'SS',

            // language specific

            // Arabic
            'ا': 'a',
            'أ': 'a',
            'إ': 'i',
            'آ': 'aa',
            'ؤ': 'u',
            'ئ': 'e',
            'ء': 'a',
            'ب': 'b',
            'ت': 't',
            'ث': 'th',
            'ج': 'j',
            'ح': 'h',
            'خ': 'kh',
            'د': 'd',
            'ذ': 'th',
            'ر': 'r',
            'ز': 'z',
            'س': 's',
            'ش': 'sh',
            'ص': 's',
            'ض': 'dh',
            'ط': 't',
            'ظ': 'z',
            'ع': 'a',
            'غ': 'gh',
            'ف': 'f',
            'ق': 'q',
            'ك': 'k',
            'ل': 'l',
            'م': 'm',
            'ن': 'n',
            'ه': 'h',
            'و': 'w',
            'ي': 'y',
            'ى': 'a',
            'ة': 'h',
            'ﻻ': 'la',
            'ﻷ': 'laa',
            'ﻹ': 'lai',
            'ﻵ': 'laa',

            // Persian additional characters than Arabic
            'گ': 'g',
            'چ': 'ch',
            'پ': 'p',
            'ژ': 'zh',
            'ک': 'k',
            'ی': 'y',

            // Arabic diactrics
            'َ': 'a',
            'ً': 'an',
            'ِ': 'e',
            'ٍ': 'en',
            'ُ': 'u',
            'ٌ': 'on',
            'ْ': '',

            // Arabic numbers
            '٠': '0',
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9',

            // Persian numbers
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',

            // Burmese consonants
            'က': 'k',
            'ခ': 'kh',
            'ဂ': 'g',
            'ဃ': 'ga',
            'င': 'ng',
            'စ': 's',
            'ဆ': 'sa',
            'ဇ': 'z',
            'စျ': 'za',
            'ည': 'ny',
            'ဋ': 't',
            'ဌ': 'ta',
            'ဍ': 'd',
            'ဎ': 'da',
            'ဏ': 'na',
            'တ': 't',
            'ထ': 'ta',
            'ဒ': 'd',
            'ဓ': 'da',
            'န': 'n',
            'ပ': 'p',
            'ဖ': 'pa',
            'ဗ': 'b',
            'ဘ': 'ba',
            'မ': 'm',
            'ယ': 'y',
            'ရ': 'ya',
            'လ': 'l',
            'ဝ': 'w',
            'သ': 'th',
            'ဟ': 'h',
            'ဠ': 'la',
            'အ': 'a',
            // consonant character combos
            'ြ': 'y',
            'ျ': 'ya',
            'ွ': 'w',
            'ြွ': 'yw',
            'ျွ': 'ywa',
            'ှ': 'h',
            // independent vowels
            'ဧ': 'e',
            '၏': '-e',
            'ဣ': 'i',
            'ဤ': '-i',
            'ဉ': 'u',
            'ဦ': '-u',
            'ဩ': 'aw',
            'သြော': 'aw',
            'ဪ': 'aw',
            // numbers
            '၀': '0',
            '၁': '1',
            '၂': '2',
            '၃': '3',
            '၄': '4',
            '၅': '5',
            '၆': '6',
            '၇': '7',
            '၈': '8',
            '၉': '9',
            // virama and tone marks which are silent in transliteration
            '္': '',
            '့': '',
            'း': '',

            // Czech
            'č': 'c',
            'ď': 'd',
            'ě': 'e',
            'ň': 'n',
            'ř': 'r',
            'š': 's',
            'ť': 't',
            'ů': 'u',
            'ž': 'z',
            'Č': 'C',
            'Ď': 'D',
            'Ě': 'E',
            'Ň': 'N',
            'Ř': 'R',
            'Š': 'S',
            'Ť': 'T',
            'Ů': 'U',
            'Ž': 'Z',

            // Dhivehi
            'ހ': 'h',
            'ށ': 'sh',
            'ނ': 'n',
            'ރ': 'r',
            'ބ': 'b',
            'ޅ': 'lh',
            'ކ': 'k',
            'އ': 'a',
            'ވ': 'v',
            'މ': 'm',
            'ފ': 'f',
            'ދ': 'dh',
            'ތ': 'th',
            'ލ': 'l',
            'ގ': 'g',
            'ޏ': 'gn',
            'ސ': 's',
            'ޑ': 'd',
            'ޒ': 'z',
            'ޓ': 't',
            'ޔ': 'y',
            'ޕ': 'p',
            'ޖ': 'j',
            'ޗ': 'ch',
            'ޘ': 'tt',
            'ޙ': 'hh',
            'ޚ': 'kh',
            'ޛ': 'th',
            'ޜ': 'z',
            'ޝ': 'sh',
            'ޞ': 's',
            'ޟ': 'd',
            'ޠ': 't',
            'ޡ': 'z',
            'ޢ': 'a',
            'ޣ': 'gh',
            'ޤ': 'q',
            'ޥ': 'w',
            'ަ': 'a',
            'ާ': 'aa',
            'ި': 'i',
            'ީ': 'ee',
            'ު': 'u',
            'ޫ': 'oo',
            'ެ': 'e',
            'ޭ': 'ey',
            'ޮ': 'o',
            'ޯ': 'oa',
            'ް': '',

            // Greek
            'α': 'a',
            'β': 'v',
            'γ': 'g',
            'δ': 'd',
            'ε': 'e',
            'ζ': 'z',
            'η': 'i',
            'θ': 'th',
            'ι': 'i',
            'κ': 'k',
            'λ': 'l',
            'μ': 'm',
            'ν': 'n',
            'ξ': 'ks',
            'ο': 'o',
            'π': 'p',
            'ρ': 'r',
            'σ': 's',
            'τ': 't',
            'υ': 'y',
            'φ': 'f',
            'χ': 'x',
            'ψ': 'ps',
            'ω': 'o',
            'ά': 'a',
            'έ': 'e',
            'ί': 'i',
            'ό': 'o',
            'ύ': 'y',
            'ή': 'i',
            'ώ': 'o',
            'ς': 's',
            'ϊ': 'i',
            'ΰ': 'y',
            'ϋ': 'y',
            'ΐ': 'i',
            'Α': 'A',
            'Β': 'B',
            'Γ': 'G',
            'Δ': 'D',
            'Ε': 'E',
            'Ζ': 'Z',
            'Η': 'I',
            'Θ': 'TH',
            'Ι': 'I',
            'Κ': 'K',
            'Λ': 'L',
            'Μ': 'M',
            'Ν': 'N',
            'Ξ': 'KS',
            'Ο': 'O',
            'Π': 'P',
            'Ρ': 'R',
            'Σ': 'S',
            'Τ': 'T',
            'Υ': 'Y',
            'Φ': 'F',
            'Χ': 'X',
            'Ψ': 'PS',
            'Ω': 'O',
            'Ά': 'A',
            'Έ': 'E',
            'Ί': 'I',
            'Ό': 'O',
            'Ύ': 'Y',
            'Ή': 'I',
            'Ώ': 'O',
            'Ϊ': 'I',
            'Ϋ': 'Y',

            // Latvian
            'ā': 'a',
            // 'č': 'c', // duplicate
            'ē': 'e',
            'ģ': 'g',
            'ī': 'i',
            'ķ': 'k',
            'ļ': 'l',
            'ņ': 'n',
            // 'š': 's', // duplicate
            'ū': 'u',
            // 'ž': 'z', // duplicate
            'Ā': 'A',
            // 'Č': 'C', // duplicate
            'Ē': 'E',
            'Ģ': 'G',
            'Ī': 'I',
            'Ķ': 'k',
            'Ļ': 'L',
            'Ņ': 'N',
            // 'Š': 'S', // duplicate
            'Ū': 'U',
            // 'Ž': 'Z', // duplicate

            // Macedonian
            'Ќ': 'Kj',
            'ќ': 'kj',
            'Љ': 'Lj',
            'љ': 'lj',
            'Њ': 'Nj',
            'њ': 'nj',
            'Тс': 'Ts',
            'тс': 'ts',

            // Polish
            'ą': 'a',
            'ć': 'c',
            'ę': 'e',
            'ł': 'l',
            'ń': 'n',
            // 'ó': 'o', // duplicate
            'ś': 's',
            'ź': 'z',
            'ż': 'z',
            'Ą': 'A',
            'Ć': 'C',
            'Ę': 'E',
            'Ł': 'L',
            'Ń': 'N',
            'Ś': 'S',
            'Ź': 'Z',
            'Ż': 'Z',

            // Ukranian
            'Є': 'Ye',
            'І': 'I',
            'Ї': 'Yi',
            'Ґ': 'G',
            'є': 'ye',
            'і': 'i',
            'ї': 'yi',
            'ґ': 'g',

            // Romanian
            'ă': 'a',
            'Ă': 'A',
            'ș': 's',
            'Ș': 'S',
            // 'ş': 's', // duplicate
            // 'Ş': 'S', // duplicate
            'ț': 't',
            'Ț': 'T',
            'ţ': 't',
            'Ţ': 'T',

            // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
            // ICAO

            'а': 'a',
            'б': 'b',
            'в': 'v',
            'г': 'g',
            'д': 'd',
            'е': 'e',
            'ё': 'yo',
            'ж': 'zh',
            'з': 'z',
            'и': 'i',
            'й': 'i',
            'к': 'k',
            'л': 'l',
            'м': 'm',
            'н': 'n',
            'о': 'o',
            'п': 'p',
            'р': 'r',
            'с': 's',
            'т': 't',
            'у': 'u',
            'ф': 'f',
            'х': 'kh',
            'ц': 'c',
            'ч': 'ch',
            'ш': 'sh',
            'щ': 'sh',
            'ъ': '',
            'ы': 'y',
            'ь': '',
            'э': 'e',
            'ю': 'yu',
            'я': 'ya',
            'А': 'A',
            'Б': 'B',
            'В': 'V',
            'Г': 'G',
            'Д': 'D',
            'Е': 'E',
            'Ё': 'Yo',
            'Ж': 'Zh',
            'З': 'Z',
            'И': 'I',
            'Й': 'I',
            'К': 'K',
            'Л': 'L',
            'М': 'M',
            'Н': 'N',
            'О': 'O',
            'П': 'P',
            'Р': 'R',
            'С': 'S',
            'Т': 'T',
            'У': 'U',
            'Ф': 'F',
            'Х': 'Kh',
            'Ц': 'C',
            'Ч': 'Ch',
            'Ш': 'Sh',
            'Щ': 'Sh',
            'Ъ': '',
            'Ы': 'Y',
            'Ь': '',
            'Э': 'E',
            'Ю': 'Yu',
            'Я': 'Ya',

            // Serbian
            'ђ': 'dj',
            'ј': 'j',
            // 'љ': 'lj',  // duplicate
            // 'њ': 'nj', // duplicate
            'ћ': 'c',
            'џ': 'dz',
            'Ђ': 'Dj',
            'Ј': 'j',
            // 'Љ': 'Lj', // duplicate
            // 'Њ': 'Nj', // duplicate
            'Ћ': 'C',
            'Џ': 'Dz',

            // Slovak
            'ľ': 'l',
            'ĺ': 'l',
            'ŕ': 'r',
            'Ľ': 'L',
            'Ĺ': 'L',
            'Ŕ': 'R',

            // Turkish
            'ş': 's',
            'Ş': 'S',
            'ı': 'i',
            'İ': 'I',
            // 'ç': 'c', // duplicate
            // 'Ç': 'C', // duplicate
            // 'ü': 'u', // duplicate, see langCharMap
            // 'Ü': 'U', // duplicate, see langCharMap
            // 'ö': 'o', // duplicate, see langCharMap
            // 'Ö': 'O', // duplicate, see langCharMap
            'ğ': 'g',
            'Ğ': 'G',

            // Vietnamese
            'ả': 'a',
            'Ả': 'A',
            'ẳ': 'a',
            'Ẳ': 'A',
            'ẩ': 'a',
            'Ẩ': 'A',
            'đ': 'd',
            'Đ': 'D',
            'ẹ': 'e',
            'Ẹ': 'E',
            'ẽ': 'e',
            'Ẽ': 'E',
            'ẻ': 'e',
            'Ẻ': 'E',
            'ế': 'e',
            'Ế': 'E',
            'ề': 'e',
            'Ề': 'E',
            'ệ': 'e',
            'Ệ': 'E',
            'ễ': 'e',
            'Ễ': 'E',
            'ể': 'e',
            'Ể': 'E',
            'ọ': 'o',
            'Ọ': 'o',
            'ố': 'o',
            'Ố': 'O',
            'ồ': 'o',
            'Ồ': 'O',
            'ổ': 'o',
            'Ổ': 'O',
            'ộ': 'o',
            'Ộ': 'O',
            'ỗ': 'o',
            'Ỗ': 'O',
            'ơ': 'o',
            'Ơ': 'O',
            'ớ': 'o',
            'Ớ': 'O',
            'ờ': 'o',
            'Ờ': 'O',
            'ợ': 'o',
            'Ợ': 'O',
            'ỡ': 'o',
            'Ỡ': 'O',
            'Ở': 'o',
            'ở': 'o',
            'ị': 'i',
            'Ị': 'I',
            'ĩ': 'i',
            'Ĩ': 'I',
            'ỉ': 'i',
            'Ỉ': 'i',
            'ủ': 'u',
            'Ủ': 'U',
            'ụ': 'u',
            'Ụ': 'U',
            'ũ': 'u',
            'Ũ': 'U',
            'ư': 'u',
            'Ư': 'U',
            'ứ': 'u',
            'Ứ': 'U',
            'ừ': 'u',
            'Ừ': 'U',
            'ự': 'u',
            'Ự': 'U',
            'ữ': 'u',
            'Ữ': 'U',
            'ử': 'u',
            'Ử': 'ư',
            'ỷ': 'y',
            'Ỷ': 'y',
            'ỳ': 'y',
            'Ỳ': 'Y',
            'ỵ': 'y',
            'Ỵ': 'Y',
            'ỹ': 'y',
            'Ỹ': 'Y',
            'ạ': 'a',
            'Ạ': 'A',
            'ấ': 'a',
            'Ấ': 'A',
            'ầ': 'a',
            'Ầ': 'A',
            'ậ': 'a',
            'Ậ': 'A',
            'ẫ': 'a',
            'Ẫ': 'A',
            // 'ă': 'a', // duplicate
            // 'Ă': 'A', // duplicate
            'ắ': 'a',
            'Ắ': 'A',
            'ằ': 'a',
            'Ằ': 'A',
            'ặ': 'a',
            'Ặ': 'A',
            'ẵ': 'a',
            'Ẵ': 'A',

            // symbols
            '“': '"',
            '”': '"',
            '‘': '\'',
            '’': '\'',
            '∂': 'd',
            'ƒ': 'f',
            '™': '(TM)',
            '©': '(C)',
            'œ': 'oe',
            'Œ': 'OE',
            '®': '(R)',
            '†': '+',
            '℠': '(SM)',
            '…': '...',
            '˚': 'o',
            'º': 'o',
            'ª': 'a',
            '•': '*',
            '၊': ',',
            '။': '.',

            // currency
            '$': 'USD',
            '€': 'EUR',
            '₢': 'BRN',
            '₣': 'FRF',
            '£': 'GBP',
            '₤': 'ITL',
            '₦': 'NGN',
            '₧': 'ESP',
            '₩': 'KRW',
            '₪': 'ILS',
            '₫': 'VND',
            '₭': 'LAK',
            '₮': 'MNT',
            '₯': 'GRD',
            '₱': 'ARS',
            '₲': 'PYG',
            '₳': 'ARA',
            '₴': 'UAH',
            '₵': 'GHS',
            '¢': 'cent',
            '¥': 'CNY',
            '元': 'CNY',
            '円': 'YEN',
            '﷼': 'IRR',
            '₠': 'EWE',
            '฿': 'THB',
            '₨': 'INR',
            '₹': 'INR',
            '₰': 'PF',
            '₺': 'TRY',
            '؋': 'AFN',
            '₼': 'AZN',
            'лв': 'BGN',
            '៛': 'KHR',
            '₡': 'CRC',
            '₸': 'KZT',
            'ден': 'MKD',
            'zł': 'PLN',
            '₽': 'RUB',
            '₾': 'GEL'

        };

        /**
         * special look ahead character array
         * These characters form with consonants to become 'single'/consonant combo
         * @type [Array]
         */
        var lookAheadCharArray = [
            // burmese
            '်',

            // Dhivehi
            'ް'
        ];

        /**
         * diatricMap for languages where transliteration changes entirely as more diatrics are added
         * @type {Object}
         */
        var diatricMap = {
            // Burmese
            // dependent vowels
            'ာ': 'a',
            'ါ': 'a',
            'ေ': 'e',
            'ဲ': 'e',
            'ိ': 'i',
            'ီ': 'i',
            'ို': 'o',
            'ု': 'u',
            'ူ': 'u',
            'ေါင်': 'aung',
            'ော': 'aw',
            'ော်': 'aw',
            'ေါ': 'aw',
            'ေါ်': 'aw',
            '်': '်', // this is special case but the character will be converted to latin in the code
            'က်': 'et',
            'ိုက်': 'aik',
            'ောက်': 'auk',
            'င်': 'in',
            'ိုင်': 'aing',
            'ောင်': 'aung',
            'စ်': 'it',
            'ည်': 'i',
            'တ်': 'at',
            'ိတ်': 'eik',
            'ုတ်': 'ok',
            'ွတ်': 'ut',
            'ေတ်': 'it',
            'ဒ်': 'd',
            'ိုဒ်': 'ok',
            'ုဒ်': 'ait',
            'န်': 'an',
            'ာန်': 'an',
            'ိန်': 'ein',
            'ုန်': 'on',
            'ွန်': 'un',
            'ပ်': 'at',
            'ိပ်': 'eik',
            'ုပ်': 'ok',
            'ွပ်': 'ut',
            'န်ုပ်': 'nub',
            'မ်': 'an',
            'ိမ်': 'ein',
            'ုမ်': 'on',
            'ွမ်': 'un',
            'ယ်': 'e',
            'ိုလ်': 'ol',
            'ဉ်': 'in',
            'ံ': 'an',
            'ိံ': 'ein',
            'ုံ': 'on',

            // Dhivehi
            'ައް': 'ah',
            'ަށް': 'ah',
        };

        /**
         * langCharMap language specific characters translations
         * @type   {Object}
         */
        var langCharMap = {

            'en': {}, // default language

            'az': { // Azerbaijani
                'ç': 'c',
                'ə': 'e',
                'ğ': 'g',
                'ı': 'i',
                'ö': 'o',
                'ş': 's',
                'ü': 'u',
                'Ç': 'C',
                'Ə': 'E',
                'Ğ': 'G',
                'İ': 'I',
                'Ö': 'O',
                'Ş': 'S',
                'Ü': 'U'
            },

            'cs': { // Czech
                'č': 'c',
                'ď': 'd',
                'ě': 'e',
                'ň': 'n',
                'ř': 'r',
                'š': 's',
                'ť': 't',
                'ů': 'u',
                'ž': 'z',
                'Č': 'C',
                'Ď': 'D',
                'Ě': 'E',
                'Ň': 'N',
                'Ř': 'R',
                'Š': 'S',
                'Ť': 'T',
                'Ů': 'U',
                'Ž': 'Z'
            },

            'fi': { // Finnish
                // 'å': 'a', duplicate see charMap/latin
                // 'Å': 'A', duplicate see charMap/latin
                'ä': 'a', // ok
                'Ä': 'A', // ok
                'ö': 'o', // ok
                'Ö': 'O' // ok
            },

            'hu': { // Hungarian
                'ä': 'a', // ok
                'Ä': 'A', // ok
                // 'á': 'a', duplicate see charMap/latin
                // 'Á': 'A', duplicate see charMap/latin
                'ö': 'o', // ok
                'Ö': 'O', // ok
                // 'ő': 'o', duplicate see charMap/latin
                // 'Ő': 'O', duplicate see charMap/latin
                'ü': 'u',
                'Ü': 'U',
                'ű': 'u',
                'Ű': 'U'
            },

            'lt': { // Lithuanian
                'ą': 'a',
                'č': 'c',
                'ę': 'e',
                'ė': 'e',
                'į': 'i',
                'š': 's',
                'ų': 'u',
                'ū': 'u',
                'ž': 'z',
                'Ą': 'A',
                'Č': 'C',
                'Ę': 'E',
                'Ė': 'E',
                'Į': 'I',
                'Š': 'S',
                'Ų': 'U',
                'Ū': 'U'
            },

            'lv': { // Latvian
                'ā': 'a',
                'č': 'c',
                'ē': 'e',
                'ģ': 'g',
                'ī': 'i',
                'ķ': 'k',
                'ļ': 'l',
                'ņ': 'n',
                'š': 's',
                'ū': 'u',
                'ž': 'z',
                'Ā': 'A',
                'Č': 'C',
                'Ē': 'E',
                'Ģ': 'G',
                'Ī': 'i',
                'Ķ': 'k',
                'Ļ': 'L',
                'Ņ': 'N',
                'Š': 'S',
                'Ū': 'u',
                'Ž': 'Z'
            },

            'pl': { // Polish
                'ą': 'a',
                'ć': 'c',
                'ę': 'e',
                'ł': 'l',
                'ń': 'n',
                'ó': 'o',
                'ś': 's',
                'ź': 'z',
                'ż': 'z',
                'Ą': 'A',
                'Ć': 'C',
                'Ę': 'e',
                'Ł': 'L',
                'Ń': 'N',
                'Ó': 'O',
                'Ś': 'S',
                'Ź': 'Z',
                'Ż': 'Z'
            },

            'sk': { // Slovak
                'ä': 'a',
                'Ä': 'A'
            },

            'sr': { // Serbian
                'љ': 'lj',
                'њ': 'nj',
                'Љ': 'Lj',
                'Њ': 'Nj',
                'đ': 'dj',
                'Đ': 'Dj'
            },

            'tr': { // Turkish
                'Ü': 'U',
                'Ö': 'O',
                'ü': 'u',
                'ö': 'o'
            }
        };

        /**
         * symbolMap language specific symbol translations
         * translations must be transliterated already
         * @type   {Object}
         */
        var symbolMap = {

            'ar': {
                '∆': 'delta',
                '∞': 'la-nihaya',
                '♥': 'hob',
                '&': 'wa',
                '|': 'aw',
                '<': 'aqal-men',
                '>': 'akbar-men',
                '∑': 'majmou',
                '¤': 'omla'
            },

            'az': {},

            'ca': {
                '∆': 'delta',
                '∞': 'infinit',
                '♥': 'amor',
                '&': 'i',
                '|': 'o',
                '<': 'menys que',
                '>': 'mes que',
                '∑': 'suma dels',
                '¤': 'moneda'
            },

            'cs': {
                '∆': 'delta',
                '∞': 'nekonecno',
                '♥': 'laska',
                '&': 'a',
                '|': 'nebo',
                '<': 'mensi nez',
                '>': 'vetsi nez',
                '∑': 'soucet',
                '¤': 'mena'
            },

            'de': {
                '∆': 'delta',
                '∞': 'unendlich',
                '♥': 'Liebe',
                '&': 'und',
                '|': 'oder',
                '<': 'kleiner als',
                '>': 'groesser als',
                '∑': 'Summe von',
                '¤': 'Waehrung'
            },

            'dv': {
                '∆': 'delta',
                '∞': 'kolunulaa',
                '♥': 'loabi',
                '&': 'aai',
                '|': 'noonee',
                '<': 'ah vure kuda',
                '>': 'ah vure bodu',
                '∑': 'jumula',
                '¤': 'faisaa'
            },

            'en': {
                '∆': 'delta',
                '∞': 'infinity',
                '♥': 'love',
                '&': 'and',
                '|': 'or',
                '<': 'less than',
                '>': 'greater than',
                '∑': 'sum',
                '¤': 'currency'
            },

            'es': {
                '∆': 'delta',
                '∞': 'infinito',
                '♥': 'amor',
                '&': 'y',
                '|': 'u',
                '<': 'menos que',
                '>': 'mas que',
                '∑': 'suma de los',
                '¤': 'moneda'
            },

            'fa': {
                '∆': 'delta',
                '∞': 'bi-nahayat',
                '♥': 'eshgh',
                '&': 'va',
                '|': 'ya',
                '<': 'kamtar-az',
                '>': 'bishtar-az',
                '∑': 'majmooe',
                '¤': 'vahed'
            },

            'fi': {
                '∆': 'delta',
                '∞': 'aarettomyys',
                '♥': 'rakkaus',
                '&': 'ja',
                '|': 'tai',
                '<': 'pienempi kuin',
                '>': 'suurempi kuin',
                '∑': 'summa',
                '¤': 'valuutta'
            },

            'fr': {
                '∆': 'delta',
                '∞': 'infiniment',
                '♥': 'Amour',
                '&': 'et',
                '|': 'ou',
                '<': 'moins que',
                '>': 'superieure a',
                '∑': 'somme des',
                '¤': 'monnaie'
            },

            'gr': {},

            'hu': {
                '∆': 'delta',
                '∞': 'vegtelen',
                '♥': 'szerelem',
                '&': 'es',
                '|': 'vagy',
                '<': 'kisebb mint',
                '>': 'nagyobb mint',
                '∑': 'szumma',
                '¤': 'penznem'
            },

            'it': {
                '∆': 'delta',
                '∞': 'infinito',
                '♥': 'amore',
                '&': 'e',
                '|': 'o',
                '<': 'minore di',
                '>': 'maggiore di',
                '∑': 'somma',
                '¤': 'moneta'
            },

            'lt': {
                '∆': 'delta',
                '∞': 'begalybe',
                '♥': 'meile',
                '&': 'ir',
                '|': 'ar',
                '<': 'maziau nei',
                '>': 'daugiau nei',
                '∑': 'suma',
                '¤': 'valiuta'
            },

            'lv': {
                '∆': 'delta',
                '∞': 'bezgaliba',
                '♥': 'milestiba',
                '&': 'un',
                '|': 'vai',
                '<': 'mazak neka',
                '>': 'lielaks neka',
                '∑': 'summa',
                '¤': 'valuta'
            },

            'my': {
                '∆': 'kwahkhyaet',
                '∞': 'asaonasme',
                '♥': 'akhyait',
                '&': 'nhin',
                '|': 'tho',
                '<': 'ngethaw',
                '>': 'kyithaw',
                '∑': 'paungld',
                '¤': 'ngwekye'
            },

            'mk': {},

            'nl': {
                '∆': 'delta',
                '∞': 'oneindig',
                '♥': 'liefde',
                '&': 'en',
                '|': 'of',
                '<': 'kleiner dan',
                '>': 'groter dan',
                '∑': 'som',
                '¤': 'valuta'
            },

            'pl': {
                '∆': 'delta',
                '∞': 'nieskonczonosc',
                '♥': 'milosc',
                '&': 'i',
                '|': 'lub',
                '<': 'mniejsze niz',
                '>': 'wieksze niz',
                '∑': 'suma',
                '¤': 'waluta'
            },

            'pt': {
                '∆': 'delta',
                '∞': 'infinito',
                '♥': 'amor',
                '&': 'e',
                '|': 'ou',
                '<': 'menor que',
                '>': 'maior que',
                '∑': 'soma',
                '¤': 'moeda'
            },

            'ro': {
                '∆': 'delta',
                '∞': 'infinit',
                '♥': 'dragoste',
                '&': 'si',
                '|': 'sau',
                '<': 'mai mic ca',
                '>': 'mai mare ca',
                '∑': 'suma',
                '¤': 'valuta'
            },

            'ru': {
                '∆': 'delta',
                '∞': 'beskonechno',
                '♥': 'lubov',
                '&': 'i',
                '|': 'ili',
                '<': 'menshe',
                '>': 'bolshe',
                '∑': 'summa',
                '¤': 'valjuta'
            },

            'sk': {
                '∆': 'delta',
                '∞': 'nekonecno',
                '♥': 'laska',
                '&': 'a',
                '|': 'alebo',
                '<': 'menej ako',
                '>': 'viac ako',
                '∑': 'sucet',
                '¤': 'mena'
            },

            'sr': {},

            'tr': {
                '∆': 'delta',
                '∞': 'sonsuzluk',
                '♥': 'ask',
                '&': 've',
                '|': 'veya',
                '<': 'kucuktur',
                '>': 'buyuktur',
                '∑': 'toplam',
                '¤': 'para birimi'
            },

            'uk': {
                '∆': 'delta',
                '∞': 'bezkinechnist',
                '♥': 'lubov',
                '&': 'i',
                '|': 'abo',
                '<': 'menshe',
                '>': 'bilshe',
                '∑': 'suma',
                '¤': 'valjuta'
            },

            'vn': {
                '∆': 'delta',
                '∞': 'vo cuc',
                '♥': 'yeu',
                '&': 'va',
                '|': 'hoac',
                '<': 'nho hon',
                '>': 'lon hon',
                '∑': 'tong',
                '¤': 'tien te'
            }
        };

        if (typeof input !== 'string') {
            return '';
        }

        if (typeof opts === 'string') {
            separator = opts;
        }

        symbol = symbolMap.en;
        langChar = langCharMap.en;

        if (typeof opts === 'object') {

            maintainCase = opts.maintainCase || false;
            customReplacements = (opts.custom && typeof opts.custom === 'object') ? opts.custom : customReplacements;
            truncate = (+opts.truncate > 1 && opts.truncate) || false;
            uricFlag = opts.uric || false;
            uricNoSlashFlag = opts.uricNoSlash || false;
            markFlag = opts.mark || false;
            convertSymbols = (opts.symbols === false || opts.lang === false) ? false : true;
            separator = opts.separator || separator;

            if (uricFlag) {
                allowedChars += uricChars.join('');
            }

            if (uricNoSlashFlag) {
                allowedChars += uricNoSlashChars.join('');
            }

            if (markFlag) {
                allowedChars += markChars.join('');
            }

            symbol = (opts.lang && symbolMap[opts.lang] && convertSymbols) ?
                symbolMap[opts.lang] : (convertSymbols ? symbolMap.en : {});

            langChar = (opts.lang && langCharMap[opts.lang]) ?
                langCharMap[opts.lang] :
                opts.lang === false || opts.lang === true ? {} : langCharMap.en;

            // if titleCase config is an Array, rewrite to object format
            if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {

                opts.titleCase.forEach(function (v) {
                    customReplacements[v + ""] = v + "";
                });

                titleCase = true;
            } else {
                titleCase = !!opts.titleCase;
            }

            // if custom config is an Array, rewrite to object format
            if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) {

                opts.custom.forEach(function (v) {
                    customReplacements[v + ""] = v + "";
                });
            }

            // custom replacements
            Object.keys(customReplacements).forEach(function (v) {

                var r;

                if (v.length > 1) {
                    r = new RegExp('\\b' + escapeChars(v) + '\\b', 'gi');
                } else {
                    r = new RegExp(escapeChars(v), 'gi');
                }

                input = input.replace(r, customReplacements[v]);
            });

            // add all custom replacement to allowed charlist
            for (ch in customReplacements) {
                allowedChars += ch;
            }

        }

        allowedChars += separator;

        // escape all necessary chars
        allowedChars = escapeChars(allowedChars);

        // trim whitespaces
        input = input.replace(/(^\s+|\s+$)/g, '');

        lastCharWasSymbol = false;
        lastCharWasDiatric = false;

        for (i = 0, l = input.length; i < l; i++) {

            ch = input[i];

            if (isReplacedCustomChar(ch, customReplacements)) {
                // don't convert a already converted char
                lastCharWasSymbol = false;
            } else if (langChar[ch]) {
                // process language specific diactrics chars conversion
                ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? ' ' + langChar[ch] : langChar[ch];

                lastCharWasSymbol = false;
            } else if (ch in charMap) {
                // the transliteration changes entirely when some special characters are added
                if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
                    diatricString += ch;
                    ch = '';
                } else if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + charMap[ch];
                    diatricString = '';
                } else {
                    // process diactrics chars
                    ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? ' ' + charMap[ch] : charMap[ch];
                }

                lastCharWasSymbol = false;
                lastCharWasDiatric = false;
            } else
            if (ch in diatricMap) {
                diatricString += ch;
                ch = '';
                // end of string, put the whole meaningful word
                if (i === l - 1) {
                    ch = diatricMap[diatricString];
                }
                lastCharWasDiatric = true;
            } else if (
                // process symbol chars
                symbol[ch] && !(uricFlag && uricChars.join('')
                    .indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.join('')
                    //.indexOf(ch) !== -1) && !(markFlag && markChars.join('')
                    .indexOf(ch) !== -1)) {

                ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
                ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : '';

                lastCharWasSymbol = true;
            } else {
                if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + ch;
                    diatricString = '';
                    lastCharWasDiatric = false;
                } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) {
                    // process latin chars
                    ch = ' ' + ch;
                }
                lastCharWasSymbol = false;
            }

            // add allowed chars
            result += ch.replace(new RegExp('[^\\w\\s' + allowedChars + '_-]', 'g'), separator);
        }

        if (titleCase) {
            result = result.replace(/(\w)(\S*)/g, function (_, i, r) {
                var j = i.toUpperCase() + (r !== null ? r : "");
                return (Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0) ? j : j.toLowerCase();
            });
        }

        // eliminate duplicate separators
        // add separator
        // trim separators from start and end
        result = result.replace(/\s+/g, separator)
            .replace(new RegExp('\\' + separator + '+', 'g'), separator)
            .replace(new RegExp('(^\\' + separator + '+|\\' + separator + '+$)', 'g'), '');

        if (truncate && result.length > truncate) {

            lucky = result.charAt(truncate) === separator;
            result = result.slice(0, truncate);

            if (!lucky) {
                result = result.slice(0, result.lastIndexOf(separator));
            }
        }

        if (!maintainCase && !titleCase) {
            result = result.toLowerCase();
        }

        return result;
    };

    /**
     * createSlug curried(opts)(input)
     * @param   {object|string} opts config object or input string
     * @return  {Function} function getSlugWithConfig()
     **/
    var createSlug = function createSlug(opts) {

        /**
         * getSlugWithConfig
         * @param   {string} input string
         * @return  {string} slug string
         */
        return function getSlugWithConfig(input) {
            return getSlug(input, opts);
        };
    };

    /**
     * escape Chars
     * @param   {string} input string
     */
    var escapeChars = function escapeChars(input) {

        return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, '\\$&');
    };

    /**
     * check if the char is an already converted char from custom list
     * @param   {char} ch character to check
     * @param   {object} customReplacements custom translation map
     */
    var isReplacedCustomChar = function (ch, customReplacements) {

        for (var c in customReplacements) {
            if (customReplacements[c] === ch) {
                return true;
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {

        // export functions for use in Node
        module.exports = getSlug;
        module.exports.createSlug = createSlug;

    } else if (true) {

        // export function for use in AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return getSlug;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    } else {

        // don't overwrite global if exists
        try {
            if (root.getSlug || root.createSlug) {
                throw 'speakingurl: globals exists /(getSlug|createSlug)/';
            } else {
                root.getSlug = getSlug;
                root.createSlug = createSlug;
            }
        } catch (e) {}

    }
})(this);

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.StackFrame = factory();
    }
}(this, function () {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
        if (functionName !== undefined) {
            this.setFunctionName(functionName);
        }
        if (args !== undefined) {
            this.setArgs(args);
        }
        if (fileName !== undefined) {
            this.setFileName(fileName);
        }
        if (lineNumber !== undefined) {
            this.setLineNumber(lineNumber);
        }
        if (columnNumber !== undefined) {
            this.setColumnNumber(columnNumber);
        }
        if (source !== undefined) {
            this.setSource(source);
        }
    }

    StackFrame.prototype = {
        getFunctionName: function () {
            return this.functionName;
        },
        setFunctionName: function (v) {
            this.functionName = String(v);
        },

        getArgs: function () {
            return this.args;
        },
        setArgs: function (v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        // NOTE: Property name may be misleading as it includes the path,
        // but it somewhat mirrors V8's JavaScriptStackTraceApi
        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
        getFileName: function () {
            return this.fileName;
        },
        setFileName: function (v) {
            this.fileName = String(v);
        },

        getLineNumber: function () {
            return this.lineNumber;
        },
        setLineNumber: function (v) {
            if (!_isNumber(v)) {
                throw new TypeError('Line Number must be a Number');
            }
            this.lineNumber = Number(v);
        },

        getColumnNumber: function () {
            return this.columnNumber;
        },
        setColumnNumber: function (v) {
            if (!_isNumber(v)) {
                throw new TypeError('Column Number must be a Number');
            }
            this.columnNumber = Number(v);
        },

        getSource: function () {
            return this.source;
        },
        setSource: function (v) {
            this.source = String(v);
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    return StackFrame;
}));


/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(185);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
  _createClass(Schema, null, [{
    key: 'forInstance',
    value: function forInstance(model) {
      return this.forClass(model.constructor);
    }
  }, {
    key: 'forClass',
    value: function forClass(klass) {
      return klass._scrivitoPrivateSchema;
    }
  }, {
    key: 'basicFieldFor',
    value: function basicFieldFor(model, attributeName) {
      var schema = Schema.forInstance(model);
      if (!schema) {
        return;
      }

      var typeInfo = schema.attributeDefinition(attributeName);
      if (!typeInfo) {
        return;
      }

      return model._scrivitoPrivateContent.field(attributeName, typeInfo);
    }
  }]);

  function Schema(definition, parent) {
    _classCallCheck(this, Schema);

    definition.attributes = definition.attributes || {};

    if (parent._scrivitoPrivateSchema) {
      definition.attributes = _underscore2.default.extend({}, parent._scrivitoPrivateSchema.attributes, definition.attributes);
    }
    this.definition = definition;
  }

  _createClass(Schema, [{
    key: 'attributeDefinition',
    value: function attributeDefinition(name) {
      var attrDefinition = this.attributes[name];
      if (attrDefinition) {
        return scrivito.typeInfo.normalize(attrDefinition);
      }
    }
  }, {
    key: 'isBinary',
    value: function isBinary() {
      var _ref = this.attributeDefinition('blob') || [],
          _ref2 = _slicedToArray(_ref, 1),
          type = _ref2[0];

      return type === 'binary';
    }
  }, {
    key: 'attributes',
    get: function get() {
      return this.definition.attributes;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.definition.name;
    }
  }, {
    key: 'validContainerClasses',
    get: function get() {
      return this.definition.validContainerClasses;
    }
  }]);

  return Schema;
}();

exports.default = Schema;

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSdk = initializeSdk;

__webpack_require__(169);

__webpack_require__(264);

__webpack_require__(268);

__webpack_require__(245);

if (!window.scrivito) {
  window.scrivito = {};
}
function initializeSdk(ui) {
  if (ui) {
    ui.setAppAdapter(scrivito.AppAdapter);
    scrivito.uiAdapter = ui.uiAdapter();
  }

  scrivito.client.init({ ui: ui, realmContext: window.Scrivito });
  document.addEventListener('DOMContentLoaded', function () {
    return scrivito.BrowserLocation.init();
  });
}

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _with_server_defaults = __webpack_require__(56);

var withServerDefaults = _interopRequireWildcard(_with_server_defaults);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

var _attribute_content_class = __webpack_require__(68);

var _attribute_content_class2 = _interopRequireDefault(_attribute_content_class);

var _valid_rails_page_classes = __webpack_require__(123);

var _use_rails_engine = __webpack_require__(35);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ALLOWED_CREATE_OBJ_ATTRIBUTES = ['_path', 'blob'];

var ObjClass = function (_AttributeContentClas) {
  _inherits(ObjClass, _AttributeContentClas);

  function ObjClass() {
    _classCallCheck(this, ObjClass);

    return _possibleConstructorReturn(this, (ObjClass.__proto__ || Object.getPrototypeOf(ObjClass)).apply(this, arguments));
  }

  _createClass(ObjClass, [{
    key: 'createObjWithDefaults',
    value: function createObjWithDefaults(attributes) {
      var unexpectedAttrs = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(attributes)].concat(ALLOWED_CREATE_OBJ_ATTRIBUTES));

      attributes._obj_class = this.name;

      if (!_underscore2.default.isEmpty(unexpectedAttrs)) {
        throw new _errors.InternalError('Unexpected attributes ' + (0, _pretty_print2.default)(unexpectedAttrs) + '.' + (' Available attributes: ' + (0, _pretty_print2.default)(ALLOWED_CREATE_OBJ_ATTRIBUTES)));
      }

      if (this._classData.usesServerCallbacks) {
        return withServerDefaults.createObjFromLegacyAttributes(attributes);
      }

      var obj = _basic_obj2.default.create(buildPublicAttributesFrom(attributes));

      return obj.finishSaving().then(function () {
        return obj;
      });
    }
  }, {
    key: 'isBinary',
    value: function isBinary() {
      var blob = this.attribute('blob');
      return !!(blob && blob.type === 'binary');
    }
  }, {
    key: 'hasChildOrder',
    value: function hasChildOrder() {
      var childOrder = this.attribute('childOrder');
      return !!(childOrder && childOrder.type === 'referencelist');
    }
  }], [{
    key: 'type',
    value: function type() {
      return 'Obj';
    }
  }, {
    key: 'validPageClasses',
    value: function validPageClasses(path) {
      if ((0, _use_rails_engine.useRailsEngine)()) {
        var objClassNames = (0, _valid_rails_page_classes.validRailsPageClasses)(path);

        return objClassNames.reduce(function (arr, objClassName) {
          var objClass = ObjClass.find(objClassName);

          if (objClass) {
            arr.push(objClass);
          }

          return arr;
        }, []);
      }

      return ObjClass.all().filter(function (objClass) {
        return !objClass.isHiddenFromEditors() && !objClass.isBinary();
      });
    }
  }]);

  return ObjClass;
}(_attribute_content_class2.default);

function buildPublicAttributesFrom(_ref) {
  var _objClass = _ref._obj_class,
      _path = _ref._path,
      blob = _ref.blob;

  var publicAttrs = { _objClass: [_objClass] };

  if (_path) {
    publicAttrs._path = [_path];
  }
  if (blob) {
    publicAttrs.blob = [blob, 'binary'];
  }

  return publicAttrs;
}

exports.default = ObjClass;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIE;
function isIE() {
  var userAgent = window.navigator.userAgent;
  return userAgent.indexOf('MSIE') >= 0 || userAgent.indexOf('Trident') >= 0;
}

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _navigate_to = __webpack_require__(57);

var _navigate_to2 = _interopRequireDefault(_navigate_to);

var _provide_ui_config = __webpack_require__(126);

var _errors = __webpack_require__(1);

var _window_context = __webpack_require__(30);

var _mount_component = __webpack_require__(125);

var _resolve_url = __webpack_require__(239);

var _resolve_url2 = _interopRequireDefault(_resolve_url);

var _window_proxy = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var UI_CONFIG_KEYS = ['title', 'description', 'thumbnail'];

  /* The AppAdapter is provided to the UI by the App.
   * The UI uses it as a communication channel to the App.
   * It is the counterpart of the UiAdapter.
   *
   * Communication should use only built-in datatypes,
   * i.e. communicate using `string` and `array`, not `BasicObj`.
   */
  var AppAdapter = {
    titleForClass: function titleForClass(className) {
      return (0, _provide_ui_config.getUiConfigPropertyFor)(className, 'title');
    },
    propertiesGroupsForClass: function propertiesGroupsForClass(className) {
      return (0, _provide_ui_config.getUiConfigPropertyFor)(className, 'propertiesGroups');
    },
    titleForObj: function titleForObj(objId) {
      return invokeCallbackFromUiConfigWithObjId('titleForContent', objId);
    },
    descriptionForObj: function descriptionForObj(objId) {
      return invokeCallbackFromUiConfigWithObjId('descriptionForContent', objId);
    },
    titleForWidget: function titleForWidget(objId, widgetId) {
      var obj = (0, _window_context.getWindowContext)().Obj.getIncludingDeleted(objId);
      var widget = obj.widget(widgetId);
      return invokeCallbackFromUiConfigWithObj('titleForContent', widget);
    },
    thumbnailForObj: function thumbnailForObj(objId) {
      return invokeCallbackFromUiConfigWithObjId('thumbnailForContent', objId);
    },
    urlForLink: function urlForLink() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          objId = _ref.objId,
          query = _ref.query,
          fragment = _ref.fragment;

      var obj = (0, _window_context.getWindowContext)().Obj.getIncludingDeleted(objId);
      return scrivito.urlFor(obj, { query: query, fragment: fragment });
    },
    getClasses: function getClasses() {
      var realm = (0, _window_context.getWindowContext)();
      var classDatas = [];

      _underscore2.default.each(realm.allObjClasses(), function (modelClass, name) {
        return classDatas.push(buildClassData('Obj', name, modelClass));
      });

      _underscore2.default.each(realm.allWidgetClasses(), function (modelClass, name) {
        return classDatas.push(buildClassData('Widget', name, modelClass));
      });

      return classDatas;
    },
    navigateTo: function navigateTo(objId) {
      (0, _navigate_to2.default)(function () {
        return (0, _window_context.getWindowContext)().Obj.get(objId);
      });
    },


    mountComponent: _mount_component.mountComponent,

    resolveUrl: function resolveUrl(url) {
      return (0, _resolve_url2.default)(url).then(function (resolvedUrl) {
        if (resolvedUrl && resolvedUrl.obj) {
          return createRecognizedUrl(resolvedUrl);
        }

        return null;
      });
    },
    getDocumentHeight: function getDocumentHeight() {
      return (0, _window_proxy.getDocument)().querySelector('html').getBoundingClientRect().height;
    }
  };

  function buildClassData(type, name, modelClass) {
    var schema = _schema2.default.forClass(modelClass);
    var classData = {
      name: name,
      type: type,
      attributes: buildAttributeData(schema, _underscore2.default.keys(schema.attributes)),
      validContainerClasses: schema.validContainerClasses
    };

    addValuesFromUiConfig(classData, name);
    addAttributeValuesFromUiConfig(classData, name);

    return classData;
  }

  function buildAttributeData(schema, names) {
    return names.map(function (name) {
      var _schema$attributeDefi = schema.attributeDefinition(name),
          _schema$attributeDefi2 = _slicedToArray(_schema$attributeDefi, 2),
          type = _schema$attributeDefi2[0],
          options = _schema$attributeDefi2[1];

      var attributeDefinition = { name: name, type: type };

      if (options) {
        if (options.only) {
          attributeDefinition.only = options.only;
        }
        if (options.validValues) {
          attributeDefinition.validValues = options.validValues;
        }
      }

      return attributeDefinition;
    });
  }

  function addValuesFromUiConfig(classData, className) {
    UI_CONFIG_KEYS.forEach(function (uiConfigKey) {
      var uiConfigValue = (0, _provide_ui_config.getUiConfigPropertyFor)(className, uiConfigKey);

      if (uiConfigValue) {
        classData[uiConfigKey] = uiConfigValue;
      }
    });
  }

  function addAttributeValuesFromUiConfig(classData, className) {
    var attributes = (0, _provide_ui_config.getUiConfigPropertyFor)(className, 'attributesConfig');

    if (!attributes) {
      return;
    }

    Object.keys(attributes).forEach(function (name) {
      var attributeDefinition = _underscore2.default.findWhere(classData.attributes, { name: name });

      if (attributeDefinition) {
        var _attributes$name = attributes[name],
            title = _attributes$name.title,
            description = _attributes$name.description;

        _underscore2.default.extend(attributeDefinition, { title: title, description: description });
      }
    });
  }

  function invokeCallbackFromUiConfigWithObjId(callbackName, objId) {
    var obj = (0, _window_context.getWindowContext)().Obj.getIncludingDeleted(objId);
    return invokeCallbackFromUiConfigWithObj(callbackName, obj);
  }

  function invokeCallbackFromUiConfigWithObj(callbackName, obj) {
    var callback = (0, _provide_ui_config.getUiConfigPropertyFor)(obj.objClass(), callbackName);
    if (callback) {
      assertIsFunction(callback, callbackName);
      return callback(obj);
    }
  }

  function assertIsFunction(callback, name) {
    if (typeof callback !== 'function') {
      throw new _errors.ArgumentError(name + ' in the Scrivito.provideEditingConfig definition must be a function');
    }
  }

  function createRecognizedUrl(resolvedUrl) {
    var hash = {
      obj_id: resolvedUrl.obj.id()
    };

    if (resolvedUrl.url.fragment()) {
      hash.fragment = resolvedUrl.url.fragment();
    }

    if (resolvedUrl.url.search()) {
      hash.query = resolvedUrl.url.search();
    }

    return hash;
  }

  scrivito.AppAdapter = AppAdapter;
})();

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _underscore = __webpack_require__(0);

var _current_page = __webpack_require__(40);

var _window_proxy = __webpack_require__(31);

var window = _interopRequireWildcard(_window_proxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function pushWith(_ref) {
    var obj = _ref.obj,
        queryParameters = _ref.queryParameters,
        hash = _ref.hash;

    var state = {
      scrivitoObjId: obj.id(),
      scrivitoQueryParameters: queryParameters,
      scrivitoHash: hash
    };
    var url = scrivito.Routing.generate({ obj: obj, queryParameters: queryParameters, hash: hash });
    var history = window.history();

    if (history.state && history.state.scrivitoObjId === obj.id() && (0, _underscore.isEqual)(history.state.scrivitoQueryParameters, queryParameters) && history.state.scrivitoHash === hash) {
      // noop;
      return;
    }

    history.pushState(state, '', url);
  }

  function replaceWith(_ref2) {
    var obj = _ref2.obj,
        queryParameters = _ref2.queryParameters,
        hash = _ref2.hash;

    var state = {
      scrivitoObjId: obj.id(),
      scrivitoQueryParameters: queryParameters,
      scrivitoHash: hash
    };
    var url = scrivito.Routing.generate({ obj: obj, queryParameters: queryParameters, hash: hash });

    window.history().replaceState(state, '', url);
  }

  function handlePopEvents() {
    window.setOnpopstate(onpopstate);
  }

  function recognizeCurrentLocation() {
    var location = window.location().toString();
    (0, _current_page.replaceCurrentPage)(function () {
      var _scrivito$Routing$rec = scrivito.Routing.recognize(location),
          obj = _scrivito$Routing$rec.obj,
          queryParameters = _scrivito$Routing$rec.queryParameters,
          hash = _scrivito$Routing$rec.hash;

      if (obj) {
        return { obj: obj, queryParameters: queryParameters, hash: hash };
      }

      return { queryParameters: queryParameters, hash: hash };
    });
  }

  function init() {
    recognizeCurrentLocation();
    handlePopEvents();
  }

  function onpopstate(event) {
    var objId = void 0;
    var hash = void 0;
    var queryParameters = void 0;

    if (event.state) {
      objId = event.state.scrivitoObjId;
      hash = event.state.scrivitoHash;
      queryParameters = event.state.scrivitoQueryParameters;
    }

    if (objId) {
      (0, _current_page.replaceCurrentPage)(function () {
        return { obj: _basic_obj2.default.get(objId), queryParameters: queryParameters, hash: hash };
      });
    } else {
      recognizeCurrentLocation();
    }
  }

  // Do not use the function name "window",
  // otherwise you will no longer be able to access the global window

  scrivito.BrowserLocation = {};
  scrivito.BrowserLocation.init = init;
  scrivito.BrowserLocation.pushWith = pushWith;
  scrivito.BrowserLocation.replaceWith = replaceWith;
})();

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function changeLocation(newLocation) {
    if (scrivito.uiAdapter) {
      // change the location of the parent, to avoid CSP errors.
      scrivito.uiAdapter.navigateToExternalUrl(newLocation);
    } else {
      scrivito.setWindowLocation(newLocation);
    }
  }

  function setWindowLocation(newLocation) {
    window.location = newLocation;
  }

  function openLocation(newLocation, target) {
    window.open(newLocation, target);
  }

  // For test purpose only.
  scrivito.setWindowLocation = setWindowLocation;
  scrivito.changeLocation = changeLocation;
  scrivito.openLocation = openLocation;
})();

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var registry = [];

  function register(editor) {
    registry.push(editor);
  }

  function editorClassFor(attrDef) {
    return _underscore2.default.find(registry, function (editor) {
      return editor.canEdit(attrDef);
    });
  }

  function clear() {
    registry = [];
  }

  scrivito.editorRegistry = { editorClassFor: editorClassFor, clear: clear };
  scrivito.registerEditor = register;
})();

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInPlaceEditingActive;

var _mount_component = __webpack_require__(125);

function isInPlaceEditingActive() {
  if (scrivito.currentWorkspaceId() === 'published') {
    return false;
  }

  if ((0, _mount_component.isComponentMounted)()) {
    return true;
  }

  if (scrivito.uiAdapter) {
    return scrivito.uiAdapter.isEditingMode();
  }

  return false;
}

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urijs = __webpack_require__(38);

var _urijs2 = _interopRequireDefault(_urijs);

var _underscore = __webpack_require__(0);

var _window_proxy = __webpack_require__(31);

var window = _interopRequireWildcard(_window_proxy);

var _load = __webpack_require__(12);

var _load2 = _interopRequireDefault(_load);

var _errors = __webpack_require__(1);

var _configure = __webpack_require__(124);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveUrl(url) {
  var parsedCurrentUrl = (0, _urijs2.default)(window.location());
  var parsedUrlToResolve = (0, _urijs2.default)(url);

  if (!(0, _configure.isConfigured)()) {
    return scrivito.Promise.resolve(null);
  }

  if (parsedCurrentUrl.origin() === parsedUrlToResolve.origin() || parsedUrlToResolve.is('relative')) {
    return (0, _load2.default)(function () {
      return scrivito.Routing.recognize(url);
    }).then(function (target) {
      if ((0, _underscore.include)(['/', ''], target.path)) {
        return null;
      }

      return { obj: target.obj, url: parsedUrlToResolve };
    }).catch(function (error) {
      if (error instanceof _errors.ResourceNotFoundError) {
        return null;
      }

      throw error;
    });
  }

  return scrivito.Promise.resolve(null);
}

exports.default = resolveUrl;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _valid_classes_for_widgetlist_field = __webpack_require__(100);

var _valid_classes_for_widgetlist_field2 = _interopRequireDefault(_valid_classes_for_widgetlist_field);

var _with_server_defaults = __webpack_require__(56);

var withServerDefaults = _interopRequireWildcard(_with_server_defaults);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _attribute_content_class = __webpack_require__(68);

var _attribute_content_class2 = _interopRequireDefault(_attribute_content_class);

var _content_class_registry = __webpack_require__(67);

var _content_class_registry2 = _interopRequireDefault(_content_class_registry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetClass = function (_AttributeContentClas) {
  _inherits(WidgetClass, _AttributeContentClas);

  _createClass(WidgetClass, null, [{
    key: 'type',
    value: function type() {
      return 'Widget';
    }
  }, {
    key: 'validClassNamesForField',
    value: function validClassNamesForField(field) {
      return this.validClassesForField(field).map(function (widgetClass) {
        return widgetClass.name;
      });
    }
  }, {
    key: 'validClassesForField',
    value: function validClassesForField(field) {
      var container = field.container();
      var containerClass = findContentClassForBasicModel(container);
      if (containerClass && containerClass.usesServerCallbacks()) {
        var names = (0, _valid_classes_for_widgetlist_field2.default)(field);
        return names.reduce(function (acc, name) {
          var widgetClass = _content_class_registry2.default.findByType('Widget', name);

          if (widgetClass) {
            acc.push(widgetClass);
          }
          return acc;
        }, []);
      }
      var attribute = containerClass && containerClass.attribute(field.name());
      var only = attribute && attribute.only();
      var widgetClasses = only || _content_class_registry2.default.allForType('Widget');

      return widgetClasses.filter(validWidgetClassForObjClass(container.objClass()));
    }
  }]);

  function WidgetClass(classData) {
    _classCallCheck(this, WidgetClass);

    var _this = _possibleConstructorReturn(this, (WidgetClass.__proto__ || Object.getPrototypeOf(WidgetClass)).call(this, classData));

    _this.embeds = classData.embeds;
    _this._embeddingAttribute = classData.embeddingAttribute;
    return _this;
  }

  _createClass(WidgetClass, [{
    key: 'newWidgetWithDefaults',
    value: function newWidgetWithDefaults() {
      if (this._classData.usesServerCallbacks) {
        return withServerDefaults.newWidget(this.name);
      }

      return scrivito.Promise.resolve(new _basic_widget2.default({ _objClass: [this.name] }));
    }

    // public

  }, {
    key: 'embeddingAttribute',
    value: function embeddingAttribute() {
      if (this.embeds) {
        return this.attribute(this._embeddingAttribute);
      }
    }
  }, {
    key: 'isValidContainerClass',
    value: function isValidContainerClass(modelClassName) {
      if (!this._classData.validContainerClasses) {
        return true;
      }

      return _underscore2.default.contains(this._classData.validContainerClasses, modelClassName);
    }
  }, {
    key: 'hasJsDetailsView',
    value: function hasJsDetailsView() {
      return this.localizedAttributes().length > 0;
    }
  }]);

  return WidgetClass;
}(_attribute_content_class2.default);

function validWidgetClassForObjClass(objClassName) {
  return function (widgetClass) {
    return !widgetClass.isHiddenFromEditors() && widgetClass.isValidContainerClass(objClassName);
  };
}

function findContentClassForBasicModel(basicModel) {
  var type = basicModel instanceof _basic_widget2.default ? 'Widget' : 'Obj';
  return _content_class_registry2.default.findByType(type, basicModel.objClass());
}

exports.default = WidgetClass;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _urijs = __webpack_require__(38);

var _urijs2 = _interopRequireDefault(_urijs);

var _errors = __webpack_require__(1);

var _window_proxy = __webpack_require__(31);

var window = _interopRequireWildcard(_window_proxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var hashPrefix = '!';
  var isPathRoutingMode = void 0;
  var basePath = void 0;
  var isInitialized = false;

  function init(_ref) {
    var routingMethod = _ref.routingMethod,
        routingBasePath = _ref.routingBasePath;

    isInitialized = true;
    isPathRoutingMode = routingMethod === 'path';
    basePath = routingBasePath || '';
  }

  // For test purpose only.
  function reset() {
    isInitialized = false;
    isPathRoutingMode = undefined;
    basePath = undefined;
  }

  function assertIsInitialized(methodName) {
    if (!isInitialized) {
      throw new _errors.InternalError(methodName + ' can\'t be called before init.');
    }
  }

  function generate(_ref2) {
    var obj = _ref2.obj,
        queryParameters = _ref2.queryParameters,
        hash = _ref2.hash;

    assertIsInitialized('generate');

    var path = scrivito.RoutingPath.generate(obj);

    if (isPathRoutingMode) {
      var origin = (0, _urijs2.default)(window.location()).origin();
      var normalizedPath = ('/' + basePath + '/' + path).replace(/\/+/g, '/');
      var uri = (0, _urijs2.default)(origin).pathname(normalizedPath);

      if (queryParameters) {
        uri.query(queryParameters);
      }

      if (hash) {
        uri.hash(hash);
      }

      return uri.toString();
    }

    return '#' + hashPrefix + path;
  }

  function recognize(url) {
    assertIsInitialized('recognize');

    var path = recognizePath(url);
    var obj = extractObjFromPath(path);
    var queryParameters = extractQueryParameters(url);
    var hash = recognizeHash(url);

    return { path: path, obj: obj, queryParameters: queryParameters, hash: hash };
  }

  function recognizePath(url) {
    if (isPathRoutingMode) {
      return extractPath(url);
    }

    return extractPathFromHash(url);
  }

  function recognizeHash(url) {
    if (isPathRoutingMode) {
      return extractHashFromUrl(url);
    }

    return null;
  }

  function extractObjFromPath(path) {
    if (path !== null) {
      return scrivito.RoutingPath.recognize(path);
    }

    return null;
  }

  function extractPath(url) {
    var path = (0, _urijs2.default)(url).path();
    if (path.substring(0, basePath.length) !== basePath) {
      return null;
    }
    return path.substring(basePath.length);
  }

  function extractPathFromHash(url) {
    var parsedUrl = (0, _urijs2.default)(url);
    var parsedCurrentUrl = (0, _urijs2.default)(window.location());
    var fragment = parsedUrl.fragment();

    if (parsedUrl.filename() !== parsedCurrentUrl.filename()) {
      return null;
    }

    if (fragment === '') {
      return '';
    }

    if (fragment.substring(0, hashPrefix.length) === hashPrefix) {
      return fragment.substring(hashPrefix.length);
    }

    return null;
  }

  function extractHashFromUrl(url) {
    var hash = (0, _urijs2.default)(url).hash();
    if (hash === '') {
      return null;
    }

    return hash;
  }

  function extractQueryParameters(url) {
    var parsedUrl = (0, _urijs2.default)(url);
    return parsedUrl.query(true);
  }

  scrivito.Routing = {};
  scrivito.Routing.init = init;
  scrivito.Routing.reset = reset;
  scrivito.Routing.generate = generate;
  scrivito.Routing.recognize = recognize;
})();

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_registry = __webpack_require__(48);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var homepageCallback = void 0;

  var RoutingPath = {
    init: function init(initHomepageCallback) {
      homepageCallback = initHomepageCallback;
    },
    generate: function generate(obj) {
      assertObjIsBasicObj(obj);
      if (isHomepage(obj)) {
        return '/';
      }
      if (obj.permalink()) {
        return '/' + obj.permalink();
      }
      var slug = generateSlug(obj);
      if (slug) {
        return '/' + slug + '-' + obj.id();
      }
      return '/' + obj.id();
    },
    recognize: function recognize(path) {
      assertPathIsString(path);

      if (_underscore2.default.include(['/', ''], path)) {
        return scrivito.unwrapAppClassValues(homepageCallback());
      }

      // remove leading /
      var pathWithoutLeadingSlash = removeLeadingChars(path, '/');

      try {
        return _basic_obj2.default.getByPermalink(pathWithoutLeadingSlash);
      } catch (error) {
        if (!(error instanceof _errors.ResourceNotFoundError)) {
          throw error;
        }
      }

      return _basic_obj2.default.get(extractObjIdFromPath(pathWithoutLeadingSlash));
    },


    // For test purpose only.
    get homepageCallback() {
      return homepageCallback;
    },

    // For test purpose only.
    resetHomepageCallback: function resetHomepageCallback() {
      homepageCallback = undefined;
    }
  };

  function removeLeadingChars(input, leadingChars) {
    if (input.substring(0, leadingChars.length) === leadingChars) {
      return input.substring(leadingChars.length);
    }

    return input;
  }

  function isHomepage(obj) {
    if (!homepageCallback) {
      return false;
    }
    var homepage = scrivito.loadableWithDefault(null, homepageCallback);
    if (!homepage) {
      return false;
    }
    return homepage.id() === obj.id();
  }

  function assertObjIsBasicObj(obj) {
    if (!(obj instanceof _basic_obj2.default)) {
      throw new _errors.ArgumentError('Parameter obj needs to be a BasicObj.');
    }
  }

  function assertPathIsString(input) {
    if (!_underscore2.default.isString(input)) {
      throw new _errors.ArgumentError('Parameter path needs to be a String.');
    }
  }

  function generateSlug(basicObj) {
    var registry = (0, _window_registry.getWindowRegistry)();
    var appObj = scrivito.wrapInAppClass(registry, basicObj);

    return appObj.slug();
  }

  function extractObjIdFromPath(input) {
    var last = _underscore2.default.last(input.split('-'));
    return _underscore2.default.last(last.split('/'));
  }

  scrivito.RoutingPath = RoutingPath;
})();

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollWindowToTop;
function scrollWindowToTop() {
  window.scrollTo(0, 0);
}

// For test purpose only.

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

var _window_context = __webpack_require__(30);

var _errors = __webpack_require__(1);

var _binary = __webpack_require__(25);

var _binary2 = _interopRequireDefault(_binary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function basicUrlFor(target) {
    assertValidTarget(target);

    if (target instanceof _basic_link2.default) {
      return urlForLink(target);
    }
    if (target instanceof _binary2.default) {
      return urlForBinary(target);
    }
    if (isBinaryObj(target)) {
      return urlForBinaryObj(target);
    }

    return scrivito.Routing.generate({ obj: target });
  }

  function urlFor(target) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        query = _ref.query,
        fragment = _ref.fragment;

    var basicTarget = scrivito.unwrapAppClassValues(target);

    var queryString = query ? '?' + query : '';
    var fragmentString = fragment ? '#' + fragment : '';

    return basicUrlFor(basicTarget).concat(queryString).concat(fragmentString);
  }

  function assertValidTarget(target) {
    if (!target) {
      throw new _errors.ArgumentError('Missing target.');
    }
    if (target instanceof _basic_link2.default) {
      return;
    }
    if (target instanceof _basic_obj2.default) {
      return;
    }
    if (target instanceof _binary2.default) {
      return;
    }

    throw new _errors.ArgumentError('Target is invalid. Valid targets are instances of Obj or Link.');
  }

  function urlForBinary(binary) {
    return binary.url();
  }

  function urlForBinaryObj(obj) {
    var blob = obj.get('blob', ['binary']);

    if (blob) {
      return urlForBinary(blob);
    }

    return '#__empty_blob';
  }

  function urlForLink(link) {
    if (link.isExternal()) {
      return link.url();
    }

    return basicUrlFor(link.obj());
  }

  function context() {
    return (0, _window_context.getWindowContext)();
  }

  function isBinaryObj(obj) {
    var klass = context().getClass(obj.objClass());
    if (!klass) {
      return false;
    }

    var schema = _schema2.default.forClass(klass);
    return schema.isBinary();
  }

  scrivito.basicUrlFor = basicUrlFor;
  scrivito.urlFor = urlFor;
})();

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// UpdateBuffer wraps an underlying state and buffers updates to that state,
// throtteling how frequently the underlying state is updated.
//
// The buffer is flushed at regular intervals,
// propagating the accumulated updates to the underlying state.
//
// UpdateBuffer can wrap anything with a getter and a setter.
// It exposes a get and set method to be used in place of the original getter and setter.
// It ensures that the underlying setter is called at most once every `flushRate` milliseconds.

// special "null object"
// since the built-in values `null`, `false` and `undefined` are valid values
var NO_VALUE = {};

var UpdateBuffer = function () {
  function UpdateBuffer(_ref) {
    var get = _ref.get,
        set = _ref.set,
        flushRate = _ref.flushRate;

    _classCallCheck(this, UpdateBuffer);

    this._getUnderlying = get;
    this._setUnderlying = set;
    this._flushRate = flushRate;

    this._bufferedValue = NO_VALUE;
  }

  _createClass(UpdateBuffer, [{
    key: "get",
    value: function get() {
      var bufferedValue = this._bufferedValue;

      if (bufferedValue !== NO_VALUE) {
        return bufferedValue;
      }

      return this._getUnderlying();
    }
  }, {
    key: "set",
    value: function set(value) {
      this._bufferedValue = value;

      if (!this._flushRunning) {
        this._runFlush();
      }
    }
  }, {
    key: "_runFlush",
    value: function _runFlush() {
      var _this = this;

      if (this._bufferedValue === NO_VALUE) {
        this._flushRunning = false;

        return;
      }

      this._setUnderlying(this._bufferedValue);
      this._bufferedValue = NO_VALUE;

      setTimeout(function () {
        return _this._runFlush();
      }, this._flushRate);
      this._flushRunning = true;
    }
  }]);

  return UpdateBuffer;
}();

exports.default = UpdateBuffer;

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _current_page = __webpack_require__(40);

var _is_in_place_editing_active = __webpack_require__(238);

var _is_in_place_editing_active2 = _interopRequireDefault(_is_in_place_editing_active);

var _navigate_to = __webpack_require__(57);

var _navigate_to2 = _interopRequireDefault(_navigate_to);

var _open_content_browser = __webpack_require__(265);

var _open_content_browser2 = _interopRequireDefault(_open_content_browser);

var _provide_ui_config = __webpack_require__(126);

var _configure = __webpack_require__(124);

var _load = __webpack_require__(12);

var _load2 = _interopRequireDefault(_load);

var _binary = __webpack_require__(25);

var _binary2 = _interopRequireDefault(_binary);

var _future_binary = __webpack_require__(36);

var _future_binary2 = _interopRequireDefault(_future_binary);

var _obj_facet_value = __webpack_require__(87);

var _obj_facet_value2 = _interopRequireDefault(_obj_facet_value);

var _errors = __webpack_require__(1);

var _internal_error_page = __webpack_require__(256);

var _internal_error_page2 = _interopRequireDefault(_internal_error_page);

var _not_found_error_page = __webpack_require__(257);

var _not_found_error_page2 = _interopRequireDefault(_not_found_error_page);

var _provide_component = __webpack_require__(269);

var _provide_component2 = _interopRequireDefault(_provide_component);

var _component_registry = __webpack_require__(50);

var _child_list_tag = __webpack_require__(246);

var _child_list_tag2 = _interopRequireDefault(_child_list_tag);

var _content_tag = __webpack_require__(162);

var _content_tag2 = _interopRequireDefault(_content_tag);

var _current_page2 = __webpack_require__(254);

var _current_page3 = _interopRequireDefault(_current_page2);

var _image_tag = __webpack_require__(255);

var _image_tag2 = _interopRequireDefault(_image_tag);

var _link_tag = __webpack_require__(164);

var _link_tag2 = _interopRequireDefault(_link_tag);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scrivito = {};

Scrivito.configure = _configure.configure;
Scrivito.currentPage = _current_page.currentPage;
Scrivito.currentPageParams = _current_page.currentPageParams;
Scrivito.load = _load2.default;
Scrivito.navigateTo = _navigate_to2.default;
Scrivito.isInPlaceEditingActive = _is_in_place_editing_active2.default;

Scrivito.provideComponent = _provide_component2.default;
Scrivito.registerComponent = _component_registry.registerForId;

Scrivito.provideEditingConfig = _provide_ui_config.provideEditingConfig;

Scrivito.Binary = _binary2.default;
Scrivito.FutureBinary = _future_binary2.default;
Scrivito.ObjFacetValue = _obj_facet_value2.default;

Scrivito.ArgumentError = _errors.ArgumentError;
Scrivito.ResourceNotFoundError = _errors.ResourceNotFoundError;
Scrivito.ScrivitoError = _errors.ScrivitoError;
Scrivito.TransformationSourceInvalidError = _errors.TransformationSourceInvalidError;
Scrivito.TransformationSourceTooLargeError = _errors.TransformationSourceTooLargeError;

Scrivito.ChildListTag = _child_list_tag2.default;
Scrivito.ContentTag = _content_tag2.default;
Scrivito.CurrentPage = _current_page3.default;
Scrivito.ImageTag = _image_tag2.default;
Scrivito.InternalErrorPage = _internal_error_page2.default;
Scrivito.LinkTag = _link_tag2.default;
Scrivito.NotFoundErrorPage = _not_found_error_page2.default;
Scrivito.connect = _connect2.default;

Scrivito.openContentBrowser = _open_content_browser2.default;

window.Scrivito = Scrivito;

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_editing_mode = __webpack_require__(47);

var _is_editing_mode2 = _interopRequireDefault(_is_editing_mode);

var _underscore = __webpack_require__(0);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _current_page = __webpack_require__(40);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _child_item = __webpack_require__(247);

var _child_item2 = _interopRequireDefault(_child_item);

var _menu_marker = __webpack_require__(248);

var _menu_marker2 = _interopRequireDefault(_menu_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChildListTag = function (_React$Component) {
  _inherits(ChildListTag, _React$Component);

  function ChildListTag(props) {
    _classCallCheck(this, ChildListTag);

    var _this = _possibleConstructorReturn(this, (ChildListTag.__proto__ || Object.getPrototypeOf(ChildListTag)).call(this, props));

    _this.state = { hasFocus: false };

    _this._onMouseOver = _this._onMouseOver.bind(_this);
    _this._onMouseOut = _this._onMouseOut.bind(_this);
    return _this;
  }

  _createClass(ChildListTag, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var parent = this.props.parent || (0, _current_page.currentPage)();

      if (!parent) {
        return null;
      }

      parent = parent._scrivitoPrivateContent;

      var props = (0, _underscore.omit)(this.props, 'parent', 'tag', 'renderChild');

      var menuMarker = void 0;

      if ((0, _is_editing_mode2.default)()) {
        props.onMouseOver = this._onMouseOver;
        props.onMouseOut = this._onMouseOut;

        props['data-scrivito-private-child-list-path'] = true;

        if (this.state.hasFocus) {
          props.className = 'scrivito_active scrivito_entered ' + props.className;
        }

        menuMarker = _react2.default.createElement(_menu_marker2.default, {
          key: 'menuMarker',
          parent: parent
        });
      }

      return _react2.default.createElement(this.props.tag, props, [menuMarker].concat(_toConsumableArray(parent.orderedChildren().map(function (child) {
        return _react2.default.createElement(_child_item2.default, {
          key: child.id(),
          child: child,
          renderChild: _this2.props.renderChild
        });
      }))));
    }
  }, {
    key: '_onMouseOver',
    value: function _onMouseOver(e) {
      e.stopPropagation();
      this.setState({ hasFocus: true });
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut(e) {
      e.stopPropagation();
      this.setState({ hasFocus: false });
    }
  }]);

  return ChildListTag;
}(_react2.default.Component);

ChildListTag.displayName = 'Scrivito.ChildListTag';

ChildListTag.defaultProps = { tag: 'ul' };

exports.default = (0, _connect2.default)(ChildListTag);

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _window_context = __webpack_require__(30);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _link_tag = __webpack_require__(164);

var _link_tag2 = _interopRequireDefault(_link_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ChildItem(_ref) {
  var basicObj = _ref.child,
      renderChild = _ref.renderChild;

  var appObj = (0, _window_context.getWindowContext)().appModelAccessor.wrapInAppClass(basicObj);

  if (renderChild) {
    return renderChild(appObj);
  }

  return _react2.default.createElement(
    'li',
    null,
    _react2.default.createElement(
      _link_tag2.default,
      { to: appObj },
      basicObj.get('title', 'string')
    )
  );
}

ChildItem.displayName = 'Scrivito.ChildListTag.ChildItem';

exports.default = (0, _connect2.default)(ChildItem);

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuMarker = function (_React$Component) {
  _inherits(MenuMarker, _React$Component);

  function MenuMarker(props) {
    _classCallCheck(this, MenuMarker);

    var _this = _possibleConstructorReturn(this, (MenuMarker.__proto__ || Object.getPrototypeOf(MenuMarker)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(MenuMarker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'span',
        {
          ref: function ref(menuMarker) {
            return _this2._menuMarker = menuMarker;
          },
          className: 'scrivito_editing_marker',
          onClick: this._onClick
        },
        _react2.default.createElement('i', { className: 'scrivito_icon' }),
        _react2.default.createElement(
          'span',
          { className: 'scrivito_editing_marker_title' },
          this.props.parent.objClass()
        )
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this._menuMarker) {
        scrivito.uiAdapter.showChildListMenu((0, _reactDom.findDOMNode)(this._menuMarker), this.props.parent.id());
      }
    }
  }]);

  return MenuMarker;
}(_react2.default.Component);

MenuMarker.displayName = 'Scrivito.ChildListTag.MenuMarker';

exports.default = (0, _connect2.default)(MenuMarker);

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editor_event = __webpack_require__(259);

var _editor_event2 = _interopRequireDefault(_editor_event);

var _underscore = __webpack_require__(0);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _edit_controller = __webpack_require__(258);

var _edit_controller2 = _interopRequireDefault(_edit_controller);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _attribute_value = __webpack_require__(163);

var _attribute_value2 = _interopRequireDefault(_attribute_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.state = { domMode: 'None' };
    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(Editor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var field = this.props.field;
      var type = field.type();
      var options = field.typeOptions();
      var editorClass = scrivito.editorRegistry.editorClassFor({ type: type, tag: this.props.tag });

      if (editorClass) {
        var attributeInfo = (0, _underscore.extend)({ type: type }, (0, _underscore.pick)(options, 'validClasses', 'validValues'));
        var controller = new _edit_controller2.default(field, function (domMode) {
          return _this2._setDomMode(domMode);
        });

        this._editor = new editorClass({ attributeInfo: attributeInfo, controller: controller });
        this._editorWillBeActivated();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.domMode === 'Replace') {
        this._editorDomWasMounted();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_prevProps, prevState) {
      var prevDomMode = prevState.domMode;
      var curDomMode = this.state.domMode;

      if (prevDomMode !== curDomMode) {
        if (curDomMode === 'Replace') {
          this._editorDomWasMounted();
        } else {
          this._editorDomWasUnmounted();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._editorWillBeDeactivated();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.domMode === 'Replace') {
        return _react2.default.createElement(this.props.tag, (0, _underscore.extend)((0, _underscore.omit)(this.props.customProps, 'children'), {
          ref: function ref(editorComponent) {
            return _this3._editorComponent = editorComponent;
          }
        }));
      }

      return _react2.default.createElement(_attribute_value2.default, {
        ref: function ref(editorComponent) {
          return _this3._editorComponent = editorComponent;
        },
        children: this.props.children,
        customProps: this.props.customProps,
        field: this.props.field,
        key: this.state.domMode,
        tag: this.props.tag,
        onClick: function onClick(e) {
          return _this3._onClick(e);
        }
      });
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      if (this._editor && this._editor.onClick) {
        this._editor.onClick(new _editor_event2.default(e));
      }
    }
  }, {
    key: '_editorWillBeActivated',
    value: function _editorWillBeActivated() {
      if (this._editor && this._editor.editorWillBeActivated) {
        this._editor.editorWillBeActivated();
      }
    }
  }, {
    key: '_editorWillBeDeactivated',
    value: function _editorWillBeDeactivated() {
      if (this._editor && this._editor.editorWillBeDeactivated) {
        this._editor.editorWillBeDeactivated();
      }
    }
  }, {
    key: '_editorDomWasMounted',
    value: function _editorDomWasMounted() {
      if (this._editor && this._editor.editorDomWasMounted && this._editorComponent) {
        this._editor.editorDomWasMounted((0, _reactDom.findDOMNode)(this._editorComponent));
      }
    }
  }, {
    key: '_editorDomWasUnmounted',
    value: function _editorDomWasUnmounted() {
      if (this._editor && this._editor.editorDomWasUnmounted) {
        this._editor.editorDomWasUnmounted();
      }
    }
  }, {
    key: '_setDomMode',
    value: function _setDomMode(domMode) {
      this.setState({ domMode: domMode });
    }
  }]);

  return Editor;
}(_react2.default.Component);

Editor.displayName = 'Scrivito.ContentTag.Editor';

exports.default = (0, _connect2.default)(Editor);

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _urijs = __webpack_require__(38);

var _urijs2 = _interopRequireDefault(_urijs);

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _underscore = __webpack_require__(0);

var _errors = __webpack_require__(1);

var _future_binary = __webpack_require__(36);

var _future_binary2 = _interopRequireDefault(_future_binary);

var _metadata_collection = __webpack_require__(71);

var _metadata_collection2 = _interopRequireDefault(_metadata_collection);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this is a small, 1x1 pixel, fully transparent GIF image
var FALLBACK_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

var FALLBACK_BINARY_DATA = {
  public_access: { get: { url: FALLBACK_URL } },
  private_access: { get: { url: FALLBACK_URL } }
};

// public API

var Binary = function () {
  function Binary(id, isPublic, definition) {
    var _this = this;

    _classCallCheck(this, Binary);

    this._id = id;
    this._isPublic = isPublic;
    this._definition = definition;

    this._loadableData = new _loadable_data2.default({
      state: modelState(id, definition),
      loader: function loader() {
        return _this._loadUrlData();
      }
    });
  }

  // public API


  _createClass(Binary, [{
    key: 'id',
    value: function id() {
      return this._id;
    }

    // public API

  }, {
    key: 'copy',
    value: function copy() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      options.idToCopy = this._id;
      return new _future_binary2.default(options);
    }

    // public API

  }, {
    key: 'isPrivate',
    value: function isPrivate() {
      return !this._isPublic;
    }

    // public API

  }, {
    key: 'transform',
    value: function transform(definition) {
      return new Binary(this._id, this._isPublic, (0, _underscore.extend)({}, this._definition, definition));
    }

    // public API

  }, {
    key: 'original',
    value: function original() {
      return new Binary(this._id, this._isPublic, {});
    }

    // public API

  }, {
    key: 'raw',
    value: function raw() {
      return new Binary(this._id, this._isPublic);
    }

    // public API

  }, {
    key: 'isTransformed',
    value: function isTransformed() {
      return !!this._definition;
    }
  }, {
    key: 'isExplicitlyTransformed',
    value: function isExplicitlyTransformed() {
      return this.isTransformed() && !(0, _underscore.isEmpty)(this._definition);
    }
  }, {
    key: 'isRaw',
    value: function isRaw() {
      return !this.isTransformed();
    }

    // public API

  }, {
    key: 'url',
    value: function url() {
      return this._urlData()[this._accessType()].get.url;
    }

    // public API

  }, {
    key: 'filename',
    value: function filename() {
      var url = this.url();

      if (url.match(/^data:/)) {
        return '';
      }

      return (0, _urijs2.default)(url).path().split('/').pop();
    }

    // public API

  }, {
    key: 'metadata',
    value: function metadata() {
      this._assertNotTransformed('Metadata');

      return new _metadata_collection2.default(this._id);
    }

    // public API

  }, {
    key: 'contentType',
    value: function contentType() {
      this._assertNotTransformed('Content type');

      return this.metadata().get('contentType');
    }

    // public API

  }, {
    key: 'contentLength',
    value: function contentLength() {
      this._assertNotTransformed('Content length');

      return this.metadata().get('contentLength') || 0;
    }
  }, {
    key: 'extname',
    value: function extname() {
      if (this.raw().filename().indexOf('.') > -1) {
        var ext = /[^.\\]*$/.exec(this.raw().filename())[0];
        return ext.toLowerCase();
      }
    }

    // For test purpose only.

  }, {
    key: 'equals',
    value: function equals(binary) {
      return binary instanceof Binary && binary.id() === this.id() && binary.isPrivate() === this.isPrivate() && (0, _underscore.isEqual)(binary.definition(), this.definition());
    }
  }, {
    key: 'isImage',
    value: function isImage() {
      var contentType = this.raw().contentType();
      if (contentType) {
        return contentType.split('/')[0] === 'image';
      }

      return false;
    }

    // For test purpose only.

  }, {
    key: 'definition',
    value: function definition() {
      return this._definition || null;
    }
  }, {
    key: '_accessType',
    value: function _accessType() {
      if (this.isPrivate()) {
        return 'private_access';
      }
      return 'public_access';
    }
  }, {
    key: '_urlData',
    value: function _urlData() {
      return this._loadableData.get() || FALLBACK_BINARY_DATA;
    }
  }, {
    key: '_loadUrlData',
    value: function _loadUrlData() {
      var path = 'blobs/' + encodeURIComponent(this._id);
      var params = void 0;

      if (this._definition) {
        path = path + '/transform';
        params = { transformation: this._definition };
      }

      return scrivito.CmsRestApi.get(path, params);
    }
  }, {
    key: '_assertNotTransformed',
    value: function _assertNotTransformed(fieldName) {
      if (this.isTransformed()) {
        throw new _errors.ScrivitoError('"' + fieldName + '" is not available for transformed images.' + ' Use "Scrivito.Binary#raw" to access the untransformed version of the image.');
      }
    }
  }], [{
    key: 'upload',
    value: function upload(source) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options.source = source;
      return new _future_binary2.default(options);
    }
  }, {
    key: 'store',
    value: function store(binaryId, _ref, cmsRestApiResponse) {
      var transformation = _ref.transformation;

      var loadableData = new _loadable_data2.default({ state: modelState(binaryId, transformation) });
      loadableData.set(cmsRestApiResponse);

      var raw = new Binary(binaryId);
      if (transformation) {
        return raw.transform(transformation);
      }

      return raw;
    }
  }, {
    key: 'storeMetadata',
    value: function storeMetadata(binaryId, cmsRestApiResponse) {
      return _metadata_collection2.default.store(binaryId, cmsRestApiResponse);
    }
  }]);

  return Binary;
}();

function modelState(binaryId, definition) {
  var subStateKey = scrivito.computeCacheKey([binaryId, definition]);
  return _global_state.cmsState.subState('binary').subState(subStateKey);
}

exports.default = Binary;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _extract_ids_from_content = __webpack_require__(89);

var _extract_ids_from_content2 = _interopRequireDefault(_extract_ids_from_content);

var _setup_dragstart_event = __webpack_require__(121);

var _setup_dragstart_event2 = _interopRequireDefault(_setup_dragstart_event);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuMarker = function (_React$Component) {
  _inherits(MenuMarker, _React$Component);

  function MenuMarker(props) {
    _classCallCheck(this, MenuMarker);

    var _this = _possibleConstructorReturn(this, (MenuMarker.__proto__ || Object.getPrototypeOf(MenuMarker)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    _this._onDragStart = _this._onDragStart.bind(_this);
    _this._onDragEnd = _this._onDragEnd.bind(_this);
    return _this;
  }

  _createClass(MenuMarker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'span',
        {
          ref: function ref(menuMarker) {
            return _this2._menuMarker = menuMarker;
          },
          className: 'scrivito_editing_marker',
          onClick: this._onClick,
          onDragStart: this._onDragStart,
          onDragEnd: this._onDragEnd,
          draggable: 'true'
        },
        _react2.default.createElement('i', { className: 'scrivito_icon' }),
        _react2.default.createElement(
          'span',
          { className: 'scrivito_editing_marker_title' },
          this.props.widget.objClass()
        )
      );
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this._menuMarker) {
        var _extractIdsFromConten = (0, _extract_ids_from_content2.default)(this.props.widget),
            objId = _extractIdsFromConten.objId,
            widgetId = _extractIdsFromConten.widgetId;

        scrivito.uiAdapter.showWidgetMenu((0, _reactDom.findDOMNode)(this._menuMarker), objId, widgetId);
      }
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(e) {
      (0, _setup_dragstart_event2.default)(e);

      var _extractIdsFromConten2 = (0, _extract_ids_from_content2.default)(this.props.widget),
          objId = _extractIdsFromConten2.objId,
          widgetId = _extractIdsFromConten2.widgetId;

      scrivito.uiAdapter.onDragStart(objId, widgetId);

      this.props.setDragState(true);
    }
  }, {
    key: '_onDragEnd',
    value: function _onDragEnd() {
      scrivito.uiAdapter.onDragEnd();
      this.props.setDragState(false);
    }
  }]);

  return MenuMarker;
}(_react2.default.Component);

MenuMarker.displayName = 'Scrivito.ContentTag.MenuMarker';

exports.default = (0, _connect2.default)(MenuMarker);

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_editing_mode = __webpack_require__(47);

var _is_editing_mode2 = _interopRequireDefault(_is_editing_mode);

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _underscore = __webpack_require__(0);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _window_registry = __webpack_require__(48);

var _extract_ids_from_content = __webpack_require__(89);

var _extract_ids_from_content2 = _interopRequireDefault(_extract_ids_from_content);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _menu_marker = __webpack_require__(250);

var _menu_marker2 = _interopRequireDefault(_menu_marker);

var _option_marker = __webpack_require__(165);

var _option_marker2 = _interopRequireDefault(_option_marker);

var _widget_content = __webpack_require__(252);

var _widget_content2 = _interopRequireDefault(_widget_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Widget = function (_React$Component) {
  _inherits(Widget, _React$Component);

  function Widget(props) {
    _classCallCheck(this, Widget);

    var _this = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this, props));

    _this.state = {
      hasFocus: false,
      isDragged: false
    };

    _this._onMouseOver = _this._onMouseOver.bind(_this);
    _this._onMouseOut = _this._onMouseOut.bind(_this);

    _this._onWidgetFocus = _this._onWidgetFocus.bind(_this);
    _this._onWidgetBlur = _this._onWidgetBlur.bind(_this);

    _this._setDragState = _this._setDragState.bind(_this);
    return _this;
  }

  _createClass(Widget, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if ((0, _is_editing_mode2.default)() && this._widget) {
        var _extractIdsFromConten = (0, _extract_ids_from_content2.default)(this.props.widget),
            objId = _extractIdsFromConten.objId,
            widgetId = _extractIdsFromConten.widgetId;

        var domNode = (0, _reactDom.findDOMNode)(this._widget);

        scrivito.uiAdapter.registerWidgetDropZoneInDom(domNode, objId, widgetId);
      }

      this._focusToken = scrivito.WidgetFocus.subscribe({
        onFocus: this._onWidgetFocus,
        onBlur: this._onWidgetBlur
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      scrivito.WidgetFocus.unsubscribe(this._focusToken);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var widgetContent = _react2.default.createElement(_widget_content2.default, { widget: this.props.widget });

      if (!(0, _is_editing_mode2.default)()) {
        return _react2.default.createElement(
          'div',
          null,
          widgetContent
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(widget) {
            return _this2._widget = widget;
          },
          className: this._className(),
          style: this._style(),
          onMouseOver: this._onMouseOver,
          onMouseOut: this._onMouseOut
        }, this._dataProps()),
        _react2.default.createElement(_menu_marker2.default, {
          widget: this.props.widget,
          setDragState: this._setDragState
        }),
        widgetContent,
        this._renderOptionMarker('top'),
        this._renderOptionMarker('bottom')
      );
    }
  }, {
    key: '_setDragState',
    value: function _setDragState(isDragging) {
      this.setState({ isDragging: isDragging });
    }
  }, {
    key: '_className',
    value: function _className() {
      if (this.state.hasFocus) {
        return 'scrivito_active scrivito_entered';
      }
    }
  }, {
    key: '_dataProps',
    value: function _dataProps() {
      var dataProps = {
        'data-scrivito-private-widget': true,
        'data-scrivito-private-dropzone': true
      };

      if (this._isStructureMarker()) {
        dataProps['data-scrivito-private-structure-widget'] = true;
      }

      if (this.state.isDragging) {
        dataProps['data-scrivito-private-dropback'] = true;
      }

      return dataProps;
    }
  }, {
    key: '_style',
    value: function _style() {
      if (this.state.isDragging) {
        return { opacity: 0.5 };
      }
    }
  }, {
    key: '_isStructureMarker',
    value: function _isStructureMarker() {
      var registry = (0, _window_registry.getWindowRegistry)();
      var appClass = registry.widgetClassFor(this.props.widget.objClass());
      var schema = _schema2.default.forClass(appClass);

      if (schema) {
        return (0, _underscore.some)(schema.attributes, function (_definition, name) {
          var _schema$attributeDefi = schema.attributeDefinition(name),
              _schema$attributeDefi2 = _slicedToArray(_schema$attributeDefi, 1),
              type = _schema$attributeDefi2[0];

          return type === 'widgetlist';
        });
      }

      return false;
    }
  }, {
    key: '_onMouseOver',
    value: function _onMouseOver(e) {
      e.stopPropagation();
      scrivito.WidgetFocus.notifyFocus(this._focusToken);
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut(e) {
      e.stopPropagation();
      scrivito.WidgetFocus.notifyBlur(this._focusToken);
    }
  }, {
    key: '_onWidgetFocus',
    value: function _onWidgetFocus() {
      this.setState({ hasFocus: true });
    }
  }, {
    key: '_onWidgetBlur',
    value: function _onWidgetBlur() {
      this.setState({ hasFocus: false });
    }
  }, {
    key: '_renderOptionMarker',
    value: function _renderOptionMarker(position) {
      return _react2.default.createElement(_option_marker2.default, {
        position: position,
        widget: this.props.widget,
        insertWidget: insertWidget,
        isAlwaysShown: scrivito.uiAdapter.alwaysShowOptionMarkers()
      });
    }
  }]);

  return Widget;
}(_react2.default.Component);

Widget.displayName = 'Scrivito.Widget';

function insertWidget(widget, position) {
  var _extractIdsFromConten2 = (0, _extract_ids_from_content2.default)(widget),
      objId = _extractIdsFromConten2.objId,
      widgetId = _extractIdsFromConten2.widgetId;

  scrivito.uiAdapter.insertWidget(objId, widgetId, position);
}

exports.default = (0, _connect2.default)(Widget);

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_editing_mode = __webpack_require__(47);

var _is_editing_mode2 = _interopRequireDefault(_is_editing_mode);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _window_registry = __webpack_require__(48);

var _errors = __webpack_require__(1);

var _component_registry = __webpack_require__(50);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetContent = function (_React$Component) {
  _inherits(WidgetContent, _React$Component);

  function WidgetContent() {
    _classCallCheck(this, WidgetContent);

    return _possibleConstructorReturn(this, (WidgetContent.__proto__ || Object.getPrototypeOf(WidgetContent)).apply(this, arguments));
  }

  _createClass(WidgetContent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.widget.equals(nextProps.widget);
    }
  }, {
    key: 'render',
    value: function render() {
      var registry = (0, _window_registry.getWindowRegistry)();
      var appWidget = scrivito.wrapInAppClass(registry, this.props.widget);

      return _react2.default.createElement(this._componentClass(appWidget), { widget: appWidget });
    }
  }, {
    key: '_scrivitoRenderOnError',
    value: function _scrivitoRenderOnError() {
      if ((0, _is_editing_mode2.default)()) {
        return _react2.default.createElement(
          'div',
          { className: 'content_error' },
          'Widget could not be rendered due to application error.'
        );
      }

      return null;
    }
  }, {
    key: '_componentClass',
    value: function _componentClass(appWidget) {
      var appClass = appWidget.constructor;
      var componentClass = (0, _component_registry.getByAppClass)(appClass);

      if (!componentClass) {
        throw new _errors.ArgumentError('No component registered for widget class "' + this.props.widget.objClass() + '".');
      }

      return componentClass;
    }
  }]);

  return WidgetContent;
}(_react2.default.Component);

WidgetContent.displayName = 'Scrivito.ContentTag.WidgetContent';

exports.default = (0, _connect2.default)(WidgetContent);

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(52);

var _extract_ids_from_content = __webpack_require__(89);

var _extract_ids_from_content2 = _interopRequireDefault(_extract_ids_from_content);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetlistPlaceholder = function (_React$Component) {
  _inherits(WidgetlistPlaceholder, _React$Component);

  function WidgetlistPlaceholder(props) {
    _classCallCheck(this, WidgetlistPlaceholder);

    var _this = _possibleConstructorReturn(this, (WidgetlistPlaceholder.__proto__ || Object.getPrototypeOf(WidgetlistPlaceholder)).call(this, props));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(WidgetlistPlaceholder, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this._widgetPlaceholder) {
        var domNode = (0, _reactDom.findDOMNode)(this._widgetPlaceholder);

        var _extractIdsFromConten = (0, _extract_ids_from_content2.default)(this.props.field.container()),
            objId = _extractIdsFromConten.objId,
            widgetId = _extractIdsFromConten.widgetId;

        var attributeName = this.props.field.name();

        scrivito.uiAdapter.registerEmptyWidgetlistDropZoneInDom({ domNode: domNode, objId: objId, widgetId: widgetId, attributeName: attributeName });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(widgetPlaceholder) {
          return _this2._widgetPlaceholder = widgetPlaceholder;
        },
        className: 'scrivito_empty_widget_field',
        'data-scrivito-private-dropzone': 'true',
        onClick: this._onClick
      });
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this._widgetPlaceholder) {
        var attributeName = this.props.field.name();

        var _extractIdsFromConten2 = (0, _extract_ids_from_content2.default)(this.props.field.container()),
            objId = _extractIdsFromConten2.objId,
            widgetId = _extractIdsFromConten2.widgetId;

        scrivito.uiAdapter.showWidgetlistMenu((0, _reactDom.findDOMNode)(this._widgetPlaceholder), {
          objId: objId, widgetId: widgetId, attributeName: attributeName, mousePosition: { x: e.pageX, y: e.pageY }
        });
      }
    }
  }]);

  return WidgetlistPlaceholder;
}(_react2.default.Component);

WidgetlistPlaceholder.displayName = 'Scrivito.ContentTag.WidgetlistPlaceholder';

exports.default = (0, _connect2.default)(WidgetlistPlaceholder);

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _current_page = __webpack_require__(40);

var _errors = __webpack_require__(1);

var _component_registry = __webpack_require__(50);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CurrentPage() {
  var page = (0, _current_page.currentPage)();
  var params = (0, _current_page.currentPageParams)();

  if (!page) {
    return null;
  }

  var appClass = page.constructor;
  var componentClass = (0, _component_registry.getByAppClass)(appClass);

  if (!componentClass) {
    throw new _errors.ArgumentError('No component registered for obj class "' + page.objClass() + '".');
  }

  return _react2.default.createElement(componentClass, { page: page, params: params });
}

CurrentPage.displayName = 'Scrivito.CurrentPage';

exports.default = (0, _connect2.default)(CurrentPage);

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _underscore = __webpack_require__(0);

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _errors = __webpack_require__(1);

var _binary = __webpack_require__(25);

var _binary2 = _interopRequireDefault(_binary);

var _window_proxy = __webpack_require__(31);

var _image_placeholder = __webpack_require__(267);

var _image_placeholder2 = _interopRequireDefault(_image_placeholder);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _content_tag = __webpack_require__(162);

var _content_tag2 = _interopRequireDefault(_content_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// public API
var ImageTag = function (_React$Component) {
  _inherits(ImageTag, _React$Component);

  function ImageTag() {
    _classCallCheck(this, ImageTag);

    return _possibleConstructorReturn(this, (ImageTag.__proto__ || Object.getPrototypeOf(ImageTag)).apply(this, arguments));
  }

  _createClass(ImageTag, [{
    key: 'render',
    value: function render() {
      if (!this.props.content) {
        return null;
      }

      var htmlOptions = (0, _underscore.omit)(this.props, 'content', 'attribute');

      if (this.props.content instanceof _binary2.default) {
        return _react2.default.createElement('img', _extends({
          src: this._urlFor(this.props.content)
        }, htmlOptions));
      }

      var binary = this._getBinary();

      if (!binary) {
        htmlOptions['data-scrivito-image-placeholder'] = true;
      }

      return _react2.default.createElement(_content_tag2.default, _extends({
        attribute: this.props.attribute,
        content: this.props.content,
        tag: 'img',
        src: this._urlFor(binary)
      }, htmlOptions));
    }
  }, {
    key: '_urlFor',
    value: function _urlFor(binary) {
      if (binary) {
        return this._scaleDownBinary(binary).url();
      }

      return _image_placeholder2.default;
    }
  }, {
    key: '_getBinary',
    value: function _getBinary() {
      var schema = _schema2.default.forInstance(this.props.content);
      var attributeType = schema.attributes[this.props.attribute];

      if (!attributeType) {
        throw new _errors.ScrivitoError('Component "Scrivito.ImageTag" received prop "content"' + (' with an object missing attribute "' + this.props.attribute + '".'));
      }

      if (attributeType === 'binary') {
        return this.props.content.get(this.props.attribute);
      }

      if (attributeType === 'reference') {
        return this._getReferencedBinary();
      }

      throw new _errors.ScrivitoError('Component "Scrivito.ImageTag" received prop "content"' + (' with an object, whose attribute "' + this.props.attribute + '"') + (' is of invalid type "' + attributeType + '".') + ' Valid attribute types are "binary" and "reference".');
    }
  }, {
    key: '_getReferencedBinary',
    value: function _getReferencedBinary() {
      var referencedObj = this.props.content.get(this.props.attribute);

      if (referencedObj) {
        var blob = referencedObj.get('blob');

        if (blob) {
          return blob;
        }
      }

      return null;
    }
  }, {
    key: '_scaleDownBinary',
    value: function _scaleDownBinary(binary) {
      if (binary.isRaw() || binary.isExplicitlyTransformed()) {
        return binary;
      }

      // The binary service never scales up, so we transform all images, regardless of their width.
      return binary.transform({ width: (0, _window_proxy.screen)().width * (0, _window_proxy.devicePixelRatio)() });
    }
  }]);

  return ImageTag;
}(_react2.default.Component);

ImageTag.displayName = 'Scrivito.ImageTag';

ImageTag.defaultProps = { attribute: 'blob' };

exports.default = (0, _connect2.default)(ImageTag);

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _current_page = __webpack_require__(40);

var _errors = __webpack_require__(1);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// public API
function InternalErrorPage(_ref) {
  var children = _ref.children;

  if ((0, _current_page.currentPageError)() && !((0, _current_page.currentPageError)() instanceof _errors.ResourceNotFoundError)) {
    if (children) {
      return React.createElement(
        'div',
        null,
        children
      );
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'We\'re sorry, but something went wrong.'
      )
    );
  }

  return null;
}

InternalErrorPage.displayName = 'Scrivito.InternalErrorPage';

exports.default = (0, _connect2.default)(InternalErrorPage);

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _current_page = __webpack_require__(40);

var _errors = __webpack_require__(1);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// public API
function NotFoundErrorPage(_ref) {
  var children = _ref.children;

  if ((0, _current_page.currentPageError)() instanceof _errors.ResourceNotFoundError) {
    if (children) {
      return React.createElement(
        'div',
        null,
        children
      );
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'The page you were looking for doesn\'t exist.'
      ),
      React.createElement(
        'p',
        null,
        'You may have mistyped the address or the page may have moved.'
      )
    );
  }

  return null;
}

NotFoundErrorPage.displayName = 'Scrivito.NotFoundErrorPage';

exports.default = (0, _connect2.default)(NotFoundErrorPage);

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _update_buffer = __webpack_require__(244);

var _update_buffer2 = _interopRequireDefault(_update_buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditController = function () {
  function EditController(field, setDomMode) {
    _classCallCheck(this, EditController);

    this.setDomMode = setDomMode;
    this._buffer = new _update_buffer2.default({
      get: function get() {
        return field.get();
      },
      set: function set(val) {
        return field.update(val);
      },
      flushRate: 100
    });
  }

  _createClass(EditController, [{
    key: 'content',
    get: function get() {
      return this._buffer.get();
    },
    set: function set(val) {
      this._buffer.set(val);
    }
  }]);

  return EditController;
}();

exports.default = EditController;

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditorEvent = function () {
  function EditorEvent(internalEvent) {
    _classCallCheck(this, EditorEvent);

    this._internalEvent = internalEvent;
  }

  _createClass(EditorEvent, [{
    key: "preventDefault",
    value: function preventDefault() {
      this._internalEvent.preventDefault();
    }
  }, {
    key: "stopPropagation",
    value: function stopPropagation() {
      this._internalEvent.stopPropagation();
    }
  }]);

  return EditorEvent;
}();

exports.default = EditorEvent;

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _obj_class = __webpack_require__(21);

var _obj_class2 = _interopRequireDefault(_obj_class);

var _widget_class = __webpack_require__(24);

var _widget_class2 = _interopRequireDefault(_widget_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Attribute = function () {
  _createClass(Attribute, null, [{
    key: 'isSystemAttribute',
    value: function isSystemAttribute(name) {
      return name[0] === '_';
    }
  }]);

  function Attribute(attributeData) {
    _classCallCheck(this, Attribute);

    this.name = attributeData.name;
    this.type = attributeData.type;
    this._validValues = attributeData.validValues;
    this._attributeData = attributeData;
  }

  // public

  _createClass(Attribute, [{
    key: 'title',
    value: function title() {
      return this._attributeData.title;
    }
  }, {
    key: 'description',
    value: function description() {
      return this._attributeData.description;
    }
  }, {
    key: 'typeInfo',
    value: function typeInfo() {
      if (this.type === 'enum' || this.type === 'multienum') {
        return [this.type, { validValues: this._validValues }];
      }
      return [this.type, {}];
    }
  }, {
    key: 'validValues',
    value: function validValues() {
      this._assertValidTypes(['enum', 'multienum'], 'Only enum and multienum attributes can have valid values');
      return this._validValues || [];
    }
  }, {
    key: 'validClasses',
    value: function validClasses() {
      this._assertValidTypes(['reference', 'referencelist'], 'Only reference and referencelist attributes can have valid classes');
      var objClassNames = this._attributeData.validClasses;

      if (objClassNames) {
        return _underscore2.default.map(objClassNames, function (name) {
          return _obj_class2.default.find(name);
        });
      }
    }
  }, {
    key: 'only',
    value: function only() {
      this._assertValidTypes(['widgetlist'], 'Only widgetlist attributes have only()');
      var widgetClassName = this._attributeData.only;

      if (widgetClassName) {
        var widgetClass = _widget_class2.default.find(widgetClassName);
        return widgetClass ? [widgetClass] : [];
      }
    }

    // private

  }, {
    key: '_assertValidTypes',
    value: function _assertValidTypes(validTypes, errorMessage) {
      if (!_underscore2.default.include(validTypes, this.type)) {
        $.error(errorMessage);
      }
    }
  }]);

  return Attribute;
}();

exports.default = Attribute;

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformHTML = transformHTML;
exports.findTarget = findTarget;
exports.reset = reset;

var _window_context = __webpack_require__(30);

var _errors = __webpack_require__(1);

var REG_EXP = /\bobjid:([a-f0-9]{16})\b([^"']*)/g;

var knownLinks = {};

function transformHTML(htmlString) {
  return htmlString.replace(REG_EXP, function (_match, objId) {
    var getObj = function getObj() {
      return (0, _window_context.getWindowContext)().Obj.get(objId);
    };

    try {
      var url = scrivito.loadWithDefault(undefined, function () {
        return scrivito.urlFor(getObj());
      });

      if (url) {
        knownLinks[url] = getObj();
        return url;
      }

      url = '#__LOADING_OBJ_WITH_ID_' + objId;
      knownLinks[url] = getObj;

      return url;
    } catch (error) {
      if (error instanceof _errors.ResourceNotFoundError) {
        return '#__MISSING_OBJ_WITH_ID_' + objId;
      }

      throw error;
    }
  });
}

function findTarget(currentNode, outermostNode) {
  if (currentNode === outermostNode) {
    return null;
  }

  if (currentNode.nodeName === 'A') {
    var target = knownLinks[currentNode.pathname] || knownLinks[currentNode.hash];

    if (target) {
      return target;
    }
  }

  return findTarget(currentNode.parentNode, outermostNode);
}

// For test purpose only.
function reset() {
  knownLinks = {};
}

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onElementResize;

var _is_ie = __webpack_require__(233);

var _is_ie2 = _interopRequireDefault(_is_ie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onElementResize(element, fn) {
  if (!element._scrivitoResizeListeners) {
    element._scrivitoResizeListeners = [];

    // The element has to have relative position, otherwise the object won't span the whole height.
    //
    // Unfortunately Firefox cannot compute styles of elements inside an iframe with `display:none`
    // and it reports such elements to have no styles even _after_ the iframe became visible. So we
    // cannot set position to `relative` only if it was previously `static`.
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=548397.
    //
    // We always have to enforce the relative position, regardless of the previous position.
    element.style.position = 'relative';

    var object = createObject();

    object.resizeElement = element;
    element._scrivitoResizeTrigger = object;

    if ((0, _is_ie2.default)()) {
      element.appendChild(object);
    }

    object.data = 'about:blank';

    if (!(0, _is_ie2.default)()) {
      element.appendChild(object);
    }
  }

  element._scrivitoResizeListeners.push(fn);
}

function createObject() {
  var object = document.createElement('object');

  object.type = 'text/html';
  object.onload = onObjectLoad;

  object.style.display = 'block';
  object.style.position = 'absolute';
  object.style.top = 0;
  object.style.left = 0;
  object.style.height = '100%';
  object.style.width = '100%';
  object.style.overflow = 'hidden';
  object.style.pointerEvents = 'none';
  object.style.zIndex = -1;

  return object;
}

function onObjectLoad() {
  this.contentDocument.defaultView._scrivitoResizeTrigger = this.resizeElement;
  this.contentDocument.defaultView.addEventListener('resize', onResize);
}

function onResize(e) {
  var targetWindow = e.target || e.srcElement;
  var trigger = targetWindow._scrivitoResizeTrigger;

  trigger._scrivitoResizeListeners.forEach(function (fn) {
    return fn(trigger, e);
  });
}

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var currentFocus = void 0;
  var currentToken = 0;
  var handlers = {};

  var WidgetFocus = {
    subscribe: function subscribe(_ref) {
      var onFocus = _ref.onFocus,
          onBlur = _ref.onBlur;

      var token = currentToken;

      handlers[token] = { onFocus: onFocus, onBlur: onBlur };
      currentToken += 1;

      return token;
    },
    unsubscribe: function unsubscribe(token) {
      delete handlers[token];
    },
    notifyFocus: function notifyFocus(token) {
      currentFocus = token;
      handlers[currentFocus].onFocus();
    },
    notifyBlur: function notifyBlur(token) {
      // Performance optimization: Only re-render the widget, which lost the focus.
      if (token === currentFocus) {
        handlers[token].onBlur();
      }
    },


    // For test purpose only.
    get handlers() {
      return handlers;
    },

    // For test purpose only.
    reset: function reset() {
      currentFocus = undefined;
      currentToken = 0;
      handlers = {};
    }
  };

  scrivito.WidgetFocus = WidgetFocus;
})();

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!window.scrivito) {
  window.scrivito = {};
}
window.scrivito.AppSupport = {};

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(263);

__webpack_require__(234);

__webpack_require__(235);

__webpack_require__(236);

__webpack_require__(237);

__webpack_require__(240);

__webpack_require__(241);

__webpack_require__(243);

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = openContentBrowser;
function openContentBrowser() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return scrivito.uiAdapter.openContentBrowser(options);
}

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!window.scrivito) {
  window.scrivito = {};
}

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * This is a base64 placeholder for the image component.
 *
 * The image component is actually styled via CSS in order to provide a scalable placeholder.
 * However, in order to set a background image, the tag must have content. In this case a
 * transparent image of an appropriate size.
 */
exports.default = 'data:image/gif;base64,R0lGODlhyADIAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDBEQjBEMDdFODMzMTFFNTg0QzY4MUNBMUVCQUU2MjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDBEQjBEMDhFODMzMTFFNTg0QzY4MUNBMUVCQUU2MjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMERCMEQwNUU4MzMxMUU1ODRDNjgxQ0ExRUJBRTYyNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMERCMEQwNkU4MzMxMUU1ODRDNjgxQ0ExRUJBRTYyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAADIAMgAAAL/hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u7+Dh8vP09fb3+Pn6+/z9/v/w8woMCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8aNBhw7eixTAAA7';

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(266);

__webpack_require__(262);

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = provideComponent;

var _window_context = __webpack_require__(30);

var _errors = __webpack_require__(1);

var _component_registry = __webpack_require__(50);

var _connect = __webpack_require__(6);

var _connect2 = _interopRequireDefault(_connect);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// public API
function provideComponent(appClass, component) {
  assertValidAppClass(appClass);
  assertValidComponent(component);
  assertNoCustomProps(component);

  var appClassName = appClass._scrivitoPrivateSchema.name;

  if (!component.displayName && (!component.name || component.name === '_class') && appClassName) {
    component.displayName = appClassName;
  }

  (0, _component_registry.registerForAppClass)(appClass, (0, _connect2.default)(component));
}

function assertValidAppClass(appClass) {
  var Obj = (0, _window_context.getWindowContext)().Obj;
  var Widget = (0, _window_context.getWindowContext)().Widget;
  var baseClass = appClass.prototype;

  if (!(baseClass instanceof Obj || baseClass instanceof Widget)) {
    throw new _errors.ArgumentError(appClass + ' is not a valid application class.');
  }
}

function assertValidComponent(component) {
  if (typeof component !== 'function') {
    throw new _errors.ArgumentError('Scrivito.provideComponent expected a valid React component' + (', but received ' + (0, _pretty_print2.default)(component)));
  }
}

function assertNoCustomProps(component) {
  if (component.propTypes) {
    throw new _errors.ArgumentError('Custom props are not allowed when providing a component.');
  }
}

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map_and_load_parallel = __webpack_require__(85);

var _map_and_load_parallel2 = _interopRequireDefault(_map_and_load_parallel);

var _find_widget_placement = __webpack_require__(101);

var _find_widget_placement2 = _interopRequireDefault(_find_widget_placement);

var _convert_to_slug = __webpack_require__(132);

var _convert_to_slug2 = _interopRequireDefault(_convert_to_slug);

var _types = __webpack_require__(32);

var types = _interopRequireWildcard(_types);

var _obj_data_store = __webpack_require__(41);

var ObjDataStore = _interopRequireWildcard(_obj_data_store);

var _attribute_serializer = __webpack_require__(69);

var AttributeSerializer = _interopRequireWildcard(_attribute_serializer);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _basic_obj_search_iterable = __webpack_require__(60);

var _basic_obj_search_iterable2 = _interopRequireDefault(_basic_obj_search_iterable);

var _basic_attribute_content = __webpack_require__(59);

var _basic_attribute_content2 = _interopRequireDefault(_basic_attribute_content);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _future_binary = __webpack_require__(36);

var _future_binary2 = _interopRequireDefault(_future_binary);

var _random = __webpack_require__(74);

var _obj_class = __webpack_require__(21);

var _obj_class2 = _interopRequireDefault(_obj_class);

var _attribute_inflection = __webpack_require__(13);

var _iterable = __webpack_require__(55);

var _global_state = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SYSTEM_ATTRIBUTES = {
  _id: 'id',
  _obj_class: 'objClass',
  _path: 'path',
  _permalink: 'permalink',
  _created_at: 'createdAt',
  _created_by: 'createdBy',
  _last_changed: 'lastChanged',
  _last_changed_by: 'lastChangedBy'
};

var BasicObj = function (_BasicAttributeConten) {
  _inherits(BasicObj, _BasicAttributeConten);

  _createClass(BasicObj, null, [{
    key: 'fetch',
    value: function fetch(_id) {
      scrivito.asyncMethodStub();
    }
  }, {
    key: 'fetchIncludingDeleted',
    value: function fetchIncludingDeleted(_id) {
      scrivito.asyncMethodStub();
    }
  }, {
    key: 'get',
    value: function get(idOrList) {
      var _this2 = this;

      if (_underscore2.default.isArray(idOrList)) {
        return (0, _map_and_load_parallel2.default)(idOrList, function (id) {
          return _this2.get(id);
        });
      }

      var obj = this.getIncludingDeleted(idOrList);

      if (!obj || obj.isDeleted()) {
        return;
      }

      return obj;
    }
  }, {
    key: 'getIncludingDeleted',
    value: function getIncludingDeleted(idOrList) {
      var _this3 = this;

      if (_underscore2.default.isArray(idOrList)) {
        return (0, _map_and_load_parallel2.default)(idOrList, function (id) {
          return _this3.getIncludingDeleted(id);
        });
      }

      var objData = ObjDataStore.get(idOrList);
      if (!objData) {
        return;
      }

      var obj = new BasicObj(objData);

      if (obj.isFinallyDeleted()) {
        return;
      }

      return obj;
    }
  }, {
    key: 'create',
    value: function create(attributes) {
      var normalizedAttributes = scrivito.typeInfo.normalizeAttrs(attributes);
      assertObjClassExists(normalizedAttributes._objClass);

      if (!normalizedAttributes._id) {
        normalizedAttributes._id = [this.generateId()];
      }

      var serializedAttributes = {
        _id: normalizedAttributes._id, _obj_class: normalizedAttributes._objClass
      };
      return this.createWithSerializedAttributes(scrivito.typeInfo.unwrapAttributes(serializedAttributes), _underscore2.default.omit(attributes, '_objClass', '_id'));
    }
  }, {
    key: 'addChildWithSerializedAttributes',
    value: function addChildWithSerializedAttributes(parentPath, serializedAttributes) {
      var objId = BasicObj.generateId();
      return this.createWithSerializedAttributes(_underscore2.default.extend({}, serializedAttributes, {
        _id: objId,
        _path: parentPath + '/' + objId
      }));
    }
  }, {
    key: 'createWithSerializedAttributes',
    value: function createWithSerializedAttributes(serializedAttributes, attributeDict) {
      if (!attributeDict) {
        return this.createWithSerializedAttributes.apply(this, _toConsumableArray(extractAttributeDict(serializedAttributes)));
      }

      var objData = ObjDataStore.createObjData(serializedAttributes._id);
      objData.update(serializedAttributes);

      var obj = new BasicObj(objData);
      obj.update(attributeDict);

      return obj;
    }
  }, {
    key: 'generateId',
    value: function generateId() {
      return (0, _random.randomId)();
    }
  }, {
    key: 'all',
    value: function all() {
      return new _basic_obj_search_iterable2.default().batchSize(1000);
    }
  }, {
    key: 'root',
    value: function root() {
      return BasicObj.getByPath('/');
    }
  }, {
    key: 'where',
    value: function where(attribute, operator, value) {
      var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      return new _basic_obj_search_iterable2.default().and(attribute, operator, value, boost);
    }
  }, {
    key: 'getByPath',
    value: function getByPath(path) {
      var obj = (0, _iterable.firstValueFromIterable)(this.where('_path', 'equals', path));
      if (obj) {
        return obj;
      }

      throw new _errors.ResourceNotFoundError('Obj with path "' + path + '" not found.');
    }
  }, {
    key: 'getByPermalink',
    value: function getByPermalink(permalink) {
      var iterable = this.where('_permalink', 'equals', permalink);
      var obj = (0, _iterable.firstValueFromIterable)(iterable);
      if (obj) {
        return obj;
      }

      throw new _errors.ResourceNotFoundError('Obj with permalink "' + permalink + '" not found.');
    }
  }]);

  function BasicObj(objData) {
    _classCallCheck(this, BasicObj);

    var _this = _possibleConstructorReturn(this, (BasicObj.__proto__ || Object.getPrototypeOf(BasicObj)).call(this));

    _this.objData = objData;
    return _this;
  }

  _createClass(BasicObj, [{
    key: 'id',
    value: function id() {
      return this._current._id;
    }
  }, {
    key: 'objClass',
    value: function objClass() {
      return this._current._obj_class;
    }
  }, {
    key: 'createdAt',
    value: function createdAt() {
      return types.parseStringToDate(this._current._created_at);
    }
  }, {
    key: 'createdBy',
    value: function createdBy() {
      return this._current._created_by;
    }
  }, {
    key: 'lastChanged',
    value: function lastChanged() {
      if (this._current._last_changed) {
        return types.parseStringToDate(this._current._last_changed);
      }

      return null;
    }
  }, {
    key: 'lastChangedBy',
    value: function lastChangedBy() {
      if (this._current._last_changed_by) {
        return this._current._last_changed_by;
      }

      return null;
    }
  }, {
    key: 'version',
    value: function version() {
      return this._current._version;
    }
  }, {
    key: 'path',
    value: function path() {
      return this._current._path || null;
    }
  }, {
    key: 'permalink',
    value: function permalink() {
      return this._current._permalink || null;
    }
  }, {
    key: 'parentPath',
    value: function parentPath() {
      if (this._hasParentPath()) {
        return computeParentPath(this.path());
      }

      return null;
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.getParent();
    }
  }, {
    key: 'getParent',
    value: function getParent() {
      if (!this._hasParentPath()) {
        return null;
      }

      try {
        return BasicObj.getByPath(this.parentPath());
      } catch (error) {
        if (error instanceof _errors.ResourceNotFoundError) {
          return null;
        }
        throw error;
      }
    }
  }, {
    key: 'hasConflicts',
    value: function hasConflicts() {
      return !!this._current._conflicts;
    }
  }, {
    key: 'modification',
    value: function modification() {
      if (this._current._deleted) {
        return 'deleted';
      }

      return this._current._modification || null;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return !!this.modification();
    }
  }, {
    key: 'isNew',
    value: function isNew() {
      return this.modification() === 'new';
    }
  }, {
    key: 'isEdited',
    value: function isEdited() {
      return this.modification() === 'edited';
    }
  }, {
    key: 'isDeleted',
    value: function isDeleted() {
      return this.modification() === 'deleted';
    }
  }, {
    key: 'isFinallyDeleted',
    value: function isFinallyDeleted() {
      return !!this._current._deleted;
    }
  }, {
    key: 'isBinary',
    value: function isBinary() {
      if (!this._objClass) {
        return false;
      }

      var blobAttribute = this._objClass.attribute('blob');

      if (blobAttribute) {
        return blobAttribute.type === 'binary';
      }

      return false;
    }
  }, {
    key: 'isImage',
    value: function isImage() {
      if (this.isBinary()) {
        var blob = this.get('blob', 'binary');

        if (blob) {
          return blob.isImage();
        }
      }

      return false;
    }
  }, {
    key: 'contentLength',
    value: function contentLength() {
      return this._binaryData('contentLength');
    }
  }, {
    key: 'contentType',
    value: function contentType() {
      return this._binaryData('contentType');
    }
  }, {
    key: 'contentUrl',
    value: function contentUrl() {
      return this._binaryData('url');
    }
  }, {
    key: 'metadata',
    value: function metadata() {
      return this._binaryData('metadata');
    }
  }, {
    key: 'fetchParent',
    value: function fetchParent() {
      scrivito.asyncMethodStub();
    }
  }, {
    key: 'children',
    value: function children() {
      if (this.path()) {
        var iterable = BasicObj.all().and('_parentPath', 'equals', this.path());
        return (0, _iterable.arrayFromIterable)(iterable);
      }

      return [];
    }
  }, {
    key: 'hasChildren',
    value: function hasChildren() {
      return !!this.children().length;
    }
  }, {
    key: 'orderedChildren',
    value: function orderedChildren() {
      var children = this.children();
      var childOrder = this.get('childOrder', 'referencelist');

      if (_underscore2.default.isArray(childOrder)) {
        return _underscore2.default.sortBy(children, function (child) {
          var childOrderIds = _underscore2.default.invoke(childOrder, 'id');
          var childIndex = childOrderIds.indexOf(child.id());

          if (childIndex === -1) {
            return childOrder.length;
          }

          return childIndex;
        });
      }

      return children;
    }
  }, {
    key: 'backlinks',
    value: function backlinks() {
      return (0, _iterable.arrayFromIterable)(BasicObj.where('*', 'linksTo', this));
    }
  }, {
    key: 'ancestors',
    value: function ancestors() {
      if (this._hasParentPath()) {
        return collectPathComponents(this.parentPath()).map(function (ancestorPath) {
          try {
            return BasicObj.getByPath(ancestorPath);
          } catch (err) {
            if (err instanceof _errors.ResourceNotFoundError) {
              return null;
            }

            throw err;
          }
        });
      }

      return [];
    }
  }, {
    key: 'update',
    value: function update(attributes) {
      var _this4 = this;

      var normalizedAttributes = scrivito.typeInfo.normalizeAttrs(attributes);

      (0, _global_state.withBatchedUpdates)(function () {
        _this4._persistWidgets(_this4, normalizedAttributes);
        var patch = AttributeSerializer.serialize(normalizedAttributes);
        _this4.objData.update(patch);
      });

      this._linkResolution.start();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.update({ _modification: ['deleted'] });
    }
  }, {
    key: 'insertWidget',
    value: function insertWidget(widget, _ref) {
      var before = _ref.before,
          after = _ref.after;

      var id = (before || after).id();

      var _widgetPlacementFor2 = this._widgetPlacementFor(id),
          attributeValue = _widgetPlacementFor2.attributeValue,
          attributeName = _widgetPlacementFor2.attributeName,
          container = _widgetPlacementFor2.container,
          index = _widgetPlacementFor2.index;

      var newIndex = before ? index : index + 1;
      var newAttributeValue = [].concat(_toConsumableArray(attributeValue.slice(0, newIndex)), [widget], _toConsumableArray(attributeValue.slice(newIndex)));

      container.update(_defineProperty({}, attributeName, [newAttributeValue, 'widgetlist']));
    }
  }, {
    key: 'removeWidget',
    value: function removeWidget(widget) {
      var field = this.fieldContainingWidget(widget);
      field.update(_underscore2.default.reject(field.get(), function (curWidget) {
        return curWidget.equals(widget);
      }));
    }
  }, {
    key: 'copyAsync',
    value: function copyAsync() {
      var copyOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      assertValidCopyOptions(copyOptions);

      return this._copyAttributes().then(function (copiedAttributes) {
        var serializedAttributes = _underscore2.default.extend(copiedAttributes, copyOptions);
        var obj = BasicObj.createWithSerializedAttributes(serializedAttributes);
        return obj.finishSaving().then(function () {
          return obj;
        });
      });
    }
  }, {
    key: 'moveToAsync',
    value: function moveToAsync(parentPath) {
      this.update({ _path: [parentPath + '/' + this.id()] });
      return this.finishSaving();
    }
  }, {
    key: 'markResolvedAsync',
    value: function markResolvedAsync() {
      this.update({ _conflicts: [null] });
      return this.finishSaving();
    }
  }, {
    key: 'finishSaving',
    value: function finishSaving() {
      var _this5 = this;

      var finish = this._linkResolution.finishResolving().then(function () {
        return _this5.objData.finishSaving();
      });
      return new scrivito.PublicPromise(finish);
    }
  }, {
    key: 'equals',
    value: function equals(otherObj) {
      if (!(otherObj instanceof BasicObj)) {
        return false;
      }

      return this.id() === otherObj.id();
    }
  }, {
    key: 'widget',
    value: function widget(id) {
      if (this.widgetData(id)) {
        return _basic_widget2.default.build(id, this);
      }
      return null;
    }
  }, {
    key: 'widgets',
    value: function widgets() {
      var _this6 = this;

      return _underscore2.default.map(_underscore2.default.keys(this._widgetPool), function (id) {
        return _this6.widget(id);
      });
    }
  }, {
    key: 'widgetData',
    value: function widgetData(id) {
      return this._widgetPool[id];
    }
  }, {
    key: 'fieldContainingWidget',
    value: function fieldContainingWidget(widget) {
      var _widgetPlacementFor3 = this._widgetPlacementFor(widget.id()),
          container = _widgetPlacementFor3.container,
          attributeName = _widgetPlacementFor3.attributeName;

      return container.field(attributeName, 'widgetlist');
    }
  }, {
    key: 'generateWidgetId',
    value: function generateWidgetId() {
      for (var i = 0; i < 10; i++) {
        var id = (0, _random.randomHex)();

        if (!this.widget(id)) {
          return id;
        }
      }

      $.error('Could not generate a new unused widget id.');
    }
  }, {
    key: 'serializeAttributes',
    value: function serializeAttributes() {
      var serializedAttributes = _get(BasicObj.prototype.__proto__ || Object.getPrototypeOf(BasicObj.prototype), 'serializeAttributes', this).call(this);

      delete serializedAttributes._conflicts;
      delete serializedAttributes._modification;
      delete serializedAttributes._created_at;
      delete serializedAttributes._created_by;
      delete serializedAttributes._last_changed;
      delete serializedAttributes._last_changed_by;

      return serializedAttributes;
    }
  }, {
    key: 'slug',
    value: function slug() {
      var title = this.get('title', 'string');
      return (0, _convert_to_slug2.default)(title);
    }
  }, {
    key: '_binaryData',
    value: function _binaryData(key) {
      var blob = this.get('blob', 'binary');
      return blob && blob.raw()[key]();
    }
  }, {
    key: '_hasParentPath',
    value: function _hasParentPath() {
      return this.path() && this.path() !== '/';
    }
  }, {
    key: '_copyAttributes',
    value: function _copyAttributes() {
      var objId = BasicObj.generateId();
      var serializedAttributes = this.serializeAttributes();
      var uploadPromises = [];

      _underscore2.default.each(serializedAttributes, function (typeAndValue, name) {
        if (name[0] === '_') {
          delete serializedAttributes[name];
          return;
        }

        var _typeAndValue = _slicedToArray(typeAndValue, 2),
            type = _typeAndValue[0],
            value = _typeAndValue[1];

        if (type === 'binary' && value) {
          var futureBinary = new _future_binary2.default({ idToCopy: value.id });
          var promise = futureBinary.into(objId).then(function (binary) {
            return { name: name, binary: binary };
          });
          uploadPromises.push(promise);
        }
      });

      serializedAttributes._id = objId;
      serializedAttributes._obj_class = this.objClass();
      if (this.path()) {
        serializedAttributes._path = this.parentPath() + '/' + objId;
      }

      return scrivito.PublicPromise.all(uploadPromises).then(function (binaries) {
        _underscore2.default.each(binaries, function (_ref2) {
          var name = _ref2.name,
              binary = _ref2.binary;

          serializedAttributes[name] = ['binary', { id: binary.id() }];
        });

        return serializedAttributes;
      });
    }
  }, {
    key: '_widgetPlacementFor',
    value: function _widgetPlacementFor(widgetId) {
      var placement = (0, _find_widget_placement2.default)(this._current, widgetId);
      var container = placement.parentWidgetId ? this.widget(placement.parentWidgetId) : this;
      var attributeName = (0, _attribute_inflection.camelCase)(placement.attributeName);
      var attributeValue = container.get(attributeName, 'widgetlist');

      return _underscore2.default.extend(placement, { container: container, attributeName: attributeName, attributeValue: attributeValue });
    }
  }, {
    key: '_widgetPool',
    get: function get() {
      return this._current._widget_pool || {};
    }
  }, {
    key: '_systemAttributes',
    get: function get() {
      return SYSTEM_ATTRIBUTES;
    }
  }, {
    key: '_current',
    get: function get() {
      return this.objData.current;
    }
  }, {
    key: '_objClass',
    get: function get() {
      return _obj_class2.default.find(this.objClass());
    }
  }, {
    key: '_linkResolution',
    get: function get() {
      return scrivito.uiAdapter.linkResolutionFor(this.objData);
    }
  }]);

  return BasicObj;
}(_basic_attribute_content2.default);

exports.default = BasicObj;


scrivito.provideAsyncClassMethods(BasicObj, {
  get: 'fetch',
  getByPermalink: 'fetchByPermalink',
  getIncludingDeleted: 'fetchIncludingDeleted'
});

scrivito.provideAsyncInstanceMethods(BasicObj, {
  getParent: 'fetchParent'
});

function assertObjClassExists(attrInfoAndValue) {
  if (!attrInfoAndValue) {
    throw new _errors.ArgumentError('Please provide an obj class as the "_objClass" property.');
  }
}

function extractAttributeDict(attributes) {
  var serializedAttributes = {};
  var attributeDict = {};

  _underscore2.default.each(attributes, function (serializedValue, name) {
    if (_underscore2.default.isArray(serializedValue) && _underscore2.default.first(serializedValue) === 'widgetlist') {
      var widgets = _underscore2.default.map(_underscore2.default.last(serializedValue), function (serializedWidgetAttributes) {
        return _basic_widget2.default.newWithSerializedAttributes(serializedWidgetAttributes);
      });

      var attrName = (0, _attribute_inflection.camelCase)(name);
      attributeDict[attrName] = [widgets, ['widgetlist']];
    } else {
      serializedAttributes[name] = serializedValue;
    }
  });

  if (!serializedAttributes._id) {
    serializedAttributes._id = BasicObj.generateId();
  }

  return [serializedAttributes, attributeDict];
}

function collectPathComponents(path) {
  var results = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (path === '/') {
    return ['/'].concat(_toConsumableArray(results));
  }
  return collectPathComponents(computeParentPath(path), [path].concat(_toConsumableArray(results)));
}

function computeParentPath(path) {
  var pathComponents = path.split('/');
  pathComponents.pop();
  if (pathComponents.length === 1) {
    return '/';
  }
  return pathComponents.join('/');
}

function assertValidCopyOptions(copyOptions) {
  var validCopyOptions = ['_path'];

  if (_underscore2.default.difference(_underscore2.default.keys(copyOptions), validCopyOptions).length) {
    throw new _errors.ArgumentError('Currently only "_path" copy option is supported.');
  }
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// The iframe context is the `scrivito` object, available top-level in the application iframe and
// used as the public API for the client. Following indirection is used in the specs in order to
// not pollute the global `window` object with the public API properties.

var iframeContext = void 0;

function getWindowContext() {
  return iframeContext || window.Scrivito;
}

// For test purpose only.
function setWindowContext(newIframeContext) {
  iframeContext = newIframeContext;
}

exports.getWindowContext = getWindowContext;
exports.setWindowContext = setWindowContext;

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function devicePixelRatio() {
  var windowObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  return windowObject.devicePixelRatio || 1;
}

function location() {
  return window.location;
}

function redirectTo(newLocation) {
  window.location = newLocation;
}

function history() {
  return window.history;
}

function onpopstate() {
  return window.onpopstate;
}

function setOnpopstate(value) {
  window.onpopstate = value;
}

function screen() {
  return window.screen;
}

function getDocument() {
  return document;
}

exports.devicePixelRatio = devicePixelRatio;
exports.history = history;
exports.location = location;
exports.onpopstate = onpopstate;
exports.redirectTo = redirectTo;
exports.screen = screen;
exports.setOnpopstate = setOnpopstate;
exports.getDocument = getDocument;

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.deserializeAsInteger = deserializeAsInteger;
exports.isValidInteger = isValidInteger;
exports.isValidFloat = isValidFloat;
exports.deserializeAsDate = deserializeAsDate;
exports.parseStringToDate = parseStringToDate;
exports.formatDateToString = formatDateToString;
exports.isValidDateString = isValidDateString;

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INTEGER_RANGE_START = -9007199254740991;
var INTEGER_RANGE_END = 9007199254740991;
var BACKEND_FORMAT_REGEXP = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;

function deserializeAsInteger(value) {
  if (_underscore2.default.isString(value)) {
    if (value.match(/^-?\d+$/)) {
      return convertToInteger(value);
    }
    return null;
  }
  return convertToInteger(value);
}

function isValidInteger(value) {
  return isInteger(value) && INTEGER_RANGE_START <= value && value <= INTEGER_RANGE_END;
}

function isValidFloat(value) {
  return _underscore2.default.isNumber(value) && _underscore2.default.isFinite(value);
}

function deserializeAsDate(value) {
  if (!_underscore2.default.isString(value)) {
    return null;
  }

  if (!isValidDateString(value)) {
    throw new _errors.InternalError('The value is not a valid ISO date time: "' + value + '"');
  }

  return parseStringToDate(value);
}

function parseStringToDate(dateString) {
  if (!dateString) {
    return;
  }

  var _dateString$match = dateString.match(BACKEND_FORMAT_REGEXP),
      _dateString$match2 = _slicedToArray(_dateString$match, 7),
      _match = _dateString$match2[0],
      year = _dateString$match2[1],
      month = _dateString$match2[2],
      day = _dateString$match2[3],
      hours = _dateString$match2[4],
      minutes = _dateString$match2[5],
      seconds = _dateString$match2[6];

  return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
}

function formatDateToString(date) {
  var yearMonth = '' + date.getUTCFullYear() + pad(date.getUTCMonth() + 1);
  var dateHours = '' + pad(date.getUTCDate()) + pad(date.getUTCHours());
  var minutesSeconds = '' + pad(date.getUTCMinutes()) + pad(date.getUTCSeconds());
  return '' + yearMonth + dateHours + minutesSeconds;
}

function isValidDateString(dateString) {
  return _underscore2.default.isString(dateString) && dateString.match(/^\d{14}$/);
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

function isInteger(value) {
  return _underscore2.default.isNumber(value) && _underscore2.default.isFinite(value) && Math.floor(value) === value;
}

function convertToInteger(valueFromBackend) {
  var intValue = parseInt(valueFromBackend, 10);

  if (intValue === 0) {
    return 0; // otherwise -0 could be returned.
  } else if (isValidInteger(intValue)) {
    return intValue;
  }

  return null;
}

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isUsingRailsEngine = void 0;

function useRailsEngine() {
  return isUsingRailsEngine;
}

function initUseRailsEngine(state) {
  isUsingRailsEngine = state;
}

exports.useRailsEngine = useRailsEngine;
exports.initUseRailsEngine = initUseRailsEngine;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binary_utils = __webpack_require__(58);

var BinaryUtils = _interopRequireWildcard(_binary_utils);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _binary = __webpack_require__(25);

var _binary2 = _interopRequireDefault(_binary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FutureBinary = function () {
  function FutureBinary() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, FutureBinary);

    if (options.idToCopy) {
      this.idToCopy = options.idToCopy;
    } else {
      validateParams(options);
      this.source = options.source;
    }

    if (options.filename) {
      this.filename = options.filename.replace(/[^\w\-_\.$]/g, '-');
    }

    this.contentType = options.contentType;
  }

  // public API


  _createClass(FutureBinary, [{
    key: 'into',
    value: function into(target) {
      var targetId = void 0;

      if (_underscore2.default.isString(target)) {
        targetId = target;
      } else {
        targetId = target.id();
      }

      var binaryPromise = void 0;

      if (this.idToCopy) {
        binaryPromise = scrivito.BinaryRequest.copy(this.idToCopy, targetId, this.filename, this.contentType);
      } else {
        binaryPromise = scrivito.BinaryRequest.upload(targetId, this.source, this.filename, this.contentType);
      }

      return binaryPromise.then(function (_ref) {
        var id = _ref.id;
        return new _binary2.default(id, false);
      });
    }
  }]);

  return FutureBinary;
}();

function validateParams(options) {
  if (!BinaryUtils.isBlob(options.source)) {
    throw new _errors.ArgumentError('Expected a Blob or File as the source.');
  }

  if (!options.contentType) {
    options.contentType = options.source.type;
  }

  if (!options.filename) {
    if (!BinaryUtils.isFile(options.source)) {
      throw new _errors.ArgumentError('Expected a filename to be passed with Blob as the source.');
    }
    options.filename = options.source.name;
  }
}

exports.default = FutureBinary;

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.18.7
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(79), __webpack_require__(77), __webpack_require__(78));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(79), __webpack_require__(77), __webpack_require__(78)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
  }
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  URI.version = '1.18.7';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {};
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };
  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    if (v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
      }

      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
    }
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v !== undefined) {
      if (v) {
        // accept trailing ://
        v = v.replace(/:(\/\/)?$/, '');

        if (!v.match(URI.protocol_expression)) {
          throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
        }
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        if (v.match(/[^0-9]/)) {
          throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
        }
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = {};
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
    }
    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v) {
        URI.ensureValidHostname(v);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      URI.ensureValidHostname(v);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (!resolved._parts.protocol) {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-empty-interface */
var errors_es6_1 = __webpack_require__(1);
var state_tree_1 = __webpack_require__(115);
var globalState;
var stateController;
function initializeGlobalState(ui) {
    if (!ui) {
        // we are the top-level window, so we own the globalState.
        globalState = new state_tree_1.default();
        stateController = globalState;
        exports.appState = createAppState();
        exports.cmsState = globalState.subState('cms');
        exports.uiState = globalState.subState('ui');
    }
    else {
        // we are inside an iFrame, so we don't own the globalState,
        // but rely on the UI instead.
        globalState = undefined;
        stateController = ui.stateController();
        exports.appState = ui.createAppState();
        exports.cmsState = ui.cmsState();
    }
}
exports.initializeGlobalState = initializeGlobalState;
var appStateCounter = 0;
function createAppState() {
    if (!globalState) {
        // createAppState should never be called inside an iFrame
        throw new errors_es6_1.InternalError();
    }
    var id = (appStateCounter++).toString();
    var apps = globalState.subState('apps');
    return apps.subState(id);
}
exports.createAppState = createAppState;
function withBatchedUpdates(fn) {
    return stateController.withBatchedUpdates(fn);
}
exports.withBatchedUpdates = withBatchedUpdates;
function subscribe(fn) {
    return stateController.subscribe(fn);
}
exports.subscribe = subscribe;
function trackChanges(fn) {
    return stateController.trackChanges(fn);
}
exports.trackChanges = trackChanges;
// for test purposes only
function listenerCount() {
    if (!globalState) {
        throw new errors_es6_1.InternalError();
    }
    return globalState.listenerCount();
}
exports.listenerCount = listenerCount;
// for test purposes only
function reset() {
    if (!globalState) {
        throw new errors_es6_1.InternalError();
    }
    globalState.clear();
}
exports.reset = reset;


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentPage = exports.replaceCurrentPage = exports.currentPageError = exports.currentPageParams = exports.currentPage = undefined;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _underscore = __webpack_require__(0);

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

var _errors = __webpack_require__(1);

var _load = __webpack_require__(12);

var _load2 = _interopRequireDefault(_load);

var _window_context = __webpack_require__(30);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextVersion = 0;

// public API
function currentPage() {
  var _getState = getState(),
      objId = _getState.objId;

  if ((0, _underscore.isNull)(objId)) {
    return objId;
  }
  if (!objId) {
    return;
  }

  try {
    return scrivito.loadWithDefault(undefined, function () {
      var appModelAccessor = (0, _window_context.getWindowContext)().appModelAccessor;
      var modelClass = (0, _window_context.getWindowContext)().Obj;

      var obj = appModelAccessor.getObj(modelClass, objId);

      if (obj) {
        return obj;
      }

      throw new _errors.ResourceNotFoundError('Obj with id "' + objId + '" not found.');
    });
  } catch (error) {
    scrivito.nextTick(function () {
      return advanceWithError(nextVersion, error);
    });
    return;
  }
}

// public API
function currentPageParams() {
  return getState().queryParameters || {};
}

function currentPageError() {
  return getState().error;
}

function replaceCurrentPage(fn) {
  var beforeSetCallback = function beforeSetCallback(_ref) {
    var obj = _ref.obj,
        queryParameters = _ref.queryParameters,
        hash = _ref.hash;

    if (obj) {
      scrivito.BrowserLocation.replaceWith({ obj: obj, queryParameters: queryParameters, hash: hash });
    }
  };
  setCurrentPage(fn, beforeSetCallback);
}

function setCurrentPage(fn, beforeSetCallback) {
  if (!(0, _underscore.isFunction)(fn)) {
    throw new _errors.ArgumentError('Parameter fn needs to be a function.');
  }

  var version = generateNextVersion();

  (0, _load2.default)(fn).then(function (target) {
    return (0, _load2.default)(function () {
      return extractRoutingTarget(target.obj, target.queryParameters, target.hash);
    });
  }).then(function (_ref2) {
    var obj = _ref2.obj,
        url = _ref2.url,
        queryParameters = _ref2.queryParameters,
        hash = _ref2.hash;

    beforeSetCallback({ obj: obj, queryParameters: queryParameters, hash: hash });
    if (url) {
      advance(version, function () {
        return scrivito.changeLocation(url);
      });
    } else {
      advance(version, function () {
        return setStateForTarget({ obj: obj, queryParameters: queryParameters, hash: hash });
      });
    }
  }).catch(function (error) {
    if (error instanceof _errors.NavigateToEmptyBinaryError) {
      return;
    }
    advanceWithError(version, error);
  });
}

function state() {
  return _global_state.appState.subState('currentPage');
}

function getState() {
  return state().get() || {};
}

function setState(newState) {
  state().set(newState);
}

function generateNextVersion() {
  nextVersion += 1;
  return nextVersion;
}

function advance(version, changeTheState) {
  if (nextVersion === version) {
    changeTheState();
  }
}

function advanceWithError(version, error) {
  advance(version, function () {
    scrivito.logError(error);
    setState({ objId: null, error: error });
    setUiCurrentPage(null);
  });
}

function setStateForTarget(_ref3) {
  var obj = _ref3.obj,
      queryParameters = _ref3.queryParameters,
      hash = _ref3.hash;

  var objId = obj && obj.id() || null;
  setState({ objId: objId, queryParameters: queryParameters, hash: hash });
  setUiCurrentPage(objId);
}

function setUiCurrentPage(objId) {
  if (scrivito.uiAdapter) {
    scrivito.uiAdapter.setCurrentPageId(objId);
  }
}

function extractRoutingTarget(objOrLink, queryParameters, hash) {
  assertValidBasicTarget(objOrLink);

  if (objOrLink === null) {
    return {};
  }

  if (objOrLink instanceof _basic_obj2.default) {
    return extractRoutingTargetForObj(objOrLink, queryParameters, hash);
  }

  if (objOrLink instanceof _basic_link2.default) {
    return extractRoutingTargetForLink(objOrLink, queryParameters, hash);
  }
}

function extractRoutingTargetForObj(obj, queryParameters, hash) {
  if (isBinary(obj)) {
    var blob = obj.get('blob', ['binary']);

    if (!blob) {
      throw new _errors.NavigateToEmptyBinaryError();
    }

    return { url: blob.url() };
  }

  return { obj: obj, queryParameters: queryParameters, hash: hash };
}

function extractRoutingTargetForLink(link, queryParameters, hash) {
  if (link.isExternal()) {
    return { url: link.url() };
  }

  var routingTarget = {
    obj: link.obj(),
    queryParameters: link.queryParameters(),
    hash: link.hash()
  };

  if (queryParameters && !(0, _underscore.isEmpty)(queryParameters)) {
    routingTarget.queryParameters = queryParameters;
  }

  if (hash) {
    routingTarget.hash = hash;
  }

  return extractRoutingTarget(routingTarget.obj, routingTarget.queryParameters, routingTarget.hash);
}

function assertValidBasicTarget(target) {
  if ((0, _underscore.isNull)(target)) {
    return;
  }
  if (target instanceof _basic_obj2.default) {
    return;
  }
  if (target instanceof _basic_link2.default) {
    return;
  }

  if (!target) {
    throw new _errors.ArgumentError('Missing target.');
  }

  throw new _errors.ArgumentError('Target is invalid. Valid targets are instances of Obj or Link.');
}

function isBinary(basicObj) {
  var klass = (0, _window_context.getWindowContext)().getClass(basicObj.objClass());
  if (!klass) {
    return false;
  }

  var schema = _schema2.default.forClass(klass);
  return schema.isBinary();
}

exports.currentPage = currentPage;
exports.currentPageParams = currentPageParams;
exports.currentPageError = currentPageError;
exports.replaceCurrentPage = replaceCurrentPage;
exports.setCurrentPage = setCurrentPage;

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = preload;
exports.createObjData = createObjData;
exports.store = store;
exports.set = set;
exports.setError = setError;
exports.get = get;
exports.clearCache = clearCache;

var _obj_data = __webpack_require__(150);

var _obj_data2 = _interopRequireDefault(_obj_data);

var _load = __webpack_require__(12);

var _load2 = _interopRequireDefault(_load);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preload(id) {
  (0, _load2.default)(function () {
    return get(id);
  });
}

function createObjData(id) {
  var objData = objDataFor(id);
  objData.set(null);

  scrivito.ObjReplication.get(id).notifyBackendState(null);

  return objData;
}

function store(primitiveObj) {
  var id = primitiveObj._id;
  if (!objDataFor(id).isAvailable()) {
    set(id, primitiveObj);
  }
  scrivito.ObjReplication.get(id).notifyBackendState(primitiveObj);
}

function set(id, primitiveObj) {
  objDataFor(id).set(primitiveObj);
}

// test method only!
function setError(id, error) {
  objDataFor(id).setError(error);
}

function get(id) {
  var objData = objDataFor(id);

  if (objData.current === undefined) {
    return;
  }

  return objData;
}

function clearCache() {
  cacheStore().clear();
}

function cacheStore() {
  return _global_state.cmsState.subState('objData');
}

function objDataFor(id) {
  return new _obj_data2.default(id, cacheStore().subState(id));
}

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEditingMode;
function isEditingMode() {
  if (scrivito.uiAdapter) {
    return scrivito.uiAdapter.isEditingMode();
  }

  return false;
}

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindowRegistry = undefined;

var _window_context = __webpack_require__(30);

function getWindowRegistry() {
  return (0, _window_context.getWindowContext)()._privateRealm._registry;
}

exports.getWindowRegistry = getWindowRegistry;

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _schema = __webpack_require__(19);

var _schema2 = _interopRequireDefault(_schema);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppModelAccessor = function () {
  function AppModelAccessor(registry) {
    _classCallCheck(this, AppModelAccessor);

    this._registry = registry;
  }

  _createClass(AppModelAccessor, [{
    key: 'getObj',
    value: function getObj(modelClass, id) {
      var instance = _basic_obj2.default.get(id);
      return this._checkObjClassAndWrapInAppClass(modelClass, instance);
    }
  }, {
    key: 'getObjIncludingDeleted',
    value: function getObjIncludingDeleted(modelClass, id) {
      var instance = _basic_obj2.default.getIncludingDeleted(id);
      return this._checkObjClassAndWrapInAppClass(modelClass, instance);
    }
  }, {
    key: 'read',
    value: function read(model, attributeName) {
      var basicField = _schema2.default.basicFieldFor(model, attributeName);
      if (!basicField) {
        return;
      }

      var internalValue = basicField.get();
      return scrivito.wrapInAppClass(this._registry, internalValue);
    }
  }, {
    key: 'update',
    value: function update(model, attributes) {
      var appClassName = this._registry.objClassNameFor(model.constructor);
      if (!appClassName) {
        var baseClass = void 0;

        if (model.constructor === this._registry.defaultClassForObjs) {
          baseClass = 'Obj';
        } else {
          baseClass = 'Widget';
        }

        throw new _errors.ArgumentError('Updating is not supported on the base class "' + baseClass + '".');
      }

      if (attributes.constructor !== Object) {
        throw new _errors.ArgumentError('The provided attributes are invalid. They have ' + 'to be an Object with valid Scrivito attribute values.');
      }

      var schema = _schema2.default.forInstance(model);
      var attributesWithTypeInfo = scrivito.AttributeContentFactory.prepareAttributes(attributes, schema, appClassName);
      model._scrivitoPrivateContent.update(attributesWithTypeInfo);
    }
  }, {
    key: 'wrapInAppClass',
    value: function wrapInAppClass(instance) {
      return scrivito.wrapInAppClass(this._registry, instance);
    }
  }, {
    key: '_checkObjClassAndWrapInAppClass',
    value: function _checkObjClassAndWrapInAppClass(modelClass, instance) {
      var objClassName = this._registry.objClassNameFor(modelClass);

      if (objClassName && objClassName !== instance.objClass()) {
        throw new _errors.ResourceNotFoundError('Obj with id "' + instance.id() + '" is not of type "' + objClassName + '".');
      }

      return this.wrapInAppClass(instance);
    }
  }]);

  return AppModelAccessor;
}();

exports.default = AppModelAccessor;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_es6_1 = __webpack_require__(1);
var LoadHandler = __webpack_require__(113);
var loadable_value_1 = __webpack_require__(114);
var loadIdCounter = 0;
var captureNotLoadedStackTrace = true;
var allDataLoadedDuringRun;
var expectedErrors = [
    errors_es6_1.ResourceNotFoundError,
];
var LoadableData = /** @class */ (function () {
    // state is the stateContainer where the LoadableData should store its state.
    function LoadableData(_a) {
        var state = _a.state, loader = _a.loader, invalidation = _a.invalidation, throwNotLoaded = _a.throwNotLoaded;
        if (!state) {
            throw new errors_es6_1.InternalError('LoadableData needs state');
        }
        this.value = new loadable_value_1.default(state);
        this.loader = loader;
        this.invalidation = invalidation;
        this.throwNotLoaded = throwNotLoaded || false;
    }
    LoadableData.throwNotLoaded = function () {
        allDataLoadedDuringRun = false;
        throw new scrivito.NotLoadedError(captureNotLoadedStackTrace);
    };
    LoadableData.capture = function (fn) {
        return LoadHandler.capture(fn);
    };
    LoadableData.run = function (loadableFunction) {
        var allDataLoadedBefore = allDataLoadedDuringRun;
        allDataLoadedDuringRun = true;
        try {
            var result = withoutNotLoadedStackTrace(loadableFunction);
            return {
                success: true,
                result: result,
                allDataLoaded: allDataLoadedDuringRun,
            };
        }
        catch (error) {
            if (allDataLoadedDuringRun) {
                throw error;
            }
            return {
                success: false,
                allDataLoaded: false,
            };
        }
        finally {
            allDataLoadedDuringRun = allDataLoadedBefore;
        }
    };
    // Access the LoadableData synchronously, assuming it is available.
    // If the LoadableData is an error, the error is thrown.
    // If the LoadableData is missing or loading, undefined will be returned.
    // if `throwNotLoaded` has been configured, a NotLoadedError is thrown instead.
    LoadableData.prototype.get = function () {
        var _this = this;
        if (this.isAvailable()) {
            this.reloadIfOutdated();
            return this.value.value();
        }
        if (this.isError()) {
            this.reloadIfOutdated();
            throw this.hydrateError(this.value.error());
        }
        allDataLoadedDuringRun = false;
        LoadHandler.notifyMissingData(function () { return _this.progressLoading(); });
        if (this.throwNotLoaded) {
            LoadableData.throwNotLoaded();
        }
    };
    // set the data to a value. this makes the value available.
    LoadableData.prototype.set = function (value) {
        this.value.transitionToAvailable(value, this.currentVersion());
    };
    // set the data to an error.
    LoadableData.prototype.setError = function (error) {
        this.transitionToError(error);
    };
    // transition back to missing, removes any value or errors.
    LoadableData.prototype.reset = function () {
        this.value.transitionToMissing();
    };
    // returns true iff the value is missing
    LoadableData.prototype.isMissing = function () {
        return this.value.status() === 'MISSING';
    };
    // returns true iff the value not available and not an error, but
    // has started loading.
    LoadableData.prototype.isLoading = function () {
        return this.value.getLoading() !== undefined;
    };
    // return true iff value is available.
    LoadableData.prototype.isAvailable = function () {
        return this.value.status() === 'AVAILABLE';
    };
    // return true iff an error was set.
    LoadableData.prototype.isError = function () {
        return this.value.status() === 'ERROR';
    };
    // trigger loading the data. does nothing if the data is already loading.
    LoadableData.prototype.triggerLoading = function () {
        var _this = this;
        if (this.isLoading()) {
            return;
        }
        var loadId = loadIdCounter++;
        var ifUnchanged = function (fn) {
            if (_this.value.getLoading() === loadId) {
                fn();
            }
        };
        var versionWhenLoadingStarted = this.currentVersion();
        var pushCallbacks = [];
        var addPushCallback = function (callback) { return pushCallbacks.push(callback); };
        var runPushCallbacks = function () { return pushCallbacks.forEach(function (callback) { return callback(); }); };
        this.loader(addPushCallback).then(function (result) {
            return ifUnchanged(function () {
                return scrivito.batchedStateUpdater.add(function () {
                    _this.value.transitionToAvailable(result, versionWhenLoadingStarted);
                    runPushCallbacks();
                });
            });
        }, function (error) {
            return ifUnchanged(function () {
                return scrivito.batchedStateUpdater.add(function () {
                    _this.transitionToError(error, versionWhenLoadingStarted);
                    runPushCallbacks();
                });
            });
        });
        this.value.setLoading(loadId);
    };
    LoadableData.prototype.transitionToError = function (error, version) {
        if (version === void 0) { version = this.currentVersion(); }
        this.value.transitionToError(this.dehydrateError(error), version);
    };
    LoadableData.prototype.dehydrateError = function (error) {
        var id = expectedErrors.indexOf(error.constructor);
        if (id >= 0) {
            return { type: 'dehydrated', id: id, message: error.message };
        }
        return { type: 'live', error: error };
    };
    LoadableData.prototype.hydrateError = function (stored) {
        if (stored.type === 'dehydrated') {
            var klass = expectedErrors[stored.id];
            return new klass(stored.message);
        }
        var rawError = stored.error;
        if (rawError) {
            return rawError;
        }
        throw new errors_es6_1.InternalError('could not hydrate error');
    };
    LoadableData.prototype.reloadIfOutdated = function () {
        var _this = this;
        if (this.hasBeenInvalidated()) {
            LoadHandler.notifyOutdatedData(function () { return _this.progressLoading(); });
        }
    };
    LoadableData.prototype.progressLoading = function () {
        if (this.hasBeenInvalidated() || (!this.isAvailable() && !this.isError())) {
            this.triggerLoading();
        }
    };
    LoadableData.prototype.hasBeenInvalidated = function () {
        if (!this.invalidation) {
            return false;
        }
        return this.currentVersion() !== this.value.version();
    };
    LoadableData.prototype.currentVersion = function () {
        var callback = this.invalidation;
        if (!callback) {
            return;
        }
        var version = callback();
        // protect against "crazy" objects like NaN
        if (typeof version === 'number' && isNaN(version)) {
            var message = "invalidation callback returned unsuitable version " + version;
            throw new errors_es6_1.InternalError(message);
        }
        return version;
    };
    return LoadableData;
}());
exports.default = LoadableData;
function withoutNotLoadedStackTrace(fn) {
    var beforeStackTrace = captureNotLoadedStackTrace;
    try {
        captureNotLoadedStackTrace = false;
        return fn();
    }
    finally {
        captureNotLoadedStackTrace = beforeStackTrace;
    }
}


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.registerForId = exports.registerForAppClass = exports.getById = exports.getByAppClass = undefined;

var _window_registry = __webpack_require__(48);

var registry = {};

function registerForId(componentId, componentClass) {
  registry[componentId] = componentClass;
}

function getById(componentId) {
  return registry[componentId] || null;
}

function registerForAppClass(appClass, componentClass) {
  registerForId(idForAppClass(appClass), componentClass);
}

function getByAppClass(appClass) {
  return getById(idForAppClass(appClass));
}

// For test purpose only.
function reset() {
  registry = {};
}

function idForAppClass(appClass) {
  var className = (0, _window_registry.getWindowRegistry)().objClassNameFor(appClass);
  return '_scrivitoAppClass-' + className;
}

exports.getByAppClass = getByAppClass;
exports.getById = getById;
exports.registerForAppClass = registerForAppClass;
exports.registerForId = registerForId;
exports.reset = reset;

/***/ }),

/***/ 52:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.apply = apply;
exports.diff = diff;

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function apply(primitiveObj, patch) {
  if (!primitiveObj) {
    return patch;
  }
  if (!patch) {
    return null;
  }

  var updatedPrimitiveObj = {};

  eachKeyFrom(primitiveObj, patch, function (attribute, objValue, patchValue) {
    if (attribute === '_widget_pool') {
      updatedPrimitiveObj._widget_pool = buildUpdatedWidgetPool(objValue, patchValue);
    } else if (patch.hasOwnProperty(attribute)) {
      if (patchValue) {
        updatedPrimitiveObj[attribute] = patchValue;
      }
    } else {
      updatedPrimitiveObj[attribute] = primitiveObj[attribute];
    }
  });

  return updatedPrimitiveObj;
}

function diff(primitiveObjA, primitiveObjB) {
  if (!primitiveObjA) {
    return primitiveObjB;
  }
  if (!primitiveObjB) {
    return null;
  }

  var patch = {};

  eachKeyFrom(primitiveObjA, primitiveObjB, function (attribute, valueInA, valueInB) {
    if (attribute === '_widget_pool') {
      var widgetPoolPatch = buildWidgetPoolPatch(valueInA, valueInB);

      if (!_underscore2.default.isEmpty(widgetPoolPatch)) {
        patch._widget_pool = widgetPoolPatch;
      }
    } else {
      var patchValue = buildPatchEntry(valueInA, valueInB, function () {
        if (!_underscore2.default.isEqual(valueInA, valueInB)) {
          return valueInB;
        }
      });

      if (patchValue !== undefined) {
        patch[attribute] = patchValue;
      }
    }
  });

  return patch;
}

function eachKeyFrom(objectA, objectB, handler) {
  _underscore2.default.union(_underscore2.default.keys(objectA), _underscore2.default.keys(objectB)).forEach(function (key) {
    return handler(key, workspaceAwareObject(objectA[key]), workspaceAwareObject(objectB[key]));
  });
}

function workspaceAwareObject(object) {
  if (_underscore2.default.isArray(object)) {
    var _object = _slicedToArray(object, 2),
        type = _object[0],
        value = _object[1];

    // Ignore binary URLs, since they are different across workspaces.
    // However, a binary ID identifies a binary unambiguously.


    if (type === 'binary' && value) {
      return [type, _underscore2.default.omit(value, 'url')];
    }

    return object;
  }

  return object;
}

function buildUpdatedWidgetPool(widgetPool, widgetPoolPatch) {
  if (!widgetPoolPatch || _underscore2.default.isEmpty(widgetPoolPatch)) {
    return widgetPool;
  }

  var updatedWidgetPool = {};

  eachKeyFrom(widgetPool || {}, widgetPoolPatch || {}, function (id, widget, widgetPatch) {
    if (widgetPoolPatch.hasOwnProperty(id)) {
      if (widgetPatch && !widget) {
        updatedWidgetPool[id] = widgetPatch;
      } else if (widgetPatch) {
        updatedWidgetPool[id] = apply(widget, widgetPatch);
      }
    } else {
      updatedWidgetPool[id] = widget;
    }
  });

  return updatedWidgetPool;
}

function buildPatchEntry(valueA, valueB, fnHandleBoth) {
  if (!valueA && valueB) {
    return valueB;
  }

  if (valueA && !valueB) {
    return null;
  }

  if (valueA && valueB) {
    return fnHandleBoth();
  }
}

function buildWidgetPoolPatch(widgetPoolA, widgetPoolB) {
  if (widgetPoolA === widgetPoolB) {
    return {};
  }

  var patch = {};

  eachKeyFrom(widgetPoolA, widgetPoolB, function (widgetId, widgetA, widgetB) {
    var widgetValue = buildPatchEntry(widgetA, widgetB, function () {
      var widgetPatch = diff(widgetA, widgetB);

      if (!_underscore2.default.isEmpty(widgetPatch)) {
        return widgetPatch;
      }
    });

    if (widgetValue !== undefined) {
      patch[widgetId] = widgetValue;
    }
  });

  return patch;
}

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function arrayFromIterable(iterable, size) {
    var iterator = iterable.iterator();
    var result = [];
    while (result.length !== size) {
        var next = iterator.next();
        if (next.done) {
            return result;
        }
        result.push(next.value);
    }
    return result;
}
exports.arrayFromIterable = arrayFromIterable;
function firstValueFromIterable(iterable) {
    var value = iterable.iterator().next().value;
    return value || null;
}
exports.firstValueFromIterable = firstValueFromIterable;


/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInsideExtensionsDocument;

var _window_proxy = __webpack_require__(31);

var window = _interopRequireWildcard(_window_proxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function isInsideExtensionsDocument() {
  return !!window.location().pathname.match('_scrivito_extensions.html');
}

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createObjFromLegacyAttributes = createObjFromLegacyAttributes;
exports.newWidget = newWidget;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _binary_utils = __webpack_require__(58);

var BinaryUtils = _interopRequireWildcard(_binary_utils);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _uploaded_blob = __webpack_require__(98);

var _uploaded_blob2 = _interopRequireDefault(_uploaded_blob);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _binary = __webpack_require__(25);

var _binary2 = _interopRequireDefault(_binary);

var _future_binary = __webpack_require__(36);

var _future_binary2 = _interopRequireDefault(_future_binary);

var _obj_class = __webpack_require__(21);

var _obj_class2 = _interopRequireDefault(_obj_class);

var _widget_class = __webpack_require__(24);

var _widget_class2 = _interopRequireDefault(_widget_class);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createObjFromLegacyAttributes(attributes) {
  var objClassName = attributes._obj_class;
  var objClass = _obj_class2.default.find(objClassName);
  var objId = _basic_obj2.default.generateId();

  if (!objClass) {
    return scrivito.Promise.reject(new _errors.ArgumentError('Please provide a valid CMS object class as the "_obj_class" property.'));
  }

  var _separateAttributesFo = separateAttributesForDefault(attributes),
      _separateAttributesFo2 = _slicedToArray(_separateAttributesFo, 2),
      attributesForDefault = _separateAttributesFo2[0],
      binaryValues = _separateAttributesFo2[1];

  var fetchDefaultPromise = fetchDefaults(objClass, attributesForDefault);
  var uploadBinariesPromise = uploadBinaryValues(objId, binaryValues);

  return scrivito.Promise.all([fetchDefaultPromise, uploadBinariesPromise]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        serializedDefaultAttributes = _ref2[0],
        uploadedBinaryAttributes = _ref2[1];

    return _basic_obj2.default.createWithSerializedAttributes(_underscore2.default.extend(serializedDefaultAttributes, uploadedBinaryAttributes, { _id: objId }));
  }).then(function (createdObj) {
    return createdObj.finishSaving().then(function () {
      return createdObj;
    });
  });
}

function newWidget(className) {
  var widgetClass = _widget_class2.default.find(className);
  return widgetClass.fetchDefaults().then(function (widgetDefaults) {
    return _basic_widget2.default.newWithSerializedAttributes(widgetDefaults);
  });
}

function fetchDefaults(objClass, attributes) {
  if (objClass.usesServerCallbacks()) {
    return objClass.fetchDefaults(serializeAttributesForApplication(attributes), context());
  }

  return scrivito.Promise.resolve(attributes);
}

function separateAttributesForDefault(attributes) {
  var attributesForDefault = {};
  var ignoredAttributes = {};

  _underscore2.default.each(attributes, function (value, name) {
    if (isBinary(value)) {
      ignoredAttributes[name] = value;
    } else {
      attributesForDefault[name] = value;
    }
  });

  return [attributesForDefault, ignoredAttributes];
}

function serializeAttributesForApplication(attributes) {
  return _underscore2.default.mapObject(attributes, function (value) {
    if (_underscore2.default.isDate(value)) {
      return moment.utc(value).toISOString();
    }

    return value;
  });
}

function isBinary(value) {
  return BinaryUtils.isFile(value) || value instanceof _future_binary2.default || value instanceof _uploaded_blob2.default;
}

function uploadBinaryValues(objId, binaryValues) {
  var promises = _underscore2.default.map(binaryValues, function (value, name) {
    if (BinaryUtils.isFile(value)) {
      return serializeFile(objId, name, value);
    }

    if (value instanceof _uploaded_blob2.default) {
      return serializeUploadedBlob(objId, name, value);
    }

    if (value instanceof _future_binary2.default) {
      return serializeFutureBinary(objId, name, value);
    }
  });

  return scrivito.Promise.all(promises).then(_underscore2.default.object);
}

function serializeFile(objId, attrName, file) {
  return serializeFutureBinary(objId, attrName, _binary2.default.upload(file));
}

function serializeUploadedBlob(objId, attrName, uploadedBlob) {
  return serializeFutureBinary(objId, attrName, uploadedBlob.copy());
}

function serializeFutureBinary(objId, attrName, futureBinary) {
  return futureBinary.into(objId).then(function (binary) {
    return [attrName, ['binary', { id: binary.id() }]];
  });
}

function context() {
  if (scrivito.applicationDocument().hasCurrentPage()) {
    return { current_page_id: scrivito.applicationDocument().pageId() };
  }
}

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(0);

var _errors = __webpack_require__(1);

var _window_context = __webpack_require__(30);

var _current_page = __webpack_require__(40);

var _scroll_window_to_top = __webpack_require__(242);

var _scroll_window_to_top2 = _interopRequireDefault(_scroll_window_to_top);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// public API
function navigateTo(target, options) {
  var fn = target;
  var params = void 0;
  var hashParam = void 0;

  if (!(0, _underscore.isFunction)(target)) {
    fn = function fn() {
      return target;
    };
    assertValidTarget(target);
  }

  if (options) {
    params = options.params || {};
    hashParam = options.hash;
    params = (0, _underscore.extend)((0, _underscore.omit)(options, 'hash', 'params'), params);
  }

  var basicFn = function basicFn() {
    return {
      obj: scrivito.unwrapAppClassValues(fn()),
      queryParameters: params,
      hash: hashParam
    };
  };

  var beforeSetCallback = function beforeSetCallback(_ref) {
    var obj = _ref.obj,
        queryParameters = _ref.queryParameters,
        hash = _ref.hash;

    if (obj) {
      (0, _scroll_window_to_top2.default)();
      scrivito.BrowserLocation.pushWith({ obj: obj, queryParameters: queryParameters, hash: hash });
    }
  };

  (0, _current_page.setCurrentPage)(basicFn, beforeSetCallback);
}

function assertValidTarget(target) {
  if ((0, _underscore.isNull)(target)) {
    return;
  }
  if (target instanceof (0, _window_context.getWindowContext)().Obj) {
    return;
  }
  if (target instanceof (0, _window_context.getWindowContext)().Link) {
    return;
  }

  if (!target) {
    throw new _errors.ArgumentError('Missing target.');
  }

  throw new _errors.ArgumentError('Target is invalid. Valid targets are instances of Obj or Link.');
}

exports.default = navigateTo;

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlob = isBlob;
exports.isFile = isFile;

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBlob(obj) {
  return !!obj && _underscore2.default.isNumber(obj.size) && _underscore2.default.isString(obj.type);
}

function isFile(obj) {
  return isBlob(obj) && _underscore2.default.isString(obj.name);
}

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attribute_deserializer = __webpack_require__(143);

var AttributeDeserializer = _interopRequireWildcard(_attribute_deserializer);

var _basic_field = __webpack_require__(86);

var _basic_field2 = _interopRequireDefault(_basic_field);

var _attribute = __webpack_require__(26);

var _attribute2 = _interopRequireDefault(_attribute);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _attribute_inflection = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicAttributeContent = function () {
  function BasicAttributeContent() {
    _classCallCheck(this, BasicAttributeContent);
  }

  _createClass(BasicAttributeContent, [{
    key: 'get',
    value: function get(attributeName, typeInfo) {
      if (!(0, _attribute_inflection.isCamelCase)(attributeName)) {
        throw new _errors.ArgumentError('Attribute names have to be in camel case.');
      }
      var internalAttributeName = (0, _attribute_inflection.underscore)(attributeName);

      if (_attribute2.default.isSystemAttribute(internalAttributeName)) {
        if (_underscore2.default.has(this._systemAttributes, internalAttributeName)) {
          var attribute = this._systemAttributes[internalAttributeName];
          return typeof this[attribute] === 'function' ? this[attribute]() : this[attribute];
        }

        return;
      }

      var _scrivito$typeInfo$no = scrivito.typeInfo.normalize(typeInfo),
          _scrivito$typeInfo$no2 = _slicedToArray(_scrivito$typeInfo$no, 2),
          type = _scrivito$typeInfo$no2[0],
          options = _scrivito$typeInfo$no2[1];

      var rawValue = this._current[internalAttributeName];
      if (!rawValue || !_underscore2.default.isArray(rawValue)) {
        rawValue = [];
      }

      return AttributeDeserializer.deserialize(this, rawValue, type, options);
    }
  }, {
    key: 'field',
    value: function field(attributeName, typeInfo) {
      return new _basic_field2.default({
        container: this,
        attributeName: attributeName,
        typeInfo: scrivito.typeInfo.normalize(typeInfo)
      });
    }
  }, {
    key: 'widget',
    value: function widget(_id) {
      throw new TypeError('Override in subclass.');
    }
  }, {
    key: 'serializeAttributes',
    value: function serializeAttributes() {
      var _this = this;

      var serializedAttrs = {};
      _underscore2.default.each(this._current, function (value, name) {
        if (_underscore2.default.isArray(value) && _underscore2.default.first(value) === 'widgetlist') {
          var publicAttrName = (0, _attribute_inflection.camelCase)(name);
          var serializedAttributes = _underscore2.default.invoke(_this.get(publicAttrName, ['widgetlist']), 'serializeAttributes');
          serializedAttrs[name] = ['widgetlist', serializedAttributes];

          return;
        }

        serializedAttrs[name] = value;
      });

      return serializedAttrs;
    }
  }, {
    key: '_persistWidgets',
    value: function _persistWidgets(obj, attributes) {
      _underscore2.default.each(attributes, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            widgets = _ref2[0],
            typeInfo = _ref2[1];

        if (typeInfo && typeInfo[0] === 'widgetlist') {
          _underscore2.default.each(widgets, function (widget) {
            if (!widget.isPersisted()) {
              widget.persistInObj(obj);
            }
          });
        }
      });
    }
  }, {
    key: '_objClass',
    get: function get() {
      throw new TypeError('Override in subclass.');
    }
  }, {
    key: '_current',
    get: function get() {
      throw new TypeError('Override in subclass.');
    }
  }]);

  return BasicAttributeContent;
}();

exports.default = BasicAttributeContent;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = connect;

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _errors = __webpack_require__(1);

var _is_class_component = __webpack_require__(174);

var _is_class_component2 = _interopRequireDefault(_is_class_component);

var _inherit_component_name = __webpack_require__(173);

var _inherit_component_name2 = _interopRequireDefault(_inherit_component_name);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connect(component) {
  if (typeof component !== 'function') {
    throw new _errors.ArgumentError('Scrivito.connect expects either a plain function or a subclass of React.Component');
  }

  if ((0, _is_class_component2.default)(component)) {
    return connectClassComponent(component);
  }

  return connectClassComponent(wrapInClassComponent(component));
}

function connectClassComponent(classComponent) {
  var connectedComponent = function (_classComponent) {
    _inherits(connectedComponent, _classComponent);

    function connectedComponent() {
      _classCallCheck(this, connectedComponent);

      return _possibleConstructorReturn(this, (connectedComponent.__proto__ || Object.getPrototypeOf(connectedComponent)).apply(this, arguments));
    }

    _createClass(connectedComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        this._scrivitoUnsubscribeModelState = (0, _global_state.subscribe)(function () {
          if (_this2._scrivitoIsStateChangeDetected && _this2._scrivitoIsStateChangeDetected()) {
            _this2.forceUpdate();
          }
        });

        if (_get(connectedComponent.prototype.__proto__ || Object.getPrototypeOf(connectedComponent.prototype), 'componentWillMount', this)) {
          _get(connectedComponent.prototype.__proto__ || Object.getPrototypeOf(connectedComponent.prototype), 'componentWillMount', this).call(this);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._scrivitoUnsubscribeModelState();

        if (_get(connectedComponent.prototype.__proto__ || Object.getPrototypeOf(connectedComponent.prototype), 'componentWillUnmount', this)) {
          _get(connectedComponent.prototype.__proto__ || Object.getPrototypeOf(connectedComponent.prototype), 'componentWillUnmount', this).call(this);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var reactElement = void 0;

        this._scrivitoIsStateChangeDetected = (0, _global_state.trackChanges)(function () {
          try {
            var run = void 0;

            _loadable_data2.default.capture(function () {
              run = _loadable_data2.default.run(function () {
                return _get(connectedComponent.prototype.__proto__ || Object.getPrototypeOf(connectedComponent.prototype), 'render', _this3).call(_this3);
              });
            }).loadRequiredData();

            if (run.allDataLoaded) {
              reactElement = run.result;
            } else {
              var preliminaryResult = run.success ? run.result : null;
              reactElement = _this3._scrivitoHandleLoading(preliminaryResult);
            }
          } catch (error) {
            reactElement = _this3._scrivitoHandleError(error);
          }
        });

        return reactElement;
      }
    }, {
      key: '_scrivitoHandleLoading',
      value: function _scrivitoHandleLoading(preliminaryResult) {
        if (this._scrivitoRenderWhileLoading) {
          return this._scrivitoRenderWhileLoading();
        }

        return preliminaryResult;
      }
    }, {
      key: '_scrivitoHandleError',
      value: function _scrivitoHandleError(error) {
        scrivito.printError(error);

        if (this._scrivitoRenderOnError) {
          return this._scrivitoRenderOnError();
        }

        return null;
      }
    }]);

    return connectedComponent;
  }(classComponent);

  (0, _inherit_component_name2.default)(connectedComponent, { from: classComponent });

  return connectedComponent;
}

function wrapInClassComponent(functionalComponent) {
  var classComponent = function (_React$Component) {
    _inherits(classComponent, _React$Component);

    function classComponent() {
      _classCallCheck(this, classComponent);

      return _possibleConstructorReturn(this, (classComponent.__proto__ || Object.getPrototypeOf(classComponent)).apply(this, arguments));
    }

    _createClass(classComponent, [{
      key: 'render',
      value: function render() {
        return functionalComponent(this.props);
      }
    }]);

    return classComponent;
  }(React.Component);

  (0, _inherit_component_name2.default)(classComponent, { from: functionalComponent });

  return classComponent;
}

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _types = __webpack_require__(32);

var types = _interopRequireWildcard(_types);

var _obj_query_store = __webpack_require__(73);

var ObjQueryStore = _interopRequireWildcard(_obj_query_store);

var _facet_query = __webpack_require__(135);

var _facet_query2 = _interopRequireDefault(_facet_query);

var _underscore = __webpack_require__(0);

var _attribute_inflection = __webpack_require__(13);

var _errors = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OPERATORS = ['contains', 'containsPrefix', 'equals', 'startsWith', 'isGreaterThan', 'isLessThan', 'linksTo', 'refersTo'];
var NEGATEABLE_OPERATORS = ['equals', 'startsWith', 'isGreaterThan', 'isLessThan'];
var BOOSTABLE_PARAMETERS = ['contains', 'containsPrefix'];
var DEFAULT_BATCH_SIZE = 100;

var BasicObjSearchIterable = function () {
  function BasicObjSearchIterable() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BasicObjSearchIterable);

    this._query = params.query || [];
    this._batchSize = params.batchSize;
    this._offset = params.offset;
    this._sortBy = params.sortBy;
    this._sortDirection = params.sortDirection;
    this._includeDeleted = params.includeDeleted;
  }

  _createClass(BasicObjSearchIterable, [{
    key: 'and',
    value: function and(attributeOrSearch, operator, value) {
      var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (attributeOrSearch instanceof BasicObjSearchIterable) {
        this._query = [].concat(_toConsumableArray(this._query), _toConsumableArray(attributeOrSearch._query));
      } else {
        var subQuery = buildSubQuery(attributeOrSearch, operator, value);

        if (boost) {
          assertBoostableOperator(operator);
          subQuery.boost = underscoreBoostAttributes(boost);
        }

        this._query.push(subQuery);
      }

      return this;
    }
  }, {
    key: 'andNot',
    value: function andNot(attribute, operator, value) {
      var subQuery = buildSubQuery(attribute, operator, value);
      assertNegetableOperator(operator);

      subQuery.negate = true;
      this._query.push(subQuery);
      return this;
    }

    // public API

  }, {
    key: 'offset',
    value: function offset(_offset) {
      this._offset = _offset;
      return this;
    }

    // public API

  }, {
    key: 'order',
    value: function order(attribute) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';

      this._sortBy = underscoreAttribute(attribute);
      this._sortDirection = direction;
      return this;
    }

    // public API

  }, {
    key: 'batchSize',
    value: function batchSize(_batchSize) {
      this._batchSize = _batchSize;
      return this;
    }
  }, {
    key: 'includeDeleted',
    value: function includeDeleted() {
      this._includeDeleted = true;
      return this;
    }
  }, {
    key: 'iterator',
    value: function iterator() {
      var queryIterator = ObjQueryStore.get(this.params(), this.getBatchSize()).iterator();

      return {
        next: function next() {
          var _queryIterator$next = queryIterator.next(),
              done = _queryIterator$next.done,
              value = _queryIterator$next.value;

          if (done) {
            return { done: done };
          }

          return { done: done, value: new _basic_obj2.default(value) };
        }
      };
    }
  }, {
    key: 'getBatchSize',
    value: function getBatchSize() {
      return this._batchSize || DEFAULT_BATCH_SIZE;
    }
  }, {
    key: 'facet',
    value: function facet(attribute) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var facetQuery = new _facet_query2.default(underscoreAttribute(attribute), options, this._query);
      return facetQuery.result();
    }
  }, {
    key: 'store',
    value: function store(objIds) {
      ObjQueryStore.store(this.params(), objIds);
    }
  }, {
    key: 'params',
    value: function params() {
      return (0, _underscore.omit)({
        query: this._query,
        offset: this._offset,
        sortBy: this._sortBy,
        sortDirection: this._sortDirection,
        includeDeleted: this._includeDeleted,
        batchSize: this._batchSize
      }, _underscore.isUndefined);
    }
  }]);

  return BasicObjSearchIterable;
}();

exports.default = BasicObjSearchIterable;


function buildSubQuery(camelcasedAttribute, publicOperator, unserializedValue) {
  var attribute = convertAttribute(camelcasedAttribute);
  var operator = convertOperator(publicOperator);
  var value = convertValue(unserializedValue);
  return { field: attribute, operator: operator, value: value };
}

function assertBoostableOperator(operator) {
  if (!(0, _underscore.contains)(BOOSTABLE_PARAMETERS, operator)) {
    throw new _errors.ArgumentError('Boosting operator "' + operator + '" is invalid.');
  }
}

function assertNegetableOperator(operator) {
  if (!(0, _underscore.contains)(NEGATEABLE_OPERATORS, operator)) {
    throw new _errors.ArgumentError('Negating operator "' + operator + '" is invalid.');
  }
}

function convertValue(value) {
  if ((0, _underscore.isArray)(value)) {
    return (0, _underscore.map)(value, convertSingleValue);
  }

  return convertSingleValue(value);
}

function convertSingleValue(value) {
  if ((0, _underscore.isDate)(value)) {
    return types.formatDateToString(value);
  }

  if (value instanceof _basic_obj2.default) {
    return value.id();
  }
  return value;
}

function convertOperator(operator) {
  if (!(0, _underscore.contains)(OPERATORS, operator)) {
    throw new _errors.ArgumentError('Operator "' + operator + '" is invalid.');
  }

  return (0, _attribute_inflection.underscore)(operator);
}

function convertAttribute(attribute) {
  if ((0, _underscore.isArray)(attribute)) {
    return (0, _underscore.map)(attribute, underscoreAttribute);
  }

  return underscoreAttribute(attribute);
}

function underscoreBoostAttributes(boost) {
  var boostWithUnderscoreAttributes = {};

  (0, _underscore.each)(boost, function (value, attributeName) {
    var underscoredAttributeName = underscoreAttribute(attributeName);
    boostWithUnderscoreAttributes[underscoredAttributeName] = value;
  });

  return boostWithUnderscoreAttributes;
}

function underscoreAttribute(attributeName) {
  if (!(0, _attribute_inflection.isCamelCase)(attributeName)) {
    throw new _errors.ArgumentError('Attribute name "' + attributeName + '" is not camel case.');
  }

  return (0, _attribute_inflection.underscore)(attributeName);
}

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentClasses = {};

var ContentClassRegistry = {
  register: function register(type, objClasses) {
    contentClasses[type] = objClasses;
  },
  allForType: function allForType(type) {
    return contentClasses[type];
  },
  findByType: function findByType(type, name) {
    return _underscore2.default.findWhere(this.allForType(type), { name: name });
  }
};

exports.default = ContentClassRegistry;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attribute = __webpack_require__(26);

var _attribute2 = _interopRequireDefault(_attribute);

var _underscore = __webpack_require__(0);

var _errors = __webpack_require__(1);

var _content_class_registry = __webpack_require__(67);

var _content_class_registry2 = _interopRequireDefault(_content_class_registry);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

var _rails_thumbnail = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttributeContentClass = function () {
  _createClass(AttributeContentClass, null, [{
    key: 'init',
    value: function init(classDatas) {
      var _this = this;

      var contentClasses = classDatas.map(function (classData) {
        return new _this(classData);
      });
      _content_class_registry2.default.register(this.type(), contentClasses);
    }
  }, {
    key: 'find',
    value: function find(name) {
      return _content_class_registry2.default.findByType(this.type(), name);
    }
  }, {
    key: 'get',
    value: function get(name) {
      var modelClass = this.find(name);

      if (modelClass) {
        return modelClass;
      }

      throw new _errors.InternalError('Model class "' + name + '" does not exist.');
    }
  }, {
    key: 'all',
    value: function all() {
      return _content_class_registry2.default.allForType(this.type());
    }
  }]);

  function AttributeContentClass(classData) {
    _classCallCheck(this, AttributeContentClass);

    this.name = classData.name;
    this._classData = classData;

    this.attributes = (0, _underscore.map)(classData.attributes, function (attributeData) {
      return new _attribute2.default(attributeData);
    });
  }

  // public


  _createClass(AttributeContentClass, [{
    key: 'title',
    value: function title() {
      return this._classData.title;
    }
  }, {
    key: 'description',
    value: function description() {
      return this._classData.description;
    }
  }, {
    key: 'thumbnail',
    value: function thumbnail() {
      return this._classData.thumbnail;
    }
  }, {
    key: 'hasDetailsView',
    value: function hasDetailsView() {
      if (this.useRailsDetailsTemplate()) {
        return !!this._classData.hasServerDetailsTemplate;
      }

      return this.hasJsDetailsView();
    }
  }, {
    key: 'hasJsDetailsView',
    value: function hasJsDetailsView() {
      return true;
    }
  }, {
    key: 'attribute',
    value: function attribute(name) {
      assertValidAttribute(name);

      return (0, _underscore.findWhere)(this.attributes, { name: name });
    }
  }, {
    key: 'localizedAttributes',
    value: function localizedAttributes() {
      return (0, _underscore.filter)(this.attributes, function (attribute) {
        return !!attribute.title();
      });
    }
  }, {
    key: 'useRailsDetailsTemplate',
    value: function useRailsDetailsTemplate() {
      return this.usesServerCallbacks();
    }
  }, {
    key: 'useRailsThumbnailHtml',
    value: function useRailsThumbnailHtml() {
      return !this._classData.description && !this._classData.thumbnail && !!this._classData.usesServerCallbacks;
    }
  }, {
    key: 'railsThumbnailHtml',
    value: function railsThumbnailHtml() {
      return (0, _rails_thumbnail.getRailsThumbnail)(this.name);
    }
  }, {
    key: 'usesServerCallbacks',
    value: function usesServerCallbacks() {
      return !!this._classData.usesServerCallbacks;
    }
  }, {
    key: 'isHiddenFromEditors',
    value: function isHiddenFromEditors() {
      return !!this._classData.hideFromEditor;
    }
  }, {
    key: 'fetchDefaults',
    value: function fetchDefaults(attributes, context) {
      var path = 'obj_class/' + this.name + '/defaults';

      var getParams = {};
      if (attributes) {
        getParams.attributes = attributes;
      }
      if (context) {
        getParams.context = context;
      }
      if (!(0, _underscore.isEmpty)(getParams)) {
        path += '?' + $.param(getParams);
      }

      return scrivito.Promise.resolve(scrivito.ajax('GET', path));
    }
  }]);

  return AttributeContentClass;
}();

function assertValidAttribute(name) {
  if (!(0, _underscore.isString)(name)) {
    throw new _errors.ArgumentError('Expected a string for attribute name, but got ' + (0, _pretty_print2.default)(name));
  }

  if (!name) {
    throw new _errors.ArgumentError('An empty string is not a valid attribute name');
  }
}

exports.default = AttributeContentClass;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.serialize = serialize;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _types = __webpack_require__(32);

var types = _interopRequireWildcard(_types);

var _basic_widget = __webpack_require__(14);

var _basic_widget2 = _interopRequireDefault(_basic_widget);

var _basic_link = __webpack_require__(17);

var _basic_link2 = _interopRequireDefault(_basic_link);

var _attribute = __webpack_require__(26);

var _attribute2 = _interopRequireDefault(_attribute);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errors = __webpack_require__(1);

var _pretty_print = __webpack_require__(18);

var _pretty_print2 = _interopRequireDefault(_pretty_print);

var _attribute_inflection = __webpack_require__(13);

var _binary = __webpack_require__(25);

var _binary2 = _interopRequireDefault(_binary);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serialize(attributes) {
  var serializedAttributes = {};
  _underscore2.default.each(attributes, function (_ref, name) {
    var _ref2 = _slicedToArray(_ref, 2),
        value = _ref2[0],
        attrInfo = _ref2[1];

    var serializedName = convertCamelCasedAttributeName(name);
    if (_attribute2.default.isSystemAttribute(serializedName)) {
      serializedAttributes[serializedName] = value;
    } else {
      var _attrInfo = _slicedToArray(attrInfo, 2),
          attrType = _attrInfo[0],
          attrOptions = _attrInfo[1];

      serializedAttributes[serializedName] = [serializeAttributeType(attrType, name), valueOrNull(serializeAttributeValue(attrType, attrOptions, value, name))];
    }
  });

  return serializedAttributes;
}

function convertCamelCasedAttributeName(name) {
  if (!(0, _attribute_inflection.isCamelCase)(name)) {
    throw new _errors.ArgumentError('Attribute names have to be in camel case.');
  }

  return (0, _attribute_inflection.underscore)(name);
}

function serializeAttributeType(type, name) {
  switch (type) {
    case 'enum':
      return 'string';
    case 'float':
    case 'integer':
      return 'number';
    case 'multienum':
      return 'stringlist';
    case 'binary':
    case 'date':
    case 'html':
    case 'link':
    case 'linklist':
    case 'reference':
    case 'referencelist':
    case 'string':
    case 'stringlist':
    case 'widgetlist':
      return type;
    default:
      throw new _errors.ArgumentError('Attribute "' + name + '" is of unsupported type "' + type + '".');
  }
}

function serializeAttributeValue(type, options, value, name) {
  if (value === null) {
    return value;
  }

  switch (type) {
    case 'binary':
      return serializeBinaryAttributeValue(value, name);
    case 'date':
      return serializeDateAttributeValue(value, name);
    case 'enum':
      return serializeEnumAttributeValue(options, value, name);
    case 'float':
      return serializeFloatAttributeValue(value, name);
    case 'html':
      return serializeHtmlAttributeValue(value, name);
    case 'integer':
      return serializeIntegerAttributeValue(value, name);
    case 'link':
      return serializeLinkAttributeValue(value, name);
    case 'linklist':
      return serializeLinklistAttributeValue(value, name);
    case 'multienum':
      return serializeMultienumAttributeValue(options, value, name);
    case 'reference':
      return serializeReferenceAttributeValue(value, name);
    case 'referencelist':
      return serializeReferencelistAttributeValue(value, name);
    case 'string':
      return serializeStringAttributeValue(value, name);
    case 'stringlist':
      return serializeStringlistAttributeValue(value, name);
    case 'widgetlist':
      return serializeWidgetlistAttributeValue(value, name);
    default:
      throw new _errors.InternalError('serializeAttributeValue is not implemented for "' + type + '".');
  }
}

function valueOrNull(value) {
  if ((_underscore2.default.isString(value) || _underscore2.default.isArray(value)) && _underscore2.default.isEmpty(value)) {
    return null;
  }
  return value;
}

function throwInvalidAttributeValue(value, name, expected) {
  throw new _errors.ArgumentError('Unexpected value ' + (0, _pretty_print2.default)(value) + ' for' + (' attribute "' + name + '". Expected: ' + expected));
}

function serializeBinaryAttributeValue(value, name) {
  if (value instanceof _binary2.default) {
    return { id: value.id() };
  }
  throwInvalidAttributeValue(value, name, 'A Binary.');
}

function serializeDateAttributeValue(value, name) {
  if (_underscore2.default.isDate(value)) {
    return types.formatDateToString(value);
  }
  if (types.isValidDateString(value)) {
    return value;
  }
  throwInvalidAttributeValue(value, name, 'A Date.');
}

function serializeEnumAttributeValue(_ref3, value, name) {
  var validValues = _ref3.validValues;

  if (_underscore2.default.contains(validValues, value)) {
    return value;
  }

  var e = 'Valid attribute values are contained in its "validValues" array [' + validValues + '].';
  throwInvalidAttributeValue(value, name, e);
}

function serializeFloatAttributeValue(value, name) {
  if (types.isValidFloat(value)) {
    return value;
  }

  var invalidValue = value;
  if (_underscore2.default.isNumber(value)) {
    invalidValue = String(value);
  }
  throwInvalidAttributeValue(invalidValue, name, 'A Number, that is #isFinite().');
}

function serializeHtmlAttributeValue(value, name) {
  if (_underscore2.default.isString(value)) {
    return value;
  }
  throwInvalidAttributeValue(value, name, 'A String.');
}

function serializeIntegerAttributeValue(value, name) {
  if (types.isValidInteger(value)) {
    return value;
  }
  throwInvalidAttributeValue(value, name, 'A Number, that is #isSafeInteger().');
}

function serializeLinkAttributeValue(value, name) {
  if (validLinkObject(value)) {
    return convertLinkToCmsApi(value);
  }
  throwInvalidAttributeValue(value, name, 'A Link instance.');
}

function serializeLinklistAttributeValue(value, name) {
  if (_underscore2.default.isArray(value) && _underscore2.default.every(value, validLinkObject)) {
    return _underscore2.default.map(value, convertLinkToCmsApi);
  }
  throwInvalidAttributeValue(value, name, 'An array of Link instances.');
}

function validLinkObject(value) {
  if (value instanceof _basic_link2.default) {
    return true;
  }

  // check if value is backend compatible
  if (!_underscore2.default.isObject(value)) {
    return false;
  }
  var invalidKeys = _underscore2.default.without(_underscore2.default.keys(value), 'hash', 'obj_id', 'query', 'target', 'title', 'url');
  return _underscore2.default.isEmpty(invalidKeys);
}

function convertLinkToCmsApi(value) {
  var backendLink = {
    fragment: typeof value.hash === 'function' ? value.hash() : value.hash,
    query: typeof value.query === 'function' ? value.query() : value.query,
    target: typeof value.target === 'function' ? value.target() : value.target,
    title: typeof value.title === 'function' ? value.title() : value.title,
    url: typeof value.url === 'function' ? value.url() : value.url
  };
  backendLink.obj_id = typeof value.objId === 'function' ? value.objId() : value.obj_id;

  return _underscore2.default.mapObject(backendLink, function (v) {
    return v || null;
  });
}

function serializeMultienumAttributeValue(_ref4, value, name) {
  var validValues = _ref4.validValues;

  var errorMessage = 'An array with values from ' + (0, _pretty_print2.default)(validValues) + '.';

  if (!_underscore2.default.isArray(value) || !_underscore2.default.every(value, _underscore2.default.isString)) {
    throwInvalidAttributeValue(value, name, errorMessage);
  }

  var forbiddenValues = _underscore2.default.difference(value, validValues);
  if (forbiddenValues.length) {
    var e = errorMessage + ' Forbidden values: ' + (0, _pretty_print2.default)(forbiddenValues) + '.';
    throwInvalidAttributeValue(value, name, e);
  }
  return value;
}

function serializeReferenceAttributeValue(value, name) {
  if (isValidReference(value)) {
    return serializeSingleReferenceValue(value);
  }
  throwInvalidAttributeValue(value, name, 'A BasicObj or a String ID.');
}

function serializeReferencelistAttributeValue(value, name) {
  if (isValidReferencelistValue(value)) {
    return _underscore2.default.map(value, serializeSingleReferenceValue);
  }
  throwInvalidAttributeValue(value, name, 'An array with BasicObjs or String IDs.');
}

function serializeSingleReferenceValue(value) {
  if (value instanceof _basic_obj2.default) {
    return value.id();
  }
  return value;
}

function isValidReference(value) {
  return _underscore2.default.isString(value) || value instanceof _basic_obj2.default;
}

function isValidReferencelistValue(value) {
  return _underscore2.default.isArray(value) && _underscore2.default.every(value, function (v) {
    return isValidReference(v);
  });
}

function serializeStringAttributeValue(value, name) {
  if (isValidString(value)) {
    return value.toString();
  }
  throwInvalidAttributeValue(value, name, 'A String.');
}

function serializeStringlistAttributeValue(value, name) {
  if (_underscore2.default.isArray(value) && _underscore2.default.every(value, function (v) {
    return isValidString(v);
  })) {
    return _underscore2.default.invoke(value, 'toString');
  }
  throwInvalidAttributeValue(value, name, 'An array of strings.');
}

function isValidString(value) {
  return _underscore2.default.isString(value) || _underscore2.default.isNumber(value);
}

function serializeWidgetlistAttributeValue(value, name) {
  if (_underscore2.default.isArray(value) && _underscore2.default.every(value, function (v) {
    return v instanceof _basic_widget2.default;
  })) {
    return _underscore2.default.invoke(value, 'id');
  }
  throwInvalidAttributeValue(value, name, 'An array of BasicWidget instances.');
}

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deferred = __webpack_require__(10);

var _deferred2 = _interopRequireDefault(_deferred);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BatchRetrieval = function () {
  function BatchRetrieval(mget) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        batchSize = _ref.batchSize;

    _classCallCheck(this, BatchRetrieval);

    this._mget = mget;
    this._batchSize = batchSize || 100;
    this._deferreds = {};
  }

  _createClass(BatchRetrieval, [{
    key: 'retrieve',
    value: function retrieve(id) {
      var _this = this;

      if (_underscore2.default.isEmpty(this._deferreds)) {
        scrivito.nextTick(function () {
          return _this._performRetrieval();
        });
      }

      if (!this._deferreds[id]) {
        var deferred = new _deferred2.default();
        this._deferreds[id] = deferred;
      }

      return this._deferreds[id].promise;
    }
  }, {
    key: '_performRetrieval',
    value: function _performRetrieval() {
      var _this2 = this;

      var ids = _underscore2.default.keys(this._deferreds).slice(0, this._batchSize);

      if (ids.length === 0) {
        return;
      }

      var currentRequestDeferreds = {};
      _underscore2.default.each(ids, function (id) {
        currentRequestDeferreds[id] = _this2._deferreds[id];
        delete _this2._deferreds[id];
      });

      this._mget(ids).then(function (results) {
        _underscore2.default.each(ids, function (id, index) {
          var deferred = currentRequestDeferreds[id];
          var result = results[index];

          if (index < results.length) {
            deferred.resolve(result);
          } else {
            _this2.retrieve(id).then(deferred.resolve, deferred.reject);
          }
        });
      }, function (error) {
        _underscore2.default.each(currentRequestDeferreds, function (deferred) {
          return deferred.reject(error);
        });
      });

      this._performRetrieval();
    }

    // For test purpose only.

  }, {
    key: 'reset',
    value: function reset() {
      this._deferreds = {};
    }
  }]);

  return BatchRetrieval;
}();

exports.default = BatchRetrieval;

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _types = __webpack_require__(32);

var types = _interopRequireWildcard(_types);

var _underscore = __webpack_require__(0);

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _global_state = __webpack_require__(4);

var _attribute_inflection = __webpack_require__(13);

var _errors = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// public API
var MetadataCollection = function () {
  function MetadataCollection(binaryId) {
    var _this = this;

    _classCallCheck(this, MetadataCollection);

    this._binaryId = binaryId;

    if (binaryId) {
      this._loadableData = new _loadable_data2.default({
        state: modelState(binaryId),
        loader: function loader() {
          return _this._loadData();
        }
      });
    }
  }

  _createClass(MetadataCollection, [{
    key: 'get',


    // public API
    value: function get(key) {
      assertCamelCase(key);

      var data = this._getData();

      if (data) {
        return data[(0, _attribute_inflection.underscore)(key)];
      }
    }
  }, {
    key: 'keys',
    value: function keys() {
      var data = this._getData();

      if (data) {
        return (0, _underscore.map)((0, _underscore.keys)(data), _attribute_inflection.camelCase);
      }

      return [];
    }

    // For test purpose only.

  }, {
    key: '_getData',
    value: function _getData() {
      if (this._binaryId) {
        return this._loadableData.get();
      }
    }
  }, {
    key: '_loadData',
    value: function _loadData() {
      var path = 'blobs/' + encodeURIComponent(this._binaryId) + '/meta_data';
      return scrivito.CmsRestApi.get(path).then(deserializeMetadata);
    }
  }, {
    key: 'binaryId',
    get: function get() {
      return this._binaryId;
    }
  }], [{
    key: 'store',
    value: function store(binaryId, cmsRestApiResponse) {
      var loadableData = new _loadable_data2.default({ state: modelState(binaryId) });
      loadableData.set(deserializeMetadata(cmsRestApiResponse));
    }
  }]);

  return MetadataCollection;
}();

function modelState(binaryId) {
  return _global_state.cmsState.subState('metadataCollection').subState(binaryId);
}

function deserializeMetadata(rawMetadata) {
  return (0, _underscore.mapObject)(rawMetadata.meta_data, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        type = _ref2[0],
        value = _ref2[1];

    switch (type) {
      case 'date':
        return types.deserializeAsDate(value);
      case 'number':
        return types.deserializeAsInteger(value);
      default:
        return value;
    }
  });
}

function assertCamelCase(key) {
  if (!(0, _attribute_inflection.isCamelCase)(key)) {
    throw new _errors.ArgumentError('Metadata key "' + key + '" is not in camel case.');
  }
}

exports.default = MetadataCollection;

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj_id_query_batch = __webpack_require__(152);

var _obj_id_query_batch2 = _interopRequireDefault(_obj_id_query_batch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjIdQuery = function () {
  _createClass(ObjIdQuery, null, [{
    key: 'store',
    value: function store(params, objIds) {
      _obj_id_query_batch2.default.store(params, objIds);
    }
  }]);

  function ObjIdQuery(params, batchSize) {
    _classCallCheck(this, ObjIdQuery);

    this._params = params;
    this._batchSize = batchSize;
  }

  _createClass(ObjIdQuery, [{
    key: 'iterator',
    value: function iterator() {
      var priorObjIds = {};

      var currentBatch = _obj_id_query_batch2.default.firstBatchFor(this._params, this._batchSize);
      var currentIndex = 0;

      function next() {
        if (!currentBatch) {
          return { done: true };
        }

        var currentObjIds = currentBatch.objIds();

        if (currentIndex < currentObjIds.length) {
          var objId = currentObjIds[currentIndex];
          currentIndex++;

          if (priorObjIds[objId]) {
            return next();
          }

          priorObjIds[objId] = true;

          return {
            value: objId,
            done: false
          };
        }

        currentBatch = currentBatch.nextBatch();
        currentIndex = 0;

        return next();
      }

      return { next: next };
    }
  }]);

  return ObjIdQuery;
}();

exports.default = ObjIdQuery;

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = store;
exports.computeCacheKey = computeCacheKey;
exports.get = get;
exports.stateContainer = stateContainer;
exports.clearCache = clearCache;

var _obj_id_query = __webpack_require__(72);

var _obj_id_query2 = _interopRequireDefault(_obj_id_query);

var _obj_data_query = __webpack_require__(151);

var _obj_data_query2 = _interopRequireDefault(_obj_data_query);

var _global_state = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function store(params, objIds) {
  _obj_id_query2.default.store(params, objIds);
}

function computeCacheKey(obj) {
  return scrivito.computeCacheKey(obj);
}

function get(params, batchSize) {
  return new _obj_data_query2.default(params, batchSize);
}

function stateContainer() {
  return _global_state.cmsState.subState('objQuery');
}

function clearCache() {
  stateContainer().clear();
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function randomHex() {
  var hex = Math.floor(Math.random() * Math.pow(16, 8)).toString(16);
  while (hex.length < 8) {
    hex = "0" + hex;
  }
  return hex;
}

function randomId() {
  return randomHex() + randomHex();
}

exports.randomId = randomId;
exports.randomHex = randomHex;

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.18.7
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.IPv6 = factory(root);
  }
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }
  
    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.18.7
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.SecondLevelDomains = factory(root);
  }
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module), __webpack_require__(34)))

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectToUi;
// checks whether the UI is present
// if so, returns an instance of UiConnection
function connectToUi() {
  // check if there's a parent frame
  if (window.parent === window) {
    return;
  }

  var connectAppDocument = window.parent.connectAppDocument;
  if (connectAppDocument) {
    return connectAppDocument(window.document);
  }
}

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapAndLoadParallel;

var _loadable_data = __webpack_require__(5);

var _loadable_data2 = _interopRequireDefault(_loadable_data);

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapAndLoadParallel(list, iteratee) {
  var results = [];

  _underscore2.default.each(list, function (item) {
    var run = _loadable_data2.default.run(function () {
      return iteratee(item);
    });

    if (run.success) {
      results.push(run.result);
    }
  });

  if (results.length < list.length) {
    _loadable_data2.default.throwNotLoaded();
  }

  return results;
}

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

var _underscore = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasicField = function () {
  function BasicField(_ref) {
    var container = _ref.container,
        attributeName = _ref.attributeName,
        typeInfo = _ref.typeInfo;

    _classCallCheck(this, BasicField);

    this._container = container;
    this._attributeName = attributeName;
    this._typeInfo = typeInfo;
  }

  _createClass(BasicField, [{
    key: 'get',
    value: function get() {
      return this._container.get(this.name(), this._typeInfo);
    }
  }, {
    key: 'update',
    value: function update(newValue) {
      this._container.update(_defineProperty({}, this.name(), [newValue, this._typeInfo]));
    }
  }, {
    key: 'container',
    value: function container() {
      return this._container;
    }
  }, {
    key: 'name',
    value: function name() {
      return this._attributeName;
    }
  }, {
    key: 'type',
    value: function type() {
      return this._typeInfo[0];
    }
  }, {
    key: 'typeOptions',
    value: function typeOptions() {
      return this._typeInfo[1] || {};
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      if (!(other instanceof BasicField)) {
        return false;
      }

      return this.container().equals(other.container()) && this.name() === other.name();
    }
  }, {
    key: 'validValues',
    value: function validValues() {
      this._assertValidTypes(['enum', 'multienum'], 'Only enum and multienum attributes can have valid values');
      return this.typeOptions().validValues || [];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var _dataForId2 = this._dataForId(),
          name = _dataForId2.name,
          objId = _dataForId2.objId,
          widgetId = _dataForId2.widgetId;

      var stringRepresentation = '<BasicField name=' + name + ' objId=' + objId;

      if (widgetId) {
        stringRepresentation += ' widgetId=' + widgetId + '>';
      } else {
        stringRepresentation += '>';
      }

      return stringRepresentation;
    }
  }, {
    key: 'id',
    value: function id() {
      var _dataForId3 = this._dataForId(),
          name = _dataForId3.name,
          objId = _dataForId3.objId,
          widgetId = _dataForId3.widgetId;

      var id = name + '|' + objId;

      if (widgetId) {
        id += '|' + widgetId;
      }

      return id;
    }
  }, {
    key: '_assertValidTypes',
    value: function _assertValidTypes(validTypes, errorMessage) {
      if (!(0, _underscore.include)(validTypes, this.type())) {
        $.error(errorMessage);
      }
    }
  }, {
    key: '_dataForId',
    value: function _dataForId() {
      var jsonHash = { name: this.name() };

      var container = this.container();
      if (container instanceof _basic_obj2.default) {
        jsonHash.objId = container.id();
      } else {
        jsonHash.objId = container.obj().id();
        jsonHash.widgetId = container.id();
      }

      return jsonHash;
    }
  }]);

  return BasicField;
}();

exports.default = BasicField;

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjFacetValue = function () {
  function ObjFacetValue(registry, basicObjFacetValue) {
    _classCallCheck(this, ObjFacetValue);

    this._registry = registry;
    this._basicObjFacetValue = basicObjFacetValue;
  }

  // public API


  _createClass(ObjFacetValue, [{
    key: "name",
    value: function name() {
      return this._basicObjFacetValue.name();
    }

    // public API

  }, {
    key: "count",
    value: function count() {
      return this._basicObjFacetValue.count();
    }

    // public API

  }, {
    key: "includedObjs",
    value: function includedObjs() {
      var response = this._basicObjFacetValue.includedObjs();
      return scrivito.wrapInAppClass(this._registry, response);
    }
  }]);

  return ObjFacetValue;
}();

exports.default = ObjFacetValue;

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractIdsFromContent;

var _basic_obj = __webpack_require__(3);

var _basic_obj2 = _interopRequireDefault(_basic_obj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractIdsFromContent(basicContent) {
  if (basicContent instanceof _basic_obj2.default) {
    return { objId: basicContent.id() };
  }

  return { objId: basicContent.obj().id(), widgetId: basicContent.id() };
}

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function loadCss(url) {
  var link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = url;

  document.head.appendChild(link);
}

function loadJs(url) {
  var script = document.createElement('script');
  script.src = url;

  document.head.appendChild(script);
}

exports.loadCss = loadCss;
exports.loadJs = loadJs;

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _future_binary = __webpack_require__(36);

var _future_binary2 = _interopRequireDefault(_future_binary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UploadedBlob = function () {
  function UploadedBlob(id, url, filename, objId) {
    _classCallCheck(this, UploadedBlob);

    this._id = id;
    this.url = url;
    this.filename = filename;
    this._objId = objId;
  }

  _createClass(UploadedBlob, [{
    key: 'noCacheUrl',
    value: function noCacheUrl() {
      if (scrivito.currentWorkspaceId() === 'published') {
        return scrivito.Promise.resolve(null);
      }

      var path = 'blobs/' + encodeURIComponent(this._id) + '/no_cache';
      return scrivito.CmsRestApi.get(path).then(function (response) {
        return response.private_access.get.url;
      }).catch(function (e) {
        scrivito.displayError(e);
        return scrivito.Promise.reject(e);
      });
    }
  }, {
    key: 'copy',
    value: function copy() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _future_binary2.default({
        idToCopy: this._id,
        filename: params.filename,
        contentType: params.content_type
      });
    }
  }]);

  return UploadedBlob;
}();

exports.default = UploadedBlob;

/***/ })

/******/ });