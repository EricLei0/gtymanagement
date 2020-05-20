import request from "../utils/request";

export default {
  search(parameter, data) {
    return request({
      url: "/inventory/search",
      method: "post",
      params: parameter,
      data: data,
      headers: { "Content-Type": "application/json" }
    });
  }
};
