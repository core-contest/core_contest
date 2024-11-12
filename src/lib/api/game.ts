import axios from 'axios';

export const postGameStart = async (
  ssn: number,
  score: number,
  imageFile: File
) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post(
    `https://draw-o.kro.kr/api/v1/member/game-start?ssn=${ssn}&score=${score}`,
    formData
  );

  return response.data.data;
};
