import React from 'react';
import { Icon } from 'expo';
import { Image } from 'react-native';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      // <Icon.Ionicons
      //   name={this.props.name}
      //   size={26}
      //   style={{ marginBottom: -3 }}
      //   color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      // />
      <Image source={this.props.image} style={{width:25, height: 25, resizeMode: 'stretch'}} />
    );
  }
}