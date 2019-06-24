// Created by Lee on 2018/12/10
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { List, SearchBar,Checkbox,Toast} from "antd-mobile-rn";
import { BackHeader,BottomButton} from '../../../components';
import { request } from "../../../utils";
import { remove } from 'lodash';
const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "#FFF",
        height:'100%'
    },
    motherCompamy:{
        paddingBottom:10,
        marginBottom:10,
        backgroundColor:'#F2F2F2'
    },
    Logo:{
        height:48,
        width:48,
        borderRadius:8,
        backgroundColor:'#D8D8D8',
        marginRight:10
    },
    title:{
        height:40
    },
    SearchBar:{
        height:30
    },
    listStyle:{
        height:80,
        backgroundColor:'#FFF',
        paddingTop:16,
        paddingBottom:16
        // paddingBottom:16
    },
    companyNameStyle:{
        fontSize:14,
        color:'#2B2B2B',
        fontFamily:'PingFangSC-Regular',
        paddingTop:16,
        // paddingBottom:14,
    },
    companyInstrStyle:{
        // paddingTop:14,
        fontSize:12,
        color:'#666',
        fontFamily:'PingFangSC-Regular',
        paddingBottom:14
    },
    check:{
        // padding:15
    }
});


class Company extends React.Component {
    state = {
        addCompanyList:[],
        checkedList:[],
        addparentId:'',
        checkArr:[]
    }
    componentWillMount() {
        this.getAddCompanyList()
    }

    getAddCompanyList = () => {
        let url = '/company/findCompanyWithName';
        request(url, {
            method: 'GET',
        }).then(res => {
            if (res) {
                let checkData = []
                for (let i = 0; i < res.data.list.length; i++) {
                    checkData.push(0)
                };        
                this.setState({
                    addCompanyList: res.data.list,
                    checkArr: checkData
                })
            }
        })
    }

    changeCheck(e, item) {
        let { checkedList } = this.state;
        if (e.target.checked) {
            checkedList.push(item.id)
        } else {
            checkedList.forEach((value,i)=>{
                if(value === item.id){
                    checkedList.splice(i,1) 
                }
            })
        }
       
        this.setState(
            {
                checkedList
            }
        )
    }

    changeCheckMother = (e, i,item)=>{
        let { addparentId,checkArr } = this.state;
        for (let j = 0; j < checkArr.length; j++) {
            if (j === i) {
                checkArr[j] = e.target.checked ? 1 : 0;
                addparentId = item.id
            } else {
                checkArr[j] = 0;
                addparentId = ''
            }
        }
        this.setState({
                addparentId:addparentId,
                checkArr:checkArr
            })
    }

    addCompany=()=>{
        const {checkedList,addparentId} = this.state;
        const {setSonCompany,companyId} = this.props.navigation.state.params;
        const addOptions = {};
        if(setSonCompany==='Y'){
            addOptions.childIds = checkedList;
            addOptions.flag=true;
            addOptions.parentId = companyId;
        }else{
            addOptions.childIds = [companyId];
            addOptions.flag=true;
            addOptions.parentId = addparentId;
        }
        let url = '/company/addRelationApply';
        request(url, {
            method: 'POST',
            body:addOptions
        }).then(res => {
            if (res) {
                Toast.success(res.msg, 1);
                if(setSonCompany==='Y'){
                    this.props.navigation.navigate("SetSonCompany");
                    this.props.navigation.state.params.confirmFun();
                }else{
                    this.props.navigation.navigate("CompanyShip");
                    this.props.navigation.state.params.confirmFun();
                }
            }
        })
    }

    onChange= (value) => {
        this.setState({ value });
      };
      clear = () => {
        this.setState({ value: '' });
      };

    render() {
        const {setSonCompany} = this.props.navigation.state.params;
        const {addCompanyList,checkArr} = this.state;
        return (
            <View style={styles.body}>
                <View style={styles.title}></View>
                {/* <View style={styles.SearchBar}> */}
                    <SearchBar
                        value={this.state.value}
                        placeholder="企业名称"
                        onSubmit={value => console.log(value, 'onSubmit')}
                        onClear={value => console.log(value, 'onClear')}
                        onFocus={() => console.log('onFocus')}
                        onBlur={() => console.log('onBlur')}
                        onCancel={() => console.log('onCancel')}
                        showCancelButton
                        onChange={this.onChange}
                    />
                {/* </View> */}
                <ScrollView >
                    { setSonCompany==='Y' ?
                        <View style={styles.motherCompamy}>
                        {
                           addCompanyList && addCompanyList.map((item,i)=>{
                                return (
                                    <List   key={i}>
                                        <Item
                                            style={styles.listStyle}
                                            key={i}
                                            thumb={<Image style={styles.Logo}
                                            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}/>}
                                            extra={<Checkbox style={styles.check} onChange={(e) => this.changeCheck(e, item)} />}
                                            >
                                            <Text style={styles.companyNameStyle}>{item.name}</Text>
                                            <Brief style={styles.companyInstrStyle}>{item.synopsis}</Brief>
                                        </Item>
                                    </List >
                                )
                            }) 
                        }   
                    </View>
                    :
                    <View style={styles.motherCompamy}>
                            {
                               addCompanyList && addCompanyList.map((item,i)=>{
                                    return (
                                        <List  key={i}>
                                            <Item
                                                style={styles.listStyle}
                                                key={i}
                                                thumb={<Image style={styles.Logo}
                                                source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}/>}
                                                extra={<Checkbox   style={styles.check} onChange={(e) => this.changeCheckMother(e,i,item)}  checked={checkArr[i]}/>}
                                                >
                                                 <Text style={styles.companyNameStyle}>{item.name}</Text>
                                                 <Brief style={styles.companyInstrStyle}>1212313131</Brief>
                                            </Item>
                                        </List> 
                                    )
                                }) 
                            }   
                    </View>

                    }
                    
                </ScrollView>
                <BottomButton  onClick={() => { this.addCompany();}}>添加</BottomButton>
            </View>
        )
    }
}




export default Company