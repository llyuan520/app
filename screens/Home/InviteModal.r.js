//created by lee in 2018/12/25
import React from 'react';
import {View,Text,Image,ScrollView} from 'react-native';
import {
    Modal,
    Button,
    Toast
} from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons';
import {getFormItemSelf,request} from '../../utils'
import { createForm } from 'rc-form'
import { connect } from "react-redux";
class InviteModal extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            visible: props.visible,
            title: props.title,
            sendData:[],
            item:props.item,
        }
    }

    componentWillReceiveProps(nextProps){
        if('visible' in nextProps){
            this.setState({
                visible: nextProps.visible,
                item:nextProps.item,
                title: nextProps.title,
                navigation: nextProps.navigation
            })
        }
    }

    chooseDepartment = (e)=>{
        setTimeout(()=>{
            let params = this.props.navigation.state.params;
            this.setState({
                departmentId:e.id,
                visible:true,
            },()=>{
                let obj = {}
                if(params){
                    obj = {...params.formValue}
                }
                obj.department = e.name
                this.props.form.setFieldsValue(obj)
            })
        },200)
    }

    onClose = ()=>{
        this.setState({
            sendData:[]
        })
        this.props.onClose(false);
    }

    handleModalEvent = (state)=>{
        const {item,departmentId} = this.state;
        let { url,businessId } = item;

        let formValue = this.props.form.getFieldsValue();
        console.log({
            bizId: businessId,
            state:state,
            remark: formValue.remark || '',
            departmentId: departmentId,
            position: formValue.position || undefined
        })

        request(url,{
            method:'POST',
            body:{
                bizId: businessId,
                state:state,
                remark: formValue.remark || '',
                departmentId: departmentId,
                position: formValue.position
            }
        }).then(res=>{
            if(res){
                if(res.data === true){
                    Toast.success('操作成功',2,()=>{
                        this.onClose();
                        return;
                    })
                }
            }
            this.onClose()
        })
    }

    addSendUser=(sendData,formValue)=>{
        this.setState({
            sendData,
            visible:true
        },()=>{
            this.props.form.setFieldsValue({
                ...formValue
            })
        })

    }

    render(){
        const { isAgreeModal,form } = this.props;
        const {sendData} = this.state
        return (
            <Modal
                visible={this.state.visible}
                transparent
                maskClosable={true}
                onClose={this.onClose}
                title={this.state.title}
                popup={true}
                footer={[
                    { text: '取消', onPress: () => { this.onClose()} },
                    { text: '确定', onPress: () => { isAgreeModal===true ? this.handleModalEvent('4') : this.handleModalEvent('3')}},
                ]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                <View style={isAgreeModal?{height:330}:{height:210}}>
                    {
                        isAgreeModal ? 
                        //同意的模态窗，有部门 职务
                        <View>
                            {
                                getFormItemSelf(form,[
                                    {
                                        type:"textarea",
                                        fieldName:'remark',
                                        placeholder:'输入审批意见',
                                        componentProps:{
                                            editable:true,
                                            style:{
                                                backgroundColor:'#ddd',
                                                height: 100
                                            }
                                        },
                                        boxStyle:{
                                            borderWidth:0,
                                        }
                                    },{
                                        type:"input",
                                        fieldName:'department',
                                        placeholder:'选择部门',
                                        componentProps:{
                                            editable:false,
                                            extra: <Image
                                                source={require('../../statics/images/pulldown.png')}
                                                style={{ width:20,height:20,}}
                                            />,
                                            onExtraClick: () =>{
                                                this.setState({
                                                    visible:false,
                                                },()=>{
                                                    let params = this.props.navigation.state.params;
                                                    let id = params ? params.id : undefined;
                                                    let item =params ?  params.item : undefined;
                                                    if(!id && !item){
                                                        item=this.state.item;
                                                        id=item.id;
                                                    }
                                                    const formValue = this.props.form.getFieldsValue();
                                                    setTimeout(()=> {
                                                        this.props.navigation.navigate("SelDepartment",{
                                                            id:id,
                                                            item:item,
                                                            formValue:formValue,
                                                            confirmFun: this.chooseDepartment,
                                                            title:'选择部门',
                                                            Jump: this.props.jumpPage,
                                                        });
                                                    },400);
                                                    
                                                })
                                                
                                            },
                                            clear:true,
                                        },
                                        boxStyle:{
                                            paddingLeft:3,
                                            borderBottomColor: "#ccc",
                                            borderBottomWidth: 1,
                                        }
                                    },{
                                        type:"input",
                                        fieldName:'position',
                                        placeholder:'填写职务',
                                        componentProps:{
                                            editable:true,
                                            clear:true,
                                        },
                                        boxStyle:{
                                            paddingLeft:3,
                                            borderBottomWidth:1,
                                            borderBottomColor:'#ccc',
                                            marginBottom:15,
                                        }
                                    }
                                ])
                            }
                            <View>
                                <Text style={{fontSize:12,color:'#666'}}>
                                    抄送
                                </Text>
                                <View style={{marginTop:15,display:'flex',flexDirection:'row'}}>
                                    {
                                        sendData && sendData.length >= 3 ?
                                        <ScrollView
                                        horizontal={true} // 横向
                                        >
                                        {
                                            sendData && sendData.map((item,index)=>{
                                                return (
                                                    <View style={{width:56,height:56,borderRadius:28,overflow:'hidden',marginRight:5,}} key={index}>
                                                    <Image
                                                        /* source={{uri:'http://a.hiphotos.baidu.com/image/h%3D300/sign=194caab2b50e7bec3cda05e11f2fb9fa/960a304e251f95caf1852c0bc4177f3e6709521e.jpg'}} */
                                                        source={item.avatar ? {uri: item.avatar} : require('../../statics/images/name.png')}
                                                        style={{width: 56, height: 56}}
                                                    />   
                                                    </View>
                                                )
                                            })
                                        }
                                        </ScrollView>
                                        :
                                        <View style={{display:'flex',flexDirection:'row'}}>
                                            {
                                                sendData && sendData.map((item,index)=>{
                                                return (
                                                    <View style={{width:56,height:56,borderRadius:28,overflow:'hidden',marginRight:5,}} key={index}>
                                                    <Image
                                                        /* source={{uri:'http://a.hiphotos.baidu.com/image/h%3D300/sign=194caab2b50e7bec3cda05e11f2fb9fa/960a304e251f95caf1852c0bc4177f3e6709521e.jpg'}} */
                                                        source={item.avatar ? {uri: item.avatar} : require('../../statics/images/name.png')}
                                                        style={{width: 56, height: 56}}
                                                    />   
                                                    </View>
                                                )
                                            })
                                            }
                                        </View>
                                    }
                                    
                                    <Button 
                                        activeStyle={false}
                                        style={{width:60,height:60,borderWidth:0,paddingLeft:0,paddingRight:0}} 
                                        onClick={() =>{
                                            this.setState({
                                                visible:false
                                            },()=>{
                                                let params = this.props.navigation.state.params;
                                                let id = params ? params.id : undefined;
                                                let item =params ?  params.item : undefined;
                                                if(!id && !item){
                                                    item=this.state.item;
                                                    id=item.id;
                                                }
                                                const formValue = this.props.form.getFieldsValue();
                                                this.props.navigation.navigate("CompanyOrganizationUser",{
                                                    formValue:formValue,
                                                    confirmFun: this.addSendUser,
                                                    url:'/company/findCompanyUser',
                                                    //data:{companyId:this.props.user.company_id},
                                                    data:{companyId:'1'},
                                                    title:'抄送人员',
                                                    goBack:this.props.jumpPage
                                                });
                                            })
                                            
                                        }}
                                    >
                                        <Icon.AntDesign  name="pluscircleo" size={60} color={'#067dc6'}/>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        :
                        //拒绝的没有 只有意见跟抄送
                        <View>
                            {
                                getFormItemSelf(this.props.form,[
                                    {
                                        type:"textarea",
                                        fieldName:'remark',
                                        placeholder:'输入审批意见',
                                        componentProps:{
                                            editable:true,
                                            style:{
                                                backgroundColor:'#ddd',
                                                height: 100
                                            }
                                        },
                                        boxStyle:{
                                            borderWidth:0,
                                            marginBottom:15,
                                        }
                                    }
                                ])
                            }
                            <View>
                                <Text style={{fontSize:12,color:'#666'}}>
                                    抄送
                                </Text>
                                <View style={{marginTop:15,display:'flex',flexDirection:'row'}}>
                                    {
                                        sendData && sendData.length >= 3 ?
                                        <ScrollView
                                        horizontal={true} // 横向
                                        >
                                        {
                                            sendData && sendData.map((item,index)=>{
                                                return (
                                                    <View style={{width:56,height:56,borderRadius:28,overflow:'hidden',marginRight:5,}} key={index}>
                                                    <Image
                                                        /* source={{uri:'http://a.hiphotos.baidu.com/image/h%3D300/sign=194caab2b50e7bec3cda05e11f2fb9fa/960a304e251f95caf1852c0bc4177f3e6709521e.jpg'}} */
                                                        source={item.avatar ? {uri: item.avatar} : require('../../statics/images/name.png')}
                                                        style={{width: 56, height: 56}}
                                                    />   
                                                    </View>
                                                )
                                            })
                                        }
                                        </ScrollView>
                                        :
                                        <View style={{display:'flex',flexDirection:'row'}}>
                                            {
                                                sendData && sendData.map((item,index)=>{
                                                return (
                                                    <View style={{width:56,height:56,borderRadius:28,overflow:'hidden',marginRight:5,}} key={index}>
                                                    <Image
                                                        /* source={{uri:'http://a.hiphotos.baidu.com/image/h%3D300/sign=194caab2b50e7bec3cda05e11f2fb9fa/960a304e251f95caf1852c0bc4177f3e6709521e.jpg'}} */
                                                        source={item.avatar ? {uri: item.avatar} : require('../../statics/images/name.png')}
                                                        style={{width: 56, height: 56}}
                                                    />   
                                                    </View>
                                                )
                                            })
                                            }
                                        </View>
                                    }
                                    
                                    <Button 
                                        activeStyle={false}
                                        style={{width:60,height:60,borderWidth:0,paddingLeft:0,paddingRight:0}} 
                                        onClick={() =>{
                                            this.setState({
                                                visible:false
                                            },()=>{
                                                let params = this.props.navigation.state.params;
                                                let id = params ? params.id : undefined;
                                                let item =params ?  params.item : undefined;
                                                if(!id && !item){
                                                    item=this.state.item;
                                                    id=item.id;
                                                }
                                                const formValue = this.props.form.getFieldsValue();
                                                this.props.navigation.navigate("CompanyOrganizationUser",{
                                                    formValue:formValue,
                                                    confirmFun: this.addSendUser,
                                                    url:'/company/findCompanyUser',
                                                    data:{companyId:this.props.user.company_id},
                                                    title:'抄送人员',
                                                    goBack:this.props.jumpPage
                                                });
                                            })
                                            
                                        }}
                                    >
                                        <Icon.AntDesign  name="pluscircleo" size={60} color={'#067dc6'}/>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </Modal>
        )
    }
}

export default createForm()(connect(
    ({ user }) => ({
      user,
    })
  )(InviteModal));