import React from "react";
import { View, Button, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {}
});
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Other page"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="go back(不生效，不同路由)" onPress={this._goBack} />
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  
}
