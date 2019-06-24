import React from 'react';
import { View } from 'react-native';
import { List, Accordion, WingBlank } from 'antd-mobile-rn';
import { request } from '../../utils';
import { BackHeader } from '../../components';

const Item = List.Item;
class ProjectOrgDetails extends React.Component {

    state = {
        data: []
    }

    getList() {
        const { id } = this.props.navigation.state.params
        request("/item-org/getItemOrg", {
            params: {
                itemId: id
            }
        }).then(res => {
            this.setState({
                data: res.data.list
            })
        })
    }

    ItemClick(item) {
        this.props.navigation.navigate("ProjectOrgDetails", item)
    }

    componentDidMount() {
        this.getList()
    }


    //通讯录查看项目组织
    render() {
        const { data } = this.state;
        const style = {
            height: 80,
            lineHeight: 80
        }
        console.log(this.props.navigation.state)
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", }}>
                <WingBlank>
                    <BackHeader title={params.name} />
                </WingBlank>

                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                    {
                        data.map((item, index) => <Accordion.Panel key={index} header={item.name}>
                        </Accordion.Panel>)
                    }
                </Accordion>
            </View>
        )
    }
}

export default ProjectOrgDetails