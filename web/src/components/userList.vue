<template>
  <div class="users">
    <el-row class="mt50">
      <el-col :span="22" :offset="1">
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="id" label="用户ID"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="jifen" label="积分"></el-table-column>
          <el-table-column prop="createdAt" label="注册时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="open(scope.row)" type="text" size="small">修改积分</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="currentChange"
          class="fr mt10"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserList, updateJifen } from "@/api/user.js";
import { dateFormat } from "../js/util";
export default {
  name: "users",
  data() {
    return {
      list: [],
      currentPage: 1,
      total: 0,
      id: null
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    open(v) {
      this.$prompt("请输入积分", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          updateJifen({
            userId: v.id,
            jifen: value
          }).then(res => {
            this.$message({
              type: "success",
              message: "已更改为: " + value
            });
            this.getList()
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    currentChange(page) {
      this.currentPage = page;
      this.getList();
    },
    updateJifen(v) {
      this.id = v.id;
    },
    getList() {
      let that = this;
      getUserList({
        pageNo: this.currentPage,
        pageSize: 10
      })
        .then(function(res) {
          if (res.code === 0) {
            that.list = res.data.list;
            that.total = res.data.total;
            that.list.forEach(v => {
              v.createdAt = dateFormat(
                "YYYY-mm-dd HH:MM",
                new Date(v.createdAt + "")
              );
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
</style>
