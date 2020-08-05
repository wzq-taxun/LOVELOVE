import React, { Component } from "react";
import { Link } from "react-router-dom";
// 引入头部组件
import Toubu from "../components/toubu/toubu";
// 引入底部组件
import Dibu from "../components/onlinefooter/linefooter";
import "../style/home.scss";
import "../style/modcs.module.scss";
import { Layout, Drawer, Carousel, Button } from "antd";
import {
  UserDeleteOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  TeamOutlined,
  CommentOutlined,
  ImportOutlined,
  HeartOutlined,
} from "@ant-design/icons";
// import Item from "antd/lib/list/Item";
const { Header, Footer, Content } = Layout;
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "large",
      numbers: ["1"],
      // 侧边栏的项
      listnum: [
        {
          id: 1,
          raticon: <ImportOutlined />,
          rattext: "登入",
          ratpath: "/login",
        },
        {
          id: 3,
          raticon: <CommentOutlined />,
          rattext: "收件箱",
          ratpath: "/inbox",
        },
        {
          id: 4,
          raticon: <TeamOutlined />,
          rattext: "我喜欢的",
          ratpath: "/meetyou",
        },
        {
          id: 5,
          raticon: <SearchOutlined />,
          rattext: "搜素",
          ratpath: "/insearch",
        },
        {
          id: 6,
          raticon: <EnvironmentOutlined />,
          rattext: "附近",
          ratpath: "/mycity",
        },
        {
          id: 7,
          raticon: <ClockCircleOutlined />,
          rattext: "我的城市",
          ratpath: "/lastsignup",
        },
        {
          id: 8,
          raticon: <UserDeleteOutlined />,
          rattext: "喜欢我的",
          ratpath: "/witheme",
        },
      ],
      visible: false,
      placement: "left",
      kongzhianniu: true,
      // 一组图片
      friderpicall: [
        require("../asstes/img/wallhaven-lm612y.jpg"),
        require("../asstes/img/wallhaven-kwjo6q.jpg"),
        require("../asstes/img/wallhaven-zme1mo.jpg"),
        require("../asstes/img/wallhaven-g8eqme.jpg"),
      ],
    };
  }
  // // 侧边抽屉控制
  showDrawer = () => {
    this.setState({
      visible: true,
      kongzhianniu: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      kongzhianniu: true,
    });
  };
  render() {
    const itemsmei = (
      <div className="contli">
        <div className="dinweihe">
          <h1 style={{ fontWeight: "900", fontSize: "28px" }}>
            <span>准备Love了嘛?</span>
          </h1>
          <div className="direshu">
            欢迎使用最大的约会平台之一LOVE。立即注册，结识您附近的单身人士。如果您已经有一个帐户，请在上面登录。LOVE愉快！
          </div>
          <div>
            <Button
              type="primary"
              shape="round"
              size={this.state.size}
              style={{ width: "200px" }}
            >
              <Link to={"/regist"}>立即注册</Link>
            </Button>
          </div>
        </div>
        <Carousel autoplay dots={false} easing="swing">
          {this.state.friderpicall.map((item, index) => {
            return (
              <div key={index}>
                <img
                  src={item}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    );
    // // 图标变量
    const lovetu = (
      <span>
        <HeartOutlined />
        &nbsp;&nbsp;今天你认识的人
      </span>
    );
    // 侧边栏的项目
    const listart = this.state.listnum.map((item) => (
      <p key={item.id} className="reticoon">
        <Link to={item.ratpath} className="retlink">
          {item.raticon}
          &nbsp;&nbsp;{item.rattext}
        </Link>
      </p>
    ));
    return (
      <div className="hom">
        <Layout>
          <Header>
            {/* 插入头部组件 */}
            <Toubu
              msg={this.state.kongzhianniu}
              changeshow={this.showDrawer}
              changeclose={this.onClose}
            ></Toubu>
          </Header>
          <Content>
            {itemsmei}
            <ul className="ulhome">
              <li className="lihom">
                <p>
                  <i
                    className="iconfont"
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                      fontWeight: 500,
                    }}
                  >
                    &#xe77d;
                  </i>
                </p>
                <p>
                  <span className="yanse">可信</span>的交友网站
                </p>
              </li>
              <li className="lihom">
                <p>
                  <i
                    className="iconfont"
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                      fontWeight: 500,
                    }}
                  >
                    &#xe77d;
                  </i>
                </p>
                <p>
                  <span className="yanse">最高质量</span>的约会池
                </p>
              </li>
              <li className="lihom">
                <p>
                  <i
                    className="iconfont"
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                      fontWeight: 500,
                    }}
                  >
                    &#xe77d;
                  </i>
                </p>
                <p>
                  <span className="yanse">10分钟</span>找到和谐的love
                </p>
              </li>
            </ul>
            {/* 单身 */}
            <div className="youzhidan">
              <h3
                style={{
                  fontSize: "28px",
                  color: "#4c4c4c",
                  fontWeight: "900",
                }}
              >
                像您一样的优质单身
              </h3>
              <ul className="youzhidanul">
                <li className="leftyouzhi">
                  <p
                    style={{
                      width: "100%",
                      textAlign: "start",
                      fontSize: "16px",
                    }}
                  >
                    像您一样，他们厌倦了约会游戏。您可以完全放心，所有兼容的匹配都在寻找与您相同的事物。永恒的爱。
                  </p>
                  <p style={{ width: "100%", textAlign: "start" }}>
                    <Button type="primary" size="large">
                      <Link to={"/regist"}>现在加入</Link>
                    </Button>
                  </p>
                </li>
                <li className="rightyouzhi">
                  <i
                    className="iconfont icon-xin-qinglv"
                    style={{
                      fontSize: "200px",
                      color: "#1DA57A",
                      fontWeight: 500,
                    }}
                  />
                </li>
              </ul>
            </div>
          </Content>
          <Footer>
            <Dibu />
          </Footer>
        </Layout>
        {/* 侧边抽屉 */}
        <Drawer
          title={lovetu}
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          key={this.state.placement}
          mask={false}
          // maskClosable={true}
          width={500}
          drawerStyle={{
            background: "#0CAEB1",
            paddingTop: "64px",
            color: "#fff",
          }}
          headerStyle={{ background: "#1A5F78", borderBottom: "none" }}
        >
          {/* 侧边栏内容 */}
          {listart}
        </Drawer>
      </div>
    );
  }
}

export default home;
