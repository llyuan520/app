import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { get } from 'lodash'
// https://github.com/react-native-community/react-native-maps
const styles = StyleSheet.create({
    textTitle: {
        // textAlign:'left',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
        // marginLeft:20
    },
    titleDot: {
        fontSize: 15,
        color: 'red',
        paddingRight: 30

    },
})


class MyMap extends React.Component {

    state = {
        place: get(this, "props.initPlace.latitude") ? this.props.initPlace : {
            latitude: 39.9077610974,
            longitude: 116.3975715637,
        }
    }


    //给父组件的地图位置给一个初始值
    componentDidMount() {
        this.props.setData && this.props.setData({
            place: {
                latitude: 39.9077610974,
                longitude: 116.3975715637,
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (get(nextProps, "initPlace.latitude") !== get(this, "props.initPlace.latitude") && get(nextProps, "initPlace.longitude") !== get(this, "props.initPlace.longitude")) {
            this.setState({ place: nextProps.initPlace })
        }
    }

    render() {
        /**
         * @param edit 是否可以在地图上选择点
         * @param setData 父组件的setState方法回调，地图上的maker
         */
        const { place } = this.state;
        const { edit, setData } = this.props;
        return (
            <View style={{ width: "100%", height: 500, paddingBottom: 70 }}>
                {
                    edit && <Text style={styles.textTitle}>
                        <Text style={styles.titleDot}>{"* "}</Text>
                        项目位置
                </Text>
                }
                <MapView
                    style={{ width: "100%", height: "100%" }}
                    region={{
                        ...place, latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    zoomEnabled={edit}
                    scrollEnabled={edit}
                    onPress={(event) => {
                        if (edit) {
                            const place = event.nativeEvent.coordinate;
                            this.setState({ place });
                            setData && setData({ place })
                        }
                    }}
                >
                    <Marker
                        active
                        title='您的项目位置'
                        color='red'
                        // description='Hello world!'
                        coordinate={place}
                    />
                </MapView>
            </View>
        )
    }
}


export default MyMap