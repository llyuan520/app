// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, } from "react-native";
import { List, Flex, Button,WingBlank} from "antd-mobile-rn";
import { BackHeader,BottomButton} from '../../components';
import { request } from "../../utils"
const Item = List.Item;
const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "#FFF",
        // height:'100%'
    },
    boxs:{
        backgroundColor: "#F2F2F2",
        // flex: 1,
    },
    Logo: {
        width: 40,
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: "600",
    },
    company: {
        width: '100%',
        backgroundColor: '#FFF'
    },
    companyMain: {
        flexGrow: 1,
        backgroundColor: '#FFF',

    },
    companyMainText: {
        height: 100,
        width: '100%',
        lineHeight: 100,
        textAlign: 'center',
        borderRightWidth: 1,
    },
    othersCompany:{
        // marginTop:10
        backgroundColor:'#fff'
    }
});

class Company extends React.Component {
    state = {
        myCompanyInfo:[],
        companyList:[]
    }
    componentWillMount() {
        this.getMyCompanyIfo()
        this.getMyCompanyList()
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

    getMyCompanyList = () => {
        let url = '/company/findMyCompany';
        request(url, {
            method: 'GET',
            params: {
                limit:10,
                page:1
            },
        }).then(res => {
            if (res) {
                this.setState({
                    companyList: res.data.list
                })
            }
        })
    }

    creatCompany=()=>{
        this.props.navigation.navigate("Company"); 
    }
    render() {
        const {myCompanyInfo,companyList} = this.state;
        return (
            <View style={styles.body}>
                <WingBlank size='lg'>
                    <BackHeader title={'我的企业'} 
                    isHome={true}
                    />
                </WingBlank>
               <View style={styles.boxs}>
               <List style={styles.company}>
                    <Item
                        extra={
                            <Image
                                style={styles.Logo}
                                source={{ uri:myCompanyInfo.avatar}}
                            />
                        }
                    >
                        <Text style={styles.titleStyle}>{myCompanyInfo.companyName}</Text>
                    </Item>
                </List>
                <View style={{ display: 'flex', flexDirection: 'row', height: 100,marginBottom:10}}>
                    <View style={styles.companyMain} >
                        <Text style={styles.companyMainText} onPress={() => { this.props.navigation.navigate("CompanyHome"); }}> 企业主页</Text>
                    </View>
                    <View style={styles.companyMain}>
                        <Text style={styles.companyMainText} onPress={() => { this.props.navigation.navigate("CompanyShip",{companyId:myCompanyInfo.companyid}); }}>企业关系</Text>
                    </View>
                    <View style={styles.companyMain}>
                        <Text style={styles.companyMainText} onPress={() => { this.props.navigation.navigate("SetCompanyAdmin",{companyId:myCompanyInfo.companyid}); }}>设置管理员</Text>
                    </View>
                </View>
                <ScrollView style={styles.othersCompany}>
                    <List>
                        <Item >
                            <Text>其他企业</Text>
                        </Item>
                        {
                            companyList&&companyList.map((item, index) =>
                                <Item key= {index}
                                    extra={
                                        <Image
                                            style={styles.Logo}
                                            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                        />
                                    }
                                >
                                    <Text style={styles.titleStyle}>{item.name}</Text>
                                </Item>
                            )
                        }
                    </List>
                </ScrollView>
               </View>
               <BottomButton  onClick={() => { this.props.navigation.navigate("CreateCompany1"); }}>创建企业</BottomButton>
            </View>
        )
    }
}

export default Company