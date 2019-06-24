// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, } from "react-native";
import { List, Flex, Button,WingBlank,Toast,SwipeAction } from "antd-mobile-rn";
import Swipeout from 'react-native-swipeout';
import { BackHeader,BottomButton} from '../../../components';
import { request } from "../../../utils";
const Item = List.Item;
const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "#FFF",
        height:'100%',
        position:'relative'
    },
    box:{
        backgroundColor:'#F2F2F2'
    },
    titleStyle:{
        paddingLeft:15,
        fontSize: 16,
        fontWeight: "400",
        marginBottom:10,
        marginTop:10,
        textAlign:'center',
        paddingTop:20
    },
    infoStyle:{
        height:60,
        backgroundColor:'#FFF'
    },
    Logo:{
        height:40,
        width:40,
        borderRadius:20,
        backgroundColor:'#D8D8D8',
        marginRight:10
    },
    companyNameStyle:{
        height:60,
        fontSize:16,
        color:'#2B2B2B',
        fontFamily:'PingFangSC-Regular',
        fontWeight:'600',
        // paddingBottom:20,
        lineHeight:60
    },
    ButtonBottom:{
        position:'absolute',
        bottom:10,
        right:0,
        width:'100%',
        // paddingLeft:'5%',
        // paddingRight:'5%',
        borderTopColor:'#D8D8D8',
        borderTopWidth:1
    },
    buttonRight:{
        height:40,
        // backgroundColor:'#ECF5FA',
        marginBottom:10,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        // borderColor:"#ECF5FA",
        // borderWidth:2
    },
});


class SetAdmin extends React.Component {
    state = {
        myCompanyInfo:[],
        companyList:[]
    }
    componentDidMount() {
        this.getCompangyAdminList();
    }

    getCompangyAdminList = () => { // 查找企业管理员
        let url = '/company/findCompanyAdmin';
        request(url, {
            method: 'GET',
            params: {
                    limit:10,
                    page:1
            },
        }).then(res => {
            if (res) {
                this.setState({
                    companyAdminList: res.data.data.list
                })
            }
        })
    }

    creatCompany=()=>{
        this.props.navigation.navigate("Company"); 
    }

    companyAdminRemove = (item)=>{
    console.log(item)
        let url = '/company/removeCompanyAdmin';
        request(url, {
            method: 'POST',
            body:{
                userId:item.id
            } 
        }).then(res => {
            console.log('---------------------------------');
            console.log(res)
            if (res) {
                Toast.success('移除成功', 1);
                this.getCompangyAdminList();
            }
        })
    }

    setCompanyAdmin = (list)=>{
        const addList = [];
        list.forEach((value,i)=>{
            addList.push(value.id);
        })
        let url = '/company/addCompanyAdmin';
        request(url, {
            method: 'POST',
            body:{
                userIds:addList
            } 
        }).then(res => {
            console.log('---------------------------------');
            console.log(res)
            if (res) {
                Toast.success(res.msg, 1);
                this.getCompangyAdminList();
            }
        })
    }

    render() {
        const {companyAdminList} = this.state;
        const  {companyId} = this.props.navigation.state.params;
        return (
            <View style={styles.body}>
                <WingBlank size='lg'>
                    <BackHeader title={'设置管理员'} />
                </WingBlank>
                {/* <ScrollView style={styles.box}> */}
                    <List style={styles.motherCompamy}>
                            {
                               companyAdminList&&companyAdminList.length>0 ?
                               companyAdminList && companyAdminList.map((item,i)=>{
                                    return (
                                        <SwipeAction 
                                            key={i}
                                            right={[
                                                {
                                                    text: 'Delete',
                                                    onPress: (e) => {this.companyAdminRemove(item)},
                                                    style: { backgroundColor: '#F4333C', color: 'white' },
                                                }
                                              ]}
                                            style={{ backgroundColor: 'gray' }} 
                                            autoClose= {true}
                                            onOpen={() => console.log('global open')}
                                            onClose={() => console.log('global close')}
                                        >
                                            <List>
                                                <Item
                                                    style={styles.infoStyle}
                                                    key={i}
                                                    thumb={<Image style={styles.Logo}
                                                    source={{ uri: item.avatar }}/>}
                                                    >
                                                    <Text style={styles.companyNameStyle}>{item.name}</Text>
                                                </Item>
                                            </List>
                                        </SwipeAction>
                                    )
                                }) 
                                :
                                <Text style={styles.titleStyle}>暂无数据</Text> 
                            }   
                    </List>
                {/* </ScrollView> */}
                {/* <BottomButton  onClick={() => { this.props.navigation.navigate("AddSonCompany",{confirmFun: ()=>{this.refreshList},setSonCompany:"Y",companyId:companyId});}}>添加管理员</BottomButton> */}
                <View style={styles.ButtonBottom}>
                            <Button type="primary" style={styles.buttonRight} activeStyle={false}
                            onClick={() =>{
                                this.props.navigation.navigate("CompanyOrganizationUser",{
                                    confirmFun: this.setCompanyAdmin,
                                    url:'/company/findCompanyUser',
                                    data:{companyId:companyId},
                                    title:'选择人员',
                                });
                             }} >
                            添加管理员</Button>
                        </View>
            </View>
        )
    }
}

export default SetAdmin