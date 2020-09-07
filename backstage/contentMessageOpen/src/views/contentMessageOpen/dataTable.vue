<template>
  <div>
    <el-table
      align="center"
      v-loading="loading"
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleMsgSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="contentId.stitle" :label="$t('contentMessageOpen.stitle')" width="200">
        <template slot-scope="scope">
          <a
            :href="scope.row.contentId ? scope.row.contentId.url : '#'"
          >{{scope.row.contentId.stitle || scope.row.contentId.title}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" :label="$t('contentMessageOpen.authorName')">
        <template slot-scope="scope">{{scope.row.authorName || $t('contentMessageOpen.nimin')}}</template>
      </el-table-column>
      <el-table-column prop="replyAuthorName" :label="$t('contentMessageOpen.replyAuthorName')">
        <template slot-scope="scope">{{scope.row.replyAuthorName || $t('contentMessageOpen.none')}}</template>
      </el-table-column>
      <el-table-column prop="praise_num" :label="$t('label.praise_num')">
        <template slot-scope="scope">{{scope.row.praise_num || 0}}</template>
      </el-table-column>
      <el-table-column prop="date" :label="$t('contentMessageOpen.date')">
        <template slot-scope="scope">{{scope.row.date || $t('contentMessageOpen.none')}}</template>
      </el-table-column>
      <el-table-column :label="$t('main.dataTableOptions')" width="130" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            round
            :title="$t('label.updateMessage')"
            @click="editContentMessageOpen(scope.$index, dataList)"
          >
            <svg-icon icon-class="edit" />
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            round
            :title="$t('label.replyMessage')"
            @click="replyContentMessageOpen(scope.$index, dataList)"
          >
            <svg-icon icon-class="details" />
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            round
            :title="$t('label.deleteMessage')"
            @click="deleteContentMessageOpen(scope.$index, dataList)"
          >
            <svg-icon icon-class="icon_delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  deleteContentMessageOpen,
  getOneContentMessageOpen
} from '@/api/contentMessageOpen'
import { EDITOR_TYPES } from '@/utils/constants'

export default {
  props: {
    dataList: Array,
    pageInfo: Object
  },
  data() {
    return {
      loading: false,
      multipleSelection: [],
    }
  },

  methods: {
    handleMsgSelectionChange(val) {
      if (val && val.length > 0) {
        let ids = val.map((item, index) => {
          return item._id
        })
        this.multipleSelection = ids
        this.$emit('changeMsgSelectList', ids)
      } else {
        this.multipleSelection = ''
        this.$emit('changeMsgSelectList', '')
      }
    },
    editContentMessageOpen(index, rows) {
      let row = rows[index]
      this.$router.push({
        name: 'editor',
        params: { id: row.contentId.id },
        query: { messageId: row._id, type: EDITOR_TYPES.EDIT }
      })
    },
    replyContentMessageOpen(index, rows) {
      let row = rows[index]
      this.$router.push({
        name: 'editor',
        params: { id: row.contentId.id },
        query: { messageId: row._id, type: EDITOR_TYPES.REPLY }
      })
    },
    deleteContentMessageOpen(index, rows) {
      this.$confirm(
        this.$t('main.del_notice'),
        this.$t('main.scr_modal_title'),
        {
          confirmButtonText: this.$t('main.confirmBtnText'),
          cancelButtonText: this.$t('main.cancelBtnText'),
          type: 'warning'
        }
      )
        .then(() => {
          let targetId = []
          return deleteContentMessageOpen({
            ids: rows[index]._id
          })
        })
        .then(result => {
          if (result.status === 200) {
            this.$store.dispatch(
              'contentMessageOpen/getContentMessageOpenList',
              this.pageInfo
            )
            this.$message({
              message: this.$t('main.scr_modal_del_succes_info'),
              type: 'success'
            })
          } else {
            this.$message.error(result.message)
          }
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: this.$t('main.scr_modal_del_error_info') + err
          })
        })
    }
  }
}
</script>