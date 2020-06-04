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
      url: "/itemInventory/list",
      method: "get",
      params: parameter
    });
  },

  addrecord(parameter) {
    return request({
      url: "/itemInventory/add",
      method: "get",
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
      url: "/itemInventory/update",
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
