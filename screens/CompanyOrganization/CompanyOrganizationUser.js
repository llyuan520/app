// Created by Luoshj on 2018/12/19
import React from 'react';

import { createForm } from "rc-form";
import { bindActions } from "../../ducks/user";
import { connect } from "react-redux";

import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { List, WingBlank, SearchBar, Checkbox, Toast } from 'antd-mobile-rn';
import { Icon, BackHeader } from '../../components'
import { request } from '../../utils';
import { Brief } from 'antd-mobile-rn/lib/list/ListItem.native';
import { remove, get } from 'lodash';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 20,
        height: 44,
        lineHeight: 44
    },
    title: {
        fontSize: 16,
        color: "#2B2B2B",
        textAlign: "center"
    },
    confirmText: {
        fontSize: 14,
        color: "#067DC6",
        position: "absolute",
        right: 0,
        top: 10
    },
    img: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
    Logo:{
        width: 40, height: 40,
        marginTop:10,
        marginBottom:10,
        borderRadius:20,
    },
    ItemName:{
        fontSize:18,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20
    },
    ItemIphone:{
        color:'#888888',
        paddingLeft:10,
        paddingTop:20
    },
    searchBoxStyle:{
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
    },
    searchBoxRadius:{
        // borderRadius:10,
        overflow:'hidden',
    },
});
/**
 * 人员多选页面
 * create by luoshj
 * @param data 请求参数
 * @param url 请求接口
 * @param title 页面标题
 * @param confirmFun 回调方法
 */
class AddDepartmentUser extends React.Component {

    state = {
        UserList: [],
        checkedList:[],
        title:'', 
        data:{}, 
        url:'',
        page:1,//页数
        scrollFlag:false,//是否正在滚动加载
        isRefresh:false,//是否正在下拉刷新
        text:'',//搜索的字词
        isDown:false,//是否没有更多数据
    }

    getList() {
        const {data, url,} = this.props.navigation.state.params;
        const {page} = this.state;
        const param = {
            "page":1,
            "limit":10,
            ...data
        }
        request(url,{
            method:'GET',
            params:{
                "page":1,
                "limit":10,
                ...data
            }
        }).then(res=>{
            if(res){
                let data  = [];
                if(page && page>1){
                    //如果不是第一页 则需要拼接，否则是赋值
                  data = this.state.UserList;
                  data = data.concat(res.data.list);
                }else{
                  data = res.data.list;
                }
                if((res.data.length===0||res.data.length!==10 )&& (data.length!==0)){
                  this.setState({
                    isDown:true
                  })
                }else{
                    this.setState({
                        isDown:false
                    })
                }
                this.setState({
                    UserList:data,
                })
                // this.setState({
                //     UserList:res.data.list
                // })
            }else{
                // Toast.info('查询失败',2)
            }
            this.toggleLoading();
        })
    }

    toggleLoading = ()=>{
        this.setState({
          scrollFlag:false,
          isRefresh:false,
        })
      } 
      

    confirm() {
        console.log(this.props.navigation)
        const { formValue } = this.props.navigation.state.params;
        this.props.navigation.state.params.confirmFun(this.state.checkedList,formValue);
        if(this.props.navigation.state.params.goBack){
            this.props.navigation.navigate(this.props.navigation.state.params.goBack);
        }else{
            this.props.navigation.goBack();
        }
    }

    changeCheck(e, item) {
        let { checkedList } = this.state;
        if (e.target.checked) {
            checkedList.push(item)
        } else {
            remove(checkedList, x=>x.id===item.id)
        }
        this.setState(
            {
                checkedList
            }
        )
    }
    
    componentDidMount() {
        const { title, data, url } = this.props.navigation.state.params;
        this.setState({
            data,
            url,
            title
        })
        this.getList()
    }

    render() {
        const { UserList,title } = this.state;
        return (
            <View style={styles.container}>
                <WingBlank>
                    <View>
                        <BackHeader title={title} backIcon={<Icon name="md-close" />} confirm={{ text: "确定", fun: this.confirm.bind(this) }} />
                        {/* <TextInput
                            style={{ height: 40, backgroundColor: "#F2F2F2"}}
                            placeholder="搜索"
                        /> */}
                    </View>
                    <View style={styles.searchBoxStyle}>
                        <View style={styles.searchBoxRadius}>
                        {/* <SearchBar 
                            style={{backgroundColor:'#f2f2f2'}}
                            placeholder="搜索事项/内容" 
                            onChange={this.searchOrderList} 
                            showCancelButton={false}
                            onCancel={Keyboard.dismiss}/> */}
                            <SearchBar placeholder="搜索" maxLength={11} />
                        </View>
                    </View>
                    <View style={{height:'84%'}}>
                        <ScrollView
                            onScroll={(e)=>{
                                if(this.state.scrollFlag===true){return;}
                                let contentHei = e.nativeEvent.contentSize.height;
                                let layoutHei = e.nativeEvent.layoutMeasurement.height;
                                let hei = contentHei - layoutHei - 100;
                                if(hei>0 && e.nativeEvent.contentOffset.y > hei && this.state.isDown===false){
                                    this.setState({
                                        page:this.state.page+1,
                                        scrollFlag:true
                                    },()=>{
                                        this.getList(this.state.text);
                                    })
                                }
                            }}
                            onScrollEndDrag={(e)=>{
                                if( this.state.isRefresh === true ){return}
                                if(e.nativeEvent.contentOffset.y <= -100){
                                    this.setState({
                                        isRefresh:true,
                                        page:1,
                                        srollFlag:true,
                                    },()=>{
                                        setTimeout(()=>{
                                            this.getList(this.state.text);
                                        },1000)
                                    })
                                }
                            }}
                            scrollEventThrottle={16}



                            //style={{height:'83%'}}
                            >
                            {
                                this.state.isRefresh === true ? 
                                <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:20}}>
                                    正在刷新中...
                                </Text>
                                : <Text style={{height:0}}></Text>
                            }
                            <List>
                                {
                                    UserList.map((user, index) =>
                                    <Item 
                                    key={index}
                                    extra={<Checkbox defaultChecked={user.checked} onChange={(e) => this.changeCheck(e, user)} />}>
                                    
                                        <View style={{display:'flex',flexDirection: 'row'}}>
                                            <View >
                                                <Image
                                                style={styles.Logo}
                                                source={
                                                    user.avatar &&user.avatar !==null ? {uri: user.avatar}
                                                    : require('../../statics/images/name.png')
                                                }
                                                />
                                            </View>
                                            <View>
                                                <Text style={styles.ItemName}>{user.name}</Text>
                                            </View>
        
                                            <View>
                                                <Text style={styles.ItemIphone}>{user.phone}</Text>
                                            </View>
                                        </View>
                                    </Item>
                                    )
                                }
                            </List>
                            <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:10,paddingBottom:10}}>
                            {
                                this.state.isDown === true ? '没有更多数据了'
                                : this.state.scrollFlag=== true ? '数据加载中...' : ''
                            }
                            </Text>
                        </ScrollView>
                    </View>
                </WingBlank>
            </View>
        )
    }
}

export default (connect(
    ({ user,token }) => ({
      user
    }),
    dispatch => ({
        login: bindActions(dispatch).login,
    })
  )(AddDepartmentUser));