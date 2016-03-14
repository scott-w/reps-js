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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(4);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _root = __webpack_require__(7);

	var _root2 = _interopRequireDefault(_root);

	var _router = __webpack_require__(13);

	var _router2 = __webpack_require__(21);

	var _router3 = __webpack_require__(60);

	var _router4 = __webpack_require__(63);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var processRoutes = function processRoutes() {
	  var router = new _backbone4.default.AppRouter();
	  router.processAppRoutes(new _router.Controller(), _router.routes);
	  router.processAppRoutes(new _router2.Controller(), _router2.routes);
	  router.processAppRoutes(new _router3.Controller(), _router3.routes);
	  router.processAppRoutes(new _router4.Controller(), _router4.routes);
	};

	var App = new _backbone4.default.Application({
	  region: '#root',

	  onStart: function onStart() {
	    this.showView(_root2.default);
	    processRoutes();

	    _backbone2.default.history.start({ pushState: true });
	  }
	});

	App.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {//     Backbone.js 1.2.3

	//     (c) 2010-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Backbone may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://backbonejs.org

	(function(factory) {

	  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	  // We use `self` instead of `window` for `WebWorker` support.
	  var root = (typeof self == 'object' && self.self == self && self) ||
	            (typeof global == 'object' && global.global == global && global);

	  // Set up Backbone appropriately for the environment. Start with AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
	      // Export global even in AMD case in case this script is loaded with
	      // others that may still expect a global Backbone.
	      root.Backbone = factory(root, exports, _, $);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
	  } else if (typeof exports !== 'undefined') {
	    var _ = require('underscore'), $;
	    try { $ = require('jquery'); } catch(e) {}
	    factory(root, exports, _, $);

	  // Finally, as a browser global.
	  } else {
	    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
	  }

	}(function(root, Backbone, _, $) {

	  // Initial Setup
	  // -------------

	  // Save the previous value of the `Backbone` variable, so that it can be
	  // restored later on, if `noConflict` is used.
	  var previousBackbone = root.Backbone;

	  // Create a local reference to a common array method we'll want to use later.
	  var slice = Array.prototype.slice;

	  // Current version of the library. Keep in sync with `package.json`.
	  Backbone.VERSION = '1.2.3';

	  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
	  // the `$` variable.
	  Backbone.$ = $;

	  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
	  // to its previous owner. Returns a reference to this Backbone object.
	  Backbone.noConflict = function() {
	    root.Backbone = previousBackbone;
	    return this;
	  };

	  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
	  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
	  // set a `X-Http-Method-Override` header.
	  Backbone.emulateHTTP = false;

	  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
	  // `application/json` requests ... this will encode the body as
	  // `application/x-www-form-urlencoded` instead and will send the model in a
	  // form param named `model`.
	  Backbone.emulateJSON = false;

	  // Proxy Backbone class methods to Underscore functions, wrapping the model's
	  // `attributes` object or collection's `models` array behind the scenes.
	  //
	  // collection.filter(function(model) { return model.get('age') > 10 });
	  // collection.each(this.addView);
	  //
	  // `Function#apply` can be slow so we use the method's arg count, if we know it.
	  var addMethod = function(length, method, attribute) {
	    switch (length) {
	      case 1: return function() {
	        return _[method](this[attribute]);
	      };
	      case 2: return function(value) {
	        return _[method](this[attribute], value);
	      };
	      case 3: return function(iteratee, context) {
	        return _[method](this[attribute], cb(iteratee, this), context);
	      };
	      case 4: return function(iteratee, defaultVal, context) {
	        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
	      };
	      default: return function() {
	        var args = slice.call(arguments);
	        args.unshift(this[attribute]);
	        return _[method].apply(_, args);
	      };
	    }
	  };
	  var addUnderscoreMethods = function(Class, methods, attribute) {
	    _.each(methods, function(length, method) {
	      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
	    });
	  };

	  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
	  var cb = function(iteratee, instance) {
	    if (_.isFunction(iteratee)) return iteratee;
	    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
	    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
	    return iteratee;
	  };
	  var modelMatcher = function(attrs) {
	    var matcher = _.matches(attrs);
	    return function(model) {
	      return matcher(model.attributes);
	    };
	  };

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // a custom event channel. You may bind a callback to an event with `on` or
	  // remove with `off`; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Events = Backbone.Events = {};

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Iterates over the standard `event, callback` (as well as the fancy multiple
	  // space-separated events `"change blur", callback` and jQuery-style event
	  // maps `{event: callback}`).
	  var eventsApi = function(iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	      // Handle event maps.
	      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
	      for (names = _.keys(name); i < names.length ; i++) {
	        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	      }
	    } else if (name && eventSplitter.test(name)) {
	      // Handle space separated event names by delegating them individually.
	      for (names = name.split(eventSplitter); i < names.length; i++) {
	        events = iteratee(events, names[i], callback, opts);
	      }
	    } else {
	      // Finally, standard events.
	      events = iteratee(events, name, callback, opts);
	    }
	    return events;
	  };

	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  Events.on = function(name, callback, context) {
	    return internalOn(this, name, callback, context);
	  };

	  // Guard the `listening` argument from the public API.
	  var internalOn = function(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	        context: context,
	        ctx: obj,
	        listening: listening
	    });

	    if (listening) {
	      var listeners = obj._listeners || (obj._listeners = {});
	      listeners[listening.id] = listening;
	    }

	    return obj;
	  };

	  // Inversion-of-control versions of `on`. Tell *this* object to listen to
	  // an event in another object... keeping track of what it's listening to
	  // for easier unbinding later.
	  Events.listenTo =  function(obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];

	    // This object is not listening to any other events on `obj` yet.
	    // Setup the necessary references to track the listening callbacks.
	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
	    }

	    // Bind callbacks on obj, and keep track of them on listening.
	    internalOn(obj, name, callback, this, listening);
	    return this;
	  };

	  // The reducing API that adds a callback to the `events` object.
	  var onApi = function(events, name, callback, options) {
	    if (callback) {
	      var handlers = events[name] || (events[name] = []);
	      var context = options.context, ctx = options.ctx, listening = options.listening;
	      if (listening) listening.count++;

	      handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
	    }
	    return events;
	  };

	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  Events.off =  function(name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	        context: context,
	        listeners: this._listeners
	    });
	    return this;
	  };

	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  Events.stopListening =  function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;

	    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];

	      // If listening doesn't exist, this object is not currently
	      // listening to obj. Break out early.
	      if (!listening) break;

	      listening.obj.off(name, callback, this);
	    }
	    if (_.isEmpty(listeningTo)) this._listeningTo = void 0;

	    return this;
	  };

	  // The reducing API that removes a callback from the `events` object.
	  var offApi = function(events, name, callback, options) {
	    if (!events) return;

	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;

	    // Delete all events listeners and "drop" events.
	    if (!name && !callback && !context) {
	      var ids = _.keys(listeners);
	      for (; i < ids.length; i++) {
	        listening = listeners[ids[i]];
	        delete listeners[listening.id];
	        delete listening.listeningTo[listening.objId];
	      }
	      return;
	    }

	    var names = name ? [name] : _.keys(events);
	    for (; i < names.length; i++) {
	      name = names[i];
	      var handlers = events[name];

	      // Bail out if there are no events stored.
	      if (!handlers) break;

	      // Replace events if there are any remaining.  Otherwise, clean up.
	      var remaining = [];
	      for (var j = 0; j < handlers.length; j++) {
	        var handler = handlers[j];
	        if (
	          callback && callback !== handler.callback &&
	            callback !== handler.callback._callback ||
	              context && context !== handler.context
	        ) {
	          remaining.push(handler);
	        } else {
	          listening = handler.listening;
	          if (listening && --listening.count === 0) {
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	          }
	        }
	      }

	      // Update tail event if the list has any events.  Otherwise, clean up.
	      if (remaining.length) {
	        events[name] = remaining;
	      } else {
	        delete events[name];
	      }
	    }
	    if (_.size(events)) return events;
	  };

	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, its listener will be removed. If multiple events
	  // are passed in using the space-separated syntax, the handler will fire
	  // once for each event, not once for a combination of all events.
	  Events.once =  function(name, callback, context) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	    return this.on(events, void 0, context);
	  };

	  // Inversion-of-control versions of `once`.
	  Events.listenToOnce =  function(obj, name, callback) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  };

	  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
	  // `offer` unbinds the `onceWrapper` after it has been called.
	  var onceMap = function(map, name, callback, offer) {
	    if (callback) {
	      var once = map[name] = _.once(function() {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    }
	    return map;
	  };

	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  Events.trigger =  function(name) {
	    if (!this._events) return this;

	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

	    eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  };

	  // Handles triggering the appropriate event callbacks.
	  var triggerApi = function(objEvents, name, cb, args) {
	    if (objEvents) {
	      var events = objEvents[name];
	      var allEvents = objEvents.all;
	      if (events && allEvents) allEvents = allEvents.slice();
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
	    }
	  };

	  // Aliases for backwards compatibility.
	  Events.bind   = Events.on;
	  Events.unbind = Events.off;

	  // Allow the `Backbone` object to serve as a global event bus, for folks who
	  // want global "pubsub" in a convenient place.
	  _.extend(Backbone, Events);

	  // Backbone.Model
	  // --------------

	  // Backbone **Models** are the basic data object in the framework --
	  // frequently representing a row in a table in a database on your server.
	  // A discrete chunk of data and a bunch of useful, related methods for
	  // performing computations and transformations on that data.

	  // Create a new model with the specified attributes. A client id (`cid`)
	  // is automatically generated and assigned for you.
	  var Model = Backbone.Model = function(attributes, options) {
	    var attrs = attributes || {};
	    options || (options = {});
	    this.cid = _.uniqueId(this.cidPrefix);
	    this.attributes = {};
	    if (options.collection) this.collection = options.collection;
	    if (options.parse) attrs = this.parse(attrs, options) || {};
	    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
	    this.set(attrs, options);
	    this.changed = {};
	    this.initialize.apply(this, arguments);
	  };

	  // Attach all inheritable methods to the Model prototype.
	  _.extend(Model.prototype, Events, {

	    // A hash of attributes whose current and previous value differ.
	    changed: null,

	    // The value returned during the last failed validation.
	    validationError: null,

	    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
	    // CouchDB users may want to set this to `"_id"`.
	    idAttribute: 'id',

	    // The prefix is used to create the client id which is used to identify models locally.
	    // You may want to override this if you're experiencing name clashes with model ids.
	    cidPrefix: 'c',

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Return a copy of the model's `attributes` object.
	    toJSON: function(options) {
	      return _.clone(this.attributes);
	    },

	    // Proxy `Backbone.sync` by default -- but override this if you need
	    // custom syncing semantics for *this* particular model.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Get the value of an attribute.
	    get: function(attr) {
	      return this.attributes[attr];
	    },

	    // Get the HTML-escaped value of an attribute.
	    escape: function(attr) {
	      return _.escape(this.get(attr));
	    },

	    // Returns `true` if the attribute contains a value that is not null
	    // or undefined.
	    has: function(attr) {
	      return this.get(attr) != null;
	    },

	    // Special-cased proxy to underscore's `_.matches` method.
	    matches: function(attrs) {
	      return !!_.iteratee(attrs, this)(this.attributes);
	    },

	    // Set a hash of model attributes on the object, firing `"change"`. This is
	    // the core primitive operation of a model, updating the data and notifying
	    // anyone who needs to know about the change in state. The heart of the beast.
	    set: function(key, val, options) {
	      if (key == null) return this;

	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options || (options = {});

	      // Run validation.
	      if (!this._validate(attrs, options)) return false;

	      // Extract attributes and options.
	      var unset      = options.unset;
	      var silent     = options.silent;
	      var changes    = [];
	      var changing   = this._changing;
	      this._changing = true;

	      if (!changing) {
	        this._previousAttributes = _.clone(this.attributes);
	        this.changed = {};
	      }

	      var current = this.attributes;
	      var changed = this.changed;
	      var prev    = this._previousAttributes;

	      // For each `set` attribute, update or delete the current value.
	      for (var attr in attrs) {
	        val = attrs[attr];
	        if (!_.isEqual(current[attr], val)) changes.push(attr);
	        if (!_.isEqual(prev[attr], val)) {
	          changed[attr] = val;
	        } else {
	          delete changed[attr];
	        }
	        unset ? delete current[attr] : current[attr] = val;
	      }

	      // Update the `id`.
	      this.id = this.get(this.idAttribute);

	      // Trigger all relevant attribute changes.
	      if (!silent) {
	        if (changes.length) this._pending = options;
	        for (var i = 0; i < changes.length; i++) {
	          this.trigger('change:' + changes[i], this, current[changes[i]], options);
	        }
	      }

	      // You might be wondering why there's a `while` loop here. Changes can
	      // be recursively nested within `"change"` events.
	      if (changing) return this;
	      if (!silent) {
	        while (this._pending) {
	          options = this._pending;
	          this._pending = false;
	          this.trigger('change', this, options);
	        }
	      }
	      this._pending = false;
	      this._changing = false;
	      return this;
	    },

	    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
	    // if the attribute doesn't exist.
	    unset: function(attr, options) {
	      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
	    },

	    // Clear all attributes on the model, firing `"change"`.
	    clear: function(options) {
	      var attrs = {};
	      for (var key in this.attributes) attrs[key] = void 0;
	      return this.set(attrs, _.extend({}, options, {unset: true}));
	    },

	    // Determine if the model has changed since the last `"change"` event.
	    // If you specify an attribute name, determine if that attribute has changed.
	    hasChanged: function(attr) {
	      if (attr == null) return !_.isEmpty(this.changed);
	      return _.has(this.changed, attr);
	    },

	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    changedAttributes: function(diff) {
	      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	      var old = this._changing ? this._previousAttributes : this.attributes;
	      var changed = {};
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (_.isEqual(old[attr], val)) continue;
	        changed[attr] = val;
	      }
	      return _.size(changed) ? changed : false;
	    },

	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    previous: function(attr) {
	      if (attr == null || !this._previousAttributes) return null;
	      return this._previousAttributes[attr];
	    },

	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    previousAttributes: function() {
	      return _.clone(this._previousAttributes);
	    },

	    // Fetch the model from the server, merging the response with the model's
	    // local attributes. Any changed attributes will trigger a "change" event.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var model = this;
	      var success = options.success;
	      options.success = function(resp) {
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (!model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Set a hash of model attributes, and sync the model to the server.
	    // If the server returns an attributes hash that differs, the model's
	    // state will be `set` again.
	    save: function(key, val, options) {
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (key == null || typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options = _.extend({validate: true, parse: true}, options);
	      var wait = options.wait;

	      // If we're not waiting and attributes exist, save acts as
	      // `set(attr).save(null, opts)` with validation. Otherwise, check if
	      // the model will be valid when the attributes, if any, are set.
	      if (attrs && !wait) {
	        if (!this.set(attrs, options)) return false;
	      } else {
	        if (!this._validate(attrs, options)) return false;
	      }

	      // After a successful server-side save, the client is (optionally)
	      // updated with the server-side state.
	      var model = this;
	      var success = options.success;
	      var attributes = this.attributes;
	      options.success = function(resp) {
	        // Ensure attributes are restored during synchronous saves.
	        model.attributes = attributes;
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
	        if (serverAttrs && !model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);

	      // Set temporary attributes if `{wait: true}` to properly find new ids.
	      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

	      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
	      if (method === 'patch' && !options.attrs) options.attrs = attrs;
	      var xhr = this.sync(method, this, options);

	      // Restore attributes.
	      this.attributes = attributes;

	      return xhr;
	    },

	    // Destroy this model on the server if it was already persisted.
	    // Optimistically removes the model from its collection, if it has one.
	    // If `wait: true` is passed, waits for the server to respond before removal.
	    destroy: function(options) {
	      options = options ? _.clone(options) : {};
	      var model = this;
	      var success = options.success;
	      var wait = options.wait;

	      var destroy = function() {
	        model.stopListening();
	        model.trigger('destroy', model, model.collection, options);
	      };

	      options.success = function(resp) {
	        if (wait) destroy();
	        if (success) success.call(options.context, model, resp, options);
	        if (!model.isNew()) model.trigger('sync', model, resp, options);
	      };

	      var xhr = false;
	      if (this.isNew()) {
	        _.defer(options.success);
	      } else {
	        wrapError(this, options);
	        xhr = this.sync('delete', this, options);
	      }
	      if (!wait) destroy();
	      return xhr;
	    },

	    // Default URL for the model's representation on the server -- if you're
	    // using Backbone's restful methods, override this to change the endpoint
	    // that will be called.
	    url: function() {
	      var base =
	        _.result(this, 'urlRoot') ||
	        _.result(this.collection, 'url') ||
	        urlError();
	      if (this.isNew()) return base;
	      var id = this.get(this.idAttribute);
	      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
	    },

	    // **parse** converts a response into the hash of attributes to be `set` on
	    // the model. The default implementation is just to pass the response along.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new model with identical attributes to this one.
	    clone: function() {
	      return new this.constructor(this.attributes);
	    },

	    // A model is new if it has never been saved to the server, and lacks an id.
	    isNew: function() {
	      return !this.has(this.idAttribute);
	    },

	    // Check if the model is currently in a valid state.
	    isValid: function(options) {
	      return this._validate({}, _.defaults({validate: true}, options));
	    },

	    // Run validation against the next complete set of model attributes,
	    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
	    _validate: function(attrs, options) {
	      if (!options.validate || !this.validate) return true;
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validationError = this.validate(attrs, options) || null;
	      if (!error) return true;
	      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	      return false;
	    }

	  });

	  // Underscore methods that we want to implement on the Model, mapped to the
	  // number of arguments they take.
	  var modelMethods = { keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
	      omit: 0, chain: 1, isEmpty: 1 };

	  // Mix in each Underscore method as a proxy to `Model#attributes`.
	  addUnderscoreMethods(Model, modelMethods, 'attributes');

	  // Backbone.Collection
	  // -------------------

	  // If models tend to represent a single row of data, a Backbone Collection is
	  // more analogous to a table full of data ... or a small slice or page of that
	  // table, or a collection of rows that belong together for a particular reason
	  // -- all of the messages in this particular folder, all of the documents
	  // belonging to this particular author, and so on. Collections maintain
	  // indexes of their models, both in order, and for lookup by `id`.

	  // Create a new **Collection**, perhaps to contain a specific type of `model`.
	  // If a `comparator` is specified, the Collection will maintain
	  // its models in sort order, as they're added and removed.
	  var Collection = Backbone.Collection = function(models, options) {
	    options || (options = {});
	    if (options.model) this.model = options.model;
	    if (options.comparator !== void 0) this.comparator = options.comparator;
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) this.reset(models, _.extend({silent: true}, options));
	  };

	  // Default options for `Collection#set`.
	  var setOptions = {add: true, remove: true, merge: true};
	  var addOptions = {add: true, remove: false};

	  // Splices `insert` into `array` at index `at`.
	  var splice = function(array, insert, at) {
	    at = Math.min(Math.max(at, 0), array.length);
	    var tail = Array(array.length - at);
	    var length = insert.length;
	    for (var i = 0; i < tail.length; i++) tail[i] = array[i + at];
	    for (i = 0; i < length; i++) array[i + at] = insert[i];
	    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
	  };

	  // Define the Collection's inheritable methods.
	  _.extend(Collection.prototype, Events, {

	    // The default model for a collection is just a **Backbone.Model**.
	    // This should be overridden in most cases.
	    model: Model,

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // The JSON representation of a Collection is an array of the
	    // models' attributes.
	    toJSON: function(options) {
	      return this.map(function(model) { return model.toJSON(options); });
	    },

	    // Proxy `Backbone.sync` by default.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Add a model, or list of models to the set. `models` may be Backbone
	    // Models or raw JavaScript objects to be converted to Models, or any
	    // combination of the two.
	    add: function(models, options) {
	      return this.set(models, _.extend({merge: false}, options, addOptions));
	    },

	    // Remove a model, or a list of models from the set.
	    remove: function(models, options) {
	      options = _.extend({}, options);
	      var singular = !_.isArray(models);
	      models = singular ? [models] : _.clone(models);
	      var removed = this._removeModels(models, options);
	      if (!options.silent && removed) this.trigger('update', this, options);
	      return singular ? removed[0] : removed;
	    },

	    // Update a collection by `set`-ing a new list of models, adding new ones,
	    // removing models that are no longer present, and merging models that
	    // already exist in the collection, as necessary. Similar to **Model#set**,
	    // the core operation for updating the data contained by the collection.
	    set: function(models, options) {
	      if (models == null) return;

	      options = _.defaults({}, options, setOptions);
	      if (options.parse && !this._isModel(models)) models = this.parse(models, options);

	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();

	      var at = options.at;
	      if (at != null) at = +at;
	      if (at < 0) at += this.length + 1;

	      var set = [];
	      var toAdd = [];
	      var toRemove = [];
	      var modelMap = {};

	      var add = options.add;
	      var merge = options.merge;
	      var remove = options.remove;

	      var sort = false;
	      var sortable = this.comparator && (at == null) && options.sort !== false;
	      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

	      // Turn bare objects into model references, and prevent invalid models
	      // from being added.
	      var model;
	      for (var i = 0; i < models.length; i++) {
	        model = models[i];

	        // If a duplicate is found, prevent it from being added and
	        // optionally merge it into the existing model.
	        var existing = this.get(model);
	        if (existing) {
	          if (merge && model !== existing) {
	            var attrs = this._isModel(model) ? model.attributes : model;
	            if (options.parse) attrs = existing.parse(attrs, options);
	            existing.set(attrs, options);
	            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
	          }
	          if (!modelMap[existing.cid]) {
	            modelMap[existing.cid] = true;
	            set.push(existing);
	          }
	          models[i] = existing;

	        // If this is a new, valid model, push it to the `toAdd` list.
	        } else if (add) {
	          model = models[i] = this._prepareModel(model, options);
	          if (model) {
	            toAdd.push(model);
	            this._addReference(model, options);
	            modelMap[model.cid] = true;
	            set.push(model);
	          }
	        }
	      }

	      // Remove stale models.
	      if (remove) {
	        for (i = 0; i < this.length; i++) {
	          model = this.models[i];
	          if (!modelMap[model.cid]) toRemove.push(model);
	        }
	        if (toRemove.length) this._removeModels(toRemove, options);
	      }

	      // See if sorting is needed, update `length` and splice in new models.
	      var orderChanged = false;
	      var replace = !sortable && add && remove;
	      if (set.length && replace) {
	        orderChanged = this.length != set.length || _.some(this.models, function(model, index) {
	          return model !== set[index];
	        });
	        this.models.length = 0;
	        splice(this.models, set, 0);
	        this.length = this.models.length;
	      } else if (toAdd.length) {
	        if (sortable) sort = true;
	        splice(this.models, toAdd, at == null ? this.length : at);
	        this.length = this.models.length;
	      }

	      // Silently sort the collection if appropriate.
	      if (sort) this.sort({silent: true});

	      // Unless silenced, it's time to fire all appropriate add/sort events.
	      if (!options.silent) {
	        for (i = 0; i < toAdd.length; i++) {
	          if (at != null) options.index = at + i;
	          model = toAdd[i];
	          model.trigger('add', model, this, options);
	        }
	        if (sort || orderChanged) this.trigger('sort', this, options);
	        if (toAdd.length || toRemove.length) this.trigger('update', this, options);
	      }

	      // Return the added (or merged) model (or models).
	      return singular ? models[0] : models;
	    },

	    // When you have more items than you want to add or remove individually,
	    // you can reset the entire set with a new list of models, without firing
	    // any granular `add` or `remove` events. Fires `reset` when finished.
	    // Useful for bulk operations and optimizations.
	    reset: function(models, options) {
	      options = options ? _.clone(options) : {};
	      for (var i = 0; i < this.models.length; i++) {
	        this._removeReference(this.models[i], options);
	      }
	      options.previousModels = this.models;
	      this._reset();
	      models = this.add(models, _.extend({silent: true}, options));
	      if (!options.silent) this.trigger('reset', this, options);
	      return models;
	    },

	    // Add a model to the end of the collection.
	    push: function(model, options) {
	      return this.add(model, _.extend({at: this.length}, options));
	    },

	    // Remove a model from the end of the collection.
	    pop: function(options) {
	      var model = this.at(this.length - 1);
	      return this.remove(model, options);
	    },

	    // Add a model to the beginning of the collection.
	    unshift: function(model, options) {
	      return this.add(model, _.extend({at: 0}, options));
	    },

	    // Remove a model from the beginning of the collection.
	    shift: function(options) {
	      var model = this.at(0);
	      return this.remove(model, options);
	    },

	    // Slice out a sub-array of models from the collection.
	    slice: function() {
	      return slice.apply(this.models, arguments);
	    },

	    // Get a model from the set by id.
	    get: function(obj) {
	      if (obj == null) return void 0;
	      var id = this.modelId(this._isModel(obj) ? obj.attributes : obj);
	      return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
	    },

	    // Get the model at the given index.
	    at: function(index) {
	      if (index < 0) index += this.length;
	      return this.models[index];
	    },

	    // Return models with matching attributes. Useful for simple cases of
	    // `filter`.
	    where: function(attrs, first) {
	      return this[first ? 'find' : 'filter'](attrs);
	    },

	    // Return the first model with matching attributes. Useful for simple cases
	    // of `find`.
	    findWhere: function(attrs) {
	      return this.where(attrs, true);
	    },

	    // Force the collection to re-sort itself. You don't need to call this under
	    // normal circumstances, as the set will maintain sort order as each item
	    // is added.
	    sort: function(options) {
	      var comparator = this.comparator;
	      if (!comparator) throw new Error('Cannot sort a set without a comparator');
	      options || (options = {});

	      var length = comparator.length;
	      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

	      // Run sort based on type of `comparator`.
	      if (length === 1 || _.isString(comparator)) {
	        this.models = this.sortBy(comparator);
	      } else {
	        this.models.sort(comparator);
	      }
	      if (!options.silent) this.trigger('sort', this, options);
	      return this;
	    },

	    // Pluck an attribute from each model in the collection.
	    pluck: function(attr) {
	      return _.invoke(this.models, 'get', attr);
	    },

	    // Fetch the default set of models for this collection, resetting the
	    // collection when they arrive. If `reset: true` is passed, the response
	    // data will be passed through the `reset` method instead of `set`.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var success = options.success;
	      var collection = this;
	      options.success = function(resp) {
	        var method = options.reset ? 'reset' : 'set';
	        collection[method](resp, options);
	        if (success) success.call(options.context, collection, resp, options);
	        collection.trigger('sync', collection, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Create a new instance of a model in this collection. Add the model to the
	    // collection immediately, unless `wait: true` is passed, in which case we
	    // wait for the server to agree.
	    create: function(model, options) {
	      options = options ? _.clone(options) : {};
	      var wait = options.wait;
	      model = this._prepareModel(model, options);
	      if (!model) return false;
	      if (!wait) this.add(model, options);
	      var collection = this;
	      var success = options.success;
	      options.success = function(model, resp, callbackOpts) {
	        if (wait) collection.add(model, callbackOpts);
	        if (success) success.call(callbackOpts.context, model, resp, callbackOpts);
	      };
	      model.save(null, options);
	      return model;
	    },

	    // **parse** converts a response into a list of models to be added to the
	    // collection. The default implementation is just to pass it through.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new collection with an identical list of models as this one.
	    clone: function() {
	      return new this.constructor(this.models, {
	        model: this.model,
	        comparator: this.comparator
	      });
	    },

	    // Define how to uniquely identify models in the collection.
	    modelId: function (attrs) {
	      return attrs[this.model.prototype.idAttribute || 'id'];
	    },

	    // Private method to reset all internal state. Called when the collection
	    // is first initialized or reset.
	    _reset: function() {
	      this.length = 0;
	      this.models = [];
	      this._byId  = {};
	    },

	    // Prepare a hash of attributes (or other model) to be added to this
	    // collection.
	    _prepareModel: function(attrs, options) {
	      if (this._isModel(attrs)) {
	        if (!attrs.collection) attrs.collection = this;
	        return attrs;
	      }
	      options = options ? _.clone(options) : {};
	      options.collection = this;
	      var model = new this.model(attrs, options);
	      if (!model.validationError) return model;
	      this.trigger('invalid', this, model.validationError, options);
	      return false;
	    },

	    // Internal method called by both remove and set.
	    _removeModels: function(models, options) {
	      var removed = [];
	      for (var i = 0; i < models.length; i++) {
	        var model = this.get(models[i]);
	        if (!model) continue;

	        var index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;

	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }

	        removed.push(model);
	        this._removeReference(model, options);
	      }
	      return removed.length ? removed : false;
	    },

	    // Method for checking whether an object should be considered a model for
	    // the purposes of adding to the collection.
	    _isModel: function (model) {
	      return model instanceof Model;
	    },

	    // Internal method to create a model's ties to a collection.
	    _addReference: function(model, options) {
	      this._byId[model.cid] = model;
	      var id = this.modelId(model.attributes);
	      if (id != null) this._byId[id] = model;
	      model.on('all', this._onModelEvent, this);
	    },

	    // Internal method to sever a model's ties to a collection.
	    _removeReference: function(model, options) {
	      delete this._byId[model.cid];
	      var id = this.modelId(model.attributes);
	      if (id != null) delete this._byId[id];
	      if (this === model.collection) delete model.collection;
	      model.off('all', this._onModelEvent, this);
	    },

	    // Internal method called every time a model in the set fires an event.
	    // Sets need to update their indexes when models change ids. All other
	    // events simply proxy through. "add" and "remove" events that originate
	    // in other collections are ignored.
	    _onModelEvent: function(event, model, collection, options) {
	      if ((event === 'add' || event === 'remove') && collection !== this) return;
	      if (event === 'destroy') this.remove(model, options);
	      if (event === 'change') {
	        var prevId = this.modelId(model.previousAttributes());
	        var id = this.modelId(model.attributes);
	        if (prevId !== id) {
	          if (prevId != null) delete this._byId[prevId];
	          if (id != null) this._byId[id] = model;
	        }
	      }
	      this.trigger.apply(this, arguments);
	    }

	  });

	  // Underscore methods that we want to implement on the Collection.
	  // 90% of the core usefulness of Backbone Collections is actually implemented
	  // right here:
	  var collectionMethods = { forEach: 3, each: 3, map: 3, collect: 3, reduce: 4,
	      foldl: 4, inject: 4, reduceRight: 4, foldr: 4, find: 3, detect: 3, filter: 3,
	      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
	      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
	      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
	      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
	      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
	      sortBy: 3, indexBy: 3};

	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  addUnderscoreMethods(Collection, collectionMethods, 'models');

	  // Backbone.View
	  // -------------

	  // Backbone Views are almost more convention than they are actual code. A View
	  // is simply a JavaScript object that represents a logical chunk of UI in the
	  // DOM. This might be a single item, an entire list, a sidebar or panel, or
	  // even the surrounding frame which wraps your whole app. Defining a chunk of
	  // UI as a **View** allows you to define your DOM events declaratively, without
	  // having to worry about render order ... and makes it easy for the view to
	  // react to specific changes in the state of your models.

	  // Creating a Backbone.View creates its initial element outside of the DOM,
	  // if an existing element is not provided...
	  var View = Backbone.View = function(options) {
	    this.cid = _.uniqueId('view');
	    _.extend(this, _.pick(options, viewOptions));
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regex to split keys for `delegate`.
	  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	  // List of view options to be set as properties.
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

	  // Set up all inheritable **Backbone.View** properties and methods.
	  _.extend(View.prototype, Events, {

	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',

	    // jQuery delegate for element lookup, scoped to DOM elements within the
	    // current view. This should be preferred to global lookups where possible.
	    $: function(selector) {
	      return this.$el.find(selector);
	    },

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this`.
	    render: function() {
	      return this;
	    },

	    // Remove this view by taking the element out of the DOM, and removing any
	    // applicable Backbone.Events listeners.
	    remove: function() {
	      this._removeElement();
	      this.stopListening();
	      return this;
	    },

	    // Remove this view's element from the document and all event listeners
	    // attached to it. Exposed for subclasses using an alternative DOM
	    // manipulation API.
	    _removeElement: function() {
	      this.$el.remove();
	    },

	    // Change the view's element (`this.el` property) and re-delegate the
	    // view's events on the new element.
	    setElement: function(element) {
	      this.undelegateEvents();
	      this._setElement(element);
	      this.delegateEvents();
	      return this;
	    },

	    // Creates the `this.el` and `this.$el` references for this view using the
	    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
	    // context or an element. Subclasses can override this to utilize an
	    // alternative DOM manipulation API and are only required to set the
	    // `this.el` property.
	    _setElement: function(el) {
	      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
	      this.el = this.$el[0];
	    },

	    // Set callbacks, where `this.events` is a hash of
	    //
	    // *{"event selector": "callback"}*
	    //
	    //     {
	    //       'mousedown .title':  'edit',
	    //       'click .button':     'save',
	    //       'click .open':       function(e) { ... }
	    //     }
	    //
	    // pairs. Callbacks will be bound to the view, with `this` set properly.
	    // Uses event delegation for efficiency.
	    // Omitting the selector binds the event to `this.el`.
	    delegateEvents: function(events) {
	      events || (events = _.result(this, 'events'));
	      if (!events) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (!_.isFunction(method)) method = this[method];
	        if (!method) continue;
	        var match = key.match(delegateEventSplitter);
	        this.delegate(match[1], match[2], _.bind(method, this));
	      }
	      return this;
	    },

	    // Add a single event listener to the view's element (or a child element
	    // using `selector`). This only works for delegate-able events: not `focus`,
	    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
	    delegate: function(eventName, selector, listener) {
	      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Clears all callbacks previously bound to the view by `delegateEvents`.
	    // You usually don't need to use this, but may wish to if you have multiple
	    // Backbone views attached to the same DOM element.
	    undelegateEvents: function() {
	      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    },

	    // A finer-grained `undelegateEvents` for removing a single delegated event.
	    // `selector` and `listener` are both optional.
	    undelegate: function(eventName, selector, listener) {
	      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Produces a DOM element to be assigned to your view. Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _createElement: function(tagName) {
	      return document.createElement(tagName);
	    },

	    // Ensure that the View has a DOM element to render into.
	    // If `this.el` is a string, pass it through `$()`, take the first
	    // matching element, and re-assign it to `el`. Otherwise, create
	    // an element from the `id`, `className` and `tagName` properties.
	    _ensureElement: function() {
	      if (!this.el) {
	        var attrs = _.extend({}, _.result(this, 'attributes'));
	        if (this.id) attrs.id = _.result(this, 'id');
	        if (this.className) attrs['class'] = _.result(this, 'className');
	        this.setElement(this._createElement(_.result(this, 'tagName')));
	        this._setAttributes(attrs);
	      } else {
	        this.setElement(_.result(this, 'el'));
	      }
	    },

	    // Set attributes from a hash on this view's element.  Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _setAttributes: function(attributes) {
	      this.$el.attr(attributes);
	    }

	  });

	  // Backbone.sync
	  // -------------

	  // Override this function to change the manner in which Backbone persists
	  // models to the server. You will be passed the type of request, and the
	  // model in question. By default, makes a RESTful Ajax request
	  // to the model's `url()`. Some possible customizations could be:
	  //
	  // * Use `setTimeout` to batch rapid-fire updates into a single request.
	  // * Send up the models as XML instead of JSON.
	  // * Persist models via WebSockets instead of Ajax.
	  //
	  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	  // as `POST`, with a `_method` parameter containing the true HTTP method,
	  // as well as all requests with the body as `application/x-www-form-urlencoded`
	  // instead of `application/json` with the model in a param named `model`.
	  // Useful when interfacing with server-side languages like **PHP** that make
	  // it difficult to read the body of `PUT` requests.
	  Backbone.sync = function(method, model, options) {
	    var type = methodMap[method];

	    // Default options, unless specified.
	    _.defaults(options || (options = {}), {
	      emulateHTTP: Backbone.emulateHTTP,
	      emulateJSON: Backbone.emulateJSON
	    });

	    // Default JSON-request options.
	    var params = {type: type, dataType: 'json'};

	    // Ensure that we have a URL.
	    if (!options.url) {
	      params.url = _.result(model, 'url') || urlError();
	    }

	    // Ensure that we have the appropriate request data.
	    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	      params.contentType = 'application/json';
	      params.data = JSON.stringify(options.attrs || model.toJSON(options));
	    }

	    // For older servers, emulate JSON by encoding the request into an HTML-form.
	    if (options.emulateJSON) {
	      params.contentType = 'application/x-www-form-urlencoded';
	      params.data = params.data ? {model: params.data} : {};
	    }

	    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	    // And an `X-HTTP-Method-Override` header.
	    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
	      params.type = 'POST';
	      if (options.emulateJSON) params.data._method = type;
	      var beforeSend = options.beforeSend;
	      options.beforeSend = function(xhr) {
	        xhr.setRequestHeader('X-HTTP-Method-Override', type);
	        if (beforeSend) return beforeSend.apply(this, arguments);
	      };
	    }

	    // Don't process data on a non-GET request.
	    if (params.type !== 'GET' && !options.emulateJSON) {
	      params.processData = false;
	    }

	    // Pass along `textStatus` and `errorThrown` from jQuery.
	    var error = options.error;
	    options.error = function(xhr, textStatus, errorThrown) {
	      options.textStatus = textStatus;
	      options.errorThrown = errorThrown;
	      if (error) error.call(options.context, xhr, textStatus, errorThrown);
	    };

	    // Make the request, allowing the user to override any Ajax options.
	    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	    model.trigger('request', model, xhr, options);
	    return xhr;
	  };

	  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	  var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'patch':  'PATCH',
	    'delete': 'DELETE',
	    'read':   'GET'
	  };

	  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
	  // Override this if you'd like to use a different library.
	  Backbone.ajax = function() {
	    return Backbone.$.ajax.apply(Backbone.$, arguments);
	  };

	  // Backbone.Router
	  // ---------------

	  // Routers map faux-URLs to actions, and fire events when routes are
	  // matched. Creating a new one sets its `routes` hash, if not set statically.
	  var Router = Backbone.Router = function(options) {
	    options || (options = {});
	    if (options.routes) this.routes = options.routes;
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var optionalParam = /\((.*?)\)/g;
	  var namedParam    = /(\(\?)?:\w+/g;
	  var splatParam    = /\*\w+/g;
	  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	  // Set up all inheritable **Backbone.Router** properties and methods.
	  _.extend(Router.prototype, Events, {

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Manually bind a single named route to a callback. For example:
	    //
	    //     this.route('search/:query/p:num', 'search', function(query, num) {
	    //       ...
	    //     });
	    //
	    route: function(route, name, callback) {
	      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
	      if (_.isFunction(name)) {
	        callback = name;
	        name = '';
	      }
	      if (!callback) callback = this[name];
	      var router = this;
	      Backbone.history.route(route, function(fragment) {
	        var args = router._extractParameters(route, fragment);
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route:' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	      return this;
	    },

	    // Execute a route handler with the provided parameters.  This is an
	    // excellent place to do pre-route setup or post-route cleanup.
	    execute: function(callback, args, name) {
	      if (callback) callback.apply(this, args);
	    },

	    // Simple proxy to `Backbone.history` to save a fragment into the history.
	    navigate: function(fragment, options) {
	      Backbone.history.navigate(fragment, options);
	      return this;
	    },

	    // Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function() {
	      if (!this.routes) return;
	      this.routes = _.result(this, 'routes');
	      var route, routes = _.keys(this.routes);
	      while ((route = routes.pop()) != null) {
	        this.route(route, this.routes[route]);
	      }
	    },

	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function(route) {
	      route = route.replace(escapeRegExp, '\\$&')
	                   .replace(optionalParam, '(?:$1)?')
	                   .replace(namedParam, function(match, optional) {
	                     return optional ? match : '([^/?]+)';
	                   })
	                   .replace(splatParam, '([^?]*?)');
	      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	    },

	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function(route, fragment) {
	      var params = route.exec(fragment).slice(1);
	      return _.map(params, function(param, i) {
	        // Don't decode the search params.
	        if (i === params.length - 1) return param || null;
	        return param ? decodeURIComponent(param) : null;
	      });
	    }

	  });

	  // Backbone.History
	  // ----------------

	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = Backbone.History = function() {
	    this.handlers = [];
	    this.checkUrl = _.bind(this.checkUrl, this);

	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };

	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;

	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;

	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;

	  // Has the history handling already been started?
	  History.started = false;

	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, Events, {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Are we at the app root?
	    atRoot: function() {
	      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
	      return path === this.root && !this.getSearch();
	    },

	    // Does the pathname match the root?
	    matchRoot: function() {
	      var path = this.decodeFragment(this.location.pathname);
	      var root = path.slice(0, this.root.length - 1) + '/';
	      return root === this.root;
	    },

	    // Unicode characters in `location.pathname` are percent encoded so they're
	    // decoded for comparison. `%25` should not be decoded since it may be part
	    // of an encoded parameter.
	    decodeFragment: function(fragment) {
	      return decodeURI(fragment.replace(/%25/g, '%2525'));
	    },

	    // In IE6, the hash fragment and search params are incorrect if the
	    // fragment contains `?`.
	    getSearch: function() {
	      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
	      return match ? match[0] : '';
	    },

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the pathname and search params, without the root.
	    getPath: function() {
	      var path = this.decodeFragment(
	        this.location.pathname + this.getSearch()
	      ).slice(this.root.length - 1);
	      return path.charAt(0) === '/' ? path.slice(1) : path;
	    },

	    // Get the cross-browser normalized URL fragment from the path or hash.
	    getFragment: function(fragment) {
	      if (fragment == null) {
	        if (this._usePushState || !this._wantsHashChange) {
	          fragment = this.getPath();
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function(options) {
	      if (History.started) throw new Error('Backbone.history has already been started');
	      History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options          = _.extend({root: '/'}, this.options, options);
	      this.root             = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
	      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
	      this._wantsPushState  = !!this.options.pushState;
	      this._hasPushState    = !!(this.history && this.history.pushState);
	      this._usePushState    = this._wantsPushState && this._hasPushState;
	      this.fragment         = this.getFragment();

	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {

	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          var root = this.root.slice(0, -1) || '/';
	          this.location.replace(root + '#' + this.getPath());
	          // Return immediately as browser will do redirect to new url
	          return true;

	        // Or if we've started out with a hash-based route, but we're currently
	        // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot()) {
	          this.navigate(this.getHash(), {replace: true});
	        }

	      }

	      // Proxy an iframe to handle location events if the browser doesn't
	      // support the `hashchange` event, HTML5 history, or the user wants
	      // `hashChange` but not `pushState`.
	      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'javascript:0';
	        this.iframe.style.display = 'none';
	        this.iframe.tabIndex = -1;
	        var body = document.body;
	        // Using `appendChild` will throw on IE < 9 if the document is not ready.
	        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
	        iWindow.document.open();
	        iWindow.document.close();
	        iWindow.location.hash = '#' + this.fragment;
	      }

	      // Add a cross-platform `addEventListener` shim for older browsers.
	      var addEventListener = window.addEventListener || function (eventName, listener) {
	        return attachEvent('on' + eventName, listener);
	      };

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._usePushState) {
	        addEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        addEventListener('hashchange', this.checkUrl, false);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }

	      if (!this.options.silent) return this.loadUrl();
	    },

	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      // Add a cross-platform `removeEventListener` shim for older browsers.
	      var removeEventListener = window.removeEventListener || function (eventName, listener) {
	        return detachEvent('on' + eventName, listener);
	      };

	      // Remove window listeners.
	      if (this._usePushState) {
	        removeEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        removeEventListener('hashchange', this.checkUrl, false);
	      }

	      // Clean up the iframe if necessary.
	      if (this.iframe) {
	        document.body.removeChild(this.iframe);
	        this.iframe = null;
	      }

	      // Some environments will throw when clearing an undefined interval.
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function(e) {
	      var current = this.getFragment();

	      // If the user pressed the back button, the iframe's hash will have
	      // changed and we should use that for comparison.
	      if (current === this.fragment && this.iframe) {
	        current = this.getHash(this.iframe.contentWindow);
	      }

	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragment) {
	      // If the root doesn't match, no routes can match either.
	      if (!this.matchRoot()) return false;
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.some(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = {trigger: !!options};

	      // Normalize the fragment.
	      fragment = this.getFragment(fragment || '');

	      // Don't include a trailing slash on the root.
	      var root = this.root;
	      if (fragment === '' || fragment.charAt(0) === '?') {
	        root = root.slice(0, -1) || '/';
	      }
	      var url = root + fragment;

	      // Strip the hash and decode for matching.
	      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

	      if (this.fragment === fragment) return;
	      this.fragment = fragment;

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._usePushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && (fragment !== this.getHash(this.iframe.contentWindow))) {
	          var iWindow = this.iframe.contentWindow;

	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if (!options.replace) {
	            iWindow.document.open();
	            iWindow.document.close();
	          }

	          this._updateHash(iWindow.location, fragment, options.replace);
	        }

	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }

	  });

	  // Create the default Backbone.history.
	  Backbone.history = new History;

	  // Helpers
	  // -------

	  // Helper function to correctly set up the prototype chain for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var extend = function(protoProps, staticProps) {
	    var parent = this;
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function(){ return parent.apply(this, arguments); };
	    }

	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent` constructor function.
	    var Surrogate = function(){ this.constructor = child; };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;

	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) _.extend(child.prototype, protoProps);

	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;

	    return child;
	  };

	  // Set up inheritance for the model, collection, router, view and history.
	  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

	  // Throw an error when a URL is needed, and none is supplied.
	  var urlError = function() {
	    throw new Error('A "url" property or function must be specified');
	  };

	  // Wrap an optional error callback with a fallback error event.
	  var wrapError = function(model, options) {
	    var error = options.error;
	    options.error = function(resp) {
	      if (error) error.call(options.context, model, resp, options);
	      model.trigger('error', model, resp, options);
	    };
	  };

	  return Backbone;

	}));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.0
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-01-08T20:02Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.0",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if ( document.msFullscreenElement && window.top !== window ) {

			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if ( elem.getClientRects().length ) {
				val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
			}
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					// Support: IE<11
					// option.value not trimmed (#14858)
					return jQuery.trim( elem.value );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
								jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true

					// Previously, `originalEvent: {}` was set here, so stopPropagation call
					// would not be triggered on donor event, since in our own
					// jQuery.event.stopPropagation function we had a check for existence of
					// originalEvent.stopPropagation method, so, consequently it would be a noop.
					//
					// But now, this "simulate" function is used only for events
					// for which stopPropagation() is noop, so there is no need for that anymore.
					//
					// For the compat branch though, guard for "click" and "submit"
					// events is still used, but was moved to jQuery.event.stopPropagation function
					// because `originalEvent` should point to the original event for the constancy
					// with other events and for more focused logic
				}
			);

			jQuery.event.trigger( e, null, elem );

			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8+
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		context = context || ( support.createHTMLDocument ?
			document.implementation.createHTMLDocument( "" ) :
			document );

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				// Subtract offsetParent scroll positions
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
					offsetParent.scrollTop();
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
					offsetParent.scrollLeft();
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {// MarionetteJS (Backbone.Marionette)
	// ----------------------------------
	// v3.0.0
	//
	// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
	// Distributed under MIT license
	//
	// http://marionettejs.com


	(function (global, factory) {
		 true ? module.exports = factory(__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(6)) :
		typeof define === 'function' && define.amd ? define(['backbone', 'underscore', 'backbone.radio', 'backbone.babysitter'], factory) :
		(global.Marionette  = global = global.Marionette  = global || {}, global.Marionette  = global.Mn = factory(global.Backbone,global._,global.Backbone.Radio,global.Backbone.ChildViewContainer));
	}(this, function (Backbone,_$1,Radio,ChildViewContainer) { 'use strict';

		Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
		_$1 = 'default' in _$1 ? _$1['default'] : _$1;
		Radio = 'default' in Radio ? Radio['default'] : Radio;
		ChildViewContainer = 'default' in ChildViewContainer ? ChildViewContainer['default'] : ChildViewContainer;

		var babelHelpers = {};

		babelHelpers.toConsumableArray = function (arr) {
		  if (Array.isArray(arr)) {
		    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

		    return arr2;
		  } else {
		    return Array.from(arr);
		  }
		};

		babelHelpers;

		var version = "3.0.0";

		//Internal utility for creating context style global utils
		var proxy = function proxy(method) {
		  return function (context) {
		    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }

		    return method.apply(context, args);
		  };
		};

		// Borrow the Backbone `extend` method so we can use it as needed
		var extend = Backbone.Model.extend;

		// Determine if `el` is a child of the document
		var isNodeAttached = function isNodeAttached(el) {
		  return Backbone.$.contains(document.documentElement, el);
		};

		// Merge `keys` from `options` onto `this`
		var mergeOptions = function mergeOptions(options, keys) {
		  if (!options) {
		    return;
		  }
		  _$1.extend(this, _$1.pick(options, keys));
		};

		// Marionette.getOption
		// --------------------

		// Retrieve an object, function or other value from the
		// object or its `options`, with `options` taking precedence.
		var getOption = function getOption(optionName) {
		  if (!optionName) {
		    return;
		  }
		  if (this.options && this.options[optionName] !== undefined) {
		    return this.options[optionName];
		  } else {
		    return this[optionName];
		  }
		};

		// Marionette.normalizeMethods
		// ----------------------

		// Pass in a mapping of events => functions or function names
		// and return a mapping of events => functions
		var normalizeMethods = function normalizeMethods(hash) {
		  return _$1.reduce(hash, function (normalizedHash, method, name) {
		    if (!_$1.isFunction(method)) {
		      method = this[method];
		    }
		    if (method) {
		      normalizedHash[name] = method;
		    }
		    return normalizedHash;
		  }, {}, this);
		};

		var deprecate = function deprecate(message, test) {
		  if (_$1.isObject(message)) {
		    message = message.prev + ' is going to be removed in the future. ' + 'Please use ' + message.next + ' instead.' + (message.url ? ' See: ' + message.url : '');
		  }

		  if (!Marionette.DEV_MODE) {
		    return;
		  }

		  if ((test === undefined || !test) && !deprecate._cache[message]) {
		    deprecate._warn('Deprecation warning: ' + message);
		    deprecate._cache[message] = true;
		  }
		};

		deprecate._console = typeof console !== 'undefined' ? console : {};
		deprecate._warn = function () {
		  var warn = deprecate._console.warn || deprecate._console.log || function () {};
		  return warn.apply(deprecate._console, arguments);
		};
		deprecate._cache = {};

		// split the event name on the ":"
		var splitter = /(^|:)(\w)/gi;

		// take the event section ("section1:section2:section3")
		// and turn it in to uppercase name onSection1Section2Section3
		function getEventName(match, prefix, eventName) {
		  return eventName.toUpperCase();
		}

		// Trigger an event and/or a corresponding method name. Examples:
		//
		// `this.triggerMethod("foo")` will trigger the "foo" event and
		// call the "onFoo" method.
		//
		// `this.triggerMethod("foo:bar")` will trigger the "foo:bar" event and
		// call the "onFooBar" method.
		function triggerMethod(event) {
		  // get the method name from the event name
		  var methodName = 'on' + event.replace(splitter, getEventName);
		  var method = getOption.call(this, methodName);
		  var result;

		  // call the onMethodName if it exists

		  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		    args[_key - 1] = arguments[_key];
		  }

		  if (_$1.isFunction(method)) {
		    // pass all args, except the event name
		    result = method.apply(this, args);
		  }

		  // trigger the event
		  this.trigger.apply(this, [event].concat(args));

		  return result;
		}

		// triggerMethodOn invokes triggerMethod on a specific context
		//
		// e.g. `Marionette.triggerMethodOn(view, 'show')`
		// will trigger a "show" event or invoke onShow the view.
		function triggerMethodOn(context) {
		  var fnc = _$1.isFunction(context.triggerMethod) ? context.triggerMethod : triggerMethod;

		  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		    args[_key2 - 1] = arguments[_key2];
		  }

		  return fnc.apply(context, args);
		}

		// Trigger method on children unless a pure Backbone.View
		function triggerMethodChildren(view, event, beforeEachTrigger) {
		  if (!view._getImmediateChildren) {
		    return;
		  }
		  _.each(view._getImmediateChildren(), function (child) {
		    if (beforeEachTrigger) {
		      beforeEachTrigger(child);
		    }
		    triggerMethodOn(child, event, child);
		  });
		}

		function setIsAttached(view) {
		  view._isAttached = true;
		}

		function unsetIsAttached(view) {
		  view._isAttached = false;
		}

		// Monitor a view's state, propagating attach/detach events to children and firing dom:refresh
		// whenever a rendered view is attached or an attached view is rendered.
		function MonitorViewEvents(view) {
		  if (view._areViewEventsMonitored) {
		    return;
		  }

		  view._areViewEventsMonitored = true;

		  function handleBeforeAttach() {
		    triggerMethodChildren(view, 'before:attach');
		  }

		  function handleAttach() {
		    triggerMethodChildren(view, 'attach', setIsAttached);
		    triggerDOMRefresh();
		  }

		  function handleBeforeDetach() {
		    triggerMethodChildren(view, 'before:detach');
		  }

		  function handleDetach() {
		    triggerMethodChildren(view, 'detach', unsetIsAttached);
		  }

		  function handleRender() {
		    triggerDOMRefresh();
		  }

		  function triggerDOMRefresh() {
		    if (view._isAttached && view._isRendered) {
		      triggerMethodOn(view, 'dom:refresh', view);
		    }
		  }

		  view.on({
		    'before:attach': handleBeforeAttach,
		    'attach': handleAttach,
		    'before:detach': handleBeforeDetach,
		    'detach': handleDetach,
		    'render': handleRender
		  });
		}

		// Similar to `_.result`, this is a simple helper
		// If a function is provided we call it with context
		// otherwise just return the value. If the value is
		// undefined return a default value
		var getValue = function getValue(value) {
		  if (_$1.isFunction(value)) {
		    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }

		    return value.apply(this, args);
		  }
		  return value;
		};

		// Internal utility for setting options consistently across Mn
		var _setOptions = function _setOptions() {
		  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		    args[_key] = arguments[_key];
		  }

		  this.options = _$1.extend.apply(_$1, [{}, _$1.result(this, 'options')].concat(args));
		};

		var errorProps = ['description', 'fileName', 'lineNumber', 'name', 'message', 'number'];

		var MarionetteError = extend.call(Error, {
		  urlRoot: 'http://marionettejs.com/docs/v' + version + '/',

		  constructor: function MarionetteError(message, options) {
		    if (_$1.isObject(message)) {
		      options = message;
		      message = options.message;
		    } else if (!options) {
		      options = {};
		    }

		    var error = Error.call(this, message);
		    _$1.extend(this, _$1.pick(error, errorProps), _$1.pick(options, errorProps));

		    this.captureStackTrace();

		    if (options.url) {
		      this.url = this.urlRoot + options.url;
		    }
		  },

		  captureStackTrace: function captureStackTrace() {
		    if (Error.captureStackTrace) {
		      Error.captureStackTrace(this, MarionetteError);
		    }
		  },

		  toString: function toString() {
		    return this.name + ': ' + this.message + (this.url ? ' See: ' + this.url : '');
		  }
		});

		MarionetteError.extend = extend;

		// Bind/unbind the event to handlers specified as a string of
		// handler names on the target object
		function bindFromStrings(target, entity, evt, methods, actionName) {
		  var methodNames = methods.split(/\s+/);

		  _$1.each(methodNames, function (methodName) {
		    var method = target[methodName];
		    if (!method) {
		      throw new MarionetteError('Method "' + methodName + '" was configured as an event handler, but does not exist.');
		    }

		    target[actionName](entity, evt, method);
		  });
		}

		// generic looping function
		function iterateEvents(target, entity, bindings, actionName) {
		  if (!entity || !bindings) {
		    return;
		  }

		  // type-check bindings
		  if (!_$1.isObject(bindings)) {
		    throw new MarionetteError({
		      message: 'Bindings must be an object.',
		      url: 'marionette.functions.html#marionettebindentityevents'
		    });
		  }

		  // iterate the bindings and bind/unbind them
		  _$1.each(bindings, function (method, evt) {

		    // allow for a list of method names as a string
		    if (_$1.isString(method)) {
		      bindFromStrings(target, entity, evt, method, actionName);
		      return;
		    }

		    target[actionName](entity, evt, method);
		  });
		}

		function bindEntityEvents(entity, bindings) {
		  iterateEvents(this, entity, bindings, 'listenTo');
		}

		function unbindEntityEvents(entity, bindings) {
		  iterateEvents(this, entity, bindings, 'stopListening');
		}

		var CommonMixin = {
		  getValue: getValue,

		  // Imports the "normalizeMethods" to transform hashes of
		  // events=>function references/names to a hash of events=>function references
		  normalizeMethods: normalizeMethods,

		  _setOptions: _setOptions,

		  // A handy way to merge passed-in options onto the instance
		  mergeOptions: mergeOptions,

		  // Enable getting options from this or this.options by name.
		  getOption: getOption,

		  // Enable binding view's events from another entity.
		  bindEntityEvents: bindEntityEvents,

		  // Enable unbinding view's events from another entity.
		  unbindEntityEvents: unbindEntityEvents
		};

		function iterateReplies(target, channel, bindings, actionName) {
		  if (!channel || !bindings) {
		    return;
		  }

		  // type-check bindings
		  if (!_$1.isObject(bindings)) {
		    throw new MarionetteError({
		      message: 'Bindings must be an object.',
		      url: 'marionette.functions.html#marionettebindradiorequests'
		    });
		  }

		  var normalizedRadioRequests = normalizeMethods.call(target, bindings);

		  channel[actionName](normalizedRadioRequests, target);
		}

		function bindRadioRequests(channel, bindings) {
		  iterateReplies(this, channel, bindings, 'reply');
		}

		function unbindRadioRequests(channel, bindings) {
		  iterateReplies(this, channel, bindings, 'stopReplying');
		}

		var RadioMixin = {

		  _initRadio: function _initRadio() {
		    var channelName = this.getValue(this.getOption('channelName'));

		    if (!channelName) {
		      return;
		    }

		    var channel = this._channel = Radio.channel(channelName);

		    var radioEvents = this.getValue(this.getOption('radioEvents'));
		    this.bindRadioEvents(channel, radioEvents);

		    var radioRequests = this.getValue(this.getOption('radioRequests'));
		    this.bindRadioRequests(channel, radioRequests);

		    this.on('destroy', this._destroyRadio);
		  },

		  _destroyRadio: function _destroyRadio() {
		    this._channel.stopReplying(null, null, this);
		  },

		  getChannel: function getChannel() {
		    return this._channel;
		  },

		  // Proxy `bindRadioEvents`
		  bindRadioEvents: bindEntityEvents,

		  // Proxy `unbindRadioEvents`
		  unbindRadioEvents: unbindEntityEvents,

		  // Proxy `bindRadioRequests`
		  bindRadioRequests: bindRadioRequests,

		  // Proxy `unbindRadioRequests`
		  unbindRadioRequests: unbindRadioRequests

		};

		// A Base Class that other Classes should descend from.
		// Object borrows many conventions and utilities from Backbone.
		var MarionetteObject = function MarionetteObject(options) {
		  this._setOptions(options);
		  this.cid = _$1.uniqueId(this.cidPrefix);
		  this._initRadio();
		  this.initialize.apply(this, arguments);
		};

		MarionetteObject.extend = extend;

		// Object Methods
		// --------------

		// Ensure it can trigger events with Backbone.Events
		_$1.extend(MarionetteObject.prototype, Backbone.Events, CommonMixin, RadioMixin, {
		  cidPrefix: 'mno',

		  // for parity with Marionette.AbstractView lifecyle
		  _isDestroyed: false,

		  isDestroyed: function isDestroyed() {
		    return this._isDestroyed();
		  },

		  //this is a noop method intended to be overridden by classes that extend from this base
		  initialize: function initialize() {},

		  destroy: function destroy() {
		    if (this._isDestroyed) {
		      return this;
		    }

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    this.triggerMethod.apply(this, ['before:destroy'].concat(args));

		    // mark as destroyed before doing the actual destroy, to
		    // prevent infinite loops within "destroy" event handlers
		    this._isDestroyed = true;
		    this.triggerMethod.apply(this, ['destroy'].concat(args));
		    this.stopListening();

		    return this;
		  },

		  triggerMethod: triggerMethod
		});

		// Manage templates stored in `<script>` blocks,
		// caching them for faster access.
		var TemplateCache = function TemplateCache(templateId) {
		  this.templateId = templateId;
		};

		// TemplateCache object-level methods. Manage the template
		// caches from these method calls instead of creating
		// your own TemplateCache instances
		_$1.extend(TemplateCache, {
		  templateCaches: {},

		  // Get the specified template by id. Either
		  // retrieves the cached version, or loads it
		  // from the DOM.
		  get: function get(templateId, options) {
		    var cachedTemplate = this.templateCaches[templateId];

		    if (!cachedTemplate) {
		      cachedTemplate = new TemplateCache(templateId);
		      this.templateCaches[templateId] = cachedTemplate;
		    }

		    return cachedTemplate.load(options);
		  },

		  // Clear templates from the cache. If no arguments
		  // are specified, clears all templates:
		  // `clear()`
		  //
		  // If arguments are specified, clears each of the
		  // specified templates from the cache:
		  // `clear("#t1", "#t2", "...")`
		  clear: function clear() {
		    var i;

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    var length = args.length;

		    if (length > 0) {
		      for (i = 0; i < length; i++) {
		        delete this.templateCaches[args[i]];
		      }
		    } else {
		      this.templateCaches = {};
		    }
		  }
		});

		// TemplateCache instance methods, allowing each
		// template cache object to manage its own state
		// and know whether or not it has been loaded
		_$1.extend(TemplateCache.prototype, {

		  // Internal method to load the template
		  load: function load(options) {
		    // Guard clause to prevent loading this template more than once
		    if (this.compiledTemplate) {
		      return this.compiledTemplate;
		    }

		    // Load the template and compile it
		    var template = this.loadTemplate(this.templateId, options);
		    this.compiledTemplate = this.compileTemplate(template, options);

		    return this.compiledTemplate;
		  },

		  // Load a template from the DOM, by default. Override
		  // this method to provide your own template retrieval
		  // For asynchronous loading with AMD/RequireJS, consider
		  // using a template-loader plugin as described here:
		  // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
		  loadTemplate: function loadTemplate(templateId, options) {
		    var $template = Backbone.$(templateId);

		    if (!$template.length) {
		      throw new MarionetteError({
		        name: 'NoTemplateError',
		        message: 'Could not find template: "' + templateId + '"'
		      });
		    }
		    return $template.html();
		  },

		  // Pre-compile the template before caching it. Override
		  // this method if you do not need to pre-compile a template
		  // (JST / RequireJS for example) or if you want to change
		  // the template engine used (Handebars, etc).
		  compileTemplate: function compileTemplate(rawTemplate, options) {
		    return _$1.template(rawTemplate, options);
		  }
		});

		// Render a template with data by passing in the template
		// selector and the data to render.
		var Renderer = {

		  // Render a template with data. The `template` parameter is
		  // passed to the `TemplateCache` object to retrieve the
		  // template function. Override this method to provide your own
		  // custom rendering and template handling for all of Marionette.
		  render: function render(template, data) {
		    if (!template) {
		      throw new MarionetteError({
		        name: 'TemplateNotFoundError',
		        message: 'Cannot render the template since its false, null or undefined.'
		      });
		    }

		    var templateFunc = _$1.isFunction(template) ? template : TemplateCache.get(template);

		    return templateFunc(data);
		  }
		};

		// Takes care of getting the behavior class
		// given options and a key.
		// If a user passes in options.behaviorClass
		// default to using that.
		// If a user passes in a Behavior Class directly, use that
		// Otherwise delegate the lookup to the users `behaviorsLookup` implementation.
		function getBehaviorClass(options, key) {
		  if (options.behaviorClass) {
		    return options.behaviorClass;
		    //treat functions as a Behavior constructor
		  } else if (_$1.isFunction(options)) {
		      return options;
		    }

		  // behaviorsLookup can be either a flat object or a method
		  return getValue(Marionette.Behaviors.behaviorsLookup, options, key)[key];
		}

		// Iterate over the behaviors object, for each behavior
		// instantiate it and get its grouped behaviors.
		// This accepts a list of behaviors in either an object or array form
		function parseBehaviors(view, behaviors) {
		  return _$1.chain(behaviors).map(function (options, key) {
		    var BehaviorClass = getBehaviorClass(options, key);
		    //if we're passed a class directly instead of an object
		    var _options = options === BehaviorClass ? {} : options;
		    var behavior = new BehaviorClass(_options, view);
		    var nestedBehaviors = parseBehaviors(view, _$1.result(behavior, 'behaviors'));

		    return [behavior].concat(nestedBehaviors);
		  }).flatten().value();
		}

		var BehaviorsMixin = {
		  _initBehaviors: function _initBehaviors() {
		    var behaviors = this.getValue(this.getOption('behaviors'));

		    // Behaviors defined on a view can be a flat object literal
		    // or it can be a function that returns an object.
		    this._behaviors = _$1.isObject(behaviors) ? parseBehaviors(this, behaviors) : {};
		  },

		  _getBehaviorTriggers: function _getBehaviorTriggers() {
		    var triggers = _$1.invoke(this._behaviors, 'getTriggers');
		    return _$1.extend.apply(_$1, [{}].concat(babelHelpers.toConsumableArray(triggers)));
		  },

		  _getBehaviorEvents: function _getBehaviorEvents() {
		    var events = _$1.invoke(this._behaviors, 'getEvents');
		    return _$1.extend.apply(_$1, [{}].concat(babelHelpers.toConsumableArray(events)));
		  },

		  // proxy behavior $el to the view's $el.
		  _proxyBehaviorViewProperties: function _proxyBehaviorViewProperties() {
		    _$1.invoke(this._behaviors, 'proxyViewProperties');
		  },

		  // delegate modelEvents and collectionEvents
		  _delegateBehaviorEntityEvents: function _delegateBehaviorEntityEvents() {
		    _$1.invoke(this._behaviors, 'delegateEntityEvents');
		  },

		  // undelegate modelEvents and collectionEvents
		  _undelegateBehaviorEntityEvents: function _undelegateBehaviorEntityEvents() {
		    _$1.invoke(this._behaviors, 'undelegateEntityEvents');
		  },

		  _destroyBehaviors: function _destroyBehaviors(args) {
		    // Call destroy on each behavior after
		    // destroying the view.
		    // This unbinds event listeners
		    // that behaviors have registered for.
		    _$1.invoke.apply(_$1, [this._behaviors, 'destroy'].concat(babelHelpers.toConsumableArray(args)));
		  },

		  _bindBehaviorUIElements: function _bindBehaviorUIElements() {
		    _$1.invoke(this._behaviors, 'bindUIElements');
		  },

		  _unbindBehaviorUIElements: function _unbindBehaviorUIElements() {
		    _$1.invoke(this._behaviors, 'unbindUIElements');
		  },

		  _triggerEventOnBehaviors: function _triggerEventOnBehaviors() {
		    var behaviors = this._behaviors;
		    // Use good ol' for as this is a very hot function

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    for (var i = 0, length = behaviors && behaviors.length; i < length; i++) {
		      triggerMethod.apply(behaviors[i], args);
		    }
		  }
		};

		var DelegateEntityEventsMixin = {
		  // Handle `modelEvents`, and `collectionEvents` configuration
		  _delegateEntityEvents: function _delegateEntityEvents(model, collection) {
		    this._undelegateEntityEvents(model, collection);

		    var modelEvents = this.getValue(this.getOption('modelEvents'));
		    bindEntityEvents.call(this, model, modelEvents);

		    var collectionEvents = this.getValue(this.getOption('collectionEvents'));
		    bindEntityEvents.call(this, collection, collectionEvents);
		  },

		  _undelegateEntityEvents: function _undelegateEntityEvents(model, collection) {
		    var modelEvents = this.getValue(this.getOption('modelEvents'));
		    unbindEntityEvents.call(this, model, modelEvents);

		    var collectionEvents = this.getValue(this.getOption('collectionEvents'));
		    unbindEntityEvents.call(this, collection, collectionEvents);
		  }
		};

		// Borrow event splitter from Backbone
		var delegateEventSplitter = /^(\S+)\s*(.*)$/;

		function uniqueName(eventName, selector) {
		  return [eventName + _$1.uniqueId('.evt'), selector].join(' ');
		}

		// Set event name to be namespaced using a unique index
		// to generate a non colliding event namespace
		// http://api.jquery.com/event.namespace/
		var getUniqueEventName = function getUniqueEventName(eventName) {
		  var match = eventName.match(delegateEventSplitter);
		  return uniqueName(match[1], match[2]);
		};

		// Internal method to create an event handler for a given `triggerDef` like
		// 'click:foo'
		function buildViewTrigger(view, triggerDef) {
		  if (_$1.isString(triggerDef)) {
		    triggerDef = { event: triggerDef };
		  }

		  var eventName = triggerDef.event;
		  var shouldPreventDefault = triggerDef.preventDefault !== false;
		  var shouldStopPropagation = triggerDef.stopPropagation !== false;

		  return function (e) {
		    if (shouldPreventDefault) {
		      e.preventDefault();
		    }

		    if (shouldStopPropagation) {
		      e.stopPropagation();
		    }

		    view.triggerMethod(eventName, view);
		  };
		}

		var TriggersMixin = {

		  // Configure `triggers` to forward DOM events to view
		  // events. `triggers: {"click .foo": "do:foo"}`
		  _getViewTriggers: function _getViewTriggers(view, triggers) {
		    // Configure the triggers, prevent default
		    // action and stop propagation of DOM events
		    return _$1.reduce(triggers, function (events, value, key) {
		      key = getUniqueEventName(key);
		      events[key] = buildViewTrigger(view, value);
		      return events;
		    }, {}, this);
		  }

		};

		// allows for the use of the @ui. syntax within
		// a given key for triggers and events
		// swaps the @ui with the associated selector.
		// Returns a new, non-mutated, parsed events hash.
		var _normalizeUIKeys = function _normalizeUIKeys(hash, ui) {
		  return _$1.reduce(hash, function (memo, val, key) {
		    var normalizedKey = normalizeUIString(key, ui);
		    memo[normalizedKey] = val;
		    return memo;
		  }, {});
		};

		// utility method for parsing @ui. syntax strings
		// into associated selector
		var normalizeUIString = function normalizeUIString(uiString, ui) {
		  return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function (r) {
		    return ui[r.slice(4)];
		  });
		};

		// allows for the use of the @ui. syntax within
		// a given value for regions
		// swaps the @ui with the associated selector
		var _normalizeUIValues = function _normalizeUIValues(hash, ui, properties) {
		  _$1.each(hash, function (val, key) {
		    if (_$1.isString(val)) {
		      hash[key] = normalizeUIString(val, ui);
		    } else if (_$1.isObject(val) && _$1.isArray(properties)) {
		      _$1.extend(val, _normalizeUIValues(_$1.pick(val, properties), ui));
		      /* Value is an object, and we got an array of embedded property names to normalize. */
		      _$1.each(properties, function (property) {
		        var propertyVal = val[property];
		        if (_$1.isString(propertyVal)) {
		          val[property] = normalizeUIString(propertyVal, ui);
		        }
		      });
		    }
		  });
		  return hash;
		};

		var UIMixin = {

		  // normalize the keys of passed hash with the views `ui` selectors.
		  // `{"@ui.foo": "bar"}`
		  normalizeUIKeys: function normalizeUIKeys(hash) {
		    var uiBindings = this._getUIBindings();
		    return _normalizeUIKeys(hash, uiBindings);
		  },

		  // normalize the values of passed hash with the views `ui` selectors.
		  // `{foo: "@ui.bar"}`
		  normalizeUIValues: function normalizeUIValues(hash, properties) {
		    var uiBindings = this._getUIBindings();
		    return _normalizeUIValues(hash, uiBindings, properties);
		  },

		  _getUIBindings: function _getUIBindings() {
		    var uiBindings = _$1.result(this, '_uiBindings');
		    var ui = _$1.result(this, 'ui');
		    return uiBindings || ui;
		  },

		  // This method binds the elements specified in the "ui" hash inside the view's code with
		  // the associated jQuery selectors.
		  _bindUIElements: function _bindUIElements() {
		    if (!this.ui) {
		      return;
		    }

		    // store the ui hash in _uiBindings so they can be reset later
		    // and so re-rendering the view will be able to find the bindings
		    if (!this._uiBindings) {
		      this._uiBindings = this.ui;
		    }

		    // get the bindings result, as a function or otherwise
		    var bindings = _$1.result(this, '_uiBindings');

		    // empty the ui so we don't have anything to start with
		    this._ui = {};

		    // bind each of the selectors
		    _$1.each(bindings, function (selector, key) {
		      this._ui[key] = this.$(selector);
		    }, this);

		    this.ui = this._ui;
		  },

		  _unbindUIElements: function _unbindUIElements() {
		    if (!this.ui || !this._uiBindings) {
		      return;
		    }

		    // delete all of the existing ui bindings
		    _$1.each(this.ui, function ($el, name) {
		      delete this.ui[name];
		    }, this);

		    // reset the ui element to the original bindings configuration
		    this.ui = this._uiBindings;
		    delete this._uiBindings;
		    delete this._ui;
		  },

		  _getUI: function _getUI(name) {
		    return this._ui[name];
		  }
		};

		var ViewMixin = {
		  supportsRenderLifecycle: true,
		  supportsDestroyLifecycle: true,

		  _isDestroyed: false,

		  isDestroyed: function isDestroyed() {
		    return !!this._isDestroyed;
		  },

		  _isRendered: false,

		  isRendered: function isRendered() {
		    return !!this._isRendered;
		  },

		  _isAttached: false,

		  isAttached: function isAttached() {
		    return !!this._isAttached;
		  },


		  // Mix in template context methods. Looks for a
		  // `templateContext` attribute, which can either be an
		  // object literal, or a function that returns an object
		  // literal. All methods and attributes from this object
		  // are copies to the object passed in.
		  mixinTemplateContext: function mixinTemplateContext() {
		    var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    var templateContext = this.getValue(this.getOption('templateContext'));
		    return _$1.extend(target, templateContext);
		  },

		  // Overriding Backbone.View's `delegateEvents` to handle
		  // `events` and `triggers`
		  delegateEvents: function delegateEvents(eventsArg) {

		    this._proxyBehaviorViewProperties();
		    this._buildEventProxies();

		    var viewEvents = this._getEvents(eventsArg);

		    if (typeof eventsArg === 'undefined') {
		      this.events = viewEvents;
		    }

		    var combinedEvents = _$1.extend({}, this._getBehaviorEvents(), viewEvents, this._getBehaviorTriggers(), this.getTriggers());

		    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);

		    return this;
		  },

		  _getEvents: function _getEvents(eventsArg) {
		    var events = this.getValue(eventsArg || this.events);

		    return this.normalizeUIKeys(events);
		  },

		  // Configure `triggers` to forward DOM events to view
		  // events. `triggers: {"click .foo": "do:foo"}`
		  getTriggers: function getTriggers() {
		    if (!this.triggers) {
		      return;
		    }

		    // Allow `triggers` to be configured as a function
		    var triggers = this.normalizeUIKeys(_$1.result(this, 'triggers'));

		    // Configure the triggers, prevent default
		    // action and stop propagation of DOM events
		    return this._getViewTriggers(this, triggers);
		  },

		  // Handle `modelEvents`, and `collectionEvents` configuration
		  delegateEntityEvents: function delegateEntityEvents() {
		    this._delegateEntityEvents(this.model, this.collection);

		    // bind each behaviors model and collection events
		    this._delegateBehaviorEntityEvents();

		    return this;
		  },

		  // Handle unbinding `modelEvents`, and `collectionEvents` configuration
		  undelegateEntityEvents: function undelegateEntityEvents() {
		    this._undelegateEntityEvents(this.model, this.collection);

		    // unbind each behaviors model and collection events
		    this._undelegateBehaviorEntityEvents();

		    return this;
		  },

		  // Internal helper method to verify whether the view hasn't been destroyed
		  _ensureViewIsIntact: function _ensureViewIsIntact() {
		    if (this._isDestroyed) {
		      throw new MarionetteError({
		        name: 'ViewDestroyedError',
		        message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.'
		      });
		    }
		  },

		  // Handle destroying the view and its children.
		  destroy: function destroy() {
		    if (this._isDestroyed) {
		      return this;
		    }
		    var shouldTriggerDetach = !!this._isAttached;

		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    this.triggerMethod.apply(this, ['before:destroy'].concat(args));
		    if (shouldTriggerDetach) {
		      this.triggerMethod('before:detach', this);
		    }

		    // unbind UI elements
		    this.unbindUIElements();

		    // remove the view from the DOM
		    // https://github.com/jashkenas/backbone/blob/1.2.3/backbone.js#L1235
		    this._removeElement();

		    if (shouldTriggerDetach) {
		      this._isAttached = false;
		      this.triggerMethod('detach', this);
		    }

		    // remove children after the remove to prevent extra paints
		    this._removeChildren();

		    this._destroyBehaviors(args);

		    this._isDestroyed = true;
		    this._isRendered = false;
		    this.triggerMethod.apply(this, ['destroy'].concat(args));

		    this.stopListening();

		    return this;
		  },

		  bindUIElements: function bindUIElements() {
		    this._bindUIElements();
		    this._bindBehaviorUIElements();

		    return this;
		  },

		  // This method unbinds the elements specified in the "ui" hash
		  unbindUIElements: function unbindUIElements() {
		    this._unbindUIElements();
		    this._unbindBehaviorUIElements();

		    return this;
		  },

		  getUI: function getUI(name) {
		    this._ensureViewIsIntact();
		    return this._getUI(name);
		  },

		  // used as the prefix for child view events
		  // that are forwarded through the layoutview
		  childViewEventPrefix: 'childview',

		  // import the `triggerMethod` to trigger events with corresponding
		  // methods if the method exists
		  triggerMethod: function triggerMethod$$() {
		    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		      args[_key2] = arguments[_key2];
		    }

		    var ret = triggerMethod.apply(this, args);

		    this._triggerEventOnBehaviors.apply(this, args);
		    this._triggerEventOnParentLayout.apply(this, args);

		    return ret;
		  },

		  // Cache `childViewEvents` and `childViewTriggers`
		  _buildEventProxies: function _buildEventProxies() {
		    this._childViewEvents = this.getValue(this.getOption('childViewEvents'));
		    this._childViewTriggers = this.getValue(this.getOption('childViewTriggers'));
		  },

		  _triggerEventOnParentLayout: function _triggerEventOnParentLayout(eventName) {
		    var layoutView = this._parentView();
		    if (!layoutView) {
		      return;
		    }

		    // invoke triggerMethod on parent view
		    var eventPrefix = layoutView.getOption('childViewEventPrefix');
		    var prefixedEventName = eventPrefix + ':' + eventName;

		    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		      args[_key3 - 1] = arguments[_key3];
		    }

		    layoutView.triggerMethod.apply(layoutView, [prefixedEventName].concat(args));

		    // use the parent view's childViewEvents handler
		    var childViewEvents = layoutView.normalizeMethods(layoutView._childViewEvents);

		    if (!!childViewEvents && _$1.isFunction(childViewEvents[eventName])) {
		      childViewEvents[eventName].apply(layoutView, args);
		    }

		    // use the parent view's proxyEvent handlers
		    var childViewTriggers = layoutView._childViewTriggers;

		    // Call the event with the proxy name on the parent layout
		    if (childViewTriggers && _$1.isString(childViewTriggers[eventName])) {
		      layoutView.triggerMethod.apply(layoutView, [childViewTriggers[eventName]].concat(args));
		    }
		  },

		  // Walk the _parent tree until we find a view (if one exists).
		  // Returns the parent view hierarchically closest to this view.
		  _parentView: function _parentView() {
		    var parent = this._parent;

		    while (parent) {
		      if (parent instanceof View) {
		        return parent;
		      }
		      parent = parent._parent;
		    }
		  }
		};

		_$1.extend(ViewMixin, BehaviorsMixin, CommonMixin, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

		function destroyBackboneView(view) {
		  if (!view.supportsDestroyLifecycle) {
		    triggerMethodOn(view, 'before:destroy', view);
		  }

		  var shouldTriggerDetach = !!view._isAttached;

		  if (shouldTriggerDetach) {
		    triggerMethodOn(view, 'before:detach', view);
		  }

		  view.remove();

		  if (shouldTriggerDetach) {
		    view._isAttached = false;
		    triggerMethodOn(view, 'detach', view);
		  }

		  view._isDestroyed = true;

		  if (!view.supportsDestroyLifecycle) {
		    triggerMethodOn(view, 'destroy', view);
		  }
		}

		var Region = MarionetteObject.extend({
		  cidPrefix: 'mnr',
		  replaceElement: false,
		  _isReplaced: false,

		  constructor: function constructor(options) {
		    this._setOptions(options);
		    this._initEl = this.el = this.getOption('el');

		    // Handle when this.el is passed in as a $ wrapped element.
		    this.el = this.el instanceof Backbone.$ ? this.el[0] : this.el;

		    if (!this.el) {
		      throw new MarionetteError({
		        name: 'NoElError',
		        message: 'An "el" must be specified for a region.'
		      });
		    }

		    this.$el = this.getEl(this.el);
		    MarionetteObject.call(this, options);
		  },


		  // Displays a backbone view instance inside of the region. Handles calling the `render`
		  // method for you. Reads content directly from the `el` attribute. The `preventDestroy`
		  // option can be used to prevent a view from the old view being destroyed on show.
		  show: function show(view, options) {
		    if (!this._ensureElement()) {
		      return;
		    }
		    this._ensureView(view);
		    if (view === this.currentView) {
		      return this;
		    }

		    this.triggerMethod('before:show', this, view, options);

		    MonitorViewEvents(view);

		    this.empty(options);

		    // We need to listen for if a view is destroyed in a way other than through the region.
		    // If this happens we need to remove the reference to the currentView since once a view
		    // has been destroyed we can not reuse it.
		    view.on('destroy', this.empty, this);

		    // Make this region the view's parent.
		    // It's important that this parent binding happens before rendering so that any events
		    // the child may trigger during render can also be triggered on the child's ancestor views.
		    view._parent = this;

		    this._renderView(view);

		    this._attachView(view, options);

		    this.triggerMethod('show', this, view, options);
		    return this;
		  },
		  _renderView: function _renderView(view) {
		    if (view._isRendered) {
		      return;
		    }

		    if (!view.supportsRenderLifecycle) {
		      triggerMethodOn(view, 'before:render', view);
		    }

		    view.render();

		    if (!view.supportsRenderLifecycle) {
		      view._isRendered = true;
		      triggerMethodOn(view, 'render', view);
		    }
		  },
		  _attachView: function _attachView(view) {
		    var shouldTriggerAttach = !view._isAttached && isNodeAttached(this.el);
		    var shouldReplaceEl = !!this.getOption('replaceElement');

		    if (shouldTriggerAttach) {
		      triggerMethodOn(view, 'before:attach', view);
		    }

		    this.attachHtml(view, shouldReplaceEl);

		    if (shouldTriggerAttach) {
		      view._isAttached = true;
		      triggerMethodOn(view, 'attach', view);
		    }

		    this.currentView = view;
		  },
		  _ensureElement: function _ensureElement() {
		    if (!_$1.isObject(this.el)) {
		      this.$el = this.getEl(this.el);
		      this.el = this.$el[0];
		    }

		    if (!this.$el || this.$el.length === 0) {
		      if (this.getOption('allowMissingEl')) {
		        return false;
		      } else {
		        throw new MarionetteError('An "el" ' + this.$el.selector + ' must exist in DOM');
		      }
		    }
		    return true;
		  },
		  _ensureView: function _ensureView(view) {
		    if (!view) {
		      throw new MarionetteError({
		        name: 'ViewNotValid',
		        message: 'The view passed is undefined and therefore invalid. You must pass a view instance to show.'
		      });
		    }

		    if (view._isDestroyed) {
		      throw new MarionetteError({
		        name: 'ViewDestroyedError',
		        message: 'View (cid: "' + view.cid + '") has already been destroyed and cannot be used.'
		      });
		    }
		  },


		  // Override this method to change how the region finds the DOM element that it manages. Return
		  // a jQuery selector object scoped to a provided parent el or the document if none exists.
		  getEl: function getEl(el) {
		    return Backbone.$(el, this.getValue(this.getOption('parentEl')));
		  },
		  _replaceEl: function _replaceEl(view) {
		    // always restore the el to ensure the regions el is present before replacing
		    this._restoreEl();

		    var parent = this.el.parentNode;

		    parent.replaceChild(view.el, this.el);
		    this._isReplaced = true;
		  },


		  // Restore the region's element in the DOM.
		  _restoreEl: function _restoreEl() {
		    if (!this.currentView) {
		      return;
		    }

		    var view = this.currentView;
		    var parent = view.el.parentNode;

		    if (!parent) {
		      return;
		    }

		    parent.replaceChild(this.el, view.el);
		    this._isReplaced = false;
		  },
		  isReplaced: function isReplaced() {
		    return !!this._isReplaced;
		  },


		  // Override this method to change how the new view is appended to the `$el` that the
		  // region is managing
		  attachHtml: function attachHtml(view, shouldReplace) {
		    if (shouldReplace) {
		      // replace the region's node with the view's node
		      this._replaceEl(view);
		    } else {
		      this.el.appendChild(view.el);
		    }
		  },


		  // Destroy the current view, if there is one. If there is no current view, it does
		  // nothing and returns immediately.
		  empty: function empty(options) {
		    var view = this.currentView;

		    // If there is no view in the region we should not remove anything
		    if (!view) {
		      return this;
		    }

		    view.off('destroy', this.empty, this);
		    this.triggerMethod('before:empty', this, view);

		    if (this._isReplaced) {
		      this._restoreEl();
		    }

		    if (!view._isDestroyed) {
		      this._removeView(view, options);
		    }

		    delete this.currentView._parent;
		    delete this.currentView;

		    this.triggerMethod('empty', this, view);
		    return this;
		  },
		  _removeView: function _removeView(view) {
		    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var preventDestroy = _ref.preventDestroy;

		    var shouldPreventDestroy = !!preventDestroy;

		    if (shouldPreventDestroy) {
		      this._detachView(view);
		      return;
		    }

		    if (view.destroy) {
		      view.destroy();
		    } else {
		      destroyBackboneView(view);
		    }
		  },
		  _detachView: function _detachView(view) {
		    var shouldTriggerDetach = !!view._isAttached;

		    if (shouldTriggerDetach) {
		      triggerMethodOn(view, 'before:detach', view);
		    }

		    this.$el.contents().detach();

		    if (shouldTriggerDetach) {
		      view._isAttached = false;
		      triggerMethodOn(view, 'detach', view);
		    }
		  },


		  // Checks whether a view is currently present within the region. Returns `true` if there is
		  // and `false` if no view is present.
		  hasView: function hasView() {
		    return !!this.currentView;
		  },


		  // Reset the region by destroying any existing view and clearing out the cached `$el`.
		  // The next time a view is shown via this region, the region will re-query the DOM for
		  // the region's `el`.
		  reset: function reset() {
		    this.empty();

		    if (this.$el) {
		      this.el = this._initEl;
		    }

		    delete this.$el;
		    return this;
		  },


		  destroy: function destroy() {
		    this.reset();
		    return MarionetteObject.prototype.destroy.apply(this, arguments);
		  }
		});

		var RegionsMixin = {
		  regionClass: Region,

		  // Internal method to initialize the regions that have been defined in a
		  // `regions` attribute on this View.
		  _initRegions: function _initRegions() {

		    // init regions hash
		    this.regions = this.regions || {};
		    this._regions = {};

		    this.addRegions(this.getValue(this.getOption('regions')));
		  },

		  // Internal method to re-initialize all of the regions by updating
		  // the `el` that they point to
		  _reInitRegions: function _reInitRegions() {
		    _$1.invoke(this._regions, 'reset');
		  },

		  // Add a single region, by name, to the View
		  addRegion: function addRegion(name, definition) {
		    var regions = {};
		    regions[name] = definition;
		    return this.addRegions(regions)[name];
		  },

		  // Add multiple regions as a {name: definition, name2: def2} object literal
		  addRegions: function addRegions(regions) {
		    // If there's nothing to add, stop here.
		    if (_$1.isEmpty(regions)) {
		      return;
		    }

		    // Normalize region selectors hash to allow
		    // a user to use the @ui. syntax.
		    regions = this.normalizeUIValues(regions, ['selector', 'el']);

		    // Add the regions definitions to the regions property
		    this.regions = _$1.extend({}, this.regions, regions);

		    return this._addRegions(regions);
		  },

		  // internal method to build and add regions
		  _addRegions: function _addRegions(regionDefinitions) {
		    return _$1.reduce(regionDefinitions, function (regions, definition, name) {
		      regions[name] = this._buildRegion(definition);
		      this._addRegion(regions[name], name);
		      return regions;
		    }, {}, this);
		  },

		  // return the region instance from the definition
		  _buildRegion: function _buildRegion(definition) {
		    if (definition instanceof Region) {
		      return definition;
		    }

		    return this._buildRegionFromDefinition(definition);
		  },

		  _buildRegionFromDefinition: function _buildRegionFromDefinition(definition) {
		    if (_$1.isString(definition)) {
		      return this._buildRegionFromObject({ el: definition });
		    }

		    if (_$1.isFunction(definition)) {
		      return this._buildRegionFromRegionClass(definition);
		    }

		    if (_$1.isObject(definition)) {
		      return this._buildRegionFromObject(definition);
		    }

		    throw new MarionetteError({
		      message: 'Improper region configuration type.',
		      url: 'marionette.region.html#region-configuration-types'
		    });
		  },

		  _buildRegionFromObject: function _buildRegionFromObject(definition) {
		    var RegionClass = definition.regionClass || this.getOption('regionClass');

		    var options = _$1.omit(definition, 'regionClass');

		    _$1.defaults(options, {
		      el: definition.selector,
		      parentEl: _$1.partial(_$1.result, this, 'el')
		    });

		    return new RegionClass(options);
		  },

		  // Build the region directly from a given `RegionClass`
		  _buildRegionFromRegionClass: function _buildRegionFromRegionClass(RegionClass) {
		    return new RegionClass({
		      parentEl: _$1.partial(_$1.result, this, 'el')
		    });
		  },

		  _addRegion: function _addRegion(region, name) {
		    this.triggerMethod('before:add:region', name, region);

		    region._parent = this;

		    this._regions[name] = region;

		    this.triggerMethod('add:region', name, region);
		  },

		  // Remove a single region from the View, by name
		  removeRegion: function removeRegion(name) {
		    var region = this._regions[name];

		    this._removeRegion(region, name);

		    return region;
		  },

		  // Remove all regions from the View
		  removeRegions: function removeRegions() {
		    var regions = this.getRegions();

		    _$1.each(this._regions, this._removeRegion, this);

		    return regions;
		  },

		  _removeRegion: function _removeRegion(region, name) {
		    this.triggerMethod('before:remove:region', name, region);

		    region.empty();
		    region.stopListening();

		    delete this.regions[name];
		    delete this._regions[name];

		    this.triggerMethod('remove:region', name, region);
		  },

		  // Empty all regions in the region manager, but
		  // leave them attached
		  emptyRegions: function emptyRegions() {
		    var regions = this.getRegions();
		    _$1.invoke(regions, 'empty');
		    return regions;
		  },

		  // Checks to see if view contains region
		  // Accepts the region name
		  // hasRegion('main')
		  hasRegion: function hasRegion(name) {
		    return !!this.getRegion(name);
		  },

		  // Provides access to regions
		  // Accepts the region name
		  // getRegion('main')
		  getRegion: function getRegion(name) {
		    return this._regions[name];
		  },

		  // Get all regions
		  getRegions: function getRegions() {
		    return _$1.clone(this._regions);
		  },

		  showChildView: function showChildView(name, view) {
		    var region = this.getRegion(name);

		    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		      args[_key - 2] = arguments[_key];
		    }

		    return region.show.apply(region, [view].concat(args));
		  },

		  getChildView: function getChildView(name) {
		    return this.getRegion(name).currentView;
		  }

		};

		// The standard view. Includes view events, automatic rendering
		// of Underscore templates, nested views, and more.
		var View = Backbone.View.extend({
		  constructor: function constructor(options) {
		    this.render = _$1.bind(this.render, this);

		    this._setOptions(options);

		    MonitorViewEvents(this);

		    this._initBehaviors();
		    this._initRegions();

		    Backbone.View.prototype.constructor.call(this, this.options);

		    this.delegateEntityEvents();
		  },


		  // Serialize the view's model *or* collection, if
		  // it exists, for the template
		  serializeData: function serializeData() {
		    if (!this.model && !this.collection) {
		      return {};
		    }

		    // If we have a model, we serialize that
		    if (this.model) {
		      return this.serializeModel();
		    }

		    // Otherwise, we serialize the collection,
		    // making it available under the `items` property
		    return {
		      items: this.serializeCollection()
		    };
		  },


		  // Prepares the special `model` property of a view
		  // for being displayed in the template. By default
		  // we simply clone the attributes. Override this if
		  // you need a custom transformation for your view's model
		  serializeModel: function serializeModel() {
		    if (!this.model) {
		      return {};
		    }
		    return _$1.clone(this.model.attributes);
		  },


		  // Serialize a collection by cloning each of
		  // its model's attributes
		  serializeCollection: function serializeCollection() {
		    if (!this.collection) {
		      return {};
		    }
		    return this.collection.map(function (model) {
		      return _$1.clone(model.attributes);
		    });
		  },


		  // Render the view, defaulting to underscore.js templates.
		  // You can override this in your view definition to provide
		  // a very specific rendering for your view. In general, though,
		  // you should override the `Marionette.Renderer` object to
		  // change how Marionette renders views.
		  // Subsequent renders after the first will re-render all nested
		  // views.
		  render: function render() {
		    this._ensureViewIsIntact();

		    this.triggerMethod('before:render', this);

		    // If this is not the first render call, then we need to
		    // re-initialize the `el` for each region
		    if (this._isRendered) {
		      this._reInitRegions();
		    }

		    this._renderTemplate();
		    this.bindUIElements();

		    this._isRendered = true;
		    this.triggerMethod('render', this);

		    return this;
		  },


		  // Internal method to render the template with the serialized data
		  // and template context via the `Marionette.Renderer` object.
		  _renderTemplate: function _renderTemplate() {
		    var template = this.getTemplate();

		    // Allow template-less views
		    if (template === false) {
		      return;
		    }

		    // Add in entity data and template context
		    var data = this.mixinTemplateContext(this.serializeData());

		    // Render and add to el
		    var html = Renderer.render(template, data, this);
		    this.attachElContent(html);
		  },


		  // Get the template for this view
		  // instance. You can set a `template` attribute in the view
		  // definition or pass a `template: "whatever"` parameter in
		  // to the constructor options.
		  getTemplate: function getTemplate() {
		    return this.getOption('template');
		  },


		  // Attaches the content of a given view.
		  // This method can be overridden to optimize rendering,
		  // or to render in a non standard way.
		  //
		  // For example, using `innerHTML` instead of `$el.html`
		  //
		  // ```js
		  // attachElContent(html) {
		  //   this.el.innerHTML = html;
		  //   return this;
		  // }
		  // ```
		  attachElContent: function attachElContent(html) {
		    this.$el.html(html);

		    return this;
		  },


		  // called by ViewMixin destroy
		  _removeChildren: function _removeChildren() {
		    this.removeRegions();
		  },


		  _getImmediateChildren: function _getImmediateChildren() {
		    return _$1.chain(this.getRegions()).pluck('currentView').compact().value();
		  }
		});

		_$1.extend(View.prototype, ViewMixin, RegionsMixin);

		// A view that iterates over a Backbone.Collection
		// and renders an individual child view for each model.
		var CollectionView = Backbone.View.extend({

		  // flag for maintaining the sorted order of the collection
		  sort: true,

		  // constructor
		  // option to pass `{sort: false}` to prevent the `CollectionView` from
		  // maintaining the sorted order of the collection.
		  // This will fallback onto appending childView's to the end.
		  //
		  // option to pass `{comparator: compFunction()}` to allow the `CollectionView`
		  // to use a custom sort order for the collection.
		  constructor: function constructor(options) {
		    this.render = _$1.bind(this.render, this);

		    this._setOptions(options);

		    MonitorViewEvents(this);

		    this._initBehaviors();
		    this.once('render', this._initialEvents);
		    this._initChildViewStorage();
		    this._bufferedChildren = [];

		    Backbone.View.prototype.constructor.call(this, this.options);

		    this.delegateEntityEvents();
		  },


		  // Instead of inserting elements one by one into the page, it's much more performant to insert
		  // elements into a document fragment and then insert that document fragment into the page
		  _startBuffering: function _startBuffering() {
		    this._isBuffering = true;
		  },
		  _endBuffering: function _endBuffering() {
		    var shouldTriggerAttach = !!this._isAttached;
		    var triggerOnChildren = shouldTriggerAttach ? this._getImmediateChildren() : [];

		    this._isBuffering = false;

		    _$1.each(triggerOnChildren, function (child) {
		      triggerMethodOn(child, 'before:attach', child);
		    });

		    this.attachBuffer(this, this._createBuffer());

		    _$1.each(triggerOnChildren, function (child) {
		      child._isAttached = true;
		      triggerMethodOn(child, 'attach', child);
		    });

		    this._bufferedChildren = [];
		  },


		  // Configured the initial events that the collection view binds to.
		  _initialEvents: function _initialEvents() {
		    if (this.collection) {
		      this.listenTo(this.collection, 'add', this._onCollectionAdd);
		      this.listenTo(this.collection, 'remove', this._onCollectionRemove);
		      this.listenTo(this.collection, 'reset', this.render);

		      if (this.getOption('sort')) {
		        this.listenTo(this.collection, 'sort', this._sortViews);
		      }
		    }
		  },


		  // Handle a child added to the collection
		  _onCollectionAdd: function _onCollectionAdd(child, collection, opts) {
		    // `index` is present when adding with `at` since BB 1.2; indexOf fallback for < 1.2
		    var index = opts.at !== undefined && (opts.index || collection.indexOf(child));

		    // When filtered or when there is no initial index, calculate index.
		    if (this.getOption('filter') || index === false) {
		      index = _$1.indexOf(this._filteredSortedModels(index), child);
		    }

		    if (this._shouldAddChild(child, index)) {
		      this._destroyEmptyView();
		      var ChildView = this._getChildView(child);
		      this._addChild(child, ChildView, index);
		    }
		  },


		  // get the child view by model it holds, and remove it
		  _onCollectionRemove: function _onCollectionRemove(model) {
		    var view = this.children.findByModel(model);
		    this._removeChildView(view);
		    this._checkEmpty();
		  },


		  // Render children views. Override this method to provide your own implementation of a
		  // render function for the collection view.
		  render: function render() {
		    this._ensureViewIsIntact();
		    this.triggerMethod('before:render', this);
		    this._renderChildren();
		    this._isRendered = true;
		    this.triggerMethod('render', this);
		    return this;
		  },


		  // An efficient rendering used for filtering. Instead of modifying the whole DOM for the
		  // collection view, we are only adding or removing the related childrenViews.
		  setFilter: function setFilter(filter) {
		    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		    var preventRender = _ref.preventRender;

		    var canBeRendered = this._isRendered && !this._isDestroyed;
		    var filterChanged = this.filter !== filter;
		    var shouldRender = canBeRendered && filterChanged && !preventRender;

		    if (shouldRender) {
		      this.triggerMethod('before:apply:filter', this);
		      var previousModels = this._filteredSortedModels();
		      this.filter = filter;
		      var models = this._filteredSortedModels();
		      this._applyModelDeltas(models, previousModels);
		      this.triggerMethod('apply:filter', this);
		    } else {
		      this.filter = filter;
		    }
		  },


		  // `removeFilter` is actually an alias for removing filters.
		  removeFilter: function removeFilter(options) {
		    this.setFilter(null, options);
		  },


		  // Calculate and apply difference by cid between `models` and `previousModels`.
		  _applyModelDeltas: function _applyModelDeltas(models, previousModels) {
		    var currentIds = {};
		    _$1.each(models, function (model, index) {
		      var addedChildNotExists = !this.children.findByModel(model);
		      if (addedChildNotExists) {
		        this._onCollectionAdd(model, this.collection, { at: index });
		      }
		      currentIds[model.cid] = true;
		    }, this);
		    _$1.each(previousModels, function (prevModel) {
		      var removedChildExists = !currentIds[prevModel.cid] && this.children.findByModel(prevModel);
		      if (removedChildExists) {
		        this._onCollectionRemove(prevModel);
		      }
		    }, this);
		  },


		  // Reorder DOM after sorting. When your element's rendering do not use their index,
		  // you can pass reorderOnSort: true to only reorder the DOM after a sort instead of
		  // rendering all the collectionView.
		  reorder: function reorder() {
		    var _this = this;

		    var children = this.children;
		    var models = this._filteredSortedModels();
		    var anyModelsAdded = _$1.some(models, function (model) {
		      return !children.findByModel(model);
		    });

		    // If there are any new models added due to filtering we need to add child views,
		    // so render as normal.
		    if (anyModelsAdded) {
		      this.render();
		    } else {
		      (function () {
		        // Get the DOM nodes in the same order as the models.
		        var elsToReorder = _$1.map(models, function (model, index) {
		          var view = children.findByModel(model);
		          view._index = index;
		          return view.el;
		        });

		        // Find the views that were children before but aren't in this new ordering.
		        var filteredOutViews = children.filter(function (view) {
		          return !_$1.contains(elsToReorder, view.el);
		        });

		        _this.triggerMethod('before:reorder', _this);

		        // Since append moves elements that are already in the DOM, appending the elements
		        // will effectively reorder them.
		        _this._appendReorderedChildren(elsToReorder);

		        // remove any views that have been filtered out
		        _$1.each(filteredOutViews, _this._removeChildView, _this);
		        _this._checkEmpty();

		        _this.triggerMethod('reorder', _this);
		      })();
		    }
		  },


		  // Render view after sorting. Override this method to change how the view renders
		  // after a `sort` on the collection.
		  resortView: function resortView() {
		    if (this.getOption('reorderOnSort')) {
		      this.reorder();
		    } else {
		      this._renderChildren();
		    }
		  },


		  // Internal method. This checks for any changes in the order of the collection.
		  // If the index of any view doesn't match, it will render.
		  _sortViews: function _sortViews() {
		    var models = this._filteredSortedModels();

		    // check for any changes in sort order of views
		    var orderChanged = _$1.find(models, function (item, index) {
		      var view = this.children.findByModel(item);
		      return !view || view._index !== index;
		    }, this);

		    if (orderChanged) {
		      this.resortView();
		    }
		  },


		  // Internal reference to what index a `emptyView` is.
		  _emptyViewIndex: -1,

		  // Internal method. Separated so that CompositeView can append to the childViewContainer
		  // if necessary
		  _appendReorderedChildren: function _appendReorderedChildren(children) {
		    this.$el.append(children);
		  },


		  // Internal method. Separated so that CompositeView can have more control over events
		  // being triggered, around the rendering process
		  _renderChildren: function _renderChildren() {
		    this._destroyEmptyView();
		    this._destroyChildren({ checkEmpty: false });

		    var models = this._filteredSortedModels();
		    if (this.isEmpty(this.collection, { processedModels: models })) {
		      this._showEmptyView();
		    } else {
		      this.triggerMethod('before:render:children', this);
		      this._startBuffering();
		      this._showCollection(models);
		      this._endBuffering();
		      this.triggerMethod('render:children', this);
		    }
		  },


		  // Internal method to loop through collection and show each child view.
		  _showCollection: function _showCollection(models) {
		    _$1.each(models, function (child, index) {
		      var ChildView = this._getChildView(child);
		      this._addChild(child, ChildView, index);
		    }, this);
		  },


		  // Allow the collection to be sorted by a custom view comparator
		  _filteredSortedModels: function _filteredSortedModels(addedAt) {
		    if (!this.collection) {
		      return [];
		    }

		    var viewComparator = this.getViewComparator();
		    var models = this.collection.models;
		    addedAt = Math.min(Math.max(addedAt, 0), models.length - 1);

		    if (viewComparator) {
		      var addedModel = undefined;
		      // Preserve `at` location, even for a sorted view
		      if (addedAt) {
		        addedModel = models[addedAt];
		        models = models.slice(0, addedAt).concat(models.slice(addedAt + 1));
		      }
		      models = this._sortModelsBy(models, viewComparator);
		      if (addedModel) {
		        models.splice(addedAt, 0, addedModel);
		      }
		    }

		    // Filter after sorting in case the filter uses the index
		    models = this._filterModels(models);

		    return models;
		  },


		  // Filter an array of models, if a filter exists
		  _filterModels: function _filterModels(models) {
		    if (this.getOption('filter')) {
		      models = _$1.filter(models, function (model, index) {
		        return this._shouldAddChild(model, index);
		      }, this);
		    }
		    return models;
		  },
		  _sortModelsBy: function _sortModelsBy(models, comparator) {
		    if (typeof comparator === 'string') {
		      return _$1.sortBy(models, function (model) {
		        return model.get(comparator);
		      }, this);
		    } else if (comparator.length === 1) {
		      return _$1.sortBy(models, comparator, this);
		    } else {
		      return models.sort(_$1.bind(comparator, this));
		    }
		  },


		  // Internal method to show an empty view in place of a collection of child views,
		  // when the collection is empty
		  _showEmptyView: function _showEmptyView() {
		    var EmptyView = this.getEmptyView();

		    if (EmptyView && !this._showingEmptyView) {
		      this._showingEmptyView = true;

		      var model = new Backbone.Model();
		      var emptyViewOptions = this.getOption('emptyViewOptions') || this.getOption('childViewOptions');
		      if (_$1.isFunction(emptyViewOptions)) {
		        emptyViewOptions = emptyViewOptions.call(this, model, this._emptyViewIndex);
		      }

		      var view = this._buildChildView(model, EmptyView, emptyViewOptions);

		      this.triggerMethod('before:render:empty', this, view);
		      this._addChildView(view, 0);
		      this.triggerMethod('render:empty', this, view);

		      view._parent = this;
		    }
		  },


		  // Internal method to destroy an existing emptyView instance if one exists. Called when
		  // a collection view has been rendered empty, and then a child is added to the collection.
		  _destroyEmptyView: function _destroyEmptyView() {
		    if (this._showingEmptyView) {
		      this.triggerMethod('before:remove:empty', this);

		      this._destroyChildren();
		      delete this._showingEmptyView;

		      this.triggerMethod('remove:empty', this);
		    }
		  },


		  // Retrieve the empty view class
		  getEmptyView: function getEmptyView() {
		    return this.getOption('emptyView');
		  },


		  // Retrieve the `childView` class, either from `this.options.childView` or from
		  // the `childView` in the object definition. The "options" takes precedence.
		  // The `childView` property can be either a view class or a function that
		  // returns a view class. If it is a function, it will receive the model that
		  // will be passed to the view instance (created from the returned view class)
		  _getChildView: function _getChildView(child) {
		    var childView = this.getOption('childView');

		    if (!childView) {
		      throw new MarionetteError({
		        name: 'NoChildViewError',
		        message: 'A "childView" must be specified'
		      });
		    }

		    // first check if the `childView` is a view class (the common case)
		    // then check if it's a function (which we assume that returns a view class)
		    if (childView.prototype instanceof Backbone.View || childView === Backbone.View) {
		      return childView;
		    } else if (_$1.isFunction(childView)) {
		      return childView.call(this, child);
		    } else {
		      throw new MarionetteError({
		        name: 'InvalidChildViewError',
		        message: '"childView" must be a view class or a function that returns a view class'
		      });
		    }
		  },


		  // Render the child's view and add it to the HTML for the collection view at a given index.
		  // This will also update the indices of later views in the collection in order to keep the
		  // children in sync with the collection.
		  _addChild: function _addChild(child, ChildView, index) {
		    var childViewOptions = this.getValue(this.getOption('childViewOptions'), child, index);

		    var view = this._buildChildView(child, ChildView, childViewOptions);

		    // increment indices of views after this one
		    this._updateIndices(view, true, index);

		    this.triggerMethod('before:add:child', this, view);
		    this._addChildView(view, index);
		    this.triggerMethod('add:child', this, view);

		    view._parent = this;

		    return view;
		  },


		  // Internal method. This decrements or increments the indices of views after the added/removed
		  // view to keep in sync with the collection.
		  _updateIndices: function _updateIndices(view, increment, index) {
		    if (!this.getOption('sort')) {
		      return;
		    }

		    if (increment) {
		      // assign the index to the view
		      view._index = index;
		    }

		    // update the indexes of views after this one
		    this.children.each(function (laterView) {
		      if (laterView._index >= view._index) {
		        laterView._index += increment ? 1 : -1;
		      }
		    });
		  },


		  // Internal Method. Add the view to children and render it at the given index.
		  _addChildView: function _addChildView(view, index) {
		    // Only trigger attach if already attached and not buffering,
		    // otherwise _endBuffering() or Region#show() handles this.
		    var shouldTriggerAttach = !this._isBuffering && this._isAttached;

		    // set up the child view event forwarding
		    this._proxyChildEvents(view);

		    // Store the child view itself so we can properly remove and/or destroy it later
		    this.children.add(view);

		    if (!view.supportsRenderLifecycle) {
		      triggerMethodOn(view, 'before:render', view);
		    }

		    // Render view
		    view.render();

		    if (!view.supportsRenderLifecycle) {
		      view._isRendered = true;
		      triggerMethodOn(view, 'render', view);
		    }

		    if (shouldTriggerAttach) {
		      triggerMethodOn(view, 'before:attach', view);
		    }

		    // Attach view
		    this.attachHtml(this, view, index);

		    if (shouldTriggerAttach) {
		      view._isAttached = true;
		      triggerMethodOn(view, 'attach', view);
		    }
		  },


		  // Build a `childView` for a model in the collection.
		  _buildChildView: function _buildChildView(child, ChildViewClass, childViewOptions) {
		    var options = _$1.extend({ model: child }, childViewOptions);
		    var childView = new ChildViewClass(options);
		    MonitorViewEvents(childView);
		    return childView;
		  },


		  // Remove the child view and destroy it. This function also updates the indices of later views
		  // in the collection in order to keep the children in sync with the collection.
		  _removeChildView: function _removeChildView(view) {
		    if (!view || view._isDestroyed) {
		      return;
		    }

		    this.triggerMethod('before:remove:child', this, view);

		    if (view.destroy) {
		      view.destroy();
		    } else {
		      destroyBackboneView(view);
		    }

		    delete view._parent;
		    this.stopListening(view);
		    this.children.remove(view);
		    this.triggerMethod('remove:child', this, view);

		    // decrement the index of views after this one
		    this._updateIndices(view, false);
		  },


		  // check if the collection is empty or optionally whether an array of pre-processed models is empty
		  isEmpty: function isEmpty(collection, options) {
		    var models = undefined;
		    if (_$1.result(options, 'processedModels')) {
		      models = options.processedModels;
		    } else {
		      models = this.collection ? this.collection.models : [];
		      models = this._filterModels(models);
		    }
		    return models.length === 0;
		  },


		  // If empty, show the empty view
		  _checkEmpty: function _checkEmpty() {
		    if (this.isEmpty(this.collection)) {
		      this._showEmptyView();
		    }
		  },


		  // You might need to override this if you've overridden attachHtml
		  attachBuffer: function attachBuffer(collectionView, buffer) {
		    collectionView.$el.append(buffer);
		  },


		  // Create a fragment buffer from the currently buffered children
		  _createBuffer: function _createBuffer() {
		    var elBuffer = document.createDocumentFragment();
		    _$1.each(this._bufferedChildren, function (b) {
		      elBuffer.appendChild(b.el);
		    });
		    return elBuffer;
		  },


		  // Append the HTML to the collection's `el`. Override this method to do something other
		  // than `.append`.
		  attachHtml: function attachHtml(collectionView, childView, index) {
		    if (collectionView._isBuffering) {
		      // buffering happens on reset events and initial renders
		      // in order to reduce the number of inserts into the
		      // document, which are expensive.
		      collectionView._bufferedChildren.splice(index, 0, childView);
		    } else {
		      // If we've already rendered the main collection, append
		      // the new child into the correct order if we need to. Otherwise
		      // append to the end.
		      if (!collectionView._insertBefore(childView, index)) {
		        collectionView._insertAfter(childView);
		      }
		    }
		  },


		  // Internal method. Check whether we need to insert the view into the correct position.
		  _insertBefore: function _insertBefore(childView, index) {
		    var currentView = undefined;
		    var findPosition = this.getOption('sort') && index < this.children.length - 1;
		    if (findPosition) {
		      // Find the view after this one
		      currentView = this.children.find(function (view) {
		        return view._index === index + 1;
		      });
		    }

		    if (currentView) {
		      currentView.$el.before(childView.el);
		      return true;
		    }

		    return false;
		  },


		  // Internal method. Append a view to the end of the $el
		  _insertAfter: function _insertAfter(childView) {
		    this.$el.append(childView.el);
		  },


		  // Internal method to set up the `children` object for storing all of the child views
		  _initChildViewStorage: function _initChildViewStorage() {
		    this.children = new ChildViewContainer();
		  },


		  // called by ViewMixin destroy
		  _removeChildren: function _removeChildren() {
		    this._destroyChildren({ checkEmpty: false });
		  },


		  // Destroy the child views that this collection view is holding on to, if any
		  _destroyChildren: function _destroyChildren() {
		    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    var checkEmpty = _ref2.checkEmpty;

		    this.triggerMethod('before:destroy:children', this);
		    var shouldCheckEmpty = checkEmpty !== false;
		    var childViews = this.children.map(_$1.identity);

		    this.children.each(this._removeChildView, this);

		    if (shouldCheckEmpty) {
		      this._checkEmpty();
		    }

		    this.triggerMethod('destroy:children', this);
		    return childViews;
		  },


		  // Return true if the given child should be shown. Return false otherwise.
		  // The filter will be passed (child, index, collection), where
		  //  'child' is the given model
		  //  'index' is the index of that model in the collection
		  //  'collection' is the collection referenced by this CollectionView
		  _shouldAddChild: function _shouldAddChild(child, index) {
		    var filter = this.getOption('filter');
		    return !_$1.isFunction(filter) || filter.call(this, child, index, this.collection);
		  },


		  // Set up the child view event forwarding. Uses a "childview:" prefix in front of all forwarded events.
		  _proxyChildEvents: function _proxyChildEvents(view) {
		    var prefix = this.getOption('childViewEventPrefix');

		    // Forward all child view events through the parent,
		    // prepending "childview:" to the event name
		    this.listenTo(view, 'all', function (eventName) {

		      var childEventName = prefix + ':' + eventName;

		      var childViewEvents = this.normalizeMethods(this._childViewEvents);

		      // call collectionView childViewEvent if defined

		      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        args[_key - 1] = arguments[_key];
		      }

		      if (typeof childViewEvents !== 'undefined' && _$1.isFunction(childViewEvents[eventName])) {
		        childViewEvents[eventName].apply(this, args);
		      }

		      // use the parent view's proxyEvent handlers
		      var childViewTriggers = this._childViewTriggers;

		      // Call the event with the proxy name on the parent layout
		      if (childViewTriggers && _$1.isString(childViewTriggers[eventName])) {
		        this.triggerMethod.apply(this, [childViewTriggers[eventName]].concat(args));
		      }

		      this.triggerMethod.apply(this, [childEventName].concat(args));
		    });
		  },
		  _getImmediateChildren: function _getImmediateChildren() {
		    return _$1.values(this.children._views);
		  },
		  getViewComparator: function getViewComparator() {
		    return this.getOption('viewComparator');
		  }
		});

		_$1.extend(CollectionView.prototype, ViewMixin);

		// Used for rendering a branch-leaf, hierarchical structure.
		// Extends directly from CollectionView and also renders an
		// a child view as `modelView`, for the top leaf
		var CompositeView = CollectionView.extend({

		  // Setting up the inheritance chain which allows changes to
		  // Marionette.CollectionView.prototype.constructor which allows overriding
		  // option to pass '{sort: false}' to prevent the CompositeView from
		  // maintaining the sorted order of the collection.
		  // This will fallback onto appending childView's to the end.

		  constructor: function constructor() {
		    deprecate('CompositeView is deprecated. Convert to View at your earliest convenience');
		    CollectionView.prototype.constructor.apply(this, arguments);
		  },


		  // Configured the initial events that the composite view
		  // binds to. Override this method to prevent the initial
		  // events, or to add your own initial events.
		  _initialEvents: function _initialEvents() {

		    // Bind only after composite view is rendered to avoid adding child views
		    // to nonexistent childViewContainer

		    if (this.collection) {
		      this.listenTo(this.collection, 'add', this._onCollectionAdd);
		      this.listenTo(this.collection, 'remove', this._onCollectionRemove);
		      this.listenTo(this.collection, 'reset', this.renderChildren);

		      if (this.getOption('sort')) {
		        this.listenTo(this.collection, 'sort', this._sortViews);
		      }
		    }
		  },


		  // Retrieve the `childView` to be used when rendering each of
		  // the items in the collection. The default is to return
		  // `this.childView` or Marionette.CompositeView if no `childView`
		  // has been defined. As happens in CollectionView, `childView` can
		  // be a function (which should return a view class).
		  _getChildView: function _getChildView(child) {
		    var childView = this.getOption('childView');

		    // for CompositeView, if `childView` is not specified, we'll get the same
		    // composite view class rendered for each child in the collection
		    // then check if the `childView` is a view class (the common case)
		    // finally check if it's a function (which we assume that returns a view class)
		    if (!childView) {
		      return this.constructor;
		    } else if (childView.prototype instanceof Backbone.View || childView === Backbone.View) {
		      return childView;
		    } else if (_$1.isFunction(childView)) {
		      return childView.call(this, child);
		    } else {
		      throw new MarionetteError({
		        name: 'InvalidChildViewError',
		        message: '"childView" must be a view class or a function that returns a view class'
		      });
		    }
		  },


		  // Return the serialized model
		  serializeData: function serializeData() {
		    return this.serializeModel();
		  },


		  // Renders the model and the collection.
		  render: function render() {
		    this._ensureViewIsIntact();
		    this._isRendering = true;
		    this.resetChildViewContainer();

		    this.triggerMethod('before:render', this);

		    this._renderTemplate();
		    this.bindUIElements();
		    this.renderChildren();

		    this._isRendering = false;
		    this._isRendered = true;
		    this.triggerMethod('render', this);
		    return this;
		  },
		  renderChildren: function renderChildren() {
		    if (this._isRendered || this._isRendering) {
		      CollectionView.prototype._renderChildren.call(this);
		    }
		  },


		  // You might need to override this if you've overridden attachHtml
		  attachBuffer: function attachBuffer(compositeView, buffer) {
		    var $container = this.getChildViewContainer(compositeView);
		    $container.append(buffer);
		  },


		  // Internal method. Append a view to the end of the $el.
		  // Overidden from CollectionView to ensure view is appended to
		  // childViewContainer
		  _insertAfter: function _insertAfter(childView) {
		    var $container = this.getChildViewContainer(this, childView);
		    $container.append(childView.el);
		  },


		  // Internal method. Append reordered childView'.
		  // Overidden from CollectionView to ensure reordered views
		  // are appended to childViewContainer
		  _appendReorderedChildren: function _appendReorderedChildren(children) {
		    var $container = this.getChildViewContainer(this);
		    $container.append(children);
		  },


		  // Internal method to ensure an `$childViewContainer` exists, for the
		  // `attachHtml` method to use.
		  getChildViewContainer: function getChildViewContainer(containerView, childView) {
		    if (!!containerView.$childViewContainer) {
		      return containerView.$childViewContainer;
		    }

		    var container;
		    var childViewContainer = getOption.call(containerView, 'childViewContainer');
		    if (childViewContainer) {

		      var selector = getValue.call(containerView, childViewContainer);

		      if (selector.charAt(0) === '@' && containerView.ui) {
		        container = containerView.ui[selector.substr(4)];
		      } else {
		        container = containerView.$(selector);
		      }

		      if (container.length <= 0) {
		        throw new MarionetteError({
		          name: 'ChildViewContainerMissingError',
		          message: 'The specified "childViewContainer" was not found: ' + containerView.childViewContainer
		        });
		      }
		    } else {
		      container = containerView.$el;
		    }

		    containerView.$childViewContainer = container;
		    return container;
		  },


		  // Internal method to reset the `$childViewContainer` on render
		  resetChildViewContainer: function resetChildViewContainer() {
		    if (this.$childViewContainer) {
		      this.$childViewContainer = undefined;
		    }
		  }
		});

		// To prevent duplication but allow the best View organization
		// Certain View methods are mixed directly into the deprecated CompositeView
		var MixinFromView = _$1.pick(View.prototype, 'serializeModel', 'getTemplate', '_renderTemplate', 'attachElContent');
		_$1.extend(CompositeView.prototype, MixinFromView);

		var Behavior = MarionetteObject.extend({
		  cidPrefix: 'mnb',

		  constructor: function constructor(options, view) {
		    // Setup reference to the view.
		    // this comes in handle when a behavior
		    // wants to directly talk up the chain
		    // to the view.
		    this.view = view;
		    this.defaults = _$1.clone(_$1.result(this, 'defaults', {}));
		    this._setOptions(this.defaults, options);
		    // Construct an internal UI hash using
		    // the behaviors UI hash and then the view UI hash.
		    // This allows the user to use UI hash elements
		    // defined in the parent view as well as those
		    // defined in the given behavior.
		    // This order will help the reuse and share of a behavior
		    // between multiple views, while letting a view override a
		    // selector under an UI key.
		    this.ui = _$1.extend({}, _$1.result(this, 'ui'), _$1.result(view, 'ui'));

		    MarionetteObject.apply(this, arguments);
		  },

		  // proxy behavior $ method to the view
		  // this is useful for doing jquery DOM lookups
		  // scoped to behaviors view.
		  $: function $() {
		    return this.view.$.apply(this.view, arguments);
		  },

		  // Stops the behavior from listening to events.
		  // Overrides Object#destroy to prevent additional events from being triggered.
		  destroy: function destroy() {
		    this.stopListening();

		    return this;
		  },

		  proxyViewProperties: function proxyViewProperties() {
		    this.$el = this.view.$el;
		    this.el = this.view.el;

		    return this;
		  },

		  bindUIElements: function bindUIElements() {
		    this._bindUIElements();

		    return this;
		  },

		  unbindUIElements: function unbindUIElements() {
		    this._unbindUIElements();

		    return this;
		  },

		  getUI: function getUI(name) {
		    this.view._ensureViewIsIntact();
		    return this._getUI(name);
		  },

		  // Handle `modelEvents`, and `collectionEvents` configuration
		  delegateEntityEvents: function delegateEntityEvents() {
		    this._delegateEntityEvents(this.view.model, this.view.collection);

		    return this;
		  },

		  undelegateEntityEvents: function undelegateEntityEvents() {
		    this._undelegateEntityEvents(this.view.model, this.view.collection);

		    return this;
		  },

		  getEvents: function getEvents() {
		    // Normalize behavior events hash to allow
		    // a user to use the @ui. syntax.
		    var behaviorEvents = this.normalizeUIKeys(_$1.result(this, 'events'));

		    // binds the handler to the behavior and builds a unique eventName
		    return _$1.reduce(behaviorEvents, function (events, behaviorHandler, key) {
		      if (!_$1.isFunction(behaviorHandler)) {
		        behaviorHandler = this[behaviorHandler];
		      }
		      if (!behaviorHandler) {
		        return;
		      }
		      key = getUniqueEventName(key);
		      events[key] = _$1.bind(behaviorHandler, this);
		      return events;
		    }, {}, this);
		  },

		  // Internal method to build all trigger handlers for a given behavior
		  getTriggers: function getTriggers() {
		    if (!this.triggers) {
		      return;
		    }

		    // Normalize behavior triggers hash to allow
		    // a user to use the @ui. syntax.
		    var behaviorTriggers = this.normalizeUIKeys(_$1.result(this, 'triggers'));

		    return this._getViewTriggers(this.view, behaviorTriggers);
		  }

		});

		_$1.extend(Behavior.prototype, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

		// A container for a Marionette application.
		var Application = MarionetteObject.extend({
		  cidPrefix: 'mna',

		  constructor: function constructor(options) {
		    this._setOptions(options);

		    this._initRegion();

		    MarionetteObject.prototype.constructor.apply(this, arguments);
		  },

		  regionClass: Region,

		  _initRegion: function _initRegion(options) {
		    var region = this.getOption('region');
		    var RegionClass = this.getOption('regionClass');

		    // if the region is a string expect an el or selector
		    // and instantiate a region
		    if (_$1.isString(region)) {
		      this._region = new RegionClass({
		        el: region
		      });
		      return;
		    }

		    this._region = region;
		  },

		  getRegion: function getRegion() {
		    return this._region;
		  },

		  showView: function showView(view) {
		    var region = this.getRegion();

		    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }

		    return region.show.apply(region, [view].concat(args));
		  },

		  getView: function getView() {
		    return this.getRegion().currentView;
		  },

		  // kick off all of the application's processes.
		  start: function start(options) {
		    this.triggerMethod('before:start', options);
		    this.triggerMethod('start', options);
		  }

		});

		var AppRouter = Backbone.Router.extend({

		  constructor: function constructor(options) {
		    this._setOptions(options);

		    Backbone.Router.apply(this, arguments);

		    var appRoutes = this.getOption('appRoutes');
		    var controller = this._getController();
		    this.processAppRoutes(controller, appRoutes);
		    this.on('route', this._processOnRoute, this);
		  },

		  // Similar to route method on a Backbone Router but
		  // method is called on the controller
		  appRoute: function appRoute(route, methodName) {
		    var controller = this._getController();
		    this._addAppRoute(controller, route, methodName);
		  },

		  // process the route event and trigger the onRoute
		  // method call, if it exists
		  _processOnRoute: function _processOnRoute(routeName, routeArgs) {
		    // make sure an onRoute before trying to call it
		    if (_$1.isFunction(this.onRoute)) {
		      // find the path that matches the current route
		      var routePath = _$1.invert(this.getOption('appRoutes'))[routeName];
		      this.onRoute(routeName, routePath, routeArgs);
		    }
		  },

		  // Internal method to process the `appRoutes` for the
		  // router, and turn them in to routes that trigger the
		  // specified method on the specified `controller`.
		  processAppRoutes: function processAppRoutes(controller, appRoutes) {
		    if (!appRoutes) {
		      return;
		    }

		    var routeNames = _$1.keys(appRoutes).reverse(); // Backbone requires reverted order of routes

		    _$1.each(routeNames, function (route) {
		      this._addAppRoute(controller, route, appRoutes[route]);
		    }, this);
		  },

		  _getController: function _getController() {
		    return this.getOption('controller');
		  },

		  _addAppRoute: function _addAppRoute(controller, route, methodName) {
		    var method = controller[methodName];

		    if (!method) {
		      throw new MarionetteError('Method "' + methodName + '" was not found on the controller');
		    }

		    this.route(route, methodName, _$1.bind(method, controller));
		  },

		  triggerMethod: triggerMethod
		});

		_$1.extend(AppRouter.prototype, CommonMixin);

		// Placeholder method to be extended by the user.
		// The method should define the object that stores the behaviors.
		// i.e.
		//
		// ```js
		// Marionette.Behaviors.behaviorsLookup: function() {
		//   return App.Behaviors
		// }
		// ```
		function behaviorsLookup() {
		  throw new MarionetteError({
		    message: 'You must define where your behaviors are stored.',
		    url: 'marionette.behaviors.md#behaviorslookup'
		  });
		}

		// Add Feature flags here
		// e.g. 'class' => false
		var FEATURES = {};

		function isEnabled(name) {
		  return !!FEATURES[name];
		}

		function setEnabled(name, state) {
		  return FEATURES[name] = state;
		}

		var previousMarionette = Backbone.Marionette;
		var Marionette = Backbone.Marionette = {};

		// This allows you to run multiple instances of Marionette on the same
		// webapp. After loading the new version, call `noConflict()` to
		// get a reference to it. At the same time the old version will be
		// returned to Backbone.Marionette.
		Marionette.noConflict = function () {
		  Backbone.Marionette = previousMarionette;
		  return this;
		};

		// Utilities
		Marionette.bindEntityEvents = proxy(bindEntityEvents);
		Marionette.unbindEntityEvents = proxy(unbindEntityEvents);
		Marionette.bindRadioEvents = proxy(bindEntityEvents);
		Marionette.unbindRadioEvents = proxy(unbindEntityEvents);
		Marionette.bindRadioRequests = proxy(bindRadioRequests);
		Marionette.unbindRadioRequests = proxy(unbindRadioRequests);
		Marionette.mergeOptions = proxy(mergeOptions);
		Marionette.getOption = proxy(getOption);
		Marionette.normalizeMethods = proxy(normalizeMethods);
		Marionette.extend = extend;
		Marionette.isNodeAttached = isNodeAttached;
		Marionette.deprecate = deprecate;
		Marionette.triggerMethod = proxy(triggerMethod);
		Marionette.triggerMethodOn = triggerMethodOn;
		Marionette.isEnabled = isEnabled;
		Marionette.setEnabled = setEnabled;
		Marionette.MonitorViewEvents = MonitorViewEvents;

		Marionette.Behaviors = {};
		Marionette.Behaviors.behaviorsLookup = behaviorsLookup;

		// Classes
		Marionette.Application = Application;
		Marionette.AppRouter = AppRouter;
		Marionette.Renderer = Renderer;
		Marionette.TemplateCache = TemplateCache;
		Marionette.View = View;
		Marionette.CollectionView = CollectionView;
		Marionette.CompositeView = CompositeView;
		Marionette.Behavior = Behavior;
		Marionette.Region = Region;
		Marionette.Error = MarionetteError;
		Marionette.Object = MarionetteObject;

		// Configuration
		Marionette.DEV_MODE = false;
		Marionette.FEATURES = FEATURES;
		Marionette.VERSION = version;

		return Marionette;

	}));

	//# sourceMappingURL=backbone.marionette.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Backbone.Radio v1.0.2
	(function (global, factory) {
	   true ? module.exports = factory(__webpack_require__(2), __webpack_require__(1)) : typeof define === "function" && define.amd ? define(["underscore", "backbone"], factory) : global.Backbone.Radio = factory(global._, global.Backbone);
	})(this, function (_, Backbone) {
	  "use strict";

	  var previousRadio = Backbone.Radio;

	  var Radio = Backbone.Radio = {};

	  Radio.VERSION = "1.0.2";

	  // This allows you to run multiple instances of Radio on the same
	  // webapp. After loading the new version, call `noConflict()` to
	  // get a reference to it. At the same time the old version will be
	  // returned to Backbone.Radio.
	  Radio.noConflict = function () {
	    Backbone.Radio = previousRadio;
	    return this;
	  };

	  // Whether or not we're in DEBUG mode or not. DEBUG mode helps you
	  // get around the issues of lack of warnings when events are mis-typed.
	  Radio.DEBUG = false;

	  // Format debug text.
	  Radio._debugText = function (warning, eventName, channelName) {
	    return warning + (channelName ? " on the " + channelName + " channel" : "") + ": \"" + eventName + "\"";
	  };

	  // This is the method that's called when an unregistered event was called.
	  // By default, it logs warning to the console. By overriding this you could
	  // make it throw an Error, for instance. This would make firing a nonexistent event
	  // have the same consequence as firing a nonexistent method on an Object.
	  Radio.debugLog = function (warning, eventName, channelName) {
	    if (Radio.DEBUG && console && console.warn) {
	      console.warn(Radio._debugText(warning, eventName, channelName));
	    }
	  };

	  var eventSplitter = /\s+/;

	  // An internal method used to handle Radio's method overloading for Requests.
	  // It's borrowed from Backbone.Events. It differs from Backbone's overload
	  // API (which is used in Backbone.Events) in that it doesn't support space-separated
	  // event names.
	  Radio._eventsApi = function (obj, action, name, rest) {
	    if (!name) {
	      return false;
	    }

	    var results = {};

	    // Handle event maps.
	    if (typeof name === "object") {
	      for (var key in name) {
	        var result = obj[action].apply(obj, [key, name[key]].concat(rest));
	        eventSplitter.test(key) ? _.extend(results, result) : results[key] = result;
	      }
	      return results;
	    }

	    // Handle space separated event names.
	    if (eventSplitter.test(name)) {
	      var names = name.split(eventSplitter);
	      for (var i = 0, l = names.length; i < l; i++) {
	        results[names[i]] = obj[action].apply(obj, [names[i]].concat(rest));
	      }
	      return results;
	    }

	    return false;
	  };

	  // An optimized way to execute callbacks.
	  Radio._callHandler = function (callback, context, args) {
	    var a1 = args[0],
	        a2 = args[1],
	        a3 = args[2];
	    switch (args.length) {
	      case 0:
	        return callback.call(context);
	      case 1:
	        return callback.call(context, a1);
	      case 2:
	        return callback.call(context, a1, a2);
	      case 3:
	        return callback.call(context, a1, a2, a3);
	      default:
	        return callback.apply(context, args);
	    }
	  };

	  // A helper used by `off` methods to the handler from the store
	  function removeHandler(store, name, callback, context) {
	    var event = store[name];
	    if ((!callback || (callback === event.callback || callback === event.callback._callback)) && (!context || context === event.context)) {
	      delete store[name];
	      return true;
	    }
	  }

	  function removeHandlers(store, name, callback, context) {
	    store || (store = {});
	    var names = name ? [name] : _.keys(store);
	    var matched = false;

	    for (var i = 0, length = names.length; i < length; i++) {
	      name = names[i];

	      // If there's no event by this name, log it and continue
	      // with the loop
	      if (!store[name]) {
	        continue;
	      }

	      if (removeHandler(store, name, callback, context)) {
	        matched = true;
	      }
	    }

	    return matched;
	  }

	  /*
	   * tune-in
	   * -------
	   * Get console logs of a channel's activity
	   *
	   */

	  var _logs = {};

	  // This is to produce an identical function in both tuneIn and tuneOut,
	  // so that Backbone.Events unregisters it.
	  function _partial(channelName) {
	    return _logs[channelName] || (_logs[channelName] = _.partial(Radio.log, channelName));
	  }

	  _.extend(Radio, {

	    // Log information about the channel and event
	    log: function log(channelName, eventName) {
	      var args = _.rest(arguments, 2);
	      console.log("[" + channelName + "] \"" + eventName + "\"", args);
	    },

	    // Logs all events on this channel to the console. It sets an
	    // internal value on the channel telling it we're listening,
	    // then sets a listener on the Backbone.Events
	    tuneIn: function tuneIn(channelName) {
	      var channel = Radio.channel(channelName);
	      channel._tunedIn = true;
	      channel.on("all", _partial(channelName));
	      return this;
	    },

	    // Stop logging all of the activities on this channel to the console
	    tuneOut: function tuneOut(channelName) {
	      var channel = Radio.channel(channelName);
	      channel._tunedIn = false;
	      channel.off("all", _partial(channelName));
	      delete _logs[channelName];
	      return this;
	    }
	  });

	  /*
	   * Backbone.Radio.Requests
	   * -----------------------
	   * A messaging system for requesting data.
	   *
	   */

	  function makeCallback(callback) {
	    return _.isFunction(callback) ? callback : function () {
	      return callback;
	    };
	  }

	  Radio.Requests = {

	    // Make a request
	    request: function request(name) {
	      var args = _.rest(arguments);
	      var results = Radio._eventsApi(this, "request", name, args);
	      if (results) {
	        return results;
	      }
	      var channelName = this.channelName;
	      var requests = this._requests;

	      // Check if we should log the request, and if so, do it
	      if (channelName && this._tunedIn) {
	        Radio.log.apply(this, [channelName, name].concat(args));
	      }

	      // If the request isn't handled, log it in DEBUG mode and exit
	      if (requests && (requests[name] || requests["default"])) {
	        var handler = requests[name] || requests["default"];
	        args = requests[name] ? args : arguments;
	        return Radio._callHandler(handler.callback, handler.context, args);
	      } else {
	        Radio.debugLog("An unhandled request was fired", name, channelName);
	      }
	    },

	    // Set up a handler for a request
	    reply: function reply(name, callback, context) {
	      if (Radio._eventsApi(this, "reply", name, [callback, context])) {
	        return this;
	      }

	      this._requests || (this._requests = {});

	      if (this._requests[name]) {
	        Radio.debugLog("A request was overwritten", name, this.channelName);
	      }

	      this._requests[name] = {
	        callback: makeCallback(callback),
	        context: context || this
	      };

	      return this;
	    },

	    // Set up a handler that can only be requested once
	    replyOnce: function replyOnce(name, callback, context) {
	      if (Radio._eventsApi(this, "replyOnce", name, [callback, context])) {
	        return this;
	      }

	      var self = this;

	      var once = _.once(function () {
	        self.stopReplying(name);
	        return makeCallback(callback).apply(this, arguments);
	      });

	      return this.reply(name, once, context);
	    },

	    // Remove handler(s)
	    stopReplying: function stopReplying(name, callback, context) {
	      if (Radio._eventsApi(this, "stopReplying", name)) {
	        return this;
	      }

	      // Remove everything if there are no arguments passed
	      if (!name && !callback && !context) {
	        delete this._requests;
	      } else if (!removeHandlers(this._requests, name, callback, context)) {
	        Radio.debugLog("Attempted to remove the unregistered request", name, this.channelName);
	      }

	      return this;
	    }
	  };

	  /*
	   * Backbone.Radio.channel
	   * ----------------------
	   * Get a reference to a channel by name.
	   *
	   */

	  Radio._channels = {};

	  Radio.channel = function (channelName) {
	    if (!channelName) {
	      throw new Error("You must provide a name for the channel.");
	    }

	    if (Radio._channels[channelName]) {
	      return Radio._channels[channelName];
	    } else {
	      return Radio._channels[channelName] = new Radio.Channel(channelName);
	    }
	  };

	  /*
	   * Backbone.Radio.Channel
	   * ----------------------
	   * A Channel is an object that extends from Backbone.Events,
	   * and Radio.Requests.
	   *
	   */

	  Radio.Channel = function (channelName) {
	    this.channelName = channelName;
	  };

	  _.extend(Radio.Channel.prototype, Backbone.Events, Radio.Requests, {

	    // Remove all handlers from the messaging systems of this channel
	    reset: function reset() {
	      this.off();
	      this.stopListening();
	      this.stopReplying();
	      return this;
	    }
	  });

	  /*
	   * Top-level API
	   * -------------
	   * Supplies the 'top-level API' for working with Channels directly
	   * from Backbone.Radio.
	   *
	   */

	  var channel,
	      args,
	      systems = [Backbone.Events, Radio.Commands, Radio.Requests];

	  _.each(systems, function (system) {
	    _.each(system, function (method, methodName) {
	      Radio[methodName] = function (channelName) {
	        args = _.rest(arguments);
	        channel = this.channel(channelName);
	        return channel[methodName].apply(channel, args);
	      };
	    });
	  });

	  Radio.reset = function (channelName) {
	    var channels = !channelName ? this._channels : [this._channels[channelName]];
	    _.invoke(channels, "reset");
	  };

	  var backbone_radio = Radio;

	  return backbone_radio;
	});
	//# sourceMappingURL=./backbone.radio.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Backbone.BabySitter
	// -------------------
	// v0.1.10
	//
	// Copyright (c)2015 Derick Bailey, Muted Solutions, LLC.
	// Distributed under MIT license
	//
	// http://github.com/marionettejs/backbone.babysitter

	(function(root, factory) {

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Backbone, _) {
	      return factory(Backbone, _);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined') {
	    var Backbone = require('backbone');
	    var _ = require('underscore');
	    module.exports = factory(Backbone, _);
	  } else {
	    factory(root.Backbone, root._);
	  }

	}(this, function(Backbone, _) {
	  'use strict';

	  var previousChildViewContainer = Backbone.ChildViewContainer;

	  // BabySitter.ChildViewContainer
	  // -----------------------------
	  //
	  // Provide a container to store, retrieve and
	  // shut down child views.
	  
	  Backbone.ChildViewContainer = (function (Backbone, _) {
	  
	    // Container Constructor
	    // ---------------------
	  
	    var Container = function(views){
	      this._views = {};
	      this._indexByModel = {};
	      this._indexByCustom = {};
	      this._updateLength();
	  
	      _.each(views, this.add, this);
	    };
	  
	    // Container Methods
	    // -----------------
	  
	    _.extend(Container.prototype, {
	  
	      // Add a view to this container. Stores the view
	      // by `cid` and makes it searchable by the model
	      // cid (and model itself). Optionally specify
	      // a custom key to store an retrieve the view.
	      add: function(view, customIndex){
	        var viewCid = view.cid;
	  
	        // store the view
	        this._views[viewCid] = view;
	  
	        // index it by model
	        if (view.model){
	          this._indexByModel[view.model.cid] = viewCid;
	        }
	  
	        // index by custom
	        if (customIndex){
	          this._indexByCustom[customIndex] = viewCid;
	        }
	  
	        this._updateLength();
	        return this;
	      },
	  
	      // Find a view by the model that was attached to
	      // it. Uses the model's `cid` to find it.
	      findByModel: function(model){
	        return this.findByModelCid(model.cid);
	      },
	  
	      // Find a view by the `cid` of the model that was attached to
	      // it. Uses the model's `cid` to find the view `cid` and
	      // retrieve the view using it.
	      findByModelCid: function(modelCid){
	        var viewCid = this._indexByModel[modelCid];
	        return this.findByCid(viewCid);
	      },
	  
	      // Find a view by a custom indexer.
	      findByCustom: function(index){
	        var viewCid = this._indexByCustom[index];
	        return this.findByCid(viewCid);
	      },
	  
	      // Find by index. This is not guaranteed to be a
	      // stable index.
	      findByIndex: function(index){
	        return _.values(this._views)[index];
	      },
	  
	      // retrieve a view by its `cid` directly
	      findByCid: function(cid){
	        return this._views[cid];
	      },
	  
	      // Remove a view
	      remove: function(view){
	        var viewCid = view.cid;
	  
	        // delete model index
	        if (view.model){
	          delete this._indexByModel[view.model.cid];
	        }
	  
	        // delete custom index
	        _.any(this._indexByCustom, function(cid, key) {
	          if (cid === viewCid) {
	            delete this._indexByCustom[key];
	            return true;
	          }
	        }, this);
	  
	        // remove the view from the container
	        delete this._views[viewCid];
	  
	        // update the length
	        this._updateLength();
	        return this;
	      },
	  
	      // Call a method on every view in the container,
	      // passing parameters to the call method one at a
	      // time, like `function.call`.
	      call: function(method){
	        this.apply(method, _.tail(arguments));
	      },
	  
	      // Apply a method on every view in the container,
	      // passing parameters to the call method one at a
	      // time, like `function.apply`.
	      apply: function(method, args){
	        _.each(this._views, function(view){
	          if (_.isFunction(view[method])){
	            view[method].apply(view, args || []);
	          }
	        });
	      },
	  
	      // Update the `.length` attribute on this container
	      _updateLength: function(){
	        this.length = _.size(this._views);
	      }
	    });
	  
	    // Borrowing this code from Backbone.Collection:
	    // http://backbonejs.org/docs/backbone.html#section-106
	    //
	    // Mix in methods from Underscore, for iteration, and other
	    // collection related features.
	    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
	      'select', 'reject', 'every', 'all', 'some', 'any', 'include',
	      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
	      'last', 'without', 'isEmpty', 'pluck', 'reduce'];
	  
	    _.each(methods, function(method) {
	      Container.prototype[method] = function() {
	        var views = _.values(this._views);
	        var args = [views].concat(_.toArray(arguments));
	        return _[method].apply(_, args);
	      };
	    });
	  
	    // return the public API
	    return Container;
	  })(Backbone, _);
	  

	  Backbone.ChildViewContainer.VERSION = '0.1.10';

	  Backbone.ChildViewContainer.noConflict = function () {
	    Backbone.ChildViewContainer = previousChildViewContainer;
	    return this;
	  };

	  return Backbone.ChildViewContainer;

	}));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(4);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _auth = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Nav = _backbone4.default.View.extend({
	  className: 'container-fluid',
	  template: __webpack_require__(11),

	  ui: {
	    root: '.root',
	    exercise: '.exercise',
	    workout: '.workout',
	    logout: '.logout',
	    onlyLoggedIn: '.authenticated'
	  },

	  events: {
	    'click @ui.root': 'showRoot',
	    'click @ui.exercise': 'showExercise',
	    'click @ui.workout': 'showWorkout',
	    'click @ui.logout': 'logout'
	  },

	  modelEvents: {
	    sync: 'render',
	    'change:token': 'render',
	    logout: 'showRoot'
	  },

	  onRender: function onRender() {
	    if (this.model.isLoggedIn()) {
	      this.ui.onlyLoggedIn.removeClass('hidden');
	    } else {
	      this.ui.onlyLoggedIn.addClass('hidden');
	    }
	  },

	  showRoot: function showRoot() {
	    this._navigate('');
	  },

	  showExercise: function showExercise(e) {
	    e.preventDefault();
	    this._navigate('exercise/');
	  },

	  showWorkout: function showWorkout(e) {
	    e.preventDefault();
	    this._navigate('workout/');
	  },

	  logout: function logout(e) {
	    e.preventDefault();
	    this.model.logout();
	  },

	  _navigate: function _navigate(url) {
	    _backbone2.default.history.navigate(url, { trigger: true });
	  }
	});

	var Layout = _backbone4.default.View.extend({
	  template: __webpack_require__(12),

	  regions: {
	    main: '#main',
	    nav: '#nav'
	  },

	  initialize: function initialize() {
	    this.model = new _auth.UserModel();
	    this.model.fetch();
	  },

	  onRender: function onRender() {
	    this.showChildView('nav', new Nav({
	      model: this.model
	    }));
	  }
	});

	exports.default = new Layout();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.authSync = exports.UserModel = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _windowOrGlobal = __webpack_require__(9);

	var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(10);

	var _backbone4 = _interopRequireDefault(_backbone3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UserModel = exports.UserModel = _backbone2.default.Model.extend({
	  url: '/me',

	  localStorage: new _backbone4.default('UserModel'),

	  defaults: {
	    id: 'current',
	    first_name: '',
	    last_name: '',
	    email: '',
	    token: ''
	  },

	  /** Return the login state of the user client-side. This doesn't confirm the
	      credentials with the server.
	  */
	  isLoggedIn: function isLoggedIn() {
	    return !!this.get('token');
	  },

	  /** Fires a check against the server. Triggers 'login' if logged-in and
	      'logout' if the user is logged-out
	  */
	  checkServer: function checkServer() {
	    var _this = this;

	    this.fetch({
	      ajaxSync: true,
	      success: function success() {
	        return _this.trigger('login');
	      },
	      error: function error() {
	        return _this.trigger('logout');
	      },
	      headers: getAuthHeader(this)
	    });
	  },

	  clear: function clear(options) {
	    return this.save({
	      first_name: '',
	      last_name: '',
	      email: '',
	      token: ''
	    }, options);
	  },

	  /** Logs the user out. Fires the logout trigger on success.
	  */
	  logout: function logout() {
	    var _this2 = this;

	    _windowOrGlobal2.default.localStorage.clear();
	    this.clear({
	      success: function success() {
	        return _this2.trigger('logout');
	      }
	    });
	  },

	  /** Update the user
	  */
	  updateUser: function updateUser(fields) {
	    var updateFields = _underscore2.default.defaults(fields, this.pick('first_name', 'last_name'));

	    this.save(updateFields);
	    this.save(updateFields, {
	      ajaxSync: true,
	      headers: getAuthHeader(this)
	    });
	  },

	  /** Change the user's password
	  */
	  changePassword: function changePassword(password1, password2) {
	    var _this3 = this;

	    return this.save({
	      password1: password1,
	      password2: password2
	    }, {
	      url: '/me/password',
	      patch: true,
	      ajaxSync: true,
	      headers: getAuthHeader(this),
	      success: function success() {
	        return _this3.save({ password1: undefined, password2: undefined });
	      }
	    });
	  },

	  validate: function validate(attrs) {
	    var errors = {};

	    if (!_underscore2.default.isUndefined(attrs.password1) || !_underscore2.default.isUndefined(attrs.password2)) {
	      if (attrs.password1 !== attrs.password2) {
	        errors.password = 'Passwords do not match';
	      } else if (!attrs.password1.length || !attrs.password2.length) {
	        errors.password = 'Cannot use an empty password';
	      }
	    }

	    if (_underscore2.default.keys(errors).length) {
	      return errors;
	    }
	  }
	});

	var getAuthHeader = function getAuthHeader(userModel) {
	  var token = userModel.get('token');
	  if (_underscore2.default.isUndefined(token)) {
	    return {};
	  }
	  return {
	    Authorization: 'Bearer ' + token
	  };
	};

	var authSync = exports.authSync = function authSync(method, model_or_collection, options) {
	  var user = new UserModel();
	  user.fetch({
	    success: function success() {
	      if (_underscore2.default.isUndefined(options.headers)) {
	        options.headers = {};
	      }
	      _underscore2.default.extend(options.headers, getAuthHeader(user));
	      _backbone2.default.sync(method, model_or_collection, options);
	    }
	  });
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict'
	module.exports = (typeof self === 'object' && self.self === self && self) ||
	  (typeof global === 'object' && global.global === global && global) ||
	  this

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Backbone localStorage Adapter
	 * Version 1.1.16
	 *
	 * https://github.com/jeromegn/Backbone.localStorage
	 */
	(function (root, factory) {
	  if (true) {
	    module.exports = factory(__webpack_require__(1));
	  } else if (typeof define === "function" && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(["backbone"], function(Backbone) {
	      // Use global variables if the locals are undefined.
	      return factory(Backbone || root.Backbone);
	    });
	  } else {
	    factory(Backbone);
	  }
	}(this, function(Backbone) {
	// A simple module to replace `Backbone.sync` with *localStorage*-based
	// persistence. Models are given GUIDS, and saved into a JSON object. Simple
	// as that.

	// Generate four random hex digits.
	function S4() {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};

	// Generate a pseudo-GUID by concatenating random hexadecimal.
	function guid() {
	   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};

	function isObject(item) {
	  return item === Object(item);
	}

	function contains(array, item) {
	  var i = array.length;
	  while (i--) if (array[i] === item) return true;
	  return false;
	}

	function extend(obj, props) {
	  for (var key in props) obj[key] = props[key]
	  return obj;
	}

	function result(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return (typeof value === 'function') ? object[property]() : value;
	}

	// Our Store is represented by a single JS object in *localStorage*. Create it
	// with a meaningful name, like the name you'd give a table.
	// window.Store is deprectated, use Backbone.LocalStorage instead
	Backbone.LocalStorage = window.Store = function(name, serializer) {
	  if( !this.localStorage ) {
	    throw "Backbone.localStorage: Environment does not support localStorage."
	  }
	  this.name = name;
	  this.serializer = serializer || {
	    serialize: function(item) {
	      return isObject(item) ? JSON.stringify(item) : item;
	    },
	    // fix for "illegal access" error on Android when JSON.parse is passed null
	    deserialize: function (data) {
	      return data && JSON.parse(data);
	    }
	  };
	  var store = this.localStorage().getItem(this.name);
	  this.records = (store && store.split(",")) || [];
	};

	extend(Backbone.LocalStorage.prototype, {

	  // Save the current state of the **Store** to *localStorage*.
	  save: function() {
	    this.localStorage().setItem(this.name, this.records.join(","));
	  },

	  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
	  // have an id of it's own.
	  create: function(model) {
	    if (!model.id && model.id !== 0) {
	      model.id = guid();
	      model.set(model.idAttribute, model.id);
	    }
	    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
	    this.records.push(model.id.toString());
	    this.save();
	    return this.find(model);
	  },

	  // Update a model by replacing its copy in `this.data`.
	  update: function(model) {
	    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
	    var modelId = model.id.toString();
	    if (!contains(this.records, modelId)) {
	      this.records.push(modelId);
	      this.save();
	    }
	    return this.find(model);
	  },

	  // Retrieve a model from `this.data` by id.
	  find: function(model) {
	    return this.serializer.deserialize(this.localStorage().getItem(this._itemName(model.id)));
	  },

	  // Return the array of all models currently in storage.
	  findAll: function() {
	    var result = [];
	    for (var i = 0, id, data; i < this.records.length; i++) {
	      id = this.records[i];
	      data = this.serializer.deserialize(this.localStorage().getItem(this._itemName(id)));
	      if (data != null) result.push(data);
	    }
	    return result;
	  },

	  // Delete a model from `this.data`, returning it.
	  destroy: function(model) {
	    this.localStorage().removeItem(this._itemName(model.id));
	    var modelId = model.id.toString();
	    for (var i = 0, id; i < this.records.length; i++) {
	      if (this.records[i] === modelId) {
	        this.records.splice(i, 1);
	      }
	    }
	    this.save();
	    return model;
	  },

	  localStorage: function() {
	    return localStorage;
	  },

	  // Clear localStorage for specific collection.
	  _clear: function() {
	    var local = this.localStorage(),
	      itemRe = new RegExp("^" + this.name + "-");

	    // Remove id-tracking item (e.g., "foo").
	    local.removeItem(this.name);

	    // Match all data items (e.g., "foo-ID") and remove.
	    for (var k in local) {
	      if (itemRe.test(k)) {
	        local.removeItem(k);
	      }
	    }

	    this.records.length = 0;
	  },

	  // Size of localStorage.
	  _storageSize: function() {
	    return this.localStorage().length;
	  },

	  _itemName: function(id) {
	    return this.name+"-"+id;
	  }

	});

	// localSync delegate to the model or collection's
	// *localStorage* property, which should be an instance of `Store`.
	// window.Store.sync and Backbone.localSync is deprecated, use Backbone.LocalStorage.sync instead
	Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options) {
	  var store = result(model, 'localStorage') || result(model.collection, 'localStorage');

	  var resp, errorMessage;
	  //If $ is having Deferred - use it.
	  var syncDfd = Backbone.$ ?
	    (Backbone.$.Deferred && Backbone.$.Deferred()) :
	    (Backbone.Deferred && Backbone.Deferred());

	  try {

	    switch (method) {
	      case "read":
	        resp = model.id != undefined ? store.find(model) : store.findAll();
	        break;
	      case "create":
	        resp = store.create(model);
	        break;
	      case "update":
	        resp = store.update(model);
	        break;
	      case "delete":
	        resp = store.destroy(model);
	        break;
	    }

	  } catch(error) {
	    if (error.code === 22 && store._storageSize() === 0)
	      errorMessage = "Private browsing is unsupported";
	    else
	      errorMessage = error.message;
	  }

	  if (resp) {
	    if (options && options.success) {
	      if (Backbone.VERSION === "0.9.10") {
	        options.success(model, resp, options);
	      } else {
	        options.success(resp);
	      }
	    }
	    if (syncDfd) {
	      syncDfd.resolve(resp);
	    }

	  } else {
	    errorMessage = errorMessage ? errorMessage
	                                : "Record Not Found";

	    if (options && options.error)
	      if (Backbone.VERSION === "0.9.10") {
	        options.error(model, errorMessage, options);
	      } else {
	        options.error(errorMessage);
	      }

	    if (syncDfd)
	      syncDfd.reject(errorMessage);
	  }

	  // add compatibility with $.ajax
	  // always execute callback for success and error
	  if (options && options.complete) options.complete(resp);

	  return syncDfd && syncDfd.promise();
	};

	Backbone.ajaxSync = Backbone.sync;

	Backbone.getSyncMethod = function(model, options) {
	  var forceAjaxSync = options && options.ajaxSync;

	  if(!forceAjaxSync && (result(model, 'localStorage') || result(model.collection, 'localStorage'))) {
	    return Backbone.localSync;
	  }

	  return Backbone.ajaxSync;
	};

	// Override 'Backbone.sync' to default to localSync,
	// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
	Backbone.sync = function(method, model, options) {
	  return Backbone.getSyncMethod(model, options).apply(this, [method, model, options]);
	};

	return Backbone.LocalStorage;
	}));


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="navbar-header">\n  <a class="navbar-brand go-home col-xs-4" href="/">PUMP3D</a>\n  <p class="navbar-text col-xs-3 visible-xs-inline-block">\n    <a href="/exercise/" class="authenticated exercise">Exercises</a>\n  </p>\n  <p class="navbar-text col-xs-3 visible-xs-inline-block">\n    <a href="/workout/" class="authenticated workout">Workouts</a>\n  </p>\n  <p class="navbar-text col-xs-2 visible-xs-inline-block">\n    <a href="/logout" class="authenticated logout">\n      <i class="glyphicon glyphicon-off"></i>\n    </a>\n  </p>\n</div>\n\n<ul class="nav navbar-nav hidden-xs">\n  <li><a href="/exercise/" class="authenticated exercise">Exercises</a></li>\n  <li><a href="/workout/" class="authenticated workout">Workouts</a></li>\n</ul>\n<ul class="nav navbar-nav navbar-right hidden-xs">\n  <li><a href="/profile" class="authenticated profile">\n    My Profile\n    <i class="glyphicon glyphicon-user"></i>\n  </a></li>\n  <li><a href="/logout" class="authenticated text-muted logout">\n    Logout\n    <i class="glyphicon glyphicon-off"></i>\n  </a></li>\n</ul>\n';
	}
	return __p;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<nav class="navbar" id="nav"></nav>\n<div id="main"></div>\n';
	}
	return __p;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routes = exports.Controller = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _home = __webpack_require__(14);

	var _root = __webpack_require__(7);

	var _root2 = _interopRequireDefault(_root);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Controller = exports.Controller = _backbone2.default.Object.extend({
	  default: function _default() {
	    var layout = this.showAndGetLayout();
	    layout.showIndex();
	  },

	  login: function login() {
	    var layout = this.showAndGetLayout();
	    layout.showLogin();
	  },

	  register: function register() {
	    var layout = this.showAndGetLayout();
	    layout.showRegister();
	  },

	  showingMyView: function showingMyView() {
	    var view = _root2.default.getChildView('main');
	    var cid = this.getOption('indexCid');
	    if (_underscore2.default.isUndefined(cid)) {
	      return false;
	    }
	    return view.cid === cid;
	  },

	  showAndGetLayout: function showAndGetLayout() {
	    if (this.showingMyView()) {
	      return _root2.default.getChildView('main');
	    }
	    var layout = new _home.Layout();
	    _root2.default.showChildView('main', layout);
	    return layout;
	  }
	});

	var routes = exports.routes = {
	  '': 'default',
	  'login': 'login',
	  'register': 'register'
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Layout = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(4);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _backbone5 = __webpack_require__(15);

	var _backbone6 = _interopRequireDefault(_backbone5);

	var _auth = __webpack_require__(16);

	var _auth2 = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Index = _backbone4.default.View.extend({
	  className: 'row',
	  template: __webpack_require__(17),

	  ui: {
	    login: '.login-button'
	  },

	  triggers: {
	    'click @ui.login': 'show:login'
	  }
	}); /** The Homepage
	    */


	var Login = _backbone4.default.View.extend({
	  className: 'row',
	  template: __webpack_require__(18),

	  ui: {
	    form: 'form',
	    register: '.register-button'
	  },

	  triggers: {
	    'click @ui.register': 'show:register'
	  },

	  events: {
	    'submit @ui.form': 'login'
	  },

	  modelEvents: {
	    sync: 'redirectLogin'
	  },

	  login: function login(e) {
	    e.preventDefault();
	    var data = _backbone6.default.serialize(this);
	    this.model.login(data);
	  },

	  redirectLogin: function redirectLogin() {
	    _backbone2.default.history.navigate('workout/', { trigger: true });
	  }
	});

	var Register = _backbone4.default.View.extend({
	  className: 'row',
	  template: __webpack_require__(19),

	  ui: {
	    form: 'form',
	    login: '.login-button'
	  },

	  events: {
	    'submit @ui.form': 'signup'
	  },

	  triggers: {
	    'click @ui.login': 'show:login'
	  },

	  modelEvents: {
	    sync: 'redirectLogin'
	  },

	  signup: function signup(e) {
	    e.preventDefault();
	    var data = _backbone6.default.serialize(this);
	    this.model.register(data);
	  },

	  redirectLogin: function redirectLogin() {
	    _backbone2.default.history.navigate('exercise/', { trigger: true });
	  }
	});

	var Layout = exports.Layout = _backbone4.default.View.extend({
	  template: __webpack_require__(20),

	  regions: {
	    layout: '.layout-hook'
	  },

	  showIndex: function showIndex() {
	    this.showChildView('layout', new Index());
	    _backbone2.default.history.navigate('');
	  },

	  checkLogin: function checkLogin() {
	    var _this = this;

	    var user = new _auth2.UserModel();
	    user.fetch({
	      success: function success() {
	        if (user.get('token')) {
	          _this.redirectLogin();
	        }
	      }
	    });
	  },

	  showLogin: function showLogin() {
	    this.showChildView('layout', new Login({ model: new _auth.LoginModel() }));
	    _backbone2.default.history.navigate('login');
	    this.checkLogin();
	  },

	  showRegister: function showRegister() {
	    this.showChildView('layout', new Register({ model: new _auth.RegisterModel() }));
	    _backbone2.default.history.navigate('register');
	    this.checkLogin();
	  },

	  onChildviewShowLogin: function onChildviewShowLogin() {
	    this.showLogin();
	  },

	  onChildviewShowIndex: function onChildviewShowIndex() {
	    this.showIndex();
	  },

	  onChildviewShowRegister: function onChildviewShowRegister() {
	    this.showRegister();
	  },

	  redirectLogin: function redirectLogin() {
	    _backbone2.default.history.navigate('exercise/', { trigger: true });
	  }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Backbone.Syphon, v0.6.3
	// ----------------------------------
	//
	// Copyright (c) 2015 Derick Bailey, Muted Solutions, LLC.
	// Distributed under MIT license
	//
	// http://github.com/marionettejs/backbone.syphon
	(function(root, factory) {

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, Backbone, $) {
	      return factory(_, Backbone, $);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined') {
	    var _ = require('underscore');
	    var Backbone = require('backbone');
	    var $ = require('jquery');
	    module.exports = factory(_, Backbone, $);
	  } else {
	    factory(root._, root.Backbone, root.jQuery);
	  }

	}(this, function(_, Backbone, $) {
	  'use strict';

	  var previousSyphon = Backbone.Syphon;

	  var Syphon = Backbone.Syphon = {};

	  Syphon.VERSION = '0.6.3';

	  Syphon.noConflict = function() {
	    Backbone.Syphon = previousSyphon;
	    return this;
	  };

	  /* jshint maxstatements: 13, maxlen: 102, maxcomplexity: 8, latedef: false */
	  
	  // Ignore Element Types
	  // --------------------
	  
	  // Tell Syphon to ignore all elements of these types. You can
	  // push new types to ignore directly in to this array.
	  Syphon.ignoredTypes = ['button', 'submit', 'reset', 'fieldset'];
	  
	  // Syphon
	  // ------
	  
	  // Get a JSON object that represents
	  // all of the form inputs, in this view.
	  // Alternately, pass a form element directly
	  // in place of the view.
	  Syphon.serialize = function(view, options) {
	    var data = {};
	  
	    // Build the configuration
	    var config = buildConfig(options);
	  
	    // Get all of the elements to process
	    var elements = getInputElements(view, config);
	  
	    // Process all of the elements
	    _.each(elements, function(el) {
	      var $el = $(el);
	      var type = getElementType($el);
	  
	      // Get the key for the input
	      var keyExtractor = config.keyExtractors.get(type);
	      var key = keyExtractor($el);
	  
	      // Get the value for the input
	      var inputReader = config.inputReaders.get(type);
	      var value = inputReader($el);
	  
	      // Get the key assignment validator and make sure
	      // it's valid before assigning the value to the key
	      var validKeyAssignment = config.keyAssignmentValidators.get(type);
	      if (validKeyAssignment($el, key, value)) {
	        var keychain = config.keySplitter(key);
	        data = assignKeyValue(data, keychain, value);
	      }
	    });
	  
	    // Done; send back the results.
	    return data;
	  };
	  
	  // Use the given JSON object to populate
	  // all of the form inputs, in this view.
	  // Alternately, pass a form element directly
	  // in place of the view.
	  Syphon.deserialize = function(view, data, options) {
	    // Build the configuration
	    var config = buildConfig(options);
	  
	    // Get all of the elements to process
	    var elements = getInputElements(view, config);
	  
	    // Flatten the data structure that we are deserializing
	    var flattenedData = flattenData(config, data);
	  
	    // Process all of the elements
	    _.each(elements, function(el) {
	      var $el = $(el);
	      var type = getElementType($el);
	  
	      // Get the key for the input
	      var keyExtractor = config.keyExtractors.get(type);
	      var key = keyExtractor($el);
	  
	      // Get the input writer and the value to write
	      var inputWriter = config.inputWriters.get(type);
	      var value = flattenedData[key];
	  
	      // Write the value to the input
	      inputWriter($el, value);
	    });
	  };
	  
	  // Helpers
	  // -------
	  
	  // Retrieve all of the form inputs
	  // from the form
	  var getInputElements = function(view, config) {
	    var formInputs = getForm(view);
	  
	    formInputs = _.reject(formInputs, function(el) {
	      var reject;
	      var myType = getElementType(el);
	      var extractor = config.keyExtractors.get(myType);
	      var identifier = extractor($(el));
	  
	      var foundInIgnored = _.find(config.ignoredTypes, function(ignoredTypeOrSelector) {
	        return (ignoredTypeOrSelector === myType) || $(el).is(ignoredTypeOrSelector);
	      });
	  
	      var foundInInclude = _.include(config.include, identifier);
	      var foundInExclude = _.include(config.exclude, identifier);
	  
	      if (foundInInclude) {
	        reject = false;
	      } else {
	        if (config.include) {
	          reject = true;
	        } else {
	          reject = (foundInExclude || foundInIgnored);
	        }
	      }
	  
	      return reject;
	    });
	  
	    return formInputs;
	  };
	  
	  // Determine what type of element this is. It
	  // will either return the `type` attribute of
	  // an `<input>` element, or the `tagName` of
	  // the element when the element is not an `<input>`.
	  var getElementType = function(el) {
	    var typeAttr;
	    var $el = $(el);
	    var tagName = $el[0].tagName;
	    var type = tagName;
	  
	    if (tagName.toLowerCase() === 'input') {
	      typeAttr = $el.attr('type');
	      if (typeAttr) {
	        type = typeAttr;
	      } else {
	        type = 'text';
	      }
	    }
	  
	    // Always return the type as lowercase
	    // so it can be matched to lowercase
	    // type registrations.
	    return type.toLowerCase();
	  };
	  
	  // If a dom element is given, just return the form fields.
	  // Otherwise, get the form fields from the view.
	  var getForm = function(viewOrForm) {
	    if (_.isUndefined(viewOrForm.$el)) {
	      return $(viewOrForm).find(':input');
	    } else {
	      return viewOrForm.$(':input');
	    }
	  };
	  
	  // Build a configuration object and initialize
	  // default values.
	  var buildConfig = function(options) {
	    var config = _.clone(options) || {};
	  
	    config.ignoredTypes = _.clone(Syphon.ignoredTypes);
	    config.inputReaders = config.inputReaders || Syphon.InputReaders;
	    config.inputWriters = config.inputWriters || Syphon.InputWriters;
	    config.keyExtractors = config.keyExtractors || Syphon.KeyExtractors;
	    config.keySplitter = config.keySplitter || Syphon.KeySplitter;
	    config.keyJoiner = config.keyJoiner || Syphon.KeyJoiner;
	    config.keyAssignmentValidators = config.keyAssignmentValidators || Syphon.KeyAssignmentValidators;
	  
	    return config;
	  };
	  
	  // Assigns `value` to a parsed JSON key.
	  //
	  // The first parameter is the object which will be
	  // modified to store the key/value pair.
	  //
	  // The second parameter accepts an array of keys as a
	  // string with an option array containing a
	  // single string as the last option.
	  //
	  // The third parameter is the value to be assigned.
	  //
	  // Examples:
	  //
	  // `['foo', 'bar', 'baz'] => {foo: {bar: {baz: 'value'}}}`
	  //
	  // `['foo', 'bar', ['baz']] => {foo: {bar: {baz: ['value']}}}`
	  //
	  // When the final value is an array with a string, the key
	  // becomes an array, and values are pushed in to the array,
	  // allowing multiple fields with the same name to be
	  // assigned to the array.
	  var assignKeyValue = function(obj, keychain, value) {
	    if (!keychain) { return obj; }
	  
	    var key = keychain.shift();
	  
	    // build the current object we need to store data
	    if (!obj[key]) {
	      obj[key] = _.isArray(key) ? [] : {};
	    }
	  
	    // if it's the last key in the chain, assign the value directly
	    if (keychain.length === 0) {
	      if (_.isArray(obj[key])) {
	        obj[key].push(value);
	      } else {
	        obj[key] = value;
	      }
	    }
	  
	    // recursive parsing of the array, depth-first
	    if (keychain.length > 0) {
	      assignKeyValue(obj[key], keychain, value);
	    }
	  
	    return obj;
	  };
	  
	  // Flatten the data structure in to nested strings, using the
	  // provided `KeyJoiner` function.
	  //
	  // Example:
	  //
	  // This input:
	  //
	  // ```js
	  // {
	  //   widget: 'wombat',
	  //   foo: {
	  //     bar: 'baz',
	  //     baz: {
	  //       quux: 'qux'
	  //     },
	  //     quux: ['foo', 'bar']
	  //   }
	  // }
	  // ```
	  //
	  // With a KeyJoiner that uses [ ] square brackets,
	  // should produce this output:
	  //
	  // ```js
	  // {
	  //  'widget': 'wombat',
	  //  'foo[bar]': 'baz',
	  //  'foo[baz][quux]': 'qux',
	  //  'foo[quux]': ['foo', 'bar']
	  // }
	  // ```
	  var flattenData = function(config, data, parentKey) {
	    var flatData = {};
	  
	    _.each(data, function(value, keyName) {
	      var hash = {};
	  
	      // If there is a parent key, join it with
	      // the current, child key.
	      if (parentKey) {
	        keyName = config.keyJoiner(parentKey, keyName);
	      }
	  
	      if (_.isArray(value)) {
	        keyName += '[]';
	        hash[keyName] = value;
	      } else if (_.isObject(value)) {
	        hash = flattenData(config, value, keyName);
	      } else {
	        hash[keyName] = value;
	      }
	  
	      // Store the resulting key/value pairs in the
	      // final flattened data object
	      _.extend(flatData, hash);
	    });
	  
	    return flatData;
	  };
	  
	  // Type Registry
	  // -------------
	  
	  // Type Registries allow you to register something to
	  // an input type, and retrieve either the item registered
	  // for a specific type or the default registration
	  var TypeRegistry = Syphon.TypeRegistry = function() {
	    this.registeredTypes = {};
	  };
	  
	  // Borrow Backbone's `extend` keyword for our TypeRegistry
	  TypeRegistry.extend = Backbone.Model.extend;
	  
	  _.extend(TypeRegistry.prototype, {
	  
	    // Get the registered item by type. If nothing is
	    // found for the specified type, the default is
	    // returned.
	    get: function(type) {
	      if (_.has(this.registeredTypes, type)) {
	        return this.registeredTypes[type];
	      } else {
	        return this.registeredTypes['default'];
	      }
	    },
	  
	    // Register a new item for a specified type
	    register: function(type, item) {
	      this.registeredTypes[type] = item;
	    },
	  
	    // Register a default item to be used when no
	    // item for a specified type is found
	    registerDefault: function(item) {
	      this.registeredTypes['default'] = item;
	    },
	  
	    // Remove an item from a given type registration
	    unregister: function(type) {
	      if (_.has(this.registeredTypes, type)) {
	        delete this.registeredTypes[type];
	      }
	    }
	  });
	  
	  // Key Extractors
	  // --------------
	  
	  // Key extractors produce the "key" in `{key: "value"}`
	  // pairs, when serializing.
	  var KeyExtractorSet = Syphon.KeyExtractorSet = TypeRegistry.extend();
	  
	  // Built-in Key Extractors
	  var KeyExtractors = Syphon.KeyExtractors = new KeyExtractorSet();
	  
	  // The default key extractor, which uses the
	  // input element's "name" attribute
	  KeyExtractors.registerDefault(function($el) {
	    return $el.prop('name') || '';
	  });
	  
	  // Input Readers
	  // -------------
	  
	  // Input Readers are used to extract the value from
	  // an input element, for the serialized object result
	  var InputReaderSet = Syphon.InputReaderSet = TypeRegistry.extend();
	  
	  // Built-in Input Readers
	  var InputReaders = Syphon.InputReaders = new InputReaderSet();
	  
	  // The default input reader, which uses an input
	  // element's "value"
	  InputReaders.registerDefault(function($el) {
	    return $el.val();
	  });
	  
	  // Checkbox reader, returning a boolean value for
	  // whether or not the checkbox is checked.
	  InputReaders.register('checkbox', function($el) {
	    return ($el.prop('indeterminate')) ? null : $el.prop('checked');
	  });
	  
	  // Input Writers
	  // -------------
	  
	  // Input Writers are used to insert a value from an
	  // object into an input element.
	  var InputWriterSet = Syphon.InputWriterSet = TypeRegistry.extend();
	  
	  // Built-in Input Writers
	  var InputWriters = Syphon.InputWriters = new InputWriterSet();
	  
	  // The default input writer, which sets an input
	  // element's "value"
	  InputWriters.registerDefault(function($el, value) {
	    $el.val(value);
	  });
	  
	  // Checkbox writer, set whether or not the checkbox is checked
	  // depending on the boolean value.
	  InputWriters.register('checkbox', function($el, value) {
	    if (value === null) {
	      $el.prop('indeterminate', true);
	    } else {
	      $el.prop('checked', value);
	    }
	  });
	  
	  // Radio button writer, set whether or not the radio button is
	  // checked.  The button should only be checked if it's value
	  // equals the given value.
	  InputWriters.register('radio', function($el, value) {
	    $el.prop('checked', $el.val() === value.toString());
	  });
	  
	  // Key Assignment Validators
	  // -------------------------
	  
	  // Key Assignment Validators are used to determine whether or not a
	  // key should be assigned to a value, after the key and value have been
	  // extracted from the element. This is the last opportunity to prevent
	  // bad data from getting serialized to your object.
	  
	  var KeyAssignmentValidatorSet = Syphon.KeyAssignmentValidatorSet = TypeRegistry.extend();
	  
	  // Build-in Key Assignment Validators
	  var KeyAssignmentValidators = Syphon.KeyAssignmentValidators = new KeyAssignmentValidatorSet();
	  
	  // Everything is valid by default
	  KeyAssignmentValidators.registerDefault(function() {
	    return true;
	  });
	  
	  // But only the "checked" radio button for a given
	  // radio button group is valid
	  KeyAssignmentValidators.register('radio', function($el, key, value) {
	    return $el.prop('checked');
	  });
	  
	  // Backbone.Syphon.KeySplitter
	  // ---------------------------
	  
	  // This function is used to split DOM element keys in to an array
	  // of parts, which are then used to create a nested result structure.
	  // returning `["foo", "bar"]` results in `{foo: { bar: "value" }}`.
	  //
	  // Override this method to use a custom key splitter, such as:
	  // `<input name="foo.bar.baz">`, `return key.split(".")`
	  Syphon.KeySplitter = function(key) {
	    var matches = key.match(/[^\[\]]+/g);
	    var lastKey;
	  
	    if (key.length > 1 && key.indexOf('[]') === key.length - 2) {
	      lastKey = matches.pop();
	      matches.push([lastKey]);
	    }
	  
	    return matches;
	  };
	  
	  // Backbone.Syphon.KeyJoiner
	  // -------------------------
	  
	  // Take two segments of a key and join them together, to create the
	  // de-normalized key name, when deserializing a data structure back
	  // in to a form.
	  //
	  // Example:
	  //
	  // With this data strucutre `{foo: { bar: {baz: "value", quux: "another"} } }`,
	  // the key joiner will be called with these parameters, and assuming the
	  // join happens with "[ ]" square brackets, the specified output:
	  //
	  // `KeyJoiner("foo", "bar")` //=> "foo[bar]"
	  // `KeyJoiner("foo[bar]", "baz")` //=> "foo[bar][baz]"
	  // `KeyJoiner("foo[bar]", "quux")` //=> "foo[bar][quux]"
	  
	  Syphon.KeyJoiner = function(parentKey, childKey) {
	    return parentKey + '[' + childKey + ']';
	  };
	  

	  return Backbone.Syphon;
	}));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RegisterModel = exports.LoginModel = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _auth = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LoginModel = exports.LoginModel = _backbone2.default.Model.extend({
	  urlRoot: '/token',

	  validate: function validate(attrs) {
	    var errors = {};
	    if (_underscore2.default.isUndefined(attrs.email)) {
	      errors.email = 'Email address not set';
	    }
	    if (_underscore2.default.isUndefined(attrs.password)) {
	      errors.password = 'Password not set';
	    }
	    if (!_underscore2.default.isEmpty(errors)) {
	      return errors;
	    }
	  },

	  url: function url() {
	    if (this.isValid()) {
	      var data = this.pick('email', 'password');
	      var url = this.urlRoot;
	      return url + '?email=' + data.email + '&password=' + data.password;
	    }
	    console.error('Form was not valid', this.validationError);
	  },

	  login: function login(data) {
	    var _this = this;

	    this.set(data);

	    this.fetch({ success: function success() {
	        var fields = _this.pick('first_name', 'last_name', 'email', 'token');

	        var loggedIn = new _auth.UserModel(fields);
	        loggedIn.save();
	      } });
	  }
	});

	var RegisterModel = exports.RegisterModel = _backbone2.default.Model.extend({
	  url: '/user/',

	  validate: function validate(attrs) {
	    var errors = {};
	    if (_underscore2.default.isUndefined(attrs.email)) {
	      errors.email = 'Email address not set';
	    }
	    if (_underscore2.default.isUndefined(attrs.password)) {
	      errors.password = 'Password not set';
	    }
	    if (!_underscore2.default.isEmpty(errors)) {
	      return errors;
	    }
	  },

	  register: function register(data) {
	    var _this2 = this;

	    this.save(data, { success: function success() {
	        var fields = _this2.pick('email', 'first_name', 'last_name', 'token');

	        var loggedIn = new _auth.UserModel(fields);
	        loggedIn.save();
	      } });
	  }
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="jumbotron">\n  <h1 class="header">Get Pumped and Make Gains</h1>\n  <div class="row">\n    <div class="col-md-8">\n      <p>Record, Recall, Report</p>\n      <p>\n        There\'s nothing more annoying than trying to remember your last session in\n        the gym when all you want to do is get a sick pump.\n      </p>\n      <p>Start your session</p>\n      <p>Look up your workout</p>\n      <p>Re-run your last set</p>\n      <p>\n        <a href="login" class="btn btn-primary btn-lg login-button">\n          Get Started\n        </a>\n      </p>\n    </div>\n    <div class="col-md-4">\n      <img src="/img/last-workout.png" style="width: 100%">\n    </div>\n  </div>\n</div>\n';
	}
	return __p;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="col-md-6 col-md-offset-3">\n  <div class="panel panel-primary">\n    <div class="panel-heading">\n      Login\n    </div>\n    <form class="form-horizontal" action="" method="post">\n      <div class="panel-body">\n        <div class="form-group">\n          <label for="login-email" class="col-lg-2 control-label">Email</label>\n          <div class="col-lg-10">\n            <input type="email" class="form-control" id="login-email"\n              name="email" placeholder="me@gmail.com" required>\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="login-password" class="col-lg-2 control-label">\n            Password\n          </label>\n          <div class="col-lg-10">\n            <input type="password" class="form-control" id="login-password"\n              name="password" placeholder="Your password" required>\n          </div>\n        </div>\n      </div>\n      <div class="panel-footer clearfix">\n        <div class="pull-left">\n          <a href="register" class="btn btn-link register-button">Register</a>\n        </div>\n        <div class="pull-right">\n          <button class="btn btn-primary">Login</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n';
	}
	return __p;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="col-md-6 col-md-offset-3">\n  <div class="panel panel-success">\n    <div class="panel-heading">\n      Create a New Account\n    </div>\n    <form class="form-horizontal" action="" method="post">\n      <div class="panel-body">\n        <div class="form-group">\n          <label for="register-first_name" class="col-lg-3 control-label">\n            Your First Name\n          </label>\n          <div class="col-lg-9">\n            <input type="text" class="form-control" id="register-first_name"\n              name="first_name" placeholder="John">\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="register-last_name" class="col-lg-3 control-label">\n            Your Last Name\n          </label>\n          <div class="col-lg-9">\n            <input type="text" class="form-control" id="register-last_name"\n              name="last_name" placeholder="Smith">\n          </div>\n        </div>\n\n        <div class="form-group">\n          <label for="register-email" class="col-lg-3 control-label">Email</label>\n          <div class="col-lg-9">\n            <input type="email" class="form-control" id="register-email"\n              name="email" placeholder="me@gmail.com" required>\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="register-password" class="col-lg-3 control-label">\n            Password\n          </label>\n          <div class="col-lg-9">\n            <input type="password" class="form-control" id="register-password"\n              name="password" placeholder="Create a password" required>\n          </div>\n        </div>\n      </div>\n      <div class="panel-footer clearfix">\n        <div class="pull-left">\n          <a href="login" class="btn btn-link login-button">Login</a>\n        </div>\n        <div class="pull-right">\n          <button class="btn btn-success">Sign Up</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n';
	}
	return __p;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="layout-hook container"></div>\n';
	}
	return __p;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routes = exports.Controller = undefined;

	var _controller = __webpack_require__(22);

	var _base = __webpack_require__(23);

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Controller = exports.Controller = _controller.BaseController.extend({
	  layoutView: _base2.default,

	  listWorkout: function listWorkout() {
	    var layout = this.showAndGetLayout();
	    layout.showWorkoutList();
	  },

	  createWorkout: function createWorkout() {
	    var layout = this.showAndGetLayout();
	    layout.showCreateWorkout();
	  },

	  showWorkout: function showWorkout(workout_date) {
	    var layout = this.showAndGetLayout();
	    layout.showWorkoutDetail(workout_date);
	  },

	  editWorkout: function editWorkout(workout_date) {
	    var layout = this.showAndGetLayout();
	    layout.showWorkoutEdit(workout_date);
	  }
	});

	var routes = exports.routes = {
	  'workout/': 'listWorkout',
	  'workout/create': 'createWorkout',
	  'workout/:workout_date': 'showWorkout',
	  'workout/:workout_date/edit': 'editWorkout'
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseController = undefined;

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _root = __webpack_require__(7);

	var _root2 = _interopRequireDefault(_root);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Provides a base controller that oversees interaction with the root view.
	    To use this, you must extend the controller with:
	      layoutView: The base View that owns the sub-app
	      layoutOptions (optional): Any options to pass into instantating layoutView
	*/
	var BaseController = exports.BaseController = _backbone2.default.Object.extend({
	  mainView: 'main',

	  /** Returns whether the current base view is the view being displayed
	  */
	  showingMyView: function showingMyView() {
	    var view = _root2.default.getChildView('main');
	    var cid = this.getOption('indexCid');

	    if (_underscore2.default.isUndefined(cid)) {
	      return false;
	    }
	    return view.cid === cid;
	  },

	  /** Forcibly shows this controller's base layout and returns a reference to
	      it.
	      If the layout is being shown, this won't fire a re-render.
	  */
	  showAndGetLayout: function showAndGetLayout() {
	    if (this.showingMyView()) {
	      return _root2.default.getChildView('main');
	    }
	    var layout = this._getLayout();
	    _root2.default.showChildView('main', layout);
	    return layout;
	  },

	  _getLayout: function _getLayout() {
	    var Layout = this.getOption('layoutView');
	    if (_underscore2.default.isUndefined(Layout)) {
	      console.error('You must define a layoutView');
	    }
	    var layoutOptions = this.getOption('layoutOptions');
	    return new Layout(layoutOptions);
	  }
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _workout = __webpack_require__(24);

	var _workouts = __webpack_require__(31);

	var _workouts2 = __webpack_require__(32);

	var _create = __webpack_require__(43);

	var _update = __webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	  className: 'col-lg-10 col-lg-offset-1 col-sm-12',
	  template: __webpack_require__(59),

	  regions: {
	    container: '.workout-container-hook'
	  },

	  initialize: function initialize() {
	    this.collection = new _workouts.WorkoutList(null);
	    this.collection.fetch();
	  },

	  showWorkoutList: function showWorkoutList() {
	    var list = new _workouts2.WorkoutList({
	      collection: this.collection
	    });
	    this.showChildView('container', list);
	    return list;
	  },

	  showCreateWorkout: function showCreateWorkout() {
	    var model = new _workout.WorkoutModel();
	    model.fetch();
	    var create = new _create.CreateWorkout({
	      collection: this.collection,
	      model: model
	    });
	    this.showChildView('container', create);
	    return create;
	  },

	  /** Hook to allow the controller to instruct this view to grab a model, if
	      it's in the collection, and render it.
	      Alternatively, this will fetch the model from the workout_date from the
	      server and render that.
	  */
	  showWorkoutDetail: function showWorkoutDetail(workout_date) {
	    var list = this.showWorkoutList();
	    var model = this._getModel(workout_date);
	    list.showWorkout(model);
	  },

	  showWorkoutEdit: function showWorkoutEdit(workout_date) {
	    var model = this._getModel(workout_date);
	    var update = new _update.UpdateWorkout({
	      collection: this.collection,
	      model: model
	    });
	    this.showChildView('container', update);
	  },

	  onChildviewShowCreateWorkout: function onChildviewShowCreateWorkout() {
	    this.showCreateWorkout();
	  },

	  onChildviewShowList: function onChildviewShowList() {
	    this.showWorkoutList();
	  },

	  onChildviewShowDetail: function onChildviewShowDetail(options) {
	    this.showWorkoutDetail(options.model.get('workout_date'));
	  },

	  onChildviewShowEdit: function onChildviewShowEdit(model) {
	    this.showWorkoutEdit(model.get('workout_date'));
	  },

	  onChildviewAddToCollection: function onChildviewAddToCollection(model) {
	    var collection = this.collection;
	    collection.add(model.pick('id', 'workout_date', 'sets', 'location'));
	  },

	  _getModel: function _getModel(workout_date) {
	    var model = this.collection.get(workout_date);
	    if (_underscore2.default.isUndefined(model)) {
	      model = new _workout.WorkoutModel({
	        workout_date: workout_date
	      });
	    }
	    if (!model.get('id')) {
	      model.getWorkout();
	    }
	    return model;
	  }
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.WorkoutModel = exports.ExerciseModel = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _moment = __webpack_require__(25);

	var _moment2 = _interopRequireDefault(_moment);

	var _validate2 = __webpack_require__(29);

	var _validate3 = _interopRequireDefault(_validate2);

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _auth = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExerciseModel = exports.ExerciseModel = _backbone2.default.Model.extend({});

	var WorkoutModel = exports.WorkoutModel = _backbone2.default.Model.extend({
	  idAttribute: 'workout_date',
	  urlRoot: '/workouts/',
	  sync: _auth.authSync,

	  defaults: function defaults() {
	    return {
	      workout_date: (0, _moment2.default)().format('YYYY-MM-DD')
	    };
	  },

	  formatDate: function formatDate() {
	    return (0, _moment2.default)(this.get('workout_date')).calendar(null, {
	      sameDay: '[Today]',
	      lastDay: '[Yesterday]',
	      lastWeek: '[Last] dddd',
	      sameElse: 'DD/MM/YYYY'
	    });
	  },

	  saveWorkout: function saveWorkout(attrs, options) {
	    var _arguments = arguments,
	        _this = this;

	    var success = null;
	    if (_underscore2.default.isUndefined(options)) {
	      options = {};
	    }

	    if (options.success) {
	      success = options.success;
	    }

	    options.success = function () {
	      if (success) {
	        success(_arguments);
	      }
	      _this.trigger('save', _this);
	    };
	    this.save(attrs, options);
	  },

	  /** Returns the list of exercises for this workout with each Set attached in
	      the form:
	      Exercise ->
	        id -> Int
	        exercise_name -> String
	        sets -> [
	          reps -> Int
	          weight -> String
	          created -> DateString (sort field)
	        ]
	  */
	  getExercises: function getExercises() {
	    var exercises = new _backbone2.default.Collection(_underscore2.default.sortBy(this.get('sets'), 'exercise_name'));
	    var grouped = exercises.groupBy('exercise');

	    return _underscore2.default.map(grouped, function (val, key) {
	      return new ExerciseModel({
	        id: key,
	        exercise_name: val[0].get('exercise_name'),
	        sets: _underscore2.default.sortBy(val, function (model) {
	          return model.get('createdAt');
	        })
	      });
	    });
	  },

	  /** Grab the workout referenced by workout_date
	  */
	  getWorkout: function getWorkout(workout_date) {
	    var _this2 = this;

	    if (_underscore2.default.isUndefined(workout_date)) {
	      workout_date = this.get('workout_date');
	    }
	    if (_underscore2.default.isUndefined(workout_date)) {
	      console.error('Workout Date is not defined. Cannot fetch.');
	    }
	    this.set({
	      id: 1,
	      workout_date: workout_date
	    });
	    this.fetch({
	      success: function success() {
	        return _this2.trigger('fetch', _this2);
	      }
	    });
	  },

	  displayUrl: function displayUrl() {
	    return '/workout/' + this.get('workout_date');
	  },

	  validate: function validate(attrs) {
	    return (0, _validate3.default)(attrs, {
	      workout_date: {
	        presence: true
	      }
	    });
	  }
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.11.2
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated;

	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    function isUndefined(input) {
	        return input === void 0;
	    }

	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function Locale() {
	    }

	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(27)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, values) {
	        if (values !== null) {
	            values.abbr = name;
	            locales[name] = locales[name] || new Locale();
	            locales[name].set(values);

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }

	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }

	    // MOMENTS

	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '';
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


	    var regexes = {};

	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }

	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }

	        // TODO: Move this out of here!
	        if (typeof value === 'string') {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (typeof value !== 'number') {
	                return mom;
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }

	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }

	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (firstTime) {
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;

	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;

	        if (match) {
	            getParsingFlags(config).iso = true;

	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));

	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', false);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	        return -fwdlw + fwd - 1;
	    }

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;

	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }

	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }

	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;

	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }

	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }

	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }

	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (getParsingFlags(config).bigHour === true &&
	                config._a[HOUR] <= 12 &&
	                config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else {
	            configFromInput(config);
	        }

	        if (!valid__isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(+input);
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             if (this.isValid() && other.isValid()) {
	                 return other < this ? this : other;
	             } else {
	                 return valid__createInvalid();
	             }
	         }
	     );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 36e5; // 1000 * 60 * 60
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    // FORMATTING

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(+res._d + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(matchOffset, this._i));
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }

	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    var isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                d : parseIso(match[4], sign),
	                h : parseIso(match[5], sign),
	                m : parseIso(match[6], sign),
	                s : parseIso(match[7], sign),
	                w : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }

	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = duration._days,
	            months = duration._months;

	        if (!mom.isValid()) {
	            // No op
	            return;
	        }

	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(+mom._d + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';

	        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return +this > +localInput;
	        } else {
	            return +localInput < +this.clone().startOf(units);
	        }
	    }

	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return +this < +localInput;
	        } else {
	            return +this.clone().endOf(units) < +localInput;
	        }
	    }

	    function isBetween (from, to, units) {
	        return this.isAfter(from, units) && this.isBefore(to, units);
	    }

	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return +this === +localInput;
	        } else {
	            inputMs = +localInput;
	            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
	        }
	    }

	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }

	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }

	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;

	        if (!this.isValid()) {
	            return NaN;
	        }

	        that = cloneWithOffset(input, this);

	        if (!that.isValid()) {
	            return NaN;
	        }

	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        return -(wholeMonthDiff + adjust);
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }
	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return +this._d - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(+this / 1000);
	    }

	    function toDate () {
	        return this._offset ? new Date(+this) : this._d;
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function toJSON () {
	        // JSON.stringify(new Date(NaN)) === 'null'
	        return this.isValid() ? this.toISOString() : 'null';
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }

	    // FORMATTING

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // MOMENTS

	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }

	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	        // console.log("got", weekYear, week, weekday, "set", date.toISOString());
	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }

	    // FORMATTING

	    addFormatToken('Q', 0, 'Qo', 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    // FORMATTING

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    // FORMATTING

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    // FORMATTING

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   matchWord);
	    addRegexToken('ddd',  matchWord);
	    addRegexToken('dddd', matchWord);

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }

	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;

	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already

	            mom = local__createLocal([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }

	    // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // FORMATTING

	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);

	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    // FORMATTING

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    // FORMATTING

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = getSet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = getSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto._months           = defaultLocaleMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto._monthsRegex      = defaultMonthsRegex;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function list (format, index, field, count, setter) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, setter);
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < count; i++) {
	            out[i] = lists__get(format, i, field, setter);
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return list(format, index, 'months', 12, 'month');
	    }

	    function lists__listMonthsShort (format, index) {
	        return list(format, index, 'monthsShort', 12, 'month');
	    }

	    function lists__listWeekdays (format, index) {
	        return list(format, index, 'weekdays', 7, 'day');
	    }

	    function lists__listWeekdaysShort (format, index) {
	        return list(format, index, 'weekdaysShort', 7, 'day');
	    }

	    function lists__listWeekdaysMin (format, index) {
	        return list(format, index, 'weekdaysMin', 7, 'day');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.11.2';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.prototype             = momentPrototype;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)(module)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./en-gb": 28,
		"./en-gb.js": 28
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 27;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain english (en-gb)
	//! author : Chris Gedrim : https://github.com/chrisgedrim

	;(function (global, factory) {
	    true ? factory(__webpack_require__(25)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_gb = moment.defineLocale('en-gb', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_gb;

	}));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * validate.js 0.9.0
	 *
	 * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp
	 * Validate.js may be freely distributed under the MIT license.
	 * For all details and documentation:
	 * http://validatejs.org/
	 */

	(function(exports, module, define) {
	  "use strict";

	  // The main function that calls the validators specified by the constraints.
	  // The options are the following:
	  //   - format (string) - An option that controls how the returned value is formatted
	  //     * flat - Returns a flat array of just the error messages
	  //     * grouped - Returns the messages grouped by attribute (default)
	  //     * detailed - Returns an array of the raw validation data
	  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
	  //
	  // Please note that the options are also passed to each validator.
	  var validate = function(attributes, constraints, options) {
	    options = v.extend({}, v.options, options);

	    var results = v.runValidations(attributes, constraints, options)
	      , attr
	      , validator;

	    for (attr in results) {
	      for (validator in results[attr]) {
	        if (v.isPromise(results[attr][validator])) {
	          throw new Error("Use validate.async if you want support for promises");
	        }
	      }
	    }
	    return validate.processValidationResults(results, options);
	  };

	  var v = validate;

	  // Copies over attributes from one or more sources to a single destination.
	  // Very much similar to underscore's extend.
	  // The first argument is the target object and the remaining arguments will be
	  // used as sources.
	  v.extend = function(obj) {
	    [].slice.call(arguments, 1).forEach(function(source) {
	      for (var attr in source) {
	        obj[attr] = source[attr];
	      }
	    });
	    return obj;
	  };

	  v.extend(validate, {
	    // This is the version of the library as a semver.
	    // The toString function will allow it to be coerced into a string
	    version: {
	      major: 0,
	      minor: 9,
	      patch: 0,
	      metadata: null,
	      toString: function() {
	        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
	        if (!v.isEmpty(v.version.metadata)) {
	          version += "+" + v.version.metadata;
	        }
	        return version;
	      }
	    },

	    // Below is the dependencies that are used in validate.js

	    // The constructor of the Promise implementation.
	    // If you are using Q.js, RSVP or any other A+ compatible implementation
	    // override this attribute to be the constructor of that promise.
	    // Since jQuery promises aren't A+ compatible they won't work.
	    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */ null,

	    EMPTY_STRING_REGEXP: /^\s*$/,

	    // Runs the validators specified by the constraints object.
	    // Will return an array of the format:
	    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
	    runValidations: function(attributes, constraints, options) {
	      var results = []
	        , attr
	        , validatorName
	        , value
	        , validators
	        , validator
	        , validatorOptions
	        , error;

	      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
	        attributes = v.collectFormValues(attributes);
	      }

	      // Loops through each constraints, finds the correct validator and run it.
	      for (attr in constraints) {
	        value = v.getDeepObjectValue(attributes, attr);
	        // This allows the constraints for an attribute to be a function.
	        // The function will be called with the value, attribute name, the complete dict of
	        // attributes as well as the options and constraints passed in.
	        // This is useful when you want to have different
	        // validations depending on the attribute value.
	        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);

	        for (validatorName in validators) {
	          validator = v.validators[validatorName];

	          if (!validator) {
	            error = v.format("Unknown validator %{name}", {name: validatorName});
	            throw new Error(error);
	          }

	          validatorOptions = validators[validatorName];
	          // This allows the options to be a function. The function will be
	          // called with the value, attribute name, the complete dict of
	          // attributes as well as the options and constraints passed in.
	          // This is useful when you want to have different
	          // validations depending on the attribute value.
	          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
	          if (!validatorOptions) {
	            continue;
	          }
	          results.push({
	            attribute: attr,
	            value: value,
	            validator: validatorName,
	            globalOptions: options,
	            attributes: attributes,
	            options: validatorOptions,
	            error: validator.call(validator,
	                value,
	                validatorOptions,
	                attr,
	                attributes,
	                options)
	          });
	        }
	      }

	      return results;
	    },

	    // Takes the output from runValidations and converts it to the correct
	    // output format.
	    processValidationResults: function(errors, options) {
	      var attr;

	      errors = v.pruneEmptyErrors(errors, options);
	      errors = v.expandMultipleErrors(errors, options);
	      errors = v.convertErrorMessages(errors, options);

	      switch (options.format || "grouped") {
	        case "detailed":
	          // Do nothing more to the errors
	          break;

	        case "flat":
	          errors = v.flattenErrorsToArray(errors);
	          break;

	        case "grouped":
	          errors = v.groupErrorsByAttribute(errors);
	          for (attr in errors) {
	            errors[attr] = v.flattenErrorsToArray(errors[attr]);
	          }
	          break;

	        default:
	          throw new Error(v.format("Unknown format %{format}", options));
	      }

	      return v.isEmpty(errors) ? undefined : errors;
	    },

	    // Runs the validations with support for promises.
	    // This function will return a promise that is settled when all the
	    // validation promises have been completed.
	    // It can be called even if no validations returned a promise.
	    async: function(attributes, constraints, options) {
	      options = v.extend({}, v.async.options, options);

	      var WrapErrors = options.wrapErrors || function(errors) {
	        return errors;
	      };

	      // Removes unknown attributes
	      if (options.cleanAttributes !== false) {
	        attributes = v.cleanAttributes(attributes, constraints);
	      }

	      var results = v.runValidations(attributes, constraints, options);

	      return new v.Promise(function(resolve, reject) {
	        v.waitForResults(results).then(function() {
	          var errors = v.processValidationResults(results, options);
	          if (errors) {
	            reject(new WrapErrors(errors, options, attributes, constraints));
	          } else {
	            resolve(attributes);
	          }
	        }, function(err) {
	          reject(err);
	        });
	      });
	    },

	    single: function(value, constraints, options) {
	      options = v.extend({}, v.single.options, options, {
	        format: "flat",
	        fullMessages: false
	      });
	      return v({single: value}, {single: constraints}, options);
	    },

	    // Returns a promise that is resolved when all promises in the results array
	    // are settled. The promise returned from this function is always resolved,
	    // never rejected.
	    // This function modifies the input argument, it replaces the promises
	    // with the value returned from the promise.
	    waitForResults: function(results) {
	      // Create a sequence of all the results starting with a resolved promise.
	      return results.reduce(function(memo, result) {
	        // If this result isn't a promise skip it in the sequence.
	        if (!v.isPromise(result.error)) {
	          return memo;
	        }

	        return memo.then(function() {
	          return result.error.then(
	            function(error) {
	              result.error = error || null;
	            },
	            function(error) {
	              if (error instanceof Error) {
	                throw error;
	              }
	              v.error("Rejecting promises with the result is deprecated. Please use the resolve callback instead.");
	              result.error = error;
	            }
	          );
	        });
	      }, new v.Promise(function(r) { r(); })); // A resolved promise
	    },

	    // If the given argument is a call: function the and: function return the value
	    // otherwise just return the value. Additional arguments will be passed as
	    // arguments to the function.
	    // Example:
	    // ```
	    // result('foo') // 'foo'
	    // result(Math.max, 1, 2) // 2
	    // ```
	    result: function(value) {
	      var args = [].slice.call(arguments, 1);
	      if (typeof value === 'function') {
	        value = value.apply(null, args);
	      }
	      return value;
	    },

	    // Checks if the value is a number. This function does not consider NaN a
	    // number like many other `isNumber` functions do.
	    isNumber: function(value) {
	      return typeof value === 'number' && !isNaN(value);
	    },

	    // Returns false if the object is not a function
	    isFunction: function(value) {
	      return typeof value === 'function';
	    },

	    // A simple check to verify that the value is an integer. Uses `isNumber`
	    // and a simple modulo check.
	    isInteger: function(value) {
	      return v.isNumber(value) && value % 1 === 0;
	    },

	    // Uses the `Object` function to check if the given argument is an object.
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },

	    // Simply checks if the object is an instance of a date
	    isDate: function(obj) {
	      return obj instanceof Date;
	    },

	    // Returns false if the object is `null` of `undefined`
	    isDefined: function(obj) {
	      return obj !== null && obj !== undefined;
	    },

	    // Checks if the given argument is a promise. Anything with a `then`
	    // function is considered a promise.
	    isPromise: function(p) {
	      return !!p && v.isFunction(p.then);
	    },

	    isJqueryElement: function(o) {
	      return o && v.isString(o.jquery);
	    },

	    isDomElement: function(o) {
	      if (!o) {
	        return false;
	      }

	      if (!v.isFunction(o.querySelectorAll) || !v.isFunction(o.querySelector)) {
	        return false;
	      }

	      if (v.isObject(document) && o === document) {
	        return true;
	      }

	      // http://stackoverflow.com/a/384380/699304
	      /* istanbul ignore else */
	      if (typeof HTMLElement === "object") {
	        return o instanceof HTMLElement;
	      } else {
	        return o &&
	          typeof o === "object" &&
	          o !== null &&
	          o.nodeType === 1 &&
	          typeof o.nodeName === "string";
	      }
	    },

	    isEmpty: function(value) {
	      var attr;

	      // Null and undefined are empty
	      if (!v.isDefined(value)) {
	        return true;
	      }

	      // functions are non empty
	      if (v.isFunction(value)) {
	        return false;
	      }

	      // Whitespace only strings are empty
	      if (v.isString(value)) {
	        return v.EMPTY_STRING_REGEXP.test(value);
	      }

	      // For arrays we use the length property
	      if (v.isArray(value)) {
	        return value.length === 0;
	      }

	      // Dates have no attributes but aren't empty
	      if (v.isDate(value)) {
	        return false;
	      }

	      // If we find at least one property we consider it non empty
	      if (v.isObject(value)) {
	        for (attr in value) {
	          return false;
	        }
	        return true;
	      }

	      return false;
	    },

	    // Formats the specified strings with the given values like so:
	    // ```
	    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
	    // ```
	    // If you want to write %{...} without having it replaced simply
	    // prefix it with % like this `Foo: %%{foo}` and it will be returned
	    // as `"Foo: %{foo}"`
	    format: v.extend(function(str, vals) {
	      if (!v.isString(str)) {
	        return str;
	      }
	      return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
	        if (m1 === '%') {
	          return "%{" + m2 + "}";
	        } else {
	          return String(vals[m2]);
	        }
	      });
	    }, {
	      // Finds %{key} style patterns in the given string
	      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
	    }),

	    // "Prettifies" the given string.
	    // Prettifying means replacing [.\_-] with spaces as well as splitting
	    // camel case words.
	    prettify: function(str) {
	      if (v.isNumber(str)) {
	        // If there are more than 2 decimals round it to two
	        if ((str * 100) % 1 === 0) {
	          return "" + str;
	        } else {
	          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
	        }
	      }

	      if (v.isArray(str)) {
	        return str.map(function(s) { return v.prettify(s); }).join(", ");
	      }

	      if (v.isObject(str)) {
	        return str.toString();
	      }

	      // Ensure the string is actually a string
	      str = "" + str;

	      return str
	        // Splits keys separated by periods
	        .replace(/([^\s])\.([^\s])/g, '$1 $2')
	        // Removes backslashes
	        .replace(/\\+/g, '')
	        // Replaces - and - with space
	        .replace(/[_-]/g, ' ')
	        // Splits camel cased words
	        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
	          return "" + m1 + " " + m2.toLowerCase();
	        })
	        .toLowerCase();
	    },

	    stringifyValue: function(value) {
	      return v.prettify(value);
	    },

	    isString: function(value) {
	      return typeof value === 'string';
	    },

	    isArray: function(value) {
	      return {}.toString.call(value) === '[object Array]';
	    },

	    contains: function(obj, value) {
	      if (!v.isDefined(obj)) {
	        return false;
	      }
	      if (v.isArray(obj)) {
	        return obj.indexOf(value) !== -1;
	      }
	      return value in obj;
	    },

	    forEachKeyInKeypath: function(object, keypath, callback) {
	      if (!v.isString(keypath)) {
	        return undefined;
	      }

	      var key = ""
	        , i
	        , escape = false;

	      for (i = 0; i < keypath.length; ++i) {
	        switch (keypath[i]) {
	          case '.':
	            if (escape) {
	              escape = false;
	              key += '.';
	            } else {
	              object = callback(object, key, false);
	              key = "";
	            }
	            break;

	          case '\\':
	            if (escape) {
	              escape = false;
	              key += '\\';
	            } else {
	              escape = true;
	            }
	            break;

	          default:
	            escape = false;
	            key += keypath[i];
	            break;
	        }
	      }

	      return callback(object, key, true);
	    },

	    getDeepObjectValue: function(obj, keypath) {
	      if (!v.isObject(obj)) {
	        return undefined;
	      }

	      return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
	        if (v.isObject(obj)) {
	          return obj[key];
	        }
	      });
	    },

	    // This returns an object with all the values of the form.
	    // It uses the input name as key and the value as value
	    // So for example this:
	    // <input type="text" name="email" value="foo@bar.com" />
	    // would return:
	    // {email: "foo@bar.com"}
	    collectFormValues: function(form, options) {
	      var values = {}
	        , i
	        , input
	        , inputs
	        , value;

	      if (v.isJqueryElement(form)) {
	        form = form[0];
	      }

	      if (!form) {
	        return values;
	      }

	      options = options || {};

	      inputs = form.querySelectorAll("input[name], textarea[name]");
	      for (i = 0; i < inputs.length; ++i) {
	        input = inputs.item(i);

	        if (v.isDefined(input.getAttribute("data-ignored"))) {
	          continue;
	        }

	        value = v.sanitizeFormValue(input.value, options);
	        if (input.type === "number") {
	          value = value ? +value : null;
	        } else if (input.type === "checkbox") {
	          if (input.attributes.value) {
	            if (!input.checked) {
	              value = values[input.name] || null;
	            }
	          } else {
	            value = input.checked;
	          }
	        } else if (input.type === "radio") {
	          if (!input.checked) {
	            value = values[input.name] || null;
	          }
	        }
	        values[input.name] = value;
	      }

	      inputs = form.querySelectorAll("select[name]");
	      for (i = 0; i < inputs.length; ++i) {
	        input = inputs.item(i);
	        value = v.sanitizeFormValue(input.options[input.selectedIndex].value, options);
	        values[input.name] = value;
	      }

	      return values;
	    },

	    sanitizeFormValue: function(value, options) {
	      if (options.trim && v.isString(value)) {
	        value = value.trim();
	      }

	      if (options.nullify !== false && value === "") {
	        return null;
	      }
	      return value;
	    },

	    capitalize: function(str) {
	      if (!v.isString(str)) {
	        return str;
	      }
	      return str[0].toUpperCase() + str.slice(1);
	    },

	    // Remove all errors who's error attribute is empty (null or undefined)
	    pruneEmptyErrors: function(errors) {
	      return errors.filter(function(error) {
	        return !v.isEmpty(error.error);
	      });
	    },

	    // In
	    // [{error: ["err1", "err2"], ...}]
	    // Out
	    // [{error: "err1", ...}, {error: "err2", ...}]
	    //
	    // All attributes in an error with multiple messages are duplicated
	    // when expanding the errors.
	    expandMultipleErrors: function(errors) {
	      var ret = [];
	      errors.forEach(function(error) {
	        // Removes errors without a message
	        if (v.isArray(error.error)) {
	          error.error.forEach(function(msg) {
	            ret.push(v.extend({}, error, {error: msg}));
	          });
	        } else {
	          ret.push(error);
	        }
	      });
	      return ret;
	    },

	    // Converts the error mesages by prepending the attribute name unless the
	    // message is prefixed by ^
	    convertErrorMessages: function(errors, options) {
	      options = options || {};

	      var ret = [];
	      errors.forEach(function(errorInfo) {
	        var error = v.result(errorInfo.error,
	            errorInfo.value,
	            errorInfo.attribute,
	            errorInfo.options,
	            errorInfo.attributes,
	            errorInfo.globalOptions);

	        if (!v.isString(error)) {
	          ret.push(errorInfo);
	          return;
	        }

	        if (error[0] === '^') {
	          error = error.slice(1);
	        } else if (options.fullMessages !== false) {
	          error = v.capitalize(v.prettify(errorInfo.attribute)) + " " + error;
	        }
	        error = error.replace(/\\\^/g, "^");
	        error = v.format(error, {value: v.stringifyValue(errorInfo.value)});
	        ret.push(v.extend({}, errorInfo, {error: error}));
	      });
	      return ret;
	    },

	    // In:
	    // [{attribute: "<attributeName>", ...}]
	    // Out:
	    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
	    groupErrorsByAttribute: function(errors) {
	      var ret = {};
	      errors.forEach(function(error) {
	        var list = ret[error.attribute];
	        if (list) {
	          list.push(error);
	        } else {
	          ret[error.attribute] = [error];
	        }
	      });
	      return ret;
	    },

	    // In:
	    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
	    // Out:
	    // ["<message 1>", "<message 2>"]
	    flattenErrorsToArray: function(errors) {
	      return errors.map(function(error) { return error.error; });
	    },

	    cleanAttributes: function(attributes, whitelist) {
	      function whitelistCreator(obj, key, last) {
	        if (v.isObject(obj[key])) {
	          return obj[key];
	        }
	        return (obj[key] = last ? true : {});
	      }

	      function buildObjectWhitelist(whitelist) {
	        var ow = {}
	          , lastObject
	          , attr;
	        for (attr in whitelist) {
	          if (!whitelist[attr]) {
	            continue;
	          }
	          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
	        }
	        return ow;
	      }

	      function cleanRecursive(attributes, whitelist) {
	        if (!v.isObject(attributes)) {
	          return attributes;
	        }

	        var ret = v.extend({}, attributes)
	          , w
	          , attribute;

	        for (attribute in attributes) {
	          w = whitelist[attribute];

	          if (v.isObject(w)) {
	            ret[attribute] = cleanRecursive(ret[attribute], w);
	          } else if (!w) {
	            delete ret[attribute];
	          }
	        }
	        return ret;
	      }

	      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
	        return {};
	      }

	      whitelist = buildObjectWhitelist(whitelist);
	      return cleanRecursive(attributes, whitelist);
	    },

	    exposeModule: function(validate, root, exports, module, define) {
	      if (exports) {
	        if (module && module.exports) {
	          exports = module.exports = validate;
	        }
	        exports.validate = validate;
	      } else {
	        root.validate = validate;
	        if (validate.isFunction(define) && define.amd) {
	          define([], function () { return validate; });
	        }
	      }
	    },

	    warn: function(msg) {
	      if (typeof console !== "undefined" && console.warn) {
	        console.warn("[validate.js] " + msg);
	      }
	    },

	    error: function(msg) {
	      if (typeof console !== "undefined" && console.error) {
	        console.error("[validate.js] " + msg);
	      }
	    }
	  });

	  validate.validators = {
	    // Presence validates that the value isn't empty
	    presence: function(value, options) {
	      options = v.extend({}, this.options, options);
	      if (v.isEmpty(value)) {
	        return options.message || this.message || "can't be blank";
	      }
	    },
	    length: function(value, options, attribute) {
	      // Empty values are allowed
	      if (v.isEmpty(value)) {
	        return;
	      }

	      options = v.extend({}, this.options, options);

	      var is = options.is
	        , maximum = options.maximum
	        , minimum = options.minimum
	        , tokenizer = options.tokenizer || function(val) { return val; }
	        , err
	        , errors = [];

	      value = tokenizer(value);
	      var length = value.length;
	      if(!v.isNumber(length)) {
	        v.error(v.format("Attribute %{attr} has a non numeric value for `length`", {attr: attribute}));
	        return options.message || this.notValid || "has an incorrect length";
	      }

	      // Is checks
	      if (v.isNumber(is) && length !== is) {
	        err = options.wrongLength ||
	          this.wrongLength ||
	          "is the wrong length (should be %{count} characters)";
	        errors.push(v.format(err, {count: is}));
	      }

	      if (v.isNumber(minimum) && length < minimum) {
	        err = options.tooShort ||
	          this.tooShort ||
	          "is too short (minimum is %{count} characters)";
	        errors.push(v.format(err, {count: minimum}));
	      }

	      if (v.isNumber(maximum) && length > maximum) {
	        err = options.tooLong ||
	          this.tooLong ||
	          "is too long (maximum is %{count} characters)";
	        errors.push(v.format(err, {count: maximum}));
	      }

	      if (errors.length > 0) {
	        return options.message || errors;
	      }
	    },
	    numericality: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }

	      options = v.extend({}, this.options, options);

	      var errors = []
	        , name
	        , count
	        , checks = {
	            greaterThan:          function(v, c) { return v > c; },
	            greaterThanOrEqualTo: function(v, c) { return v >= c; },
	            equalTo:              function(v, c) { return v === c; },
	            lessThan:             function(v, c) { return v < c; },
	            lessThanOrEqualTo:    function(v, c) { return v <= c; }
	          };

	      // Coerce the value to a number unless we're being strict.
	      if (options.noStrings !== true && v.isString(value)) {
	        value = +value;
	      }

	      // If it's not a number we shouldn't continue since it will compare it.
	      if (!v.isNumber(value)) {
	        return options.message || options.notValid || this.notValid || "is not a number";
	      }

	      // Same logic as above, sort of. Don't bother with comparisons if this
	      // doesn't pass.
	      if (options.onlyInteger && !v.isInteger(value)) {
	        return options.message || options.notInteger || this.notInteger  || "must be an integer";
	      }

	      for (name in checks) {
	        count = options[name];
	        if (v.isNumber(count) && !checks[name](value, count)) {
	          // This picks the default message if specified
	          // For example the greaterThan check uses the message from
	          // this.notGreaterThan so we capitalize the name and prepend "not"
	          var key = "not" + v.capitalize(name);
	          var msg = options[key] || this[key] || "must be %{type} %{count}";

	          errors.push(v.format(msg, {
	            count: count,
	            type: v.prettify(name)
	          }));
	        }
	      }

	      if (options.odd && value % 2 !== 1) {
	        errors.push(options.notOdd || this.notOdd || "must be odd");
	      }
	      if (options.even && value % 2 !== 0) {
	        errors.push(options.notEven || this.notEven || "must be even");
	      }

	      if (errors.length) {
	        return options.message || errors;
	      }
	    },
	    datetime: v.extend(function(value, options) {
	      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
	        throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
	      }

	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }

	      options = v.extend({}, this.options, options);

	      var err
	        , errors = []
	        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
	        , latest = options.latest ? this.parse(options.latest, options) : NaN;

	      value = this.parse(value, options);

	      // 86400000 is the number of seconds in a day, this is used to remove
	      // the time from the date
	      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
	        return options.message || this.notValid || "must be a valid date";
	      }

	      if (!isNaN(earliest) && value < earliest) {
	        err = this.tooEarly || "must be no earlier than %{date}";
	        err = v.format(err, {date: this.format(earliest, options)});
	        errors.push(err);
	      }

	      if (!isNaN(latest) && value > latest) {
	        err = this.tooLate || "must be no later than %{date}";
	        err = v.format(err, {date: this.format(latest, options)});
	        errors.push(err);
	      }

	      if (errors.length) {
	        return options.message || errors;
	      }
	    }, {
	      parse: null,
	      format: null
	    }),
	    date: function(value, options) {
	      options = v.extend({}, options, {dateOnly: true});
	      return v.validators.datetime.call(v.validators.datetime, value, options);
	    },
	    format: function(value, options) {
	      if (v.isString(options) || (options instanceof RegExp)) {
	        options = {pattern: options};
	      }

	      options = v.extend({}, this.options, options);

	      var message = options.message || this.message || "is invalid"
	        , pattern = options.pattern
	        , match;

	      // Empty values are allowed
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }

	      if (v.isString(pattern)) {
	        pattern = new RegExp(options.pattern, options.flags);
	      }
	      match = pattern.exec(value);
	      if (!match || match[0].length != value.length) {
	        return message;
	      }
	    },
	    inclusion: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message ||
	        this.message ||
	        "^%{value} is not included in the list";
	      return v.format(message, {value: value});
	    },
	    exclusion: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (!v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message || this.message || "^%{value} is restricted";
	      return v.format(message, {value: value});
	    },
	    email: v.extend(function(value, options) {
	      options = v.extend({}, this.options, options);
	      var message = options.message || this.message || "is not a valid email";
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }
	      if (!this.PATTERN.exec(value)) {
	        return message;
	      }
	    }, {
	      PATTERN: /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
	    }),
	    equality: function(value, options, attribute, attributes) {
	      if (v.isEmpty(value)) {
	        return;
	      }

	      if (v.isString(options)) {
	        options = {attribute: options};
	      }
	      options = v.extend({}, this.options, options);
	      var message = options.message ||
	        this.message ||
	        "is not equal to %{attribute}";

	      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
	        throw new Error("The attribute must be a non empty string");
	      }

	      var otherValue = v.getDeepObjectValue(attributes, options.attribute)
	        , comparator = options.comparator || function(v1, v2) {
	          return v1 === v2;
	        };

	      if (!comparator(value, otherValue, options, attribute, attributes)) {
	        return v.format(message, {attribute: v.prettify(options.attribute)});
	      }
	    },

	    // A URL validator that is used to validate URLs with the ability to
	    // restrict schemes and some domains.
	    url: function(value, options) {
	      if (v.isEmpty(value)) {
	        return;
	      }

	      options = v.extend({}, this.options, options);

	      var message = options.message || this.message || "is not a valid url"
	        , schemes = options.schemes || this.schemes || ['http', 'https']
	        , allowLocal = options.allowLocal || this.allowLocal || false;

	      if (!v.isString(value)) {
	        return message;
	      }

	      // https://gist.github.com/dperini/729294
	      var regex =
	        "^" +
	          // schemes
	          "(?:(?:" + schemes.join("|") + "):\\/\\/)" +
	          // credentials
	          "(?:\\S+(?::\\S*)?@)?";

	      regex += "(?:";

	      var hostname =
	          "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
	          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
	          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))";

	      // This ia a special case for the localhost hostname
	      if (allowLocal) {
	        hostname = "(?:localhost|" + hostname + ")";
	      } else {
	          // private & local addresses
	          regex +=
	              "(?!10(?:\\.\\d{1,3}){3})" +
	              "(?!127(?:\\.\\d{1,3}){3})" +
	              "(?!169\\.254(?:\\.\\d{1,3}){2})" +
	              "(?!192\\.168(?:\\.\\d{1,3}){2})" +
	              "(?!172" +
	                "\\.(?:1[6-9]|2\\d|3[0-1])" +
	                "(?:\\.\\d{1,3})" +
	              "{2})";
	      }

	      // reserved addresses
	      regex +=
	          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
	          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
	          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
	        "|" +
	          hostname +
	          // port number
	          "(?::\\d{2,5})?" +
	          // path
	          "(?:\\/[^\\s]*)?" +
	        "$";

	      var PATTERN = new RegExp(regex, 'i');
	      if (!PATTERN.exec(value)) {
	        return message;
	      }
	    }
	  };

	  validate.exposeModule(validate, this, exports, module, __webpack_require__(30));
	}).call(this,
	         true ? /* istanbul ignore next */ exports : null,
	         true ? /* istanbul ignore next */ module : null,
	        __webpack_require__(30));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)(module)))

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.WorkoutList = exports.ExerciseList = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _workout = __webpack_require__(24);

	var _auth = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExerciseList = exports.ExerciseList = _backbone2.default.Collection.extend({
	  model: _workout.ExerciseModel
	});

	var WorkoutList = exports.WorkoutList = _backbone2.default.Collection.extend({
	  model: _workout.WorkoutModel,
	  url: '/workouts/',
	  sync: _auth.authSync,

	  comparator: function comparator(first, second) {
	    var date1 = first.get('workout_date');
	    var date2 = second.get('workout_date');

	    if (date1 > date2) {
	      return -1;
	    } else if (date1 < date2) {
	      return 1;
	    }
	    return 0;
	  }
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.WorkoutList = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(4);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _workouts = __webpack_require__(31);

	var _exercise = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Preview the Workout with lunks to edit.
	*/
	var WorkoutDetailView = _backbone4.default.View.extend({
	  className: 'col-md-12',
	  template: __webpack_require__(39),

	  regions: {
	    exercises: '.exercise-list-hook'
	  },

	  modelEvents: {
	    sync: 'render'
	  },

	  ui: {
	    back: '.go-back',
	    edit: '.edit-workout'
	  },

	  triggers: {
	    'click @ui.back': 'show:list',
	    'click @ui.edit': 'show:edit'
	  },

	  templateContext: function templateContext() {
	    return {
	      formattedDate: this.model.formatDate(),
	      editUrl: this._editUrl()
	    };
	  },

	  onRender: function onRender() {
	    this.showChildView('exercises', new _exercise.ExerciseListView({
	      collection: new _workouts.ExerciseList(this.model.getExercises())
	    }), { replaceElement: true });
	  },

	  onShowList: function onShowList() {
	    _backbone2.default.history.navigate('workout/');
	  },

	  onShowEdit: function onShowEdit() {
	    _backbone2.default.history.navigate(this._editUrl());
	  },

	  _editUrl: function _editUrl() {
	    return this.model.displayUrl() + '/edit';
	  }
	});

	var WorkoutItem = _backbone4.default.View.extend({
	  className: 'col-md-6 col-lg-4 col-sm-12',

	  template: __webpack_require__(40),

	  templateContext: function templateContext() {
	    var _this = this;

	    var panelIndexes = {
	      0: 'info',
	      1: 'danger',
	      2: 'warning',
	      3: 'success',
	      4: 'default'
	    };
	    var location = this.model.get('location');

	    return {
	      iterType: panelIndexes[this.getOption('index') % 5],
	      formattedDate: function formattedDate() {
	        return _this.model.formatDate();
	      },
	      location: location ? location.name : '-'
	    };
	  },

	  triggers: {
	    click: 'show:workout'
	  }
	});

	var WorkoutListView = _backbone4.default.CollectionView.extend({
	  childView: WorkoutItem,

	  childViewOptions: function childViewOptions(model, index) {
	    return {
	      index: index
	    };
	  }
	});

	var WorkoutListLayout = _backbone4.default.View.extend({
	  template: __webpack_require__(41),

	  regions: {
	    list: '.workouts-list'
	  },

	  ui: {
	    create: '.create-workout'
	  },

	  triggers: {
	    'click @ui.create': 'show:create:workout'
	  },

	  onRender: function onRender() {
	    this.showChildView('list', new WorkoutListView({
	      collection: this.collection
	    }));
	  },

	  onChildviewShowWorkout: function onChildviewShowWorkout(options) {
	    this.triggerMethod('show:workout', options);
	  },

	  onShowCreateWorkout: function onShowCreateWorkout() {
	    _backbone2.default.history.navigate('workout/create');
	  }
	});

	var WorkoutList = exports.WorkoutList = _backbone4.default.View.extend({
	  template: __webpack_require__(42),

	  regions: {
	    list: {
	      selector: '.list-hook',
	      replaceElement: true
	    }
	  },

	  onRender: function onRender() {
	    this.showList();
	  },

	  showList: function showList() {
	    this.showChildView('list', new WorkoutListLayout({
	      collection: this.collection
	    }));
	  },

	  showWorkout: function showWorkout(model) {
	    model.getWorkout();
	    this.showChildView('list', new WorkoutDetailView({ model: model }), { replaceElement: true });
	    _backbone2.default.history.navigate(model.displayUrl());
	  },

	  onChildviewShowWorkout: function onChildviewShowWorkout(options) {
	    this.showWorkout(options.model);
	  },

	  onChildviewShowList: function onChildviewShowList() {
	    this.showList();
	  },

	  onChildviewShowCreateWorkout: function onChildviewShowCreateWorkout() {
	    this.triggerMethod('show:create:workout');
	  },

	  onChildviewShowEdit: function onChildviewShowEdit(options) {
	    this.triggerMethod('show:edit', options.model);
	  }
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ExerciseListView = exports.SetListView = exports.SetView = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _sets = __webpack_require__(34);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetView = exports.SetView = _backbone2.default.View.extend({
	  tagName: 'li',
	  className: 'list-group-item',
	  template: __webpack_require__(37)
	});

	var SetListView = exports.SetListView = _backbone2.default.CollectionView.extend({
	  tagName: 'ol',
	  className: 'list-group',
	  childView: SetView
	});

	var SetContainerView = _backbone2.default.View.extend({
	  template: __webpack_require__(38),
	  className: 'col-lg-3',

	  regions: {
	    sets: {
	      selector: 'ol',
	      replaceElement: true
	    }
	  },

	  onRender: function onRender() {
	    this.showChildView('sets', new SetListView({
	      collection: this.collection
	    }));
	  },

	  templateContext: function templateContext() {
	    var _this = this;

	    var panelIndexes = {
	      0: 'info',
	      1: 'danger',
	      2: 'warning',
	      3: 'success',
	      4: 'default'
	    };
	    var length = _underscore2.default.keys(panelIndexes).length;

	    return {
	      panel: function panel() {
	        return panelIndexes[_this.getOption('index') % length];
	      }
	    };
	  }
	});

	var ExerciseListView = exports.ExerciseListView = _backbone2.default.CollectionView.extend({
	  childView: SetContainerView,

	  childViewOptions: function childViewOptions(model, index) {
	    return {
	      collection: new _sets.SetList(model.get('sets')),
	      index: index
	    };
	  }
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SetList = undefined;

	var _backbone = __webpack_require__(1);

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _windowOrGlobal = __webpack_require__(9);

	var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

	var _storage = __webpack_require__(35);

	var _set = __webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetList = exports.SetList = _backbone.Collection.extend({
	  model: _set.SetModel,

	  comparator: function comparator(first, second) {
	    var workout1 = first.get('workout_date');
	    var workout2 = second.get('workout_date');
	    var created1 = first.get('createdAt');
	    var created2 = second.get('createdAt');

	    var dateOrder = this._orderOneTwo(workout2, workout1);

	    if (dateOrder === 0) {
	      return this._orderOneTwo(created1, created2);
	    }
	    return dateOrder;
	  },

	  /** Clear all stored Local Data related to sets.
	      This will also look for potential data leaks and clean them up too so we
	      remain under the 5M characters cap.
	  */
	  clearStored: function clearStored() {
	    while (this.length > 0) {
	      this.at(0).destroy();
	    }
	    var reString = '^' + _set.MODELNAME + '-.*';
	    var reObj = new RegExp(reString);

	    var local = new _storage.LocalModel({
	      modelname: _set.MODELNAME
	    });
	    local.destroy();
	    var indexes = _underscore2.default.map(_windowOrGlobal2.default.localStorage, function (v, k) {
	      return k;
	    });
	    var keys = _underscore2.default.map(indexes, function (i) {
	      return _windowOrGlobal2.default.localStorage.key(i);
	    });
	    var toRemove = _underscore2.default.filter(keys, function (key) {
	      return reObj.exec(key) !== null;
	    });

	    _underscore2.default.each(toRemove, function (key) {
	      return _windowOrGlobal2.default.localStorage.removeItem(key);
	    });
	    this.trigger('clear');
	  },

	  /** Search localStorage for any unsaved sets and restore the workout.
	  */
	  fetchStored: function fetchStored() {
	    var _this = this;

	    var local = new _storage.LocalModel({
	      modelname: _set.MODELNAME
	    });

	    local.fetch({
	      success: function success() {
	        var models = _underscore2.default.map(local.getIds(), function (id) {
	          var set = new _set.SetModel({ id: id });
	          return set;
	        });
	        var completed = 0;
	        var TO_COMPLETE = models.length;

	        _this.set(models);

	        _underscore2.default.each(models, function (set) {
	          set.fetch({
	            success: function success() {
	              completed += 1;
	              if (completed === TO_COMPLETE) {
	                _this.trigger('loaded', _this);
	              }
	            },
	            error: function error() {
	              completed += 1;
	              if (completed === TO_COMPLETE) {
	                _this.trigger('loaded', _this);
	              }
	            }
	          });
	        });
	      }
	    });
	  },

	  _getAttrs: function _getAttrs(model) {
	    if (this._isModel(model)) {
	      return model.pick('exercise_name', 'weight', 'reps');
	    }
	    return model;
	  },
	  /** Add a set to the list and save it to disk.
	  */
	  addSet: function addSet(model) {
	    var _this2 = this;

	    var attrs = this._getAttrs(model);
	    var set = new _set.SetModel();

	    set.save(attrs, {
	      success: function success() {
	        var local = new _storage.LocalModel({
	          modelname: _set.MODELNAME
	        });

	        local.fetch({
	          success: function success() {
	            local.addId(set.id);
	            _this2.add(set);
	          },
	          error: function error() {
	            local.addId(set.id);
	            _this2.add(set);
	          }
	        });
	      }
	    });
	  },

	  /** Loop through the attached sets and set Exercise ID fields if they exist,
	      or start grabbing them from the server.
	  */
	  setExerciseIds: function setExerciseIds() {
	    var emptyExercise = this._getEmptyExercises();
	    var byExercise = this.groupBy('exercise_name');

	    _underscore2.default.each(emptyExercise, function (item) {
	      var name = item.get('exercise_name');
	      var exerciseList = byExercise[name];
	      if (_underscore2.default.isUndefined(exerciseList)) {
	        return;
	      }

	      var idMap = _underscore2.default.filter(exerciseList, function (item) {
	        return item.get('exercise');
	      });

	      if (!idMap.length) {
	        return;
	      }
	      item.set({ exercise: idMap[0].get('exercise') });
	    });
	  },

	  /** Loop through unidentified Exercises and find any matching Id fields.
	      This only fetches unique exercise_name values.
	      For the best (least network-usage) result, call setExerciseIds before
	      and after calling this method.
	  */
	  fetchExerciseIds: function fetchExerciseIds() {
	    var _this3 = this;

	    var byExercise = this.groupBy('exercise_name');
	    var emptyExercise = _underscore2.default.filter(_underscore2.default.map(byExercise, function (item) {
	      return item[0];
	    }), function (item) {
	      return !item.get('exercise');
	    });

	    var synched = 0;
	    var length = emptyExercise.length;

	    _underscore2.default.each(emptyExercise, function (exercise) {
	      _this3.listenToOnce(exercise, 'sync:exercise', function () {
	        synched += 1;
	        if (length === synched) {
	          _this3.trigger('sync');
	        }
	      });

	      exercise.fetchExercise();
	    });
	  },

	  _getEmptyExercises: function _getEmptyExercises() {
	    return this.filter(function (item) {
	      return !item.get('exercise');
	    });
	  },

	  /** Handle the actual sorting of:
	    first > second -> 1
	    first < second -> -1
	    first == second -> 0
	  */
	  _orderOneTwo: function _orderOneTwo(first, second) {
	    if (first > second) {
	      return 1;
	    } else if (first < second) {
	      return -1;
	    }
	    return 0;
	  }
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LocalModel = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(10);

	var _backbone4 = _interopRequireDefault(_backbone3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Grab a list of locally stored identifiers to be subsequently pulled from the
	    localStorage database.
	*/
	var LocalModel = exports.LocalModel = _backbone2.default.Model.extend({
	  idAttribute: 'modelname',
	  localStorage: new _backbone4.default('LocalData'),

	  defaults: function defaults() {
	    return {
	      data: []
	    };
	  },

	  addId: function addId(id, options) {
	    var data = this.get('data');
	    this.save({
	      data: _underscore2.default.union(data, [id])
	    }, options);
	  },

	  popId: function popId(id, options) {
	    var data = this.get('data');
	    this.save({
	      data: _underscore2.default.without(data, id)
	    }, options);
	  },

	  getIds: function getIds() {
	    return this.get('data');
	  }
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SetModel = exports.MODELNAME = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = __webpack_require__(10);

	var _backbone3 = _interopRequireDefault(_backbone2);

	var _moment = __webpack_require__(25);

	var _moment2 = _interopRequireDefault(_moment);

	var _validate2 = __webpack_require__(29);

	var _validate3 = _interopRequireDefault(_validate2);

	var _auth = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MODELNAME = exports.MODELNAME = 'sets.Set';

	/** This synchronises with the exercise API to make it easier to map our sets
	*/
	var SetModel = exports.SetModel = _backbone.Model.extend({
	  url: '/exercises/',
	  sync: _auth.authSync,

	  localStorage: new _backbone3.default(MODELNAME),

	  defaults: {
	    weight: '',
	    reps: '',
	    exercise_name: '',
	    workout_date: ''
	  },

	  /** Perform a reduced clear operation that lets us refocus on the weight.
	  */
	  clearExerciseAttrs: function clearExerciseAttrs() {
	    this.set({
	      weight: '',
	      reps: ''
	    });
	  },

	  /** Validators for the set
	  */
	  validate: function validate(attrs) {
	    return (0, _validate3.default)(attrs, {
	      exercise_name: {
	        presence: true
	      },
	      reps: {
	        presence: true,
	        numericality: {
	          onlyInteger: true,
	          greaterThan: 0
	        }
	      },
	      weight: {
	        presence: true
	      }
	    });
	  },

	  /** Returns the date formatted relative to today
	  */
	  formatDate: function formatDate() {
	    return (0, _moment2.default)(this.get('workout_date')).calendar(null, {
	      sameDay: '[Today]',
	      lastDay: '[Yesterday]',
	      lastWeek: 'dddd',
	      sameElse: 'DD/MM/YYYY'
	    });
	  },

	  /** Fetch an exercise from the server and synchronise the exercise ID to the
	      exercise field to let this Set be synchronised into a Workout.
	      Events:
	        before:sync:exercise (this) => Before the sync request is fired
	        sync:exercise (this, exercise) => When the sync is finished
	  */
	  fetchExercise: function fetchExercise() {
	    var _this = this;

	    this.set('id', 1); // Force a patch
	    this.trigger('before:sync:exercise', this);

	    this.save({ exercise_name: this.get('exercise_name') }, {
	      patch: true,
	      success: function success() {
	        var id = _this.id;
	        _this.set({
	          id: undefined,
	          exercise: id
	        });
	      },

	      ajaxSync: true,

	      complete: function complete() {
	        _this.trigger('sync:exercise', _this, _this.get('exercise'));
	      }
	    });
	  }
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<h4 class="list-group-item-heading">'+
	((__t=( weight ))==null?'':_.escape(__t))+
	'</h4>\n<p class="list-group-item-text"><strong>'+
	((__t=( reps ))==null?'':_.escape(__t))+
	'</strong> Reps</p>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="panel panel-'+
	((__t=( panel() ))==null?'':_.escape(__t))+
	'">\n  <div class="panel-heading">\n    '+
	((__t=( exercise_name ))==null?'':_.escape(__t))+
	'\n  </div>\n  <ol></ol>\n</div>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="page-header">\n  <h1 class="clearfix">\n    <span class="hidden-xs">Workout date:</span> '+
	((__t=( formattedDate ))==null?'':_.escape(__t))+
	'\n    <small class="pull-right">\n      <a href="/workout/" class="btn btn-link go-back">\n        <i class="glyphicon glyphicon-menu-left"></i>\n        Go Back\n      </a>\n      <a href="'+
	((__t=( editUrl ))==null?'':_.escape(__t))+
	'" class="btn btn-primary edit-workout">\n        <i class="glyphicon glyphicon-pencil"></i>\n        Edit\n      </a>\n    </small>\n  </h1>\n</div>\n\n<div class="exercise-list-hook"></div>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="panel panel-'+
	((__t=( iterType ))==null?'':_.escape(__t))+
	'">\n  <div class="panel-heading">\n    Session completed '+
	((__t=( formattedDate() ))==null?'':_.escape(__t))+
	'\n  </div>\n  <div class="panel-body">\n    '+
	((__t=( location ))==null?'':_.escape(__t))+
	'\n  </div>\n</div>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="row">\n  <div class="col-lg-12 col-md-12">\n    <a href="/workout/create" class="btn btn-clear btn-block btn-lg create-workout">\n      <i class="glyphicon glyphicon-plus"></i>\n      Start Session\n    </a>\n  </div>\n</div>\n\n<hr />\n\n<div class="row workouts-list"></div>\n';
	}
	return __p;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="list-hook"></div>\n';
	}
	return __p;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CreateWorkout = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(4);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _backbone5 = __webpack_require__(15);

	var _backbone6 = _interopRequireDefault(_backbone5);

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _list = __webpack_require__(44);

	var _exercises = __webpack_require__(49);

	var _search = __webpack_require__(51);

	var _set = __webpack_require__(36);

	var _sets = __webpack_require__(34);

	var _set2 = __webpack_require__(52);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExerciseView = _list.ExerciseContainerView.extend({
	  className: '',

	  onRender: function onRender() {
	    this.showChildView('sets', new _set2.PanelSetListView({
	      collection: this.collection
	    }));
	  },

	  onChildviewAddSet: function onChildviewAddSet(options) {
	    var fields = options.model.pick('weight', 'reps');
	    fields.exercise_name = this.model.get('exercise_name');
	    this.triggerMethod('add:set', fields);
	  }
	});

	var SetLayoutView = _backbone4.default.View.extend({
	  tagName: 'form',
	  className: 'form-horizontal',

	  attributes: {
	    method: 'post',
	    action: ''
	  },

	  template: __webpack_require__(55),

	  ui: {
	    initial: '#id_weight',
	    exerciseName: '#id_exercise_name'
	  },

	  regions: {
	    previous: '.previous-exercise-hook'
	  },

	  events: {
	    submit: 'addSet',
	    'change @ui.exerciseName': 'searchExercises'
	  },

	  modelEvents: {
	    change: 'render refocus'
	  },

	  collectionEvents: {
	    add: 'fetchIds',
	    loaded: 'fetchAllIds'
	  },

	  initialize: function initialize() {
	    var search = new _search.SearchModel(this.model.pick('exercise_name'));
	    var exerciseList = new _exercises.ExerciseList(null, {
	      searchModel: search
	    });
	    this.options.exerciseList = exerciseList;
	    this.options.searchModel = search;
	  },

	  onBeforeAttach: function onBeforeAttach() {
	    var exerciseList = this.getOption('exerciseList');
	    this.listenTo(exerciseList, 'sync', this.showPreviousWorkout);
	  },

	  onBeforeEmpty: function onBeforeEmpty() {
	    var exerciseList = this.getOption('exerciseList');
	    this.stopListening(exerciseList);
	  },

	  onRender: function onRender() {
	    this.showPreviousWorkout();
	  },

	  addSet: function addSet(e) {
	    e.preventDefault();
	    this.model.set(_backbone6.default.serialize(this));

	    if (this.model.isValid()) {
	      this.collection.addSet(this.model);
	      this.model.clearExerciseAttrs();
	    }
	  },

	  refocus: function refocus() {
	    this.ui.initial.focus();
	  },

	  fetchIds: function fetchIds(model, collection) {
	    collection.setExerciseIds();

	    if (!model.get('exercise') && model.get('exercise_name')) {
	      model.fetchExercise({
	        success: function success() {
	          return collection.setExerciseIds();
	        }
	      });
	    }
	  },

	  fetchAllIds: function fetchAllIds() {
	    _underscore2.default.chain(this.collection.filter(function (exercise) {
	      return !exercise.get('exercise') && exercise.get('exercise_name');
	    })).each(function (exercise) {
	      return exercise.fetchExercise();
	    });
	  },

	  searchExercises: function searchExercises() {
	    var data = _backbone6.default.serialize(this);
	    var exerciseName = data.exercise_name;
	    var search = this.getOption('searchModel');
	    var exerciseList = this.getOption('exerciseList');

	    if (exerciseName) {
	      search.set({ exercise_name: exerciseName });
	      exerciseList.fetch();
	    }
	  },

	  setDetails: function setDetails(attrs) {
	    this.model.set(attrs);
	  },

	  showPreviousWorkout: function showPreviousWorkout() {
	    var previous = this.getRegion('previous');
	    var exerciseList = this.getOption('exerciseList');

	    if (exerciseList.length) {
	      var exercise = exerciseList.at(0);
	      previous.show(new ExerciseView({
	        model: exercise,
	        collection: new _sets.SetList(exercise.getLastExercise()),
	        index: 0
	      }));
	    } else if (previous.hasView()) {
	      previous.empty();
	    }
	  },

	  onChildviewAddSet: function onChildviewAddSet(attrs) {
	    this.setDetails(attrs);
	  },

	  /** Clear the sets from localstorage.
	  */
	  clearSets: function clearSets() {
	    this.collection.clearStored();
	  }
	});

	var CreateWorkout = exports.CreateWorkout = _backbone4.default.View.extend({
	  template: __webpack_require__(56),

	  events: {
	    'click @ui.save': 'saveWorkout'
	  },

	  triggers: {
	    'click @ui.cancel': 'show:list'
	  },

	  modelEvents: {
	    sync: 'renderSetList',
	    save: 'saveComplete'
	  },

	  ui: {
	    cancel: '.cancel-create',
	    save: '.save-workout'
	  },

	  regions: {
	    setForm: '.setform-hook',
	    setList: '.setlist-hook'
	  },

	  initialize: function initialize() {
	    this.collection = new _sets.SetList(null);
	  },

	  onRender: function onRender() {
	    this.showChildView('setForm', new SetLayoutView({
	      model: new _set.SetModel(),
	      collection: this.collection
	    }));
	    this.showChildView('setList', new _set2.SmallSetListView({
	      collection: this.collection
	    }));

	    this.collection.fetchStored();
	  },

	  saveWorkout: function saveWorkout(e) {
	    e.preventDefault();
	    var data = _backbone6.default.serialize(this);
	    this.model.saveWorkout({
	      workout_date: data.workout_date,
	      sets: this.collection
	    });
	  },

	  saveComplete: function saveComplete() {
	    this.triggerMethod('add:to:collection', this.model);
	    this.triggerMethod('show:list');
	  },

	  onShowList: function onShowList() {
	    var form = this.getChildView('setForm');
	    form.clearSets();
	    _backbone2.default.history.navigate('workout/');
	  },

	  renderSetList: function renderSetList() {
	    var _this = this;

	    _underscore2.default.each(this.model.get('sets'), function (set) {
	      _this.collection.addSet(set);
	    });
	  }
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ExerciseLayoutView = exports.ExerciseContainerView = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(4);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _backbone5 = __webpack_require__(15);

	var _backbone6 = _interopRequireDefault(_backbone5);

	var _sets = __webpack_require__(34);

	var _set = __webpack_require__(45);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExerciseContainerView = exports.ExerciseContainerView = _backbone4.default.View.extend({
	  className: 'col-lg-4',
	  template: __webpack_require__(47),

	  regions: {
	    sets: {
	      selector: '.set-list-hook',
	      replaceElement: true
	    }
	  },

	  onRender: function onRender() {
	    this.showChildView('sets', new _set.SetListView({
	      collection: new _sets.SetList(this.collection.slice(0, 10))
	    }));
	  },

	  templateContext: function templateContext() {
	    var _this = this;

	    var panelIndexes = {
	      0: 'info',
	      1: 'danger',
	      2: 'warning',
	      3: 'success',
	      4: 'default'
	    };
	    var length = _underscore2.default.keys(panelIndexes).length;
	    return {
	      panel: function panel() {
	        return panelIndexes[_this.getOption('index') % length];
	      }
	    };
	  }
	});

	var ExerciseListView = _backbone4.default.CollectionView.extend({
	  className: 'row',
	  childView: ExerciseContainerView,

	  childViewOptions: function childViewOptions(model, index) {
	    return {
	      index: index,
	      collection: new _sets.SetList(model.get('sets'))
	    };
	  }
	});

	var ExerciseLayoutView = exports.ExerciseLayoutView = _backbone4.default.View.extend({
	  className: 'col-md-12 col-lg-10 col-lg-offset-1',
	  template: __webpack_require__(48),

	  regions: {
	    list: {
	      selector: '.exercise-list-hook',
	      replaceElement: true
	    }
	  },

	  ui: {
	    search: '.exercise_name',
	    create: '.start-session'
	  },

	  events: {
	    'input @ui.search': 'filterExercises',
	    'click @ui.create': 'showCreate'
	  },

	  onRender: function onRender() {
	    this.showChildView('list', new ExerciseListView({
	      collection: this.collection
	    }));
	  },

	  filterExercises: _underscore2.default.debounce(function () {
	    this.model.set(_backbone6.default.serialize(this));
	    this.collection.fetch();
	  }, 300),

	  showCreate: function showCreate(e) {
	    e.preventDefault();
	    _backbone2.default.history.navigate('workout/create', { trigger: true });
	  }
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SetListView = exports.SetView = undefined;

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _moment = __webpack_require__(25);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetView = exports.SetView = _backbone2.default.View.extend({
	  tagName: 'li',
	  className: 'list-group-item',
	  template: __webpack_require__(46),

	  templateContext: function templateContext() {
	    var _this = this;

	    var firstDate = this.getOption('firstDate');
	    return {
	      isFirstDate: function isFirstDate(workout_date) {
	        return (0, _moment2.default)(firstDate).format('YYYY-MM-DD') === (0, _moment2.default)(workout_date).format('YYYY-MM-DD');
	      },
	      formatDate: function formatDate() {
	        return _this.model.formatDate();
	      }
	    };
	  }
	});

	var SetListView = exports.SetListView = _backbone2.default.CollectionView.extend({
	  tagName: 'ol',
	  className: 'list-group',
	  childView: SetView,

	  childViewOptions: function childViewOptions() {
	    var first = this.collection.at(0);

	    return {
	      firstDate: first ? first.get('workout_date') : null
	    };
	  }
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='';
	 if (isFirstDate(workout_date)) { 
	__p+='\n  <h4 class="list-group-item-header">\n    '+
	((__t=( weight ))==null?'':_.escape(__t))+
	'\n    <span class="pull-right">'+
	((__t=( reps ))==null?'':_.escape(__t))+
	' Reps</span>\n  </h4>\n  <p class="list-group-item-text">'+
	((__t=( formatDate() ))==null?'':_.escape(__t))+
	'</p>\n';
	 } else { 
	__p+='\n  <span class="badge badge-info">'+
	((__t=( weight ))==null?'':_.escape(__t))+
	'</span>\n  '+
	((__t=( reps ))==null?'':_.escape(__t))+
	' Reps ('+
	((__t=( formatDate() ))==null?'':_.escape(__t))+
	')\n';
	 } 
	__p+='\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="panel panel-'+
	((__t=( panel() ))==null?'':_.escape(__t))+
	'">\n  <div class="panel-heading">\n    '+
	((__t=( exercise_name ))==null?'':_.escape(__t))+
	'\n  </div>\n  <ol class="set-list-hook list-group"></ol>\n</div>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="row">\n  <div class="col-md-10">\n    <form class="form-horizontal" action="" method="get">\n        <div class="form-group">\n          <label for="id_exercise_name" class="col-lg-2 hidden-xs control-label">\n            Find your exercise\n          </label>\n          <div class="col-lg-10 col-xs-12">\n            <input type="search" name="exercise_name" value=""\n              class="form-control exercise_name" placeholder="Search exercises"\n              id="id_exercise_name">\n          </div>\n        </div>\n    </form>\n  </div>\n  <div class="col-md-2">\n    <a href="/workout/create" class="start-session btn btn-link">\n      <i class="glyphicon glyphicon-plus"></i>\n      Start Session\n    </a>\n  </div>\n</div>\n\n<div class="row exercise-list-hook"></div>\n';
	}
	return __p;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ExerciseList = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _auth = __webpack_require__(8);

	var _exercise = __webpack_require__(50);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExerciseList = exports.ExerciseList = _backbone2.default.Collection.extend({
	  model: _exercise.ExerciseModel,
	  sync: _auth.authSync,

	  comparator: 'exercise_name',

	  initialize: function initialize(data, options) {
	    this.searchModel = options.searchModel;
	  },

	  url: function url() {
	    if (_underscore2.default.isUndefined(this.searchModel)) {
	      return '/exercises/';
	    }
	    return this.searchModel.url();
	  }
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ExerciseModel = undefined;

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _moment = __webpack_require__(25);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExerciseModel = exports.ExerciseModel = _backbone2.default.Model.extend({
	  defaults: function defaults() {
	    return {
	      exercise_name: '',
	      workout_date: (0, _moment2.default)().format('YYYY-MM-DD'),
	      sets: []
	    };
	  },

	  getAllSets: function getAllSets() {
	    return this.get('sets');
	  },

	  getLastExercise: function getLastExercise() {
	    var sets = this.get('sets');
	    var latestDate = _underscore2.default.reduce(sets, function (memo, set) {
	      var workout_date = set.workout_date;

	      return workout_date > memo ? workout_date : memo;
	    }, '1900-01-01');
	    return _underscore2.default.where(sets, { workout_date: latestDate });
	  }
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SearchModel = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Handles interaction with a search form. We can use this to search through
	    a collection of exercises.
	*/
	var SearchModel = exports.SearchModel = _backbone2.default.Model.extend({
	  defaults: {
	    exercise_name: ''
	  },

	  url: function url() {
	    var exercise_name = this.get('exercise_name');
	    var query = exercise_name ? '?exercise_name=' + exercise_name : '';
	    return '/exercises/' + query;
	  }
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PanelSetListView = exports.SmallSetListView = undefined;

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _exercise = __webpack_require__(33);

	var _set = __webpack_require__(45);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SetView = _backbone2.default.View.extend({
	  tagName: 'li',
	  className: 'list-group-item',
	  template: __webpack_require__(53),

	  modelEvents: {
	    change: 'render'
	  }
	});

	var SmallSetListView = exports.SmallSetListView = _exercise.SetListView.extend({
	  childView: SetView
	});

	var PanelSetView = _set.SetView.extend({
	  template: __webpack_require__(54),

	  triggers: {
	    click: 'add:set'
	  }
	});

	var PanelSetListView = exports.PanelSetListView = _set.SetListView.extend({
	  childView: PanelSetView
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<span class="badge">'+
	((__t=( weight ))==null?'':_.escape(__t))+
	'</span>\n'+
	((__t=( exercise_name ))==null?'':_.escape(__t))+
	' &ndash; '+
	((__t=( reps ))==null?'':_.escape(__t))+
	' Reps\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<h4 class="list-group-item-header">\n  '+
	((__t=( weight ))==null?'':_.escape(__t))+
	' <span class="pull-right">'+
	((__t=( reps ))==null?'':_.escape(__t))+
	' Reps</span>\n</h4>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="form-group">\n  <label class="control-label col-lg-2" for="id_exercise_name">Exercise</label>\n  <div class="col-lg-10">\n    <input class="form-control" id="id_exercise_name" type="text"\n      name="exercise_name" value="'+
	((__t=( exercise_name ))==null?'':_.escape(__t))+
	'">\n  </div>\n</div>\n<div class="col-xs-3 col-lg-8">\n  <div class="row">\n    <div class="form-group">\n      <label class="control-label col-lg-3" for="id_weight">Weight</label>\n      <div class="col-lg-8">\n        <input class="form-control" id="id_weight" type="text"\n        name="weight" value="'+
	((__t=( weight ))==null?'':_.escape(__t))+
	'">\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="form-group">\n      <label class="control-label col-lg-3" for="id_reps">Reps</label>\n      <div class="col-lg-8">\n        <input class="form-control" id="id_reps" type="number"\n        min="0" step="1" name="reps" value="'+
	((__t=( reps ))==null?'':_.escape(__t))+
	'">\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="col-xs-9 col-lg-4 previous-exercise-hook"></div>\n\n<button class="btn btn-block btn-primary">\n  <i class="glyphicon glyphicon-plus"></i>\n  Add Set\n</button>\n\n<hr>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="row">\n  <div class="col-sm-6 col-xs-6 col-md-3">\n    <button type="button" class="btn btn-block btn-default cancel-create">\n      <i class="glyphicon glyphicon-menu-left"></i>\n      Cancel\n    </button>\n  </div>\n  <div class="hidden-sm col-md-6"></div>\n  <div class="col-sm-6 col-xs-6 col-md-3">\n    <button type="submit" class="btn btn-block btn-success save-workout">\n      <i class="glyphicon glyphicon-ok"></i>\n      Done\n    </button>\n  </div>\n</div>\n\n<hr>\n\n<div class="col-md-6 col-sm-12">\n  <div class="form-horizontal">\n\n    <div class="form-group">\n      <label class="control-label col-lg-2" for="id_workout_date">Date</label>\n      <div class="col-lg-10">\n        <input class="form-control" id="id_workout_date" type="date" disabled\n          name="workout_date" value="'+
	((__t=( workout_date ))==null?'':_.escape(__t))+
	'">\n      </div>\n    </div>\n\n    <hr>\n\n    <div class="setform-hook"></div>\n  </div>\n\n</div>\n\n<div class="setlist-hook col-md-6 col-sm-12"></div>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UpdateWorkout = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _sets = __webpack_require__(34);

	var _create = __webpack_require__(43);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UpdateWorkout = exports.UpdateWorkout = _create.CreateWorkout.extend({
	  template: __webpack_require__(58),

	  modelEvents: {
	    fetch: 'updateSets',
	    save: 'saveComplete'
	  },

	  triggers: {
	    'click @ui.cancel': 'show:detail'
	  },

	  initialize: function initialize() {
	    this.collection = new _sets.SetList(this.model.get('sets'));
	  },

	  updateSets: function updateSets() {
	    this.collection.set(this.model.get('sets'));
	  },

	  onShowDetail: function onShowDetail() {
	    var form = this.getChildView('setForm');
	    form.clearSets();
	    _backbone2.default.history.navigate(this.model.displayUrl());
	  }
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="row">\n  <div class="col-sm-6 col-xs-6 col-md-3">\n    <button type="button" class="btn btn-block btn-default cancel-create">\n      <i class="glyphicon glyphicon-menu-left"></i>\n      Cancel\n    </button>\n  </div>\n  <div class="hidden-sm col-md-6"></div>\n  <div class="col-sm-6 col-xs-6 col-md-3">\n    <button type="submit" class="btn btn-block btn-success save-workout">\n      <i class="glyphicon glyphicon-ok"></i>\n      Done\n    </button>\n  </div>\n</div>\n\n<hr>\n\n<div class="col-md-6 col-sm-12">\n  <div class="form-horizontal">\n\n    <div class="form-group">\n      <label class="control-label col-lg-2" for="id_workout_date">Date</label>\n      <div class="col-lg-10">\n        <input class="form-control" id="id_workout_date" type="date" disabled\n          name="workout_date" value="'+
	((__t=( workout_date ))==null?'':_.escape(__t))+
	'">\n      </div>\n    </div>\n\n    <hr>\n\n    <div class="setform-hook"></div>\n  </div>\n\n</div>\n\n<div class="setlist-hook col-md-6 col-sm-12"></div>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="workout-container-hook row"></div>\n';
	}
	return __p;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routes = exports.Controller = undefined;

	var _controller = __webpack_require__(22);

	var _base = __webpack_require__(61);

	var Controller = exports.Controller = _controller.BaseController.extend({
	  layoutView: _base.ExerciseLayout,

	  listExercise: function listExercise() {
	    var layout = this.showAndGetLayout();
	    layout.showExerciseList();
	  },

	  showExercise: function showExercise() {}
	});

	var routes = exports.routes = {
	  'exercise/': 'listExercise',
	  'exercise/:exercise': 'showExercise'
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ExerciseLayout = undefined;

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _search = __webpack_require__(51);

	var _exercises = __webpack_require__(49);

	var _list = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExerciseLayout = exports.ExerciseLayout = _backbone2.default.View.extend({
	  template: __webpack_require__(62),
	  regions: {
	    main: '.layout-hook'
	  },

	  initialize: function initialize() {
	    this.model = new _search.SearchModel();
	    this.collection = new _exercises.ExerciseList(null, { searchModel: this.model });
	    this.collection.fetch();
	  },

	  showExerciseList: function showExerciseList() {
	    this.showChildView('main', new _list.ExerciseLayoutView({
	      collection: this.collection,
	      model: this.model
	    }));
	  }
	});

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="layout-hook row"></div>\n';
	}
	return __p;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routes = exports.Controller = undefined;

	var _controller = __webpack_require__(22);

	var _views = __webpack_require__(64);

	var _auth = __webpack_require__(8);

	var Controller = exports.Controller = _controller.BaseController.extend({
	  layoutView: _views.UserLayout,

	  initialize: function initialize() {
	    var model = new _auth.UserModel();
	    model.fetch();

	    this.options.layoutOptions = {
	      model: model
	    };
	  },

	  showProfile: function showProfile() {
	    this.showAndGetLayout();
	  }
	});

	var routes = exports.routes = {
	  'profile': 'showProfile'
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserLayout = undefined;

	var _backbone = __webpack_require__(15);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PasswordView = _backbone3.View.extend({
	  template: __webpack_require__(66),
	  className: 'row',

	  ui: {
	    changePassword: '.password-button',
	    cancel: '.cancel-button'
	  },

	  events: {
	    'click @ui.changePassword': 'changePassword'
	  },

	  modelEvents: {
	    error: 'logError'
	  },

	  changePassword: function changePassword() {
	    var _Syphon$serialize = _backbone2.default.serialize(this);

	    var password1 = _Syphon$serialize.password1;
	    var password2 = _Syphon$serialize.password2;


	    this.model.changePassword(password1, password2);
	  },

	  logError: function logError() {
	    console.log(arguments);
	  }
	});

	var UserLayout = exports.UserLayout = _backbone3.View.extend({
	  className: 'container-fluid',
	  template: __webpack_require__(65),

	  ui: {
	    form: 'form',
	    showPassword: '.show-password',
	    undo: '.undo'
	  },

	  regions: {
	    password: {
	      selector: '.change-password-hook',
	      replaceElement: true
	    }
	  },

	  childEvents: {
	    'click @ui.cancel': 'closePassword'
	  },

	  events: {
	    'submit @ui.form': 'updateUser',
	    'click @ui.undo': 'render',
	    'click @ui.showPassword': 'showPassword'
	  },

	  modelEvents: {
	    sync: 'render'
	  },

	  updateUser: function updateUser(e) {
	    e.preventDefault();

	    var _Syphon$serialize2 = _backbone2.default.serialize(this);

	    var first_name = _Syphon$serialize2.first_name;
	    var last_name = _Syphon$serialize2.last_name;

	    this.model.updateUser({
	      first_name: first_name,
	      last_name: last_name
	    });
	  },

	  showPassword: function showPassword() {
	    if (this.getRegion('password').hasView()) {
	      return;
	    }
	    this.showChildView('password', new PasswordView({
	      model: this.model
	    }));
	  },

	  closePassword: function closePassword() {
	    var password = this.getRegion('password');
	    if (password.hasView()) {
	      password.empty();
	    }
	  }
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<form class="form-horizontal" action="" method="PUT">\n  <div class="row">\n    <div class="col-lg-4 col-lg-offset-2">\n      <div class="form-group">\n        <label class="control-label col-lg-3" for="id_email">My email</label>\n        <div class="col-lg-9">\n          <input class="form-control" id="id_email" type="email" value="'+
	((__t=( email ))==null?'':_.escape(__t))+
	'"\n          name="email" disabled>\n        </div>\n      </div>\n    </div>\n    <div class="col-lg-4">\n      <div class="form-group">\n        <label class="control-label col-lg-3" for="id_password">Password</label>\n        <div class="col-lg-5">\n          <input class="form-control" id="id_password" type="password"\n            value="disabled password" disabled>\n        </div>\n        <button class="btn btn-warning col-lg-4 show-password" type="button">\n          Change Password\n        </button>\n      </div>\n    </div>\n  </div>\n  <div class="change-password-hook"></div>\n\n  <hr>\n\n  <div class="row">\n    <div class="col-lg-4 col-lg-offset-2">\n      <div class="form-group">\n        <label class="control-label col-lg-3" for="id_first_name">\n          First Name\n        </label>\n        <div class="col-lg-9">\n          <input class="form-control" id="id_first_name" type="text"\n          value="'+
	((__t=( first_name ))==null?'':_.escape(__t))+
	'" name="first_name">\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-4 col-lg-offset-2">\n      <div class="form-group">\n        <label class="control-label col-lg-3" for="id_last_name">\n          Last Name\n        </label>\n        <div class="col-lg-9">\n          <input class="form-control" id="id_last_name" type="text"\n          value="'+
	((__t=( last_name ))==null?'':_.escape(__t))+
	'" name="last_name">\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-4 col-lg-offset-2">\n      <div class="pull-right">\n        <button type="button" class="btn btn-danger undo">\n          Undo Changes\n        </button>\n        <button type="submit" class="btn btn-success save-user">\n          Update Details\n        </button>\n      </div>\n    </div>\n  </div>\n</form>\n';
	}
	return __p;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function(obj){
	var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
	with(obj||{}){
	__p+='<div class="col-lg-4 col-lg-offset-2">\n  <div class="form-group">\n    <label class="control-label col-lg-3" for="id_password1">\n      Password\n    </label>\n    <div class="col-lg-9">\n      <input class="form-control" id="id_password1" type="password"\n        name="password1">\n    </div>\n  </div>\n</div>\n<div class="col-lg-4">\n  <div class="form-group">\n    <label class="control-label col-lg-3" for="id_password2">\n      Repeat\n    </label>\n    <div class="col-lg-9">\n      <input class="form-control" id="id_password2" type="password"\n        name="password2">\n    </div>\n  </div>\n</div>\n<div class="col-lg-6">\n  <div class="pull-right">\n    <button type="button" class="btn btn-default cancel-button">\n      Cancel\n    </button>\n\n    <button type="button" class="btn btn-success password-button">\n      Change Password\n    </button>\n  </div>\n</div>\n';
	}
	return __p;
	};

/***/ }
/******/ ]);