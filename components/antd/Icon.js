import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * <Icon name='md-search'  blue/> 
 * 图标地址：https://expo.github.io/vector-icons/
    加上了blue的情况下就是跟项目主题色一样的蓝色，不加的情况是默认的黑色。
 */
export default class  MyIcon extends React.Component{
    render(){
        return(
            <Icon size={28}  {...this.props}  color={this.props.blue?"#067DC6":"#000"}/>
        )
    }
}