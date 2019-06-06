<template>
  <div class="tea-pagination" style="padding-top:200px;">
    <div class="tea-pagination__state">
      <span class="tea-pagination__text">
        共
        <strong>{{total}}</strong>项
      </span>
    </div>
    <div class="tea-pagination__operate">
      <!--if start-->
      <span class="tea-pagination__text">每页显示行</span>
      <el-select v-model="pagerCount" placeholder="请选择" type="pagination">
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
        <input type="text" class="tea-input tea-pagination__inputpagenum" v-model="currentPage">
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
    }
  },
  data() {
    return {
      pagerCount: 10,
      currentPage: 1
    };
  },
  components: {
    ElSelect,
    ElOption
  },
  watch: {
    pagerCount(val, old) {
      // recalculate currentPage
      console.log(val, old);
      const currentItem = (this.currentPage - 1) * old + 1;
      this.currentPage = Math.ceil(currentItem / val);
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pagerCount);
    },
    canGoPrev() {
      return this.currentPage > 1;
    },
    canGoNext() {
      return this.currentPage < this.pageCount;
    }
  },
  methods: {
    gotoFirstPage() {
      if (!this.canGoPrev) return;
      this.currentPage = 1;
    },
    gotoLastPage() {
      if (!this.canGoNext) return;
      this.currentPage = this.pageCount;
    },
    gotoNextPage() {
      if (!this.canGoNext) return;
      this.currentPage++;

    },
    gotoPrevPage() {
      if (!this.canGoPrev) return;
      this.currentPage--;
    }
  }
};
</script>

