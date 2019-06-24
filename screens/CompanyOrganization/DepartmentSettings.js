// Created by Lee on 2018/12/22
import React from 'react';
import { StyleSheet, View, Text,Image } from "react-native";
import {InputItem, WingBlank, Button, Toast, Switch, Modal} from "antd-mobile-rn";
import { Icon, BackHeader } from '../../components';
import {request} from "../../utils";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    titleStyle:{
        fontSize: 26,
        fontWeight: "600",
        paddingBottom:40
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      textTitle:{
        // textAlign:'left',
        fontSize:15,
        marginTop:20,
        height:30
        // marginLeft:20
    },
    titleDot:{
        fontSize:15,
        color:'red',
        paddingRight:30
        
    },
    inputStyle:{
        marginTop:15,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0,
        height:30
        
    },
    defaultImg:{
        width:20,
        height:20,
    },
    TextareaItem:{
        marginTop:15,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0
    },
    buttonBox:{
        backgroundColor:"#fff",
        paddingTop:30
    },
    button:{
        height:40,
        backgroundColor:'#067dc6',
        marginBottom:10,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
    }
  });
const alert = Modal.alert;
class Company extends React.Component{
    state={
        userId:[],
        names:'',
        department:{},
        name:'',
        flag:0,
        data:{},
        checked:false
    }
    //选择部门主管回调
    addUser = (userList) => {
        if(userList.length > 0){
            let names = '';
            let userId = [];
            userList.forEach((user) =>{
                userId.push(user.id);
                names += user.name+' ';
            })
            this.setState({
                userId,
                names
            })
        }
    }
    //选择上级部门回调
    AddDepartment = (department) => {
        this.setState({
            department
        })
    }
    //修改部门
    submitInfo = () => {
        const {name,department,userId} = this.state;
        let params = {};
        if(name === ''){
            Toast.info('请填写部门名称',2)
            return;
        }else{
            params.name = name;
        }
        if(userId.length>0){
            params.managerIds = userId;
        }
        if(department){
            params.parentId = department.id
        }
        params.id = this.props.navigation.state.params.id
        // alert(JSON.stringify(params));
        // return
        request('/company/updateDepartment',{
            method:'POST',
            body:params
        }).then(res=>{
            if(res.code === 1){
                Toast.success('修改成功',2);
                setTimeout(() => {
                    this.props.navigation.navigate('Main');
                    // this.props.navigation.goBack();
                  }, 2000);
                
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    //删除部门
    removeDepartment = () =>{
        const id = this.props.navigation.state.params.id
        request('/company/removeDepartment',{
            method:'POST',
            body:{
                id:id
            }
        }).then(res=>{
            if(res.code === 1){
                Toast.success('已删除',2)
                setTimeout(() => {
                    this.props.navigation.goBack();
                    this.props.navigation.navigate('Main');
                  }, 2000);
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    //部门详情
    getDepartmentDetail=() => {
        const id = this.props.navigation.state.params.id
        request('/company/getDepartmentDetail',{
            method:'GET',
            params:{
                "id":id
            }
        }).then(res=>{
            if(res.code === 1){
                let department = {};
                department.id = res.data.parentId ? res.data.parentId : ''
                department.name = res.data.parentName ? res.data.parentName : ''
                const checked = res.data.parentId ? true : false
                const name = res.data.name
                this.setState({
                    department,
                    checked,
                    name
                })
                if(res.data.managerList.length > 0){
                    let names = '';
                    let userId = [];
                    res.data.managerList.forEach((user) =>{
                        userId.push(user.id);
                        names += user.name+' ';
                    })
                    this.setState({
                        userId,
                        names
                    })
                }
                this.setState({
                    data:res.data
                })
            }else{
                Toast.info(res.msg,2)
            }
        })
    }
    
    componentDidMount() {
        this.getDepartmentDetail();
    }
      
    render(){
       const {names, department, checked, name} = this.state;
        return(
            <View style={styles.container}>
                <WingBlank>
                <BackHeader title={'部门设置'} backIcon={<Icon name="md-close" />} confirm={{ text: "确定", fun: this.submitInfo }} />
                    <View >
                        <View>   
                            <Text style={styles.textTitle}>
                                <Text style={styles.titleDot}>{"* "}</Text>
                                部门名称
                            </Text>
                            <InputItem
                                value={name}
                                style={styles.inputStyle}
                                type={InputItem}
                                onChange={(e)=>{
                                    this.setState({
                                        name:e
                                    })
                                }}
                                placeholder = '请填写部门名称'
                                clear={true} 
                                maxLength={ 20 }// 最大长度
                            />
                        </View>
                        
                        <View>   
                            <Text style={styles.textTitle}>
                            部门主管
                            </Text>
                            <InputItem
                                style={styles.inputStyle}
                                type={InputItem}
                                value={names}
                                editable = {false}
                                extra={
                                    <Image
                                        source={require('../../statics/images/pulldown.png')}
                                        style={styles.defaultImg}
                                    />
                                }
                                onExtraClick = {() =>{
                                        this.props.navigation.navigate("AddDepartmentUser",{confirmFun: this.addUser,Jump:'DepartmentSettings'});
                                    }
                                }
                                placeholder = '选择部门主管'
                                clear={true} 
                                maxLength={ 20 }// 最大长度
                            />
                        </View>
                        
                        <View style={{display:'flex',flexDirection: 'row',}}>   
                            <Text style={styles.textTitle}>
                                有无上级部门
                            </Text>
                            <Switch
                                style={{right:0,position:'absolute',top:10,}}
                                checked={checked}
                                color='#067DC6'
                                onChange={() => {
                                    if(this.state.checked){
                                        this.setState({
                                            department:{}
                                        });
                                    }
                                    this.setState({
                                        checked: !this.state.checked,
                                    });
                                }}
                            />
                        </View>
                        <View>   
                           
                            {
                                checked ?
                                <InputItem
                                style={styles.inputStyle}
                                type={InputItem}
                                value={department.name}
                                editable = {false}
                                extra={
                                    <Image
                                        source={require('../../statics/images/pulldown.png')}
                                        style={styles.defaultImg}
                                    />
                                }
                                onExtraClick = {() =>{
                                        this.props.navigation.navigate("SelDepartment",{
                                            confirmFun: this.AddDepartment,
                                            title:'添加上级部门',
                                            Jump:'DepartmentSettings'
                                        });
                                    }
                                }
                                placeholder = '选择上级部门'
                                clear={true} 
                                maxLength={ 20 }// 最大长度
                            />
                            :
                            <InputItem
                                style={styles.inputStyle}
                                type={InputItem}
                                value={department.name}
                                editable = {false}
                            />
                            
                            }
                        </View>
                    </View>
                </WingBlank>
                <View style={styles.buttonBox}>
                    <Button type="primary" style={styles.button} onClick={()=>{
                        alert('提示', '删除当前部门?', [
                            { text: '取消', onPress: () => console.log('cancel') , style: 'default' },
                            { text: '确认', onPress: this.removeDepartment },
                          ]);
                        }
                    }>删除部门</Button>
                </View>
            </View>
        )
    }
}
export default Company