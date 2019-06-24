// Created by Lee on 2018/12/3
import React from 'react';
import { StyleSheet, View, Image,Text } from "react-native";
import { withNavigation } from 'react-navigation';
import {
    Button,
    InputItem,
    ActivityIndicator,
    Toast
} from "antd-mobile-rn";
import {request} from "../../utils"
import { createForm } from 'rc-form';
import * as CryptoJS from 'crypto-js';
import { connect } from "react-redux";
import { bindActions } from "../../ducks/user";
import { bindTokenActions } from "../../ducks/token";
const styles = StyleSheet.create({
    inputStyle:{
        marginTop:20,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0
    },
    mt20: {
        marginTop:20
    }
})
const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
class RegisterAndForgetPsw extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isRegister: props.isRegister,
            loading: false
        }
    }

    
    getCaptcha = ()=>{
        Toast.success('验证码已发送')
    }

    encryptFun = (pwd)=> {
        var sKey = CryptoJS.enc.Utf8.parse('qwertyuiop18aknd');
        var sContent = CryptoJS.enc.Utf8.parse(pwd);
        var encrypted = CryptoJS.AES.encrypt(sContent, sKey, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    }

    submitInfo = ()=>{
        this.props.form.validateFields({ force: true }, (error,value) => {
            if (!error) {
                const {isRegister} = this.props;
                if(value.password!==value.repeatPassword){
                    Toast.info('两次密码不同',2);
                    return;
                }
                if(!value.number){
                    Toast.info('请输入手机号',2);
                    return;
                }
                if(!value.password){
                    Toast.info('请输入密码',2);
                    return;
                }
                if(!value.repeatPassword){
                    Toast.info('请重复密码',2);
                    return;
                }
                if(!value.captcha){
                    Toast.info('请输入验证码',2);
                    return;
                }
                if(reg.test(value.number) === true || reg.test(value.password) === true || 
                    reg.test(value.repeatPassword) === true || reg.test(value.captcha) === true || 
                    reg.test(value.name) === true){
                    Toast.info('请勿输入表情',1);
                    return;
                }
                if(value.password.length<6 || value.repeatPassword.length<6){
                    Toast.info('密码长度为6~20位',1);
                    return;
                }
                this.setState({
                    loading:true
                },()=>{
                    if(isRegister===true){
                        //注册的方法
                        setTimeout(()=>{
                            this.setState({
                                loading:false
                            },()=>{
                                
                                request('/auth/register',{
                                    method:'POST',
                                    body:{
                                        captcha:value.captcha,
                                        name:value.name,
                                        number:value.number.replace(/\s+/g, ""),
                                        password:this.encryptFun(value.password)
                                    }
                                }).then(res=>{
                                    if(res){
                                        const {saveToken,login} = this.props;
                                        saveToken({
                                            token: res.data.token
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
                                                Toast.success('注册成功',1,()=>{
                                                    this.props.navigation.navigate("JoinCompany");
                                                })
                                               
                                            }
                                        })
                                    }
                                })


                            })
                        },2000)
                       
                    }else{
                        //忘记密码的方法
                        setTimeout(()=>{
                            this.setState({
                                loading:false
                            },()=>{
                                Toast.success('密码重置成功',1,()=>{
                                    this.props.navigation.navigate('Login');
                                })
                            })
                        },2000)
                    }
                })
                


            }else{
                console.log(error);
                return;
            }
        })
    }

    render(){
        const { getFieldProps } = this.props.form;
        const {isRegister} = this.props;
        const {loading} = this.state;
        return (
            <View>
                <View style={styles.mt20}>
                    {
                        isRegister===true ?
                        <InputItem
                            style={styles.inputStyle}
                            {...getFieldProps('name')}
                            placeholder="请输入姓名"
                            labelNumber={2}
                            clear={true}
                            maxLength={20}
                        >
                            <Image
                                source={require('../../statics/images/name.png')}
                                style={{width: 20, height: 20}}
                            />
                        </InputItem>
                        :
                        <Text></Text>
                    }
                    <InputItem
                            style={styles.inputStyle}
                            {...getFieldProps('number')}
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
                            {...getFieldProps('captcha')}
                            placeholder="短信验证码"
                            type="number"
                            labelNumber={2}
                            extra='获取验证码'
                            onExtraClick={this.getCaptcha}
                    >
                        <Image
                                source={require('../../statics/images/securitycode.png')}
                                style={{width: 20, height: 20}}
                            />
                    </InputItem>
                    {
                        isRegister === true ?
                        <React.Fragment>
                            <InputItem
                                style={styles.inputStyle}
                                {...getFieldProps('password')}
                                placeholder="设置登录密码"
                                maxLength={20}
                                type='password'
                                labelNumber={2}
                                clear={true}
                            >
                                <Image
                                        source={require('../../statics/images/password.png')}
                                        style={{width: 20, height: 20}}
                                    />
                            </InputItem>
                            <InputItem
                                    style={styles.inputStyle}
                                    {...getFieldProps('repeatPassword')}
                                    placeholder="重复登录密码"
                                    maxLength={20}
                                    type='password'
                                    labelNumber={2}
                                    clear={true}
                            >
                                <Image
                                        source={require('../../statics/images/password.png')}
                                        style={{width: 20, height: 20}}
                                    />
                            </InputItem>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <InputItem
                                    style={styles.inputStyle}
                                    {...getFieldProps('password')}
                                    placeholder="设置新密码"
                                    type='password'
                                    maxLength={20}
                                    labelNumber={2}
                                    clear={true}
                            >
                                <Image
                                        source={require('../../statics/images/password.png')}
                                        style={{width: 20, height: 20}}
                                    />
                            </InputItem>
                            <InputItem
                                    style={styles.inputStyle}
                                    {...getFieldProps('repeatPassword')}
                                    placeholder="重复新密码"
                                    type='password'
                                    maxLength={20}
                                    labelNumber={2}
                                    clear={true}
                            >
                                <Image
                                        source={require('../../statics/images/password.png')}
                                        style={{width: 20, height: 20}}
                                    />
                            </InputItem>
                        </React.Fragment>
                    }
                    
                </View>
                <View style={{marginTop:40}}>
                    <Button type="primary" style={{backgroundColor:'#067dc6'}} onClick={this.submitInfo}>提交</Button>
                </View>
                <ActivityIndicator toast animating={loading} />
            </View>
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
)(createForm()(withNavigation(RegisterAndForgetPsw)))