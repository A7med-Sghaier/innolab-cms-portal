/*************************************************************
 * innolab-front - httpHelpers.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 21.10.18 - 15:57
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/
import {apiConfigs} from '../_configs/apiConfs';

const HOST_NAME = location.hostname;
const PROTOCOL  = location.protocol;

export const apiUrlBuilder = (target?: string) => {
  if (!target) {
    return '';
  }

  const urlParts = [PROTOCOL, '//', HOST_NAME];
  const envConfigs = getEnvConfigs();

  if (envConfigs.port) {
    urlParts.push(':');
    urlParts.push(envConfigs.port);
  }

  if (target) {
    urlParts.push('/');
    urlParts.push(target);
  }

  return urlParts.join('');
};

export const urlParamsBuilder = (path: string, params?: any) => {
  let url = path;

  if (!params) {
    return url;
  }

  Object.keys(params).forEach( (key, index) => {
    if (index === 0) {
      url += '?';
    } else {
      url += '&';
    }
    url += key;
    url += '=';
    url += params[key];
  });

  return url;
}

export const getEnvConfigs = (): any => {
  if ( HOST_NAME === 'localhost') {
    return apiConfigs.devEnv;
  }

  return apiConfigs.prodEnv;
};
