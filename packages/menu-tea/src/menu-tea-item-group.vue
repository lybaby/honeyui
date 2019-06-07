<template>
  <li class="tea-menu__submenu">
    <a class="tea-menu__item">
      <img class="tea-menu__list-icon" src="https://via.placeholder.com/16.png?text=icon">
      <img class="tea-menu__list-icon is-selected" src="https://via.placeholder.com/16/006eff/444444">
      <div class="tea-menu__text">
        <template v-if="!$slots.title">{{title}}</template>
        <slot v-else name="title"></slot>
      </div>
    </a>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'ElMenuTeaItemGroup',

    componentName: 'ElMenuTeaItemGroup',

    inject: ['rootMenu'],
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        paddingLeft: 20
      };
    },
    computed: {
      levelPadding() {
        let padding = 20;
        let parent = this.$parent;
        if (this.rootMenu.collapse) return 20;
        while (parent && parent.$options.componentName !== 'ElMenuTea') {
          if (parent.$options.componentName === 'ElSubmenuTea') {
            padding += 20;
          }
          parent = parent.$parent;
        }
        return padding;
      }
    }
  };
</script>

