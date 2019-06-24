import React from 'react';
import { View,  ScrollView, KeyboardAvoidingView } from "react-native";
import {WingBlank, Tabs} from "antd-mobile-rn";

class Tab extends React.Component {

    state = {
        loading: false,
        clicked: '',
    }

    tabChange(e,i){
        const {setData,tabsContent,onChange} = this.props;
        onChange&&onChange(e);
        setData({rightTitle:tabsContent[i].rightTitle})
    }

    render() {
        const { tabsContent } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Tabs tabs={tabsContent.map((item) => ({ title: item.title }))} style={{ marginTop: 50 }} onChange={(e,i)=>this.tabChange(e,i)} >
                    {
                        tabsContent.map((item,index) => (
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
            </View>
        );
    }
}

export default (Tab)