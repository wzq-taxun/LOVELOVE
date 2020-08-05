import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "../style/mycity.module.scss";
// 引入头部组件
import Toubu from "../components/toubu/toubu";
// 引入侧边栏组件
import Artce from "../components/artce/Artce";
// 引入底部组件
import Dibu from "../components/onlinefooter/linefooter";
import { Layout, Button } from "antd";
const { Header, Footer, Content } = Layout;
let Mycity = () => {
  // 控制左边的按钮是否变化
  const [isshow, setIsshow] = useState(true);
  const pchildref = useRef();
  function parentDivClick() {
    setIsshow(false);
    // 父组件调用子组件方法
    pchildref.current._childFn();
  }
  function parentDivClick2() {
    setIsshow(true);
    // 父组件调用子组件方法
    pchildref.current._haiZi();
  }
  // 跳转注册页面
  const history = useHistory();
  function handleClick() {
    history.push("/regist");
  }
  return (
    <div className={styles.inboxall}>
      <Layout>
        <Header className={styles.inboxhead}>
          <Toubu
            msg={isshow}
            changeshow={parentDivClick}
            changeclose={parentDivClick2}
          ></Toubu>
        </Header>
        <Content className={styles.inboconte}>
          <div className={styles.incleft}>
            <h1 className={styles.inbh1}>找出 当地人 就像你一样爱你的城市。</h1>
            <p className={styles.inb}>
              <Button
                type="primary"
                shape="round"
                block
                className={styles.inbottom}
                onClick={handleClick}
              >
                现在注册
              </Button>
            </p>
            <h3 className={styles.inph3}>
              使用love搜索您所在城市的单身人士。
            </h3>
          </div>
          <div className={styles.inbright}>
            {/* <img
              className={styles.inbimg}
              src={require("../asstes/img/graphic_lastOnlineMyCity.png")}
              alt=""
            /> */}
            <i
              className="iconfont"
              style={{
                fontSize: "200px",
                color: "#1DA57A",
                fontWeight: 500,
              }}
            >
           &#xe646;
            </i>
          </div>
        </Content>
        <Footer>
          <Dibu />
        </Footer>
      </Layout>
      {/* 导入侧边栏 */}
      <Artce
        ref={pchildref}
        pramesclickhand={() => {
          setIsshow(true);
        }}
      ></Artce>
    </div>
  );
};

export default Mycity;
