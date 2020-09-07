const xss = require("xss");
const _ = require('lodash');
const { update } = require("lodash");
const { UTYPE } = require('../../utils/constants');

// const {
//     siteFunc,
// } = require('../../utils');

const messageOpenRule = (ctx) => {
    return {
        content: {
            type: "string",
            required: true,
            min: 5,
            max: 200,
            message: ctx.__("validate_rangelength", [ctx.__("label_messageOpens_content"), 5, 200])
        }
    }
}

let ContentMessageOpenController = {

    async list(ctx, app) {

        try {

            let payload = ctx.query;

            let messageOpenList = await ctx.service.messageOpen.find(payload, {
                searchKeys: ['content']
            });

            ctx.helper.renderSuccess(ctx, {
                data: messageOpenList
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                messageOpen: err
            });

        }
    },

    async create(ctx, app) {


        try {

            let fields = ctx.request.body || {};
            // if (_.isEmpty(ctx.session.user) && _.isEmpty(ctx.session.adminUserInfo)) {
            //     throw new Error(ctx.__("validate_error_params"))
            // }

            const formObj = {
                contentId: fields.contentId,
                content: xss(fields.content),
                authorName: fields.authorName,
                authorLogo: fields.authorLogo,
                replyAuthorName: fields.replyAuthorName,
                replyAuthorLogo: fields.replyAuthorLogo,
                relationMsgId: fields.relationMsgId,
                relationSecondMsgId: fields.relationSecondMsgId,
                praise_num: fields.praise_num,
                // 通过开放评论的留言一定是游客身份
                utype: fields.utype || UTYPE.TOURIST,
            }


            ctx.validate(messageOpenRule(ctx), formObj);

            let targetMessageOpen = await ctx.service.messageOpen.create(formObj);


            // 发送消息给客户端
            // let contentInfo = await ctx.service.content.item(ctx, {
            //     query: {
            //         _id: fields.contentId
            //     },
            //     files: 'uAuthor'
            // });
            // TODO 留言默认给审核通过。此功能似乎未完成
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

    async update(ctx, app) {


        try {

            let fields = ctx.request.body || {};
            let _id = fields.id;

            const formObj = {
                content: xss(fields.content),
                authorName: fields.authorName,
                authorLogo: fields.authorLogo,
                replyAuthorName: fields.replyAuthorName,
                replyAuthorLogo: fields.replyAuthorLogo,
                relationMsgId: fields.relationMsgId,
                relationSecondMsgId: fields.relationSecondMsgId,
                praise_num: fields.praise_num,
            }


            ctx.validate(messageOpenRule(ctx), formObj);

            let targetMessageOpen = await ctx.service.messageOpen.update(ctx, _id,formObj);
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



    async getOne(ctx, app) {

        try {
            let _id = ctx.query.id;

            let targetItem = await ctx.service.messageOpen.item(ctx, {
                query: {
                    _id: _id
                }
            });

            ctx.helper.renderSuccess(ctx, {
                data: targetItem
            });

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                messageOpen: err
            });
        }

    },



    async removes(ctx, app) {

        try {
            let targetIds = ctx.query.ids;
            await ctx.service.messageOpen.removes(ctx, targetIds);
            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                messageOpen: err
            });
        }
    }

}

module.exports = ContentMessageOpenController;