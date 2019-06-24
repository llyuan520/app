//created by lee in 2018/12/18
import React from "react";
import { View,  StyleSheet, Text, Keyboard,ScrollView,TouchableHighlight } from "react-native";
import {
  Toast,
  SegmentedControl,
  SearchBar,
  Button,
  ActivityIndicator
} from 'antd-mobile-rn'
import { connect } from "react-redux";
import { bindActions } from "../../ducks/user";
import { request } from "../../utils"
import Icon from 'react-native-vector-icons';
import Order from './Order.r';
// import { Icon } from 'expo';
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    // paddingBottom:50
  },
  headerStyle:{
    marginTop:50,
    position:'relative',
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    paddingBottom:10,
  },
  bellsBox:{
    position:'relative',
    width:40,
    left:15
  },
  redPointStyle:{
    position:'absolute',
    right:6,
    top:-2
  },
  headerHistoryStyle:{
    position:'absolute',
    right:15,
    top:7,
    color:'#999',
    fontSize:15
  },
  buttonGroupStyle:{
    position:'absolute',
    // left:'50%',
    width: '60%',
    marginLeft:'18%'
  },
  searchBoxStyle:{
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
  },
  paddingLeftRight:{
    paddingLeft:15,
    paddingRight:15,
  },
  searchBoxRadius:{
    // borderRadius:10,
    overflow:'hidden',
  },
  contentBoxStyle:{
    backgroundColor:'#F2F2F2'
  },
  msgBoxStyle:{
    marginBottom:10,
    backgroundColor:'#fff'
  },
  orderBtnBoxStyles:{
    paddingTop:10,
    paddingBottom:10
  }
});

const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
class HomeScreen extends React.Component {

  state={
    loading:true,
    selectedKey:0,
    isNews:false,//是否有新消息 为了显示红点
    forMyapprovalCount: 0,//待我审批的数量
    ilaunchedCount:0,//我发起的 数量
    myParticipationCount:0,//我参与的 数量
    orderData:[
      // {
      // date:'2018/12/18',
      // toptitle:'变更指令待审批',
      // title:'变更编号 21213123',
      // status:'已下发',
      // supply:'预估金额: ￥123456.00',
      // contractOrStages:'无敌的我一期',
      // // buttonContent:'',
      // type:3
      // }
  ],
    sponsoredData:[],
    joinData:[],
    page:1,
    scrollFlag:false,//滚动加载中的flag
    isDown:false,//是否无更多数据了
    isRefresh:false,//下拉刷新的flag
  }

  selectSegment=(e)=>{
    this.setState({
      selectedKey:e.nativeEvent.selectedSegmentIndex,
      loading:true,
      page:1,
      isDown: false
    },()=>{
      this.scrollToTop();
      this.getData();
    })
  }

  searchOrderList=(e)=>{
    if(reg.test(e) === true){
      Toast.info('请勿输入表情',1);
      return;
    }
    this.setState({
      loading:true,
    },()=>{
      this.getData(e);
    })
  }

  componentDidMount(){
    this.getMsgCount(true);
  }

  getMsgCount = (flag)=>{
    request('/runtimeTask/findMessageQuantity').then(res=>{
      if(res){
        const {data} = res;
        this.setState({
          isNews:data.isNews,
          forMyapprovalCount: data.forMyapprovalCount,
          ilaunchedCount: data.ilaunchedCount,
          myParticipationCount: data.myParticipationCount,
        })
        if(flag === true){
          this.getDataAfterGetMsgCount(data);
        }
      }else{
        this.toggleLoading(false)
      }
    })
  }

  getDataAfterGetMsgCount= (data)=>{
    if(data.forMyapprovalCount !== 0 ||
      (data.forMyapprovalCount===0 && data.ilaunchedCount ===0 && data.myParticipationCount===0)){
     this.setState({
       selectedKey:0
     },()=>{
       this.getData()
     })
   }else{
     if(data.ilaunchedCount!==0){
       this.setState({
         selectedKey:1
       },()=>{
         this.getData();
       })
     }else if(data.myParticipationCount !== 0){
       this.setState({
         selectedKey:2
       },()=>{
         this.getData();
       })
     }
   }
  }

  scrollToTop=()=>{
    if(this.myScrollView && this.refs & this.refs.totop){
        this.refs.totop.measure((fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
            //然后用scrollTo跳转到对应位置
            //x是水平方向
            //y是垂直方向
            this.myScrollView.scrollTo({ x: 0, y: py});
        });
    }

}

toggleLoading = (flag)=>{
  this.setState({
    loading:flag,
    scrollFlag:false,
    isRefresh:false,
  })
} 

getDataByUrl = (url,stateData,text)=>{
  const page = this.state.page
  request(url,{
    params:{
      isDeal:'0',
      limit:10,
      page: page,
      text:text
    }
  }).then(res=>{
    if(res){
      let data  = [];
      if(page && page>1){
        data = this.state[stateData]
        data = data.concat(res.data);
      }else{
        data = res.data;
      }
      if((res.data.length===0||res.data.length!==10 )&& (data.length!==0)){
        this.setState({
          isDown:true
        })
      }else{
          this.setState({
              isDown:false
          })
      }
      this.setState({
        [stateData]:data,
      })
      this.getMsgCount(false);
    }
    this.toggleLoading(false)
  }).catch(err=>{
    this.toggleLoading(false);
  })
}

getData(text){
  const { selectedKey } = this.state;
  if(selectedKey === 0 ){
    this.getDataByUrl('/runtimeTask/findMyDealData','orderData',text)
  }else if(selectedKey === 1){
    this.getDataByUrl('/runtimeTask/findMyLaunchData','sponsoredData',text)
  }else{
    this.getDataByUrl('/runtimeTask/findMyParticipateData','joinData',text)
  }
}

componentWillReceiveProps(nextProps){
  if('navigation' in nextProps){
  }
}

