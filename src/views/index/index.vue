<template>
  <div>
    <!-- 作为父组件，引用v-table子组件 -->
    <p>题目：一个公共的table组件，供其他开发者使用，组件支持分页、排序和过滤功能。（只能使用vue框架进行开发，不能使用任何第三方组件库）</p>
    <v-table :data="list"
             :columns="columns"></v-table>
    <!-- 分页组件 -->
    <pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :pageSizes="[3,6,9,12]"
                :size="limit"
                :currentPage="pageNum"
                :total="total"></pagination>
  </div>
</template>
<script>

import vTable from '@/components/v-table/table'
import pagination from '@/components/pagination/index.vue'

export default {
  components: { vTable, pagination },
  data () {
    return {
      columns: [{ // table表头：colName-表头展示的中文名；field - 对应的数据字段
        colName: '姓名',
        field: 'name',
        hasSort: true
      }, {
        colName: '性别',
        field: 'sex',
        hasFilter: true
      }, {
        colName: '年龄',
        field: 'age',
        hasSort: true
      }, {
        colName: '身高',
        field: 'height'
      }, {
        colName: '体重',
        field: 'weight',
        hasFilter: true
      }, {
        colName: '地址',
        field: 'address'
      }],
      list: [], // table列表数据
      total: 0, // 总数据量
      pageNum: 1, // 当前页
      start: 0, // 当页开始数据
      limit: 3 // 每页显示数据量
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    handleSizeChange (val) {
      this.start = 0
      this.limit = val
      // this.getDataList()
    },
    handleCurrentChange (val) {
      this.start = (val - 1) * this.limit
      // this.getDataList()
    },
    // 请求列表数据：配合后台
    getDataList () {
      this.list = [
        {
          id: 101,
          name: '小可爱',
          sex: '女',
          age: 18,
          height: '160',
          weight: '48',
          address: '北京市大同区111号'
        },
        {
          id: 102,
          name: '大魔王',
          sex: '男',
          age: 28,
          height: '187',
          weight: '70',
          address: '南京市江宁区208号'
        },
        {
          id: 103,
          name: '小垃圾',
          sex: '男',
          age: 18,
          height: '187',
          weight: '80',
          address: '新疆维吾尔自治区'
        }, {
          id: 104,
          name: '小可爱2',
          sex: '女',
          age: 23,
          height: '160',
          weight: '48',
          address: '北京市大同区111号'
        },
        {
          id: 105,
          name: '大魔王2',
          sex: '男',
          age: 1,
          height: '187',
          weight: '70',
          address: '南京市江宁区208号'
        },
        {
          id: 106,
          name: '小垃圾2',
          sex: '男',
          age: 8,
          height: '187',
          weight: '80',
          address: '新疆维吾尔自治区'
        }
      ]
      this.total = 6
      this.pageNum = 1
    }
  }
}
</script>
