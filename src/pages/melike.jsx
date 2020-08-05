import React, { Component } from "react";
import { connect } from "react-redux";
import Base64 from "../ways/basecode";
import {
  Tabs,
  message,
  Pagination,
  BackTop,
  Result,
  Button,
  Popover,
  Divider,
  Skeleton,
} from "antd";
import styles from "../style/melike.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
// 引入底部组件
import Olinefooter from "../components/onlinefooter/linefooter";
import {
  UpSquareFilled,
  SmileOutlined,
  EllipsisOutlined,
  MessageFilled,
} from "@ant-design/icons";
import Axios from "axios";
const { TabPane } = Tabs;
export class melike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      lilistall: [],
      lilistallme: [],
      numzong: 0,
      numzongme: 0,
      // 判断显示隐藏
      isdispaly: true,
      // 当前页码数
      pagenum: 1,
      pagenumme: 1,
      // 点赞人的id
      islikeall: [],
      loading: true,
    };
  }
  // 页面初次渲染页面
  componentDidMount() {
    this.callback("1");
    // 获取用户的自己信息
    this.inforData();
  }
  // /获取用户喜欢的接口 喜欢我的用户 公用
  getlikepeo = async (value, url) => {
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    const { data: res } = await Axios.post(url, {
      user_pk: usepk,
      page: value,
    });
    if (res.status !== 1) {
      this.setState({
        isdispaly: false,
        loading: false,
      });
      return;
    }
    // 计算出页码数总数
    let numzong = parseInt(res.results.contacts) * 10;
    // 对返回的数据进行操作
    let newdatall = res.results.like_data;
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
    //此时判断tab栏在哪里
    let istabkey = Base64.decode(sessionStorage.getItem("like_list_switch"));
    if (istabkey === "1") {
      this.setState({
        lilistallme: newdatall,
        numzongme: numzong,
        pagenumme: value,
        isdispaly: true,
        loading: false,
      });
    } else {
      this.setState({
        lilistall: newdatall,
        numzong,
        pagenum: value,
        isdispaly: true,
        loading: false,
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
  // 分页功能 我喜欢
  onChangelike = (page) => {
    this.setState({
      loading: true,
    });
    let url = "user/user_like/";
    // 调用分页接口
    this.getlikepeo(page, url);
  };
  // 喜欢我的
  onChangelikeme = (page) => {
    this.setState({
      loading: true,
    });
    let url = "user/like/me/";
    this.getlikepeo(page, url);
  };
  quxunline = () => {
    this.props.history.push("/online");
  };
  // tab栏切换时触发函数
  callback = (key) => {
    // 此时将key值进行保存
    sessionStorage.setItem("like_list_switch", Base64.encode(key));
    // 当切换到2时触发 喜欢我的接口之分页第一页
    if (key === "2") {
      this.onChangelikeme(1);
    } else {
      this.onChangelike(1);
    }
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
    //此时判断tab栏在哪里
    let istabkey = Base64.decode(sessionStorage.getItem("like_list_switch"));
    if (istabkey === "1") {
      this.onChangelike(this.state.pagenum);
    } else {
      this.onChangelikeme(this.state.pagenewme);
    }
  };
  // 发起用户自己的信息请求获取自己点赞了那些人
  inforData = async () => {
    // 获取用户pk
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
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
  // 携带对应用户的id去聊天界面
  golaiolao = (val1, val2) => {
    this.props.history.push({
      pathname: "/chat",
      query: { name: val1, name2: val2 },
    });
  };
  render() {
    const { loading } = this.state;
    const { imgpath } = this.props;
    //  喜欢我的结果列表
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
    // 我喜欢的结果列表
    let lilistallme = this.state.lilistallme;
    let lilistme = lilistallme.map((item) => {
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
            <Popover
              placement="bottomRight"
              content={
                <div>
                  <Button
                    onClick={() => this.golaiolao(item.user_id, item.username)}
                    shape="round"
                    style={{ width: "100%", color: "#1DA57A" }}
                    icon={<MessageFilled />}
                  >
                    去聊聊天？
                  </Button>
                  <Divider
                    style={{ margin: "10px 0", borderTop: "1px solid #ccc" }}
                  />
                  <Button
                    shape="round"
                    onClick={() => this.iszan(item.user_id)}
                    style={{
                      width: "100%",
                      color: "#1DA57A",
                      display: "flex",
                      alignItems: "center",
                    }}
                    icon={
                      <i
                        className="icon iconfont icon-buxihuan1"
                        style={{ paddingRight: "5px" }}
                      ></i>
                    }
                  >
                    取消喜欢？
                  </Button>
                </div>
              }
              trigger="click"
            >
              <EllipsisOutlined className={styles.likeiconme} />
            </Popover>
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
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="我喜欢的" key="1">
              <div className={styles.tabsercon}>
                {this.state.isdispaly ? (
                  <Skeleton loading={loading} active avatar>
                    <ul className={styles.tabserconleft}>
                      {lilistme}
                      <li className={styles.pagee}>
                        <Pagination
                          current={this.state.pagenumme}
                          defaultCurrent={1}
                          total={
                            this.state.numzongme ? this.state.numzongme : 10
                          }
                          onChange={this.onChangelike}
                        />
                      </li>
                    </ul>
                  </Skeleton>
                ) : (
                  <ul className={styles.tabserconleft}>
                    <Result
                      icon={<SmileOutlined />}
                      title="快去寻找喜欢的人"
                      extra={
                        <Button type="primary" onClick={this.quxunline}>
                          寻找
                        </Button>
                      }
                    />
                  </ul>
                )}
                <aside className={styles.tabserconright}></aside>
              </div>
            </TabPane>
            <TabPane tab="喜欢我的" key="2">
              <div className={styles.tabsercon}>
                {this.state.isdispaly ? (
                  <Skeleton loading={loading} active avatar>
                    <ul className={styles.tabserconleft}>
                      {lilist}
                      <li className={styles.pagee}>
                        <Pagination
                          current={this.state.pagenum}
                          defaultCurrent={1}
                          total={this.state.numzong ? this.state.numzong : 10}
                          onChange={this.onChangelikeme}
                        />
                      </li>
                    </ul>
                  </Skeleton>
                ) : (
                  <ul className={styles.tabserconleft}>
                    <Result
                      icon={<SmileOutlined />}
                      title="加油！上传图片，完善资料，喜欢你的人正在赶来"
                      extra={
                        <Button type="primary" onClick={this.quxunline}>
                          寻找
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
export default connect(mapStateToProps)(melike);
