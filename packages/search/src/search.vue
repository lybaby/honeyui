<template>
  <div class="tea-form--search">
    <div data-role="qc-search"
         class="tea-search"
         :class="{'tea-search--multi': multiple }">
      <div class="tea-search__inner">
        <input v-if="!multiple"
               class="tea-input tea-input--search"
               :placeholder="placeholder"
               :value="innerValue"
               @input="handleInput"
               @keyup="handleKeyUp"/>
        <textarea v-if="multiple"
                  class="tea-input tea-input--search"
                  :placeholder="placeholder"
                  :value="innerValue"
                  @input="handleInput"></textarea>
      </div>
      <button
              type="button"
              class="tea-btn tea-btn--icon tea-btn--dismiss"
              @click="handleClear"
              v-if="needClearIcon"
              v-show="innerValue">
        <i type="dismiss" class="tea-icon tea-icon-dismiss"></i>
      </button>
      <button type="button" class="tea-btn tea-btn--icon tea-btn--search"  @click="handleSearch">
        <i class="tea-icon tea-icon-search"></i>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
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
    data() {
      return {
        innerValue: this.value
      };
    },
    watch: {
      value(val) {
        this.innerValue = val;
      }
    },
    methods: {
      // 搜索事件
      handleSearch() {
        this.$emit('input', this.innerValue);
        this.$emit('on-search', this.innerValue);
      },
      /**
       * 清除输入事件
       */
      handleClear() {
        this.innerValue = '';
        this.handleSearch();
      },
      /**
       * 输入事件处理
       * @param e
       */
      handleInput(e) {
        let value = e.target.value;
        if (this.trim) {
          value = value.trim();
        }
        // 等待输入结果
        setTimeout(()=>{
          if (value === this.innerValue) {
            this.$emit('input', this.innerValue);
          }
        }, 500);

        this.innerValue = value;

      },
      /**
       * 键盘keyup事件处理
       * @param e
       */
      handleKeyUp(e) {
        let value = e.target.value;
        if (this.trim) {
          value = value.trim();
        }
        this.innerValue = value;

        if (e.keyCode === 13 && this.needEnterTrigger) {
          this.handleSearch();
        }
      }
    }
  };
</script>
