// Created by Luoshj on 2018/12/17
import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { List, Button } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";
import { request } from "../../utils"
import { withNavigation } from 'react-navigation';
const Item = List.Item;
const styles = StyleSheet.create({
    bodyColor: {
        backgroundColor: '#fff',
        height: '100%'
    },
    Logo: {
        width: 60,
        height: 60,
        // marginTop: 5,
        marginBottom: 5,
        borderRadius: 30,
    },
    topHeight: {
        height: 40,
        backgroundColor: '#fff'
    },
    logNameStyle: {
        fontSize: 18,
        fontWeight: "600",
    },
    logCompanyStyle: {
        fontSize: 14,
        fontWeight: "400",
        marginTop: 40,
        color: '#CCC',
        marginBottom: 10,
    },
    buttonTab: {
        marginTop: 20,
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    buttonRight: {
        height: 50,
        backgroundColor: '#067dc6',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        borderColor: "#fff",
        // color: '#FFF',
        borderRadius: 10
    },
    ButtonViewLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
    },
    ButtonViewRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%'
    },
    myCompanyInfo: {
        height: 80,
        paddingLeft: 10,
    },
    myTodo: {
        height:80,
        width:'100%',
        lineHeight: 80,
        fontSize: 18,
        fontWeight: "600",
        paddingLeft:10
    }

});

class MyCompany extends React.Component {
    state = {
        list: [],
        loading: true,
        count: 0
    }

    componentDidMount() {
        this.getMyCompanyIfo()
    }

    getMyCompanyIfo = () => {
        let url = '/findUserInfo';
        request(url, {
            method: 'GET',
        }).then(res => {
            if (res) {
                this.setState({
                    myCompanyInfo: res.data.user
                })
            }
        })
    }

    render() {
        const { myCompanyInfo } = this.state;
        return (
            <View style={styles.bodyColor}>
                <View style={styles.topHeight}></View>
                <View>
                    <Item
                        extra={
                            <Image
                                style={styles.Logo}
                                source={{ uri: myCompanyInfo && myCompanyInfo.avatar }}
                            />
                        }
                    >
                        <Text style={styles.logNameStyle}>{myCompanyInfo && myCompanyInfo.userName}</Text>
                        <Text style={styles.logCompanyStyle}>{myCompanyInfo && myCompanyInfo.position}@{myCompanyInfo && myCompanyInfo.companyName}</Text>
                    </Item>
                </View>
                <View style={styles.buttonTab}>
                    <View style={styles.ButtonViewLeft}>
                        <Button type="primary" style={styles.buttonRight}
                            onClick={() => {
                                this.props.navigation.navigate("MyCompany");
                            }} >
                            加入组织
                            </Button>
                    </View>
                    <View style={styles.ButtonViewRight}>
                        <Button type="primary" style={styles.buttonRight}>审批模板</Button>
                    </View>
                </View>
                <View>
                    <View >
                        <Text style={styles.myTodo} onPress={() => { this.props.navigation.navigate("MyCompany"); }} >我的企业</Text>
                    </View>
                    <View >
                        <Text style={styles.myTodo} onPress={() => { this.props.navigation.navigate("MyCompany"); }} >企业广场</Text>
                    </View>
                    <View >
                        <Text style={styles.myTodo} onPress={() => { this.props.navigation.navigate("MyCompany"); }} >操作手册</Text>
                    </View>
                    <View >
                        <Text style={styles.myTodo} onPress={() => { this.props.navigation.navigate("Setting"); }} >设置</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(
    ({ user }) => ({
        user
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
)(withNavigation(createForm()(MyCompany))); 