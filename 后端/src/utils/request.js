import axios from 'axios'
import { Message } from 'element-ui';
const service = axios.create({
  timeout: 15000, // request timeout
});
// 请求拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != 200) {
      Message(res.message);
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
