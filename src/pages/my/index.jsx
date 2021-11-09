import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

export default class My extends Component {
  componentWillMount() {
    Taro.setNavigationBarTitle({
      title: "我的通行证",
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="my">
        <Text>我的</Text>
      </View>
    );
  }
}
