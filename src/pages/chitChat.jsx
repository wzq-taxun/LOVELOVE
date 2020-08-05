import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, message, Input, Button, Card } from "antd";
import { UserSwitchOutlined, SendOutlined } from "@ant-design/icons";
import styles from "../style/chitChat.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
// 引入底部组件
import Olinefooter from "../components/onlinefooter/linefooter";
import Axios from "axios";
// import Base64 from "base-64"; 手动引入base64解密加密中文乱码解决
import Base64 from "../ways/basecode";
const { TabPane } = Tabs;
const { TextArea } = Input;
export class chitChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mefaqicontent: [],
      contentxiao: "",
      namezhizhi: null,
      timer: null,
      settimem: null,
      // 爱好
      hoball: [],
      // 图像
      isfalsepic: [],
      // 个人信息
      peolistall: [],
      nicheng: null,
    };
  }
  // 页面加载
  componentDidMount() {
    // 获取传过来的参数
    // console.log(this.props.location.query);
    // console.log(this.props.location.query.name);
    //传递过来的所有参数
    if (this.props.location.query === undefined) {
      // 定时器发送请求获取消息
      this.postuseinfo(Base64.decode(sessionStorage.getItem("Session_IDs")));
      // 发起获取对方个人信息进行展示
      this.getpeopleinfo(Base64.decode(sessionStorage.getItem("Session_IDs")));
    } else {
      sessionStorage.setItem(
        "Session_IDs",
        Base64.encode(this.props.location.query.name)
      );
      sessionStorage.setItem(
        "Call_names",
        Base64.encode(this.props.location.query.name2)
      );
      this.postuseinfo(Base64.decode(sessionStorage.getItem("Session_IDs")));
      // 发起获取对方个人信息进行展示
      this.getpeopleinfo(Base64.decode(sessionStorage.getItem("Session_IDs")));
    }
    this.setState({
      namezhizhi: Base64.decode(sessionStorage.getItem("Call_names")),
      // 组件加载完毕 启动定时器
      settimem: setTimeout(this.iTimer, 3000),
    });
  }
  // 定时器
  iTimer = () => {
    this.setState({
      timer: setInterval(() => {
        this.postuseinfo(Base64.decode(sessionStorage.getItem("Session_IDs")));
      }, 20000),
    });
  };
  // 组件清除时清除定时器
  componentWillUnmount() {
    clearInterval(this.state.timer && this.state.timer);
    clearInterval(this.state.settimem && this.state.settimem);
    // 再次发送一次请求
    this.unsdeletetotal();
  }
  unsdeletetotal = async () => {
    const { data: res } = await Axios.post("user/receive/chat_list/", {
      user_pk: Base64.decode(sessionStorage.getItem("Verify_k")),
    });
    if (res.status !== 1) return;
    // console.log(res);
  };
  // 获取对方聊天人的信息接口展示
  getpeopleinfo = async (value) => {
    // console.log(value);
    // let pk = 1;
    const { data: res } = await Axios.get(`user/user_info/detailed/${value}`);
    // console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    //   定义一个爱好数组变量
    let hoball = res.results.data.User_Info_to_User[0].user_hobbies;
    // 此时的数组为字符串转化为数组
    // eslint-disable-next-line no-eval
    let hobyarr = eval("(" + hoball + ")");
    // console.log(hobyarr[0]);
    //将图片数组挑出来
    let isfalsepicall = res.results.data.User_Info_price;
    let isfalsepic = [];
    for (let i = 0; i < isfalsepicall.length; i++) {
      if (isfalsepicall[i].is_delete === false) {
        isfalsepic.push(isfalsepicall[i]);
      }
    }
    // console.log(isfalsepic);
    // console.log(res.results.data.User_Info_to_User);
    this.setState({
      hoball: hobyarr,
      isfalsepic: isfalsepic,
      peolistall: res.results.data.User_Info_to_User,
      nicheng: res.results.data.username,
    });
  };
  // 获取对应的我发起的聊天消息
  postuseinfo = async (val) => {
    const { data: res } = await Axios.post("user/get/chat_one/", {
      to_user_pk: val,
      user_pk: Base64.decode(sessionStorage.getItem("Verify_k")),
    });
    // console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    // 对返回的数据进行操作
    // let jieshouzhi = null;
    let newdatall = res.results.data;
    let piclistall = res.results.price_list;
    for (let i = 0; i < newdatall.length; i++) {
      newdatall[i].send_time =
        newdatall[i].send_time.split("T")[0] +
        "-" +
        newdatall[i].send_time.split("T")[1].split(".")[0];
      for (let j = 0; j < piclistall.length; j++) {
        if (newdatall[i].send_user_id === piclistall[j][0]) {
          newdatall[i].newpic = piclistall[j][1];
        }
      }
    }
    // console.log(newdatall);
    this.setState({
      mefaqicontent: newdatall,
    });
    this.scrollToBottom();
  };
  // 发送消息保存聊天记录的接口
  fasongbaocun = async () => {
    let star = this.state.contentxiao.replace(/(^\s*)|(\s*$)/g, "");
    if (star === "" || star === undefined || star === null) {
      // 清空输入框的值
      this.setState({
        contentxiao: "",
      });
      return;
    }
    const { data: res } = await Axios.post("user/chat/save_records/", {
      send_pk: Base64.decode(sessionStorage.getItem("Verify_k")),
      receive_pk: Base64.decode(sessionStorage.getItem("Session_IDs")),
      text_content: this.state.contentxiao,
    });
    // console.log(res);
    if (res.status !== 1) return res.msg;
    // 重新获取聊天列表
    this.postuseinfo(Base64.decode(sessionStorage.getItem("Session_IDs")));
    this.scrollToBottom();
    // 清空输入框的值
    this.setState({
      contentxiao: "",
    });
  };
  // 文本框输入
  inponChange = (e) => {
    console.log(e.target.value);
    this.setState({
      contentxiao: e.target.value,
    });
  };
  // React定位到滚动条底部
  scrollToBottom = () => {
    if (this.messagesEnd) {
      const scrollHeight = this.messagesEnd.scrollHeight; //里面div的实际高度  2000px
      const height = this.messagesEnd.clientHeight; //网页可见高度  200px
      const maxScrollTop = scrollHeight - height;
      this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      //如果实际高度大于可见高度，说明是有滚动条的，则直接把网页被卷去的高度设置为两个div的高度差，实际效果就是滚动到底部了。
    }
  };
  //点击图像去详情页面

  goinfoxiang = (val) => {
    // console.log(val);
    if (val.toString() === Base64.decode(sessionStorage.getItem("Verify_k"))) {
      this.props.history.push({
        pathname: "/myresume1",
        // state: { name: val },
      });
      return;
    }
    this.props.history.push({
      pathname: "/personinfo",
      state: { name: val },
    });
  };
  render() {
    const {
      mefaqicontent,
      hoball,
      isfalsepic,
      peolistall,
      nicheng,
    } = this.state;
    const { imgpath } = this.props;
    // 获取 登录用户的idpk值
    const pkval = Base64.decode(sessionStorage.getItem("Verify_k"));
    return (
      <div className={styles.chitChatmain}>
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
        <div className={styles.containlike}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane
              key="1"
              // tab="Tab"
              tab={
                <span>
                  <UserSwitchOutlined />与
                  {this.state.namezhizhi && this.state.namezhizhi}
                  聊天
                </span>
              }
            >
              <div className={styles.tabsercon}>
                <div className={styles.tabserconleft}>
                  <div className={styles.outercontainer}>
                    <div
                      className={styles.innercontainer}
                      ref={(el) => {
                        this.messagesEnd = el;
                      }}
                    >
                      <ul className={styles.ulchit}>
                        {mefaqicontent &&
                          mefaqicontent.map((item, index) => {
                            return parseInt(pkval) !== item.send_user_id ? (
                              <li className={styles.ulchitlileft} key={index}>
                                <div className={styles.imgdbloc}>
                                  <img
                                    onClick={() =>
                                      this.goinfoxiang(item.send_user_id)
                                    }
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      cursor: "pointer",
                                    }}
                                    src={`${imgpath}media/${item.newpic}`}
                                    alt=""
                                  />
                                </div>
                                <div style={{ marginRight: "20px" }}>
                                  <p
                                    className={styles.ptextzi}
                                    style={{
                                      fontSize: "16px",
                                      color: "#232b35",
                                    }}
                                  >
                                    {item.send_user_name}
                                  </p>
                                  <p
                                    className={styles.ptextzi}
                                    style={{
                                      fontSize: "12px",
                                      color: "#627280",
                                    }}
                                  >
                                    {item.send_time}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    width: "60%",
                                    textAlign: "start",
                                    fontSize: "16px",
                                    color: "#232b35",
                                    fontWeight: "900",
                                  }}
                                >
                                  <span
                                    style={{
                                      borderRadius: "5px",
                                      whiteSpace: "normal",
                                      wordBreak: "break-all",
                                      wordWrap: "break-word",
                                      display: "inline-block",
                                      padding: "0 5px",
                                      // backgroundColor: "#1DA57A",
                                      backgroundColor: "pink",
                                    }}
                                  >
                                    {item.content}
                                  </span>
                                </div>
                              </li>
                            ) : (
                              <li className={styles.ulchitliright} key={index}>
                                <div
                                  style={{
                                    width: "60%",
                                    textAlign: "end",
                                    fontSize: "16px",
                                    color: "#232b35",
                                    fontWeight: "900",
                                  }}
                                >
                                  <span
                                    style={{
                                      borderRadius: "5px",
                                      padding: "0 5px",
                                      whiteSpace: "normal",
                                      wordBreak: "break-all",
                                      wordWrap: "break-word",
                                      display: "inline-block",
                                      // backgroundColor: "#1DA57A",
                                      backgroundColor: "pink",
                                    }}
                                  >
                                    {item.content}
                                  </span>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                  <p
                                    className={styles.ptextzirig}
                                    style={{
                                      fontSize: "16px",
                                      color: "#232b35",
                                    }}
                                  >
                                    {item.send_user_name}
                                  </p>
                                  <p
                                    className={styles.ptextzirig}
                                    style={{
                                      fontSize: "12px",
                                      color: "#627280",
                                    }}
                                  >
                                    {item.send_time}
                                  </p>
                                </div>
                                <div
                                  className={styles.imgdbloc}
                                  style={{ margin: "0px", marginLeft: "20PX" }}
                                >
                                  <img
                                    onClick={() =>
                                      this.goinfoxiang(item.send_user_id)
                                    }
                                    alt=""
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      cursor: "pointer",
                                    }}
                                    src={`${imgpath}media/${item.newpic}`}
                                  />
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                  <TextArea
                    value={this.state.contentxiao && this.state.contentxiao}
                    autoSize={{ minRows: 6, maxRows: 10 }}
                    placeholder="继续对话"
                    allowClear
                    onChange={this.inponChange}
                    onPressEnter={this.fasongbaocun}
                  />
                  <div style={{ textAlign: "end", marginTop: "20px" }}>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<SendOutlined />}
                      size="large"
                      onClick={this.fasongbaocun}
                    >
                      发送
                    </Button>
                  </div>
                </div>
                <aside className={styles.tabserconright}>
                  <Card className={styles.cardneirong}>
                    <p
                      style={{
                        width: "100%",
                        height: "280px",
                        position: "relative",
                      }}
                    >
                      {isfalsepic[0] && (
                        <img
                          onClick={() =>
                            this.goinfoxiang(
                              Base64.decode(
                                sessionStorage.getItem("Session_IDs")
                              )
                            )
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "10PX",
                            cursor: "pointer",
                          }}
                          src={`${imgpath}media/${isfalsepic[0].user_info_price}`}
                          alt=""
                        />
                      )}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 900,
                          position: "absolute",
                          bottom: "0px",
                          left: "0px",
                          padding: "3px 10px",
                          backgroundColor: "#1DA57A",
                        }}
                      >
                        {nicheng}
                      </span>
                    </p>
                    <p style={{ fontSize: "16PX" }}>
                      {peolistall[0] && peolistall[0].user_age},
                      {peolistall[0] && peolistall[0].user_site_province}
                      {peolistall[0] && peolistall[0].user_site_city}
                    </p>
                    <p style={{ fontStyle: "italic", fontSize: "16PX" }}>
                      {peolistall[0] && peolistall[0].user_intro}
                    </p>
                    <p
                      style={{
                        color: "#21b36",
                        fontWeight: 900,
                        fontSize: "16px",
                      }}
                    >
                      兴趣爱好
                    </p>
                    <p style={{ display: "flex", flexWrap: "wrap" }}>
                      {hoball &&
                        hoball.map((item, index) => {
                          return (
                            <span
                              key={index}
                              style={{
                                width: "80px",
                                fontSize: "15px",
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "3px 5px",
                                margin: "5px 5px",
                              }}
                            >
                              {item}
                            </span>
                          );
                        })}
                    </p>
                  </Card>
                </aside>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <Olinefooter></Olinefooter>
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
export default connect(mapStateToProps)(chitChat);
