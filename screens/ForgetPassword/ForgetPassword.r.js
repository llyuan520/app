// Created by Lee on 2018/12/3
import React from 'react';
import { StyleSheet, View, Text,ScrollView,KeyboardAvoidingView } from "react-native";
import {
    WingBlank,
    ActivityIndicator,
    Toast,
} from "antd-mobile-rn";
import { createForm } from 'rc-form'
import { BackHeader, RegisterAndForgetPsw } from '../../components'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    titleStyle:{
        fontSize: 26,
        fontWeight: "600",
        paddingBottom:40
    },
  });

  
class ForgetPassword extends React.Component{
    state={

    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader />
                    <KeyboardAvoidingView
                        style={{height:'100%'}}
                        behavior="padding"
                        //keyboardVerticalOffset={150}
                        >
                        <ScrollView>
                        <Text style={styles.titleStyle}>
                            忘记密码
                        </Text>

                        <RegisterAndForgetPsw isRegister={false}/>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </WingBlank>
            </View>
        )
    }
}

export default createForm()(ForgetPassword)