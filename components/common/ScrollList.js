import React from 'react';
import { ScrollView, Text } from 'react-native';

class ScorllList extends React.Component {

    state = {
        isRefresh: false,
        isDown: false,
        scrollFlag: false,
        page: 1
    }

    setFalse = () => {
        this.setState({
            isRefresh: false,
            scrollFlag: false,
        })
    }
    render() {
        /**
         * @param getData 列表请求的方法，将page传入。
         * @param isMore 当传了true的的时候就可以下滑加载更多。
         * @param isDown 只有传了isMore为true的时候才有用，父组件去控制数据是否加载完毕。
         * 组件只负责捕捉下拉刷新和下滑加载更多的动作，将用户的动作传递个父组件，可以理解为redux中的action。
         */
        const { getData, isMore, isDown = false, style } = this.props;
        return (
            <ScrollView
                style={{ ...style }}
                onScroll={(e) => {
                    if (!isMore) { return; }
                    if (this.state.scrollFlag === true) { return; }
                    let contentHei = e.nativeEvent.contentSize.height;
                    let layoutHei = e.nativeEvent.layoutMeasurement.height;
                    let hei = contentHei - layoutHei - 100;
                    if (hei > 0 && e.nativeEvent.contentOffset.y > hei && isDown === false) {
                        this.setState({
                            page: this.state.page + 1,
                            scrollFlag: true
                        }, () => {
                            getData(this.state.page, this.setFalse);
                            this.setFalse()
                        })
                    }

                }}
                onScrollEndDrag={(e) => {
                    if (this.state.isRefresh === true) { return }
                    if (e.nativeEvent.contentOffset.y <= -100) {
                        this.setState({
                            isRefresh: true,
                            page: 1,
                            srollFlag: true,
                        }, () => {
                            getData(this.state.page, this.setFalse)
                        })
                    }
                }}
                scrollEventThrottle={16}>
                {
                    this.state.isRefresh === true ?
                        <Text style={{ color: '#ccc', fontSize: 14, textAlign: 'center', paddingTop: 20 }}>
                            正在刷新中...
                            </Text>
                        : <Text style={{ height: 0 }}></Text>
                }
                {this.props.children}
                <Text style={{ color: '#ccc', fontSize: 14, textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                    {
                        isDown === true ? '没有更多数据了'
                            : this.state.scrollFlag === true ? '数据加载中...' : ''
                    }
                </Text>
            </ScrollView>
        )
    }
}

export default ScorllList 