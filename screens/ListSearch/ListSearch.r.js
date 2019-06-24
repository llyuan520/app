// Created by Lee on 2018/12/3
/**
 * 入参说明： 路由跳转时添加入参(backNavigation)表示要回传的路由
 */
import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, FlatList,TouchableOpacity,Keyboard } from "react-native";
import {request} from '../../utils/'
import {
    Button,
    Toast,
    SearchBar,
    ActivityIndicator
} from "antd-mobile-rn"
// import { domain} from "../../constants";
// import {ScrollVertical} from '../../components'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 20,
    },
    relativeBox:{
        height:48,
        position:'relative',
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        backgroundColor:'#efeff4'
    },
    defaultWH:{
        width:22,
        height:22,
        position: 'absolute',
        left: 0,
        zIndex:2,
    },
    searchBarStyle:{
        height:22,
        fontSize:14,
        position:'absolute',
        left: 20,
        right: 0,
        zIndex:1,
        backgroundColor:'#fff'
    },
    rowWrapStyle:{
        position:'relative',
        paddingTop:10,
        height:40,
        paddingLeft:20
    },
    // rowImageStyle:{
    //     position:'absolute',
    //     height:40,
    //     width:40,
    //     top:10,
    //     left:20,
    //     borderRadius:20,
    // },
    rowNameStyle:{
        // position:'absolute',
        // top:22,
        // left:80,
        fontSize:16,
        lineHeight:30,
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        fontSize: 15,
        color: 'black',
    }

})

const REQUEST_URL = `/company/findCompanyWithName`;
let pageNo = 1;//当前第几页
let totalPage=5;//总的页数
let itemNo=0;//item的个数
let foot = 0;

class ListSearch extends React.Component {

    constructor(props){
        // REQUEST_URL = `${domain}${props.url}`
        super(props);
        this.state = {
            isLoading: false,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false,//下拉控制
            txt: undefined
        }

    }

    getData = (page)=>{
        request(REQUEST_URL,this.props.filter || {
            params:{
                name: this.state.txt,
                page:page,
                limit:10,
            }
        }).then(res=>{
            if(res){
                console.log(res);
                if(page===1){
                    this.setState({
                        dataArray:[]
                    },()=>{
                        this.handleData(res);
                    })
                }else{
                    this.handleData(res);
                }
                

            }else{
                this.setState({
                    error: true,
                    errorInfo: '查询失败'
                })
            }
        })
    }

    handleData= (res)=>{
        let data = res.data.list;
        let dataBlob = [];
        totalPage= res.data.total ? Math.ceil(res.data.total / 10) : 0;
        if(pageNo>=totalPage){
            foot = 1;//listView底部显示没有更多数据了
        }
        
        if(data.length>0){
            data.map((item)=>{
                dataBlob.push({
                    key: item.id,
                    value: item.name,
                })
            })
            this.setState({
                //复制数据源
                dataArray:this.state.dataArray.concat(dataBlob),
                isLoading: false,
                showFoot:foot,
                isRefreshing:false,
                error:false,
            });
        }else{
            this.setState({
                error:false,
                errorInfo:'暂无相关数据',
                showFoot:0
            })
        }
       
        data = null;
        dataBlob = null;
    }

    goBack = ()=>{
        this.props.navigation.goBack()
    }

    searchListData = (txt)=>{
        pageNo = 1;
        this.setState({
            txt:txt,
        },()=>{
            this.getData(pageNo);
        })
        // const url = this.props.url;
        // if(!url){Toast.info('没有url')};
        // request('/biz/concompanyapp/findCompData',{
        //     method:'GET',
        //     params:{
        //         txt: txt
        //     }
        // }).then(res=>{
        //     if(res){
        //         console.log(res);
        //         Toast.success('查出来了')
        //     }
        // })
    }

    renderLoadingView =()=> {
        return (
            <View>
                <ActivityIndicator
                    animating={true}
                    size="large"
                />
            </View>
        );
    }
    renderErrorView = ()=> {
        return (
            <View style={styles.container}>
                <Text>
                    Fail
                </Text>
            </View>
        );
    }
    renderData = ()=> {
        return (
                <FlatList
                    data={this.state.dataArray}
                    renderItem={this._renderItemView}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={1}
                    ItemSeparatorComponent={this._separator}
                 />
            // </TouchableOpacity>
        );
    }

    _onPress = (item)=>{
        this.props.navigation.navigate(this.props.navigation.state.params.backNavigation,item)
    }

    _separator=()=>{
        return <View style={{height:1,backgroundColor:'#999999'}}/>;
    }

    _renderItemView=(items)=>{
        const item = items.item;
        return(
            <TouchableOpacity onPress={()=>this._onPress(item)}>
                <View style={styles.rowWrapStyle} key={item.key}>
                    {/* <Image
                            style={styles.rowImageStyle}
                            defaultSource={require('../../statics/images/name.png')}
                            source={item.img ? {url:item.img} : require('../../statics/images/name.png')}
                        /> */}
                    <Text style={styles.rowNameStyle}>
                        {item.value}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderFooter=()=>{
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    _onEndReached=()=>{
        //如果是正在加载中或没有更多数据了，则返回
        // if(this.state.showFoot != 0 ){
        //     return ;
        // }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((pageNo!=1) && (pageNo>=totalPage)){
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        this.getData( pageNo );
    }


    render(){
        return (
            // <View style={{backgroundColor:'#fff'}}>
                <View style={styles.container}>
                    <View style={styles.relativeBox}>
                            <Text
                                style={styles.defaultWH}
                                onPress={this.goBack}
                                >
                                <Image
                                    source={require('../../statics/images/back.png')}
                                    style={styles.defaultWH}
                                />
                            </Text>
                            <View style={styles.searchBarStyle}>
                                <SearchBar placeholder={this.props.placeholder || '请输入要搜索的内容'}
                                    onChange={this.searchListData}
                                    showCancelButton={false}
                                    onCancel={Keyboard.dismiss}
                                />
                            </View>
                    </View>
                    <ScrollView style={{height:'100%'}}>
                        {
                            //第一次加载等待的view
                            this.state.isLoading && !this.state.error ? 
                                this.renderLoadingView()
                                :
                                this.state.error ? this.renderErrorView() 
                                :
                                //加载数据
                                this.renderData()
                        }
                    </ScrollView>
                </View>
            // </View>
        )
    }
} 

export default ListSearch