import React from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { Accordion, WingBlank, Toast } from 'antd-mobile-rn';
import { createForm } from "rc-form";
import { BackWithTabs, BottomButton, Map } from '../../components'
import { InputTemplet, request, requestEnum } from "../../utils";
import { map, get } from 'lodash'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

class AddItemStages extends React.Component {

    state = {
        stages: [{ name: "项目分期一" }],
        TaxWayEnum: [],
        ProjectStatusEnum: []
    }

    skip = () => {
        this.props.navigation.navigate("AddItemOrg", this.props.navigation.state.params)
    }

    addStages = () => {
        const { stages } = this.state;
        const newData = {
            name: "新项目分期",
        };
        this.setState({
            stages: [...stages, newData]
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

    nextStep = (e) => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue())
        const { state } = this.props.navigation;
        console.log(state.params)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const itemStageReq = map(values, value => value)
                //将获取的form表单的数据从一个对象转换为一个数组。
                let body = { itemId: get(state, "params.itemId"), itemStageReq }
                //批量保存分期
                request("/item/batchAddStage", {
                    body, method: "POST"
                }).then(res => {
                    if (res.code === 1) {
                        Toast.success(res.msg);
                        this.props.navigation.navigate("AddItemOrg", { itemId: get(state, "params.itemId"),stageIdAry:res.data.list })
                    }
                })
            } else {
                console.log(err);
                Toast.fail("请将必填项填写完整")
            }
        });
    }

    componentDidMount() {
        this.getEnum()
    }

    //新增项目第二步，新建项目分期。
    render() {
        const { stages, TaxWayEnum, ProjectStatusEnum } = this.state;
        console.log(this.state)
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackWithTabs isPaddingBottom={true} title="新建项目分期" rightTitle={<Text onPress={this.skip}>跳过</Text>} />
                </WingBlank>
                <View style={{ marginBottom: 70 }}>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={150}
                    >
                        <ScrollView >
                            <Accordion accordion={true} onChange={this.onChange}>
                                {
                                    stages.map((item, index) => <Accordion.Panel key={index} header={item.name}>
                                        <WingBlank>
                                            {
                                                InputTemplet(this.props.form,
                                                    [{
                                                        type: "InputItem",
                                                        label: "项目分期编号",
                                                        fieldName: `${index}.number`,
                                                        fieldDecoratorOptions: {
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                },
                                                            ],
                                                        },
                                                    }, {
                                                        type: "InputItem",
                                                        label: "项目分期名称",
                                                        fieldName: `${index}.name`,
                                                        fieldDecoratorOptions: {
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message: `请输入项目分期名称`,
                                                                },
                                                            ],
                                                        },
                                                    }, {
                                                        type: "ActionSheet",
                                                        label: "计税方式",
                                                        fieldName: `${index}.taxType`,
                                                        buttoms: TaxWayEnum,
                                                        fieldDecoratorOptions: {
                                                            rules: [
                                                                {
                                                                    message: `请选择计税方式`,
                                                                    required: true,
                                                                },
                                                            ],
                                                        },
                                                    }, {
                                                        type: "ActionSheet",
                                                        label: "项目分期状态",
                                                        fieldName: `${index}.status`,
                                                        buttoms: ProjectStatusEnum,
                                                        fieldDecoratorOptions: {
                                                            rules: [
                                                                {
                                                                    message: `请选择项目分期状态`,
                                                                    required: true,
                                                                },
                                                            ],
                                                        },
                                                    }, {
                                                        type: "InputItem",
                                                        label: "开票名称",
                                                        fieldName: `${index}.ticketName`,
                                                        fieldDecoratorOptions: {
                                                            rules: [
                                                                {
                                                                    required: false,
                                                                },
                                                            ],
                                                        },
                                                    },], (key, data) => {
                                                        this.setState({
                                                            [key]: data
                                                        })
                                                    })
                                            }
                                            <View style={{ width: "100%", height: 500, paddingBottom: 70 }}>
                                                <Map setData={(obj) => this.setState(obj)} edit={true} />
                                            </View>
                                        </WingBlank>
                                    </Accordion.Panel>)
                                }
                            </Accordion>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <BottomButton onClick={this.nextStep} twoButton={{ name: "新建项目分期", onClick: this.addStages }}>下一步</BottomButton>
            </View>
        )
    }
}

export default createForm()(AddItemStages)