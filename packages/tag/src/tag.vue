<script>
  export default {
    name: 'ElTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: {
        type: Boolean,
        default: true
      },
      color: String,
      size: String,
      effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].includes(val);
        }
      }
    },
    methods: {
      handleClose(event) {
        event.stopPropagation();
        this.$emit('close', event);
      },
      handleClick(event) {
        this.$emit('click', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    },
    render(h) {
      const { type, /* tagSize, */hit, effect, closable } = this;
      const classes = [
        'tea-tag',
        type ? `el-tag--${type}` : '',
        // tagSize ? `el-tag--${tagSize}` : '',
        effect ? `el-tag--${effect}` : '',
        hit && 'is-hit',
        closable ? 'tea-tag--edit' : ''
      ];
      const tagEl = (
        <div
          class={ classes }
          style={{ backgroundColor: this.color }}
          on-click={ this.handleClick }>
          <span>{ this.$slots.default }</span>

          {
            this.closable && <a href="#" type="close" class="tea-icon tea-icon-dismiss" on-click={ this.handleClose }></a>
          }
        </div>
      );

      return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
    }
  };
</script>
