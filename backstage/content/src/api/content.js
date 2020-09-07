import request from '@root/publicMethods/request'
import * as urls from '@/api/urls'

export function redictContentToUsers(data) {
  return request({
    url: urls.REDICT_CONTENT_TO_USERS,
    data,
    method: 'post'
  })
}

export function updateContentEditor(data) {
  return request({
    url: urls.UPDATE_CONTENT_EDITOR,
    data,
    method: 'post'
  })
}

export function contentList(params) {
  return request({
    url: urls.CONTENT_LIST,
    params,
    method: 'get'
  })
}

export function getOneContent(params) {
  return request({
    url: urls.GET_ONE_CONTENT,
    params,
    method: 'get'
  })
}

export function addContent(data) {
  return request({
    url: urls.ADD_CONTENT,
    data,
    method: 'post'
  })
}

export function updateContent(data) {
  return request({
    url: urls.UPDATE_CONTENT,
    data,
    method: 'post'
  })
}

export function updateManyContent(data) {
  return request({
    url: urls.UPDATE_MANY_CONTENT,
    data,
    method: 'post'
  })
}

export function updateContentToTop(data) {
  return request({
    url: urls.UPDATE_CONTENT_TO_TOP,
    data,
    method: 'post'
  })
}

export function roofContent(data) {
  return request({
    url: urls.ROOF_CONTENT,
    data,
    method: 'post'
  })
}

export function deleteContent(params) {
  return request({
    url: urls.DELETE_CONTENT,
    params,
    method: 'get'
  })
}

export function getRandomContentImg(params) {
  return request({
    url: urls.GET_RANDOM_CONTENT_IMG,
    params,
    method: 'get'
  })
}

export function regUserList(params) {
  return request({
    url: urls.REG_USER_LIST,
    params,
    method: 'get'
  })
}

export function moveContentCate(data) {
  return request({
    url: urls.MOVE_CONTENT_CATE,
    data,
    method: 'post'
  })
}

export function uploadCover(data) {
  return request({
    url: urls.UPLOAD_COVER,
    data,
    method: 'post'
  })
}

export function coverList(params) {
  return request({
    url: urls.COVER_LIST,
    params,
    method: 'get'
  })
}

export function coverInfo(params) {
  return request({
    url: urls.COVER_INFO,
    params,
    method: 'get'
  })
}

export function contentCoverTypeList(params) {
  return request({
    url: urls.CONTENT_COVER_TYPE_LIST,
    params,
    method: 'get'
  })
}
