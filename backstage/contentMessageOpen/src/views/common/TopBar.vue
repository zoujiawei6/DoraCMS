<template>
  <div class="dr-toolbar">
    <el-col :xs="12" :md="18" class="option-button">
      <el-button size="small" type="danger" plain round @click="branchDelete('msg')">
        <svg-icon icon-class="icon_delete" />
      </el-button>
      <!-- TOPBARLEFT -->
    </el-col>
    <el-col :xs="12" :md="6" style="textAlign:right;">
      <el-input
        class="dr-searchInput"
        size="small"
        :placeholder="$t('topBar.messageOpenContent')"
        v-model="pageInfo.searchkey"
        suffix-icon="el-icon-search"
        @keyup.enter.native="searchResult"
      ></el-input>
    </el-col>
  </div>
</template>
<script>
import { deleteContentMessageOpen } from "@/api/contentMessageOpen";
export default {
  props: {
    device: String,
    pageInfo: Object,
    type: String,
    ids: Array
  },
  data() {
    return {
      selectUserList: [],
      searchkey: ""
    };
  },
  methods: {
    branchDelete(target) {
      let _this = this;
      if (_.isEmpty(_this.ids)) {
        this.$message({
          type: "info",
          message: this.$t("validate.selectNull", {
            label: this.$t("main.target_Item")
          })
        });
        return false;
      }
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          let ids = _this.ids.join();
          return deleteContentMessageOpen({
            ids
          });
        })
        .then(result => {
          if (result.status === 200) {
            this.$store.dispatch("contentMessageOpen/getContentMessageOpenList");
            this.$message({
              message: `${this.$t("main.scr_modal_del_succes_info")}`,
              type: "success"
            });
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    },
    searchResult(ev) {
      let searchkey = this.pageInfo ? this.pageInfo.searchkey : "";
      this.$store.dispatch("contentMessageOpen/getContentMessageOpenList", {
        searchkey
      });
    }
    // TOPBARLEFTOPTION
  },
  components: {}
};
</script>
<style lang="scss">
</style>
