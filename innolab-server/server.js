#!/usr/bin/env node
'use strict';

/**
 * Use `server.js` to run your application without `$ strapi start`.
 * To start the server, run: `$ npm start`.
 *
 * This is handy in situations where the Strapi CLI is not relevant or useful.
 */

process.chdir(__dirname);

// Some modern transitive dependencies use APIs/syntax that Node 10 cannot load.
// Normalize `node:` built-in imports and provide a minimal `undici` placeholder
// for packages that only expose optional remote-fetch helpers during startup.
const Module = require('module');
const originalLoad = Module._load;
const undiciCompat = {
  fetch: function unsupportedFetch() {
    return Promise.reject(new Error('undici fetch is not available in this Node 10 runtime.'));
  },
  request: function unsupportedRequest() {
    return Promise.reject(new Error('undici request is not available in this Node 10 runtime.'));
  },
  stream: function unsupportedStream() {
    return Promise.reject(new Error('undici stream is not available in this Node 10 runtime.'));
  },
  Headers: global.Headers || function Headers() {},
  Request: global.Request || function Request() {},
  Response: global.Response || function Response() {},
  FormData: global.FormData || function FormData() {},
  File: global.File || function File() {},
  Blob: global.Blob || function Blob() {}
};

Module._load = function loadWithNode10Compat(request, parent, isMain) {
  if (request === 'undici') {
    return undiciCompat;
  }

  if (typeof request === 'string' && request.indexOf('node:') === 0) {
    return originalLoad.call(this, request.slice(5), parent, isMain);
  }

  return originalLoad.call(this, request, parent, isMain);
};

(() => {
  const strapi = require('strapi');
  strapi.start();
})();
