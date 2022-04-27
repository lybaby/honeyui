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
/******/ 	return __webpack_require__(__webpack_require__.s = 133);
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

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-tree/src/select-tree.vue?vue&type=template&id=606ff750&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-popper",
    { staticClass: "select-tree-popper", attrs: { border: "", full: "" } },
    [
      _c(
        "div",
        { staticClass: "value", attrs: { slot: "value" }, slot: "value" },
        [
          _vm.showPlaceholder
            ? _c("span", [_vm._v(_vm._s(_vm.placeholder))])
            : _vm._e(),
          _vm.selectAllText && _vm.selectAll
            ? _c("span", [_vm._v(_vm._s(_vm.selectAllText))])
            : _vm._e(),
          _c(
            "transition-group",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value:
                    !_vm.showPlaceholder &&
                    !(_vm.selectAll && _vm.selectAllText),
                  expression:
                    "!showPlaceholder && !(selectAll && selectAllText)",
                },
              ],
              staticClass: "tag-group",
              attrs: { tag: "div" },
            },
            [
              _vm._l(_vm.selected, function (tag) {
                return [
                  (_vm.filterTagMethod ? _vm.filterTagMethod(tag) : true)
                    ? _c(
                        "el-tag",
                        {
                          key: tag.id,
                          attrs: { closable: "" },
                          on: {
                            close: function ($event) {
                              _vm.handleTagClose(tag)
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n          " + _vm._s(tag.label) + "\n        "
                          ),
                        ]
                      )
                    : _vm._e(),
                ]
              }),
            ],
            2
          ),
        ],
        1
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.isLoading,
              expression: "isLoading",
            },
          ],
          staticClass: "select-tree-dropdown",
          class: _vm.popperClass,
          attrs: { slot: "popper", "el-loading-text": "数据加载中" },
          slot: "popper",
        },
        [
          _vm.filterable
            ? _c(
                "el-input",
                {
                  staticClass: "input",
                  attrs: { placeholder: _vm.searchPlaceholder },
                  model: {
                    value: _vm.searchText,
                    callback: function ($$v) {
                      _vm.searchText = $$v
                    },
                    expression: "searchText",
                  },
                },
                [
                  _c("i", {
                    staticClass: "tea-icon tea-icon-search",
                    attrs: { slot: "append" },
                    slot: "append",
                  }),
                ]
              )
            : _vm._e(),
          _c(
            "el-tree",
            _vm._b(
              {
                ref: "tree",
                attrs: {
                  data: _vm.treeData,
                  "node-key": _vm.treeNodeKey,
                  "show-checkbox": "",
                  "filter-node-method": _vm.filterNode,
                },
                on: { "check-change": _vm.handleNodeClick },
              },
              "el-tree",
              _vm.treeProps,
              false
            )
          ),
        ],
        1
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/select-tree/src/select-tree.vue?vue&type=template&id=606ff750&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-tree/src/select-tree.vue?vue&type=script&lang=js&
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
//
//
//
//
//
//
//
//
//

/* harmony default export */ var select_treevue_type_script_lang_js_ = ({
  name: 'ElSelectTree',

  componentName: 'ElSelectTree',

  props: {
    // 是否正在加载中
    isLoading: {
      type: Boolean,
      default: false
    },
    // 选择框默认的占位文字
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 搜索框占位文字
    searchPlaceholder: {
      type: String,
      default: '请输入关键字'
    },
    // 全选时的文字提示
    selectAllText: {
      type: String,
      default: ''
    },
    treeData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    treeNodeKey: {
      type: String,
      default: 'id'
    },
    // tree透传属性
    treeProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    // tag 显示属性
    filterTagMethod: {
      type: Function,
      default: null
    },
    // 用以 v-model 传值
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 是否开启搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // popper透传class
    popperClass: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },

  data: function data() {
    return {
      selected: [],
      searchText: '',
      selectAll: false
    };
  },

  watch: {
    value: function value(val) {
      if (!this.isLoading) {
        this.setValue(val);
      }
    },
    searchText: function searchText(val) {
      this.$refs.tree.filter(val);
    },
    selected: function selected(val) {
      var all = false;
      val.forEach(function (node) {
        if (node.id === 'system-select-all') {
          all = true;
        }
      });
      this.selectAll = all;
    }
  },
  computed: {
    showPlaceholder: function showPlaceholder() {
      return this.selected.length === 0;
    },
    hideNodeMap: function hideNodeMap() {
      var map = {};
      var findChildNode = function findChildNode(arr) {
        arr.forEach(function (node) {
          if (node.children) {
            node.children.forEach(function (child) {
              map[child.id] = child;
              if (child.children) {
                findChildNode(child.children);
              }
            });
          }
        });
      };
      findChildNode(this.selected);
      return map;
    }
  },
  methods: {
    setValue: function setValue(val) {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(val || []);
        this.syncSelected();
      }
    },

    // tree组件checkbox点击回调
    syncSelected: function syncSelected() {
      if (this.$refs.tree) {
        this.selected = this.$refs.tree.getCheckedNodes();
      }
    },


    // 节点点击回调，用以v-model传值
    handleNodeClick: function handleNodeClick() {
      this.syncSelected();
      if (this.$refs.tree) {
        var codeArr = this.selected.map(function (item) {
          return item.id;
        });
        this.$emit('input', codeArr);
        this.$emit('node-select-change', [].concat(this.selected));
      }
    },
    handleTagClose: function handleTagClose(tag) {
      this.$refs.tree.setChecked(tag.id, false, true);
      this.handleNodeClick();
    },
    filterNode: function filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
});
// CONCATENATED MODULE: ./packages/select-tree/src/select-tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_treevue_type_script_lang_js_ = (select_treevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/select-tree/src/select-tree.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_select_treevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/select-tree/src/select-tree.vue"
/* harmony default export */ var select_tree = (component.exports);
// CONCATENATED MODULE: ./packages/select-tree/index.js


/* istanbul ignore next */
select_tree.install = function (Vue) {
  Vue.component(select_tree.name, select_tree);
};

/* harmony default export */ var packages_select_tree = __webpack_exports__["default"] = (select_tree);

/***/ })

/******/ });