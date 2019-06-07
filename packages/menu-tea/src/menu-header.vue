<template>
  <div class="tea-menu__header">
    <div class="tea-menu__title">
      <img class="tea-menu__title-icon" src="https://via.placeholder.com/32.png?text=icon">
      <h2 class="tea-h2">
        {{title}}
        <div class="tea-tag">
          <span>{{subTitle}}</span>
          <a herf="#" class="tea-icon tea-icon-dismiss"></a>
        </div>
      </h2>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ElMenuHeader',

    componentName: 'ElMenuHeader',

    props: {
      title: String,
      subTitle: String
    }
  };
</script>
