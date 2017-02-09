(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Wx"] = factory();
	else
		root["Wx"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _instanceWx = __webpack_require__(1);
	
	var _instanceWx2 = _interopRequireDefault(_instanceWx);
	
	_instanceWx2['default'].version = '1.0.0';
	
	exports['default'] = _instanceWx2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _internalInit = __webpack_require__(2);
	
	var _internalInit2 = _interopRequireDefault(_internalInit);
	
	var _internalState = __webpack_require__(3);
	
	var _internalState2 = _interopRequireDefault(_internalState);
	
	var _internalLifecycle = __webpack_require__(7);
	
	var _internalLifecycle2 = _interopRequireDefault(_internalLifecycle);
	
	var _apiLifecycle = __webpack_require__(17);
	
	var _apiLifecycle2 = _interopRequireDefault(_apiLifecycle);
	
	function Wx(options) {
	  this._init(options);
	}
	
	_internalInit2['default'](Wx);
	_internalState2['default'](Wx);
	_internalLifecycle2['default'](Wx);
	
	_apiLifecycle2['default'](Wx);
	exports['default'] = Wx;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	"use strict";
	
	exports.__esModule = true;
	
	exports["default"] = function (Wx) {
	    Wx.prototype._init = function (options) {
	        this.$options = options || {};
	        this.$el = null;
	
	        this._watchers = [];
	        this._directives = [];
	
	        this._events = {};
	
	        this._data = {};
	
	        this._initState();
	
	        if (options.el) {
	            this.$mount(options.el);
	        }
	    };
	};
	
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(4);
	
	var _observerIndex = __webpack_require__(5);
	
	var _watcher = __webpack_require__(16);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _observerDep = __webpack_require__(6);
	
	var _observerDep2 = _interopRequireDefault(_observerDep);
	
	exports['default'] = function (Wx) {
	    Wx.prototype._initState = function () {
	        this._initData();
	        this._initMethods();
	        this._initComputed();
	    };
	
	    Wx.prototype._initMethods = function () {
	        var methods = this.$options.methods;
	        if (methods) {
	            for (var key in methods) {
	                this[key] = _util.bind(methods[key], this);
	            }
	        }
	    };
	
	    Wx.prototype._initData = function () {
	        this._data = this.$options.data;
	        var data = this._data;
	
	        var keys = Object.keys(data);
	        var i, key;
	        i = keys.length;
	        while (i--) {
	            key = keys[i];
	            this._proxy(key);
	        }
	
	        _observerIndex.observe(data);
	    };
	
	    function noop() {}
	    Wx.prototype._initComputed = function () {
	        var computed = this.$options.computed;
	        if (computed) {
	            for (var key in computed) {
	                var def = {
	                    enumerable: true,
	                    configurable: true
	                };
	                def.get = makeComputedGetter(this, computed[key]);
	                def.set = noop;
	
	                Object.defineProperty(this, key, def);
	            }
	        }
	    };
	
	    function makeComputedGetter(vm, getter) {
	        var watcher = new _watcher2['default'](vm, getter, null, {
	            lazy: true
	        });
	        return function computedGetter() {
	            if (watcher.dirty) {
	                watcher.evaluate();
	            }
	            if (_observerDep2['default'].target) {
	                watcher.depend();
	            }
	            return watcher.value;
	        };
	    }
	
	    Wx.prototype._proxy = function (key) {
	        var self = this;
	        Object.defineProperty(self, key, {
	            configurable: true,
	            enumerable: true,
	            get: function proxyGetter() {
	                return self._data[key];
	            },
	            set: function proxySetter(val) {
	                self._data[key] = val;
	            }
	        });
	    };
	
	    Wx.prototype._unproxy = function (key) {
	        delete this[key];
	    };
	};
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	exports.bind = bind;
	exports.query = query;
	exports.on = on;
	exports.off = off;
	exports.extend = extend;
	
	function bind(fn, ctx) {
	    return function (a) {
	        var l = arguments.length;
	        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	    };
	}
	
	function query(el) {
	    el = typeof el === 'string' ? document.querySelector(el) : el;
	    return el;
	}
	
	function on(el, event, cb) {
	    el.addEventListener(event, cb);
	}
	
	function off(el, event, cb) {
	    el.removeEventListener(event, cb);
	}
	
	function extend(to, from) {
	    var keys = Object.keys(from);
	    var i = keys.length;
	    while (i--) {
	        to[keys[i]] = from[keys[i]];
	    }
	    return to;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/8.
	 */
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = Observer;
	exports.defineReactive = defineReactive;
	exports.observe = observe;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _dep = __webpack_require__(6);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	function Observer(value) {
	    this.value = value;
	    this.walk(value);
	}
	
	Observer.prototype.walk = function (value) {
	    var self = this;
	    Object.keys(value).forEach(function (key) {
	        self.convert(key, value[key]);
	    });
	};
	
	Observer.prototype.convert = function (key, val) {
	    defineReactive(this.value, key, val);
	};
	
	function defineReactive(obj, key, value) {
	    var dep = new _dep2['default']();
	    var childObj = observe(value);
	
	    Object.defineProperty(obj, key, {
	        enumerable: true,
	        configurable: true,
	        get: function get() {
	            if (_dep2['default'].target) {
	                dep.depend();
	                return value;
	            }
	        },
	        set: function set(newVal) {
	            if (newVal === value) return;
	            value = newVal;
	            childObj = observe(value);
	            dep.notify();
	        }
	    });
	}
	
	function observe(value, vm) {
	    if (!value || typeof value !== 'object') return;
	    return new Observer(value);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Created by wangshuo on 2017/2/8.
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = Dep;
	var uid = 0;
	
	function Dep() {
	    this.id = uid++;
	    this.subs = [];
	}
	
	Dep.target = null;
	
	Dep.prototype.addSub = function (sub) {
	    this.subs.push(sub);
	};
	
	Dep.prototype.removeSub = function (sub) {
	    var index = this.subs.indexOf(sub);
	    if (index != -1) {
	        this.subs.splice(index, 1);
	    }
	};
	
	Dep.prototype.depend = function () {
	    Dep.target.addDep(this);
	};
	
	Dep.prototype.notify = function () {
	    this.subs.forEach(function (sub) {
	        sub.update();
	    });
	};
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _compile = __webpack_require__(8);
	
	var _directive = __webpack_require__(15);
	
	var _directive2 = _interopRequireDefault(_directive);
	
	exports['default'] = function (Wx) {
	    Wx.prototype._compile = function (el) {
	        var options = this.$options;
	
	        _compile.compile(el, options)(this, el);
	    };
	
	    Wx.prototype._bindDir = function (descriptor, node) {
	        this._directives.push(new _directive2['default'](descriptor, this, node));
	    };
	};
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	exports.compile = compile;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _directivesIndex = __webpack_require__(9);
	
	var _directivesIndex2 = _interopRequireDefault(_directivesIndex);
	
	var delimiters = /\{\{(.*)\}\}/;
	
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var argRE = /:(.*)$/;
	
	function compile(el, options) {
	    var nodeLinkFn = compileNode(el, options);
	
	    var childLinkFn = el.hasAttributes() ? compileNodeList(el.childNodes, options) : null;
	
	    return function compositeLinkFn(vm, el) {
	        var childNodes = el.childNodes;
	        var dirs = linkAndCapture(function () {
	            if (nodeLinkFn) nodeLinkFn(vm, el);
	            if (childLinkFn) childLinkFn(vm, childNodes);
	        }, vm);
	    };
	}
	
	function linkAndCapture(linker, vm) {
	    var originaalDirCount = vm._directives.length;
	    linker();
	    var dirs = vm._directives.slice(originaalDirCount);
	    for (var i = 0, len = dirs.length; i < len; i++) {
	        dirs[i]._bind();
	    }
	    return dirs;
	}
	
	function compileNode(node, options) {
	    var type = node.nodeType;
	    if (type === 1) {
	        return compileElement(node, options);
	    } else if (type === 3) {
	        return compileTextNode(node, options);
	    } else {
	        return null;
	    }
	}
	
	function compileNodeList(childNodes, options) {
	    var linkFns = [];
	    var nodeLinkFn, childLinkFn, node;
	    for (var i = 0, len = childNodes.length; i < len; i++) {
	        node = childNodes[i];
	        nodeLinkFn = compileNode(node, options);
	        childLinkFn = node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	        linkFns.push(nodeLinkFn, childLinkFn);
	    }
	    return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}
	
	function makeChildLinkFn(linkFns) {
	    return function childLinkFn(vm, nodes) {
	        var node, nodeLinkFn, childrenLinkFn;
	        for (var i = 0, n = 0, len = linkFns.length; i < len; n++) {
	            node = nodes[n];
	            nodeLinkFn = linkFns[i++];
	            childrenLinkFn = linkFns[i++];
	
	            nodeLinkFn && nodeLinkFn(vm, node);
	            childrenLinkFn && childrenLinkFn(vm, node.childNodes);
	        }
	    };
	}
	
	function compileElement(el, options) {
	    var linkFn;
	    var hasAttrs = el.hasAttributes();
	    if (hasAttrs) {
	        linkFn = compileDirectives(el.attributes, options);
	    }
	    return linkFn;
	}
	
	function compileDirectives(attrs, options) {
	    var i = attrs.length;
	    var dirs = [];
	    var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens;
	    while (i--) {
	        attr = attrs[i];
	        name = rawName = attr.name;
	        value = rawValue = attr.value;
	        if (onRE.test(name)) {
	            arg = name.replace(onRE, '');
	            pushDir('on', _directivesIndex2['default'].on);
	        }
	
	        if (bindRE.test(name)) {
	            arg = dirName = name.replace(bindRE, '');
	            pushDir('bind', _directivesIndex2['default'].bind);
	        }
	        if (name.indexOf('v-') === 0) {
	            arg = (arg = name.match(argRE)) && arg[1];
	            if (arg) {
	                name = name.replace(argRE, '');
	            }
	            dirName = name.slice(2);
	
	            pushDir(dirName, _directivesIndex2['default'][dirName]);
	        }
	    }
	
	    function pushDir(dirName, def) {
	        dirs.push({
	            name: dirName,
	            attr: rawName,
	            raw: rawValue,
	            def: def,
	            arg: arg,
	            expression: value
	        });
	    }
	
	    if (dirs.length) {
	        return makeNodeLinkFn(dirs);
	    }
	}
	
	function makeNodeLinkFn(directives) {
	    return function nodeLinkFn(vm, el) {
	        var i = directives.length;
	        while (i--) {
	            vm._bindDir(directives[i], el);
	        }
	    };
	}
	
	function compileTextNode(el, options) {
	    var text = el.textContent;
	    if (delimiters.test(text)) {
	        var match = delimiters.exec(text);
	        var value = match[1];
	
	        var descriptor = {
	            name: "text",
	            rawVal: text,
	            def: _directivesIndex2['default'].text,
	            expression: value
	        };
	
	        return makeTextNodeLinkFn(descriptor);
	    }
	}
	
	function makeTextNodeLinkFn(descriptor) {
	    return function textNodeLinkFn(vm, el) {
	        vm._bindDir(descriptor, el);
	    };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _on = __webpack_require__(10);
	
	var _on2 = _interopRequireDefault(_on);
	
	var _text = __webpack_require__(11);
	
	var _text2 = _interopRequireDefault(_text);
	
	var _bind = __webpack_require__(12);
	
	var _bind2 = _interopRequireDefault(_bind);
	
	var _modelIndex = __webpack_require__(13);
	
	var _modelIndex2 = _interopRequireDefault(_modelIndex);
	
	exports['default'] = {
	    text: _text2['default'],
	    on: _on2['default'],
	    bind: _bind2['default'],
	    model: _modelIndex2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(4);
	
	exports['default'] = {
	    acceptStatement: true,
	    bind: function bind() {},
	    update: function update(handler) {
	        _util.on(this.el, this.arg, handler);
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Created by wangshuo on 2017/2/8.
	 */
	'use strict';
	
	exports.__esModule = true;
	var delimiters = /\{\{(.*)\}\}/;
	
	exports['default'] = {
	    bind: function bind() {
	        this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	    },
	    update: function update(value) {
	        this.el[this.attr] = this.rawVal.replace(delimiters, value || "");
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Created by wangshuo on 2017/2/9.
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = {
	    bind: function bind() {},
	    update: function update(value) {
	        var attr = this.arg;
	        if (attr) {
	            this.el.setAttribute(attr, value);
	            this.el.removeAttribute(this.attr);
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/8.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _text = __webpack_require__(14);
	
	var _text2 = _interopRequireDefault(_text);
	
	var handlers = {
	    text: _text2['default']
	};
	exports['default'] = {
	    bind: function bind() {
	        var el = this.el;
	        var tag = el.tagName;
	        var handler;
	        if (tag === 'INPUT') {
	            handler = handlers[el.type] || handler.text;
	        } else if (tag === 'SELECT') {
	            handler = handlers.select;
	        } else if (tag === 'TEXTAREA') {
	            handler = handlers.text;
	        } else {
	            return;
	        }
	
	        handler.bind.call(this);
	
	        this.update = handler.update;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Created by wangshuo on 2017/2/8.
	 */
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = {
	    bind: function bind() {
	        var self = this;
	        var el = this.el;
	
	        this.listener = function () {
	            var val = el.value;
	            self.set(val);
	        };
	
	        this.on('change', this.listener);
	        this.on('keyup', this.listener);
	    },
	    update: function update(value) {
	        this.el.value = value || "";
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = Directive;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(4);
	
	var _watcher = __webpack_require__(16);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	function Directive(descriptor, vm, el) {
	    this.vm = vm;
	    this.el = el;
	    this.descriptor = descriptor;
	    this.name = descriptor.name;
	    this.arg = descriptor.arg;
	    this.rawVal = descriptor.rawVal;
	    this.attr = descriptor.attr;
	    this.expression = descriptor.expression;
	
	    this._listeners;
	}
	
	Directive.prototype._bind = function () {
	    var name = this.name;
	    var descriptor = this.descriptor;
	
	    var def = descriptor.def;
	
	    _util.extend(this, def);
	
	    if (this.bind) {
	        this.bind();
	    }
	
	    var dir = this;
	    if (this.update && !this._checkStatement()) {
	        this._update = function (val, oldVal) {
	            dir.update(val, oldVal);
	        };
	
	        var watcher = this._watcher = new _watcher2['default'](this.vm, this.expression, this._update, {});
	
	        this.update(watcher.value);
	    }
	};
	
	Directive.prototype._checkStatement = function () {
	    var express = this.expression;
	    if (express && this.acceptStatement) {
	        var fn = makeFn();
	        var scope = this.vm;
	        var handler = function handler(e) {
	            scope.$event = e;
	            fn.call(scope, scope);
	            scope.$event = null;
	        };
	        this.update(handler);
	        return true;
	    }
	
	    function makeFn() {
	        return new Function('scope', 'return scope.' + express + ';');
	    }
	};
	
	Directive.prototype.set = function (value) {
	    this._watcher.set(value);
	};
	
	Directive.prototype.on = function (event, handler) {
	    _util.on(this.el, event, handler);
	    (this._listeners || (this._listeners = [])).push([event, handler]);
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = Watcher;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(4);
	
	var _observerDep = __webpack_require__(6);
	
	var _observerDep2 = _interopRequireDefault(_observerDep);
	
	function Watcher(vm, exrOrFn, cb, options) {
	    if (options) {
	        _util.extend(this, options);
	    }
	
	    var isFn = typeof exrOrFn === 'function';
	
	    this.vm = vm;
	    vm._watchers.push(this);
	    this.expression = isFn ? exrOrFn.toString() : exrOrFn;
	    this.cb = cb;
	    this.dirty = this.lazy;
	    this.deps = Object.create(null);
	    this.getter = isFn ? exrOrFn : makeFn(exrOrFn);
	
	    function makeFn(expression) {
	        return new Function('scope', 'return scope.' + expression + ';');
	    }
	    this.value = this.dirty ? null : this.get();
	}
	
	Watcher.prototype.get = function () {
	    this.beforeGet();
	    var scope = this.vm;
	    var value = this.getter.call(scope, scope);
	    this.afterGet();
	    return value;
	};
	
	Watcher.prototype.set = function (value) {
	    this.vm[this.expression] = value;
	};
	
	Watcher.prototype.beforeGet = function () {
	    _observerDep2['default'].target = this;
	    this.newDeps = Object.create(null);
	};
	Watcher.prototype.afterGet = function () {
	    _observerDep2['default'].target = null;
	    var ids = Object.keys(this.deps);
	    var i = ids.length;
	    while (i--) {
	        var id = ids[i];
	        if (!this.newDeps[id]) {
	            this.deps[i].removeSub(this);
	        }
	    }
	    this.deps = this.newDeps;
	};
	
	Watcher.prototype.addDep = function (dep) {
	    var id = dep.id;
	    if (!this.newDeps[id]) {
	        this.newDeps[id] = dep;
	        if (!this.deps[id]) {
	            this.deps[id] = dep;
	            dep.addSub(this);
	        }
	    }
	};
	
	Watcher.prototype.update = function () {
	    this.run();
	};
	
	Watcher.prototype.run = function () {
	    var value = this.get();
	    var oldVal = this.value;
	    if (value !== oldVal) {
	        this.value = value;
	        this.cb && this.cb.call(this.vm, value, oldVal);
	    }
	};
	
	Watcher.prototype.evaluate = function () {
	    var target = _observerDep2['default'].target;
	    this.value = this.get();
	    this.dirty = false;
	    _observerDep2['default'].target = target;
	};
	
	Watcher.prototype.depend = function () {
	    var ids = Object.keys(this.deps);
	    var i = ids.length;
	    while (i--) {
	        var id = ids[i];
	        this.deps[id].depend();
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangshuo on 2017/2/7.
	 */
	'use strict';
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(4);
	
	exports['default'] = function (Wx) {
	    Wx.prototype.$mount = function (el) {
	        this.$el = el = _util.query(el);
	        this._compile(el);
	        return this;
	    };
	};
	
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=wx.js.map