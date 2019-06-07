<template>
  <div class="tea-card">
    <div class="tea-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="tea-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
    <div class="tea-card__footer" v-if="$slots.footer || footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElCard',
    props: {
      header: {},
      footer: {},
      bodyStyle: {},
      shadow: {
        type: String
      }
    }
  };
</script>
