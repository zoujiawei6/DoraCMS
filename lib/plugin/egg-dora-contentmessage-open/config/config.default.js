'use strict'

/**
 * egg-dora-contentmessage-open default config
 * @member Config#eggDoraContentMessageOpen
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require('../package.json');
exports.doraContentMessageOpen = {
    alias: 'contentMessageOpen', // 插件目录，必须为英文
    pkgName: 'egg-dora-contentmessage-open', // 插件包名
    enName: 'doraContentMessageOpen', // 插件名
    name: '开放留言', // 插件名称
    description: '开放留言管理，无需登录即可评论', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
    isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
    version: pkgInfo.version, // 版本号
    iconName: 'icon_service', // 主菜单图标名称
    adminUrl: '/contentMessageOpen/js/app.js', adminApi: [{
        url: 'contentMessageOpen/getList', method: 'get',
        controllerName: 'list',
        details: '获取留言列表',
    }, {
        url: 'contentMessageOpen/getOne', method: 'get',
        controllerName: 'getOne',
        details: '获取单条留言信息',
    }, {
        url: 'contentMessageOpen/addOne', method: 'post',
        controllerName: 'create',
        details: '添加单个留言',
    }, {
        url: 'contentMessageOpen/updateOne', method: 'post',
        controllerName: 'update',
        details: '更新单个留言',
    }, {
        url: 'contentMessageOpen/deleteMessageOpen', method: 'get',
        controllerName: 'removes',
        details: '删除留言',
    }],
    fontApi: [{
        url: 'contentMessageOpen/postMessageOpens', method: 'post',
        controllerName: 'postMessageOpens',
        details: '发表留言'
    }, {
        url: 'contentMessageOpen/getMessageOpens', method: 'get',
        controllerName: 'list',
        details: '获取留言列表',
    }],

    initData: '', // 初始化数据脚本
    pluginsConfig: ` 
    module.exports = {\n
        enable: true,\n        package: 'egg-dora-contentmessage-open',
    };\n
    `, // 插入到 plugins.js 中的配置
    defaultConfig: `
    module.exports = {\n
        match: [ctx => ctx.path.startsWith('/manage/contentMessageOpen'),ctx => ctx.path.startsWith('/api/contentMessageOpen')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
}