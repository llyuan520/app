/**
 * 带tab栏的header头部
 */
import React from "react";
import { withNavigation } from 'react-navigation';
import {WingBlank, Tabs} from "antd-mobile-rn";
import { StyleSheet, View, Text,KeyboardAvoidingView,ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
    backIcon: {
        position: "absolute",
        left: 10,
        top: 37,
        width: 28,
        height: 28,
        zIndex: 3
    },
    titleStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 40,
        zIndex: 1,
        textAlign: "center",
        fontSize: 18,
        color: '#000'
    },
    sonContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 30,
    },
    rightTitleStyle: {
        position: 'absolute',
        top: 37,
        right: 10,
        zIndex: 3
    },
})
class BackWithTabs extends React.Component {
    state = {
        rightTitle: this.props.rightTitle,
        visible:false
    }

    goBack = () => {
        // console.log(this.props.navigation);
        // console.log(this.props.navigation.dangerouslyGetParent())
        // console.log(this.props.navigation.dangerouslyGetParent().state.routes)
        // console.log(this.props.navigation.dangerouslyGetParent().state.routes.length)
        // console.log(  this.props.navigation.dangerouslyGetParent().state.routes[0].routeName);
        if((this.props.navigation.dangerouslyGetParent().state.routes.length===2 && 
         this.props.navigation.dangerouslyGetParent().state.routes[0].routeName === "SystemMsg")|| 
        this.props.navigation.dangerouslyGetParent().state.routes.length===1){
             this.props.navigation.navigate('Main')
         }else{
            this.props.navigation.goBack()
            
         }
    }

    setData(obj = {}) {
        this.setState(obj)
    }

    tabChange(e,i){
        const {tabs,onChange} = this.props;
        onChange&&onChange(e);
        if(tabs[i].rightTitle){
            this.setState({visible:true})
        }else{
            this.setState({visible:false})
        }
    }

    render() {
        /**
         * @param title 是header的标题
         * @param tabs
         * @param goBack 返回按钮的事件，默认是navigation的goback方法。
         * @param onChange 切换tab的回调
         */
        const { title, tabs, goBack = this.goBack, isPaddingBottom,editFun,rightTitle } = this.props;
        const { visible } = this.state;
        return (
            <View style={isPaddingBottom?{...styles.sonContainer,paddingBottom:70}:{...styles.sonContainer}}>
                <Icon name="ios-arrow-back" size={28} style={styles.backIcon} onPress={goBack} />
                <Text style={styles.titleStyle} >{title}</Text>
                {
                    visible&&<View style={styles.rightTitleStyle}><Text onPress={()=>editFun()}>{rightTitle}</Text></View>
                }
                {
                    tabs &&
                    <Tabs tabs={tabs.map((item) => ({ title: item.title }))} style={{ marginTop: 50 }} onChange={(e,i)=>this.tabChange(e,i)} >
                    {
                        tabs.map((item,index) => (
                            <View key={index}>
                                <KeyboardAvoidingView
                                    behavior="padding"
                                    keyboardVerticalOffset={150}
                                >
                                    <ScrollView>
                                        <WingBlank>
                                            {item.content}
                                        </WingBlank>
                                    </ScrollView>
                                </KeyboardAvoidingView>
                            </View>
                        ))
                    }
                </Tabs>
                }
            </View>
        )
    }
}

export default withNavigation(BackWithTabs)