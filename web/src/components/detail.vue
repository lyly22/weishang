<template>
  <div class="detail">
    <menuVip></menuVip>
    <div class="container">
      <h2>{{data.title}}</h2>
      <p class="time">
          <i class="el-icon-time mr10"></i>{{data.userName}}发布于{{data.createTime}}</p>
      <div class="top clear">
        <img class="fl banner" src="../assets/fuz.jpg" />
        <div class="fl userInfo">
         <img src="../assets/weixin.jpg" width="20" /> 微信号：{{data.weixin}}
        </div>
      </div>
      <section v-html="data.content"></section>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/api/article.js";
import menuVip from "./menuVip";
export default {
  components: { menuVip },
  data() {
    return {
      data: {
        // title: "江苏潮牌厂家免费代理 一件包邮",
        // content: "我相册上的每个相册都有相对应的代理价硌，相册里没有的发图咨询我相册上的每个相册都有相对应的代理价硌，相册里没有的发图咨询我相册上的每个相册都有相对应的代理价硌，相册里没有的发图咨询",
        // time: "2020-07-07 15:19",
        // user: "杨幂",
        // weixinCode: "",
        // weixin: "edhfsf",
        // banner: ""
      }
    };
  },
  created() {},
  mounted() {this.getDetail()},
  methods: {
    getDetail() {
      let that = this;
      getDetail({
        id: this.$route.query.id
      })
        .then(function(res) {
          if (res.code === 0) {
            that.data=res.data
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },}
};
</script>

<style scoped lang='less'>
.detail{
    .container{
        margin:0 100px;
        padding:20px;
        box-shadow: 0 -10px 10px 0 #cecece;
        h2{
            color:red;
        }
        .time{
            margin:20px 0;
            color:#969696;
        }
        .banner {
            margin-right: 50px;
        }
        .userInfo {
            font-size: 16px;
            img{
                vertical-align: middle;
            }
        }
        .top {
            margin-bottom: 20px;
            padding:20px;
            padding-top: 0;
        box-shadow: 0 5px 8px 0 #cecece;
        }
        section {
            font-size: 18px;
            line-height: 38px;
        }
    }
}
</style>
