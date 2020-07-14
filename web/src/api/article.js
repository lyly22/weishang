import { Service } from "../js/request.js";
export function getList(params) {
  return Service({
    url: "/articles",
    method: "get",
    params
  });
}
export function getDetail(params) {
  return Service({
    url: "/article",
    method: "get",
    params
  });
}
export function delBlog(params) {
  return Service({
    url: "/delBlog",
    data: params
  });
}
export function create(params) {
  return Service({
    url: "/create",
    data: params
  });
}
export function toTop(params) {
  return Service({
    url: "/toTop",
    method: "get",
    params
  });
}
export function upload(params) {
  return Service({
    url: "/upload",
    data: params
  });
}
export function uploads(params) {
  return Service({
    url: "/uploads",
    data: params
  });
}
export function getVip(params) {
  return Service({
    url: "/getVip",
    method: "get",
    params
  });
}
export function indexList(params) {
  return Service({
    url: "/indexList",
    method: "get",
    params
  });
}
