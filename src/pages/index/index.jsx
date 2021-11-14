import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Picker, Button } from "@tarojs/components";
import "./index.less";

import { AtForm, AtInput, AtButton, AtList, AtListItem } from "taro-ui";

import { addPermit } from "../../services/index";
import { goodsList } from "../../utils/enum";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      driverName: "马*德",
      licensePlate: "豫A-00111",
      phone: "13200001212",
      sex: "",
      company: "河东运输",
      standardLoad: 25,
      goodsName: 0,

      startTime: new Date().format("yyyy-MM-dd"),
      endTime: new Date().format("yyyy-MM-dd"),
      // startTime: new Date(new Date().setDate(new Date().getDate())).format(
      //   "yyyy-MM-dd"
      // ),
      // endTime: new Date(new Date().setDate(new Date().getDate())).format(
      //   "yyyy-MM-dd"
      // ),
    };

    this.addPermit.bind(this);
    this.checkParams.bind(this);
  }

  componentWillMount() {
    Taro.setNavigationBarTitle({
      title: "申请通行证",
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange(key, event) {
    // console.log(key, event);
    this.setState({
      [key]: event,
    });
  }
  onDateChange = (key, event) => {
    this.setState({
      [key]: event.detail.value,
    });
  };
  async addPermit(wid) {
    try {
      Taro.showLoading({
        title: "加载中",
        mask: true,
      });
      const { data } = await addPermit({
        wid,
        cid: this.state.licensePlate,
        name: this.state.driverName,
        phone: this.state.phone,
        standardLoad: this.state.standardLoad,
        gid: goodsList[this.state.goodsName].value,
        company: this.state.company,
        opendts: this.state.startTime,
        opendte: this.state.endTime,
      });
      Taro.showToast({
        title: data.msg,
        icon: data.msg == "申请成功" ? "success" : "none",
        duration: 2000,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      Taro.showToast({
        title: toString(error),
        icon: "none",
        duration: 2000,
      });
    }
  }

  // 校验表单参数
  checkParams() {
    let temp = true;
    if (
      !new RegExp(
        "[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}-[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}"
      ).test(this.state.licensePlate)
    ) {
      temp = false;
    }
    if (!new RegExp("^1[34578]{1}[0-9]{9}$").test(this.state.phone)) {
      temp = false;
    }
    if (
      !(this.state.company && this.state.standardLoad && this.state.driverName)
    ) {
      temp = false;
    }
    if (this.state.startTime > this.state.endTime) {
      temp = false;
    }
    if (!temp) {
      Taro.showToast({
        title: "请正确填写信息",
        icon: "none",
        duration: 2000,
      });
    }
    return temp;
  }

  async onSubmit(event) {
    const wid = Taro.getStorageSync("openid");
    // console.log(this.state, wid);
    if (!wid) {
      Taro.showToast({
        title: "未登录",
        icon: "none",
        duration: 2000,
      });
    }
    if (!this.checkParams()) {
      return;
    }
    this.addPermit(wid);
  }

  onReset(event) {
    this.setState({
      driverName: "",
      licensePlate: "",
      phone: "",
      sex: "",
      company: "",
      standardLoad: undefined,
      goodsName: 0,

      opendts: new Date().format("yyyy-MM-dd"),
      opendte: new Date().format("yyyy-MM-dd"),
    });
  }
  // getPhoneNumber(e) {
  //   console.log(e.detail);
  // }

  render() {
    return (
      <View className="home">
        <View className="topContent">广告位招租</View>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <View>
            <Text className="title">基本信息</Text>
            <View>
              <Picker
                mode="selector"
                range={goodsList}
                rangeKey="name"
                value={this.state.goodsName}
                onChange={this.onDateChange.bind(this, "goodsName")}
              >
                <AtList>
                  <AtListItem
                    hasBorder={false}
                    title="请选择货物"
                    extraText={goodsList[this.state.goodsName].name}
                  />
                </AtList>
              </Picker>
            </View>
            <AtInput
              name="licensePlate"
              title="车牌号"
              type="text"
              placeholder="豫A-00000"
              required
              border={true}
              value={this.state.licensePlate}
              onChange={this.handleChange.bind(this, "licensePlate")}
            />
            <AtInput
              name="driverName"
              title="姓名"
              type="text"
              placeholder="姓名"
              required
              border={true}
              value={this.state.driverName}
              onChange={this.handleChange.bind(this, "driverName")}
            />
            <AtInput
              name="phone"
              border={true}
              title="手机号码"
              type="phone"
              placeholder="手机号码"
              required
              border={false}
              value={this.state.phone}
              onChange={this.handleChange.bind(this, "phone")}
            />
            <AtInput
              name="company"
              title="公司"
              type="text"
              placeholder="所属单位"
              required
              border={true}
              value={this.state.company}
              onChange={this.handleChange.bind(this, "company")}
            />
            <AtInput
              name="standardLoad"
              title="车辆标载"
              type="number"
              placeholder="车辆标准载重"
              required
              border={true}
              value={this.state.standardLoad}
              onChange={this.handleChange.bind(this, "standardLoad")}
            >
              <Text className="unit">吨</Text>
            </AtInput>
          </View>
          <View>
            <Text className="title">通行时间段</Text>
            <View>
              <Picker
                mode="date"
                start={new Date().format("yyyy-MM-dd")}
                onChange={this.onDateChange.bind(this, "startTime")}
              >
                <AtList>
                  <AtListItem
                    hasBorder={false}
                    title="请选择起始日期"
                    extraText={this.state.startTime}
                  />
                </AtList>
              </Picker>
            </View>
            <View>
              <Picker
                mode="date"
                start={this.state.startTime}
                onChange={this.onDateChange.bind(this, "endTime")}
              >
                <AtList>
                  <AtListItem
                    hasBorder={false}
                    title="请选择到期日期"
                    extraText={this.state.endTime}
                  />
                </AtList>
              </Picker>
            </View>
          </View>
          <View className="btn-item">
            <Button formType="submit" type="primary">
              提交
            </Button>
          </View>
          <View className="btn-item">
            <Button formType="reset" type="secondary">
              重置
            </Button>
          </View>
          {/* <Button
            openType="getPhoneNumber"
            onGetPhoneNumber={this.getPhoneNumber.bind(this)}
          >
            获取手机号
          </Button> */}
        </AtForm>
      </View>
    );
  }
}