  render() {
    const {selectedKey,orderData,isNews,forMyapprovalCount,ilaunchedCount,myParticipationCount,sponsoredData,joinData} = this.state;
    return (
      <View style={styles.container}>
          <View style={styles.headerStyle}>
            <TouchableHighlight underlayColor="transparent" onPress={()=>this.props.navigation.navigate('SystemMsg')}>
              <View style={styles.bellsBox}>
                <Icon.Feather  name="bell" size={28} color={'black'} />
                {
                  isNews===true?
                  <Icon.Entypo name="controller-record" size={12} color={'red'} style={styles.redPointStyle}/>:
                  <Text></Text>
                }
              
              </View>
            </TouchableHighlight>
            <Text 
              style={styles.headerHistoryStyle}
              onPress={()=>this.props.navigation.navigate('MsgHistory')}>
                历史
            </Text>
            <View style={styles.buttonGroupStyle}>
              <SegmentedControl selectedIndex={selectedKey} 
              values={[`待我审批${forMyapprovalCount!==0? '('+forMyapprovalCount+')' : ''}`,
               `我发起的${ilaunchedCount!==0? '('+ilaunchedCount+')' : ''}`,
                `我参与的${myParticipationCount!==0? '('+myParticipationCount+')' : ''}`]}
                 onChange={(e)=>this.selectSegment(e)}/>
            </View>
          </View>
          <View style={{...styles.searchBoxStyle,...styles.paddingLeftRight}}>
            <View style={styles.searchBoxRadius}>
              <SearchBar 
                  style={{backgroundColor:'#f2f2f2'}}
                  placeholder="搜索事项/内容" 
                  onChange={this.searchOrderList} 
                  showCancelButton={false}
                  onCancel={Keyboard.dismiss}/>
            </View>
          </View>
          {/* 内容区域 */}
          <View ref={view => this.totop = view}></View>
          <ScrollView 
            style={
              selectedKey===0 ? 
              (orderData.length>2?{height:'100%'}:{})
              :
              selectedKey === 1 ?
              (sponsoredData.length>2?{height:'100%'}:{})
              :
              (joinData.length>2?{height:'100%'}:{})
            }
            ref={(view)=>{this.myScrollView = view;}} 
            onScroll={(e)=>{
              if(this.state.scrollFlag===true){return;}
              let contentHei = e.nativeEvent.contentSize.height;
              let layoutHei = e.nativeEvent.layoutMeasurement.height;
              let hei = contentHei - layoutHei - 100;
              if(hei>0 && e.nativeEvent.contentOffset.y > hei && this.state.isDown===false){
                this.setState({
                  page:this.state.page+1,
                  scrollFlag:true
                },()=>{
                  this.getData(this.state.text);
                })
              }
            }}
            onScrollEndDrag={(e)=>{
                if( this.state.isRefresh === true ){return}
                if(e.nativeEvent.contentOffset.y <= -100){
                    this.setState({
                        isRefresh:true,
                        page:1,
                        srollFlag:true,
                    },()=>{
                        setTimeout(()=>{
                            this.getData(this.state.text);
                        },1000)
                    })
                }
            }}
            scrollEventThrottle={16}
            >
            {
              this.state.isRefresh === true ? 
              <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:20}}>
                  正在刷新中...
              </Text>
                  : <Text style={{height:0}}></Text>
              }
            {
               
                <Order isBtn={true}
                 isHome={true}
                  data={
                    selectedKey===0 ?
                    orderData : 
                    selectedKey === 1 ? 
                    sponsoredData : 
                    joinData
                    }
                   navigation={this.props.navigation} 
                  />

            }
            <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:10,paddingBottom:10}}>
              {
                this.state.isDown === true ? '没有更多数据了'
                : this.state.scrollFlag=== true ? '数据加载中...' : ''
              }
            </Text>
          </ScrollView>

          <ActivityIndicator
                toast
                text="数据加载中..."
                size="large"
                animating={this.state.loading}
              />
      </View>
    );
  }

  // _signOutAsync = () => {
  //   const {
  //     logout,
  //     navigation: { navigate }
  //   } = this.props;
  //   logout();
  //   navigate("Auth");
  // };
}
export default connect(
  ({ user }) => ({
    user
  }),
  dispatch => ({
    logout: bindActions(dispatch).logout,
  })
)(HomeScreen);
