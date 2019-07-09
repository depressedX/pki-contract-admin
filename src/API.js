import axios from 'axios'
import qs from 'qs'

export const $http = axios.create({
    baseURL: '/admin/',
    // baseURL: 'http://47.95.214.69:1002/admin/',

})

let token = null

$http.interceptors.request.use(config => {

    config.params = config.params || {}
    config.params.token = token
    return config

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
$http.interceptors.response.use(function (response) {
    let body = response.data
    if (body.status === 200) {
        return body.data
    } else {
        let e = new Error(body.message)
        e.status = body.status
        return Promise.reject(e)
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export function login(id, password) {

    const res = $http.post('login',qs.stringify({id,password}))
    res.then(data=>{
        token = data
    })
    return res
}

export function getUnauthorizedUsers() {
    return $http.get('unauthorizedUsers')
}

export function acceptUser(uid) {
    return $http.post(`unauthorizedUsers/${uid}/accept`)
}
export function declineUser(uid) {
    return $http.post(`unauthorizedUsers/${uid}/decline`)
}