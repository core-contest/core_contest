import axios from 'axios';

export const getBonusChance = (ssn: number, admin: number) => {
    return axios.get(`https://draw-o.kro.kr/api/v1/member/bonus?ssn=${ssn}&admin=${admin}`)

};
export const getRankList = (ssn: number) => {
    return axios.get(`https://draw-o.kro.kr/api/v1/rank/show/${ssn}`)
};
