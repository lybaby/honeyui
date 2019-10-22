<template>
  <i :class="'tea-icon-' + name" class="tea-icon"></i>
</template>

<script>
  export default {
    name: 'ElIcon',

    props: {
      name: String
    }
  };
</script>
