<template>
  <div class="message-editor main-container">
    <el-form
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item v-if="isReplay" :label="$t('label.replyAuthorLogo')" prop="logo">
        <el-upload
          disabled="true"
          class="avatar-uploader"
          action="/api/upload/files"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="{action:'uploadimage'}"
        >
          <img v-if="formData.replyAuthorLogo" :src="formData.replyAuthorLogo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="isReplay" :label="$t('label.replyAuthorName')" prop="replyAuthorName">
        <el-input disabled class="short-input" v-model="formData.replyAuthorName"></el-input>
      </el-form-item>
      <el-form-item v-if="isReplay" :label="$t('label.replayContent')">
        <p class="replay-content max-article" v-html="openMessage.content"></p>
      </el-form-item>
      <el-form-item :label="$t('label.praise_num')" prop="praise_num">
        <el-input-number v-model="formData.praise_num" class="short-input" step="10"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('label.authorLogo')" prop="logo">
        <el-upload
          class="avatar-uploader"
          action="/api/upload/files"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="{action:'uploadimage'}"
        >
          <img v-if="formData.authorLogo" :src="formData.authorLogo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('label.addMessageUser')" prop="authorName">
        <el-select
          class="short-input"
          v-model="formData.authorName"
          filterable
          remote
          reserve-keyword
          :multiple="false"
          :clearable="true"
          :allow-create="true"
          :placeholder="$t('label.userName')"
          :remote-method="searchMethod"
          :loading="loading"
        >
          <el-option
            v-for="user in users"
            :key="user.id"
            :label="user.userName || user.email"
            :value="user.userName || user.email"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('label.addMessage')" prop="content">
        <vue-ueditor-wrap
          class="editorForm max-article"
          @ready="editorReady"
          v-model="formData.content"
          :config="editorConfig"
        ></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item class="editor-buttons">
        <el-button
          size="medium"
          type="primary"
          @click="submitForm('ruleForm')"
        >{{ $t('label.addMessage') }}</el-button>
        <el-button size="medium" @click="backToList">{{$t('main.back')}}</el-button>
      </el-form-item>
      <el-form-item :label="$t('label.preview')">
        <div v-if="content.comments" class="article-content max-article">
          <h1 class="title">{{ content.title }}</h1>
          <div v-html="content.comments"></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import {
  getOneContent,
  regUserList,
  addOneContentMessageOpen,
  updateOneContentMessageOpen,
  getOneContentMessageOpen
} from '@/api/contentMessageOpen'
import { successHandle, errorHandle } from '@/utils'
import { EDITOR_TYPES } from '@/utils/constants'

