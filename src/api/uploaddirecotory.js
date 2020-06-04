import request from "../utils/request";

export default {
  /*search(parameter, data) {
    return request({
      url: "/inventory/search",
      method: "post",
      params: parameter,
      data: data,
      headers: { "Content-Type": "application/json" }
    });
  }*/

  search(parameter) {
    return request({
      url: "/documenData/getDirectory",
      method: "get",
      params: parameter
    });
  },

  add(parameter) {
    return request({
      url: "/spaceData/add",
      method: "post",
      header: {
        "Content-Type": "application/json"
      },
      params: parameter
    });
  }
};
