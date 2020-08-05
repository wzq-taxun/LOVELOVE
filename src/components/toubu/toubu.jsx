import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
// 引入样式
import styles from "./toubu.module.scss";
import {
  UnorderedListOutlined,
  HeartFilled,
  ColumnHeightOutlined,
} from "@ant-design/icons";
function toubu(props) {
  const { changeshow, changeclose, msg } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let history = useHistory();
  function handleClick() {
    history.replace("/regist");
  }
  function homeClick() {
    history.replace("/");
  }
  return (
    <div className={styles.toubuhead}>
      <div className={styles.homleft}>
        {msg ? (
          <UnorderedListOutlined onClick={changeshow} />
        ) : (
          <ColumnHeightOutlined onClick={changeclose} />
        )}
      </div>
      <div className={styles.homcen} onClick={homeClick}>
        <HeartFilled />
        LoveLove
      </div>
      <div className={styles.homrig}>
        <ul className={styles.ultouto}>
          <li className={styles.litobu}>
            <Link to="/login">登录</Link>
          </li>
          <li className={styles.litobu}>
            <Link to="/login">帮助</Link>
          </li>
          <li className={styles.litobu}>
            <Button type="primary" shape="round" onClick={handleClick}>
              注册
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default toubu;
