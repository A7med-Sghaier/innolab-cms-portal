'use strict';

/**
 * Studies.js controller
 *
 * @description: A set of functions called "actions" for managing `Studies`.
 */

module.exports = {

  /**
   * Retrieve studies records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.studies.search(ctx.query);
    } else {
      return strapi.services.studies.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a studies record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.studies.fetch(ctx.params);
  },

  /**
   * Count studies records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.studies.count(ctx.query);
  },

  /**
   * Create a/an studies record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.studies.add(ctx.request.body);
  },

  /**
   * Update a/an studies record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.studies.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an studies record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.studies.remove(ctx.params);
  }
};
