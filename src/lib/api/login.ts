import axios from 'axios';

export const postLoginData = async (loginData: any) => {
  const response = await axios.post(
    'https://draw-o.kro.kr/api/v1/member/login',
    loginData
  );

  return response.data.data;
};

export const getMemberStatus = async (ssn: number) => {
  const response = await axios.get(
    `https://draw-o.kro.kr/api/v1/member/status?ssn=${ssn}`
  );

  return response.data.data;
};
