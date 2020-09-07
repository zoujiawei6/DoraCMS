/*
 * @Author: doramart 
 * @Date: 2019-09-25 14:16:44 
 * @Last Modified by:   doramart 
 * @Last Modified time: 2019-09-25 14:16:44 
 */


var siteFunc = {

    async addSiteMessageOpen(type = '', activeUser = '', passiveUser = '', content = '', params = {
        targetMediaType: '0',
        recordId: ''
    }) {

        try {
            const messageOpenObj = {
                type,
                activeUser: activeUser._id,
                passiveUser,
                recordId: params.recordId,
                isRead: false
            }

            if (params.targetMediaType == '0') {
                messageOpenObj.content = content;
            } else if (params.targetMediaType == '1') {
                messageOpenObj.messageOpen = content;
            } else if (params.targetMediaType == '2') {
                messageOpenObj.communityContent = content;
            } else if (params.targetMediaType == '3') {
                messageOpenObj.communityMessageOpen = content;
            }

            // const {
            //     siteMessageOpenService
            // } = require('@service');
            // await siteMessageOpenService.create(messageOpenObj);

        } catch (error) {
            // logUtil.error(error, {});
        }
    },
};
module.exports = siteFunc;