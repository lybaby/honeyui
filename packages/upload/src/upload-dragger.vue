<template>
  <div
    class="tea-form-upload-drag"
    :class="{
      ' tea-form-upload-drag--drag': dragover
    }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <div class="tea-form-upload__inner" v-if="!$slots.default">
      <!-- <slot></slot> -->
      <p class="tea-text tea-text__upload-drag">
        <a href="#" class="tea-btn tea-btn--link tea-btn--file">
          <span>点击上传</span>
        </a>
        <span class="tea-text-weak">/ 拖拽到此区域</span></p>
      <p class="tea-text tea-text__upload-drag tea-text__upload-drag--hover">释放鼠标</p>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    name: 'ElUploadDrag',
    props: {
      disabled: Boolean
    },
    inject: {
      uploader: {
        default: ''
      }
    },
    data() {
      return {
        dragover: false
      };
    },
    methods: {
      onDragover() {
        if (!this.disabled) {
          this.dragover = true;
        }
      },
      onDrop(e) {
        if (this.disabled || !this.uploader) return;
        const accept = this.uploader.accept;
        this.dragover = false;
        if (!accept) {
          this.$emit('file', e.dataTransfer.files);
          return;
        }
        this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
          const { type, name } = file;
          const extension = name.indexOf('.') > -1
            ? `.${ name.split('.').pop() }`
            : '';
          const baseType = type.replace(/\/.*$/, '');
          return accept.split(',')
            .map(type => type.trim())
            .filter(type => type)
            .some(acceptedType => {
              if (/\..+$/.test(acceptedType)) {
                return extension === acceptedType;
              }
              if (/\/\*$/.test(acceptedType)) {
                return baseType === acceptedType.replace(/\/\*$/, '');
              }
              if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                return type === acceptedType;
              }
              return false;
            });
        }));
      }
    }
  };
</script>

