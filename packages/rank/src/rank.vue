<template>
  <div class="tea-custom-rank" v-clickoutside="handleClickOutside">
    <el-input
      :value="inputValue"
      readonly
      type="text"
      @click.native="handleShowPanel"
      placeholder="请选择"
      class="rank-input"
      :class="{'tea-input-disabled': disabled}">
      <template slot="append">
        <i v-show="!showPanel" class="select-icon tea-icon tea-icon-arrowdown"></i>
        <i v-show="showPanel" class="select-icon tea-icon tea-icon-arrowup"></i>
      </template>
    </el-input>
    <transition name="el-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="handleDropdownLeave">
      <div class="rank-panel__wrap" v-show="showPanel" ref="popper">
        <el-tabs v-model="selectedTabVal" @tab-click="tabClick">
          <el-tab-pane v-for="(item, tabIndex) in tablist" :key="item.id || tabIndex" :label="item[tabLabel]" :name="item[tabName]" :disabled="tabIndex > strArr.length">
            <el-scrollbar class="data-scrollbar" ref="scrollbar">
              <div class="scroll-content" ref="scrollContent" v-if="data && data.length">
                <span v-for="(item, index) in data" :key="index" :ref="`item-${item[idName]}`" @click="handleClickItem(item, index)" class="content-item" :class="{'hidden-text': tooltip, ...itemClass, 'selected-item': itemIdArr[tabIndex] !== undefined && itemIdArr[tabIndex] === item[idName]}">
                  <el-tooltip class="item" effect="dark" :content="item[label]" :disabled="item[label] && item[label].length < 6" v-if="tooltip">
                    <span>{{item[label]}}</span>
                  </el-tooltip>
                  <span v-else>
                    {{item[label]}}
                  </span>
                </span>
              </div>
              <div v-else class="no-data">暂无数据</div>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
import Clickoutside from 'element-ui/src/utils/clickoutside';
import ElInput from 'element-ui/packages/input';
import ElTooltip from 'element-ui/packages/tooltip';
import ElScrollbar from 'element-ui/packages/scrollbar';
import scrollIntoView from 'element-ui/src/utils/scroll-into-view';

export default {
  name: 'ElRank',
  componentName: 'ElRank',
  components: {
    ElInput,
    ElTooltip,
    ElScrollbar
  },
  directives: { Clickoutside },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    itemClass: {
      type: Object,
      default: () => {}
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    tablist: {
      type: Array,
      default: () => [{
        label: '',
        name: ''
      }]
    },
    tabLabel: {
      type: String,
      default: 'label'
    },
    tabName: {
      type: String,
      default: 'name'
    },
    selectedTab: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'label'
    },
    idName: {
      type: String,
      default: 'id'
    },
    selectedItem: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    inputValue(v) {
      this.$emit('change', v, this.itemIdArr);
    },
    selectedItem: {
      handler(v) {
        if (v && v.length) {
          v.forEach((val, idx) => {
            this.strArr[idx] = val[this.label];
            this.itemIdArr[idx] = val[this.idName];
          });
          this.inputValue = this.strArr.join('/');
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      showPanel: false,
      inputValue: this.value,
      strArr: [],
      itemIdArr: [],
      selectedTabVal: this.selectedTab || 0,
      selectedTabIndex: 0
    };
  },
  methods: {
    handleShowPanel() {
      if (this.disabled) {
        return;
      }
      this.showPanel = !this.showPanel;
    },
    handleClickOutside() {
      this.showPanel = false;
    },
    handleDropdownLeave() {
      this.showPanel = false;
    },
    handleMenuEnter() {
      this.$nextTick(() => this.scrollToItem());
    },
    scrollToItem() {
      const item = this.selectedItem[this.selectedTabIndex];
      const target = this.$refs[`item-${item[this.idName]}`] && this.$refs[`item-${item[this.idName]}`][0];
      if (this.$refs.scrollContent && target) {
        const menu = this.$refs.scrollContent[this.selectedTabIndex];
        scrollIntoView(menu, target);
      }
    },
    tabClick(item) {
      this.selectedTabVal = item.name;
      this.selectedTabIndex = Number(item.index);
      if (this.selectedItem.length) {
        this.handleMenuEnter();
      }
      this.$emit('click-tab', item);
    },
    handleClickItem(item, index) {
      let tabLen = this.tablist.length;
      let tabIndex = this.selectedTabIndex;
      if (tabIndex >= tabLen - 1) {
        this.showPanel = false;
        this.selectedTabIndex = tabLen - 1;
      } else {
        this.selectedTabIndex++;
        this.selectedTabVal = this.tablist[this.selectedTabIndex].name;
        this.strArr.splice(tabIndex, tabLen - tabIndex + 1);
        this.itemIdArr.splice(tabIndex, tabLen - tabIndex + 1);
      }
      this.strArr[tabIndex] = item[this.label];
      this.itemIdArr[tabIndex] = item[this.idName];
      this.inputValue = this.strArr.join('/');
      this.$emit('click-item', item, index);
    }
  }
};
</script>

<style scoped lang="scss">
.tea-custom-rank {
  position: relative;
  display: inline-block;
  .rank-input {
    width: 300px;
    ::v-deep.tea-input {
      width: 300px;
      background-color: #fff;
      cursor: pointer;
    }
    .select-icon {
      position: absolute;
      top: -8px;
      right: 6px;
      z-index: 19999;
      cursor: pointer;
    }
  }
  .tea-input-disabled {
    ::v-deep.tea-input {
      background: #f2f2f2;
      color: #bbb;
      cursor: not-allowed;
    }
    .select-icon {
      cursor: not-allowed;
    }
  }
  .rank-panel__wrap {
    border: 1px solid #ddd;
    margin-top: 10px;
    position: absolute;
    top: 30px;
    z-index: 99;
    background: #fff;
    min-width: 350px;
    min-height: 100px;
    .scroll-content {
      padding: 0 12px;
      .content-item {
        display: inline-block;
        padding: 4px 8px;
        cursor: pointer;
      }
      .hidden-text {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .selected-item {
        color: #006eff;
      }
    }
    .no-data {
      text-align: center;
      color: #ccc;
      font-size: 14px;
      line-height: 40px;
    }
    .data-scrollbar {
      height: 150px; 
      width: 350px;
    }
  }
}
</style>