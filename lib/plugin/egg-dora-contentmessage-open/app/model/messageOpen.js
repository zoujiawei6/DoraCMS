const { UTYPE } = require('../utils/constants')

/**
 * Created by Administrator on 2015/4/15.
 * 留言管理
 */
module.exports = app => {
    const mongoose = app.mongoose
    var shortid = require('shortid');
    var Schema = mongoose.Schema;
    var moment = require('moment')

    var MessageOpenSchema = new Schema({
        _id: {
            type: String,

            'default': shortid.generate
        },
        contentId: {
            type: String,
            ref: 'Content'
        }, // 留言对应的内容ID
        contentTitle: String, // 留言对应的内容标题
        authorName: String, // 留言者名称，同名游客被视作同一人
        authorLogo: String, // 留言者头像。地址（相对地址也可以）
        replyAuthorName: String, // 被回复者名称，同名游客被视作同一人
        replyAuthorLogo: String, // 被回复者头像。地址（相对地址也可以）
        reportCount: Number, // 被举报次数
        relationMsgId: String, // 关联的一级留言Id
        relationSecondMsgId: String, // 关联的二级留言Id
        adminUser: {
            type: String,
            ref: 'AdminUser'
        }, // 审核留言的管理员
        utype: {
            type: String,
            default: UTYPE.TOURIST
        }, // 评论者类型 0,普通用户，1,管理员，2,游客
        date: {
            type: Date,
            default: Date.now
        }, // 留言时间
        praise_num: {
            type: Number,
            default: 0
        }, // 被赞次数
        // had_praise: {
        //     type: Boolean,
        //     default: false
        // }, //  当前是否已被点赞
        praiseMembers: String, // 点赞用户id集合
        content: {
            type: String,
            default: "默默留下脚印"
        } // 留言内容
    });

    MessageOpenSchema.index({
        contentId: 1
    }); // 添加索引

    MessageOpenSchema.set('toJSON', {
        getters: true,
        virtuals: true
    });
    MessageOpenSchema.set('toObject', {
        getters: true,
        virtuals: true
    });

    MessageOpenSchema.path('date').get(function (v) {
        return moment(v).format("YYYY-MM-DD HH:mm:ss");
    });

    return mongoose.model("MessageOpen", MessageOpenSchema, 'messageOpens');

}