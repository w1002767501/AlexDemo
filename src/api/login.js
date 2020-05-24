import axios from "../utils/request";
// 验证码
const getCode = sid => {
  return axios.get("/getCaptcha", {
    params: {
      sid: sid
    }
  });
};

// 忘记密码
const forget = option => {
  return axios.post("/forget", {
    ...option
  });
};
export { getCode, forget };
