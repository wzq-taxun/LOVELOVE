import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Tabs,
  message,
  Pagination,
  BackTop,
  Skeleton,
  Result,
  Button,
} from "antd";
import styles from "../style/oncity.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
// 引入底部组件
import Olinefooter from "../components/onlinefooter/linefooter";
import { UpSquareFilled, SmileOutlined } from "@ant-design/icons";
import Axios from "axios";
import Base64 from "../ways/basecode";
const { TabPane } = Tabs;
export class oncity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 3,
      lilistall: [],
      lilistallera: [],
      // 用户点击爱心的用户的id
      islikeall: [],
      // 页码总数
      numzong: 0,
      numzongera: 0,
      // 当前页数
      serpagenew: 1,
      serpagenewera: 1,
      loading: true,
      // 判断显示隐藏
      isdispaly: true,
    };
  }
  // 页面初次渲染页面
  componentDidMount() {
    this.callbacktab("1");
    this.inforData();
  }
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
    if (res.status !== 1) return;
    //  将本用户喜欢的人列出
    this.setState({
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
    if (Base64.decode(sessionStorage.getItem("Nearthecity")) === "1") {
      this.onChangecity(this.state.serpagenew);
    } else {
      this.onChangefujin(this.state.serpagenewera);
    }
  };
  // /获取我的城市的接口
  getcitypeo = async (value, url) => {
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    const { data: res } = await Axios.post(url, {
      user_pk: usepk,
      page: value,
    });
    // console.log(res);
    if (res.status !== 1) {
      // message.warning(res.msg);
      this.setState({
        loading: false,
        isdispaly: false,
      });
      return;
    }
    // 计算出页码数总数
    let numzong = parseInt(res.results.contacts) * 10;
    // 对返回的数据进行操作
    let newdatall = res.results.same_data;
    // console.log(newdatall);
    let piclistall = res.results.price_list;
    // console.log(piclistall);
    for (let i = 0; i < newdatall.length; i++) {
      for (let j = 0; j < piclistall.length; j++) {
        if (newdatall[i].user_id === piclistall[j][0]) {
          newdatall[i].newpic = piclistall[j][1];
        }
      }
    }
    if (Base64.decode(sessionStorage.getItem("Nearthecity")) === "1") {
      this.setState({
        lilistall: newdatall,
        numzong,
        serpagenew: value,
        loading: false,
        isdispaly: true,
      });
    } else {
      this.setState({
        lilistallera: newdatall,
        numzongera: numzong,
        serpagenewera: value,
        loading: false,
        isdispaly: true,
      });
    }
  };

  // 携带id去对应详情页面
  gopeoxiang = (value) => {
    // console.log(value);
    this.props.history.push({
      pathname: "/personinfo",
      state: { name: value },
    });
  };
  // 分页功能 // 调用分页接口
  onChangecity = (page) => {
    this.setState({
      loading: true,
    });
    let url = "user/same_city/";
    this.getcitypeo(page, url);
  };
  onChangefujin = (page) => {
    this.setState({
      loading: true,
    });
    let url = "user/nearby/";
    this.getcitypeo(page, url);
  };
  // tab 切换
  callbacktab = (key) => {
    // 此时将key值进行保存
    sessionStorage.setItem("Nearthecity", Base64.encode(key));
    // 当切换到2时触发 喜欢我的接口之分页第一页
    if (key === "1") {
      this.onChangecity(1);
    } else {
      this.onChangefujin(1);
    }
  };
  // 去首页发现用户
  quxunline = () => {
    this.props.history.push("/");
  };
  render() {
    const { loading } = this.state;
    const { imgpath } = this.props;
    //  我的城市用户结果列表
    let lilistall = this.state.lilistall;
    let lilist = lilistall.map((item) => {
      return (
        <li className={styles.liserch} key={item.user_id}>
          <ul
            className={styles.tuwenulli}
            onClick={() => this.gopeoxiang(item.user_id)}
          >
            <li className={styles.imglid}>
              <img
                className={styles.imgg}
                src={`${imgpath}/media/${item.newpic}`}
                alt=""
              />
            </li>
            <li className={styles.spanid}>
              <p className={styles.pando}>{item.username}</p>
              <p className={styles.pand}>{item.user_intro}</p>
              <p className={styles.pandora}>
                <span>{item.user_age}</span>-
                <span className="st-icon-pandora">{item.marital_status}</span>-
                <span className="st-icon-pandora">
                  {item.user_site_province}*{item.user_site_city}*
                  {item.user_site_area}
                </span>
              </p>
            </li>
          </ul>
          <div className={styles.likpeo}>
            {/* 注意render()自动调用点击事件 通过箭头函数来改变  */}
            {this.state.islikeall.indexOf(item.user_id) !== -1 ? (
              <i
                onClick={() => this.iszan(item.user_id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px", color: "#1DA57A" }}
              ></i>
            ) : (
              <i
                onClick={() => this.iszan(item.user_id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px" }}
              ></i>
            )}
          </div>
        </li>
      );
    });
    // 我的附进用户
    let lilistallera = this.state.lilistallera;
    let lilistera = lilistallera.map((item) => {
      return (
        <li className={styles.liserch} key={item.user_id}>
          <ul
            className={styles.tuwenulli}
            onClick={() => this.gopeoxiang(item.user_id)}
          >
            <li className={styles.imglid}>
              <img
                className={styles.imgg}
                src={`${imgpath}/media/${item.newpic}`}
                alt=""
              />
            </li>
            <li className={styles.spanid}>
              <p className={styles.pando}>{item.username}</p>
              <p className={styles.pand}>{item.user_intro}</p>
              <p className={styles.pandora}>
                <span>{item.user_age}</span>-
                <span className="st-icon-pandora">{item.marital_status}</span>-
                <span className="st-icon-pandora">
                  {item.user_site_province}*{item.user_site_city}*
                  {item.user_site_area}
                </span>
              </p>
            </li>
          </ul>
          <div className={styles.likpeo}>
            {/* 注意render()自动调用点击事件 通过箭头函数来改变  */}
            {this.state.islikeall.indexOf(item.user_id) !== -1 ? (
              <i
                onClick={() => this.iszan(item.user_id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px", color: "#1DA57A" }}
              ></i>
            ) : (
              <i
                onClick={() => this.iszan(item.user_id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px" }}
              ></i>
            )}
          </div>
        </li>
      );
    });
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
          <Olinenav idval={this.state.id}></Olinenav>
        </nav>
        {/* 主要内容 */}
        <div className={styles.containlike}>
          <Tabs defaultActiveKey="1" onChange={this.callbacktab}>
            <TabPane tab="我的城市" key="1">
              <div className={styles.tabsercon}>
                {this.state.isdispaly ? (
                  <Skeleton loading={loading} active avatar>
                    <ul className={styles.tabserconleft}>
                      {lilist}
                      <li className={styles.pagee}>
                        <Pagination
                          defaultCurrent={1}
                          current={this.state.serpagenew}
                          total={this.state.numzong ? this.state.numzong : 10}
                          onChange={this.onChangecity}
                        />
                      </li>
                    </ul>
                  </Skeleton>
                ) : (
                  <ul className={styles.tabserconleft}>
                    <Result
                      icon={<SmileOutlined />}
                      title="你所在的城市暂没有用户"
                      extra={
                        <Button type="primary" onClick={this.quxunline}>
                          去发现
                        </Button>
                      }
                    />
                  </ul>
                )}

                <aside className={styles.tabserconright}></aside>
              </div>
            </TabPane>
            <TabPane tab="附近的人" key="2">
              <div className={styles.tabsercon}>
                {this.state.isdispaly ? (
                  <Skeleton loading={loading} active avatar>
                    <ul className={styles.tabserconleft}>
                      {lilistera}
                      <li className={styles.pagee}>
                        <Pagination
                          defaultCurrent={1}
                          current={this.state.serpagenewera}
                          total={
                            this.state.numzongera ? this.state.numzongera : 10
                          }
                          onChange={this.onChangefujin}
                        />
                      </li>
                    </ul>
                  </Skeleton>
                ) : (
                  <ul className={styles.tabserconleft}>
                    <Result
                      icon={<SmileOutlined />}
                      title="你的附近暂没有用户"
                      extra={
                        <Button type="primary" onClick={this.quxunline}>
                          去发现
                        </Button>
                      }
                    />
                  </ul>
                )}

                <aside className={styles.tabserconright}></aside>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <Skeleton loading={loading} active avatar>
          <Olinefooter />
        </Skeleton>
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
export default connect(mapStateToProps)(oncity);
