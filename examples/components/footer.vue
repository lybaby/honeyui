<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">

      </div>
      <div class="footer-main">

      </div>
      <div class="footer-social">

      </div>
    </div>
  </footer>
</template>

<style lang="scss">
  
</style>

<script type="text/babel">
  import compoLang from '../i18n/component.json';
  import Element from 'main/index.js';
  const { version } = Element;

  export default {
    data() {
      return {
        version
      };
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },

      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['footer'];
      },

      gitterLink() {
        return this.lang === 'zh-CN' ? 'https://gitter.im/ElemeFE/element' : 'https://gitter.im/element-en/Lobby';
      }
    }
  };
</script>
