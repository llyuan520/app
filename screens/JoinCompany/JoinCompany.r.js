//created by Lee on 2018/12/3
import React from 'react';
import { StyleSheet, View, Text,Image,TextInput,ScrollView } from "react-native";
import {
    Button,
    InputItem,
    WingBlank,
    ActivityIndicator,
    Toast,
    List
} from "antd-mobile-rn";
import { createForm } from 'rc-form'
import { BackHeader } from '../../components'
import { connect } from "react-redux";
import { bindActions } from "../../ducks/user";
import {request,getFormItemSelf} from '../../utils'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    titleStyle:{
        fontSize: 26,
        fontWeight: "600",
        paddingBottom: 40
    },
    inputStyle:{
        marginTop:20,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0,
        fontSize:17
    },
    labelInputBoxStyle:{
        paddingLeft:3,
        paddingBottom:5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom:40
    }
  });

  var ranges = [
    '\ud83c[\udf00-\udfff]', 
    '\ud83d[\udc00-\ude4f]', 
    '\ud83d[\ude80-\udeff]'
    ];
class PerfecteTheInfo extends React.Component {

    state={
        loading:false,
    }

    submitInfo = ()=>{
        this.setState({
            loading:true
        },()=>{
            this.props.form.validateFields({ force: true }, (error,val) => {
                // for(let k in val){
                //     if(val[k]){
                //         val[k] = val[k].replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, '');
                //     }
                // }
                // console.log(val);
                const companyObj = this.props.navigation.state.params;
                if(!companyObj){
                    Toast.info('请选择企业');
                    this.setState({
                        loading:false
                    })
                    return;
                }
                if(!error){
                    let exp = /\n/g;
                    let remark = val.remark ?  val.remark.replace(exp,'') : '';
                    let companyId = companyObj.key;
                    let position = val.position;
                    let body = {
                        companyId,
                        position,
                        remark,
                        flag: true
                    }
                    console.log(body)
                    request('/company/addCompanyUserApply',{
                        method:'POST',
                        body: body,
                    }).then(res=>{
                        console.log('asdasd-------',res);
                        if(res){
                            if(res.data === true){
                                Toast.success('申请成功',1,()=>{
                                    this.props.navigation.navigate('Main');
                                })
                            }
                        }
                    })


                    this.setState({
                        loading:false
                    })
                }else{
                    for (let key in error) {
                        //不循环，只提示第一个
                        Toast.fail(error[key].errors[0].message, 1);
                        this.setState({
                            loading:false
                        })
                        return false;
                    }
                    
                }
            })
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.navigation.state.params){
            let item = nextProps.navigation.state.params;
            if(this.props.form.getFieldProps(['company']).value !== item.value){
                setTimeout(()=>{
                    this.props.form.setFieldsValue({
                        company: item.value
                    })
                },0)
            }
        }
    }

    render(){
        const { getFieldProps } = this.props.form;
        const { loading } = this.state;
        return(
            <View style={styles.container}>
                <WingBlank>
                    <BackHeader jump={true}/>
                    <ScrollView style={{height:'100%'}}>
                        <Text style={styles.titleStyle}>
                            加入企业
                        </Text>
                        <View style={styles.labelInputBoxStyle}>
                            <Text style={{fontSize:15}}>
                                企业名称
                            </Text>
                            <TextInput
                                {...getFieldProps('company')}
                                placeholder="填写企业名称"
                                editable={true}//是否可编辑
                                clearButtonMode="while-editing"
                                style={styles.inputStyle}//input框的基本样式
                                onChangeText={(e)=>{
                                    this.props.form.setFieldsValue({
                                        company:e
                                    })
                                }}//输入框改变触发的函数
                                onFocus={()=> {this.props.navigation.navigate('ListSearch',{backNavigation: 'JoinCompany'})}}
                            /> 
                        </View>
                        {
                            getFormItemSelf(this.props.form,[
                                {
                                    label:"职务",
                                    fieldName:'position',
                                    componentProps:{
                                        editable:true,
                                        clear:true
                                        /* onChange:(e)=>{
                                            this.props.form.setFieldsValue({
                                                test:e
                                            })
                                        } */
                                    },
                                },
                                {
                                    type:"textarea",
                                    label:"备注",
                                    fieldName:'remark',
                                    componentProps:{
                                        editable:true,
                                        clear:true,
                                        
                                        /* onChange:(e)=>{
                                            this.props.form.setFieldsValue({
                                                test:e
                                            })
                                        } */
                                    },
                                }
                            ])
                        }
                        <View>
                            <Button type="primary" style={{backgroundColor:'#067dc6'}} onClick={this.submitInfo}>提交申请</Button>
                        </View>
                    </ScrollView>
                </WingBlank>
                <ActivityIndicator toast animating={loading} />
            </View>
        )
    }

}


export default connect(
    ({ user }) => ({
      user,
    }),
    dispatch => ({
      ...bindActions(dispatch),
    })
  )(createForm()(PerfecteTheInfo))