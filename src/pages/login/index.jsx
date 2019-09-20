import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import Alert from '../../components/Alert'
import Loading from '../../components/Loading'
import Avatar from '../../components/Avatar'
import { login } from '../../actions/user'

class Login extends Component {
  config = {
    navigationBarTitleText: '登录',
  }

  constructor() {
    super(...arguments)
    this.state = {
      loading: false,
      error: false,
      message: ''
    }
  }

  auth(e) {
    const accessToken = e.target.value.trim()
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
    const { error, message, loading } = this.state
    return (
      <View>
        <Avatar/>
        <View className='container'>
          <Input
            type='text'
            placeholder='请输入accessToken'
            placeholderStyle='color: #ccc'
            className='accessToken'
            onConfirm={this.auth}
          />
          { error ? <Alert message={message}/> : null }
          { loading ? <Loading/> : null }
        </View>
      </View>
    )
  }
}

export default connect(() => ({}), { login })(Login)
