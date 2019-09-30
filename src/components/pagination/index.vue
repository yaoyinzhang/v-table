<template>
  <!-- 分页组件 -->
  <div class="pagination">
    <!-- 左侧：展示数据条数 -->
    <div class="left-area">共{{total}}条</div>
    <!-- 中间：分页选项卡 -->
    <div class="middle-area">
      <ul>
        <li v-for="(item , index) in pagesList"
            :key="'page' + index"
            :class="item == newCurrentPage ? 'active': ''"
            @click="pageChange(item)">{{item}}</li>
      </ul>
    </div>
    <!-- 选择每页显示条数 -->
    <div class="sizes-area">
      <div class="sizes"
           @click="openSizeSelect">{{newSize}}条/页</div>
      <div class="select-list"
           v-if="showPageSizes">
        <ul>
          <li v-for="(item, index) in pageSizes"
              :key="'pageSizes' + index"
              @click="selectSize(item)">{{item}} 条/页</li>
        </ul>
      </div>
    </div>
    <!-- 右侧：展示当前第几页 -->
    <div class="right-area">
      前往
      <input class="current-page-input"
             type="text"
             v-model="newCurrentPage"> 页
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['total', 'currentPage', 'pageSizes', 'size'],
  data () {
    return {
      showPageSizes: false,
      newSize: null,
      pagesList: [], // 分页选项卡列表
      newCurrentPage: null
    }
  },
  created () {
    this.newSize = this.size
    this.newCurrentPage = this.currentPage
    this.getPageList()
  },
  methods: {
    // 显示每页显示数据条数下拉列表
    openSizeSelect () {
      this.showPageSizes = !this.showPageSizes
    },
    // 选择完每页显示的条数，关闭弹窗
    selectSize (size) {
      this.showPageSizes = false
      this.newSize = size
      this.getPageList()
      this.newCurrentPage = 1
      this.$emit('size-change', this.newSize)
    },
    // 计算 分页选项卡列表数据
    getPageList () {
      let num = 1 // 共 num 页
      console.log('this.total % this.newSize', this.total % this.newSize)
      if (Number(this.total) < Number(this.newSize)) {
        this.pagesList = [1]
      } else {
        if (this.total % this.newSize === 0) {
          num = this.total / this.newSize
        } else {
          num = this.total / this.newSize + 1
        }
        // 生成1~num的自然数，赋值给pagesList
        this.pagesList = []
        for (let i = 0; i < num; i++) {
          this.pagesList.push(i + 1)
        }
        this.pagesList = [...this.pagesList]
      }
    },
    // 从分页选项卡中 跳转到指定页
    pageChange (item) {
      this.newCurrentPage = item
    }
  }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
