vue
<template>
  <div class="menuVip">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
      <el-menu-item index="2"><router-link :to="{path:'/list',query:{type:1}}">服装</router-link></el-menu-item>
      <el-menu-item index="3"><router-link :to="{path:'/list',query:{type:2}}">鞋子</router-link></el-menu-item>
      <el-menu-item index="4"><router-link :to="{path:'/list',query:{type:3}}">包</router-link></el-menu-item>
      <el-menu-item index="5"><router-link :to="{path:'/list',query:{type:4}}">手表</router-link></el-menu-item>
      <el-menu-item index="6"><router-link :to="{path:'/list',query:{type:5}}">饰品</router-link></el-menu-item>
    </el-menu>
    <div class="vip">
      <ul class="clear">
        <li class="fl" v-for="(v,k) in vipList" :key="k">
          <img src="../assets/vip.png" @click="goDetail(v)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      vipList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    };
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goDetail() {
      this.$router.push({ path: "/detail",params:{id:1} });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.menuVip {
  .el-menu {
    padding: 0 100px;
    background: rgb(31, 142, 203) !important;
    .el-menu-item {
      padding: 0 50px;
      background: rgb(31, 142, 203) !important;
    }
  }
  .el-row {
    margin-bottom: 10px;
  }
  .vip {
    margin: 20px 100px;
  }
  li {
    margin-right: 10px;
    margin-bottom: 15px;
    cursor: pointer;
    &:nth-child(6n) {
      margin-right: 0;
    }
  }
}
</style>
