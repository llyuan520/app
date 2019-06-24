import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrap();
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  // }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrap = () => {
    const {
      user: { mobile },
      navigation: { navigate }
    } = this.props;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigate(mobile ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(
  ({ user }) => ({
    user
  }),
  dispatch => ({
    dispatch
  })
)(AuthLoadingScreen);
