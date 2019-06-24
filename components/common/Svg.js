// Svg.js
import React, { Component } from 'react';
import svgs from '../../statics/svgs';

import { Svg } from 'expo';



export default class MySvg extends Component{
  render() {
    const {
        icon,
      color,
      size,
      style,
    } = this.props;
    let svgXmlData = svgs[icon];

    if (!svgXmlData) {
      let err_msg = `没有"${this.props.icon}"这个icon，请下载最新的icomoo并 npm run build-js`;
      throw new Error(err_msg);
    }
    console.log(svgXmlData)
    return (
      <Svg
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={color}
        style={style}
      />
    )
  }
}