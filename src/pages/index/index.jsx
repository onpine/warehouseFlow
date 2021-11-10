import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import "./index.less";

import { AtForm, AtInput, AtButton, AtList, AtListItem } from "taro-ui";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      driverName: "",
      licensePlate: "",
      phone: "",
      sex: "",
      company: "",
      standardLoad: undefined,
      goodsName: "",

      startTime: new Date().format("yyyy-MM-dd"),
      endTime: new Date().format("yyyy-MM-dd"),
    };
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
  onSubmit(event) {
    console.log(this.state);
  }
  onReset(event) {
    this.setState({
      value: "",
    });
  }

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
            <AtInput
              name="licensePlate"
              title="车牌号"
              type="text"
              placeholder="车牌号"
              required
              border={false}
              value={this.state.licensePlate}
              onChange={this.handleChange.bind(this, "licensePlate")}
            />
            <AtInput
              name="goodsName"
              title="货物名"
              type="text"
              placeholder="货物名"
              required
              border={false}
              value={this.state.goodsName}
              onChange={this.handleChange.bind(this, "goodsName")}
            />
            <AtInput
              name="driverName"
              title="姓名"
              type="text"
              placeholder="姓名"
              required
              border={false}
              value={this.state.driverName}
              onChange={this.handleChange.bind(this, "driverName")}
            />
            <AtInput
              name="phone"
              border={false}
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
              border={false}
              value={this.state.company}
              onChange={this.handleChange.bind(this, "company")}
            />
            <AtInput
              name="standardLoad"
              title="车辆标载"
              type="number"
              placeholder="车辆标准载重"
              required
              border={false}
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
            <AtButton formType="submit" type="primary">
              提交
            </AtButton>
          </View>
          <View className="btn-item">
            <AtButton formType="reset" type="secondary">
              重置
            </AtButton>
          </View>
        </AtForm>
      </View>
    );
  }
}
