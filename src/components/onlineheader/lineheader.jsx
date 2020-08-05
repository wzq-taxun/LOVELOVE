import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./lineheader.module.scss";
import { Button, Menu, Dropdown, Badge } from "antd";
import {
  PoweroffOutlined,
  FolderOutlined,
  DownOutlined,
  HeartFilled,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Base64 from "../../ways/basecode";
let lineheader = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [statenum, setstatenum] = useState(0);
  // console.log(statenum);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      const { data: res } = await axios.post("user/receive/chat_list/", {
        user_pk: Base64.decode(sessionStorage.getItem("Verify_k")),
      });
      console.log(res);
      if (res.status !== 1) return;
      setstatenum(res.results.total);
      //将总数存储在sessionStorige中
      sessionStorage.setItem("total", Base64.encode(res.results.total));
    };
    fetchData();
  }, []);
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        我的简历
      </Menu.Item>
      <Menu.Item key="2" icon={<FolderOutlined />}>
        编辑个人资料
      </Menu.Item>
      <Menu.Item key="3" icon={<PoweroffOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let history = useHistory();
  function handleMenuClick(e) {
    // message.info("Click on menu item.");
    // 判断key值来确定逻辑
    console.log("click", e);
    if (e.key === "3") {
      // 先清除sessionStorage 再返回到登录页面
      sessionStorage.clear();
      history.push("/login");
    } else if (e.key === "1") {
      // 跳转到我的简历组件
      history.push("/myresume1");
    } else {
      // 跳转到个人资料修改组件
      history.push("/myresume2");
    }
  }
  // 去会话列表页面
  function goquhuihua() {
    history.push("/conver");
  }
  return (
    <div className={styles.linezujian}>
      <div className={styles.healeft}>
        <Link to="/" className={styles.healin}>
          <HeartFilled />
          LoveLove
        </Link>
      </div>
      <ul className={styles.onright}>
        <li className={styles.lineli}>
          <Button
            onClick={goquhuihua}
            shape="round"
            icon={<MailOutlined />}
            className={styles.bgcbtm}
          >
            收信箱 <Badge count={statenum} />
          </Button>
        </li>
        <li className={styles.lineli}>
          <Dropdown overlay={menu}>
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
  );
};

export default lineheader;
