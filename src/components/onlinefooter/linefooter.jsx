import React, { Component } from "react";
import styles from './linfooter.module.scss'
export class linefooter extends Component {
  render() {
    return (
      <div>
        <footer className={styles.jiaobu}>
          <p>联系客服 关于我们 联系我们 交友信息 隐私保护 帮助中心 安全中心</p>
          <p> 2020-2030 版权所有 不良和违法信息举报专线：0316-5266032</p>
        </footer>
      </div>
    );
  }
}

export default linefooter;
