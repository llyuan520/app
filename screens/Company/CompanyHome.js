// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text,ScrollView, Image, TouchableHighlight, ImageBackground } from "react-native";
import {
    List,
    Button,
    WingBlank,
    InputItem
} from "antd-mobile-rn";
import {request} from "../../utils"
const Item = List.Item;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    defaultWH: {
        width: 22,
        height: 22,
        // position: 'absolute',
        // left: 0,
        zIndex: 2,
        // top:30,
        // paddingTop:30
    },
    titleStyle:{
        fontSize: 20,
        fontWeight: "600",
        paddingBottom:10,
        paddingTop:60,
        width:'100%',
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
    image: {
        width: 280, height: 250
        
    },
    inputStyle: {
        marginTop: 15,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 30,
        width:'100%',
    },
    Logo:{
        width: 80, height: 80,
        marginTop:5,
        marginBottom:5,
        borderRadius:10,
    },
    buttonBox:{
        backgroundColor:"#fff",
        borderTopColor:'#BBBBBB',
        borderTopWidth:1,
    }
  });

  
class CompanyHome extends React.Component{
    state={
        companyId:'',
        data:{},
        isCompanyAdmin:false,
        company:{}
    }
    //查询管理员权限
    findCurrCompanyId = () =>{
        request('/company/findCurrCompanyId',{
            method:'GET',
            params:{}
        }).then(res=>{
            if(res){
                this.setState({
                    isCompanyAdmin:res.data.isCompanyAdmin
                })
            }
        })
    }
    //查企业详情
    CompanyDetail = () =>{
        request('/company/findCurrCompanyDetail',{
            method:'GET',
            params:{}
        }).then(res=>{
            if(res){
                console.log(JSON.stringify(res))    
                this.setState({
                    companyId:res.data.company.id,
                    data:{ ...res.data.company, ...res.data.companyTaxInfo, ...res.data.companyContact},
                    company:res.data.company
                })
            }
        })
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    componentWillMount() {
        this.findCurrCompanyId();
        this.CompanyDetail();
    }
    render(){
        const {isCompanyAdmin,data} = this.state;
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../statics/images/bitmap.png')} style={{height:150,width:'100%'}}>
                    <Text style={{ zIndex: 999,marginTop:45,marginLeft: 15, }}  onPress={this.goBack} >
                        <Image  source={require('../../statics/images/back.png')}  style={styles.defaultWH} />
                    </Text>
                </ImageBackground>
                <WingBlank>
                    <TouchableHighlight style={{position:'absolute',top:-45,left:5}}>
                        <Image
                        style={styles.Logo}
                        source={{uri:'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'}}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={{width:'100%'}}>
                        <Text style={styles.titleStyle}>
                            { data && data.name}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{width:'100%',paddingBottom:15}} >
                        <Text style={{color:'#888'}}>
                            {
                                data && data.synopsis
                            }
                        </Text>
                    </TouchableHighlight>
                    {/* <TouchableHighlight style={{width:'100%'}} >
                        <Text style={{textAlign:'center'}}>
                            <Image  source={require('../../statics/images/back.png')}  style={{ width: 22,height: 22,textAlign:'center'}} />
                        </Text>
                    </TouchableHighlight> */}
                </WingBlank>
                <View style={{ flex: 1 }}>
                    <View style={{borderTopWidth:10,borderTopColor:'#f2f2f2',width:'100%'}}>
                        <WingBlank>
                            <ScrollView></ScrollView>
                                <View style={{paddingTop:15,}}>
                                    <Text style={{fontSize: 20,fontWeight: "600"}}>
                                        企业信息
                                    </Text>
                                </View>
                                <View>
                                    {/* <List>
                                        <Item extra={'extra content'}>Title</Item>
                                    </List> */}
                                    <InputItem
                                    style={styles.inputStyle}
                                    extra={
                                        <Text style={{fontSize:18}}>
                                            {
                                                data && data.companyPhone
                                            }
                                        </Text>
                                    }
                                    editable={false}
                                    >
                                    <Text style={{color:'#888',fontSize:18}}>公司电话</Text>
                                    </InputItem>
                                    <InputItem
                                    style={styles.inputStyle}
                                    extra={
                                        <Text style={{fontSize:18}}>
                                            {
                                                data && data.facsimile
                                            }
                                        </Text>
                                    }
                                    editable={false}
                                    >
                                    <Text style={{color:'#888',fontSize:18}}>传真号码</Text>
                                    </InputItem>
                                    <InputItem
                                    style={styles.inputStyle}
                                    extra={
                                        <Text style={{fontSize:18}}>
                                            {
                                                data && data.companyEmail
                                            }
                                        </Text>
                                    }
                                    editable={false}
                                    >
                                    <Text style={{color:'#888',fontSize:18}}>电子邮箱</Text>
                                    </InputItem>
                                    <InputItem
                                    style={styles.inputStyle}
                                    extra={
                                        <Text style={{fontSize:18}}>
                                        {
                                            data && data.locationAddress
                                        }
                                    </Text>
                                    }
                                    editable={false}
                                    >
                                    <Text style={{color:'#888',fontSize:18}}>所在地</Text>
                                    </InputItem>
                                    <InputItem
                                    style={styles.inputStyle}
                                    labelNumber={7}
                                    extra={
                                        <Text style={{fontSize:18}}>
                                            {
                                                data && data.generalBusinessScope
                                            }
                                        </Text>
                                    }
                                    editable={false}
                                    >
                                    <Text style={{color:'#888',fontSize:18}}>一般经营范围</Text>
                                    </InputItem>
                                    <InputItem
                                    style={styles.inputStyle}
                                    extra={
                                        <Text style={{fontSize:18}}>
                                            {
                                                data && data.specialBusinessScope
                                            }
                                        </Text>
                                    }
                                    editable={false}
                                    >
                                    <Text style={{color:'#888',fontSize:18}}>特殊经营范围</Text>
                                    </InputItem>
                                </View>
                                <View>
                                    <Text 
                                    onPress={() =>{this.props.navigation.navigate("CompanyDetail")}}
                                    style={{textAlign:'center',fontSize:18,paddingTop:15,paddingBottom:15,color:'#067DC6'}}>
                                        查看完整信息
                                    </Text>
                                </View>
                        </WingBlank>
                        
                    </View>
                    {
                        isCompanyAdmin ?
                        <View style={{borderTopWidth:10,borderTopColor:'#f2f2f2',paddingTop:8,paddingBottom:8,paddingLeft:10,paddingRight:10,backgroundColor:'##FDF5F4',bottom:0,position:'absolute',width:'100%'}}>
                        <Button 
                        type="primary"
                        activeStyle={false}
                        onClick={() => {this.props.navigation.navigate("EditCompany1",this.state.company)}}>编辑信息</Button>
                        </View>
                        :
                        <View></View>
                    }
                </View>
            </View>
        )
    }
}

export default CompanyHome;