import Taro, { Component } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'

import './index.scss'
import { connect } from '@tarojs/redux'
import { logout } from '../../actions/user'

class Header extends Component {
  login() {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  center() {
    Taro.navigateTo({
      url: '/pages/center/index'
    })
  }

  render() {
    // afbe2dfa-6b62-4833-9e7f-4ec9e286b768
    const { user, logout } = this.props
    return (
      <View className='header'>
        <Image className='logo' src='https://static2.cnodejs.org/public/images/cnodejs_light.svg'/>
        {
          user.login ? (
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Image
                className='avatar'
                src='https://avatars0.githubusercontent.com/u/47880265?v=4&s=120'
                onClick={this.center}
              />
              <Button type='primary' className='btn' onClick={logout}>退出</Button>
            </View>
          ) : (
            <Button type='primary' className='btn' onClick={this.login}>登录</Button>
          )
        }
      </View>
    )
  }
}

export default connect(({ user }) => ({
  user
}), { logout })(Header)
