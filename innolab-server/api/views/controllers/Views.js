'use strict';

/**
 * Views.js controller
 *
 * @description: A set of functions called "actions" for managing `Views`.
 */

module.exports = {

  /**
   * Retrieve views records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.views.search(ctx.query);
    } else {
      return strapi.services.views.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a views record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.views.fetch(ctx.params);
  },

  /**
   * Count views records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.views.count(ctx.query);
  },

  /**
   * Create a/an views record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.views.add(ctx.request.body);
  },

  /**
   * Update a/an views record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.views.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an views record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.views.remove(ctx.params);
  },

  /***********************  Customization  ***********************/

  initView: async(ctx, next) => {
    return strapi.services.views.initCustomView(ctx.params);
  }

};
