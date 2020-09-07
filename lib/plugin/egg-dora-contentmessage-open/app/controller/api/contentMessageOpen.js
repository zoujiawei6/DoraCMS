const xss = require("xss");
const _ = require('lodash');
const shortid = require('shortid');
const { UTYPE } = require('../../utils/constants')
const {
    siteFunc,
} = require('../../utils');


let ContentMessageOpenController = {

    renderMessageOpen(ctx, userInfo = {}, messageOpens = []) {

        return new Promise(async (resolve, reject) => {
            try {

                let newMessageOpenArr = JSON.parse(JSON.stringify(messageOpens));
                for (const messageOpenItem of newMessageOpenArr) {

                    // let had_comment = false;
                    // let had_despises = false;
                    // let had_praise = false;
                    // if (!_.isEmpty(userInfo)) {
                    //     // 是否回复过
                    //     let myReplyRecord = await ctx.service.messageOpen.find({
                    //         isPaging: '0'
                    //     }, {
                    //         query: {
                    //             author: userInfo._id,
                    //             relationMsgId: messageOpenItem._id
                    //         }
                    //     });
                    //     if (myReplyRecord.length > 0) {
                    //         had_comment = true;
                    //     }
                    //     // 是否踩过
                    //     if (userInfo.despiseMessageOpen.indexOf(messageOpenItem._id) >= 0) {
                    //         had_despises = true;
                    //     }
                    //     // 是否赞过
                    //     if (userInfo.praiseMessageOpens.indexOf(messageOpenItem._id) >= 0) {
                    //         had_praise = true;
                    //     }
                    // }
                    // let praise_num = await ctx.service.user.count({
                    //     praiseMessageOpens: messageOpenItem._id
                    // });
                    // let despises_num = await ctx.service.user.count({
                    //     despiseMessageOpen: messageOpenItem._id
                    // });
                    // messageOpenItem.praise_num = praise_num;
                    // messageOpenItem.despises_num = despises_num;
                    // messageOpenItem.had_comment = had_comment;
                    // messageOpenItem.had_despises = had_despises;
                    // messageOpenItem.had_praise = had_praise;

                    let parentId = messageOpenItem._id;
                    let childMessageOpens = await ctx.service.messageOpen.find({
                        pageSize: 1024,
                        isPaging: '0'
                    }, {
                        query: {
                            relationMsgId: parentId
                        }
                    })
                    if (!_.isEmpty(childMessageOpens)) {
                        messageOpenItem.childMessageOpens = childMessageOpens;
                    } else {
                        messageOpenItem.childMessageOpens = [];
                    }
                    messageOpenItem.comment_num = await ctx.service.messageOpen.count({
                        relationMsgId: parentId
                    })

                }

                resolve(newMessageOpenArr);
            } catch (error) {
                resolve(messageOpens);
            }
        })
    },

    /**
     * @api {get} /api/contentMessageOpen/getMessageOpens 获取评论列表
     * @apiDescription 获取评论列表 带分页
     * @apiName /contentMessageOpen/getMessageOpens
     * @apiGroup ContentMessageOpen
     * @apiParam {string} current 当前页码
     * @apiParam {string} pageSize 每页记录数
     * @apiParam {string} authorName 获取指定游客的评论,传游客名称
     * @apiParam {string} contentId 获取指定文章的评论,传文档id
     * @apiParam {string} token 登录时返回的参数鉴权
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *{
     *  "status": 200,
     *  "messageOpen": "操作成功 messageOpen",
     *  "server_time": 1542899024811,
     *  "data": [
     *    {
     *  "_id": "tYVGV-HTL",
     *  "author": {
     *     "_id": "zwwdJvLmP",
     *     "userName": "doramart",
     *     "logo": "/upload/images/defaultlogo.png",
     *     "date": "2018-11-13 12:09:29",
     *     "enable": true,
     *     "id": "zwwdJvLmP"
     *   },
     *  "contentId": {
     *  "_id": "R8_iIMwF1",
     *  "title": "海底捞的致命缺点是什么？",
     *  "stitle": "海底捞的致命缺点是什么？",
     *  "updateDate": "2018-11-22",
     *  "date": "2018-11-22 23:03:44",
     *  "id": "R8_iIMwF1"
     *      },
     *  "__v": 0,
     *  "content": "这也是一条留言",
     *  "hasPraise": false,
     *  "praiseNum": 0,
     *  "date": "3 天前",
     *  "utype": "0",
     *  "id": "tYVGV-HTL"
     *    },
     *    {
     *  "_id": "4wv0tcLjH",
     *  "author": {
     *  "_id": "zwwdJvLmP",
     *  "userName": "doramart",
     *  "logo": "/upload/images/defaultlogo.png",
     *  "date": "2018-11-13 12:09:29",
     *  "enable": true,
     *  "id": "zwwdJvLmP"
     *      },
     *  "contentId": {
     *  "_id": "vGVoKV0g_",
     *  "title": "有哪一刹那让你对日本的美好印象瞬间破灭？",
     *  "stitle": "有哪一刹那让你对日本的美好印象瞬间破灭？",
     *  "updateDate": "2018-11-22",
     *  "date": "2018-11-22 23:03:44",
     *  "id": "vGVoKV0g_"
     *      },
     *  "__v": 0,
     *  "content": "这是一条留言",
     *  "hasPraise": false,
     *  "praiseNum": 0,
     *  "date": "3 天前",
     *  "utype": "0",
     *  "id": "4wv0tcLjH"
     *    }
     *  ]
     *}
     * @apiSampleRequest http://localhost:8080/api/contentMessageOpen/getMessageOpens
     * @apiVersion 1.0.0
     */
    async list(ctx, app) {

        try {

            let payload = ctx.query;
            let authorName = ctx.query.authorName;
            let contentId = ctx.query.contentId;
            let queryObj = {};

            if (authorName) {
                queryObj.author = authorName
            }

            if (contentId) {
                queryObj.contentId = contentId
            }

            let messageOpenList = await ctx.service.messageOpen.find(payload, {
                query: queryObj
            });

            // 游客无用户身份
            const userInfo = {}
            messageOpenList.docs = await this.renderMessageOpen(ctx, userInfo, messageOpenList.docs);

            ctx.helper.renderSuccess(ctx, {
                data: messageOpenList
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                messageOpen: err
            });

        }
    },


    /**
     * @api {post} /api/contentMessageOpen/postMessageOpens 帖子评论/留言
     * @apiDescription 帖子评论/留言
     * @apiName /contentMessageOpen/postMessageOpens
     * @apiGroup ContentMessageOpen
     * @apiParam {string} contentId 帖子ID
     * @apiParam {string} authorName 留言的游客名称（必填）
     * @apiParam {string} replyAuthorName 回复者名称 (二级留言必填)
     * @apiParam {string} relationMsgId 回复目标留言ID (二级留言必填)
     * @apiParam {string} content 评论内容
     * @apiParam {string} praise_num 点赞数
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *{
     *    "status": 200,
     *    "messageOpen": "操作成功！",
     *    "server_time": 1543372263586,
     *    "data": {}
     *}
     * @apiSampleRequest http://localhost:8080/api/contentMessageOpen/postMessageOpens
     * @apiVersion 1.0.0
     */
    async postMessageOpens(ctx, app) {


        try {

            let fields = ctx.request.body;

            let errMsg = '';
            if (!shortid.isValid(fields.contentId)) {
                errMsg = ctx.__("validate_messageOpen_add_err")
            }
            if (fields.content && (fields.content.length < 5 || fields.content.length > 200)) {
                errMsg = ctx.__("validate_rangelength", [ctx.__("label_messageOpens_content"), 5, 200])
            }
            if (!fields.content) {
                errMsg = ctx.__("validate_inputNull", [ctx.__("label_messageOpens_content")])
            }
            if (errMsg) {
                throw new Error(errMsg);
            }

            const messageOpenObj = {
                contentId: fields.contentId,
                content: xss(fields.content),
                authorName: fields.authorName,
                authorLogo: fields.authorLogo,
                replyAuthorName: fields.replyAuthorName,
                replyAuthorLogo: fields.replyAuthorLogo,
                relationMsgId: fields.relationMsgId,
                relationSecondMsgId: fields.relationSecondMsgId,
                praise_num: fields.praise_num,
                utype: fields.utype || UTYPE.TOURIST,
            }

            let targetMessageOpen = await ctx.service.messageOpen.create(messageOpenObj);

            // 给被回复用户发送提醒邮件
            // const contentInfo = await ctx.service.content.item(ctx, {
            //     query: {
            //         _id: fields.contentId
            //     }
            // })

            // 发送消息给客户端
            // let passiveUser = fields.replyAuthor ? fields.replyAuthor : contentInfo.uAuthor;
            // siteFunc.addSiteMessageOpen('3', ctx.session.user, passiveUser, targetMessageOpen._id, {
            //     targetMediaType: '1'
            // });

            let returnMessageOpen = await ctx.service.messageOpen.item(ctx, {
                query: {
                    _id: targetMessageOpen._id
                }
            })

            ctx.helper.renderSuccess(ctx, {
                data: returnMessageOpen
            });
        } catch (err) {

            ctx.helper.renderFail(ctx, {
                messageOpen: err
            });

        }

    },

    // likeMessage(ctx, app) {
    //     try {
    //         let id = ctx.request.body.id;
    //         let targetMessageOpen = await ctx.service.messageOpen.update(ctx, _id,formObj);
    //         let returnMessageOpen = await ctx.service.messageOpen.item(ctx, {
    //             query: {
    //                 _id: targetMessageOpen._id
    //             }
    //         })

    //         ctx.helper.renderSuccess(ctx, {
    //             messageOpen: 'success'
    //         });
    //     } catch (error) {
    //         ctx.helper.renderFail(ctx, {
    //             messageOpen: err
    //         });
    //     }
    // }


}

module.exports = ContentMessageOpenController;