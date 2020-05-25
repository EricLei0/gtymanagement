import request from "../utils/request";

export default {
  /*search(parameter, data) {
    return request({
      url: "/information/contacts",
      method: "post",
      params: parameter,
      data: data,
      headers: { "Content-Type": "application/json" }
    });
  }*/
  search(parameter) {
    return request({
      url: "/addressBook/list",
      method: "get",
      params: parameter
    });
  }
};
