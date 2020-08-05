import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "../style/Meetyou.module.scss";
// 引入头部组件
import Toubu from "../components/toubu/toubu";
// 引入侧边栏组件
import Artce from "../components/artce/Artce";
// 引入底部组件
import Dibu from "../components/onlinefooter/linefooter";
import { Layout, Button } from "antd";
const { Header, Footer, Content } = Layout;
let Meetyou = () => {
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
            <h1 className={styles.inbh1}>爱上 某人 一见钟情 跟我碰面。。</h1>
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
              通过love了解您附近所有的单身人士。
            </h3>
          </div>
          <div className={styles.inbright}>
            {/* <img
              className={styles.inbimg}
              src={require("../asstes/img/爱心.png")}
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
              &#xe616;
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

export default Meetyou;
