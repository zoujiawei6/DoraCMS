const _ = require('lodash');
const contentMessageOpenAdminController = require('../controller/manage/contentMessageOpen')
const contentMessageOpenApiController = require('../controller/api/contentMessageOpen')

module.exports = (options, app) => {

    return async function contentMessageOpenRouter(ctx, next) {

        let pluginConfig = app.config.doraContentMessageOpen;
        await app.initPluginRouter(ctx, pluginConfig, contentMessageOpenAdminController, contentMessageOpenApiController);
        await next();

    }

}