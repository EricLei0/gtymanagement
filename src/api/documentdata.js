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
      url: "/documenData/list",
      method: "get",
      params: parameter
    });
  },

  searchdirectory(parameter) {
    return request({
      url: "/documenData/getDirectory",
      method: "get",
      params: parameter
    });
  },

  add(parameter) {
    return request({
      url: "/documenData/add",
      method: "post",
      header: {
        "Content-Type": "application/json"
      },
      params: parameter
    });
  },

  modify(
    bsm,
    name,
    city,
    type,
    provideCmpy,
    provideDept,
    provider,
    phone,
    dataFormat,
    collectTime,
    collectPerson,
    path,
    belongItem,
    validaty,
    remark
  ) {
    return request({
      url: "/documenData/update",
      method: "post",
      header: {
        "Content-Type": "application/json"
      },
      params: {
        bsm,
        name,
        city,
        type,
        provideCmpy,
        provideDept,
        provider,
        phone,
        dataFormat,
        collectTime,
        collectPerson,
        path,
        belongItem,
        validaty,
        remark
      }
      // headers: { "Content-Type": "application/json" },
    });
  }
};