export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      type: '',
      messageId: '',
      content: {
        id: '',
        author: {
          name: ''
        },
        title: '',
        comments: '',
        date: '',
        discription: ''
      },
      openMessage: {
        authorName: '',
        content: '',
        date: '',
        had_praise: false,
        id: '',
        praise_num: 0,
        utype: '',
        contentId: {
          _id: '',
          title: '',
          stitle: '',
          url: '',
          id: ''
        }
      },
      loading: false,
      users: {},
      pageInfo: {
        searchkey: ''
      },
      formData: {
        content: '',
        praise_num: 0,
        relationMsgId: '',
        authorName: '',
        authorLogo: '',
        replyAuthorName: '',
        replyAuthorLogo: ''
      },
      rules: {
        content: [
          {
            required: true,
            message: this.$t('validate.inputNull', {
              label: this.$t('contentMessageOpen.content')
            }),
            trigger: 'blur'
          },
          {
            min: 1,
            max: 200,
            message: this.$t('validate.ranglengthandnormal', {
              min: 1,
              max: 200
            }),
            trigger: 'blur'
          }
        ],
        authorName: [
          {
            required: true,
            message: this.$t('validate.inputNull', {
              label: this.$t('label.addMessageUser')
            }),
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: this.$t('validate.ranglengthandnormal', {
              min: 1,
              max: 20
            }),
            trigger: 'blur'
          }
        ],
        replyAuthorName: [
          {
            required: true,
            message: this.$t('validate.inputNull', {
              label: this.$t('label.addMessageUser')
            }),
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: this.$t('validate.ranglengthandnormal', {
              min: 1,
              max: 20
            }),
            trigger: 'blur'
          }
        ],
        praise_num: [
          {
            type: 'number',
            min: 0,
            max: 999,
            message: this.$t('validate.rangelength', {
              min: 0,
              max: 999
            }),
            trigger: 'blur'
          }
        ]
      },
      editorConfig: {
        // 编辑器不自动被内容撑高
        // autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 200,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: '/api/upload/ueditor',
        // 是否压缩图片,默认是true
        imageCompressEnable: false,
        imageManagerUrlPrefix: '/1/2',
        // 允许输入字数
        maximumWords: '200',
        // 自动保存间隔时间，单位ms
        saveInterval: '10000',
        toolbars: [
          [
            'source', //源代码
            'undo', //撤销
            'redo', //重做
            /*** 字体与格式 ***/
            'bold', //加粗
            'indent', //首行缩进
            'italic', //斜体
            'underline', //下划线
            'strikethrough', //删除线
            'subscript', //下标
            'fontborder', //字符边框
            'superscript', //上标
            'blockquote', //引用
            'emotion', //表情
            'spechars', //特殊字符
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            'directionalityltr', //从左向右输入
            'directionalityrtl', //从右向左输入
            'rowspacingtop', //段前距
            'rowspacingbottom', //段后距
            'lineheight', //行间距
            'touppercase', //字母大写
            'tolowercase', //字母小写
            'forecolor', //字体颜色
            'backcolor', //背景色
            /*** 表格 ***/
            'inserttable', //插入表格
            'edittable', //表格属性
            'insertrow', //前插入行
            'insertcol', //前插入列
            'mergeright', //右合并单元格
            'mergedown', //下合并单元格
            'deleterow', //删除行
            'deletecol', //删除列
            'splittorows', //拆分成行
            'splittocols', //拆分成列
            'splittocells', //完全拆分单元格
            'deletecaption', //删除表格标题
            'mergecells', //合并多个单元格
            'deletetable', //删除表格
            'insertparagraphbeforetable', //"表格前插入行"
            'edittd', //单元格属性
            /*** 下拉框 ***/
            'customstyle', //自定义标题
            'insertcode', //代码语言
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
            /*** 图片操作 ***/
            'simpleupload', //单图上传
            'insertimage', //多图上传
            'imagenone', //默认
            'imageleft', //左浮动
            'imageright', //右浮动
            'imagecenter', //居中
            'wordimage', //图片转存
            'background', //背景
            /*** 其它 ***/
            'anchor', //锚点
            // 'formatmatch', //格式刷
            // 'pasteplain', //纯文本粘贴模式
            'selectall', //全选
            'print', //打印
            'preview', //预览
            'horizontal', //分隔线
            'removeformat', //清除格式
            'time', //时间
            'date', //日期
            'inserttitle', //插入标题
            'cleardoc', //清空文档
            'link', //超链接
            'unlink', //取消链接
            'searchreplace', //查询替换
            'map', //Baidu地图
            'gmap', //Google地图
            // 'insertvideo', //视频
            'fullscreen', //全屏
            'pagebreak', //分页
            // 'insertframe', //插入Iframe
            'attachment', //附件
            'autotypeset', //自动排版
            // 'template', //模板
            'scrawl', //涂鸦
            // 'music', //音乐
            'drafts', // 从草稿箱加载
            // 'charts' // 图表
            'help' //帮助
          ]
        ],
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: this.$root.staticRootPath + '/plugins/ueditor/'
      }
    }
  },
  computed: {
    isReplay() {
      return this.type === EDITOR_TYPES.REPLY
    }
  },
  methods: {
    setFromData(openMessage) {
      const message = openMessage || this.openMessage
      let formData
      switch (this.type) {
        case EDITOR_TYPES.EDIT:
          formData = message
          break
        // 回复留言时，将传入的名称当做被回复用户
        case EDITOR_TYPES.REPLY:
          formData = {
            replyAuthorName: message.authorName,
            replyAuthorLogo: message.authorLogo,
            // 子级留言归属于同一楼层
            relationMsgId: message.relationMsgId || message.id
          }
          break
        // 默认新增留言
        default:
          formData = {}
          break
      }
      this.formData = Object.assign(this.formData, formData)
    },
    handleAvatarSuccess(res, file) {
      let imageUrl = res.data.path
      this.formData.authorLogo = imageUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error(this.$t('validate.limitUploadImgType'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('validate.limitUploadImgSize', { size: 2 }))
      }
      return (isJPG || isPNG || isGIF) && isLt2M
    },
    searchMethod(searchkey) {
      regUserList({
        searchkey,
        pageSize: 50
      })
        .then(result => {
          successHandle(
            result,
            data => {
              this.users = result.data.docs
            },
            this,
            this.$t('label.addMessageUser')
          )
        })
        .catch(this.error)
    },
    editorReady(instance) {
      this.ueditorObj = instance
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        switch (this.type) {
          case EDITOR_TYPES.EDIT:
            this.update()
            break
          case EDITOR_TYPES.REPLY:
          default:
            this.add()
            break
        }
      })
    },
    update() {
      console.log(formData);
      updateOneContentMessageOpen({
        contentId: this.content.id,
        ...this.formData
      })
        .then(result => {
          successHandle(
            result,
            data => {
              this.$message.success(
                this.$t('info.successAble', {
                  name: this.$t('label.updateMessage')
                })
              )
            },
            this,
            'updateOneContentMessageOpen'
          )
        })
        .catch(this.error)
    },
    add() {
      addOneContentMessageOpen({
        contentId: this.content.id,
        ...this.formData
      })
        .then(result => {
          successHandle(
            result,
            data => {
              this.$message.success(
                this.$t('info.successAble', {
                  name: this.$t('label.addMessage')
                })
              )
            },
            this,
            'addOneContentMessageOpen'
          )
        })
        .catch(this.error)
    },
    backToList() {
      this.$router.push(this.$root.adminBasePath + '/contentMessageOpen')
    },
    error(err) {
      errorHandle(this, err)
    },
    getContent() {
      const contentID = this.$route.params.id
      if (contentID) {
        getOneContent({ id: contentID })
          .then(result => {
            successHandle(
              result,
              data => {
                Object.assign(this.content, result.data)
              },
              this,
              'getOneContent'
            )
          })
          .catch(this.error)
      }
    },
    init() {
      this.getContent()
      this.searchMethod()
      if (this.messageId) {
        getOneContentMessageOpen({
          id: this.messageId
        })
          .then(result => {
            this.openMessage = result.data
            this.setFromData(this.openMessage)
          })
          .catch(this.error)
      }
    }
  },
  mounted() {
    this.messageId = this.$route.query.messageId
    this.type = this.$route.query.type
    this.init()
  }
}
</script>

<style lang="scss">
.message-editor {
  padding: 0.5rem;

  & > .el-row {
    padding: 0.5rem;
  }
  .article-content {
    margin-top: 1rem;
    margin-bottom: 3rem;
    padding: 1rem;
  }
  .max-article {
    max-width: 1024px;
  }
  .avatar-uploader {
    overflow: hidden;
    img {
      max-width: 150px;
      max-height: 150px;
    }
  }
  .replay-content {
    padding: 1rem;
  }
  .article-content,
  .replay-content {
    border-radius: 5px;
    box-shadow: #cccccc 0px 0px 10px 1px;
  }
  .title {
    text-align: center;
  }
  .el-form {
    margin-top: 1.5rem;
    .short-input input {
      width: 200px;
    }
  }

  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px !important;
    text-align: center;
  }
}
</style>