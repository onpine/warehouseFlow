import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

import Card from "../../components/card";
import Card2 from "../../components/card2";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      open: false,
    };
  }
  componentWillMount() {
    Taro.setNavigationBarTitle({
      title: "我的通行证",
    });
  }

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
      <View className="my">
        <View>
          <Text className="box-title">当前有效通行证</Text>
          <Card></Card>
        </View>
        <View>
          <Text className="box-title">已过期通行证</Text>
          <Card2></Card2>
          <Card2></Card2>
        </View>
      </View>
    );
  }
}
