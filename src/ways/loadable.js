import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
//通用的过场组件
function loadingComponent() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: 'center',
      width: "100%",
      height: "1000px"
    }}> <Spin size="large" /></div >
  )
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading
  });
}
