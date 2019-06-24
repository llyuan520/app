// Created by Luoshj on 2018/11/6

//type 框类型
//properties 属性
//required 是否必填
//backFun 回调方法
//label 字段名称
//name
import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { InputItem, ActionSheet, TextareaItem } from "antd-mobile-rn";
// import { Map } from '../components'
import {find,get} from 'lodash'

const styles = StyleSheet.create({
    textTitle: {
        // textAlign:'left',
        fontSize: 15,
        marginTop: 20,
        // marginLeft:20
    },
    titleDot: {
        fontSize: 15,
        color: 'red',
        paddingRight: 30

    },
    inputStyle: {
        marginTop: 15,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 30

    },
    defaultImg: {
        width: 20,
        height: 20,
    },
    TextareaItem: {
        marginTop: 15,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0
    }
});

export const InputTemplet = (form, dataList = [], setData) => {
    const { getFieldDecorator, setFieldsValue } = form;
    if (typeof dataList === "function") {
        /**
         * 当dataList为function的时候，必须要在最后返回fieldsData*/
        // fieldsData = fieldsData(getFieldValue, setFieldsValue)
    } else {
        return dataList.map((item, i) => {
            const type = item.type;
            const { rules } = item.fieldDecoratorOptions;
            const [required] = rules;
            let CusComponent;
            switch (type) {
                case "InputItem":
                    CusComponent = InputItem;
                    break;
                case "ActionSheet":
                    CusComponent = ActionSheet;
                    break;
                // TODO
                // case "Map":
                //     CusComponent = Map;
                //     break;
                default:
                    CusComponent = InputItem;
            }

            if (type === "InputItem") {
                return (
                    <View key={i}>
                        {

                            required.required && required.required === true ?
                                <Text style={styles.textTitle}>
                                    <Text style={styles.titleDot}>{"* "}</Text>
                                    {item.label}
                                </Text>
                                :
                                <Text style={styles.textTitle}>
                                    {item.label}
                                </Text>
                        }
                        <InputItem
                            style={styles.inputStyle}
                            {...getFieldDecorator(item.fieldName, {
                                ...item['fieldDecoratorOptions']
                            })}
                            onChange={(e) => {
                                setFieldsValue({//设置一组输入控件的值
                                    [item.fieldName]: e
                                })
                                // setData([item.fieldName], e);
                            }}
                            {...item['componentProps']}
                            placeholder={(item['componentProps'] && item['componentProps'].placeholder) || `请填写${item['label']}`}
                            clear={true}
                            maxLength={(item['componentProps'] && item['componentProps'].maxLength) || 20}// 最大长度
                        />
                    </View>
                )
            } else if (type === "ActionSheet") {
                return (
                    <View key={i}>
                        {
                            required.required && required.required === true ?
                                <Text style={styles.textTitle}>
                                    <Text style={styles.titleDot}>{"* "}</Text>
                                    {item.label}
                                </Text>
                                :
                                <Text style={styles.textTitle}>
                                    {item.label}
                                </Text>
                        }
                        <InputItem
                            style={styles.inputStyle}
                            editable={false}
                            defaultValue={get(item.buttoms.filter(x=>x.value===item.value)[0],"name")}
                            {...item['componentProps']}
                            placeholder={(item['componentProps'] && item['componentProps'].placeholder) || `选择${item['label']}`}
                            {...getFieldDecorator(item.fieldName, {
                                ...item['fieldDecoratorOptions'],
                            })}

                            extra={
                                <Image
                                    source={require('../statics/images/pulldown.png')}
                                    style={styles.defaultImg}
                                />
                            }
                            onExtraClick={() => {
                                ActionSheet.showActionSheetWithOptions(
                                    {
                                        // title: 'Title',// 顶部标题
                                        // message: 'Description',//顶部标题下的简要消息
                                        options: item.buttoms.map(item=>item.name),//按钮标题列表 
                                        // cancelButtonIndex: 4,//按钮列表中取消按钮的索引位置
                                        // destructiveButtonIndex: 3,//按钮列表中破坏性按钮（一般为删除）的索引位置
                                    },
                                    (buttonIndex) => {
                                        // console.log(buttonIndex,item.fieldName,item.buttoms[buttonIndex])
                                        setFieldsValue({ [item.fieldName]: item.buttoms[buttonIndex].value });
                                        setData([item.fieldName], item.buttoms[buttonIndex].value);
                                    },
                                );
                            }}
                        />
                    </View>
                )
            } else if (type === "Textarea") {
                return (
                    <View key={i}>
                        {
                            required.required && required.required === true ?
                                <Text style={styles.textTitle}>
                                    <Text style={styles.titleDot}>{"* "}</Text>
                                    {item.label}
                                </Text>
                                :
                                <Text style={styles.textTitle}>
                                    {item.label}
                                </Text>
                        }
                        <TextareaItem
                            style={styles.TextareaItem}
                            {...getFieldDecorator(item.fieldName, {
                                ...item['fieldDecoratorOptions']
                            })}
                            onChange={(e) => {
                                setFieldsValue({//设置一组输入控件的值
                                    [item.fieldName]: e
                                })
                                // setData([item.fieldName], e);
                            }}
                            {...item['componentProps']}
                            placeholder={(item['componentProps'] && item['componentProps'].placeholder) || `请填写${item['label']}`}
                            autoHeight
                        />
                    </View>
                )
            } else if (type === "Number") {
                return (
                    <View key={i}>
                        {
                            required.required && required.required === true ?
                                <Text style={styles.textTitle}>
                                    <Text style={styles.titleDot}>{"* "}</Text>
                                    {item.label}
                                </Text>
                                :
                                <Text style={styles.textTitle}>
                                    {item.label}
                                </Text>
                        }
                        <InputItem
                            type="number"
                            style={styles.inputStyle}
                            {...getFieldDecorator(item.fieldName, {
                                ...item['fieldDecoratorOptions']
                            })}
                            onChange={(e) => {
                                setFieldsValue({//设置一组输入控件的值
                                    [item.fieldName]: e
                                })
                                // setData([item.fieldName], e);
                            }}
                            {...item['componentProps']}
                            placeholder={(item['componentProps'] && item['componentProps'].placeholder) || `请填写${item['label']}`}
                            clear={true}
                            maxLength={(item['componentProps'] && item['componentProps'].maxLength) || 20}// 最大长度
                        />
                    </View>
                )
            }
            // else if (type === "Map") {
            //     return (
            //         <View key={i}>
            //             {
            //                 required.required && required.required === true ?
            //                     <Text style={styles.textTitle}>
            //                         <Text style={styles.titleDot}>{"* "}</Text>
            //                         {item.label}
            //                     </Text>
            //                     :
            //                     <Text style={styles.textTitle}>
            //                         {item.label}
            //                     </Text>
            //             }
            //             <InputItem
            //                 type="number"
            //                 style={styles.inputStyle}
            //                 {...getFieldDecorator(item.fieldName, {
            //                     ...item['fieldDecoratorOptions']
            //                 })}
            //                 onChange={(e) => {
            //                     setFieldsValue({//设置一组输入控件的值
            //                         [item.fieldName]: e
            //                     })
            //                     // setData([item.fieldName], e);
            //                 }}
            //                 {...item['componentProps']}
            //                 placeholder={(item['componentProps'] && item['componentProps'].placeholder) || `请填写${item['label']}`}
            //                 clear={true}
            //                 maxLength={(item['componentProps'] && item['componentProps'].maxLength) || 20}// 最大长度
            //             />
            //         </View>
            //     )
            // }
        })
    }
}

export default InputTemplet