import { Component } from "react";
import Taro from "@tarojs/taro";
import "./app.less";
import "taro-ui/dist/style/index.scss";
import "./utils/index.js";

class App extends Component {
  constructor(props) {
    super(...arguments);
    this.wxLogin.bind(this);
    this.checkSession.bind(this);
  }
  componentDidMount() {
    this.checkSession();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  checkSession() {
    const openId = Taro.getStorageSync("openid");
    if (!openId) {
      this.wxLogin();
      return;
    }
    Taro.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        this.wxLogin(); //重新登录
      },
    });
  }

  wxLogin() {
    Taro.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
          Taro.setStorageSync("code", res.code);
          // 发起网络请求;
          Taro.request({
            url: "http://localhost:3000/getOpenId",
            method: "POST",
            data: {
              code: res.code,
            },
            success: (res) => {
              const { data } = res;
              console.log(res);
              Taro.setStorageSync("openid", data.openid);
            },
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
