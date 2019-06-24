import React from 'react';
import { Text, View, TouchableOpacity,Image,Button } from 'react-native';
import { Camera, Permissions } from 'expo';
import {request} from '../../utils'
export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isShowCamera: false,                    //是否开启照相机
    uri: '',
    base64:''
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture(){
    this.setState({
        isShowCamera: true
    })
  }
  
  setBase64InLocal = (photo)=>{
    console.log(photo);
    
  }

  checkoutTheInfo= (photo)=>{
    console.log('来这里了')
    console.log(photo)
    let obj = '{'+
      '"image":' + '"' + photo.base64 + '",' +      
      '"configure":"{\\\"side\\\":\\\"face\\\"}"'+
    '}';

    request('/face/findOrcInfo',{
      method:'POST',
      body:{
        body: photo.base64,
        configure:"{\"side\":\"face\"}"
      }
    }).then(res=>{
      if(res){
        console.log('---------------------aa');
        console.log(res);
      }
    })

    
    // let header = {
    //   'Authorization': 'APPCODE 96ff2cda46ee45ca89e6a82bf8eed1cf',
    //   'Content-Type': 'application/json; charset=UTF-8',
    // }
    
    // console.log({
    //     'method': 'POST',
    //     'cache': 'no-cache',
    //     'headers':  JSON.stringify(header),
    //     'body': obj
    // })
    // fetch('https://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',{
    //     'method': 'POST',
    //     'cache': 'no-cache',
    //     'headers': header,
    //     // 'body': JSON.stringify(obj)
    //     'body':   obj
    // }).then(res=>{
    //   console.log('-----------------sssss')
    //   console.log(res);
    // })
     
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
              {
                  !this.state.isShowCamera ?
                  <View>
                      <View>
                        {
                          this.state.uri && this.state.uri !== '' ? 
                          <Image source={{uri:this.state.uri}} style={{width: 200, height: 200}}></Image>
                          : <Text></Text>
                        }
                      </View>
                      <Button
                        onPress={this.takePicture.bind(this)}
                        title='拍照'
                    ></Button>
                  </View>:
                  <Camera 
                    style={{ flex: 1 }} 
                    type={this.state.type}
                    ref={(el)=>this.camera=el}      //参照官网的Methods
                  >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            }}
                            onPress={() => {
                            this.setState({
                                type: this.state.type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back,
                            });
                            }}>
                            <Text
                            style={{ paddingTop:10,paddingBottom:10,fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}Flip{' '}
                            </Text>
                        </TouchableOpacity>
                        {/* 复制一个开始拍照的点击按钮 */}
                        <TouchableOpacity
                            style={{
                            flex: 1,                    //flex为0.1改成flex为1
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            }}
                            //参照官网的Methods
                            onPress={async () => {
                              console.log('.......kkkkk')
                                if (this.camera) {
                                  this.camera.pausePreview();
                                    let photo = await this.camera.takePictureAsync({
                                      base64:true,
                                      quality:0.01,
                                      exif:true
                                    });
                                    console.log(photo)
                                    this.setState({
                                        isShowCamera: false,
                                        uri: photo.uri
                                    },()=>this.checkoutTheInfo(photo))
                                }
                            }}>
                            <Text
                            style={{ paddingTop:10,paddingBottom:10,fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}开始拍照{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
              }
            </View>
      );
    }
  }
}