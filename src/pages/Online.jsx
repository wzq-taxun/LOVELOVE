import React, { Component } from "react";
// connect方法的作用:将额外的props传递给组件,并返回新的组件,组件在该过程中不会受到影响
import { connect } from "react-redux";
import Base64 from "../ways/basecode";
import {
  Tabs,
  Card,
  Modal,
  Result,
  Button,
  message,
  Pagination,
  BackTop,
  Spin,
} from "antd";
import { SmileOutlined, UpSquareFilled } from "@ant-design/icons";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
// 引入底部组件
import Olinefooter from "../components/onlinefooter/linefooter";
import styles from "../style/Online.module.scss";
import Axios from "axios";
const { TabPane } = Tabs;
const { Meta } = Card;
// let Base64 = require("js-base64").Base64;
export class Online extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peoplelist: [],
      //用状态码来控制元素是否渲染
      showElem: true,
      // modle框弹框
      visible: false,
      id: 0,
      // 总数
      numzong: 0,
      loading: false,
    };
  }
  // 页面数据挂载
  componentDidMount() {
    // 当前用户信息的确认根据状态码来判断是否填写个人资料
    this.onedangget();
  }
  // 当前登录用户接口
  onedangget = async () => {
    let userk = Base64.decode(sessionStorage.getItem("Verify_k"));
    // console.log(userk);
    const { data: res } = await Axios.get("/user/user_info/", {
      params: {
        user_pk: userk,
      },
    });
    console.log(res);
    // 当状态码为2 时 就说明用户们没有填写个人信息
    // 此时就控制用户列表不显示 并且终止 不发起用户列表请求
    if (res.status === 2) {
      this.setState({
        // 显示弹框
        visible: true,
        showElem: false,
      });
      // 保存一个值
      sessionStorage.setItem("is_disable", 1);
      return;
    }
    if (res.status !== 1) return;
    // 默认第一页
    this.onChange(1);
  };
  // 用户列表获取
  getpeoplelist = async (num) => {
    // console.log(num);
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    // console.log(usepk);
    const { data: res } = await Axios.post("user/user_info/list/", {
      user_pk: usepk,
      page: num,
    });
    if (res.status !== 1) {
      message.warning(res.msg);
      this.setState({
        loading: false,
      });
      return;
    }
    // 计算出页码数总数
    let numzong = parseInt(res.results.contacts) * 10;
    this.setState({
      peoplelist: res.results.data,
      numzong,
      loading: false,
    });
  };
  // 对获取到的用户列表图像进行判断
  getlipicc = (item) => {
    // 解构 props     // 图片根路径
    const { imgpath } = this.props;
    if (item.User_Info_price.length === 0) {
      return `${imgpath}${item.avatar}`;
    } else {
      for (let i = 0; i < item.User_Info_price.length; i++) {
        if (item.User_Info_price[i].is_delete === false) {
          return `${imgpath}/media/${item.User_Info_price[i].user_info_price}`;
        } else if (item.User_Info_price.length - 1 === i) {
          // console.log(item.User_Info_price[i].is_delete);
          return `${imgpath}${item.avatar}`;
        }
      }
    }
  };
  // 弹框功能
  handleOk = (e) => {
    // 点击完善个人资料跳转到编辑资料页面tab栏
    this.props.history.push("/myresume2");
    console.log(e);
    // this.setState({
    //   visible: false,
    // });
  };

  handleCancel = (e) => {
    // 先清除sessionStorage 再返回到登录页面
    sessionStorage.clear();
    // 点击退出登录
    this.props.history.push("/login");
  };
  callback = (key) => {
    console.log(key);
  };
  // 分页功能
  onChange = (page) => {
    this.setState({
      loading: true,
    });
    // 调用分页接口
    this.getpeoplelist(page);
  };
  // 点击照片去详情页面
  goinfo = (value) => {
    // console.log(value);
    this.props.history.push({
      pathname: "/personinfo",
      state: { name: value },
    });
  };
  render() {
    const { loading } = this.state;
    // 解构 props
    // const { imgpath } = this.props;
    return (
      <div className={styles.onlineall}>
        {/* 顶头部 */}
        <header className={styles.onheafirst}>
          {/*插入组件 */}
          <LineHeader></LineHeader>
        </header>
        {/* nav部分 */}
        <nav className={styles.nav}>
          {/* 插入nav组件 */}
          <Olinenav idval={this.state.id}></Olinenav>
        </nav>
        {/* 内容区域 */}

        {this.state.showElem ? (
          <div>
            <div className={styles.contentquyu}>
              <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane
                  tab="用户列表"
                  key="1"
                  style={{
                    height: "1200px",
                    lineHeight: "600px",
                    textAlign: "center",
                  }}
                >
                  {loading ? (
                    <Spin spinning={loading} delay={500} size="large" />
                  ) : (
                    <ul className={styles.tabul}>
                      {this.state.peoplelist.map((item) => {
                        return (
                          <li
                            className={styles.tabulli}
                            key={item.id}
                            onClick={() => this.goinfo(item.id)}
                          >
                            <Card
                              hoverable
                              style={{ width: "100%" }}
                              cover={
                                <img
                                  className={styles.coimg}
                                  style={{ height: "260px" }}
                                  alt=""
                                  src={this.getlipicc(item)}
                                />
                              }
                            >
                              <Meta
                                title={item.username}
                                description={`${item.User_Info_to_User[0].user_age}岁${item.User_Info_to_User[0].user_height}cm`}
                              />
                            </Card>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </TabPane>
              </Tabs>
              <div className={styles.pagee}>
                <Pagination
                  defaultCurrent={1}
                  total={this.state.numzong ? this.state.numzong : 10}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <Olinefooter></Olinefooter>
          </div>
        ) : (
          <div>
            <Modal
              maskClosable={false}
              cancelText="退出登录"
              okText="完善个人资料"
              width={1000}
              centered="ture"
              title="温馨提示"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Result
                icon={<SmileOutlined />}
                title="太好了，你已完成登录操作！请继续完善个人资料。"
                extra={
                  <Button type="primary" onClick={this.handleOk}>
                    Next
                  </Button>
                }
              />
            </Modal>
          </div>
        )}
        <BackTop>
          <UpSquareFilled style={{ fontSize: "40px", color: "#1DA57A" }} />
        </BackTop>
      </div>
    );
  }
}
// mapStateToProps:将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    imgpath: state.baseurl,
  };
};
export default connect(mapStateToProps)(Online);
