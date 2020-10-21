

var urlJoin = require('url-join');
export default class BaseApi{
    constructor(component) {
        this.baseUrl = process.env.REACT_APP_API_URL;
        this._component=component
    }
    makeUrl = (...args) => {
        var path = urlJoin(args)
        return urlJoin(this.baseUrl,path)
    }
    call = async (url, method, model) => {
        var access_token = undefined
        try {
            var strToken = localStorage.getItem('token')
            var token = JSON.parse(strToken)
            if (token && token.token) {
                access_token=token.token
            } else {
                access_token = null;
            }
            var headers = {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization:'Bearer '+ access_token
            }
            let request = {
                method: method,
                headers:headers
            }
            if (method === "POST" || method === "PUT" || "DELETE") {
                request.body=JSON.stringify(model)
            }

            let response = await fetch(url, request);
            if (!response.ok) {
                if (response.status === 401) {
                    // localStorage.removeItem("token")
                    // window.location.reload()
                } else if (response.status === 403) {
                    return {
                        message: "Bạn không có quyền thực hiện chức năng này!",
                        success: false
                    }
                }
            }

            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    execute_get = async url => {
        return await this.call(url, "GET");
    }
    execute_post = async (url, model) => {
        return await this.call(url, "POST", model);
    }
    execute_put = async (url, model) => {
        return await this.call(url, "PUT", model)
    }
    
    execute_delete = async (url, model) => {
        return await this.call(url, "DELETE", model)
    }
    
    getToken = () => {
        var token = localStorage.getItem("token")
        if (token === undefined) window.location.href = "/login"
        return JSON.parse(token);
    }
}