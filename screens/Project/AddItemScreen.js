import React from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Text, TouchableHighlight, Image } from "react-native";
import { WingBlank, ActivityIndicator, Toast } from "antd-mobile-rn";
import { createForm } from "rc-form";
import { BottomButton, Map, BackHeader, Upload } from '../../components'
import { InputTemplet } from "../../utils";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";
import { request, cleanParams } from "../../utils";
import { get } from 'lodash';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imgBox: {
        height: 200,
        width: 200,
        textAlign: "center",
        left: "50%",
        marginLeft: -100,
        top: "30%",
    },
    imgStyle: {
        width: "100%",
        height: 200,
        borderWidth: 0.5,
        borderColor: "#DDDDDD",
    },
    uploadText: {
        color: "#333",
        fontSize: 16,
        textAlign: "center"
    },
    textTitle: {
        // textAlign:'left',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
        // marginLeft:20
    },
    titleDot: {
        fontSize: 15,
        color: 'red',
        paddingRight: 30

    },
});


class AddItemScreen extends React.Component {
    state = {
        loading: false,
        files: [],
        place: {
            latitude: 39.806901,
            longitude: 116.397972,
        },
        details: {}
    }
    submitInfo = () => {
        this.props.form.validateFields({ force: true }, (error, value) => {//校验并获取一组输入域的值
            if (false) {
                Toast.info('您有未填写的必填项或者格式有误！', 3)
            } else {
                console.log(value)
                this.setState({
                    loading: true
                })
                let body = value;
                const { place,url } = this.state;
                body = { ...value, ...place ,projectPicture:url}
                request("/item/saveItem", {
                    body,
                    method: "POST"
                }).then(res => {
                    if (res.code === 1) {
                        Toast.success(res.msg, 1);
                        this.props.navigation.navigate("AddItemStages", { itemId: res.data.id })
                    }
                })
                this.setState({
                    loading: false
                })
            }
        })
    }

    getDetails() {
        const itemId = get(this.props.navigation, "state.params.itemId");
        itemId && request("/item/getItemInfo", {
            params: {
                id:itemId
            }
        }).then(res => {
            this.setState({
                details: res.data
            })
        })
    }

    deleteItem = () => {
        // const itemId = get(this.props.navigation, "state.params.itemId");
        // itemId&&request("")
    }

    onRegionChange = (region) => {
        this.setState({ region });
    }

    componentDidMount() {
        this.getDetails()
    }


    render() {
        const { loading,  details } = this.state;
        const exist = get(this.props.navigation, "state.params.exist");
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={exist ? "编辑项目" : "新建项目"} />
                </WingBlank>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={150}
                    >
                        <ScrollView>
                            <WingBlank>
                                <Upload setUrl={url=>this.setState({url})}/>
                                {
                                    InputTemplet(this.props.form,
                                        [{
                                            type: "InputItem",
                                            label: "项目编号",
                                            fieldName: "number",
                                            fieldDecoratorOptions: {
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue:details.number
                                            }
                                        },
                                        {
                                            type: "InputItem",
                                            label: "项目名称",
                                            fieldName: "name",
                                            showRequired: true,
                                            fieldDecoratorOptions: {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入项目名称！',
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue:details.name
                                            }
                                        },
                                        {
                                            type: "InputItem",
                                            label: "项目简称",
                                            fieldName: "simpleName",
                                            showRequired: true,
                                            fieldDecoratorOptions: {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入项目简称！',
                                                    },
                                                ],
                                            },
                                            componentProps:{
                                                defaultValue:details.simpleName
                                            }
                                        },

                                        ],
                                        (key, data) => {
                                            this.setState({
                                                [key]: data
                                            })
                                        }
                                    )
                                }
                                <View style={{ width: "100%", height: 500, paddingBottom: 70 }}>
                                    <Map setData={(obj) => this.setState(obj)} edit={true} initPlace={{
                                        latitude: details.latitude,
                                        longitude: details.longitude,
                                    }} />
                                </View>
                            </WingBlank>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>

                <BottomButton onClick={this.submitInfo}
                    twoButton={exist && { name: "删除项目", onClick: this.deleteItem }}>
                    {exist ? "保存修改" : "下一步"}</BottomButton>
                <ActivityIndicator toast animating={loading} />
            </View>
        )
    }
}

export default createForm()(connect(
    ({ user, token }) => ({
        user,
        token
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
)(AddItemScreen));

