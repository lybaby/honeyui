<template>
  <div class="tea-popper" @click.stop="toggleMenu" v-clickoutside="handleClose">
    <div class="tea-dropdown" :class="{ 'is-disabled': selectDisabled }" :style="full ? { width: '100%' } : {}">
      <div
        class="tea-dropdown__header"
        :class="{ 'tea-dropdown-btn': border, 'no-arrow': !showClose && !enableArrow }"
        ref="reference"
        @mouseenter="inputHovering = true"
        @mouseleave="inputHovering = false"
      >
        <div class="tea-dropdown__value">
          <slot name="value">
            {{ placeholder }}
          </slot>
        </div>
        <i v-if="showClose" class="tea-icon tea-icon-dismiss size-s" @click="handleClearClick" />
        <template v-else>
          <i type="arrowdown" v-if="enableArrow" class="tea-icon tea-icon-arrowdown"></i>
        </template>
      </div>
    </div>
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <el-popper-dropdown ref="popper" v-show="visible">
        <slot name="popper" />
      </el-popper-dropdown>
    </transition>
  </div>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';
import Focus from 'element-ui/src/mixins/focus';
import Locale from 'element-ui/src/mixins/locale';
import { t } from 'element-ui/src/locale';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import ElPopperDropdown from './popper-dropdown.vue';

export default {
  mixins: [Emitter, Locale, Focus('reference')],
  name: 'ElPopper',

  componentName: 'ElPopper',

  components: { ElPopperDropdown },

  directives: { Clickoutside },

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
      default() {
        return t('el.select.placeholder');
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
    showClose() {
      return this.clearable && !this.selectDisabled && this.inputHovering;
    },

    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        // 隐藏
        this.broadcast('ElPopperDropdown', 'destroyPopper');
      } else {
        // 显示
        this.broadcast('ElPopperDropdown', 'updatePopper');
      }
    }
  },

  data() {
    return {
      selected: [],
      inputHovering: false,
      visible: false
    };
  },

  methods: {
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    toggleMenu() {
      if (!this.selectDisabled) {
        this.visible = !this.visible;
        if (this.visible) {
          this.$emit('on-dropdown');
        }
      }
    },
    handleClose() {
      this.visible = false;
    },
    handleClearClick() {
      this.$emit('on-clear-click');
    }
  }
};
</script>
