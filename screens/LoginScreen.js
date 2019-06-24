import React from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { createForm } from "rc-form";
import {
  List,
  InputItem,
  Button,
  WingBlank,
  ActivityIndicator,
  Toast
} from "antd-mobile-rn";
import { request } from "../utils";
import { connect } from "react-redux";
import { bindActions } from "../ducks/user";
import { bindTokenActions } from "../ducks/token";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  submitButton: {
    backgroundColor: "#ff4e18",
    borderWidth: 0
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 40
  },
  forget: {
    color: "#ff4e18",
    textAlign: "right",
    marginTop: 30,
    marginBottom: 30
  }
});
const Item = List.Item;
class LoginScreen extends React.Component {
  state = {
    loading: false
  };

  toggleLoading = loading => {
    this.setState({
      loading
    });
  };
  onSubmit = () => {
    const { navigation, login, token } = this.props;
    login({
      name: "马化腾"
    });
    token({
      token:'12319023912',
    })
    navigation.navigate("Main");
    return false;
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        const values = this.props.form.getFieldsValue();
        this.toggleLoading(true);
        request("/index/service/login", {
          params: {
            ...values,
            mobile: values.mobile.replace(/\s+/g, "")
          }
        })
          .then(res => {
            // 账号密码通过
            if (res.status == 1) {
              return request(`/index/service/getUserInfo`, {
                params: {
                  user_id: res.data["user_id"]
                }
              });
            } else {
              return Promise.reject(res.msg);
            }
          })
          .then(res => {
            // 获取用户信息
            if (res.code == 0) {
              this.toggleLoading(false);
              Toast.success("登录成功", 1);
              dispatch({
                type: "login",
                payload: {
                  mobile: res.data.mobile,
                  userId: res.data["id"],
                  pid: res.data.pid,
                  avatar: res.data["head_pic"],
                  name: res.data["name"],
                  noname: res.data["noname"],
                  userType: res.data["user_sid_type"].id === 0 ? 1 : 2
                }
              });
              navigation.goBack();
            } else {
              return Promise.reject(res.msg);
            }
          })
          .catch(err => {
            Toast.fail(err, 1);
            this.toggleLoading(false);
          });
      } else {
        for (let key in error) {
          //不循环，只提示第一个
          Toast.fail(error[key].errors[0].message, 1);
          return false;
        }
      }
    });
  };
  onPressForget = () => {
    this.props.navigation.replace("ForgotPwd");
  };
  render() {
    const {
      form: { getFieldProps },
      user: { name }
    } = this.props;
    const { loading } = this.state;
    return (
      <ScrollView style={styles.container}>
        <WingBlank>
          <Text style={styles.title}>登录帐号</Text>
          <List>
            <InputItem
              {...getFieldProps("mobile", {
                rules: [
                  {
                    required: true,
                    message: "请输入手机号"
                  }
                ]
              })}
              clear
              placeholder="请输入手机号码"
              type="phone"
              maxLength={13}
              ref={el => (this.autoFocusInst = el)}
            >
              手机号
            </InputItem>
            <InputItem
              {...getFieldProps("password", {
                rules: [
                  {
                    required: true,
                    message: "请输入密码"
                  }
                ]
              })}
              placeholder="请输入密码"
              clear
              type="password"
            >
              密码
            </InputItem>
          </List>
          <TouchableOpacity onPress={this.onPressForget}>
            <Text style={styles.forget}>忘记密码？</Text>
          </TouchableOpacity>
          <Text>登录用户名为:{name}</Text>
          <Button
            style={styles.submitButton}
            activeStyle={styles.submitButton}
            onClick={this.onSubmit}
          >
            <Text style={{ color: "#fff" }}>登录</Text>
          </Button>
        </WingBlank>
        <ActivityIndicator toast text="Loading..." animating={loading} />
      </ScrollView>
    );
  }
}
const LoginScreenWithForm = createForm()(LoginScreen);
export default connect(
  ({ user,token }) => ({
    user,
    token
  }),
  dispatch => ({
    ...bindActions(dispatch),
    ...bindTokenActions(dispatch)
  })
)(LoginScreenWithForm);
