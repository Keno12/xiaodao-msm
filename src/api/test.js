// @ 代表的是 /src
// import axios from '@/utils/request'
import request from "@/utils/request";

const BASE_URL = ''

export default {
    getList() {
        const req = request({
            url: BASE_URL + "/db.json",
            method: "get"
        });
        return req;
    }
}