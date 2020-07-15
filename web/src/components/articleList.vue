<template>
  <div class="articles">
    <el-row class="mt50">
      <el-col :span="22" :offset="1">
        <el-row>
          <el-col :span="10" :offset="9">
            <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
              <i class="el-icon-search el-input__icon" slot="suffix" @click="getList"></i>
            </el-input>
          </el-col>
        </el-row>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="title" label="标题" width="280"></el-table-column>
          <el-table-column prop="content" label="内容" width="520"></el-table-column>
          <el-table-column prop="createdAt" label="时间" width="160"></el-table-column>
          <el-table-column prop="userName" label="用户"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
              <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row)">
                <el-button slot="reference" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList,delArticle } from "@/api/article.js";
import { dateFormat } from "../js/util";
export default {
  name: "articles",
  data() {
    return {
      list: [],
      currentPage: 1,
      total: 0,
      query: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    currentChange(page) {
      this.currentPage = page;
      this.getList();
    },
    detail(v) {
      this.$router.push({ path: "/detail", query: { id: v.id } });
    },
    del(v) {
      let that = this;
      delArticle({
        id: v.id
      })
        .then(function(res) {
          if (res.code === 0) {
            that.getList();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getList() {
      let that = this;
      getList({
        pageNo: this.currentPage,
        pageSize: 10,
        query: this.query
      })
        .then(function(res) {
          if (res.code === 0) {
            that.list = res.data.list;
            that.total = res.data.total;
            that.list.forEach(v => {
              v.userName = v.user.userName;
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
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.articles {
  position: relative;
  .right {
    position: fixed;
    right: 20px;
    z-index: 9;
  }
  img {
    border-radius: 50%;
  }
  .createBtn {
    margin-bottom: 30px;
    float: right;
  }
  .el-pagination {
    float: right;
    margin-top: 20px;
  }
  .avatar {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
  }
  .flag {
    color: red;
    font-weight: bold;
  }
  /deep/.input-with-select {
    width: 50%;
  }
}
</style>
