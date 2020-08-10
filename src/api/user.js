import request from "../utils/request";

/*export function login(parameter, data) {
  return request({
    url: "/auth/login",
    method: "post",
    params: parameter,
    data: data
  });
}*/

export default {
  login(parameter, data) {
    return request({
      url: "/acount/login",
      method: "post",
      header: {
        "Content-Type": "application/json"
      },
      params: parameter,
      data: data
    });
  },

  menu() {
    return request({
      url: "menu",
      method: "get"
    });
  }
};
