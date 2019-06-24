//created by lee in 2018/12/18
import React from "react";
import { View, StyleSheet, Text, ScrollView,TouchableHighlight,Image } from "react-native";
import {
  Button,
  Toast,
  List,
  Modal,
  Steps
} from 'antd-mobile-rn'
import Icon from 'react-native-vector-icons';
import {request,changeDateToYMDHM,getFormItemSelf} from '../../utils'
import { BackHeader } from '../../components'
import { createForm } from 'rc-form'
import InviteModal from './InviteModal.r'
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1
    },
    paddingLeftRight:{
      paddingLeft:15,
      paddingRight:15,
    },
    applyTitleStyle:{
        fontSize:22,
        color:'#067DC6',
        paddingTop:20,
        paddingBottom:20
    }
});
const Item = List.Item;
const Brief = Item.Brief;
const Step = Steps.Step;

const customIcon = (item) => (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
    //   <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
    //     <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
    //     <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
    //   </g>
    // </svg>
   <Image
       style={{width:30,height:30}}
       source={{uri:'http://b.hiphotos.baidu.com/image/h%3D300/sign=2e94e5c1282dd42a400907ab333a5b2f/e4dde71190ef76c65e514b839016fdfaae516793.jpg'}}
       /> 
  );
  

class InviteDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            approvalList:[],
            num:undefined,
            visible:false,
            title:'',
            item:undefined,
            isAgreeModal:false,
            departmentId:undefined,
            sendData:[2,2]
        }
    }

    componentDidMount(){
        let params = this.props.navigation.state.params;
        let id = params.id;
        let item = params.item;
        this.setState({
            item:item
        })
        if(!id){
            Toast.fail('进入详情页失败，即将返回首页...',2,()=>{
                this.props.navigation.navigate('Home');
            })
            return ;
        }
        request('/runtimeTask/findMyDealInfoById',{
            method:'GET',
            params:{
                id:id
                // id:"1074913245427851264"
            }
        }).then(res=>{
            if(res){
                //申请加入企业
                let data = [{
                    label:'申请人',
                    value:res.data.applicantName
                },{
                    label:'企业名称',
                    value:res.data.companyName
                }];
                this.setState({
                    approvalList:res.data.approvalList,
                    data:data,
                    num: res.data.num
                })
            }
        })
    }

    handleAgree =(e)=>{
        e.preventDefault()
        // console.log('--------同意');
        // const {num} = this.state;
        // console.log(num);
        // if(!num){
        //     Toast.fail('消息类型出错，请重试',2);
        //     return;
        // }
        // if(num===114){
            this.setState({
                isAgreeModal: true
            })
            this.handleJoinCompanyAgree(true,'审批同意');
        // }
    }

    handleReject = (e)=>{
        e&& e.preventDefault()
        // const {num} = this.state;
        // if(!num){Toast.fail('消息类型出错，请重试',2);return;}
        // if(num===114){
            this.setState({
                isAgreeModal: false
            })
            this.handleJoinCompanyAgree(true,'审批拒绝');
        // }
    }

    handleJoinCompanyAgree=(isNeedModal,title)=>{
        console.log(isNeedModal,title)
        if(isNeedModal === true){
            this.setState({
                title: title,
                visible:true
            })
        }
    }
    

    onClose=()=>{
        this.setState({
            visible:false
        })
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
    }

    getStep = (item,index)=>{
        return (
            <Step key={index} title={
                <View style={{backgroundColor:'#F2F2F2',padding:15,display:'flex',flexDirection:'row',width:'90%',flexWrap:'wrap'}}>
                    <View style={{position:'relative',height:20,width:'100%'}}>
                        <Text style={{position:'absolute',left:0,top:0,fontSize:16,color:'#2B2B2B'}}>
                            {item.statusValues}
                        </Text>
                        <Text style={{position:'absolute',right:0,top:0,fontSize:12,color:'#999'}}>
                            {changeDateToYMDHM(item.approvalDate)}
                        </Text>
                    </View>
                    <View style={{width:'100%',marginHorizontal:3}}>
                        <Text style={{fontSize:16,color:'#999'}}>
                            {
                                item.userName && item.roleName ? 
                                `${item.userName}(${item.roleName})`
                                :
                                ''
                            }
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize:12,color:'#999'}}>审批意见：{item.approvalMsg || '无'}</Text>
                    </View>
                </View>
            } icon={customIcon()} />
        )
    }

 

    render(){
        const {data,approvalList,num,isAgreeModal,sendData} = this.state;
        const { getFieldProps } = this.props.form;
        return(
            <View style={styles.container}>
                <View>
                    <BackHeader
                        title={'详情'}
                        />
                </View>
                

                <View style={{backgroundColor:'#ddd',position:'absolute',top:76,bottom:0,left:0,right:0}}>
                    <ScrollView>
                        <View style={{...styles.paddingLeftRight,marginBottom:10,paddingBottom:10,backgroundColor:'#fff'}}>
                            <Text style={styles.applyTitleStyle}>
                                申请信息
                            </Text>
                            <List>
                                {
                                    data.map((item,index)=>{
                                        return(
                                            item.label && (item.label === '加入公司' || item.label === '企业名称' )? 
                                            <Item style={{paddingLeft:0}} wrap={true} extra={item.value} key={index}>{item.label}</Item>
                                            :
                                            <Item style={{paddingLeft:0}} extra={item.value} key={index}>{item.label}</Item>
                                        )
                                    })
                                }
                            </List>
                        </View>
                        <View style={{...styles.paddingLeftRight,marginBottom:10,backgroundColor:'#fff'}}>
                            <Text style={styles.applyTitleStyle}>
                                审批进度
                            </Text>
                            <View>
                                
                                    {
                                        approvalList && approvalList.length>0 ?
                                        <Steps size="large" current={approvalList.length-1}>
                                            {
                                                approvalList.map((item,index)=>{
                                                    return this.getStep(item,index)
                                                })
                                            }
                                        </Steps>
                                        :
                                        <Text></Text>
                                    }
                                    {/* <Steps>
                                           <Step title="Step 2" icon={customIcon()} />
                                            <Step title="Step 4" icon={customIcon()} />
                                    </Steps> */}
                             
                                
                            </View>
                        </View>
                    </ScrollView>

                    <View style={{...styles.paddingLeftRight,display:'flex',
                    flexDirection:'row',position:'absolute',bottom:0,zIndex:998,backgroundColor:'#fff',
                    paddingBottom:10,paddingTop:10}}>
                        <Button activeStyle={false} style={{borderWidth:0,marginRight:20,flex:1,backgroundColor:'#ECF5FA'}}
                            onClick={(e)=>{this.handleAgree(e)}}>
                            <Text style={{color:'#067DC6'}}>
                                同意
                            </Text>
                        </Button>
                        <Button activeStyle={false} style={{borderWidth:0,flex:1,backgroundColor:'#FDF5F4'}}
                            onClick={(e)=>{this.handleReject(e)}}>
                            <Text style={{color:'#F07060'}}>
                                拒绝
                            </Text>
                        </Button>
                    </View>
                </View>

                <InviteModal 
                        isAgreeModal={isAgreeModal} 
                        visible={this.state.visible}
                        title={this.state.title}
                        onClose={this.onClose}
                        navigation={this.props.navigation}
                        item={this.state.item}
                        jumpPage={'InviteDetail'}
                 />
                
          </View>
        )
    }

}


export default createForm()(InviteDetail); 