<template>
  <div class="detail">
    <menuVip></menuVip>
    <div class="container">
      <h2>{{data.title}}</h2>
      <p class="time">
        <i class="el-icon-time"></i>
        {{data.userName}}发布于{{data.createTime}}
      </p>
      <div class="top clear">
        <img class="fl banner" width="200" :src="data.bannerUrl" />
        <div class="fl userInfo">
          <img src="../assets/weixin.jpg" width="20" />
          微信号：{{data.weixin}}
        </div>
      </div>
      <section v-html="data.content"></section>
      <div class="center">
        <img v-for="(v,k) in data.picUrl.split(',')" :key="k" :src="v" width="500" />
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/api/article.js";
import menuVip from "./menuVip";
import { dateFormat } from "../js/util";
export default {
  components: { menuVip },
  data() {
    return {
      data: {}
    };
  },
  created() {},
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let that = this;
      getDetail({
        id: this.$route.query.id
      })
        .then(function(res) {
          if (res.code === 0) {
            console.log(this);
            that.data = res.data;
            that.data.createTime = dateFormat(
              "YYYY-mm-dd HH:MM",
              new Date(that.data.createTime + "")
            );
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang='less'>
.detail {
  .container {
    margin: 0 100px;
    padding: 20px;
    box-shadow: 0 -10px 10px 0 #cecece;
    h2 {
      color: red;
    }
    .time {
      margin: 20px 0;
      color: #969696;
    }
    .banner {
      margin-right: 50px;
    }
    .userInfo {
      font-size: 16px;
      img {
        vertical-align: middle;
      }
    }
    .top {
      margin-bottom: 20px;
      padding: 20px;
      padding-top: 0;
      box-shadow: 0 5px 8px 0 #cecece;
      img {
        max-height: 200px;
      }
    }
    section {
      font-size: 18px;
      line-height: 38px;
    }
    .center {
      img{
        display: inline-block;
      }
    }
  }
}
</style>
