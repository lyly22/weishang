vue
<template>
  <div class="index">
    <menuVip></menuVip>
    <div class="container">
      <div class="item">
        <div class="title">
          <h3>服装货源</h3>
          <span>
            <router-link :to="{path:'/list',query:{type:1}}">更多</router-link>
          </span>
        </div>
        <ul class="clear">
          <li class="fl" v-for="(v,k) in fuzList" :key="k" @click="goDetail">
            >
            <img src="../assets/vip.png" />
            <p>{{v.title.substr(0,25)}}</p>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">
          <h3 class="blue">鞋子货源</h3>
          <span>
            <router-link :to="{path:'/list',query:{type:2}}">更多</router-link>
          </span>
        </div>
        <ul class="clear">
          <li class="fl" v-for="(v,k) in xiezList" :key="k" @click="goDetail">
            <img src="../assets/vip.png" />
            <p>{{v.title.substr(0,25)}}</p>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">
          <h3 class="gray">包包手表货源</h3>
          <span>
            <router-link :to="{path:'/list',query:{type:3}}">更多</router-link>
          </span>
        </div>
        <ul class="clear">
          <li class="fl" v-for="(v,k) in baoList" :key="k" @click="goDetail">
            <img src="../assets/vip.png" />
            <p>{{v.title.substr(0,25)}}</p>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">
          <h3 class="pink">护肤美妆货源</h3>
          <span>
            <router-link :to="{path:'/list',query:{type:4}}">更多</router-link>
          </span>
        </div>
        <ul class="clear">
          <li class="fl" v-for="(v,k) in meizList" :key="k" @click="goDetail">
            <img src="../assets/vip.png" />
            <p>{{v.title.substr(0,25)}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import menuVip from "./menuVip";
export default {
  components: { menuVip },
  data() {
    return {
      activeIndex: "1",
      fuzList: [
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        },
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        }
      ],
      xiezList: [
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        },
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        }
      ],
      baoList: [
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        },
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        }
      ],
      meizList: [
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        },
        {
          title:
            "8000家女装一手货源号微商货源 独家女装一手货源女装一手货源女装一手"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goDetail() {
      this.$router.push({ path: "/detail", params: { id: 1 } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.index {
  .el-row {
    margin-bottom: 10px;
  }
  .container {
    margin: 20px 100px;
    h3 {
      color: #fff;
      line-height: 40px;
      background: #e3465e;
      padding-left: 30px;
      margin-bottom: 20px;
    }
    .item {
      li {
        margin-right: 10px;
        margin-bottom: 15px;
        cursor: pointer;
        &:nth-child(6n) {
          margin-right: 0;
        }
        width: 180px;
        p {
          cursor: pointer;
          &:hover {
            color: #e29303;
          }
        }
        a:link,
        a:visited {
          color: #fff;
        }
      }
      .title {
        position: relative;
        span {
          position: absolute;
          right: 20px;
          top: 10px;
          color: #fff;
          cursor: pointer;
        }
        .blue {
          background: #29a7e2;
        }
        .gray {
          background: #545454;
        }
        .pink {
          background: #ff2f2ffa;
        }
      }
    }
  }
}
</style>
