import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
const styles = StyleSheet.create({
  container: {}
});
class UserScreen extends React.Component {
  static navigationOptions = {
    title: "用户中心"
  };

  render() {
    const {
      user: { name }
    } = this.props;
    return (
      <View style={styles.container}>
        <Text>登录用户名为:{name}</Text>
      </View>
    );
  }
}
export default connect(({ user }) => ({
  user
}))(UserScreen);
