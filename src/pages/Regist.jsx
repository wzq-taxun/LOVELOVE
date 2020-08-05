import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../style/Regist.module.scss";
import Hea from "../components/header/head";
import {
  message,
  Card,
  Form,
  Input,
  Tooltip,
  Select,
  Checkbox,
  Button,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
// 引入底部组件
import Dibu from "../components/onlinefooter/linefooter";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
let Regist = () => {
  const [form] = Form.useForm();
  // 提交表单校验成功
  let history = useHistory();
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    const { data: res } = await axios.post("user/register/", {
      username: values.nickname,
      password: values.password,
      confirm_password: values.confirm,
      email: values.email,
      mobile: values.phone,
    });
    // console.log(res);
    if (res.status !== 1) return message.error(res.msg);
    message.success(res.msg);
    // 跳转到登录页
    history.push("/login");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className={styles.reg}>
      {/* 导入头部 */}
      <div className={styles.regtou}>
        <Hea></Hea>
      </div>
      <div className={styles.regtiao}>
        <ul className={styles.ult}>
          <li className={styles.uli}></li>
          <li className={styles.uli}></li>
          <li className={styles.uli}></li>
          <li className={styles.uli}></li>
          <li className={styles.uli}></li>
        </ul>
      </div>
      <div className={styles.nei}>
        <p className={styles.p1}>每天有超过70,000的新人们加入！</p>
        <p className={styles.p2}>
          数百万人使用LoveLove是因为他们想找到自己的知己！
        </p>
        <Card
          title="注册信息"
          // extra={<a href="#">More</a>}
          style={{ width: 800 }}
          className={styles.cardd}
        >
          <Form
            className={styles.antregist}
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              // residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "请输入正确E-mail!",
                  pattern: new RegExp(
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    "g"
                  ),
                },
                {
                  required: true,
                  message: "请输入 E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "请输入8~16位，由数字与字母组成",
                  pattern: new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                    "g"
                  ),
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请输入8~16位，由数字与字母组成",
                  // pattern: new RegExp(
                  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                  //   "g"
                  // ),
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject("两次密码不一致");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="nickname"
              label={
                <span>
                  昵称&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: "请输入正确手机号码!",
                  pattern: new RegExp(/^1[3-9]\d{9}$/, "g"),
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject("应该接受协议"),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                我已阅读<a href="javascript">协议</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                block
                shape="round"
                className={styles.rebut}
              >
                继续
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Dibu style={{ height: "100%", lineHeight: "100%" }} />
    </div>
  );
};

export default Regist;
