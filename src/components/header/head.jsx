import React, { Component } from "react";
import styles from "./head.module.scss";
import { Link } from "react-router-dom";
import { HeartFilled } from "@ant-design/icons";
export class head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 鼠标滑过
      //   linkStyle: {},
    };
  }
  render() {
    return (
      <div className={styles.log}>
        <header className={styles.tou}>
          <div className={styles.touleft}>
            <Link to="/">
              <HeartFilled />
              LoveLove
            </Link>
          </div>
          <ul className={styles.ull}>
            <li className={styles.li}>
              <Link className={styles.lia} to="/login">
                登录
              </Link>
            </li>
            <li className={styles.li} style={{ color: "#E5E5E5" }}>
              |
            </li>
            <li className={styles.li}>帮助</li>
            <li className={styles.li} style={{ color: "#E5E5E5" }}>
              |
            </li>
            <li className={styles.li}>
              <Link className={styles.lia} to="/regist">
                注册
              </Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

export default head;
