import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

import Card from "../../components/card";
import Card2 from "../../components/card2";

import { getPermit } from "../../services/index";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // 有效
      effective: {},
      // 过期
      overdue: [],
      // 未生效
      expect: [],
    };

    this.requestData.bind(this);
  }
  componentWillMount() {
    Taro.setNavigationBarTitle({
      title: "我的通行证",
    });
  }

  componentDidMount() {
    this.requestData();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async requestData() {
    const { data } = await getPermit();
    // console.log(data);
    this.setState({
      ...data,
    });
  }

  render() {
    return (
      <View className="my">
        <View>
          <Text className="box-title">当前有效通行证</Text>
          <Card data={this.state.effective}></Card>
        </View>
        <View>
          <Text className="box-title">已过期通行证</Text>
          {this.state.overdue.map((item, index) => {
            return <Card2 data={item}></Card2>;
          })}
          <Card2></Card2>
        </View>
      </View>
    );
  }
}
