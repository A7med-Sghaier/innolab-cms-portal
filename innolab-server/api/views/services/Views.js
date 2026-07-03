'use strict';

/**
 * Views.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all views.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('views', params);
    // Select field to populate.
    const populate = Views.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Views
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an views.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Views.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Views
      .findOne(_.pick(params, _.keys(Views.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count views.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('views', params);

    return Views
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an views.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Views.associations.map(ast => ast.alias));
    const data = _.omit(values, Views.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Views.create(data);

    // Create relational data and return the entry.
    return Views.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an views.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Views.associations.map(a => a.alias));
    const data = _.omit(values, Views.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Views.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Views.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an views.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Views.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Views
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Views.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an views.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('views', params);
    // Select field to populate.
    const populate = Views.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Views.attributes).reduce((acc, curr) => {
      switch (Views.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Views
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /***********************  Customization  ***********************/

  initCustomView: async (params) => {
    const populate = Views.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const resolvers = [];
    const view = await Views
      .findOne(_.pick(params, _.keys(Views.schema.paths)))
      .populate(populate);

    if (!view) {
      return {
        key: params && params.key ? params.key : '',
        label: params && params.key ? params.key : '',
        items: [],
        required_views: []
      };
    }

    let dbsView = JSON.parse(JSON.stringify(view));
    dbsView['required_views'] = [];
    dbsView.items = Array.isArray(dbsView.items) ? dbsView.items : [];

    dbsView.items.forEach((item, itemIndex) => {
      if (item.hide) {
        delete dbsView.items[itemIndex];
        return;
      }

      strapi.services['views'].insertData(dbsView, resolvers, item);
      /**
      if (item.subItems && item.subItems.items) {
        item.subItems.items.forEach((subItem, subItemIndex) => {
          if(subItem.view) {
            strapi.services['views'].addRequiredView(dbsView.required_views, subItem.view, resolvers);
          }

          if (subItem.apiModel && subItem.apiModel.key && strapi.services[subItem.apiModel.key]) {
            resolvers.push( strapi.services[subItem.apiModel.key]
              .fetchAll(subItem.apiModel && subItem.apiModel.filter ? subItem.apiModel.filter : {})
              .then( data => {
                return dbsView.items[itemIndex].subItems.items[subItemIndex]['data'] = data;
              })
            );
          }
        });
      }
      */
    });

    return new Promise((resolve, reject) => {
      Promise.all(resolvers)
        .then( () => {
          dbsView.items = dbsView.items.filter(item => item);
          resolve(dbsView);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  insertData: (mainView, resolvers, target) => {
    if(target.componentView) {
        strapi.services['views'].addRequiredView(mainView.required_views, target.componentView, resolvers);
    }

    if (target.dataModel && target.dataModel.key && strapi.services[target.dataModel.key]) {
      resolvers.push( strapi.services[target.dataModel.key]
          .fetchAll(target.dataModel && target.dataModel.filter ? target.dataModel.filter : {})
          .then( data => {
            if (target.componentView && target.componentView.group) {
              data = strapi.services['views'].sortDataBy(target.componentView.group.by, data);
              let group = {}

              data.forEach( item => {
                const groupName = strapi.services['views'].extractGroupTitle(target.componentView.group.by, item);
                if (!group[groupName]) {
                  group[groupName] = [];
                }
                group[groupName].push(item);
              });

              data = {group: group};
            }

            return target['data'] = data;
          })
      );
    }

    if (target.subItems && target.subItems.items) {
      target.subItems.items.forEach((subItem, subItemIndex) => {
        if (subItem.hide) {
          delete target.subItems.items[subItemIndex];
          return;
        }

        strapi.services['views'].insertData(mainView, resolvers, subItem);
      });
    }
  },

  addRequiredView: (requiredViews, view, resolvers) => {
    requiredViews.push(view.key);
    resolvers.push( strapi.services['views'].initCustomView({key: view.key})
      .then( data => {
        view['items'] = data.items;
      })
    );
  },

  sortDataBy: (attribute, data) => {
    return data.sort((item1, item2) => {
      const d1 = strapi.services['views'].extractGroupTitle(attribute, item1);
      const d2 = strapi.services['views'].extractGroupTitle(attribute, item2);
      return d1.localeCompare(d2);
    });
  },

  extractGroupTitle: (attribute, item) => {
    if (!attribute.includes('.')) {
      return item[attribute];
    }

    let nextAttribute = attribute.split('.')[0];
    attribute = attribute.substring(attribute.indexOf('.') + 1);
    return strapi.services['views'].extractGroupTitle(attribute, item[nextAttribute]);
  }
};
