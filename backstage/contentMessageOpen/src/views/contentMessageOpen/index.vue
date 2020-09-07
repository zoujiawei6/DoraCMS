<template>
  <div :class="classObj" class="contentMessageOpen">
    <div class="main-container">
      <MessageOpenForm :device="device" :dialogState="formState"></MessageOpenForm>
      <el-row class="dr-datatable">
        <el-col :span="24">
          <TopBar type="contentMessageOpen" :ids="selectlist" :pageInfo="contentMessageOpenList.pageInfo"></TopBar>
          <DataTable
            :dataList="contentMessageOpenList.docs"
            :pageInfo="contentMessageOpenList.pageInfo"
            @changeMsgSelectList="changeSelect"
          ></DataTable>
          <Pagination
            :device="device"
            :pageInfo="contentMessageOpenList.pageInfo"
            pageType="contentMessageOpen"
          ></Pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import MessageOpenForm from "./messageOpenForm";
import DataTable from "./dataTable.vue";
import TopBar from "../common/TopBar.vue";
import Pagination from "../common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { initEvent } from "@root/publicMethods/events";

export default {
  name: "index",
  data() {
    return {
      sidebarOpened: true,
      device: "desktop",
      selectlist: []
    };
  },
  components: {
    DataTable,
    TopBar,
    MessageOpenForm,
    Pagination
  },
  methods: {
    changeSelect(ids) {
      this.selectlist = ids;
    }
  },
  computed: {
    ...mapGetters(["contentMessageOpenList"]),
    formState() {
      return this.$store.getters.contentMessageOpenFormState;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebarOpened,
        openSidebar: this.sidebarOpened,
        withoutAnimation: "false",
        mobile: this.device === "mobile"
      };
    }
  },
  mounted() {
    initEvent(this);
    this.$store.dispatch("contentMessageOpen/getContentMessageOpenList");
  }
};
</script>

<style lang="">
</style>