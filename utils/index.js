import request from './request';
import getFormItemSelf from './getFormItemSelf';
import InputTemplet from './InputTemplet';
import { get } from 'lodash';

//设置select值名不同
const setSelectFormat = (data, name = 'value', value = 'name') => {
    if (data === undefined) {
        return []
    } else {
        return data.map(item => {
            return {
                //...item,
                key: item[name],
                label: item[value] || "空"
            }
        })
    }

}
/**
 * 将setState方法promise化，用promise的方式去取代回调。
 * @param state
 * @returns {Promise}
 */
const setStateP = function (state) {
    return new Promise(resolve => this.setState(state, resolve))
}
/**
 * 对params进行过滤，去除value为空的对象。
 * @param params
 * @returns {*}
 */
const cleanParams = (params) => {
    for (let i in params) {
        if (!params[i] || params[i] === "null" || params[i] === "undefined" || (Array.prototype.isPrototypeOf(params[i]) && params[i].length === 0) || params[i] === "[]") {
            delete params[i]
        }
    }
    return params;
}

const getRouter = (_this) => {
    return get(_this,"props.navigation.state.params")
}

const requestEnum = (num="")=>{
    return request("/getEnums",{
        params:{
            name:num
        }
    })
}

/**
 * 过滤表情
 */
const getInputReg = ()=>{
    const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    return reg;
}

/**
 * 将毫秒转为 yyyy-MM-dd HH:mm
 */
const changeDateToYMDHM = (d)=>{
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if(month < 10){
        month = '0' + month; 
    }
    if(day < 10){
        day = '0' + day;
    }
    if(hour < 10){
        hour = '0' + hour;
    }
    if(minutes<10){
        minutes = '0' + minutes;
    }
    return (`${year}-${month}-${day} ${hour}:${minutes}`)
}


export {
    request,
    getFormItemSelf,
    InputTemplet,
    setStateP,
    cleanParams,
    setSelectFormat,
    getRouter,
    requestEnum,
    getInputReg,
    changeDateToYMDHM
}