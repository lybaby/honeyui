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
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
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

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("honey-ui/lib/utils/clickoutside");

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("honey-ui/lib/locale");

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("honey-ui/lib/mixins/focus");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("honey-ui/lib/mixins/emitter");

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = require("honey-ui/lib/tree");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("honey-ui/lib/utils/vue-popper");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("honey-ui/lib/mixins/locale");

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/popper/src/popper.vue?vue&type=template&id=52772fe6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "clickoutside",
          rawName: "v-clickoutside",
          value: _vm.handleClose,
          expression: "handleClose"
        }
      ],
      staticClass: "tea-popper",
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.toggleMenu($event)
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "tea-dropdown",
          class: { "is-disabled": _vm.selectDisabled },
          style: _vm.full ? { width: "100%" } : {}
        },
        [
          _c(
            "div",
            {
              ref: "reference",
              staticClass: "tea-dropdown__header",
              class: {
                "tea-dropdown-btn": _vm.border,
                "no-arrow": !_vm.showClose && !_vm.enableArrow
              },
              on: {
                mouseenter: function($event) {
                  _vm.inputHovering = true
                },
                mouseleave: function($event) {
                  _vm.inputHovering = false
                }
              }
            },
            [
              _c(
                "div",
                { staticClass: "tea-dropdown__value" },
                [
                  _vm._t("value", [
                    _vm._v(
                      "\n          " + _vm._s(_vm.placeholder) + "\n        "
                    )
                  ])
                ],
                2
              ),
              _vm.showClose
                ? _c("i", {
                    staticClass: "tea-icon tea-icon-dismiss size-s",
                    on: { click: _vm.handleClearClick }
                  })
                : [
                    _vm.enableArrow
                      ? _c("i", {
                          staticClass: "tea-icon tea-icon-arrowdown",
                          attrs: { type: "arrowdown" }
                        })
                      : _vm._e()
                  ]
            ],
            2
          )
        ]
      ),
      _c(
        "transition",
        {
          attrs: { name: "el-zoom-in-top" },
          on: { "after-leave": _vm.doDestroy }
        },
        [
          _c(
            "el-popper-dropdown",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.visible,
                  expression: "visible"
                }
              ],
              ref: "popper"
            },
            [_vm._t("popper")],
            2
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/popper/src/popper.vue?vue&type=template&id=52772fe6&

// EXTERNAL MODULE: external "honey-ui/lib/mixins/emitter"
var emitter_ = __webpack_require__(4);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "honey-ui/lib/mixins/focus"
var focus_ = __webpack_require__(21);
var focus_default = /*#__PURE__*/__webpack_require__.n(focus_);

// EXTERNAL MODULE: external "honey-ui/lib/mixins/locale"
var locale_ = __webpack_require__(6);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "honey-ui/lib/locale"
var lib_locale_ = __webpack_require__(19);

// EXTERNAL MODULE: external "honey-ui/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(12);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/popper/src/popper-dropdown.vue?vue&type=template&id=016f7570&
var popper_dropdownvue_type_template_id_016f7570_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "tea-dropdown-box el-popper",
      class: [_vm.popperClass],
      style: { minWidth: _vm.minWidth, position: "absolute", zIndex: 1001 }
    },
    [_vm._t("default")],
    2
  )
}
var popper_dropdownvue_type_template_id_016f7570_staticRenderFns = []
popper_dropdownvue_type_template_id_016f7570_render._withStripped = true


// CONCATENATED MODULE: ./packages/popper/src/popper-dropdown.vue?vue&type=template&id=016f7570&

// EXTERNAL MODULE: external "honey-ui/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(5);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "honey-ui/lib/tree"
var tree_ = __webpack_require__(48);
var tree_default = /*#__PURE__*/__webpack_require__.n(tree_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/popper/src/popper-dropdown.vue?vue&type=script&lang=js&
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




/* harmony default export */ var popper_dropdownvue_type_script_lang_js_ = ({
  name: 'ElPopperDropdown',

  componentName: 'ElPopperDropdown',

  components: {
    ElTree: tree_default.a
  },

  mixins: [vue_popper_default.a],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default: function _default() {
        return {
          gpuAcceleration: false
        };
      }
    },

    visibleArrow: {
      default: false
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      minWidth: ''
    };
  },


  computed: {
    popperClass: function popperClass() {
      return this.$parent.popperClass;
    }
  },

  watch: {
    '$parent.inputWidth': function $parentInputWidth() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },

  mounted: function mounted() {
    var _this = this;

    // eslint-disabled-next-line no-debugger
    // debugger;
    this.referenceElm = this.$parent.$refs.reference /* .$el*/;
    // eslint-disable-next-line no-multi-assign
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', function () {
      if (_this.$parent.visible) _this.updatePopper();
    });
    '';
    this.$on('destroyPopper', this.destroyPopper);
  }
});
// CONCATENATED MODULE: ./packages/popper/src/popper-dropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_popper_dropdownvue_type_script_lang_js_ = (popper_dropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/popper/src/popper-dropdown.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_popper_dropdownvue_type_script_lang_js_,
  popper_dropdownvue_type_template_id_016f7570_render,
  popper_dropdownvue_type_template_id_016f7570_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/popper/src/popper-dropdown.vue"
/* harmony default export */ var popper_dropdown = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/popper/src/popper.vue?vue&type=script&lang=js&
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








/* harmony default export */ var poppervue_type_script_lang_js_ = ({
  mixins: [emitter_default.a, locale_default.a, focus_default()('reference')],
  name: 'ElPopper',

  componentName: 'ElPopper',

  components: { ElPopperDropdown: popper_dropdown },

  directives: { Clickoutside: clickoutside_default.a },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: function _default() {
        return Object(lib_locale_["t"])('el.select.placeholder');
      }
    },
    enableArrow: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    showClose: function showClose() {
      return this.clearable && !this.selectDisabled && this.inputHovering;
    },
    selectDisabled: function selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    visible: function visible(val) {
      if (!val) {
        // 隐藏
        this.broadcast('ElPopperDropdown', 'destroyPopper');
      } else {
        // 显示
        this.broadcast('ElPopperDropdown', 'updatePopper');
      }
    }
  },

  data: function data() {
    return {
      selected: [],
      inputHovering: false,
      visible: false
    };
  },


  methods: {
    doDestroy: function doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    toggleMenu: function toggleMenu() {
      if (!this.selectDisabled) {
        this.visible = !this.visible;
        if (this.visible) {
          this.$emit('on-dropdown');
        }
      }
    },
    handleClose: function handleClose() {
      this.visible = false;
    },
    handleClearClick: function handleClearClick() {
      this.$emit('on-clear-click');
    }
  }
});
// CONCATENATED MODULE: ./packages/popper/src/popper.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_poppervue_type_script_lang_js_ = (poppervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/popper/src/popper.vue





/* normalize component */

var popper_component = Object(componentNormalizer["a" /* default */])(
  src_poppervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var popper_api; }
popper_component.options.__file = "packages/popper/src/popper.vue"
/* harmony default export */ var popper = (popper_component.exports);
// CONCATENATED MODULE: ./packages/popper/index.js


/* istanbul ignore next */
popper.install = function (Vue) {
  Vue.component(popper.name, popper);
};

/* harmony default export */ var packages_popper = __webpack_exports__["default"] = (popper);

/***/ })

/******/ });