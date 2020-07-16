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
          <li class="fl" v-for="(v,k) in fuzList" :key="k" @click="goDetail(v.id)">
            <img :src="v.bannerUrl" />
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
          <li class="fl" v-for="(v,k) in xiezList" :key="k" @click="goDetail(v.id)">
            <img :src="v.bannerUrl" />
            <p>{{v.title.substr(0,27)}}</p>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">
          <h3 class="gold">包包货源</h3>
          <span>
            <router-link :to="{path:'/list',query:{type:3}}">更多</router-link>
          </span>
        </div>
        <ul class="clear">
          <li class="fl" v-for="(v,k) in baoList" :key="k" @click="goDetail(v.id)">
            <img :src="v.bannerUrl" />
            <p>{{v.title.substr(0,25)}}</p>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">
          <h3 class="gray">手表货源</h3>
          <span>
            <router-link :to="{path:'/list',query:{type:4}}">更多</router-link>
          </span>
        </div>
        <ul class="clear">
          <li class="fl" v-for="(v,k) in biaoList" :key="k" @click="goDetail(v.id)">
            <img :src="v.bannerUrl" />
            <p>{{v.title.substr(0,25)}}</p>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="title">
          <h3 class="pink">护肤美妆货源</h3>
          <span>
            <router-link :to="{path:'/list',query:{type:5}}">更多</router-link>
          </span>
        </div>
        <ul class="clear">
          <li class="fl" v-for="(v,k) in meizList" :key="k" @click="goDetail(v.id)">
            <img :src="v.bannerUrl" />
            <p>{{v.title.substr(0,25)}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { indexList } from "@/api/article.js";
import menuVip from "./menuVip";
import { dateFormat } from "../js/util";
export default {
  components: { menuVip },
  data() {
    return {
      activeIndex: "1",
      fuzList: [],
      xiezList: [],
      baoList: [],
      biaoList: [],
      meizList: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goDetail(id) {
      this.$router.push({ path: "/detail", query: { id } });
    },
    getList() {
      let that = this;
      indexList({
        pageNo: 1,
        pageSize: 10,
        category: [1, 2, 3, 4, 5].join(",")
      })
        .then(function(res) {
          if (res.code === 0) {
            for (let n in res.data) {
              res.data[n].forEach(v => {
                v.createTime = dateFormat(
                  "YYYY-mm-dd HH:MM",
                  new Date(v.createTime + "")
                );
              });
            }
            that.fuzList = res.data.a;
            that.xiezList = res.data.b;
            that.baoList = res.data.c;
            that.biaoList = res.data.d;
            that.meizList = res.data.e;
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
.index {
  .el-row {
    margin-bottom: 10px;
  }
  .container {
    margin: 10px 100px;
    h3 {
      color: #fff;
      line-height: 40px;
      background: #e3465e;
      padding-left: 30px;
      margin-bottom: 10px;
    }
    img {
      max-height: 200px;
    }
    .item {
      li {
        margin-right: 10px;
        margin-bottom: 15px;
        cursor: pointer;
        width: 182px;
        &:nth-child(6n) {
          margin-right: 0;
        }
        img {
          width: 182px;
          height: 130px;
        }
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
        .gold {
          background: #f3ca6f;
        }
      }
    }
  }
}
</style>
