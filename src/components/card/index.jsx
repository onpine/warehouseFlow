import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

import { AtIcon } from "taro-ui";

export default class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick(value) {
    this.setState({
      open: value,
    });
  }

  render() {
    return (
      <View className="card">
        <View className="header">
          <View className="left">2021.11.09</View>
          <AtIcon value="arrow-right" size="30" color="#fff"></AtIcon>
          <View className="right">2021.11.09</View>
        </View>
        <View className="content">
          <View className="row">
            <Text className="title">车牌号</Text>
            <Text className="text">豫A·07070</Text>
          </View>
          <View className="row">
            <Text className="title">司机姓名</Text>
            <Text className="text">大壮</Text>
          </View>
          <View className="row">
            <Text className="title">手机号</Text>
            <Text className="text">15899990000</Text>
          </View>
          <View className="row">
            <Text className="title">公司</Text>
            <Text className="text">大壮农鲜运输有限公司</Text>
          </View>
          <View className="row">
            <Text className="title">车辆标载</Text>
            <Text className="text">50吨</Text>
          </View>
        </View>
      </View>
    );
  }
}
