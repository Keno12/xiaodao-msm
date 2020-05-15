import request from "@/utils/request";

export default {
  getList() {
    return request({
      url: "/supplier/list",
      method: "get"
    });
  },
  search(page, size, searchMap) {
    return request({
      url: `/supplier/list/search/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  },
  // 新增
  add(pojo) {
    return request({
      url: "/supplier",
      method: "post",
      data: pojo
    });
  },
  getById(id) {
    return request({
      url: `/supplier/${id}`, // 反单引号 ``
      method: "get"
    });
  },
  update(pojo) {
    return request({
      url: `/supplier/${pojo.id}`,
      method: "put",
      data: pojo
    });
  },
  deleteById(id) {
    return request({
      url: "/member/${id}",
      method: "delete"
    });
  }
};
