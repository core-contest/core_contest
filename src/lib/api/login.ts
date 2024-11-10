import axios from "axios";

export const postLoginData = (loginData) => {
    axios.post('https://draw-o.kro.kr/api/v1/member/login', loginData).then((res) => {
        console.log('로그인 post', res)
    })
}
