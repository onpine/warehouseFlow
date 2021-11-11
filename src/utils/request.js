import Taro from "@tarojs/taro";

const BaseUrl = "http://localhost:3000";

class Request {
  fetch = (method, url, data) =>
    new Promise((resolve, reject) => {
      Taro.request({
        url: BaseUrl + url, //仅为示例，并非真实的接口地址
        data: data,
        method: method,
        header: {
          "content-type": "application/json", // 默认值
        },
        success: function (res) {
          resolve(res);
        },
        fail: function (error) {
          reject(error);
        },
      });
    });

  get = (url, params) => this.fetch("GET", url, params);

  post = (url, data) => this.fetch("POST", url, data);
}

export default new Request();
