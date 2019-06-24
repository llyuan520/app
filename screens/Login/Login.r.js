//created by Lee 2018/11/30
import React from "react";
import { StyleSheet, View, Text, Image,ScrollView,Linking,KeyboardAvoidingView } from "react-native";
import {
    List,
    InputItem,
    Button,
    WingBlank,
    ActivityIndicator,
    Toast,
} from "antd-mobile-rn";
import { createForm } from 'rc-form'
import {request} from "../../utils"
import { connect } from "react-redux";
import { bindActions } from "../../ducks/user";
import { bindTokenActions } from "../../ducks/token";
import * as CryptoJS from 'crypto-js';
// const WeChat = require('react-native-wechat');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  titleStyle:{
      fontSize: 26,
      fontWeight: "600",
      paddingBottom:40
  },
  inputStyle:{
      marginTop:20,
      paddingLeft:0,
      paddingRight:0,
      marginLeft:0,
      marginRight:0
  },
  mt20:{
      marginTop: 20
  }
});

class Login extends React.Component {
    state = {
        loading: false
    };

    encryptFun = (pwd)=> {
        var sKey = CryptoJS.enc.Utf8.parse('qwertyuiop18aknd');
        var sContent = CryptoJS.enc.Utf8.parse(pwd);
        var encrypted = CryptoJS.AES.encrypt(sContent, sKey, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    }

    forgetPswFunc = ()=>{
        this.props.navigation.navigate("ForgetPassword");
    }
    registerFunc = ()=>{
        this.props.navigation.navigate("Register");
    }
    handleLogin = ()=>{
        this.setState({
            loading:true
        },()=>{
            // setTimeout(()=>{
            //         this.setState({
            //             loading:false,
            //         },()=>{
            //             Toast.success('登录成功',1)
            //         })
            // },3000)
            this.props.form.validateFields({ force: true }, (error,val) => {
                if(!error){
                    request('/newlogin',{
                        method:'POST',
                        body:{
                            "number": val.phone.replace(/\s+/g, ""),
                            "password": this.encryptFun(val.password)
                        }
                    }).then(res=>{
                        if(res){
                            let token = res.data.token;
                            const {saveToken,login} = this.props;
                            saveToken({
                                token:token
                            })
                            
                            request('/findUserInfo').then(resUser=>{
                                if(resUser){
                                    const {userName, companyid, phone, companyName,userId} = resUser.data.user;
                                    login({
                                        username: userName,
                                        company_id: companyid,
                                        phoneNumber: phone,
                                        companyName,
                                        userId:userId
                                    })                     
                                    this.props.navigation.navigate("Main");
                                }
                            })
                            // dispatch();
                            // dispatch(userInfoStatus.increment(false));
                        }
                        this.setState({
                            loading:false
                        })
                    })
                    // this.setState({
                    //     loading:false,
                    // },()=>{
                    //     Toast.success('登录成功',2,()=>{
                    //         this.props.navigation.navigate("MailList");
                    //     }
                    // )})

                }else{
                    for (let key in error) {
                        //不循环，只提示第一个
                        Toast.fail(error[key].errors[0].message, 1);
                        this.setState({
                            loading:false
                        })
                        return false;
                    }
                    
                }
            })
        })
    }

    handleWechatLogin = ()=>{
        Linking.openURL('https://open.weixin.qq.com/connect/qrconnect?appid=wxf59d6dbdf9b87a27&redirect_uri=http%3A%2F%2Fwww.baidu.com&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect')
    }

    render(){
        const {loading} = this.state;
        const { getFieldProps } = this.props.form;
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}
                style={styles.container}
                >
                    <WingBlank>   
                        <Text style={styles.titleStyle}>
                            欢迎使用
                        </Text>

                        <View style={styles.mt20}>
                            <InputItem
                                    style={styles.inputStyle}
                                    {...getFieldProps('phone',{
                                        initialValue: '18218655829',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入手机号"
                                            }
                                        ]
                                    })}
                                    defaultValue='18218655829'
                                    placeholder="请输入手机号"
                                    type='phone'
                                    labelNumber={2}
                                    clear={true}
                            >
                                <Image
                                        source={require('../../statics/images/phone.png')}
                                        style={{width: 20, height: 20}}
                                    />
                            </InputItem>
                            <InputItem
                                    style={styles.inputStyle}
                                    {...getFieldProps('password',{
                                        initialValue: '111111',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入密码"
                                            }
                                        ]
                                    })}
                                    defaultValue='111111'
                                    placeholder="请输入密码"
                                    type='password'
                                    labelNumber={2}
                                    clear={true}
                            >
                                <Image
                                        source={require('../../statics/images/password.png')}
                                        style={{width: 20, height: 20}}
                                    />
                            </InputItem>
                        </View>

                        <View style={{marginTop:40}}>
                            <Button type="primary" style={{backgroundColor:'#067dc6'}} activeStyle={false} onClick={this.handleLogin} >登录</Button>
                        </View>

                        <View style={{marginTop:40,position:'relative'}}>
                            <View style={{position:'absolute',left:0}}>
                                <Text
                                    style={{color:'#ccc'}}
                                    onPress={this.forgetPswFunc}
                                >忘记密码</Text>
                            </View>
                            <View style={{position:'absolute',right:0}}>
                                <Text 
                                    style={{color:'#067dc6'}}
                                    onPress={this.registerFunc}
                                >新用户注册</Text>
                            </View>
                        </View>
                        <View style={{marginTop:200}}>
                            {/* <Button type="ghost" onClick={this.handleWechatLogin} style={{borderWidth:0}}
                                activeStyle={{backgroundColor:'transparent'}}>
                                <Image
                                    source={require('../../statics/images/wechat.png')}
                                    style={{width: 32, height: 27}}
                                    />   
                            </Button> */}
                            {/* <Button type="ghost" onClick={()=>this.props.navigation.navigate('CameraExample')} style={{borderWidth:0}}
                                activeStyle={{backgroundColor:'transparent'}}>
                                <Text>
                                相机测试
                                </Text>
                            </Button> */}
                        </View>
                    </WingBlank>
                    <ActivityIndicator toast text="正在登录..." animating={loading} />
            </KeyboardAvoidingView>
        )
    }
}

export default connect(
    ({ user,token }) => ({
      user,
      token
    }),
    dispatch => ({
        ...bindActions(dispatch),
        ...bindTokenActions(dispatch)
    })
  )(createForm()(Login));