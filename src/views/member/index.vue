<template>
  <div>
    <!-- 条件查询。 inline 属性设置表单变为行内的表单域 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px;"
    >
      <!-- 有prop才可以重置 -->
      <el-form-item prop="cardNum">
        <el-input
          v-model="searchMap.cardNum"
          placeholder="会员卡号"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="会员名称"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select
          v-model="searchMap.payType"
          placeholder="支付类型"
          style="width: 110px"
        >
          <!--key 标识， label 下拉显示的文本，vulue 表单值 -->
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <!-- value-format 是指定绑定值的格式 -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData"
          >查询</el-button
        >
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd()"
          >新增</el-button
        >
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" height="380" border style="width: 100%">
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="110"
      ></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型"
        ><template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }} </span>
        </template></el-table-column
      >
      <el-table-column
        prop="address"
        label="会员地址"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDele(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页，添加在div里面 -->
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form
        :rules="rules"
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum" />
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model="pojo.birthday"
            type="date"
            placeholder="请点击选择"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone" />
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money" />
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select
            v-model="pojo.payType"
            class="filter-item"
            placeholder="请点击选择"
          >
            <el-option
              v-for="option in payTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址">
          <el-input
            v-model="pojo.address"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入地址"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('pojoForm')">确 定</el-button>
      </div>
    </el-dialog>
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
      pageSize: 10,
      searchMap: {
        // 条件查询绑定的条件值
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      payTypeOptions, // 支付类型，ES6语法
      pojo: {
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: ""
      }, // 提交的数据
      dialogFormVisible: false, // 控制新增对话框
      rules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "请选择支付类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          memberApi.add(this.pojo).then(response => {
            const resp = response.data;
            console.log(resp);
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleEdit(id) {
      console.log("编辑");
    },
    handleDele(id) {
      console.log("删除");
    },
    fetchData() {
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const reqs = response.data;
          this.total = reqs.data.total;
          console.log(response);
          this.list = reqs.data.rows;
        });
    }
  }
};
</script>
