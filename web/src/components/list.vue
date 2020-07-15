<template>
  <div class="list">
    <menuVip></menuVip>
    <h2 class="type">{{types[$route.query.type-1].label}}货源</h2>
    <ul class="listUl">
      <li v-for="(v,k) in list" :key="k" @click="goDetail(v.id)">
        <el-row>
          <el-col :span="5">
            <img :src="v.bannerUrl" width="200" />
          </el-col>
          <el-col :span="19">
            <h3>{{v.title}}</h3>
            <p class="time">由{{v.user.userName}}发布于：{{v.createTime}}</p>
          </el-col>
        </el-row>
        <div class="clear">
          <div class="fl"></div>
        </div>
      </li>
    </ul>
    <el-pagination
      class="fr"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { getList } from "@/api/article.js";
import { dateFormat } from "../js/util";
import menuVip from "./menuVip";
export default {
  components: { menuVip },
  data() {
    return {
      type: null,
      list: [],
      types: [
        {
          value: 1,
          label: "服装"
        },
        {
          value: 2,
          label: "鞋子"
        },
        {
          value: 3,
          label: "包包"
        },
        {
          value: 4,
          label: "手表"
        },
        {
          value: 5,
          label: "化妆品"
        }
      ],
      currentPage: 1,
      total: 0
    };
  },
  created() {
    this.type = this.$route.query.type;
  },
  mounted() {
    this.getList();
  },
  watch: {
    $route(v) {
      this.getList();
    }
  },
  methods: {
    currentChange(page) {
      this.currentPage = page;
      this.getList();
    },
    getList() {
      let that = this;
      getList({
        pageNo: this.currentPage,
        pageSize: 10,
        category: this.$route.query.type
      })
        .then(function(res) {
          if (res.code === 0) {
            that.list = res.data.list;
            that.total = res.data.total;
            that.list.forEach(v => {
              v.createTime = dateFormat(
                "YYYY-mm-dd HH:MM",
                new Date(v.createTime + "")
              );
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    goDetail() {
      this.$router.push({ path: "/detail", query: { id: 1 } });
    }
  }
};
</script>

<style lang='less'>
.list {
  .type {
    color: goldenrod;
    margin-left: 100px;
    margin-bottom: 20px;
  }
  .listUl {
    margin: 0 100px;
    padding: 20px;
    box-shadow: 0 -10px 10px 0 #cecece;
    li{
      cursor: pointer;
    }
    img {
      max-height: 200px;
    }
    .el-row {
      margin-bottom: 15px;
      box-shadow: 0 5px 10px 0 #cecece;
    }
    h3 {
      color: red;
    }
    .time {
      color: #868686;
    }
  }
  .fr {
    margin-right: 80px;
  }
}
</style>
