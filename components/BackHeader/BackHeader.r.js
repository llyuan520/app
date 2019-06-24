// Created by Lee on 2018/12/3
import React from "react";
import { withNavigation } from 'react-navigation';
import { StyleSheet, View, Text, Image, TouchableHighlight } from "react-native"
import {
    Button,
    Toast
} from "antd-mobile-rn"
import Icon from 'react-native-vector-icons';
const styles = StyleSheet.create({
    sonContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingBottom: 70,
    },
    relativeBox: {
        position: 'relative'
    },
    defaultWH: {
        width: 22,
        height: 22,
        position: 'absolute',
        left: 0,
        zIndex: 2
    },
    jumpStyle: {
        height: 22,
        fontSize: 14,
        position: 'absolute',
        right: 0,
        top: 16,
        zIndex: 2
    },
    titleStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        zIndex: 1,
        textAlign: "center",
        fontSize: 18,
        color: '#000'
    },
    valueContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingBottom: 45,
        // borderBottomWidth: 1,
        // borderBottomColor: "#f2f2f2",
        paddingLeft: 15,
    },
    rightIcon: {
        height: 22,
        position: "absolute",
        right: 40,
        top: 5
    },
    rightIcon2: {
        height: 22,
        position: "absolute",
        right: 0,
        top: 5
    },
    rightIconStyle: {
        // height: 22,
        // fontSize: 14,
        position: 'absolute',
        right: 0,
        top: 5,
        zIndex: 2
    }

})
class BackHeader extends React.Component {
    state = {

    }

    goBack = () => {
        console.log('返回会啊啊')
        console.log(this.props.navigation)
        if((this.props.navigation.dangerouslyGetParent().state.routes.length===2 && 
            this.props.navigation.dangerouslyGetParent().state.routes[0].routeName === "SystemMsg")|| 
           this.props.navigation.dangerouslyGetParent().state.routes.length===1){
                this.props.navigation.navigate('Main')
            }else{
               this.props.navigation.goBack()
               
            }
    }
    jumpFunc = () => {
        Toast.success('跳过', 1, () => {
            //直接跳到主页
            this.props.navigation.navigate('Main');
        })
    }

    render() {
        return (
            <View style={this.props.title ? styles.valueContainer : styles.sonContainer}>
                <View style={styles.relativeBox}>
                    <Text
                        style={{ ...styles.defaultWH, zIndex: 999 }}
                        onPress={this.goBack}
                    >
                        {
                            this.props.backIcon || <Image
                                source={require('../../statics/images/back.png')}
                                style={styles.defaultWH}
                            />
                        }
                    </Text>
                    {
                        this.props.title ?
                            <Text
                                style={styles.titleStyle}
                            >
                                {this.props.title}
                            </Text>
                            :
                            <Text ></Text>
                    }

                    {
                        this.props.jump && this.props.jump === true ?
                            <Text
                                style={styles.jumpStyle}
                                onPress={this.jumpFunc}
                            >
                                跳过
                            </Text>
                            : <Text></Text>
                    }
                    {
                        this.props.confirm &&
                        <Text
                            style={styles.jumpStyle}
                            onPress={this.props.confirm.fun}
                        >
                            {this.props.confirm.text}
                        </Text>
                    }
                    {
                        this.props.clearBtn && this.props.clearBtn === true ?
                            <Text
                                style={{...styles.jumpStyle,marginRight:15}}
                                onPress={this.props.clearBtnFunc}
                            >
                                清空
                            </Text>
                            : <Text></Text>
                    }
                    {
                        this.props.NavRight &&
                        <View style={styles.rightIconStyle}>
                            <TouchableHighlight onPress={this.props.NavRight.edit} >
                                <Icon.Feather  name="edit" size={20} style={styles.rightIcon} color={'black'} />
                            </TouchableHighlight>
                            
                            <TouchableHighlight onPress={this.props.NavRight.settings} >
                                <Icon.Feather  name="settings" size={20} style={styles.rightIcon2} color={'black'} />
                            </TouchableHighlight>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

export default withNavigation(BackHeader)