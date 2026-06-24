import {apiUrlBuilder, getEnvConfigs} from './httpHelpers';
import {apiConfigs} from '../_configs/apiConfs';

/*************************************************************
 * innolab-front - renders.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 2018-11-03 - 12:05
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/


export const renderView = (object, viewStructure) => {

  let stringifyStruct = JSON.stringify(viewStructure);

  stringifyStruct = stringifyStruct.replace(/__this(\.\w+)+/gi, (item) => {
    const keysMap = item.split('.').slice(1);

    let value = object;
    keysMap.forEach(key => {
      if (!value || !value[key]) {
        value = null;
      } else {
        value = value[key];
      }
    });
    return value;
  });

  stringifyStruct = stringifyStruct.replace(/"null"/gi, (item) => {
    return null;
  });

  stringifyStruct = stringifyStruct.replace(/\{\"join\":.+?\}/gi, (item) => {
    return JSON.stringify(JSON.parse(item).join.join(' '));
  });

  stringifyStruct = stringifyStruct.replace(/\{\"image\":.+?\}/gi, (item) => {
    return JSON.stringify(apiUrlBuilder(JSON.parse(item).image));
  });

  stringifyStruct = stringifyStruct.replace(/\"([^\"^\n^\r]*[\n\r]+[^\"^\n^\r]*)+\"/gi, (item) => {
    let title = '<div>';

    title += item.split(/[\n\r]/gi).map(element => {
      if (element) {
        return element.replace(/\[(.)*\]{1}\((.)*\){1}/gi, (match => {
          const linkRefMatcher = /\({1}(.*)\){1}/gi;
          const linkTextMatcher = /\[{1}(.*)\]{1}/gi;
          const linkText = linkTextMatcher.exec(match)[1];
          const linkRef = linkRefMatcher.exec(match)[1];
          return '<a href=\'' + linkRef + '\'>' + linkText + '</a>';
        }));
      }
    }).join('</div><div>');

    return JSON.stringify(title + '</div>').replace(/\\"/gi, () => '');
  });

  return JSON.parse(stringifyStruct);
};

export const renderApiHost = (object) => {

  const envConfigs = getEnvConfigs();
  const urlParts = [location.protocol, '//', location.hostname];
  if (envConfigs.port) {
    urlParts.push(':');
    urlParts.push(envConfigs.port);
  }

  return JSON.parse(JSON.stringify(object).replace(/dbs_api_host/gi, () => urlParts.join('')));
};
