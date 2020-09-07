import * as types from '@/store/types.js';
import {
  contentMessageOpenList,
  getOneContentMessageOpen,
} from '@/api/contentMessageOpen';
import _ from 'lodash';




const state = {
  formState: {
    show: false,
    edit: false,
    formData: {
      contentId: '',
      content: '',
      contentTitle: '',
      authorName: '',
      authorLogo: '',
      replyAuthorName: '',
      replyAuthorLogo: '',
      reportCount: '',
      relationMsgId: '',
      relationSecondMsgId: '',
      adminUser: {},
      utype: "",
      date: "",
      praise_num: "",
      had_praise: "",
      praiseMembers: [],
    },
    parentformData: {
      contentId: '',
      content: '',
      contentTitle: '',
      authorName: '',
      authorLogo: '',
      replyAuthorName: '',
      replyAuthorLogo: '',
      reportCount: '',
      relationMsgId: '',
      relationSecondMsgId: '',
      adminUser: {},
      utype: "",
      date: "",
      praise_num: "",
      had_praise: "",
      praiseMembers: [],
    }
  },
  messageOpenList: {
    pageInfo: {},
    docs: []
  },
}

const mutations = {
  [types.CONTENTMESSAGE_FORMSTATE](state, formState) {
    state.formState.show = formState.show;
    state.formState.edit = formState.edit;
    state.formState.type = formState.type;
    state.formState.formData = Object.assign({
      contentId: '',
      content: '',
      contentTitle: '',
      authorName: '',
      authorLogo: '',
      replyAuthorName: '',
      replyAuthorLogo: '',
      reportCount: '',
      relationMsgId: '',
      relationSecondMsgId: '',
      adminUser: {},
      utype: "",
      date: "",
      praise_num: "",
      had_praise: "",
      praiseMembers: [],
    }, formState.formData);
    state.formState.parentformData = Object.assign({
      contentId: '',
      content: '',
      contentTitle: '',
      authorName: '',
      authorLogo: '',
      replyAuthorName: '',
      replyAuthorLogo: '',
      reportCount: '',
      relationMsgId: '',
      relationSecondMsgId: '',
      adminUser: {},
      utype: "",
      date: "",
      praise_num: "",
      had_praise: "",
      praiseMembers: [],
    }, formState.parentformData);
  },
  [types.CONTENTMESSAGE_LIST](state, messageOpenList) {
    state.messageOpenList = messageOpenList
  },
}

const actions = {

  showContentMessageOpenForm: ({
    commit
  }, params = {
    edit: false,
    formData: {},
    parentformData: {}
  }) => {
    commit(types.CONTENTMESSAGE_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData,
      parentformData: params.parentformData
    })
  },
  hideContentMessageOpenForm: ({
    commit
  }) => {
    commit(types.CONTENTMESSAGE_FORMSTATE, {
      show: false
    })
  },
  getContentMessageOpenList({
    commit
  }, params = {}) {
    contentMessageOpenList(params).then((result) => {
      commit(types.CONTENTMESSAGE_LIST, result.data)
    })
  },
  getOneContentMessageOpen({
    commit
  }, id) {
    getOneContentMessageOpen({
      id
    }).then((result) => {
      commit(types.CONTENTMESSAGE_FORMSTATE, result.data)
    })
  },
}

const getters = {
  openMessage: state => {
    return state.formState
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}