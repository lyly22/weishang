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
      <el-menu-item index="1">
        <router-link to="/">首页</router-link>
      </el-menu-item>
      <el-menu-item
        v-for="(v,k) in types"
        :key="k"
        :index="v.value+1+''"
        @click="goList(v)"
      >{{v.label}}</el-menu-item>
    </el-menu>
    <div class="vip">
      <ul class="clear">
        <li class="fl" v-for="(v,k) in vipList" :key="k">
          <img :src="v.bannerUrl" height="150" @click="goDetail(v.id)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getVip } from "@/api/article.js";
export default {
  data() {
    return {
      activeIndex: "1",
      types: [
        {
          value: 1,
          label: "服装"
        },
        {
          value: 2,
          label: "鞋"
        },
        {
          value: 3,
          label: "包"
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
      vipList: []
    };
  },
  mounted() {
    this.getVip();
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = String(key);
    },
    goDetail(v) {
      this.$router.push({ path: "/detail", query: { id: v } });
    },
    goList(v) {
      this.$router.push({ path: "/list", query: { type: v.value } });
    },
    getVip() {
      getVip().then(res => {
        this.vipList = res.data.list;
      });
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
    margin: 0 100px;
  }
  li {
    margin-right: 10px;
    margin-top: 5px;
    img {
      width: 182px;
      height: 120px;
    }
    cursor: pointer;
    &:nth-child(6n) {
      margin-right: 0;
    }
  }
}
</style>
