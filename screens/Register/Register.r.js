// Created by Lee on 2018/12/3
import React from 'react';
import { StyleSheet, View, Text,ScrollView,KeyboardAvoidingView } from "react-native";
import {
    InputItem,
    Button,
    WingBlank,
    ActivityIndicator,
    Toast,
} from "antd-mobile-rn";
import { BackHeader,RegisterAndForgetPsw } from '../../components'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop:100
    },
    titleStyle:{
        fontSize: 26,
        fontWeight: "600",
        paddingBottom:40
    },
  });

  
class Register extends React.Component{
    state={

    }

    render(){
       
        return(
            <View style={styles.container}>
                <WingBlank>
                    {/* <BackHeader/> */}
                    <KeyboardAvoidingView
                        style={{height:'100%'}}
                        behavior="padding"
                        keyboardVerticalOffset={150}
                        >
                        <ScrollView>
                        <Text style={styles.titleStyle}>
                            新用户注册
                        </Text>

                        <RegisterAndForgetPsw isRegister={true}/>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </WingBlank>
            </View>
        )
    }
}

export default Register