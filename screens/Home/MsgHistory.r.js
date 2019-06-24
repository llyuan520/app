import React from "react";
import { View,  StyleSheet, Text, Keyboard,ScrollView } from "react-native";
import {
  Toast,
  SearchBar,
  Button,
  Tabs,
  Badge 
} from 'antd-mobile-rn'
import { BackHeader } from '../../components'
import Order from './Order.r'
import {request} from '../../utils'
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
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
})

const tabs = [
    { title: '我已审批' },
    { title: '发起已审批' },
];

export default class MsgHistory extends React.Component {

    constructor(){
        super();
        this.state={
          isDown:false,
          scrollFlag:false,
          page:1,
          isRefresh:false,
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
          tabsKey:0,
        }
    }

    searchOrderList=(e)=>{
      console.log(e);
      if(reg.test(e) === true){
        Toast.info('请勿输入表情',1);
        return;
      }
      this.setState({
        page:1,
        isDown: false
      },()=>{
        this.getData(e);
      })
    }

    changeTabs= (index)=>{
      const {scrollFlag,isRefresh,tabsKey} = this.state;
      if(scrollFlag === true || isRefresh === true){
        return;
      }
      
      this.setState({
        tabsKey: index,
        page:1,
        isDown: false
      },()=>{
        this.getData()
      })
    }


    toggleLoading = (flag)=>{
      this.setState({
        loading:flag,
        scrollFlag:false,
        isRefresh:false,
      })
    } 

    getData=(text)=>{
      const {page,tabsKey} = this.state;
      if(tabsKey === 0){
        this.getDataByUrl('/runtimeTask/findMyDealData','orderData',text);
      }else{
        this.getDataByUrl('/runtimeTask/findMyLaunchData','sponsoredData',text);
      }
    }

    getDataByUrl = (url,stateData,text)=>{
      const page = this.state.page
      request(url,{
        params:{
          isDeal:'1',
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
        }
        this.toggleLoading(false)
      }).catch(err=>{
        this.toggleLoading(false);
      })
    }

    componentDidMount(){
      this.getData();
    }

    render(){
        const {orderData,sponsoredData,tabsKey} = this.state
        return(
            <View style={styles.container}>
               <View>
                    <BackHeader
                        title={'审批历史'}
                        />
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
                <View style={{flex:1}}>
                  <Tabs tabs={tabs}
                      animated={false}
                      swipeable={false}  
                      activeTab={tabsKey}
                      onChange={(tab,index) => { this.changeTabs(index); }}
                      //onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    <View style={{ backgroundColor: '#fff' }}>
                      <ScrollView 
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
                        <Order isBtn={false}  data={orderData}/>
                        <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:10,paddingBottom:10}}>
                          {
                            this.state.isDown === true ? '没有更多数据了'
                            : this.state.scrollFlag=== true ? '数据加载中...' : ''
                          }
                        </Text>
                      </ScrollView>
                    </View>
                    <View style={{backgroundColor: '#fff' }}>
                      <ScrollView 
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
                              this.getData();
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
                                        this.getData();
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
                        <Order isBtn={false}  data={sponsoredData}/>
                        <Text style={{color:'#ccc',fontSize:14,textAlign:'center',paddingTop:10,paddingBottom:10}}>
                          {
                            this.state.isDown === true ? '没有更多数据了'
                            : this.state.scrollFlag=== true ? '数据加载中...' : ''
                          }
                        </Text>
                      </ScrollView>
                    </View>
                  </Tabs>
                </View>
                
            </View>

        )

    }


}