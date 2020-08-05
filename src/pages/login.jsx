import React, { Component } from "react";
// import { Link } from "react-router-dom";
// connect方法的作用:将额外的props传递给组件,并返回新的组件,组件在该过程中不会受到影响
// import { connect } from "react-redux";
// 引入action
// import { pkval } from "../store/actions.js";
import axios from "axios";
import styles from "../style/login.module.scss";
import { message, Form, Input, Button, Checkbox } from "antd";
import Hea from "../components/header/head";
// 引入底部组件
import Dibu from "../components/onlinefooter/linefooter";
// 引入base64 进行加密
import Base64 from "../ways/basecode";
// let Base64 = require("js-base64").Base64;
export class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      },
      tailLayout: {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      },
      pandanzhi: "",
    };
  }
  render() {
    // console.log(this.props.pk);
    // 信息验证通过后发送登录请求
    const onFinish = async (values) => {
      // console.log("Success:", values);
      const { data: res } = await axios.post("user/login/", values);
      // console.log(res);
      if (res.status !== 1) return message.error(res.msg);
      message.success("登录成功");
      // 将返回数据进行存储
      sessionStorage.setItem("token", res.results.token);
      // 将用户的昵称进行存储
      sessionStorage.setItem("pet_name", Base64.encode(res.results.username));
      // 将用户的pk进行存储  将pk进行加密
      sessionStorage.setItem("Verify_k", Base64.encode(res.results.pk));
      // // 然后跳转到登录后的首页online  或重新刷新页面
      // 或强制浏览器重新刷新当前页面
      window.location.reload();
    };
    return (
      <div className={styles.log}>
        <div className={styles.her}>
          {/* 头部组件 */}
          <Hea></Hea>
        </div>
        {/* 内容 */}
        <article className={styles.art}>
          <p className={styles.p}>
            <span
              style={{
                display: "block",
                width: "60px",
                height: "20px",
                lineHeight: "10px",
                backgroundColor: "#1DA57A",
                borderRadius: "6px",
              }}
            >
              登录
            </span>
          </p>
          <div className={styles.bloc}>
            <Form
              hideRequiredMark="true"
              colon="false"
              {...this.state.layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="用户"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入正确用户名或者邮箱",
                    pattern: new RegExp(
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      "g"
                    ),
                  },
                ]}
              >
                <Input placeholder="请输入用户名或者邮箱 " />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入正确的密码",
                    pattern: new RegExp(
                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                      "g"
                    ),
                  },
                ]}
              >
                <Input.Password placeholder="请输入您的密码" />
              </Form.Item>

              <Form.Item
                {...this.state.tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>记住用户密码</Checkbox>
              </Form.Item>

              <Form.Item {...this.state.tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  shape="round"
                  size="large"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </article>
        <Dibu style={{ height: "100%", lineHeight: "100%" }} />
      </div>
    );
  }
}

// // mapStateToProps:将state映射到组件的props中
// const mapStateToProps = (state) => {
//   return {
//     pk: state.pkval,
//   };
// };

// // mapDispatchToProps:将dispatch映射到组件的props中
// const mapDispatchToProps = (dispatch) => {
//   return {
//     pkval: (pk) => dispatch(pkval(pk)),
//   };
// };
export default login;
