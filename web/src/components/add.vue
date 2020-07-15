<template>
  <div class="add">
    <el-row>
      <el-col :span="15" :offset="5">
        <h2>发布货源</h2>
        <el-form label-width="80px" :model="form" ref="form" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="weixin">
            <el-input v-model="form.weixin" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="category">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面图片" prop="bannerUrl">
            <el-upload
              action
              :http-request="uploadBanner"
              list-type="picture-card"
              :file-list="bannerList"
              :auto-upload="false"
              :on-change="fileChange"
              :limit="1"
              :on-remove="removeBanner"
              :accept="'image/*'"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图片">
            <el-upload
              action
              :http-request="uploadPic"
              list-type="picture-card"
              :file-list="picList"
              :auto-upload="true"
              :on-change="fileChanget"
              :on-remove="removePic"
              :accept="'image/*'"
              :multiple="true"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <div id="wangeditor">
            <div ref="editorElem" style="text-align:left;"></div>
          </div>
          <el-form-item label="是否发布为vip" label-width="100px">
            <el-switch
              v-model="isVip"
              @change="changeVip"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <div class="mt20 center">
            <el-button type="primary" round @click="add">发布</el-button>
            <el-button round @click="cancelVisible=true">取消</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="cancelVisible"
      width="30%"
      :close="close"
    >
      <span>确认取消？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import E from "wangeditor";
import { create, upload, uploads, getVip } from "@/api/article.js";
export default {
  data() {
    return {
      form: {},
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        weixin: [{ required: true, message: "请输入微信", trigger: "blur" }],
        bannerUrl: [
          { required: true, message: "请上传封面图", trigger: "blur" }
        ],
        category: [{ required: true, message: "请选择类型", trigger: "blur" }]
      },
      isVip: false,
      editor: null,
      editorContent: "",
      cancelVisible: false,
      bannerList: [],
      picList: [],
      arr: [],
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
      ]
    };
  },
  created() {},
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.create();
  },
  computed: {
    ...mapState(["jifen", "userId"]),
    jifen() {
      return sessionStorage.getItem("jifen");
    },
    userId() {
      return sessionStorage.getItem("userId");
    }
  },
  methods: {
    ...mapMutations(["updateJifen"]),
    uploadBanner(v) {
      if (this.bannerList.length > 0) {
        let formData = new FormData();
        formData.append("file", this.bannerList[0].raw);
        return upload(formData).then(res => {
          this.form.bannerUrl = res.fileUrl;
        });
      }
    },
    uploadPic(v) {
      let formData = new FormData();
      formData.append("file", v.file);
      upload(formData).then(res => {
        this.arr.push(res.fileUrl);
      });
    },
    async add() {
      if (!this.editorContent) {
        this.$message({
          message: "请填写详情",
          type: "warning"
        });
        return;
      }
      await this.uploadBanner();
      // await this.uploadPic();
      var that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = {
            ...this.form,
            userId: this.userId,
            content: this.editorContent,
            isVip: Number(this.isVip),
            picUrl: this.arr.join(",")
          };
          create(params)
            .then(function(res) {
              if (res.code === 0) {
                if (Object.keys(res).includes("jifen")) {
                  that.updateJifen(res.jifen);
                  sessionStorage.setItem("jifen", res.jifen);
                }
                that.$router.push({
                  path: "/detail",
                  query: { id: res.data.id }
                });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      });
    },
    changeVip(v) {
      if (v) {
        getVip().then(res => {
          if (res.data.total >= 185) {
            this.$message({
              message: "暂无广告位",
              type: "warning"
            });
            this.isVip = false;
          } else if (this.jifen < 300) {
            this.$message({
              message: "您的积分不足300，添加客服微信充值后发布",
              type: "warning"
            });
            this.isVip = false;
          } else {
            this.$alert("发布vip需扣300积分,有效期30天", {
              confirmButtonText: "确定"
            });
          }
        });
      }
    },
    close() {
      this.cancelVisible = false;
      this.$refs.form.resetFields();
      this.bannerList = [];
      this.picList = [];
      this.form = {};
      this.$router.push({ path: "/" });
    },
    fileChange(file, fileList) {
      this.bannerList = fileList;
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
    },
    removeBanner(file, fileList) {
      this.bannerList = fileList;
    },
    removePic(file, fileList) {
      this.picList = fileList;
    },
    fileChanget(file, fileList) {
      this.picList = fileList;
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
    }
  }
};
</script>

<style scoped lang='less'>
.add {
  padding-top: 50px;
  padding-bottom: 100px;
  h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #999;
  }
}
/deep/.el-dialog__wrapper {
  z-index: 10001 !important;
}
/deep/.w-e-text-container {
  z-index: 1 !important;
}
</style>
