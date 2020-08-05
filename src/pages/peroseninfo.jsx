import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Divider,
  message,
  Badge,
  BackTop,
  Modal,
  Carousel,
  Card,
  Avatar,
  Button,
} from "antd";
import styles from "../style/peroseninfo.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
// 引入底部组件
import Olinefooter from "../components/onlinefooter/linefooter";
import { UpSquareFilled, MessageFilled } from "@ant-design/icons";
import Axios from "axios";
// 引入 base
import Base64 from "../ways/basecode";
import {
  HeartFilled,
  GiftOutlined,
  HeartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
export class peroseninfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  显示图片单独显示出来
      isfalsepic: [],
      peolistall: [],
      nicheng: "",
      hoball: [],
      // 用户点击爱心的用户的id
      islikeall: [],
      // 被喜欢的次数
      likenum: 0,
      // 该用户的id
      idval: "",
      visible: false,
    };
  }
  // 页面渲染
  componentDidMount() {
    //用户自己的信息
    this.inforData();
    //传递过来的所有参数
    if (this.props.location.state === undefined) {
      return this.getpeopleinfo(
        Base64.decode(sessionStorage.getItem("infoval"))
      );
    } else {
      sessionStorage.setItem(
        "infoval",
        Base64.encode(this.props.location.state.name)
      );
      this.getpeopleinfo(Base64.decode(sessionStorage.getItem("infoval")));
    }
  }
  //   发起个人的详情页面
  getpeopleinfo = async (value) => {
    // let pk = 1;
    const { data: res } = await Axios.get(`user/user_info/detailed/${value}`);
    // console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    //   定义一个爱好数组变量
    let hoball = res.results.data.User_Info_to_User[0].user_hobbies;
    // 此时的数组为字符串转化为数组
    // eslint-disable-next-line no-eval
    let hobyarr = eval("(" + hoball + ")");
    // console.log(hoball[0]);
    //将图片数组挑出来
    let isfalsepicall = res.results.data.User_Info_price;
    let isfalsepic = [];
    for (let i = 0; i < isfalsepicall.length; i++) {
      if (isfalsepicall[i].is_delete === false) {
        isfalsepic.push(isfalsepicall[i]);
      }
    }
    // console.log(res.results.like_num);
    this.setState({
      hoball: hobyarr,
      isfalsepic: isfalsepic,
      peolistall: res.results.data.User_Info_to_User,
      nicheng: res.results.data.username,
      // 详情用户的id
      idval: res.results.data.id,
      // 该用户的被喜欢的次数
      likenum: res.results.like_num,
    });
  };
  // 发起用户自己的信息请求获取自己点赞了那些人
  inforData = async () => {
    // 获取用户pk
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    // console.log(usepk);
    const { data: res } = await Axios.get("user/user_info/", {
      params: {
        user_pk: usepk,
      },
    });
    // console.log(res.results);
    //  将本用户喜欢的人列出
    this.setState({
      // peoplegeren: res.results.data,
      islikeall: res.results.like,
    });
  };
  // 点赞 接口
  iszan = async (zanval) => {
    // console.log(zanval);
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    const { data: res } = await Axios.post("user/user_info/like/", {
      user_pk: usepk,
      like_user_pk: zanval,
    });
    if (res.status !== 1) return message.warning(res.msg);
    // 点击完从新获取个人用户列表
    this.inforData();
    // // 获取该用户详情
    this.getpeopleinfo(Base64.decode(sessionStorage.getItem("infoval")));
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onChangemadeng = (a, b, c) => {
    console.log(a, b, c);
  };
  // 携带对应用户的id去聊天界面
  golaiolao = (vall, val2) => {
    // console.log(vall);
    this.props.history.push({
      pathname: "/chat",
      query: { name: vall, name2: val2 },
    });
  };
  render() {
    const { imgpath } = this.props;
    return (
      <div className={styles.onlikeall}>
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
        {/* 主要内容 */}
        <div className={styles.containlike}>
          <ul className={styles.resul}>
            {this.state.isfalsepic &&
              this.state.isfalsepic.map((item) => {
                return (
                  <li
                    className={styles.resli}
                    key={item.id}
                    onClick={this.showModal}
                  >
                    <img
                      className={styles.resimg}
                      alt="example"
                      src={`${imgpath}media/${item.user_info_price}`}
                    />
                  </li>
                );
              })}
          </ul>
          <div className={styles.tabsercon}>
            <div className={styles.tabserconleft}>
              <div className={styles.navhead}>
                <div className={styles.navheadleft}>
                  {/* 展示是否喜欢 */}
                  <Badge
                    count={this.state.likenum ? this.state.likenum : 0}
                    showZero
                  >
                    {this.state.islikeall.indexOf(this.state.idval) !== -1 ? (
                      <HeartFilled
                        onClick={() => this.iszan(this.state.idval)}
                        className={styles.iconzan}
                        style={{ color: "#1DA57A" }}
                      />
                    ) : (
                      <HeartFilled
                        className={styles.iconzan}
                        onClick={() => this.iszan(this.state.idval)}
                      />
                    )}
                  </Badge>
                </div>
                <div className={styles.navheadright}>
                  <p style={{ margin: "0" }}>
                    <span
                      style={{
                        color: "#212B36",
                        fontWeight: 900,
                        fontSize: "30px",
                      }}
                    >
                      {this.state.nicheng}
                    </span>
                    <i
                      style={{
                        color: "#212B36",
                        fontSize: "20px",
                        fontWeight: 400,
                      }}
                    >
                      &nbsp;&nbsp;
                      {this.state.peolistall[0] &&
                        this.state.peolistall[0].user_intro}
                    </i>
                  </p>
                  <p
                    style={{
                      color: "#212B36",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    <span>
                      {this.state.peolistall[0] &&
                        this.state.peolistall[0].user_age}
                    </span>
                    岁
                    <span>
                      {this.state.peolistall[0] &&
                        this.state.peolistall[0].user_sex}
                    </span>
                    性
                  </p>
                </div>
              </div>
              <p
                style={{
                  color: "rgb(69, 79, 91)",
                  fontSize: "16px",
                  fontWeight: 900,
                  marginTop: "50px",
                }}
              >
                基本
              </p>
              <ul className={styles.jibenul}>
                <li
                  className={styles.jibenlileft}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                    }}
                  >
                    <GiftOutlined />
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "18px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_info_date_birth}
                    {/* {this.state.birth} */}
                  </span>
                </li>
                <li
                  className={styles.jibenliright}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                    }}
                  >
                    <HeartOutlined />
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_sex}
                    ，正在寻求一个
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_like_sex}
                    性
                  </span>
                </li>
              </ul>
              <ul className={styles.jibenul}>
                <li
                  className={styles.jibenlileft}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    <i
                      className="iconfont"
                      style={{
                        fontSize: "25px",
                        color: "#212b36",
                        fontWeight: 500,
                      }}
                    >
                      &#xe642;
                    </i>
                    {/* <i className="icon iconfont icon-shengao"></i> */}
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].educational_background}
                  </span>
                </li>
                <li
                  className={styles.jibenliright}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                    }}
                  >
                    <EnvironmentOutlined />
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      `${this.state.peolistall[0].user_site_province}*${this.state.peolistall[0].user_site_city}*${this.state.peolistall[0].user_site_area}`}
                  </span>
                </li>
              </ul>
              <Divider style={{ borderTop: "0.5px solid #ccc" }} />
              <p
                style={{
                  color: "rgb(69, 79, 91)",
                  fontSize: "16px",
                  fontWeight: 900,
                }}
              >
                形态
              </p>
              <ul className={styles.jibenul}>
                <li
                  className={styles.jibenlileft}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "2px",
                  }}
                >
                  <span>
                    <i
                      className="iconfont"
                      style={{
                        fontSize: "25px",
                        color: "#212B36",
                        fontWeight: 700,
                      }}
                    >
                      &#xe637;
                    </i>
                  </span>
                  <span
                    style={{
                      marginLeft: "38px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_height}
                    cm
                  </span>
                </li>
                <li
                  className={styles.jibenliright}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    <i
                      className="iconfont"
                      style={{
                        fontSize: "25px",
                        color: "#212B36",
                        fontWeight: 700,
                      }}
                    >
                      &#xe7b2;
                    </i>
                  </span>

                  <span
                    style={{
                      marginLeft: "35px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_race}
                  </span>
                </li>
              </ul>
              <Divider style={{ borderTop: "0.5px solid #ccc" }} />
              <p
                style={{
                  color: "rgb(69, 79, 91)",
                  fontSize: "16px",
                  fontWeight: 900,
                  marginBottom: "28px",
                }}
              >
                兴趣爱好
              </p>
              <ul className={styles.hobylink}>
                {this.state.hoball &&
                  this.state.hoball.map((item) => {
                    return (
                      <li key={item} className={styles.hobyli}>
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <aside className={styles.tabserconright}>
              <Card
                style={{
                  width: "100%",
                  marginTop: "185px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <Avatar
                  shape="circle"
                  size={64}
                  icon={
                    <MessageFilled
                      onClick={() =>
                        this.golaiolao(this.state.idval, this.state.nicheng)
                      }
                      style={{ color: "#1DA57A", cursor: "pointer" }}
                    />
                  }
                />
                <p style={{ marginBottom: "0px" }}>
                  <Button
                    onClick={() =>
                      this.golaiolao(this.state.idval, this.state.nicheng)
                    }
                    type="primary"
                    shape="round"
                    style={{ width: "80%", marginTop: "50px" }}
                    size="large"
                  >
                    去聊聊
                  </Button>
                </p>
              </Card>
            </aside>
          </div>
        </div>
        <Olinefooter></Olinefooter>
        <BackTop>
          <UpSquareFilled style={{ fontSize: "40px", color: "#1DA57A" }} />
        </BackTop>
        <Modal
          centered
          footer={null}
          width="50%"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          closable={false}
        >
          <Carousel
            dotPosition="right"
            autoplay
            afterChange={this.onChangemadeng}
            className={styles.slickSlide}
          >
            {this.state.isfalsepic &&
              this.state.isfalsepic.map((item) => {
                return (
                  <img
                    key={item.id}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="example"
                    src={`${imgpath}media/${item.user_info_price}`}
                  />
                );
              })}
          </Carousel>
        </Modal>
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
export default connect(mapStateToProps)(peroseninfo);
