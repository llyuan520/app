import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { Toast } from "antd-mobile-rn"
import { connect } from "react-redux";
import { bindActions } from "../../../ducks/user";
import { bindTokenActions } from "../../../ducks/token";
import {BackHeader} from '../../../components'

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    borderBottom:{
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    logoutBtnStyle:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:15,
        paddingBottom:15,
    },
    textStyles:{
        fontSize:20
    }
})

class Setting extends React.Component {

    state={

    }


    render(){
        return (
            <View style={styles.container}>
                <View style={styles.borderBottom}>
                    <BackHeader 
                        title="设置"                
                        />
                </View>
                <View>
                    <View style={{...styles.logoutBtnStyle,...styles.borderBottom}}>

                            <Text style={styles.textStyles}
                                onPress={()=>{
                                    const {
                                        logout,
                                        saveToken,
                                        navigation: { navigate }
                                    } = this.props;
                                    saveToken({
                                        token:null
                                    });
                                    logout();
                                    navigate("Auth");
                                }
                            }>
                            退出登录
                            </Text>
                    </View>
                </View>
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
  )(Setting);

