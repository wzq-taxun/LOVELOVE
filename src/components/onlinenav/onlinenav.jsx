import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./onlinenav.module.scss";
export class onlinenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: null,
    };
  }
  // 页面渲染前接受传参数据
  componentDidMount() {
    // 通过this.props 来接受父组件传递过来的参数
    // console.log(this.props.idval);
    if (this.props.idval === undefined) return;
    this.setState({
      currentIndex: parseInt(this.props.idval),
    });
  }
  setCurrentIndex = (event) => {
    // console.log()
    let num = parseInt(event.currentTarget.getAttribute("index"));

    // 根据num 来判断来跳转页面
    if (num === 0) {
      // console.log(this.props.history);
      this.props.history.push("/online");
    } else if (num === 1) {
      if (sessionStorage.getItem("is_disable")) return;
      // console.log(this.props.history);
      this.props.history.push("/search");
    } else if (num === 2) {
      if (sessionStorage.getItem("is_disable")) return;
      this.props.history.push("/like");
    } else {
      if (sessionStorage.getItem("is_disable")) return;
      this.props.history.push("/city");
    }
  };
  render() {
    let categoryArr = ["首页", "搜索", "喜欢", "城市"];
    let itemList = [];
    for (let i = 0; i < categoryArr.length; i++) {
      itemList.push(
        <li
          key={i}
          className={
            this.state.currentIndex === i ? styles.active : styles.navvli
          }
          index={i}
          // 应为onclick 事件不指定this 会自动执行
          onClick={this.setCurrentIndex.bind(this)}
        >
          {categoryArr[i]}
        </li>
      );
    }
    return (
      <div className={styles.olinnav}>
        <ul className={styles.navul}>{itemList}</ul>
      </div>
    );
  }
}

export default withRouter(onlinenav);
