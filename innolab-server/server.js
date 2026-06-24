#!/usr/bin/env node
'use strict';

/**
 * Use `server.js` to run your application without `$ strapi start`.
 * To start the server, run: `$ npm start`.
 *
 * This is handy in situations where the Strapi CLI is not relevant or useful.
 */

process.chdir(__dirname);

// Some transitive dependencies now import built-in modules with the `node:`
// prefix. Node 10 does not support that prefix, so normalize it before Strapi
// loads the dependency tree.
const Module = require('module');
const originalLoad = Module._load;

Module._load = function loadWithNodePrefixCompat(request, parent, isMain) {
  if (typeof request === 'string' && request.indexOf('node:') === 0) {
    return originalLoad.call(this, request.slice(5), parent, isMain);
  }

  return originalLoad.call(this, request, parent, isMain);
};

(() => {
  const strapi = require('strapi');
  strapi.start();
})();
