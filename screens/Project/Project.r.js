// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, ScrollView, Carousel } from "react-native";
import {
    Button,
    WingBlank,
    SegmentedControl,
    List, ActivityIndicator
} from "antd-mobile-rn";
import { request } from '../../utils'
import { Icon } from '../../components/antd';
import { get } from 'lodash';
import { ScrollList } from '../../components';
const Item = List.Item;
const Brief = Item.Brief;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 40,
        height: 44,
        flex: 1
    },
    Brief: {
        overflow: "hidden",
    },
    tabs: {
        height: 28,
        width: 180,
        borderRadius: 8,
        left: "50%",
        position: "absolute",
        marginLeft: -90
    },
    body: {
        marginTop: 50,
        marginBottom: 70,
        backgroundColor: '#fff',
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

class Project extends React.Component {
    state = {
        tab: "0",
        list: [],
        listView: false,
        data: ['1', '2', '3'],
        imgHeight: 176,
        loading: false,
        isDown: false
    }

    changeTab = (e) => {
        let tab = "0";
        if (e === "我的项目") {

        } else {
            //我参与的
            tab = "1"
        }
        this.setState({ tab, page: 1 }, () => this.getList())
    }
    listItemClick(item) {
        const { navigation } = this.props;
        const { tab } = this.state;
        const { name, id } = item;
        let url = "ProjectList"
        if (tab === "1") {
            url = "StagesList";
            userType = 0
        } else {
            url = "ProjectList";
            userType = 1
        }
        navigation.navigate(url, {
            name,
            id, userType
        })
    }
    getList(page, setFalse) {
        const { tab, loading } = this.state;
        if (loading) { return; }
        this.setState({ loading: true })
        const url = tab === "0" ? "/item/getMyItems" : "/item/getMyApplyItem"
        request(url, {
            params: {
                page
            }
        })
            .then(res => {
                const list = get(res, "data.list") || [];
                this.setState({
                    isDown: list.length !== 10,
                    loading: false
                })
                let _list = []
                setFalse && setFalse()
                if (page && page !== 1) {
                    _list = this.state.list.concat(list);
                } else {
                    _list = list;
                }
                _list.forEach(item => {
                    item.imgUrl = this.getImgUrlById(item.projectPicture) || "http://sz-dvlp-synergycloud.oss-cn-shenzhen.aliyuncs.com/data/20181227_1078213874789294080.png?Expires=1861261194&OSSAccessKeyId=LTAIfJrmPU7QeWfN&Signature=bQl9VsZ0aSDJpIeoVMdZKngNg9M%3D"
                })
                res && this.setState({ list: _list })
            })
    }

    addItem = () => {
        const { navigation } = this.props;
        navigation.navigate("AddItem")
    }

    changeList = () => {
        this.setState({ listView: this.state.listView })
    }

    getImgUrlById(fileId) {
        request("/file/fileDownload1", {
            params: {
                fileId
            }
        }).then(res => {
            return res.data
        })
    }

    componentDidMount() {
        this.getList();
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        const { tab, list, listView, isDown } = this.state;
        return (
            <View style={styles.container}>
                <WingBlank>
                    <View style={styles.header}>
                        <Icon name='md-search' style={styles.leftIcon1} blue />
                        <Icon name='md-add' style={styles.leftIcon2} blue onPress={this.addItem} />
                        <Icon name='md-list' style={styles.rightIcon} blue onPress={this.changeList} />
                        <SegmentedControl values={['我的项目', '我参与的']} tintColor="#067DC6" style={styles.tabs} onValueChange={this.changeTab} />
                    </View>
                    <View style={styles.body}>
                        {
                            listView
                                ? <Carousel className="space-carousel"
                                    frameOverflow="visible"
                                    cellSpacing={10}
                                    slideWidth={0.8}
                                    autoplay
                                    infinite
                                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                    afterChange={index => this.setState({ slideIndex: index })}
                                >
                                    {list.map((val, index) => (
                                        <a
                                            key={val}
                                            href=""
                                            style={{
                                                display: 'block',
                                                position: 'relative',
                                                top: this.state.slideIndex === index ? -10 : 0,
                                                height: this.state.imgHeight,
                                                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                            }}
                                        >
                                            <img
                                                src={val.imgUrl}
                                                alt=""
                                                style={{ width: '100%', verticalAlign: 'top' }}
                                                onLoad={() => {
                                                    // fire window resize event to change height
                                                    window.dispatchEvent(new Event('resize'));
                                                    this.setState({ imgHeight: 'auto' });
                                                }}
                                            />
                                        </a>
                                    ))}
                                </Carousel>
                                :
                                <ScrollList getData={this.getList.bind(this)} isDown={isDown} isMore={true}>
                                    <List>
                                        {
                                            list.map((item, index) =>
                                                <Item arrow="horizontal" multipleLine key={index} onClick={() => this.listItemClick(item)} style={styles.listItem}>
                                                    {item.name}
                                                    <Brief style={styles.Brief}>{item.number}</Brief>
                                                </Item>
                                            )
                                        }
                                    </List>
                                </ScrollList>
                        }
                    </View>
                </WingBlank>
                <ActivityIndicator
                    toast
                    text="数据加载中..."
                    size="large"
                    animating={this.state.loading}
                />
            </View>
        )
    }
}

export default Project