import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Base64 from "../ways/basecode";
import {
  Button,
  Badge,
  Menu,
  Dropdown,
  message,
  Cascader,
  Tag,
  Input,
  Tabs,
  Divider,
  Select,
  InputNumber,
  DatePicker,
  BackTop,
  Form,
} from "antd";
import { TweenOneGroup } from "rc-tween-one";
import {
  MailOutlined,
  HeartFilled,
  PoweroffOutlined,
  DownOutlined,
  PictureOutlined,
  FolderAddOutlined,
  UserOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  GiftOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  UpSquareFilled,
  SettingFilled,
} from "@ant-design/icons";
import styles from "../style/myResume.module.scss";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
// 引入底部组件
import Olinefooter from "../components/onlinefooter/linefooter";
const { TabPane } = Tabs;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD";
export class myResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      // 设置控制tab 是否禁用
      isdisb: false,
      // 图片列表对象
      imgall: [],
      // 上传图片--------------
      // oldbirth: "",
      oldrace: "",
      oldlikesex: "",
      oldusesex: "",
      // ---------------------
      json: window.__CITY__,
      tags: [],
      inputVisible: false,
      inputValue: "",
      usenc: "",
      usepk: "",
      usesex: "",
      likesex: "",
      uesage: "",
      birth: "",
      educa: "",
      marital: "",
      useheight: "",
      intro: "",
      race: "",
      provincecity: [],
      country: "",
      menu: (
        <Menu onClick={this.handleMenuClick}>
          {/* <Menu.Item key="1" icon={<UserOutlined />}>
            我的简历
          </Menu.Item>
          <Menu.Item key="2" icon={<FolderOutlined />}>
            编辑个人资料
          </Menu.Item> */}
          <Menu.Item key="3" icon={<PoweroffOutlined />}>
            退出登录
          </Menu.Item>
        </Menu>
      ),
    };
  }
  handleMenuClick = (e) => {
    if (e.key === "3") {
      // 先清除sessionStorage 再返回到登录页面
      sessionStorage.clear();
      this.props.history.push("/login");
    }
  };
  // 处理数据格式
  chuli = () => {
    // console.log(this.state.json);
    let updata = this.state.json;
    // console.log(updata);
    for (let i = 0; i < updata.length; i++) {
      updata[i]["value"] = updata[i].label;
      for (let j = 0; j < updata[i].children.length; j++) {
        // 在更换value属性及值
        updata[i].children[j]["value"] = updata[i].children[j].label;
        for (let k = 0; k < updata[i].children[j].children.length; k++) {
          // 在更换区属性及值
          updata[i].children[j].children[k]["value"] =
            updata[i].children[j].children[k].label;
        }
      }
    }
    //设置
    this.setState({
      json: updata,
    });
  };
  //页面初次加载渲染 之前有次render()
  componentDidMount() {
    this.chuli();
    // 获取用户名
    if (sessionStorage.getItem("total")) {
      this.setState({
        usenc: Base64.decode(sessionStorage.getItem("pet_name")),
        total: Base64.decode(sessionStorage.getItem("total")),
      });
    } else {
      this.setState({
        usenc: Base64.decode(sessionStorage.getItem("pet_name")),
      });
    }
    // 获取数据接口 判断用户
    this.inforData();
  }
  // 发起获取信息接口
  inforData = async () => {
    // 获取用户pk
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    // console.log(usepk);
    const { data: res } = await axios.get("user/user_info/", {
      params: {
        user_pk: usepk,
      },
    });
    // console.log(res);
    if (res.status === 2) {
      // 此时用户没注册信息 简历为空 禁止
      this.setState({
        isdisb: true,
      });
      return message.warning(res.msg);
    }
    // 将获取到的数据展示到页面中
    if (res.status !== 1) return;
    let proxity = [];
    proxity.push(res.results.data.user_site_province);
    proxity.push(res.results.data.user_site_city);
    proxity.push(res.results.data.user_site_area);
    // console.log(proxity);
    // 将字符数组转换为数组
    // eslint-disable-next-line no-eval
    let hobby = eval("(" + res.results.data.user_hobbies + ")");
    // 先保存原始值进行展示
    this.setState({
      oldusesex: res.results.data.user_sex,
      oldlikesex: res.results.data.user_like_sex,
      oldrace: res.results.data.user_race,
      // oldbirth: res.results.data.user_info_date_birth,
      imgall: res.results.price,
      isdisb: false,
      birth: res.results.data.user_info_date_birth,
    });
    // 判断返回的性别男0 女1
    if (res.results.data.user_sex === "男") {
      res.results.data.user_sex = "0";
    } else {
      res.results.data.user_sex = "1";
    }
    // 判断返回的喜欢性别男0 女1
    if (res.results.data.user_like_sex === "男") {
      res.results.data.user_like_sex = "0";
    } else {
      res.results.data.user_like_sex = "1";
    }
    // 判断返回的宗主
    if (res.results.data.user_race === "高加索人") {
      res.results.data.user_race = "0";
    } else if (res.results.data.user_race === "非洲") {
      res.results.data.user_race = "1";
    } else if (res.results.data.user_race === "西班牙裔") {
      res.results.data.user_race = "2";
    } else if (res.results.data.user_race === "印度人") {
      res.results.data.user_race = "3";
    } else if (res.results.data.user_race === "中东人") {
      res.results.data.user_race = "4";
    } else if (res.results.data.user_race === "美洲原住民") {
      res.results.data.user_race = "5";
    } else if (res.results.data.user_race === "亚洲人") {
      res.results.data.user_race = "6";
    } else if (res.results.data.user_race === "混血") {
      res.results.data.user_race = "7";
    } else if (res.results.data.user_race === "其他") {
      res.results.data.user_race = "8";
    }
    this.setState({
      intro: res.results.data.user_intro,
      country: res.results.data.user_country,
      provincecity: proxity,
      usesex: res.results.data.user_sex,
      uesage: res.results.data.user_age,
      educa: res.results.data.educational_background,
      marital: res.results.data.marital_status,
      likesex: res.results.data.user_like_sex,
      useheight: res.results.data.user_height,
      race: res.results.data.user_race,
      tags: hobby,
    });
  };
  // 点击按钮发送提交请求
  pushallxinxi = async () => {
    // console.log(this.state.intro);
    if (this.state.intro === "") return message.warning("标签不能为空");
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    //处理省市
    // console.log(this.state.provincecity);
    let province = this.state.provincecity[0];
    let city = this.state.provincecity[1];
    let area = this.state.provincecity[2];
    console.log(province, city);
    const { data: res } = await axios.post("user/user_info/", {
      user_pk: usepk,
      user_sex: this.state.usesex,
      user_like_sex: this.state.likesex,
      user_age: this.state.uesage,
      user_info_date_birth: this.state.birth,
      educational_background: this.state.educa,
      marital_status: this.state.marital,
      user_height: this.state.useheight,
      user_intro: this.state.intro,
      user_race: this.state.race,
      user_hobbies: this.state.tags,
      user_site_province: province,
      user_site_city: city,
      user_site_area: area,
      user_country: this.state.country,
    });
    // console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    message.success(res.msg);
    // 刷新页面再次获取数据
    // 获取数据接口 判断用户
    this.inforData();
  };
  handleChange = (value) => {
    // console.log(value);
    // 设置用户性别
    this.setState({
      usesex: value,
    });
  };
  handleChangequer = (value) => {
    // console.log(`selected ${value}`);
    // 设置喜欢的用户性别
    this.setState({
      likesex: value,
    });
  };
  onChange = (value) => {
    // 设置用户的年龄
    // console.log(value);
    this.setState({
      uesage: value,
    });
  };
  ondataChange = (date, dateString) => {
    // 设置生日
    // console.log(dateString);
    this.setState({
      birth: dateString,
    });
  };
  handleChangeduca = (value) => {
    // 设置教育背景
    // console.log(value);
    this.setState({
      educa: value,
    });
  };
  handleChangemarital = (value) => {
    // 设置婚姻状况
    console.log(value);
    this.setState({
      marital: value,
    });
  };
  handleChangeheight = (value) => {
    // 设置用户的生高
    // console.log(value);
    this.setState({
      useheight: value,
    });
  };
  onChangeintro = () => {
    let content = document.getElementById("value").value;
    // 设置用户的简介
    // console.log(content);
    this.setState({
      intro: content,
    });
  };
  handleChangerace = (value) => {
    // 设置用户种族
    // console.log(value);
    this.setState({
      race: value,
    });
  };
  // 国家
  ondiliChange = (value) => {
    console.log(value);
    this.setState({
      country: value,
    });
  };
  // 坐标
  onChangeare = (value) => {
    // console.log(value);
    // 数组第一项为省 2项 为市 3项为区
    this.setState({
      provincecity: value,
    });
  };
  // 兴趣爱好
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    // console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };
  // 上传图片
  btnpic = () => {
    let file = document.getElementById("file");
    file.click(); // 调取系统选择图片的弹框
  };

  // 监听input的file变化值
  inputchange = (e) => {
    // console.log(e);
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    // 调用上传图片接口
    this.upload(file);
  };
  // 上传文件接口
  upload = async (file) => {
    // 获取用户pk
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    // 创建创建formdata对象
    let formData = new FormData();
    //通过set方法对值进行设置
    formData.append("imgFile", file);
    //可以通过append()方法来追加数据
    formData.append("user_pk", usepk);
    const { data: res } = await axios.post("user/user_info/add/img/", formData);
    // console.log(res);
    if (res.status !== 1) return;
    // 获取数据接口 判断用户
    this.inforData();
  };
  // 删除图片按钮 接口调用
  deletepic = async (value) => {
    // 获取用户pk
    let usepk = Base64.decode(sessionStorage.getItem("Verify_k"));
    const { data: res } = await axios.post("user/user_info/delete/img/", {
      user_pk: usepk,
      price_pk: value,
    });
    // console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    message.success(res.msg);
    // 再次调用数据接口
    this.inforData();
  };
  // 去会话列表页面
  goquhuihua = () => {
    this.props.history.push("/conver");
  };
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = async (values) => {
      // 当前端验证成功后发起请求
      console.log("Success:", values);
      const { data: res } = await axios.post("user/change/password/", {
        user_pk: Base64.decode(sessionStorage.getItem("Verify_k")),
        password: values.oldpassword,
        new_password: values.password,
        confirm_password: values.newpassword,
      });
      // console.log(res); {status: 1, msg: "密码修改成功"}
      if (res.status !== 1) return message.warning(res.msg);
      message.success(res.msg);
      // 清除token 退出登录
      // sessionStorage.removeItem("token");
      sessionStorage.clear();
      // 或强制浏览器重新刷新当前页面
      window.location.reload();
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const { tags, inputVisible, inputValue, total } = this.state;
    const { imgpath } = this.props;
    const tagChild = tags.map(this.forMap);
    return (
      <div className={styles.resall}>
        {/* <IconfontStyle /> */}
        {/* 存放个人头部信息 */}
        <header className={styles.onheasume}>
          {/*插入组件 */}
          {/* <LineHeader></LineHeader> */}
          <div className={styles.linezujian}>
            <div className={styles.healeft}>
              <Link to="/online" className={styles.healin}>
                <HeartFilled />
                LoveLove
              </Link>
            </div>
            <ul className={styles.onright}>
              <li className={styles.lineli}>
                <Button
                  onClick={this.goquhuihua}
                  disabled={this.state.isdisb}
                  shape="round"
                  icon={<MailOutlined />}
                  className={styles.bgcbtm}
                >
                  收信箱 <Badge count={total} />
                </Button>
              </li>
              <li className={styles.lineli}>
                <Dropdown overlay={this.state.menu}>
                  <Button
                    shape="round"
                    icon={<UserOutlined />}
                    className={styles.bgcbtm}
                  >
                    个人信息 <DownOutlined />
                  </Button>
                </Dropdown>
              </li>
            </ul>
          </div>
        </header>
        {/* nav */}
        <nav className={styles.navsume}>
          {/* 插入nav组件 */}
          <Olinenav></Olinenav>
        </nav>
        {/* 内容区域 */}
        <div className={styles.sumecon}>
          <Tabs
            defaultActiveKey={this.props.match.params.key}
            onChange={this.callback}
          >
            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  我的简历
                </span>
              }
              key="1"
              disabled={this.state.isdisb}
            >
              <ul className={styles.resul}>
                {this.state.imgall.map((item) => {
                  return (
                    <li className={styles.resli} key={item[1]}>
                      <img
                        className={styles.resimg}
                        alt="example"
                        src={`${imgpath}media/${item[0]}`}
                      />
                    </li>
                  );
                })}
              </ul>
              <div className={styles.reszhong}>
                <div className={styles.reszhongleft}>
                  <p>
                    <span
                      style={{
                        color: "#212B36",
                        fontWeight: 900,
                        fontSize: "30px",
                      }}
                    >
                      {this.state.usenc}
                    </span>
                    <i
                      style={{
                        color: "#212B36",
                        fontSize: "20px",
                        fontWeight: 400,
                      }}
                    >
                      &nbsp;&nbsp;{this.state.intro}
                    </i>
                  </p>
                  <p
                    style={{
                      color: "#212B36",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    <span>{this.state.uesage}</span>岁
                    <span>{this.state.oldusesex}</span>性
                  </p>
                  <p
                    style={{
                      color: "rgb(69, 79, 91)",
                      fontSize: "16px",
                      fontWeight: 900,
                      marginTop: "60px",
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
                        {this.state.birth}
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
                        {this.state.marital}，正在寻求一个
                        {this.state.oldlikesex}性
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
                      </span>
                      <span
                        style={{
                          marginLeft: "40px",
                          fontSize: "16px",
                          color: "#212b36",
                        }}
                      >
                        {this.state.educa}
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
                        {this.state.provincecity}
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
                        {this.state.useheight}cm
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
                        {this.state.oldrace}
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
                    {this.state.tags.map((item, index) => {
                      return (
                        <li key={index} className={styles.hobyli}>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={styles.reszhongright}></div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FolderAddOutlined />
                  编辑个人资料
                </span>
              }
              key="2"
            >
              <ul className={styles.resul}>
                {this.state.imgall.map((item) => {
                  return (
                    <li className={styles.resli} key={item[1]}>
                      <img
                        className={styles.resimg}
                        alt="example"
                        src={`${imgpath}media/${item[0]}`}
                      />
                    </li>
                  );
                })}
              </ul>
              <div className={styles.reszhong}>
                <div className={styles.reszhongleft}>
                  <p style={{ color: "rgb(33, 43, 54)" }}>昵称</p>
                  <p style={{ color: "#212B36", fontWeight: 900 }}>
                    {this.state.usenc}
                  </p>
                  {/* 个性 */}
                  <p style={{ color: "rgb(33, 43, 54)" }}>标签</p>
                  <Input
                    id="value"
                    defaultValue={this.state.intro}
                    type="text"
                    size="large"
                    placeholder={this.state.intro}
                    onBlur={this.onChangeintro}
                  />
                  <Divider style={{ color: "red" }} />
                  <p
                    style={{
                      color: "rgb(69, 79, 91)",
                      fontSize: "16px",
                      fontWeight: 900,
                    }}
                  >
                    位置
                  </p>
                  <ul className={styles.jibenul}>
                    <li className={styles.jibenlileft}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        国家
                      </p>
                      <Select
                        size="large"
                        value={this.state.country}
                        style={{ width: "100%" }}
                        onChange={this.ondiliChange}
                      >
                        <Option value="中国">中国</Option>
                        <Option value="外籍">外籍</Option>
                      </Select>
                    </li>
                    <li className={styles.jibenliright}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        坐标
                      </p>
                      {/* 省市区联动 */}
                      <Cascader
                        value={this.state.provincecity}
                        size="large"
                        style={{ width: "100%" }}
                        options={this.state.json}
                        onChange={this.onChangeare}
                        placeholder="选择省市区"
                      />
                    </li>
                  </ul>
                  <Divider style={{ color: "red" }} />
                  <p
                    style={{
                      color: "rgb(69, 79, 91)",
                      fontSize: "16px",
                      fontWeight: 900,
                    }}
                  >
                    基本
                  </p>
                  <ul className={styles.jibenul}>
                    <li className={styles.jibenlileft}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        性别
                      </p>
                      <Select
                        size="large"
                        value={this.state.usesex}
                        style={{ width: "100%" }}
                        onChange={this.handleChange}
                      >
                        <Option value="0">男</Option>
                        <Option value="1">女</Option>
                      </Select>
                    </li>
                    <li className={styles.jibenliright}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        年龄
                      </p>
                      <InputNumber
                        size="large"
                        style={{ width: "100%" }}
                        min={1}
                        max={120}
                        value={this.state.uesage}
                        onChange={this.onChange}
                      />
                    </li>
                  </ul>
                  <ul className={styles.jibenul}>
                    <li className={styles.jibenlileft}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        教育背景
                      </p>
                      <Select
                        value={this.state.educa}
                        size="large"
                        style={{ width: "100%" }}
                        onChange={this.handleChangeduca}
                      >
                        <Option value="博士">博士</Option>
                        <Option value="硕士">硕士</Option>
                        <Option value="研究生">研究生</Option>
                        <Option value="本科">本科</Option>
                        <Option value="大专">大专</Option>
                        <Option value="中学">中学</Option>
                      </Select>
                    </li>
                    <li className={styles.jibenliright}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        婚姻状况
                      </p>
                      <Select
                        size="large"
                        value={this.state.marital}
                        style={{ width: "100%" }}
                        onChange={this.handleChangemarital}
                      >
                        <Option value="已婚">已婚</Option>
                        <Option value="单身">单身</Option>
                      </Select>
                    </li>
                  </ul>
                  <ul className={styles.jibenul}>
                    <li className={styles.jibenlileft}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        生日
                      </p>
                      {/* 可以修改生日 */}
                      <DatePicker
                        style={{ width: "100%" }}
                        size="large"
                        onChange={this.ondataChange}
                        format={dateFormat}
                        placeholder={this.state.birth}
                      />
                    </li>
                    <li className={styles.jibenliright}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        寻求
                      </p>
                      <Select
                        size="large"
                        value={this.state.likesex}
                        style={{ width: "100%" }}
                        onChange={this.handleChangequer}
                      >
                        <Option value="0">男</Option>
                        <Option value="1">女</Option>
                      </Select>
                    </li>
                  </ul>
                  <Divider style={{ color: "red" }} />
                  <p
                    style={{
                      color: "rgb(69, 79, 91)",
                      fontSize: "16px",
                      fontWeight: 900,
                    }}
                  >
                    外貌特征
                  </p>
                  <ul className={styles.jibenul}>
                    <li className={styles.jibenlileft}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        高度
                      </p>
                      <Select
                        size="large"
                        value={this.state.useheight}
                        style={{ width: "100%" }}
                        onChange={this.handleChangeheight}
                      >
                        <Option value="150">150cm</Option>
                        <Option value="155">155cm</Option>
                        <Option value="160">160cm</Option>
                        <Option value="165">165cm</Option>
                        <Option value="170">170cm</Option>
                        <Option value="175">175cm</Option>
                        <Option value="180">180cm</Option>
                        <Option value="185">185cm</Option>
                        <Option value="190">190cm</Option>
                        <Option value="195">195cm</Option>
                        <Option value="200">200cm</Option>
                      </Select>
                    </li>
                    <li className={styles.jibenliright}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#212b36",
                        }}
                      >
                        种族
                      </p>
                      <Select
                        value={this.state.race}
                        size="large"
                        style={{ width: "100%" }}
                        onChange={this.handleChangerace}
                      >
                        <Option value="0">高加索人</Option>
                        <Option value="1">非洲</Option>
                        <Option value="2">西班牙裔</Option>
                        <Option value="3">印度人</Option>
                        <Option value="4">中东人</Option>
                        <Option value="5">美洲原住民</Option>
                        <Option value="6">亚洲人</Option>
                        <Option value="7">混血</Option>
                        <Option value="8">其他</Option>
                      </Select>
                    </li>
                  </ul>
                  {/* 兴趣爱好 */}
                  <Divider style={{ color: "red" }} />
                  <p
                    style={{
                      color: "rgb(69, 79, 91)",
                      fontSize: "16px",
                      fontWeight: 900,
                    }}
                  >
                    兴趣爱好
                  </p>

                  <div style={{ marginTop: "20px" }}>
                    <div style={{ marginBottom: 16 }}>
                      <TweenOneGroup
                        enter={{
                          scale: 0.8,
                          opacity: 0,
                          type: "from",
                          duration: 100,
                          onComplete: (e) => {
                            e.target.style = "";
                          },
                        }}
                        leave={{
                          opacity: 0,
                          width: 0,
                          scale: 0,
                          duration: 200,
                        }}
                        appear={false}
                      >
                        {tagChild}
                      </TweenOneGroup>
                    </div>
                    {inputVisible && (
                      <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag onClick={this.showInput} className="site-tag-plus">
                        <PlusOutlined /> 添加
                      </Tag>
                    )}
                  </div>
                  <p style={{ marginTop: "40px" }}>
                    <Button
                      onClick={this.pushallxinxi}
                      type="primary"
                      block
                      shape="round"
                      className={styles.myrebut}
                    >
                      保存提交
                    </Button>
                  </p>
                </div>
                <div className={styles.reszhongright}></div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <PictureOutlined />
                  上传图片
                </span>
              }
              key="3"
              disabled={this.state.isdisb}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "900" }}>上传照片</p>
                <p>最多上传4张图片到您的个人资料</p>
                <p>
                  请记住，您的脸必须在主照片中清晰可见。确保您在每张照片中都能被识别。
                </p>
                <Button
                  type="primary"
                  block
                  style={{ width: "50%", height: "50px", borderRadius: "10PX" }}
                  onClick={this.btnpic}
                >
                  点击上传
                </Button>
              </div>
              <h2 style={{ marginTop: "100px" }}>你的照片</h2>
              <p>最多添加4张照片。</p>
              <input
                type="file"
                id="file"
                // 只接受图像文件
                accept="image/*"
                style={{ display: "none" }}
                onChange={this.inputchange}
              />
              <ul className={styles.ulimgall}>
                {this.state.imgall.map((item, index) => {
                  return (
                    <li className={styles.ulliim} key={index}>
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                        src={`${imgpath}media/${item[0]}`}
                        alt=""
                      />
                      <p className={styles.bottoul}>
                        <Button
                          style={{ marginRight: "10px" }}
                          shape="circle"
                          icon={<DeleteOutlined />}
                          onClick={() => this.deletepic(item[1])}
                        ></Button>
                        <Button shape="circle" icon={<EyeOutlined />} />
                      </p>
                    </li>
                  );
                })}
              </ul>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <SettingFilled />
                  修改密码
                </span>
              }
              key="4"
              disabled={this.state.isdisb}
            >
              <div
                style={{
                  marginTop: "100px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="旧密码"
                    name="oldpassword"
                    rules={[
                      {
                        required: true,
                        message: "请输入你的旧密码",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="新密码"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "请输入新密码",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="确认新密码"
                    name="newpassword"
                    rules={[
                      {
                        required: true,
                        message: "请确认新密码",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      完成
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <Olinefooter></Olinefooter>
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
export default connect(mapStateToProps)(myResume);
