import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  BackHandler
} from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import AppNavigator from "./navigation/AppNavigator";
import { createStore, applyMiddleware } from "redux";
import {request} from './utils'
import appReducer from "./ducks";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { Provider, connect } from "react-redux";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"]
  // blacklist: ["nav", "user"]
};
const persistedReducer = persistReducer(persistConfig, appReducer);
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);
const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = state => ({
  state: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(persistedReducer, applyMiddleware(middleware));
const persistor = persistStore(store);

const onBeforeLift = () => {
  // take some action before the gate lifts
  request.dispatch = store.dispatch;
  request.getState = store.getState;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default class Root extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
          <Provider store={store}>
            <PersistGate loading={null} onBeforeLift={onBeforeLift} persistor={persistor}>
              <AppWithNavigationState />
            </PersistGate>
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require("./assets/images/robot-dev.png"),
        // require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
