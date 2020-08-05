import axios from 'axios'
// import qs from 'qs'
axios.defaults.baseURL = 'http://192.168.0.108:8000/'  //根据项目自己更改
//一些配置，发起请求和响应可以打印出来查看
axios.interceptors.request.use((config) => {
    //如果项目中有将token绑定在请求数据的头部，服务器可以有选择的返回数据，只对有效的请求返回数据，这样写
    //这里是用户登录的时候，将token写入了sessionStorage中了，之后进行其他的接口操作时，进行身份验证。
    config.headers.Authorization = window.sessionStorage.getItem("token");
    console.log(config)
    return config;
})
//在response中
axios.interceptors.response.use(config => {
    console.log(config)
    return config;
})

const http = {
    post: '',
    get: '',
    put: '',
    del: ''
}

http.post = function (api, data) {
    //let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.post(api, data).then(response => {
            resolve(response)
        })
    })
}

http.get = function (api, data) {
    //let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.get(api, data).then(response => {
            resolve(response)
        })
    })
}

http.delete = function (api, data) {
    return new Promise((resolve, reject) => {
        axios.delete(api, data).then(response => {
            resolve(response)
        })
    })
}

http.put = function (api, data) {
    return new Promise((resolve, reject) => {
        axios.put(api, data).then(response => {
            resolve(response)
        })
    })
}

export default http
