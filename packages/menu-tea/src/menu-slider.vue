<template>
    <div class="tea-sidebar">
      <div class="tea-menu">
        <slot></slot>
      </div>
    </div>
</template>
<script>
  import Menu from './menu-mixin';
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElMenuSlider',

    componentName: 'ElMenuSlider',

    mixins: [Menu, Emitter],

    props: {
    }
  };
</script>
