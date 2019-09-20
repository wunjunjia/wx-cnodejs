import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import moment from 'moment'
import { View, Text } from '@tarojs/components'
import Avatar from '../../components/Avatar'
import Loading from '../../components/Loading'
import cache from '../../cache'

import './index.scss'

class Center extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor() {
    super(...arguments)
    this.state = {
      loading: false,
      data: {}
    }
  }

  componentDidMount() {
    const { user: { loginname } } = this.props
    if (cache.get(loginname)) {
      this.setState((preState) => ({
        data: cache.get(loginname)
      }))
      return
    }
    this.setState((preState) => ({
      loading: true
    }))
    Taro.request({
      method: 'GET',
      url: `https://cnodejs.org/api/v1/user/${loginname}`
    })
      .then((res) => {
        cache.set(loginname, res.data.data)
        this.setState((preState) => ({
          loading: false,
          data: res.data.data
        }))
      })
  }

  render() {
    const { loading, data: { recent_topics = [], recent_replies = [] } } = this.state
    const { user: { avatar_url } } = this.props
    return (
      <View>
        <Avatar avatar={avatar_url}/>
        {
          loading ? <Loading/> : (
            <View>
              <View className='header'>最近创建的话题</View>
              {
                recent_topics.map((topic) => (
                  <View key={topic.id} className='item'>
                    <Image className='avatar' src={topic.author.avatar_url}/>
                    <View className='desc'>
                      <Text className='title'>{topic.title}</Text>
                      <Text>{moment(topic.last_reply_at).fromNow()}</Text>
                    </View>
                  </View>
                ))
              }
              <View className='header'>最近回复的话题</View>
              {
                recent_replies.map((reply) => (
                  <View key={reply.id} className='item'>
                    <Image className='avatar' src={reply.author.avatar_url}/>
                    <View className='desc'>
                      <Text className='title'>{reply.title}</Text>
                      <Text>{moment(reply.last_reply_at).fromNow()}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          )
        }
      </View>
    )
  }
}

export default connect(({ user }) => ({
  user
}), null)(Center)
