// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, } from "react-native";
import { List, Flex, Button,WingBlank,Toast} from "antd-mobile-rn";
import { BackHeader,BottomButton} from '../../../components';
import { request } from "../../../utils";
const Item = List.Item;
const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "#FFF",
        height:'100%'
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
    companyRemoveing: {
        height:34,
        width:60,
        position:'absolute',
        right:15,
        top:10,
        backgroundColor:'#FDF5F4',
        borderWidth:0,
        backgroundColor:'#DDD',
        color:'#666',
        borderRadius:8,
    },
    companyRemove: {
        height:34,
        width:60,
        position:'absolute',
        right:15,
        top:10,
        backgroundColor:'#FDF5F4',
        borderWidth:0 
    },
    // companyRemoveStyle:{
    //     borderRadius:8,
    //     backgroundColor:'#FDF5F4',
    // },
    companyNameStyle: {
        height:60,
        position:'absolute',
        left:15,
        top:20,
        fontSize: 16,
        fontWeight: "600",
    },
    motherCompamy:{
        paddingBottom:10,
        position:'relative',
        marginBottom:10,
        backgroundColor:'#F2F2F2'
    },
    companyName:{
        height:60,
        // marginTop:10,
        marginBottom:10,
        backgroundColor:'#FFF',
        borderWidth: 1,
        borderColor: '#F2F2F2'
    },
    setCompanyColor:{
        backgroundColor:'#F2F2F2' 
    },
    box:{
        backgroundColor:'#F2F2F2'
    },
    
});


class Company extends React.Component {
    state = {
        myCompanyInfo:[],
        companyList:[]
    }
    componentDidMount() {
        this.getMyCompanyList();
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
                    sonCompanyList: res.data.sonList.list
                })
            }
        })
    }

    creatCompany=()=>{
        this.props.navigation.navigate("Company"); 
    }

    companyRemove = (item)=>{
        const  {companyId} = this.props.navigation.state.params;
        const reoveOptions = {};
        reoveOptions.childIds = [item.id];
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

    refreshList =()=>{
        this.getMyCompanyList();
    }

    render() {
        const {sonCompanyList} = this.state;
        const  {companyId} = this.props.navigation.state.params;
        return (
            <View style={styles.body}>
                <WingBlank size='lg'>
                    <BackHeader title={'设置子公司'} />
                </WingBlank>
                <ScrollView style={styles.box}>
                    <View style={styles.motherCompamy}>
                            {
                               sonCompanyList&&sonCompanyList.length>0 ?
                                sonCompanyList && sonCompanyList.map((item,i)=>{
                                    return (
                                        <View style={styles.companyName} key={i}> 
                                            <Text style={styles.companyNameStyle}>{item&&item.name}</Text>
                                            {
                                                item&&item.deleting==='true'?
                                                <Button style={styles.companyRemove} activeStyle={false}> 
                                                    <Text style={{color:'#F07060',fontSize:12,textAlign:'left'}} >移除中</Text>
                                                </Button>
                                                :
                                                <Button style={styles.companyRemove} activeStyle={false}  onClick={()=>{this.companyRemove(item)}}> 
                                                    <Text style={{color:'#F07060',fontSize:12,textAlign:'left'}} >移除</Text>
                                                </Button>
                                                
                                            }
                                            
                                        </View>
                                    )
                                   
                                }) 
                                :
                                <Text style={styles.titleStyle}>暂无数据</Text> 
                            }   
                    </View>
                </ScrollView>
                <BottomButton  onClick={() => { this.props.navigation.navigate("AddSonCompany",{confirmFun: this.refreshList,setSonCompany:"Y",companyId:companyId});}}>添加子公司</BottomButton>
            </View>
        )
    }
}

export default Company