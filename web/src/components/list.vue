<template>
  <div class="list">
    <menuVip></menuVip>
    <h2 class="type">服装货源</h2>
    <ul class="listUl">
      <li v-for="(v,k) in list" :key="k" @click="goDetail">
        <el-row>
          <el-col :span="4">
            <img src="../assets/fuz.jpg" />
          </el-col>
          <el-col :span="20">
            <h3>{{v.title}}</h3>
            <p class="content">{{v.content}}</p>
            <p class="time">由{{v.user}}发布于：{{v.time}}</p>
          </el-col>
        </el-row>
        <div class="clear">
          <div class="fl"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import menuVip from "./menuVip";
export default {
  components: { menuVip },
  data() {
    return {
      type: null,
      list: [
        {
          title: "8000家女装一手货源号微商货源 独家女装一手货源",
          content:
            "无需代理费， 一手货源 ,支持全国 一件代发 微信 he18662129909 做代理不用费用，要的是你持之以恒转图的耐心。 （PS：我当天更新的图片，你们在自己朋友",
          time: "2020-07-07 15:19:04",
          user: "杨幂"
        },
        {
          title: "8000家女装一手货源号微商货源 独家女装一手货源",
          content:
            "无需代理费， 一手货源 ,支持全国 一件代发 微信 he18662129909 做代理不用费用，要的是你持之以恒转图的耐心。 （PS：我当天更新的图片，你们在自己朋友",
          time: "2020-07-07 15:19:04",
          user: "杨幂"
        }
      ]
    };
  },
  created() {
    this.type = this.$route.query.type;
  },
  mounted() {},
  methods: {
    goDetail() {
      this.$router.push({ path: "/detail",params:{id:1} });
    }}
};
</script>

<style lang='less'>
.list {
    .type {
        color:goldenrod;
        margin-left: 100px;
        margin-bottom: 20px;
    }
  .listUl {
    margin: 0 100px;
    padding: 20px;
    box-shadow: 0 -10px 10px 0 #cecece;
    .el-row {
      margin-bottom: 15px;
    box-shadow: 0 5px 10px 0 #cecece;
    }
    h3{
        color:red;
    }
    .time {
        color:#868686;
    }
  }
}
</style>
