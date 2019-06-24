// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, } from "react-native";
import { List, Flex, Button,WingBlank} from "antd-mobile-rn";
import { BackHeader} from '../../../components';
import { request } from "../../../utils";
const Item = List.Item;
const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#FFF',
        height:'100%'
    },
    titleStyle:{
        paddingLeft:15,
        fontWeight: "400",
        marginBottom:10,
        marginTop:10,
        // textAlign:'center',
        fontFamily: 'PingFangSC-Medium',
        fontSize: 20,
        color: '#2B2B2B',
        fontWeight:'600'
    },
    noDataStyle:{
        paddingLeft:15,
        fontWeight: "400",
        marginBottom:10,
        marginTop:10,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 15,
        color: '#CCCCCC',
        // letterSpacing: 0,
    },
    Logo: {
        position:'absolute',
        top:10,
        right:15,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    companyNameStyle: {
        height:60,
        position:'absolute',
        left:15,
        top:20,
        fontSize: 15,
        // fontWeight: "600",
        color: '#2B2B2B',
    },
    motherCompamy:{
        paddingBottom:10,
        position:'relative',
        borderWidth: 1,
        borderColor: '#F2F2F2',
        borderRadius:8,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        backgroundColor:'#fff'
    },
    companyName:{
        height:60,
        marginTop:10,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2'
    },
    setBtn:{
        height:35,
        marginTop:10
    },
    setBtnStyle:{
        height:35,
        width:'90%',
        marginLeft:'5%',
        // backgroundColor:'#067dc6'
    },
    allCompany:{
        // flex: 1,
        backgroundColor:'#F2F2F2'
    }

});


class Company extends React.Component {
    state = {
        myCompanyInfo:[],
        companyList:[],
        companyId : this.props.navigation.state.params,
        
    }
    componentWillMount() {
        this.getMyCompanyList()
    }

    getMyCompanyList = () => {
        let url = '/company/findCompanyRelationByCompanyId';
        request(url, {
            method: 'GET',
            params: {
                    limit:10,
                    page:1
            },
        }).then(res => {
            if (res) {
                this.setState({
                    motherCompanyList: res.data.parent,
                    sonCompanyList: res.data.sonList.list
                })
            }
        })
    }

    setSonCompany = ()=>{
        const  {companyId} = this.props.navigation.state.params;
        this.props.navigation.navigate("SetSonCompany",{companyId:companyId});
    };

    setMotherCompany = ()=>{
        const  {companyId} = this.props.navigation.state.params;
        this.props.navigation.navigate("AddSonCompany",{confirmFun: this.getMyCompanyList,setSonCompany:'N',companyId:companyId});
    }

    creatCompany=()=>{
        this.props.navigation.navigate("Company"); 
    }

    companyRemove = ()=>{
        const  {companyId} = this.props.navigation.state.params;
        const {motherCompanyList} = this.state;
        const reoveOptions = {};
        reoveOptions.childIds = [motherCompanyList.id];
        reoveOptions.flag=false;
        reoveOptions.parentId =companyId;
        let url = '/company/addRelationApply';
        request(url, {
            method: 'POST',
            body:reoveOptions
        }).then(res => {
            if (res) {
                Toast.success(res.msg, 1);
                this.getMyCompanyList();
            }
        })
    }

    render() {
        const {sonCompanyList,motherCompanyList} = this.state;
        return (
            <View style={styles.body}>
                <WingBlank size='lg'>
                    <BackHeader title={'企业关系'} />
                </WingBlank>
                <ScrollView style={styles.allCompany}>
                    <View style={styles.motherCompamy}>
                        <Text style={styles.titleStyle}>母公司</Text>
                        {
                            motherCompanyList ?
                            <View style={styles.companyName}> 
                                        <Image
                                            style={styles.Logo}
                                            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                        />
                                            <Text style={styles.companyNameStyle}>{motherCompanyList&&motherCompanyList.name}</Text>
                            </View>
                             :
                            <Text style={styles.noDataStyle}>暂无母公司</Text>
                        }
                        {
                            motherCompanyList ?
                            <View style={styles.setBtn}>
                                <Button type='primary' style={styles.setBtnStyle} onClick={this.companyRemove}>解除关系</Button>
                            </View>
                            :
                            <View style={styles.setBtn}>
                                <Button type='primary' style={styles.setBtnStyle} onClick={this.setMotherCompany}>设置母公司</Button>
                            </View>
                        }
                                
                            
                    </View>
                    <View style={styles.motherCompamy}>
                        <Text style={styles.titleStyle}>子公司</Text>       
                            {
                               sonCompanyList&&sonCompanyList.length>0 ?
                                sonCompanyList && sonCompanyList.map((item,i)=>{
                                    return (
                                        <View style={styles.companyName}  key={i}> 
                                            <Image
                                                style={styles.Logo}
                                                source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                            />
                                                <Text style={styles.companyNameStyle}>{item&&item.name}</Text>
                                        </View>
                                    ) 
                                }) 
                                :
                                <Text style={styles.noDataStyle}>暂无子公司</Text>
                            }
                           <View style={styles.setBtn}>
                                <Button type='primary' style={styles.setBtnStyle} onClick={this.setSonCompany}>设置子公司</Button>
                            </View>      
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Company