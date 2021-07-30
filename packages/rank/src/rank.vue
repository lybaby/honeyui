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
          <el-tab-pane v-for="(item, tabIndex) in tablist" :key="item[tabName]" :label="item[tabLabel]" :name="item[tabName]" :disabled="tabIndex > strArr.length">
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
      this.$emit('change', v, this.selectedItemSelf);
    },
    selectedItemSelf: {
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
      selectedItemSelf: this.selectedItem,
      showPanel: false,
      inputValue: this.value,
      strArr: [],
      itemIdArr: [],
      selectedTabVal: this.selectedTab || this.tablist[0][this.tabName],
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
      const item = this.selectedItemSelf[this.selectedTabIndex];
      const target = item && this.$refs[`item-${item[this.idName]}`] && this.$refs[`item-${item[this.idName]}`][0];
      if (this.$refs.scrollContent && target) {
        const menu = this.$refs.scrollContent[this.selectedTabIndex];
        scrollIntoView(menu, target);
      }
    },
    tabClick(item) {
      this.selectedTabVal = item.name;
      this.selectedTabIndex = Number(item.index);
      if (this.selectedItemSelf.length) {
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
      this.selectedItemSelf[tabIndex] = {
        [this.idName]: item[this.idName],
        [this.label]: item[this.label]
      };
      this.inputValue = this.strArr.join('/');
      this.$emit('click-item', item, index);
    }
  }
};
</script>
