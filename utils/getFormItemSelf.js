// Created by Lee on 2018/12/3
import React from 'react';
import { StyleSheet, View, Text,TextInput} from "react-native";
import {
    InputItem,
    TextareaItem,
    Toast,
} from "antd-mobile-rn";

const styles = {
    labelInputBoxStyle:{
        paddingLeft:3,
        // paddingBottom:5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom:40
    },
    inputStyle:{
        marginTop:10,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0,
        borderBottomWidth:0,
        paddingBottom:0,
        marginBottom:0,
        height:30
    },
    textareaStyle:{
        marginTop:10,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:0,
        marginRight:0,
        borderBottomWidth:0,
        paddingBottom:0,
        marginBottom:0,
        paddingHorizontal:0,
        height:"auto"
    },
    TitleStyles:{
        fontSize:15
    }
}



export default function getFormItemSelf (form, fieldsData = []) {
    const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    const {getFieldProps} = form;
    return fieldsData.map((item,index)=>{
        let CusComponent;
        const type = item.type;
        switch(type){
            case "input":
                CusComponent = InputItem;
                break;
            case "textarea":
                CusComponent = TextareaItem;
                break;
            default:
                CusComponent = InputItem
        }

        if(type === "textarea"){
            return( 
                <View style={item.boxStyle || styles.labelInputBoxStyle} key={index}>
                    {
                        item.label ?
                        <Text style={styles.TitleStyles}>
                            {item.label}
                        </Text> : <Text></Text>
                    }
                    <CusComponent
                        style={styles.textareaStyle}
                        {...getFieldProps(item.fieldName,{
                            rules: item.rules || []
                        })}
                        autoHeight
                        {...item['componentProps']}
                        placeholder={item.placeholder || `填写${item.label}`}
                        onChange={(e)=>{
                            if(reg.test(e) === true){
                                Toast.info('请勿输入表情',1);
                                return;
                            }
                            form.setFieldsValue({
                                [item.fieldName]:e.replace(reg,'')
                            })
                        }}
                    />
                </View>
            )
        }else{
            return(
                <View style={item.boxStyle || styles.labelInputBoxStyle} key={index}>
                    {
                        item.label ?
                        <Text style={styles.TitleStyles}>
                            {item.label}
                        </Text> : <Text></Text>
                    }
                    <CusComponent
                        style={styles.inputStyle}
                        {...getFieldProps(item.fieldName,{
                            rules: item.rules || []
                        })}
                        {...item['componentProps']}
                        placeholder={item.placeholder || `填写${item.label}`}
                        onChange={(e)=>{
                            if(reg.test(e) === true){
                                Toast.info('请勿输入表情',1);
                                return;
                            }
                            form.setFieldsValue({
                                [item.fieldName]:e.replace(reg,'')
                            })
                        }}
                    >
                    </CusComponent>
                </View>
            )
        }
        
    })
    
}
