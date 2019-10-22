<template>
  <div
    class="tea-step__item"
    :style="style"
    :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center',
      currentActive ? 'is-current' : ''
     ]">
    <!-- icon & line -->
    <div
      class="tea-step__num"
      :class="`is-${currentStatus}`">
    </div>
    <!-- title & description -->
    <div class="tea-step__content">
      <div
        class="tea-step__title"
        ref="title"
        :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="isDotStyle" class="tea-step__description">
        <div v-html="description"></div>
      </div>
    </div>

    <!-- tips -->
    <div v-if="isAlternativeStyle" class="tea-step__tips">
      <slot name="tips">{{ tips }}</slot>
    </div>

    <!-- arrow -->
    <div v-if="!isLast" class="tea-step__arrow"></div>
  </div>
</template>

<script>
export default {
  name: 'ElStep',

  props: {
    title: String,
    icon: String,
    description: String,
    status: String,
    tips: String
  },

  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: ''
    };
  },

  beforeCreate() {
    this.$parent.steps.push(this);
  },

  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },

  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : 'wait';
    },
    isCenter() {
      return this.$parent.alignCenter;
    },
    isVertical() {
      return this.$parent.direction === 'vertical';
    },
    isSimple() {
      return this.$parent.simple;
    },
    isLast() {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    },
    stepsCount() {
      return this.$parent.steps.length;
    },
    space() {
      const { isSimple, $parent: { space } } = this;
      return isSimple ? '' : space ;
    },
    style: function() {
      const style = {};
      const parent = this.$parent;
      const len = parent.steps.length;

      const space = (typeof this.space === 'number'
        ? this.space + 'px'
        : this.space
          ? this.space
          : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
      style.flexBasis = space;
      if (this.isVertical) return style;
      if (this.isLast) {
        style.maxWidth = 100 / this.stepsCount + '%';
      } else {
        style.marginRight = -this.$parent.stepOffset + 'px';
      }

      return style;
    },

    isDotStyle() {
      return this.$parent.lineStyle === 'dot';
    },

    isAlternativeStyle() {
      return this.$parent.lineStyle === 'alternative';
    },
    currentActive() {
      return this.$parent.active === this.index;
    }
  },

  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1];

      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== 'error') {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = 'wait';
      }

      if (prevChild) prevChild.calcProgress(this.internalStatus);
    },

    calcProgress(status) {
      let step = 100;
      const style = {};

      style.transitionDelay = 150 * this.index + 'ms';
      if (status === this.$parent.processStatus) {
        step = this.currentStatus !== 'error' ? 0 : 0;
      } else if (status === 'wait') {
        step = 0;
        style.transitionDelay = (-150 * this.index) + 'ms';
      }

      style.borderWidth = step && !this.isSimple ? '1px' : 0;
      this.$parent.direction === 'vertical'
        ? style.height = step + '%'
        : style.width = step + '%';

      this.lineStyle = style;
    }
  },

  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      this.$watch('$parent.processStatus', () => {
        const activeIndex = this.$parent.active;
        this.updateStatus(activeIndex);
      }, { immediate: true });
      unwatch();
    });
  }
};
</script>
