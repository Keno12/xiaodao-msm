import request from "@/utils/request";
export default {
    // 获取会员列表
    getList() {
        return request({
            url: "/member/list",
            method: "get"
        });
    },

    search(page, size, searchMap) {
        return request({
            url: `/member/list/search/${page}/${size}`,
            method: "post",
            data: searchMap
        });
    },
    add(pojo) {
        return request({
            url: "/member",
            method: "post",
            data: pojo
        });
    }
};