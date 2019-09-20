import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

class Alert extends Component {
  render() {
    const { message } = this.props
    return (
      <View className='alert'>
        <AtIcon value='close-circle' size='18' color='#f5222d'/>
        <Text className='message'>{message}</Text>
      </View>
    )
  }
}

export default Alert
