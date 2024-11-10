import axios from 'axios';

export const postLoginData = (loginData: any) => {
  axios
    .post('https://draw-o.kro.kr/api/v1/member/login', loginData)
    .then((res) => {
      console.log('로그인 post', res);
    });
};

export const getMemberStatus = (ssn: number) => {
    return axios.get(`https://draw-o.kro.kr/api/v1/member/status?ssn=${ssn}`)

};
