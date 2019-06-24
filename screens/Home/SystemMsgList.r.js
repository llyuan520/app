//created by lee in 2018/12/18
import React from "react";
import { View, StyleSheet, Text, ScrollView,TouchableHighlight } from "react-native";
import {
  Button,
  Toast
} from 'antd-mobile-rn'
import Icon from 'react-native-vector-icons';
import {request} from '../../utils'
const styles = StyleSheet.create({
    paddingLeftRight:{
      paddingLeft:15,
      paddingRight:15,
    },
    contentBoxStyle:{
      backgroundColor:'#fff',
    },
    oneMsgBoxStyle:{
        borderBottomWidth:1,
        borderBottomColor:'#DDD',
        paddingTop:15,
        paddingBottom:15,
    },
    oneMsgHeaderStyle:{
        position:'relative',
        height:20,
    },
    titleStyle:{
        position:'absolute',
        width:'70%',
        fontSize:16,
        color:'#2B2B2B',
        display:'flex',
        flexDirection: 'row'

    },
    dateStyle:{
        position:'absolute',
        right:0,
        fontSize:12,
        color:'#999'
    },
    contentBoxStyle:{
        marginTop:5,
    },
    contentTextStyle:{
        fontSize:14,
        color:'#666'
    },
    redPointStyle:{
        marginLeft:1,
        marginTop:-2,
    }
});

export default class SystemMsgList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data: props.data || [],
        }
    }
    componentWillReceiveProps(nextProps){
        if('data' in nextProps){
            this.setState({
                data: nextProps.data
            })
        }
    }

    setMsgReaded=(item,index)=>{
        if(item.isRead === '1'){
            return;
        }
        console.log('已读');
        request('/notice/updateReadStatus',{
            method:'POST',
            body:{
                id: item.id,
            }
        }).then(res=>{
            if(res){
                console.log(res);
                if(res.data === true){
                    Toast.success('已将该消息设为已读...',1)
                    item.isRead = "1";
                    let { data } = this.state;
                    data[index] = item;
                    this.setState({
                        data
                    })
                }else{
                    Toast.error('设置已读失败',1)
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
                <View>
                {
                    data.map((item,index)=>{
                    return(
                        <TouchableHighlight key={item.id} underlayColor="transparent" onPress={()=>this.setMsgReaded(item,index)}>
                            <View style={styles.oneMsgBoxStyle}>
                                    <View style={styles.paddingLeftRight}>
                                        <View style={styles.oneMsgHeaderStyle}>
                                            <View style={styles.titleStyle}>
                                                <Text >
                                                    {item.title}
                                                </Text>
                                                {
                                                    item.isRead === "0"?
                                                    <Icon.Entypo name="controller-record" size={8} color={'red'} style={styles.redPointStyle}/>
                                                    :
                                                    <Text></Text>
                                                }
                                               
                                            </View>
                                            <Text style={styles.dateStyle}>
                                                {item.date}
                                            </Text>
                                        </View>
                                        <View style={styles.contentBoxStyle}>
                                            <Text style={styles.contentTextStyle}>
                                                {item.content}
                                            </Text>
                                        </View>
                                    </View>
                            </View>
                        </TouchableHighlight>
                    )
                    })
                }
                </View>
                :
                this.props.isRefresh===true ? 
                <Text></Text>
                :
                <Text style={{backgroundColor:'#fff',textAlign:'center',fontSize:16,paddingTop:20,color:'#ccc'}}>
                    暂无系统消息
                </Text>
            }
            
          </View>
        )
    }

}