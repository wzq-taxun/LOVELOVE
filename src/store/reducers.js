
import { combineReducers } from 'redux';
// 默认值
import defaultState from './state.js';

// / 一个reducer就是一个函数
// function pageTitle(state = defaultState.pageTitle, action) {
//     // 不同的action有不同的处理逻辑
//     switch (action.type) {
//         case 'SET_PAGE_TITLE':
//             return action.data
//         default:
//             return state
//     }
// }

function baseurl(state = defaultState.baseurl, action) {
    switch (action.type) {
        // case 'REDUCE_COUNT':
        //     // 将值赋值给默认保存
        //     defaultState.pk = action.pk
        //     console.log(defaultState.pk)
        //     return defaultState.pk
        default:
            return state
    }
}

// 导出所有reducer
export default combineReducers({
    baseurl
})