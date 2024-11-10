import axios from 'axios';

export const postGameStart = async (ssn: number, score: number) => {
  const response = await axios.post(
    `https://draw-o.kro.kr/api/v1/member/game-start`,
    {
      ssn,
      score,
    }
  );

  return response.data.data;
};
