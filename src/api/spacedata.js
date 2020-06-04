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
      url: "/spaceData/list",
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
  },

  modify(
    bsm,
    itemname,
    type,
    year,
    commitmentdept,
    owner,
    datamanger,
    director,
    remark
  ) {
    return request({
      url: "/documenData/list",
      method: "post",
      header: {
        "Content-Type": "application/json"
      },
      params: {
        bsm,
        itemname,
        type,
        year,
        commitmentdept,
        owner,
        datamanger,
        director,
        remark
      }
      // headers: { "Content-Type": "application/json" },
    });
  }
};
