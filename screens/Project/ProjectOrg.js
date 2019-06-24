import React from 'react';
import { List, ActivityIndicator } from 'antd-mobile-rn';
import { View } from 'react-native';
import { request } from '../../utils';
import { ScrollList } from '../../components';

const Item = List.Item;
class ProjectOrg extends React.Component {

    state = {
        data: [],
        loading: false
    }

    getList(page, setFalse) {
        this.setState({
            loading: true
        })
        request("/item/getItemsRelatedToMe").then(res => {
            setFalse && setFalse()
            res && this.setState({
                data: res.data.list
            })
            this.setState({
                loading: false
            })
        })
    }

    ItemClick(item) {
        //没有在路由注册的组件是没有navigation的属性的，具体说应该是没有父类的props。
        // 所以就在父组件中将props传值过来，这里就会有两层props
        this.props.props.navigation.navigate("ProjectOrgDetails", item)
    }

    componentDidMount() {
        this.getList()
    }


    render() {
        const { data } = this.state;
        const style = {
            height: 80,
            lineHeight: 80
        }
        return (
            <View>
                <ScrollList style={{ marginBottom: 70 }} getData={this.getList.bind(this)}>
                    <List >
                        {
                            data.map((item, index) =>
                                <Item arrow="horizontal" style={style} key={index} onClick={() => this.ItemClick(item)}>
                                    {item.name}
                                </Item>)
                        }
                    </List>
                </ScrollList>
                {/* <ActivityIndicator
                    toast
                    text="数据加载中..."
                    size="large"
                    animating={this.state.loading}
                /> */}
            </View>
        )
    }
}

export default ProjectOrg