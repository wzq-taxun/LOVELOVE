import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
export class Error extends Component {
  render() {
    return (
      <div>
        <Result
          status="404"
          title="出错啦！"
          subTitle="对不起, 没有你要找的页面"
          extra={
            <Button type="primary">
              <Link to="/">返回首页</Link>
            </Button>
          }
        />
      </div>
    );
  }
}

export default Error;
