<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px;"
    >
    <el-form-item prop="name">
        <el-input v-if="!isDialog"
          v-model="searchMap.name"
          placeholder="供应商名称"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="linkname">
        <el-input v-if="!isDialog"
          v-model="searchMap.linkman"
          placeholder="联系人"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-if="!isDialog"
          v-model="searchMap.mobile"
          placeholder="联系电话"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!isDialog" type="primary" icon="el-icon-search">查询</el-button>
        <el-button v-if="!isDialog" type="primary" icon="el-icon-edit" @click="handleAdd"
          >新增</el-button
        >
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :highlight-current-row="isDialog" @current-change="clickCurrentChange" :data="list" height="380" border style="width: 100%">
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column v-if="!isDialog" prop="mobile" label="联系电话"></el-table-column>
      <el-table-column v-if="!isDialog" prop="remark" label="备注"></el-table-column>
      <el-table-column v-if="!isDialog" label="操作" width="150">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="!isDlalog?' total, sizes, prev, pager, next, jumper': prev, pager, next"
      :total="total"
    ></el-pagination>

    <el-dialog v-if="!isDialog"
      title="供应商编辑"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
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
        <el-form-item label="供应商名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>

        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="pojo.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入地址"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addData('pojoForm') : updateData('pojoForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supplierApi from "@/api/supplier";
export default {
  props: { isDialog: Boolean },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        name: "",
        linkman: "",
        mobile: ""
      },
      pojo: {
        id: null,
        name: "",
        linkman: "",
        mobile: "",
        remark: ""
      },
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    clickCurrentChange(currentRow){
      console.log(currentRow)
      this.$emit('option-supplier',currentRow)
    },    
    fetchData() {
      supplierApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          console.log(this.list);
        });
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
      this.handleAdd();
      supplierApi.getById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },
    handleDele(id) {
      console.log("删除", id);
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          supplierApi.deleteById(id).then(response => {
            const resp = response.data;
            //提示信息
            this.$message({
              type: resp.flag ? "success" : "error",
              message: resp.message
            });
            if (resp.flag) {
              // 删除成功，刷新列表
              this.fetchData();
            }
          });
        })
        .catch(() => {
          // 取消删除，不理会
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，提交添加
          supplierApi.add(this.pojo).then(response => {
            const resp = response.data;
            if (resp) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              // 验证不通过
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
    updateData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          supplierApi.update(this.pojo).then(response => {
            const resp = response.data;
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
        }
      });
    }
  }
};
</script>
