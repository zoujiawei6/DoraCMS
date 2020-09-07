<template>
  <div class="dr-contentMessageOpenForm">
    <el-dialog
      :xs="20"
      :sm="20"
      :md="6"
      :lg="6"
      :xl="6"
      :title="$t('contentMessageOpen.replyUser')"
      :visible.sync="dialogState.show"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dialogState.formData"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        <el-form-item :label="$t('contentMessageOpen.userSaid')">{{dialogState.parentformData.content}}</el-form-item>
        <el-form-item :label="$t('contentMessageOpen.reply')" prop="content">
          <el-input size="small" type="textarea" v-model="dialogState.formData.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
          >{{$t('contentMessageOpen.reply')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addContentMessageOpen } from "@/api/contentMessageOpen";

import _ from "lodash";
export default {
  props: {
    dialogState: Object,
    groups: Array,
    device: String
  },
  data() {
    return {
      rules: {
        content: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("contentMessageOpen.content")
            }),
            trigger: "blur"
          },
          {
            min: 5,
            max: 200,
            message: this.$t("validate.ranglengthandnormal", {
              min: 5,
              max: 200
            }),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("contentMessageOpen/hideContentMessageOpenForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let parentParams = this.dialogState.parentformData,
            repFormData = {};
          repFormData.relationMsgId = parentParams._id;
          repFormData.contentId = parentParams.contentId._id;
          repFormData.utype = "1";
          if (parentParams.author) {
            repFormData.replyAuthor = parentParams.author._id;
          } else if (parentParams.adminAuthor) {
            repFormData.adminReplyAuthor = parentParams.adminAuthor._id;
          }

          repFormData.content = this.dialogState.formData.content;
          // 新增
          addContentMessageOpen(repFormData).then(result => {
            if (result.status === 200) {
              this.$store.dispatch("contentMessageOpen/hideContentMessageOpenForm");
              this.$store.dispatch("contentMessageOpen/getContentMessageOpenList");
              this.$message({
                message: this.$t("main.addSuccess"),
                type: "success"
              });
            } else {
              this.$message.error(result.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>