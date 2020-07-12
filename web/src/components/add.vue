<template>
  <div class="add">
    <el-row>
      <el-col :span="15" :offset="5">
        <el-form label-width="80px" :model="form" ref="form" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="weixin">
            <el-input v-model="form.weixin" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              action="http://127.0.0.1:5000/upload"
              list-type="picture-card"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :on-change="fileChange"
              :accept="'image/*'"
              :multiple="true"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <div id="wangeditor">
            <div ref="editorElem" style="text-align:left;"></div>
          </div>
          <div class="mt20 center">
            <el-button type="primary" round @click="add">发布</el-button>
            <el-button round @click="cancel">取消</el-button>
          </div>
          <div v-html="editorContent"></div>
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
      <span>确认关闭？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      form: {},
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        weixin: [{ required: true, message: "请输入微信", trigger: "blur" }]
      },
      editor: null,
      editorContent: "",
      cancelVisible: false,
      fileList: []
    };
  },
  created() {},
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      //   this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
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
  methods: {
    add() {
      if (!this.editorContent) {
        this.$message({
          message: "请填写详情",
          type: "warning"
        });
        return;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = {
            userId: 1,
            title: this.form.title,
            content: this.form.content,
            weixin: this.form.weixin,
            catagory: "",
            bannerUrl: "",
            imgUrl: ""
          };
        }
      });
    },
    close() {
      this.cancelVisible = false;
      this.$refs.form.resetFields();
      this.fileList = [];
      this.form = {};
    },
    fileChange(file, fileList) {
      this.fileList = fileList;
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
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
