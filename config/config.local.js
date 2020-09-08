'use strict';
const path = require('path')
const isDocker = process.env.BUILD_ENV == 'docker' ? true : false;
const mongohost = isDocker ? 'mongodb' : '127.0.0.1:27017';
const mongobin = isDocker ? '' : '/Users/dora/Documents/dora/softs/mongodb/bin/';

module.exports = appInfo => {

    return {
        admin_root_path: 'http://localhost',
        // DEV_CONFIG_MODULES_BEGIN
        dev_modules: [
            // 'navbar',
            // 'dashboard',
            // 'adminGroup',
            // 'adminUser',
            // 'adminResource',
            // 'systemConfig',
            // 'backUpData',
            // 'systemOptionLog',
            // 'announce',
            // 'systemNotify',
            // 'ads',
            // 'contentTemp',
            // 'templateConfig',
            // 'versionManage',
            // 'content',
            // 'contentTags',
            // 'contentCategory',
            // 'contentMessage',
            // 'contentMessageOpen',
            // 'regUser',
            // 'helpCenter',
            // 'renderCms',
            // 'cmsTemplate',
            // 'plugin',
            // 'uploadFile',
            // 'mailTemplate',
            // 'mailDelivery',
        ],
        // DEV_CONFIG_MODULES_END
        mongoose: {
            client: {
        url: "mongodb://127.0.0.1:27017/doracms3",
                options: {
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                    keepAlive: 3000
                },
            },
        },
        // mongodb相关路径
        // 用于数据备份，以“/”结尾
        mongodb: {
        binPath: "/Users/zoujiawei6/program/mongodb-macos-x86_64-4.4.0/bin/",
            backUpPath: path.join(appInfo.baseDir, 'databak/')
        },
        static: {
            prefix: '/static',
            dir: [path.join(appInfo.baseDir, 'app/public'), path.join(appInfo.baseDir, 'backstage/dist')],
            maxAge: 31536000,
        },
        logger: {
            dir: path.join(appInfo.baseDir, 'logs'),
        },
        server_path: "http://127.0.0.1:8080",
        server_api: "http://127.0.0.1:8080/api",

    }
};