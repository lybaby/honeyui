<template>
  <div
    class="tea-dropdown-box el-popper"
    :class="[popperClass]"
    :style="{ minWidth: minWidth, position: 'absolute', zIndex: 1001 }"
  >
    <slot />
  </div>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper';
import ElTree from 'element-ui/packages/tree';

export default {
  name: 'ElPopperDropdown',

  componentName: 'ElPopperDropdown',

  components: {
    ElTree
  },

  mixins: [Popper],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default() {
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

  data() {
    return {
      minWidth: ''
    };
  },

  computed: {
    popperClass() {
      return this.$parent.popperClass;
    }
  },

  watch: {
    '$parent.inputWidth'() {
      this.minWidth = `${this.$parent.$el.getBoundingClientRect().width}px`;
    }
  },

  mounted() {
    // eslint-disabled-next-line no-debugger
    // debugger;
    this.referenceElm = this.$parent.$refs.reference /* .$el*/;
    // eslint-disable-next-line no-multi-assign
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper();
    });
    ('');
    this.$on('destroyPopper', this.destroyPopper);
  }
};
</script>
