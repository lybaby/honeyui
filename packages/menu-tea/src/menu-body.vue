<template>
  <div class="tea-menu__body">
    <slot></slot>
  </div>
</template>
<script>
  import Menu from './menu-mixin';
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElMenuBody',

    componentName: 'ElMenuBody',

    mixins: [Menu, Emitter],

    props: {
    }
  };
</script>
