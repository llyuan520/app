// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text,ScrollView, Image, TouchableHighlight } from "react-native";
import {
    
    Button,
    WingBlank,
} from "antd-mobile-rn";
import { BackHeader,RegisterAndForgetPsw } from '../../components'

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
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
    image: {
        width: 280, height: 250
        
    }
  });

  
class Company extends React.Component{
    state={

    }
    CreateCompany = () => {
        this.props.navigation.navigate("CreateCompany1");
      }
    JoinEnterprises = () =>{

      }
    render(){
       
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader />
                    <Text style={styles.titleStyle}>
                        加入或创建新的企业
                    </Text>
                    <View style={ styles.body } >
                        <TouchableHighlight onPress={this.CreateCompany}>
                            <Image
                            style={styles.image}
                            source={require('../../statics/images/cjqy3x.png')}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.JoinEnterprises} >
                            <Image
                            style={styles.image}
                            source={require('../../statics/images/jrqy3x.png')}
                            />
                        </TouchableHighlight>
                    </View>
                </WingBlank>
            </View>
        )
    }
}

export default Company