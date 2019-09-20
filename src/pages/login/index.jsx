import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import Alert from '../../components/Alert'
import Avatar from '../../components/Avatar'
import { login } from '../../actions/user'

class Login extends Component {
  config = {
    navigationBarTitleText: '登录',
  }

  constructor() {
    super(...arguments)
    this.state = {
      accessToken: '',
      loading: false,
      error: false,
      message: ''
    }
  }

  auth() {
    const { accessToken } = this.state
    if (accessToken) {
      this.setState((preState) => ({
        loading: true
      }))
      Taro.request({
        method: 'POST',
        url: 'http://193.112.56.84/api/login',
        data: {
          accessToken
        },
        header: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          const { code, message, user } = res.data
          if (code === 0) {
            const { login } = this.props
            login(user)
            Taro.navigateBack({
              delta: 1
            })
          } else {
            this.setState((preState) => ({
              loading: false,
              error: true,
              message
            }))
          }
        })
    } else {
      this.setState((preState) => ({
        error: true,
        message: '不能为空'
      }))
    }
  }

  render() {
    const { error, message, loading, accessToken } = this.state
    return (
      <View>
        <Avatar/>
        <View className='container'>
          <Input
            type='text'
            value={accessToken}
            placeholder='请输入accessToken'
            placeholderStyle='color: #ccc'
            className='accessToken'
            onConfirm={this.auth}
            onInput={(e) => {
              this.setState(() => ({
                accessToken: e.target.value.trim()
              }))
            }}
          />
          <Button type='primary' className='btn' disabled={loading} onClick={this.auth}>登录</Button>
          { error ? <Alert message={message}/> : null }
        </View>
      </View>
    )
  }
}

export default connect(() => ({}), { login })(Login)
