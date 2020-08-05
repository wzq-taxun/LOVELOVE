import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import {
  UserDeleteOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  TeamOutlined,
  CommentOutlined,
  ImportOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "../../style/modcs.module.scss";
let Artce = (props, ref) => {
  // 接受父组件的参数
  const { pramesclickhand } = props;
  const mapRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      //clickSwitch是子组件暴露的函数
      _childFn() {
        setVisible(true);
      },
      _haiZi() {
        setVisible(false);
      },
    };
  });
  const [lovetu] = useState(
    <span>
      <HeartOutlined />
      &nbsp;&nbsp;今天你认识的人
    </span>
  );
  // 侧边栏的项目
  const [listart] = useState([
    {
      id: 1,
      raticon: <ImportOutlined />,
      rattext: "登入",
      ratpath: "/login",
    },
    // {
    //   id: 2,
    //   raticon: <CompassOutlined />,
    //   rattext: "探索约会想法",
    //   ratpath: "/dating",
    // },
    {
      id: 3,
      raticon: <CommentOutlined />,
      rattext: "收件箱",
      ratpath: "/inbox",
    },
    {
      id: 4,
      raticon: <TeamOutlined />,
      rattext: "我喜欢的",
      ratpath: "/meetyou",
    },
    {
      id: 5,
      raticon: <SearchOutlined />,
      rattext: "搜素",
      ratpath: "/insearch",
    },
    {
      id: 6,
      raticon: <EnvironmentOutlined />,
      rattext: "附近",
      ratpath: "/mycity",
    },
    {
      id: 7,
      raticon: <ClockCircleOutlined />,
      rattext: "我的城市",
      ratpath: "/lastsignup",
    },
    {
      id: 8,
      raticon: <UserDeleteOutlined />,
      rattext: "喜欢我的",
      ratpath: "/witheme",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    pramesclickhand();
    setVisible(false);
  };
  return (
    <div>
      <Drawer
        ref={mapRef}
        title={lovetu}
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        mask={false}
        width={500}
        drawerStyle={{
          background: "#0CAEB1",
          paddingTop: "64px",
          color: "#fff",
        }}
        headerStyle={{ background: "#1A5F78", borderBottom: "none" }}
      >
        {/* 侧边栏内容 */}
        {listart.map((item) => (
          <p key={item.id} className="reticoon">
            <Link to={item.ratpath} className="retlink">
              {item.raticon}
              &nbsp;&nbsp;{item.rattext}
            </Link>
          </p>
        ))}
      </Drawer>
    </div>
  );
};

export default forwardRef(Artce);
