module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/search/src/search.vue?vue&type=template&id=4e34eb34&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "tea-form--search" }, [
    _c(
      "div",
      {
        staticClass: "tea-search",
        class: { "tea-search--multi": _vm.multiple },
        attrs: { "data-role": "qc-search" },
      },
      [
        _c("div", { staticClass: "tea-search__inner" }, [
          !_vm.multiple
            ? _c("input", {
                staticClass: "tea-input tea-input--search",
                attrs: { placeholder: _vm.placeholder },
                domProps: { value: _vm.innerValue },
                on: { input: _vm.handleInput, keyup: _vm.handleKeyUp },
              })
            : _vm._e(),
          _vm.multiple
            ? _c("textarea", {
                staticClass: "tea-input tea-input--search",
                attrs: { placeholder: _vm.placeholder },
                domProps: { value: _vm.innerValue },
                on: { input: _vm.handleInput },
              })
            : _vm._e(),
        ]),
        _vm.needClearIcon
          ? _c(
              "button",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.innerValue,
                    expression: "innerValue",
                  },
                ],
                staticClass: "tea-btn tea-btn--icon tea-btn--dismiss",
                attrs: { type: "button" },
                on: { click: _vm.handleClear },
              },
              [
                _c("i", {
                  staticClass: "tea-icon tea-icon-dismiss",
                  attrs: { type: "dismiss" },
                }),
              ]
            )
          : _vm._e(),
        _c(
          "button",
          {
            staticClass: "tea-btn tea-btn--icon tea-btn--search",
            attrs: { type: "button" },
            on: { click: _vm.handleSearch },
          },
          [_c("i", { staticClass: "tea-icon tea-icon-search" })]
        ),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/search/src/search.vue?vue&type=template&id=4e34eb34&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/search/src/search.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var searchvue_type_script_lang_js_ = ({
  name: 'ElSearch',
  componentName: 'ElSearch',
  props: {
    /**
     * 输入默认内容
     * [String, Number]
     */
    value: {
      type: [String, Number],
      required: false,
      default: ''
    },

    /**
     * 皮肤类型，只有效于mode为block的情况
     * [String]
     * "middle": 中等尺寸, 默认
     * "large": 大尺寸
     */
    size: {
      type: String,
      required: false,
      default: 'middle'
    },

    /**
     * 是否多行填写，只有效于mode为block的情况
     * [Boolean]
     */
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * 是否显示清除icon，只有效于mode为block的情况
     * [Boolean]
     */
    needClearIcon: {
      type: Boolean,
      required: false,
      default: true
    },

    /**
     * 是否需要用enter触发搜索事件，前置条件为multiple为false
     * [Boolean]
     */
    needEnterTrigger: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * 输入框的默认提示
     * [String]
     */
    placeholder: {
      type: String,
      required: false,
      default: '请输入搜索内容'
    },

    /**
     * 输入框的宽度，mode为inline时，最长不超过170
     * [String]
     */
    width: {
      type: String,
      required: false,
      default: 'auto'
    },
    /**
     * 输入框的display属性
     * [String]
     */
    display: {
      type: String,
      required: false,
      default: 'block'
    },

    /**
     * 输入框的display模式
     * [String]
     * "block": 块级模式
     * "inline": 行内模式
     */
    mode: {
      type: String,
      required: false,
      default: 'block'
    },

    /**
     * 输入框的值前后去空格
     * [Boolean]
     */
    trim: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: function data() {
    return {
      innerValue: this.value
    };
  },

  watch: {
    value: function value(val) {
      this.innerValue = val;
    }
  },
  methods: {
    // 搜索事件
    handleSearch: function handleSearch() {
      this.$emit('input', this.innerValue);
      this.$emit('on-search', this.innerValue);
    },

    /**
     * 清除输入事件
     */
    handleClear: function handleClear() {
      this.innerValue = '';
      this.handleSearch();
    },

    /**
     * 输入事件处理
     * @param e
     */
    handleInput: function handleInput(e) {
      var _this = this;

      var value = e.target.value;
      if (this.trim) {
        value = value.trim();
      }
      // 等待输入结果
      setTimeout(function () {
        if (value === _this.innerValue) {
          _this.$emit('input', _this.innerValue);
        }
      }, 500);

      this.innerValue = value;
    },

    /**
     * 键盘keyup事件处理
     * @param e
     */
    handleKeyUp: function handleKeyUp(e) {
      var value = e.target.value;
      if (this.trim) {
        value = value.trim();
      }
      this.innerValue = value;

      if (e.keyCode === 13 && this.needEnterTrigger) {
        this.handleSearch();
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/search/src/search.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_searchvue_type_script_lang_js_ = (searchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/search/src/search.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_searchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/search/src/search.vue"
/* harmony default export */ var search = (component.exports);
// CONCATENATED MODULE: ./packages/search/index.js


/* istanbul ignore next */
search.install = function (Vue) {
  Vue.component(search.name, search);
};

/* harmony default export */ var packages_search = __webpack_exports__["default"] = (search);

/***/ })

/******/ });