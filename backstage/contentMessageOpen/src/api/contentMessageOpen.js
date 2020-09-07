import request from '@root/publicMethods/request'

export function contentMessageOpenList(params) {
  return request({
    url: '/manage/contentMessageOpen/getList',
    params,
    method: 'get'
  })
}

export function getOneContentMessageOpen(params) {
  return request({
    url: '/manage/contentMessageOpen/getOne',
    params,
    method: 'get'
  })
}

export function addContentMessageOpen(data) {
  return request({
    url: '/manage/contentMessageOpen/postMessageOpens',
    data,
    method: 'post'
  })
}

export function addOneContentMessageOpen(data) {
  return request({
    url: '/manage/contentMessageOpen/addOne',
    data,
    method: 'post'
  })
}

export function updateOneContentMessageOpen(data) {
  return request({
    url: '/manage/contentMessageOpen/updateOne',
    data,
    method: 'post'
  })
}


export function deleteContentMessageOpen(params) {
  return request({
    url: '/manage/contentMessageOpen/deleteMessageOpen',
    params,
    method: 'get'
  })
}

export function getOneContent(params) {
  return request({
    url: '/manage/content/getContent',
    params,
    method: 'get'
  })
}

export function regUserList(params) {
  return request({
    url: '/manage/regUser/getList',
    method: 'get',
    params
  })
}