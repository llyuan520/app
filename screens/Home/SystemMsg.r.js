//created by lee in 2018/12/18
import React from "react";
import { View,  StyleSheet, Text, Keyboard,ScrollView } from "react-native";
import {
  Toast,
  SearchBar,
  ActivityIndicator,
  Modal
} from 'antd-mobile-rn';
import { BackHeader } from '../../components'
import SystemMsgList from './SystemMsgList.r'
import {request,getInputReg} from "../../utils"
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
    },
    paddingLeftRight:{
        paddingLeft:15,
        paddingRight:15,
    },
    searchBoxStyle:{
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
    },
})
const alert = Modal.alert
const reg = getInputReg();
class SystemMsg extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            isDown:false,
            scrollFlag:false,
            page:1,
            loading:false,
            isRefresh:false
        }
    }
    
    searchOrderList = (e)=>{
        if(reg.test(e) === true){
            Toast.info('请勿输入表情',1);
            return;
        }
        this.setState({
            page:1
        },()=>{
            this.getData(e);
        })
        
    }

    clearBtnFunc=()=>{
        // Toast.info('清空系统消息中...',2)

        const alertInstance = alert('清空系统消息', '确定清空系统消息吗?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => {
                request('/notice/clearNotice',{
                    method:'POST',
                    body:{
                        noticeType:'6'
                    }
                }).then(res=>{
                    if(res){
                        console.log(res);
                        if(res.data===true){
                            Toast.success('清空成功',2);
                            this.setState({
                                data:[],
                                isDown:false,
                                scrollFlag:false,
                            })
                        }
                    }
                })
            }},
        ]);
        // setTimeout(() => {
        //     // 可以调用close方法以在外部close
        //     console.log('auto close');
        //     alertInstance.close();
        // }, 500000);

        // request('')

       
    }
    
    toggleLoadingFlag = (flag)=>{
        this.setState({
            loading:flag,
            scrollFlag:false,
            isRefresh:false,
        })
    }

    getData=(text)=>{
        const {page} = this.state;
        console.log(page);
        request('/notice/findNoticeDataByType', {
            params:{
                limit:10,
                page: page,
                noticeType:'6',
                text:text,
            }
        }).then(res=>{
            if(res){
                console.log('-------------')
                console.log(res)
                let data = [];
                if(page && page !== 1){
                    let stateData = this.state.data;
                    data = stateData.concat(res.data);
                }else{
                    data = res.data;
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
                    data:data,
                })
            }
            this.toggleLoadingFlag(false)
        })
    }
    
    componentDidMount(){
        this.getData();
    }

    render(){
        const {data} = this.state
        return (
            <View style={styles.container}>
                <View>
                    <BackHeader
                        clearBtn={true}
                        clearBtnFunc={this.clearBtnFunc}
                        isHome={true}
                        title={'系统消息'}
                        />
                </View>
                <View style={{...styles.searchBoxStyle,...styles.paddingLeftRight}}>
                    {/* <View style={styles.searchBoxRadius}> */}
                    <SearchBar 
                        style={{backgroundColor:'#f2f2f2'}}
                        placeholder="搜索事项/内容" 
                        onChange={this.searchOrderList} 
                        showCancelButton={false}
                        onCancel={Keyboard.dismiss}/>
                    {/* </View> */}
                </View>
                    <ScrollView 
                        style={{height:'100%'}}
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
                                    this.getData(this.state.text);
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
                                        this.getData(this.state.text);
                                    },1000)
                                })
                            }
                        }}
                        scrollEventThrottle={16}
                        >
                        {
                            this.state.isRefresh === true ? 
                            <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:20}}>
                                正在刷新中...
                            </Text>
                                : <Text style={{height:0}}></Text>
                        }
                        {
                            <SystemMsgList  data={data} isRefresh={this.state.isRefresh}/>
                        }
                        <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:10,paddingBottom:10}}>
                        {
                            this.state.isDown === true ? '没有更多数据了'
                            : this.state.scrollFlag=== true ? '数据加载中...' : ''
                        }
                        </Text>
                    </ScrollView>
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

export default SystemMsg;