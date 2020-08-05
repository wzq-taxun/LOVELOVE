import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Tabs,
  List,
  Avatar,
  Popconfirm,
  message,
  Skeleton,
  Result,
  Button,
  Badge,
  Pagination,
} from "antd";
import {
  BellOutlined,
  CommentOutlined,
  DeleteFilled,
  MailFilled,
  ExperimentFilled,
} from "@ant-design/icons";
import styles from "../style/converSation.module.scss";
import Swiper from "swiper";
// import Swiper from "swiper/dist/js/swiper.js";
import "swiper/swiper-bundle.css";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
// 引入底部组件
import Olinefooter from "../components/onlinefooter/linefooter";
import Axios from "axios";
import Base64 from "../ways/basecode";
const { TabPane } = Tabs;
export class converSation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activkey: "",
      inforlist: [],
      fasonglist: [],
      loading: true,
      swipall: [],
      numall: 0,
    };
  }
  componentDidMount() {
    // 调用头部的照片
    this.getpicpeopletu();
    // 页面加载获取保存的key值
    let zhival = sessionStorage.getItem("Switchlist");
    // console.log(zhival);
    if (zhival === null) return this.callback("1");
    this.callback(Base64.decode(zhival));
  }
  // 组件卸载之前
  componentWillUnmount() {
    window.sessionStorage.removeItem("Switchlist");
  }
  // 头部的照片图像接口
  getpicpeopletu = async () => {
    const { data: res } = await Axios.post("user/like_num/sort/", {
      user_pk: Base64.decode(sessionStorage.getItem("Verify_k")),
    });
    // console.log(res.results.data);
    if (res.status !== 0) return;
    this.setState({
      swipall: res.results.data,
    });
    // console.log(res.results.data);
    new Swiper(".swiper-container", {
      slidesPerView: 8,
      // centeredSlides: true,
      virtual: {
        slides: this.state.swipall,
      },
    });
  };
  //删除发送信息列表中的项
  fasongconfirm = async (val) => {
    // console.log(val);
    let meusepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    const { data: res } = await Axios.post("user/delete/chat_one/", {
      user_pk: meusepk,
      to_user_pk: val,
    });
    // console.log(res);
    if (res.status !== 1) return;
    // 重新获取发送信息列表
    this.getshoujianxiang("user/get/chat_list/");
  };
  // 删除 收件箱的列表项
  confirm = async (val) => {
    // console.log(val);
    let meusepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    const { data: res } = await Axios.post("user/delete/receive_one/", {
      user_pk: meusepk,
      to_user_pk: val,
    });
    // console.log(res);
    if (res.status !== 1) return;
    // 重新获取发送信息列表
    this.getshoujianxiang("user/receive/chat_list/");
  };
  //发送消息时的分页
  fasongchange = (e) => {
    // 发起发送消息列表请求
    this.getshoujianxiang("user/get/chat_list/", e);
  };
  // 收信箱的分页
  shouemail = (e) => {
    // console.log(e);
    // 发请收件箱列表请求
    this.getshoujianxiang("user/receive/chat_list/", e);
  };
  callback = (key) => {
    // 将key值进行保存
    sessionStorage.setItem("Switchlist", Base64.encode(key));
    if (key === "1") {
      this.shouemail(1);
      // // 发请收件箱列表请求
    } else {
      this.fasongchange(1);
      // // 发起发送消息列表请求
    }
    this.setState({
      activkey: Base64.decode(sessionStorage.getItem("Switchlist")),
    });
  };
  // 收件箱列表请求 // 发送消息列表请求
  getshoujianxiang = async (url, e) => {
    // 将骨架屏
    this.setState({
      loading: true,
    });
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    const { data: res } = await Axios.post(url, {
      user_pk: usepk,
      page: e,
    });
    if (res.status !== 1) {
      this.setState({
        loading: false,
        inforlist: [],
        fasonglist: [],
      });
      return;
    }
    console.log(res);
    // 数据总数
    let numall = parseInt(res.results.contacts) * 10;
    // 对返回的数据进行操作
    let newdatall = res.results.data_list;
    let piclistall = res.results.price_list;
    let numlist = res.results.not_read_num_list;
    for (let i = 0; i < newdatall.length; i++) {
      newdatall[i].create_time = newdatall[i].create_time.split("T")[0];
      for (let j = 0; j < piclistall.length; j++) {
        if (newdatall[i].user_id === piclistall[j][0]) {
          newdatall[i].newpic = piclistall[j][1];
        }
      }
      // 当是收件箱时才走此程序
      if (url === "user/receive/chat_list/") {
        for (let k = 0; k < numlist.length; k++) {
          if (newdatall[i].user_id === numlist[k][0]) {
            newdatall[i].newnum = numlist[k][1];
          }
        }
      }
    }
    // console.log(newdatall);
    let valkey = Base64.decode(sessionStorage.getItem("Switchlist"));
    if (valkey === "1") {
      this.setState({
        inforlist: newdatall,
        loading: false,
        numall,
      });
    } else {
      this.setState({
        fasonglist: newdatall,
        loading: false,
        numall,
      });
    }
  };
  // 点击去聊天页面
  golaiotianjie = (val1, val2) => {
    this.props.history.push({
      pathname: "/chat",
      query: { name: val1, name2: val2 },
    });
  };
  // 点击照片去详情页面
  goinfoxaing = (value) => {
    console.log(value);
    this.props.history.push({
      pathname: "/personinfo",
      state: { name: value },
    });
  };
  render() {
    let { inforlist, fasonglist, loading, swipall, numall } = this.state;
    const { imgpath } = this.props;
    return (
      <div className={styles.covermain}>
        {/* 顶头部 */}
        <header className={styles.onlikefirst}>
          {/*插入组件 */}
          <LineHeader></LineHeader>
        </header>
        {/* nav部分 */}
        <nav className={styles.likenav}>
          {/* 插入nav组件 */}
          <Olinenav></Olinenav>
        </nav>
        <div
          className="swiper-container"
          style={{
            width: "1200px",
            height: "100px",
            marginTop: "15px",
          }}
        >
          <div className="swiper-wrapper">
            {swipall &&
              swipall.map((item) => {
                return (
                  <div className="swiper-slide" key={item[0]}>
                    <img
                      onClick={() => this.goinfoxaing(item[0])}
                      style={{
                        width: "100px",
                        height: "100%",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      src={`${imgpath}media/${item[1]}`}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
        </div>
        {/* 主要内容 */}
        <div className={styles.containlike}>
          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            activeKey={this.state.activkey ? this.state.activkey : "1"}
          >
            <TabPane
              key="1"
              tab={
                <span>
                  <MailFilled />
                  收信箱
                </span>
              }
            >
              <div className={styles.tabsercon}>
                {inforlist.length !== 0 ? (
                  <div style={{ width: "100%" }}>
                    <List
                      size="large"
                      className={styles.tabserconleft}
                      itemLayout="horizontal"
                      dataSource={inforlist}
                      renderItem={(item) => (
                        <List.Item
                          style={{ height: "180px", paddingLeft: "0px" }}
                        >
                          <Skeleton loading={loading} active avatar>
                            <List.Item.Meta
                              onClick={() =>
                                this.golaiotianjie(item.user_id, item.username)
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              avatar={
                                <Avatar
                                  style={{ width: "110PX", height: "110px" }}
                                  src={`${imgpath}media/${item.newpic}`}
                                />
                              }
                              title={item.username}
                              description={item.create_time}
                            />
                            <ul className={styles.ulcontent}>
                              <li>
                                {item.newnum === 0 ? (
                                  <p className={styles.plistcus}>已读</p>
                                ) : (
                                  <div>
                                    <BellOutlined />
                                    <Badge count={item.newnum} />
                                  </div>
                                )}
                              </li>
                              <li>
                                <Popconfirm
                                  title="确定要移除列表"
                                  onConfirm={() => this.confirm(item.user_id)}
                                  okText="确定"
                                  cancelText="取消"
                                >
                                  <DeleteFilled className={styles.tubiaodele} />
                                </Popconfirm>
                              </li>
                            </ul>
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                    <div
                      style={{
                        width: "100%",
                        margin: "0 auto",
                        textAlign: "center",
                      }}
                    >
                      <Pagination
                        simple
                        defaultCurrent={1}
                        total={numall}
                        onChange={this.shouemail}
                      />
                    </div>
                  </div>
                ) : (
                  <Skeleton loading={loading} active avatar>
                    <Result
                      style={{ width: "100%", height: "600px" }}
                      icon={<ExperimentFilled />}
                      title="哦，亲爱的，没有收到消息哟!"
                      extra={
                        <Button type="primary">
                          <Link to="/">去主动搭讪</Link>
                        </Button>
                      }
                    />
                  </Skeleton>
                )}
                <aside className={styles.tabserconright}></aside>
              </div>
            </TabPane>
            <TabPane
              key="2"
              tab={
                <span>
                  <CommentOutlined />
                  发送信息
                </span>
              }
            >
              <div className={styles.tabsercon}>
                {fasonglist.length !== 0 ? (
                  <div style={{ width: "100%" }}>
                    <List
                      size="large"
                      className={styles.tabserconleft}
                      itemLayout="horizontal"
                      dataSource={fasonglist}
                      renderItem={(item) => (
                        <List.Item
                          style={{ height: "180px", paddingLeft: "0px" }}
                        >
                          <Skeleton loading={loading} active avatar>
                            <List.Item.Meta
                              onClick={() =>
                                this.golaiotianjie(item.user_id, item.username)
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              avatar={
                                <Avatar
                                  style={{ width: "110PX", height: "110px" }}
                                  src={`${imgpath}media/${item.newpic}`}
                                />
                              }
                              title={item.username}
                              description={item.create_time}
                            />
                            <ul className={styles.ulcontent}>
                              <li>
                                <Popconfirm
                                  title="确定要移除列表"
                                  onConfirm={() =>
                                    this.fasongconfirm(item.user_id)
                                  }
                                  // onCancel={this.fasongcancel}
                                  okText="确定"
                                  cancelText="取消"
                                >
                                  <DeleteFilled className={styles.tubiaodele} />
                                </Popconfirm>
                              </li>
                            </ul>
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                    <div
                      style={{
                        width: "100%",
                        margin: "0 auto",
                        textAlign: "center",
                      }}
                    >
                      <Pagination
                        simple
                        defaultCurrent={1}
                        total={numall}
                        onChange={this.fasongchange}
                      />
                    </div>
                  </div>
                ) : (
                  <Skeleton loading={loading} active avatar>
                    <Result
                      style={{ width: "100%", height: "600px" }}
                      icon={<ExperimentFilled />}
                      title="哦，亲爱的，没有发送消息哟!"
                      extra={
                        <Button type="primary">
                          <Link to="/">去主动搭讪</Link>
                        </Button>
                      }
                    />
                  </Skeleton>
                )}
                <aside className={styles.tabserconright}></aside>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <Skeleton loading={loading} active avatar>
          <Olinefooter />
        </Skeleton>
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
export default connect(mapStateToProps)(converSation);
