import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

class Loading extends Component {
  render() {
    return (
      <View className='at-icon at-icon-loading-3 loading'/>
    )
  }
}

export default Loading
