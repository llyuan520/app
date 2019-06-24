# App

## 使用 expo

参阅官网

一些要注意的点

- 要注册 expo 账号
- ios 没有扫描二维码，只能通过局域网访问
- npm 装完 expo，在 start 之前需要先 expo login 登录

## 布局单位

web : `span、div、p`等等

rn: `View`

## 样式

与 web 不同：

```javascript
import { StyleSheet, View } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

<View style={styles.container} />;
```

样式没有层级关系，每个单独的节点需要单独设置样式，不会像 web 一样继承

没有 float，详细的样式说明阅读 rn 文档

## 文字

文字必须用`<Text></Text>`标签包裹

## 路由系统

参考[react-navigation](https://reactnavigation.org/docs/zh-Hans/2.x/getting-started.html) 2.x 文档

- 主要操作`this.props.navigation对象`
- 直接跳转`navigation.navigate(routeName)`
- 后退`navigation.goBack()`

> 重点，理解路由堆栈，每个 stack 是一组路由堆栈，navigate 可以跨堆栈跳转，push、goBack 只能操作当路由堆栈

## redux

> 集成了 redux、redux 持久化

redux 节点、操作的增加删除参考 ducks 文件夹下的 user.js

简单叙述下创建步骤：

1. 新建 reducer 文件，按照 文件名=节点名 的形式创建
2. 定义 namespace,防止 action 冲突
3. 定义初始 state
4. 定义基本的 action type 常量
5. 编写 reducer
6. 编写 actionCreators(可选)
7. 在`ducks/index.js`内引入该文件

**持久化**

```
// App.js
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["nav", "user"]
};
```

blacklist 数组填的是不需要被持久化的节点，建议开发过程中可以先去掉 nav，防止路由总是被重置

## 添加页面步骤

1. `screens`文件夹下添加 js 文件
2. export 出一个 react component
3. `navigation`文件夹下根据需要将 screen 配好对应的 routeName

# 建议

一些我觉得必须的组件

- 异步列表
- 搜索栏
- fixed bottom 的按钮

## 杂项

- 动画 - [lottie](https://github.com/react-community/lottie-react-native)
- 轮播 - [react-native-swiper](https://github.com/leecade/react-native-swiper)
- [react-native-debugger](https://github.com/jhen0409/react-native-debugger)
- form - rc-form
- UI 库 [react-native-elements](https://github.com/react-native-training/react-native-elements)
- UI 库 [ant-design-mobile](https://rn.mobile.ant.design/index-cn)
