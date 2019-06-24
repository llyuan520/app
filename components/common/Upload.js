import React from 'react';
import { View, TouchableHighlight, Image, StyleSheet, Text } from 'react-native';
import { Icon } from '../antd'
import { ImagePicker, Permissions } from 'expo';
import { request } from '../../utils';
import { connect } from "react-redux";

const styles = StyleSheet.create({
    imgBox: {
        height: 200,
        width: 200,
        textAlign: "center",
        left: "50%",
        marginLeft: -100,
        top: "30%",
    },
    imgStyle: {
        width: "100%",
        height: 200,
        borderWidth: 0.5,
        borderColor: "#DDDDDD",
    },
    uploadText: {
        color: "#333",
        fontSize: 16,
        textAlign: "center"
    },
})

class MyUpload extends React.Component {

    state = {
        details: {}
    }

    uploadImg = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL)
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            base64: true
        });
        console.log(result)
        this.uploadFile(result)
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    base64toBlob(base64,type) {  
        // 将base64转为Unicode规则编码
        bstr = atob(base64, type),  
        n = bstr.length,  
        u8arr = new Uint8Array(n);  
        while (n--) {  
            u8arr[n] = bstr.charCodeAt(n) // 转换编码后才可以使用charCodeAt 找到Unicode编码
        }  
        return new Blob([u8arr], {  
            type,
        })
    } 

    dataURLtoFile(dataurl, filename) {//将base64转换为文件
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    

    uploadFile(file) {
        const { details } = this.state;
        let formData = new FormData();
        const  filename = file.uri.split("/")[file.uri.split("/").length-1];
        console.log(this.props.token.token)
        // const blob = this.base64toBlob(file.base64, "File");
        // console.log(blob)
        // let _file = new File([file.base64],file.uri.split("/")[file.uri.split("/").length-1]);
        // console.log(details)
        // formData.append("key", details.key+file.uri.split("/")[file.uri.split("/").length-1]);
        // formData.append("policy", details.policy);
        // formData.append("OSSAccessKeyId", details.ossaccessKeyId);
        // formData.append("success_action_status", 200);
        // formData.append("signature", details.signature);
        // formData.append("file", _file);
        // console.log(formData,file.uri.split("/")[file.uri.split("/").length-1]);
        request("/file/fileUpload", {
            body: {multipartStr:"data:image/png;base64,"+file.base64}, method: "POST", 
            // headers: {
            //     "Content-Type": "application/octet-stream",
            //     "Content-Disposition": `form-data; name="file";filename="${file.uri.split("/")[file.uri.split("/").length-1]}";\r\n\r\n{value}\r\n--{boundary}`,
            //     "callbackUrl": "http://dev-cpc.servingcloud.com:8194/oss/callBack",
            //     "callbackHost":"oss-cn-shenzhen.aliyuncs.com",
            //     "callbackBody": "bucket=${bucket}&object=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&imageInfo.height=${imageInfo.height}&imageInfo.width=${imageInfo.width}&imageInfo.format=${imageInfo.format}&my_var=${x:my_var}",
            //     "callbackBodyType":"application/json"
            // }
        })
            .then(res => {
                if(res.code===1){
                    this.props.setUrl(res.data)
                }
            })
    }

    componentDidMount() {
        //使用的sts,向后台服务器请求获取token.
        request("/file/getStsDoGet", { method: "POST" })
            .then(res => this.setState({
                details: res.data
            }))
    }
    render() {
        const { image } = this.state;
        return (
            <TouchableHighlight>
                {
                    image
                        ? <Image source={{ uri: image }} style={styles.imgStyle} onPress={this.uploadImg} />
                        :
                        <View style={styles.imgStyle} onPress={this.uploadImg}>

                            <View style={styles.imgBox}>
                                <Icon name="md-add-circle-outline" blue size={50} style={{ textAlign: "center" }} />
                                <Text style={styles.uploadText} onPress={this.uploadImg}><Text style={{ color: "red" }}>*</Text>上传项目形象图</Text>
                            </View>
                        </View>

                }
            </TouchableHighlight>
        )
    }
}


export default connect(
    ({ user,token }) => ({
      user,
      token
    }))(MyUpload)