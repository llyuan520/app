import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native'
import { List, InputItem } from 'antd-mobile-rn';
import { createForm } from 'rc-form';
import Map from '../common/Map';

const styles = StyleSheet.create({
    textTitle: {
        // textAlign:'left',
        fontSize: 14,
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
        color: "#666"
        // marginLeft:20
    },
})
const Item = List.Item;
const Brief = Item.Brief;
class EditList extends React.Component {


    getItem = (item, key) => {
        const { type } = item;
        console.log(item)
        switch (type) {
            case "Map":
                return <View key={key}>
                    <Text style={styles.textTitle}>
                        项目位置
                                </Text>
                    <View style={{ width: "100%", height: 300, paddingBottom: 70 }}>
                        <Map edit={false}  initPlace={{latitude:item.content.latitude,longitude:item.content.longitude}}/>
                    </View>
                </View>;
            default: return <Item labelNumber={6} style={{ height: 50 }} key={key} extra={item.content}><Text style={{ color: "#666" }}>{item.title}</Text></Item>
        }
    }

    render() {
        const { data = [], edit } = this.props,
            { getFieldProps } = this.props.form;
        return (
            <ScrollView
                style={{ flex: 1, }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List >
                    {
                        data.map((item, key) => this.getItem(item, key))
                    }
                </List>
            </ScrollView>
        )
    }
}
export default createForm({
    onValuesChange: (props, changedValues, editValues) => {
        props.setData({ editValues })
    }
})(EditList);