// Created by Luoshj on 2018/12/17
import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import {
    WingBlank, SegmentedControl
} from "antd-mobile-rn";
import { Icon } from '../../components/antd';
import CompanyOrganization from "./CompanyOrganization"
import {ProjectOrg} from '../Project'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 40,
        height: 44,
        flex: 1,
        
        
    },
    Brief: {
        overflow: "hidden",
    },
    tabs: {
        height: 28,
        width: 180,
        borderRadius: 8,
        left:"50%",
        position:"absolute",
        marginLeft:-90,

    },
    body: {
        marginTop: 50,
        backgroundColor: '#fff',
        borderTopColor:'#f2f2f2',
        borderTopWidth:1,
    },
    listItem: {
        height: 80
    },
    rightIcon: {
        // float:"right"
        position: "absolute",
        right: 0,
        top: 0
    },
    leftIcon1: {
        position: "absolute",
        left: 0,
        top: 0
    },
    leftIcon2: {
        position: "absolute",
        left: 40,
        top: 0
    }
});

class OrganizationScreen extends React.Component {
    state = {
        tab: "0",
    }
    //切换
    changeTab = (e) => {
        // alert(e)
        let tab;
        if (e === "企业组织") {
            tab = "0";
        } else {
            //我参与的
            tab = "1"
        }
        this.setState({ tab })
    }

    componentDidMount() {
        
    }
    render() {
        const { tab, list } = this.state
        return (
            <View style={styles.container}>
                <WingBlank>
                    <View style={styles.header}>
                        <Icon name='md-search' style={styles.rightIcon} blue/>
                        <SegmentedControl values={['企业组织', '项目组织']} tintColor="#067DC6" style={styles.tabs} onValueChange={this.changeTab} />
                    </View>
                    <View style={styles.body}>
                        {
                            tab === "0"
                                ?
                                <CompanyOrganization/>
                                
                                : <ProjectOrg props={this.props}/>
                        }
                    </View>
                </WingBlank>
            </View>
        )
    }
}

export default OrganizationScreen