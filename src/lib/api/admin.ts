import axios from "axios";

export const getUserList = () => {
    return axios.get('https://draw-o.kro.kr/api/v1/member/all-user')
};
