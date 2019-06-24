//created by lee in 2018/12/18
import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableHighlight } from "react-native";
import {
  Button,
  Toast
} from 'antd-mobile-rn'
import InviteModal from './InviteModal.r'
import {request} from '../../utils'
const styles = StyleSheet.create({
    paddingLeftRight:{
      paddingLeft:15,
      paddingRight:15,
    },
    searchBoxRadius:{
      // borderRadius:10,
      overflow:'hidden',
    },
    contentBoxStyle:{
      backgroundColor:'#F2F2F2',
    },
    msgBoxStyle:{
      marginBottom:10,
      backgroundColor:'#fff'
    },
    orderBtnBoxStyles:{
      paddingTop:10,
      paddingBottom:10
    }
});

export default class Order extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data: props.data || [],
            isBtn: props.isBtn || false,
            visible: false,
            item: undefined,
            title: '',
            isAgreeModal: false,
        }
    }
    componentWillReceiveProps(nextProps){
        if('data' in nextProps){
            this.setState({
                data: nextProps.data
            })
        }
        if('isBtn' in nextProps){
            this.setState({
                isBtn: nextProps.isBtn
            })
        }
        // setTimeout(()=>{
        //     this.scroolToTop();
        // },100)
    }

    onClose=()=>{
        this.setState({
            visible:false
        })
    }

    handleAgreeOnlyAgreeAndReject = (state,item)=>{
        let { url,businessId } = item;
        request(url,{
            method:'POST',
            body:{
                bizId: businessId,
                state:state,
                remark: ''
            }
        }).then(res=>{
            if(res){
                if(res.data === true){
                    Toast.success('操作成功',2)
                }else{
                    Toast.fail(res.msg,2)
                }
            }
        })
    }

    render(){
        const {data,isBtn} = this.state;
        return(
            <View style={styles.contentBoxStyle}>
            {
                data && data.length>0 ? 
                // <ScrollView style={data.length>2?{marginBottom:100}:{}}
                //    ref={(view)=>{this.myScrollView = view;}}
                //        > 

                    <View>
                {
                    data.map((item,index)=>{
                    return(
                        
                        <TouchableHighlight key={item.id} underlayColor="transparent" 
                            onPress={
                                ()=>{
                                   if(this.props.isHome && this.props.isHome === true){
                                        //加id判断 跳转到不同路由
                                        if(item.noticeConfigNum===114){
                                            this.props.navigation.navigate('InviteDetail',{
                                            id:item.id,
                                            item:item
                                            })
                                        }
                                    }
                                }
                            }
                        >
                        
                            {/* key到时候放对应的单据或者信息id */}
                            <View style={styles.msgBoxStyle}>
                            <View style={{height:40,position:'relative',borderBottomColor:'#ddd',borderBottomWidth:1}}>
                                <View style={{position:'absolute',left:15,top:13}}>
                                <Text style={{fontSize:14}}>
                                    {item.toptitle}
                                </Text>
                                </View>
                                <View style={{position:'absolute',right:15,top:12}}>
                                <Text style={{fontSize:14}}>
                                    {item.date} 
                                </Text>
                                </View>
                            </View>
                            <View style={{borderBottomColor:'#ddd',borderBottomWidth:1}}>
                                {
                                    !item.title ?
                                    <View style={{...styles.paddingLeftRight,paddingTop:10,paddingBottom:20}}>
                                        <Text style={{fontSize:16}}>
                                            {item.wfBody}
                                        </Text>
                                    </View>
                                    :
                                    <View style={{position:'relative'}}>
                                        <View style={{height:40}}>
                                            <View style={{position:'absolute',left:15,top:14,width:'70%'}}>
                                            <Text style={{fontSize:16,color:'#2B2B2B'}} numberOfLines={1}>
                                                {item.title}
                                            </Text>
                                            </View>
                                            <View style={{position:'absolute',right:15,top:10}}>
                                            {
                                                item.status && item.status!=="" ?
                                                <Text style={{fontSize:12,borderColor:'#F9BF00',borderWidth:1,color:'#F9BF00',borderRadius:5,padding:4}}>
                                                {item.status} 
                                                </Text>
                                                :
                                                <Text></Text>
                                            }
                                            </View>
                                        </View>
                                        <View style={{...styles.paddingLeftRight,marginBottom:15}}>
                                            <Text style={{color:'#067DC6'}}>
                                                {item.supply}
                                            </Text>
                                        </View>
                                        <View  style={{...styles.paddingLeftRight,marginBottom:10}}>
                                            <Text style={{color:'#666',fontSize:14}}>
                                                {item.contractOrStages}
                                            </Text>
                                        </View>
                                    </View>
                                }
                            </View>
                            {
                                isBtn===true ? 
                                <View style={{...styles.orderBtnBoxStyles,...styles.paddingLeftRight}}>
                                    {
                                        item.noticeConfigNum===100||item.noticeConfigNum===117? 
                                        <Button
                                            activeStyle={false}
                                            style={{borderWidth:0,backgroundColor:'#ECF5FA'}}
                                            >
                                            <Text style={{color:'#067DC6'}}>
                                                开始完善
                                            </Text>
                                        </Button>
                                        :
                                        item.noticeConfigNum===101?
                                        <Button
                                            activeStyle={false}
                                            style={{borderWidth:0,backgroundColor:'#ECF5FA'}}
                                            >
                                            <Text style={{color:'#067DC6'}}>
                                                开始测算
                                            </Text>
                                        </Button>
                                        :
                                        item.noticeConfigNum===106?
                                        <Button
                                            activeStyle={false}
                                            style={{borderWidth:0,backgroundColor:'#ECF5FA'}}
                                            >
                                            <Text style={{color:'#067DC6'}}>
                                                开始填写
                                            </Text>
                                        </Button>
                                        :
                                        item.noticeConfigNum>=110 && item.noticeConfigNum <= 116?
                                        <View style={{display:'flex',flexDirection: 'row'}}>
                                            <Button activeStyle={false} 
                                            style={{borderWidth:0,marginRight:20,flex:1,backgroundColor:'#ECF5FA'}}
                                            onClick={()=>{
                                                if(item.noticeConfigNum===114){
                                                    //申请加入企业
                                                    this.setState({
                                                        item:item,
                                                        isAgreeModal:true,
                                                        title:'审批同意',
                                                        visible:true,
                                                    })
                                                }else{
                                                    this.handleAgreeOnlyAgreeAndReject('4',item);
                                                }
                                            }}
                                            >
                                            <Text style={{color:'#067DC6'}}>
                                                同意
                                            </Text>
                                            </Button>
                                            <Button activeStyle={false} style={{borderWidth:0,flex:1,backgroundColor:'#FDF5F4'}}
                                                onClick={()=>{
                                                    if(item.noticeConfigNum===114){
                                                        //申请加入企业
                                                        this.setState({
                                                            item:item,
                                                            isAgreeModal:false,
                                                            title:'审批拒绝',
                                                            visible:true,
                                                        })
                                                    }else{
                                                        this.handleAgreeOnlyAgreeAndReject('3',item);
                                                    }
                                                }}
                                            >
                                            <Text style={{color:'#F07060'}}>
                                                拒绝
                                            </Text>
                                            </Button>
                                        </View>
                                        :
                                        <View style={{display:'flex',flexDirection: 'row'}}>
                                            <Button activeStyle={false} style={{borderWidth:0,marginRight:20,flex:1,backgroundColor:'#ECF5FA'}}>
                                            <Text style={{color:'#067DC6'}}>
                                                同意
                                            </Text>
                                            </Button>
                                            <Button activeStyle={false} style={{borderWidth:0,marginRight:20,flex:1,backgroundColor:'#FDF5F4'}}>
                                            <Text style={{color:'#F07060'}}>
                                                拒绝
                                            </Text>
                                            </Button>
                                            <Button activeStyle={false} style={{borderWidth:0,flex:1,backgroundColor:'#EEF6FF'}}>
                                            <Text style={{color:'#4B97EB'}}>
                                                更多
                                            </Text>
                                            </Button>
                                        </View>
                                    }
                                </View>
                                :
                                <Text></Text>
                            }
                            
                            </View>

                        </TouchableHighlight>
                        
                    )
                    })
                    
                }
               
                </View>
                // </ScrollView>
                :
                <Text style={{backgroundColor:'#fff',textAlign:'center',fontSize:16,paddingTop:20}}>
                    暂无数据
                </Text>
            }
            <InviteModal 
                isAgreeModal={this.state.isAgreeModal} 
                visible={this.state.visible}
                title={this.state.title}
                onClose={this.onClose}
                navigation={this.props.navigation}
                item={this.state.item}
                jumpPage={'Home'}
            />
           
          </View>
        )
    }

}