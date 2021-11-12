import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import "./index.less";

import Card from "../../components/card";
import Card2 from "../../components/card2";

import { getPermit } from "../../services/index";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // 有效
      effective: [],
      // 过期
      overdue: [],
      // 未生效
      expect: [],
      cidList: [],
      current: 0,
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

  async requestData(cid_index) {
    const wid = Taro.getStorageSync("openid");
    let params = cid_index
      ? { wid, cid: this.state.cidList[cid_index] }
      : { wid };
    const { data } = await getPermit(params);
    // console.log(data);
    this.setState({
      ...data,
      cidList: ["全部", ...data.cidList],
    });
  }
  handleClick(index) {
    this.setState({
      current: index,
    });
    this.requestData(index);
  }

  render() {
    return (
      <View className="my">
        <View className="tabs">
          <AtTabs
            current={this.state.current}
            scroll
            tabList={[
              ...this.state.cidList.map((el) => {
                return { title: el };
              }),
            ]}
            onClick={this.handleClick.bind(this)}
          >
            {/* <AtTabsPane current={this.state.current} index={0}>
            <View style="font-size:18px;text-align:center;height:100px;">
              标签页一的内容
            </View>
          </AtTabsPane>
         */}
          </AtTabs>
        </View>
        <View className="content">
          <View>
            <Text className="box-title">当前有效通行证</Text>
            {this.state.effective.map((item, index) => {
              return <Card data={item}></Card>;
            })}
          </View>
          <View>
            <Text className="box-title">未生效</Text>
            {this.state.expect.map((item, index) => {
              return <Card2 data={item}></Card2>;
            })}
          </View>
          <View>
            <Text className="box-title">已过期</Text>
            {this.state.overdue.map((item, index) => {
              return <Card2 data={item}></Card2>;
            })}
          </View>
        </View>
      </View>
    );
  }
}
