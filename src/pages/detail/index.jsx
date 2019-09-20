import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import moment from 'moment'
import Loading from '../../components/Loading'
import './index.scss'
import cache from '../../cache'

class Detail extends Component {

  config = {
    navigationBarTitleText: '话题详情',
    usingComponents: {
      "wemarked": "../../lib/wemarked/index"
    }
  }

  constructor() {
    super(...arguments)
    this.state = {
      loading: false,
      detail: {
        content: '',
        replies: []
      }
    }
  }

  componentDidMount() {
    const { id } = this.$router.params
    if (cache.get(id)) {
      this.setState((preState) => ({
        detail: cache.get(id)
      }))
      return
    }
    this.setState((preState) => ({
      loading: true
    }))
    Taro.request({
      method: 'GET',
      url: `https://cnodejs.org/api/v1/topic/${id}?mdrender=false`
    })
      .then((res) => {
        cache.set(id, res.data.data)
        this.setState((preState) => ({
          loading: false,
          detail: res.data.data
        }))
      })
  }

  render() {
    const { detail, loading } = this.state
    return (
      <View className='root'>
        <wemarked md={`${detail.content}`} highlight link/>
        { loading ? <Loading/> : (
          <View>
            <View className='header'>
              <Text>{ detail.replies.length } 回复</Text>
            </View>
            <View className='main'>
              {
                detail.replies.map((reply, index) => (
                  <View className='reply' key={reply.id}>
                    <View className='secondary'>
                      <Image className='avatar' src={reply.author.avatar_url}/>
                      <Text className='desc'>
                        {reply.author.loginname} {index + 1}楼•{moment(reply.create_at).fromNow()}
                      </Text>
                    </View>
                    <View>
                      <wemarked md={`${reply.content}`} highlight link/>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default Detail
