//created by Lee on 2018/12/3
import React from 'react';
import { StyleSheet, View, Text,Image,ScrollView } from "react-native";
import {
    Button,
    InputItem,
    WingBlank,
    ActivityIndicator,
    Toast,
} from "antd-mobile-rn";
import { createForm } from 'rc-form'
import { BackHeader } from '../../components'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    titleStyle:{
        fontSize: 26,
        fontWeight: "600",
        paddingBottom:10
    },
    introductionStyle:{
        fontSize: 12,
        color: '#CCCCCC',
        paddingBottom:25
    },
    inputStyle:{
        marginTop:20,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0
    },
  });

class PerfecteTheInfo extends React.Component {

    state={
        loading:false
    }

    submitInfo = ()=>{
        this.setState({
            loading:true
        },()=>{
            setTimeout(()=>{
                this.setState({
                    loading:false
                },()=>{
                    this.props.navigation.navigate('JoinCompany')
                })
            },1500)
        })
    }

    render(){
        const { getFieldProps } = this.props.form;
        const { loading } = this.state;
        return(
            
            <View style={styles.container}>
                <WingBlank>
                     
                    <BackHeader />
                    <ScrollView style={{height:'100%'}}>
                        <Text style={styles.titleStyle}>
                            完善个人信息
                        </Text>
                        <Text style={styles.introductionStyle}>
                        方便企业找到您，更流畅地进行操作
                        </Text>
                        <InputItem
                                style={styles.inputStyle}
                                {...getFieldProps('password')}
                                placeholder="输入真实姓名"
                                labelNumber={2}
                                clear={true}
                                maxLength={20}
                        >
                            <Image
                                    source={require('../../statics/images/name.png')}
                                    style={{width: 20, height: 20}}
                                />
                        </InputItem>
                        <View style={{marginTop:40}}>
                            <Button type="primary" style={{backgroundColor:'#067dc6'}} onClick={this.submitInfo}>提交</Button>
                        </View>
                    </ScrollView>
                </WingBlank>
                <ActivityIndicator toast animating={loading} />
            </View>
        )
    }

}


export default createForm()(PerfecteTheInfo)