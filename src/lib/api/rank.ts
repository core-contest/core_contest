import axios from 'axios';

export const getBonusChance = (ssn: number, admin: number) => {
    axios
        .get(`https://draw-o.kro.kr/api/v1/member/bonus?ssn=${ssn}&admin=${admin}`)
        .then((res) => {
            console.log('보너스 기회 제공 get', res);
        });
};
export const getRankList = (ssn: number) => {
    return axios.get(`https://draw-o.kro.kr/api/v1/rank/show/${ssn}`)
};
