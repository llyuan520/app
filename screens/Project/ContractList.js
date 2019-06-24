import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { BackHeader } from '../../components'
import {
    WingBlank, WhiteSpace, Tabs, List
} from "antd-mobile-rn";
import { request } from '../../utils';
const Item = List.Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contractName: {
        fontSize: 20,
        color: "#2B2B2B",
        backgroundColor: "#fff",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        fontFamily: "PingFangSC-Medium"
    }
})
class ContractList extends React.Component {

    state = {
        details: {}
    }

    getDetalis() {
        const { state } = this.props.navigation;
        request("/contract/findDetailedInfoById", {
            params: {
                contractId: state.params.id
            }
        })
            .then(res => {
                this.setState({
                    details: res.data
                })
            })
    }

    componentDidMount() {
        this.getDetalis()
    }

    render() {
        const { details } = this.state;
        const data = [
            { title: "甲方", content: details.companyAname,},
            { title: "乙方", content: details.companyBname,  },
            { title: "订立时间", content: details.createTime, },
            { title: "合同编号", content: details.number },
            { title: "归档编号", content: details.archiveCode },
            { title: "类别", content: details.contractCategoryName },
            { title: "状态", content: details.statusName },
            { title: "价格基准", content: details.priceBenchmark },
            { title: "合同签订金额", content: details.signedAmount },
            { title: "合同最新金额", content: details.newAmount },
            { title: "累计审定产值", content: details.outputNumber },
            { title: "累计变更结算", content: details.changeNumber },
            { title: "合同结算金额", content: details.settlementNumber },
            { title: "付款方式", content: details.paymentNumber },
            { title: "合同附件", content: details.contractAttachment },
        ];
        const tabs = [
            {
                title: "产值",
                content: <Text>13</Text>
            },
            {
                title: "变更",
                content: <Text>13</Text>
            },
            {
                title: "结算",
                content: <Text>13</Text>
            }
        ]
        return (
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader />
                </WingBlank>

                <ScrollView
                    style={{ flex: 1, backgroundColor: '#f5f5f9' }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.contractName}>{details.contractName}</Text>
                    <List >
                        {
                            data.map((item, key) => <Item style={{ height: 50 }} key={key} extra={item.content}><Text style={{ color: "#666" }}>{item.title}</Text></Item>)
                        }
                    </List>
                    <View style={{ width: "100%", backgroundColor: "#F2F2F2", height: 10 }} />
                    <Tabs tabs={tabs}>
                        {/* <View >
                            <Text>Content of First Tab</Text>
                        </View>
                        <View>
                            <Text>Content of Second Tab</Text>
                        </View>
                        <View >
                            <Text>Content of Third Tab</Text>
                        </View> */}
                    </Tabs>
                </ScrollView>
            </View>
        )
    }
}

export default ContractList