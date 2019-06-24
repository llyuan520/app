import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import {
    Button,Flex
} from "antd-mobile-rn";
const styles = StyleSheet.create({
    buttonBox: {
        backgroundColor: "#fff",
        borderTopColor: '#BBBBBB',
        borderTopWidth: 1,
        height:60,
        position:"absolute",
        width:"100%",
        bottom:0
    },
    button: {
        height: 40,
        backgroundColor: '#067dc6',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    twoButton: {
        height: 40,
        backgroundColor: "#ECF5FA",
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 0
    }
})

class BottomButton extends React.Component {
    render() {
        /**
         * @param onClick 点击的回调
         * @param children 在标签中去写button的文字内容，尽量保持跟原有button一致。
         * @param type button类型，默认primary。
         * @param twoButton 底部第二个按钮
         */
        const { onClick, children, type = "primary", twoButton } = this.props;
        return (
            <View style={styles.buttonBox}>
                {
                    twoButton
                        ? <Flex>
                            <Flex.Item>
                                <Button type={twoButton.type} activeStyle={false} style={twoButton.styles||styles.twoButton} onClick={twoButton.onClick}><Text style={{ color: "#067DC6" }}>{twoButton.name}</Text></Button>
                            </Flex.Item>
                            <Flex.Item>
                                <Button type={type} style={ styles.button}  activeStyle={false} onClick={onClick}>{children}</Button>
                            </Flex.Item>
                        </Flex>
                        : <Button type={type} style={ styles.button} activeStyle={false} onClick={onClick}>{children}</Button>
                }
            </View>
        )
    }
}

export default BottomButton