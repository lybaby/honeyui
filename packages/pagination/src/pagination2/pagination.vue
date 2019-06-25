<template>
  <div class="tea-pagination">
    <div class="tea-pagination__state">
      <span class="tea-pagination__text">
        共
        <strong>{{total}}</strong>项
      </span>
    </div>
    <div class="tea-pagination__operate">
      <!--if start-->
      <span class="tea-pagination__text">每页显示行</span>
      <el-select v-model="internalPagerCount" placeholder="请选择" type="pagination">
        <el-option
          v-for="item in pageSizes"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <a title="第一页"
        class="tea-pagination__turnbtn tea-pagination__firstbtn" 
        :class="{
          'is-disabled': !canGoPrev  
        }"
        @click.stop="gotoFirstPage"
      >
        <i class="tea-icon tea-icon-firstpage"></i>
      </a>
      <a title="上一页"
        class="tea-pagination__turnbtn tea-pagination__prebtn"
        :class="{
          'is-disabled': !canGoPrev  
        }"
        @click.stop="gotoPrevPage"
      >
        <i class="tea-icon tea-icon-arrowleft"></i>
      </a>

      <div class="tea-pagination__manualinput" data-page-select is-disabled="true">
        <input type="text" class="tea-input tea-pagination__inputpagenum" @change="handleChange" v-model.number="internalCurrentPage">
        <span class="tea-pagination__totalpage">/{{pageCount}}页</span>
      </div>
      <a title="下一页" class="tea-pagination__turnbtn tea-pagination__nextbtn"
        :class="{
          'is-disabled': !canGoNext  
        }"
        @click.stop="gotoNextPage"
      >
        <i class="tea-icon tea-icon-arrowright"></i>
      </a>
      <a title="最后一页" class="tea-pagination__turnbtn tea-pagination__lastbtn"
        :class="{
          'is-disabled': !canGoNext  
        }"
        @click.stop="gotoLastPage"
      >
        <i class="tea-icon tea-icon-lastpage"></i>
      </a>
      <!--if end-->
    </div>
    <!--if end-->
  </div>
</template>
<script>
import ElSelect from 'element-ui/packages/select';
import ElOption from 'element-ui/packages/option';

export default {
  name: 'ElPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [50, 40, 30, 20, 10]
    },
    pagerCount: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    // debugger;
    let val = this.currentPage;
    // const pageCount = Math.ceil(this.total / this.pagerCount);
    // if (val < 1) {
    //   val = 1;
    //   this.$emit('update:currentPage', val);
    // }
    // if (val > pageCount) {
    //   val = pageCount;
    //   this.$emit('update:currentPage', val);
    // }
    return {
      internalPagerCount: this.pagerCount,
      internalCurrentPage: val
    };
  },
  components: {
    ElSelect,
    ElOption
  },
  watch: {
    internalPagerCount(val, old) {
      // recalculate currentPage
      // console.log(val, old);
      const cp = parseInt(this.internalCurrentPage, 10);
      const currentItem = (cp - 1) * old + 1;
      this.internalCurrentPage = Math.ceil(currentItem / val);
      this.sizeChange();
      this.pageChange();
    },
    currentPage(val) {
      if (!this.total) {
        return;
      }
      // console.log('cp');
      if (val < 1) {
        val = 1;
        this.$emit('update:currentPage', val);
        return;
      }
      if (val > this.pageCount) {
        val = this.pageCount;
        this.$emit('update:currentPage', val);
        return;
      }
      if (val !== this.internalCurrentPage) {
        this.internalCurrentPage = val;
        this.pageChange();
      }
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.internalPagerCount);
    },
    canGoPrev() {
      const cp = parseInt(this.internalCurrentPage, 10);
      return cp > 1;
    },
    canGoNext() {
      const cp = parseInt(this.internalCurrentPage, 10);
      return cp < this.pageCount;
    }
  },
  methods: {
    handleChange() {
      // console.log('change');
      let cp = Number(('' + this.internalCurrentPage).replace(/\D/g, ''));
      if (cp < 1) {
        cp = 1;
      }
      if (cp > this.pageCount) {
        cp = this.pageCount;
      }
      this.internalCurrentPage = cp;
      this.pageChange();
    },
    gotoFirstPage() {
      if (!this.canGoPrev) return;
      this.internalCurrentPage = 1;
      this.pageChange();
    },
    gotoLastPage() {
      if (!this.canGoNext) return;
      this.internalCurrentPage = this.pageCount;
      this.pageChange();
    },
    gotoNextPage() {
      if (!this.canGoNext) return;
      this.internalCurrentPage++;
      this.pageChange();
      this.$emit('next-click');
    },
    gotoPrevPage() {
      if (!this.canGoPrev) return;
      this.internalCurrentPage--;
      this.pageChange();
      this.$emit('prev-click');
    },
    pageChange() {
      // console.log('pc', this.internalCurrentPage);
      this.$emit('current-change', this.internalCurrentPage);
      this.$emit('update:currentPage', parseInt(this.internalCurrentPage, 10));
    },
    sizeChange() {
      // console.log('sc', this.internalPagerCount);
      this.$emit('size-change', this.internalPagerCount);
    }
  }
};
</script>

