import qs from 'qs';
import _ from 'lodash';
import Axios from 'axios';
import {
  notification
} from 'antd';

const reqConfig = {
  withCredentials: true
};

const Request = Axios.create(reqConfig);

function fetch(method, url, data, inConfig = false) {
  let cancel = () => {};
  const cancelToken = new Axios.CancelToken((c) => {
    cancel = c;
  });

  const promise = (inConfig
    ? Request[method](url, {
      params: data,
      cancelToken
    })
    : Request[method](url, data, {
      cancelToken
    })
  );

  return {
    promise,
    cancel
  };
}

function get(url, data) {
  return fetch('get', url, data, true);
}

function post(url, data) {
  return fetch('post', url, data, false);
}

function put(url, data) {
  return fetch('put', url, data, false);
}

function patch(url, data) {
  return fetch('patch', url, data, false);
}

function del(url, data) {
  return fetch('delete', url, data, true);
}

function throwReqError(resp) {
  const error = new Error(resp.statusText);
  error.resp = resp;
  return Promise.reject(error);
}

function checkStatus(resp) {
  if ((resp.status >= 200) && (resp.status < 300)) {
    return resp;
  }

  notification.error({
    message: `请求错误 ${resp.status}: ${resp.url}`,
    description: resp.statusText
  });

  return throwReqError(resp);
}

function throwSrvError(data) {
  const error = new Error(data.msg);
  error.srv = data;
  return Promise.reject(error);
}

function checkCode(data) {
  if (data && (data.code !== 0)) {
    return throwSrvError(data);
  }

  return data;
}

function handleReqError(err) {
  if (Axios.isCancel(err)) {
    console.warn('Request canceled', err.message);
  }

  throw err;
}

function handleRequest(req) {
  return {
    ...req,
    promise: req.promise
      .then(checkStatus)
      .then(resp => resp.data)
      .then(checkCode)
      .catch(handleReqError)
  };
}

export function getJson(url, data) {
  const _data = data ? _.cloneDeep(data) : {};
  _data._t_ = _.now();
  return handleRequest(get(url, _data));
}

export function postJson(url, data) {
  return handleRequest(post(url, data));
}

export function postForm(url, data) {
  return handleRequest(post(url, qs.stringify(data)));
}

export function putJson(url, data) {
  return handleRequest(put(url, data));
}

export function patchJson(url, data) {
  return handleRequest(patch(url, data));
}

export function deleteJson(url, data) {
  const _data = data ? _.cloneDeep(data) : {};
  _data._t_ = _.now();
  return handleRequest(del(url, _data));
}
