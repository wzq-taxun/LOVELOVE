import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
// 引入创建好的store实例
import store from './store/index.js';
import './style/base.css';
import App from "./pages/App";
import * as serviceWorker from './serviceWorker';
// React.Component.prototype.$axios = axios;
// axios.defaults.baseURL = 'http://192.168.0.103:8000/'  //根据项目自己更改(跟组件全局)
// 上线后根路径
axios.defaults.baseURL = 'http://182.61.64.104:8000/'
// 引入axios的配置文件 暂时先不用
// import './server.js'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
