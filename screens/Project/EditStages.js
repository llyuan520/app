//修改项目分期

import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { InputTemplet, request, requestEnum } from "../../utils";
import { WingBlank, Toast } from 'antd-mobile-rn'
import { BackHeader, BottomButton, Map } from '../../components';
import { createForm } from "rc-form";
import { get } from 'lodash'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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

class EditStages extends React.Component {

    state = {
        details: {},
        TaxWayEnum: [],
        ProjectStatusEnum: []
    }

    getDetails() {
        const itemStageId = this.props.navigation.state.params.id;
        request("/item/getItemStageInfo", {
            params: { itemStageId }
        }).then(res => {
            this.setState({
                details: res.data
            })
        })
    }

    getEnum() {
        requestEnum("com.servingcloud.spacexcloud.item.api.models.enums.TaxWayEnum,com.servingcloud.spacexcloud.item.api.models.enums.ProjectStatusEnum")
            .then(res => {
                const { TaxWayEnum, ProjectStatusEnum } = res.data;
                this.setState({
                    TaxWayEnum, ProjectStatusEnum
                })
            })
    }

    submitInfo = () => {
        const { place } = this.state;
        let body = this.props.form.getFieldsValue()
        body.id = get(this.props, "navigation.state.params.id");
        body.latitude = place.latitude;
        body.longitude = place.longitude;
        request("/item/saveItemStage", {
            body,
            method: "POST"
        }).then(res => {
            if (res.code === 1) {
                this.props.navigation.navigate("StagesList", this.props.navigation.state.params)
                Toast.success(res.msg)
            }
        })
    }

    componentDidMount() {
        this.getDetails();
        this.getEnum()
    }

    render() {
        const { details, TaxWayEnum, ProjectStatusEnum } = this.state;
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader title={"修改项目分期"} />
                </WingBlank>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={150}
                    >
                        <ScrollView>
                            <WingBlank>
                                {
                                    InputTemplet(this.props.form,
                                        [{
                                            type: "InputItem",
                                            label: "项目分期编号",
                                            fieldName: "number",
                                            fieldDecoratorOptions: {
                                                rules: [
                                                    {
                                                        required: false,
                                                    },
                                                ],
                                            },
                                            componentProps: {
                                                defaultValue: details.number
                                            }
                                        },
                                        {
                                            type: "InputItem",
                                            label: "项目分期名称",
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
                                            componentProps: {
                                                defaultValue: details.name
                                            }
                                        },
                                        {
                                            type: "ActionSheet",
                                            label: "计税方式",
                                            fieldName: "taxType",
                                            value: details.taxType,
                                            buttoms: TaxWayEnum,
                                            showRequired: true,
                                            fieldDecoratorOptions: {
                                                rules: [
                                                    {
                                                        required: true,
                                                    },
                                                ],
                                            },
                                        }, {
                                            type: "ActionSheet",
                                            label: "项目分期状态",
                                            buttoms: ProjectStatusEnum,
                                            fieldName: "status",
                                            showRequired: true,
                                            value: details.status,
                                            fieldDecoratorOptions: {
                                                rules: [
                                                    {
                                                        required: true,
                                                    },
                                                ],
                                            },
                                        },
                                        {
                                            type: "InputItem",
                                            label: "开票名称",
                                            fieldName: "ticketName",
                                            showRequired: true,
                                            fieldDecoratorOptions: {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入项目简称！',
                                                    },
                                                ],
                                            },
                                            componentProps: {
                                                defaultValue: details.ticketName
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
                                    <Map edit={true} setData={(obj) => this.setState(obj)} initPlace={{ latitude: details.latitude, longitude: details.longitude }} />
                                </View>
                            </WingBlank>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>

                <BottomButton onClick={this.submitInfo}>
                    {"保存修改"}</BottomButton>
            </View>

        )
    }

}

export default createForm()(EditStages)