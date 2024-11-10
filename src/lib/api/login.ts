import axios from 'axios';

export const postLoginData = async (loginData: any) => {
  const response = await axios.post(
    'https://draw-o.kro.kr/api/v1/member/login',
    loginData
  );

  console.log('로그인 post', response.data.data);
  return response.data.data;
};
