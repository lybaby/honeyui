<template>
  <el-popper class="select-tree-popper" border full>
    <div class="value" slot="value">
      <span v-if="showPlaceholder">{{ placeholder }}</span>
      <span v-if="selectAllText && selectAll">{{ selectAllText }}</span>
      <transition-group
        v-show="!showPlaceholder && !(selectAll && selectAllText)"
        tag="div"
        class="tag-group"
        name="fade"
      >
        <template v-for="tag in selected">
          <el-tag
            :key="tag.id"
            v-if="filterTagMethod ? filterTagMethod(tag) : true"
            closable
            @close="handleTagClose(tag)"
          >
            {{ tag.label }}
          </el-tag>
        </template>
      </transition-group>
    </div>
    <div
      class="select-tree-dropdown"
      :class="popperClass"
      slot="popper"
      v-loading="isLoading"
      el-loading-text="数据加载中"
    >
      <div class="search-container" v-if="filterable">
        <el-input v-model="searchText" class="input" :placeholder="searchPlaceholder"> </el-input>
        <i slot="append" class="icon tea-icon tea-icon-search" />
      </div>
      <el-tree
        ref="tree"
        :data="treeData"
        :node-key="treeNodeKey"
        show-checkbox
        :filter-node-method="filterNode"
        @check-change="handleNodeClick"
        v-bind="treeProps"
      />
    </div>
  </el-popper>
</template>

<script>
import ElTag from 'element-ui/packages/tag';
import ElPopper from 'element-ui/packages/popper';
import ElInput from 'element-ui/packages/input';
import ElTree from 'element-ui/packages/tree';

export default {
  name: 'ElSelectTree',

  componentName: 'ElSelectTree',

  components: {
    ElTag,
    ElPopper,
    ElInput,
    ElTree
  },

  props: {
    // 是否正在加载中
    isLoading: {
      type: Boolean,
      default: false
    },
    // 选择框默认的占位文字
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 搜索框占位文字
    searchPlaceholder: {
      type: String,
      default: '请输入关键字'
    },
    // 全选时的文字提示
    selectAllText: {
      type: String,
      default: ''
    },
    treeData: {
      type: Array,
      default: () => []
    },
    treeNodeKey: {
      type: String,
      default: 'id'
    },
    // tree透传属性
    treeProps: {
      type: Object,
      default: () => ({})
    },
    // tag 显示属性
    filterTagMethod: {
      type: Function,
      default: null
    },
    // 用以 v-model 传值
    value: {
      type: Array,
      default: () => []
    },
    // 是否开启搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // popper透传class
    popperClass: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      selected: [],
      searchText: '',
      selectAll: false
    };
  },
  watch: {
    value(val) {
      if (!this.isLoading) {
        this.setValue(val);
      }
    },
    searchText(val) {
      this.$refs.tree.filter(val);
    },
    selected(val) {
      let all = false;
      val.forEach((node) => {
        if (node.id === 'system-select-all') {
          all = true;
        }
      });
      this.selectAll = all;
    }
  },
  computed: {
    showPlaceholder() {
      return this.selected.length === 0;
    },
    hideNodeMap() {
      const map = {};
      const findChildNode = (arr) => {
        arr.forEach((node) => {
          if (node.children) {
            node.children.forEach((child) => {
              map[child.id] = child;
              if (child.children) {
                findChildNode(child.children);
              }
            });
          }
        });
      };
      findChildNode(this.selected);
      return map;
    }
  },
  methods: {
    setValue(val) {
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(val || []);
        this.syncSelected();
      }
    },
    // tree组件checkbox点击回调
    syncSelected() {
      if (this.$refs.tree) {
        this.selected = this.$refs.tree.getCheckedNodes();
      }
    },

    // 节点点击回调，用以v-model传值
    handleNodeClick() {
      this.syncSelected();
      if (this.$refs.tree) {
        const codeArr = this.selected.map((item) => item.id);
        this.$emit('input', codeArr);
        this.$emit('node-select-change', [...this.selected]);
      }
    },

    handleTagClose(tag) {
      this.$refs.tree.setChecked(tag.id, false, true);
      this.handleNodeClick();
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>
