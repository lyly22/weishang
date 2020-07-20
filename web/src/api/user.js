import { Service } from "../js/request.js";
import qs from "qs";
export function login(params) {
  return Service({
    url: "/login",
    data: params
  });
}
export function register(params) {
  return Service({
    url: "/register",
    data: params
  });
}
export function getUserList(params) {
  return Service({
    url: "/getUserList",
    method: "get",
    params
  });
}

export function updateJifen(params) {
  return Service({
    url: "/updateJifen",
    data: params
  });
}

export function getUserDetail(params) {
  return Service({
    url: "/getUserDetail",
    method: "get",
    params
  });
}