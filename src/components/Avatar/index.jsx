import Taro, { Component } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import avatar from '../../image/avatar.svg'
import './index.scss'

class Avatar extends Component {
  render() {
    const { avatar: target } = this.props
    return (
      <View className='container'>
        <Image className='avatar' src={target ? target : avatar}/>
      </View>
    )
  }
}

export default Avatar
