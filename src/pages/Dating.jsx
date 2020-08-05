import React, { useRef, useState} from "react";
import { useHistory } from "react-router-dom"
import { Layout, Button, Card } from "antd";
import styles from "../style/dating.module.scss";
// 引入头部组件
import Toubu from "../components/toubu/toubu";
// 引入侧边栏组件
import Artce from "../components/artce/Artce";
const { Header, Footer, Content } = Layout;
const { Meta } = Card;
function Dating() {
  // 卡片数量
  const [carnumber] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
  ]);
  // 控制左边的按钮是否变化
  const [isshow, setIsshow] = useState(true);
  // 相当于componentDidMount 和 componentDidUpdate:
  //   useEffect(() => {
  //     // 使用浏览器API更新页面标题
  //     // eslint-disable-next-line no-template-curly-in-string
  //     document.title = "You clicked ${count} times";
  //   });
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
    <div className={styles.datatall}>
      <Layout>
        <Header className={styles.datahea}>
          <Toubu
            msg={isshow}
            changeshow={parentDivClick}
            changeclose={parentDivClick2}
          ></Toubu>
        </Header>
        <Content>
          {/* 内容中上 */}
          <div className={styles.dacontent}>
            <h1 className={styles.dah1}>认识单身男女</h1>
            <h3 className={styles.dah3}>免费注册并开始约会</h3>
            <p className={styles.dap}>
              <Button
                type="primary"
                shape="round"
                block
                className={styles.babottom}
                onClick={handleClick}
              >
                现在注册
              </Button>
            </p>
          </div>
          {/* 内容中下 */}

          <div className={styles.daconxia}>
            {carnumber.map((item) => {
              return (
                <Card
                  key={item}
                  className={styles.carditem}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                >
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              );
            })}
          </div>

          {/* <button></button> */}
        </Content>
        <Footer>Footer</Footer>
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
}
export default Dating;
