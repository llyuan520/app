import React from 'react';
import { StyleSheet, WebView, Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window');
export default class AboutScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
        };
    };
  render() {
    return (
            <WebView
                source={{uri: this.props.navigation.getParam('url', '')}}
                style={{
                    width,
                    height: height - 60
                }}
            />

    );
  }
}