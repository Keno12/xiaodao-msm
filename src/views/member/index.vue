<template>
  <div>
    <el-table
      :data="list"
      height="380"
      border
      style="width: 100%"
    >
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="cardNum"
        label="会员卡号"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="会员姓名"
      ></el-table-column>
      <el-table-column
        prop="birthday"
        label="会员生日"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="110"
      ></el-table-column>
      <el-table-column
        prop="integral"
        label="可用积分"
      ></el-table-column>
      <el-table-column
        prop="money"
        label="开卡金额"
      ></el-table-column>
      <el-table-column
        prop="payType"
        label="支付类型"
      ><template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }} </span>
        </template></el-table-column>
      <el-table-column
        prop="address"
        label="会员地址"
        width="180"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDele(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import memberApi from "@/api/member";
// 支付类型 在过滤其中使用
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];
export default {
  filters: {
    // filters 中 this 指向的不是vue实例, 所有无法直接获取 data 中的数据
    payTypeFilter(type) {
      // 全局的 payTypeOptions , 返回一个满足条件的对象
      const obj = payTypeOptions.find(obj => obj.type === type);
      // 非空返回类型名称
      return obj ? obj.name : null;
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      searchMap: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleEdit(id) {
      console.log("编辑");
    },
    handleDele(id) {
      console.log("删除");
    },
    fetchData() {
      memberApi.search().then(respsonse => {
        this.list = respsonse.data.data;
      });
    }
  }
};
</script>
