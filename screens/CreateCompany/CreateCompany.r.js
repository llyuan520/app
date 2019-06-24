// Created by Luoshj on 2018/11/3
import React from 'react';
import { StyleSheet, View, Text,Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, InputItem, WingBlank, ActivityIndicator, Tabs, Toast, ActionSheet } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { BackHeader } from '../../components'
import { InputTemplet } from "../../utils";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    introductionStyle:{
        fontSize: 12,
        color: '#CCCCCC',
        paddingBottom:25
    },
    inputStyle:{
        marginTop:5,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0
        
    },
    textTitle:{
        // textAlign:'left',
        fontSize:15,
        marginTop:20,
        // marginLeft:20
    },
    titleDot:{
        fontSize:15,
        color:'red',
        paddingRight:30
        
    },
    defaultImg:{
        width:20,
        height:20,
    }
  });
  //-----------------------------------------------------------
  
  //-----------------------------------------------------------
class CreateCompany extends React.Component {

    state={
        loading:false,
        clicked: '',
    }
    submitInfo = ()=>{
        
        this.props.form.validateFields({ force: true }, (error,value) => {//校验并获取一组输入域的值
            alert(JSON.stringify(value));
            return
            if(error){
                Toast.info('您有未填写的必填项或者格式有误！',2)
            }else{
                alert(JSON.stringify(value))
            }
        })
    }
    //-----------------------------------------------------------
    showActionSheet = () => {
        const BUTTONS = [
          'Operation1',
          'Operation2',
          'Operation3',
          'Delete',
          'Cancel',
        ];
        ActionSheet.showActionSheetWithOptions(
          {
            // title: 'Title',// 顶部标题
            // message: 'Description',//顶部标题下的简要消息
            options: BUTTONS,//按钮标题列表 
            // cancelButtonIndex: 4,//按钮列表中取消按钮的索引位置
            // destructiveButtonIndex: 3,//按钮列表中破坏性按钮（一般为删除）的索引位置
          },
          (buttonIndex) => {
            this.setState({ clicked: BUTTONS[buttonIndex] });
          },
        );
      }
    //-----------------------------------------------------------
    render(){
        //-----------------------------------------------------------
        const tabs = [
            { title: '基本信息'},
            { title: '税务信息'},
            { title: '其他信息'},
          ];
          const style = {
            alignItems: 'center',
            justifyContent: 'center',
            height: 350,
            backgroundColor: '#fff',
          } ;
        //-----------------------------------------------------------
        const { getFieldProps } = this.props.form;
        const { loading } = this.state;
        return(
                <View style={styles.container}>
                    <WingBlank>
                        <BackHeader/>
                    </WingBlank>
                        <View style={{ flex: 1 }}>
                            <Tabs tabs={tabs} style={{fontSize: 26}} >
                                <View >
                                    <KeyboardAvoidingView 
                                    behavior="padding"
                                    keyboardVerticalOffset={150}
                                    >
                                        <ScrollView>
                                            <WingBlank>
                                                {
                                                    InputTemplet(this.props.form, [
                                                        {
                                                            type:"InputItem",
                                                            label:"企业名称1",
                                                            required:true,
                                                            fieldName:"companyName",
                                                            fieldDecoratorOptions:{
                                                                initialValue:"22",
                                                                rules: [

                                                                    {
                                                                        required: true,
                                                                        message: '请输入验证码！',
                                                                    },
                                                                ],
                                                            },
                                                            componentProps:{
                                                                // placeholder:'222',
                                                                // maxLength:3
                                                                defaultValue:"33",
                                                            }
                                                        }
                                                    ])
                                                }
                                            </WingBlank>
                                            </ScrollView>
                                        </KeyboardAvoidingView>
                                    </View>
                                    <View>
                                        <WingBlank>
                                            <Text style={styles.textTitle}>
                                                <Text style={styles.titleDot}>* </Text>
                                                企业类型
                                            </Text>
                                            <View style={[{ padding: 8 }]}>
                                                <InputItem
                                                    style={styles.inputStyle}
                                                    placeholder="选择企业类型"
                                                    editable={false}
                                                    value={this.state.clicked}
                                                    maxLength={20}// 最大长度
                                                    extra={
                                                        <Image
                                                            source={require('../../statics/images/pulldown.png')}
                                                            style={styles.defaultImg}
                                                        />
                                                    }
                                                    onExtraClick={this.showActionSheet}
                                                />
                                            </View>
                                        
                                        </WingBlank>
                                    </View>
                                    <View >
                                    <KeyboardAvoidingView 
                                    behavior="padding"
                                    keyboardVerticalOffset={150}
                                    >
                                        <ScrollView>
                                            <WingBlank>
                                                {
                                                    InputTemplet(this.props.form, [
                                                        {
                                                            type:"InputItem",
                                                            label:"企业名称2",
                                                            required:true,
                                                            fieldName:"companyName2",
                                                            fieldDecoratorOptions:{
                                                                initialValue:"",
                                                                rules: [

                                                                    {
                                                                        required: true,
                                                                        message: '请输入验证码22！',
                                                                    },
                                                                ],
                                                            },
                                                            componentProps:{
                                                                // placeholder:'222',
                                                                // maxLength:3
                                                                defaultValue:""
                                                            }
                                                        }
                                                    ])
                                                }
                                            </WingBlank>
                                            </ScrollView>
                                        </KeyboardAvoidingView>
                                    </View>
                            </Tabs>
                        </View>
                        
                        
                        <View style={{paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,backgroundColor:"#f2f2f2"}}>
                            <Button type="primary" style={{backgroundColor:'#067dc6'}} onClick={this.submitInfo}>提交申请</Button>
                        </View>
                
                    <ActivityIndicator toast animating={loading} />
                </View>
        )

    }
    
}

export const title = 'Tabs';
export default createForm()(CreateCompany)