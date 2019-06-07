<template>
  <li
    role="menuitem"
    tabindex="-1"
    :style="[itemStyle, { backgroundColor }]"
    :class="{
      'is-selected': active,
      'is-disabled': disabled,
    }"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <el-tooltip
      v-if="parentMenu.$options.componentName === 'ElMenu' && rootMenu.collapse && $slots.title"
      effect="dark"
      placement="right">
      <div slot="content"><slot name="title"></slot></div>
    </el-tooltip>
    <template v-else>
      <a class="tea-menu__item">
        <div class="tea-menu__text"><slot name="title"></slot></div>
      </a>
    </template>
  </li>
</template>
<script>
  import Menu from './menu-mixin';
  import ElTooltip from 'element-ui/packages/tooltip';
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElMenuTeaItem',

    componentName: 'ElMenuTeaItem',

    mixins: [Menu, Emitter],

    components: { ElTooltip },

    props: {
      index: {
        default: null,
        validator: val => typeof val === 'string' || val === null
      },
      route: [String, Object],
      disabled: Boolean
    },
    computed: {
      active() {
        return this.index === this.rootMenu.activeIndex;
      },
      hoverBackground() {
        return this.rootMenu.hoverBackground;
      },
      backgroundColor() {
        return this.rootMenu.backgroundColor || '';
      },
      activeTextColor() {
        return this.rootMenu.activeTextColor || '';
      },
      textColor() {
        return this.rootMenu.textColor || '';
      },
      mode() {
        return this.rootMenu.mode;
      },
      itemStyle() {
        const style = {
          color: this.active ? this.activeTextColor : this.textColor
        };
        if (this.mode === 'horizontal' && !this.isNested) {
          style.borderBottomColor = this.active
            ? (this.rootMenu.activeTextColor ? this.activeTextColor : '')
            : 'transparent';
        }
        return style;
      },
      isNested() {
        return this.parentMenu !== this.rootMenu;
      }
    },
    methods: {
      onMouseEnter() {
        if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
        this.$el.style.backgroundColor = this.hoverBackground;
      },
      onMouseLeave() {
        if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
        this.$el.style.backgroundColor = this.backgroundColor;
      },
      handleClick() {
        if (!this.disabled) {
          this.dispatch('ElMenuTea', 'item-click', this);
          this.$emit('click', this);
        }
      }
    },
    mounted() {
      this.parentMenu.addItem(this);
      this.rootMenu.addItem(this);
    },
    beforeDestroy() {
      this.parentMenu.removeItem(this);
      this.rootMenu.removeItem(this);
    }
  };
</script>
