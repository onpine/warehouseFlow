import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

import { AtIcon, AtAccordion } from "taro-ui";

export default class Card2 extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      open: false,
      ...props.data,
    };
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
      <View className="card2">
        <View className="header">
          <View className="left">{this.props.data?.opendts}</View>
          <AtIcon value="arrow-right" size="30" color="#fff"></AtIcon>
          <View className="right">{this.props.data?.opendte}</View>
        </View>
        <AtAccordion
          open={this.state.open}
          onClick={this.handleClick.bind(this)}
          title={this.props.data?.cid}
        >
          <View className="content">
            <View className="row">
              <Text className="title">司机姓名</Text>
              <Text className="text">{this.props.data?.name}</Text>
            </View>
            <View className="row">
              <Text className="title">手机号</Text>
              <Text className="text">{this.props.data?.phone}</Text>
            </View>
            <View className="row">
              <Text className="title">公司</Text>
              <Text className="text">{this.props.data?.company}</Text>
            </View>
            <View className="row">
              <Text className="title">车辆标载</Text>
              <Text className="text">{this.props.data?.standardLoad} 吨</Text>
            </View>
          </View>
        </AtAccordion>
      </View>
    );
  }
}
