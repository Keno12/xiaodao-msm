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
    }
};