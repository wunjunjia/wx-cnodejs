import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import moment from 'moment'
import cache from '../../cache'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { tabs } from '../../utils/variable'
import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      tab: 'all',
      page: 1,
      limit: 12,
      loading: false,
      data: []
    }
  }

  componentDidMount() {
    const { tab, page } = this.state
    this.getData(tab, page)
  }

  onReachBottom() {
    const { tab, page, loading } = this.state
    if (!loading) {
      this.getData(tab, page + 1, true)
    }
  }

  getData(tab, page, more = false) {
    const { tab: preTab, limit } = this.state
    const data = cache.get(tab) ? cache.get(tab) : []
    if (preTab !== tab) {
      this.setState((preState) => ({
        tab,
        data,
        page: 1
      }))
    }
    if (!more && cache.get(tab)) {
      return
    }
    if (more && !cache.get(tab)) {
      page = 1
    }
    this.setState((preState) => ({
      loading: true
    }))
    Taro.request({
      method: 'GET',
      url: `https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`
    })
      .then((res) => {
        const result = Array.isArray(res.data.data) ? [...data, ...res.data.data] : data
        cache.set(tab, result)
        this.setState((preState) => ({
          loading: false,
          data: result,
          page
        }))
      })
  }

  getTab(tab) {
    const result = tabs.find((item) => item.tab === tab)
    return result ? result.name : '未知'
  }

  toggleTab(tab) {
    this.getData(tab, 1)
  }

  handleClick(id) {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  travelData() {
    const { data } = this.state
    return data.map((item) => (
      <View className='item' key={item.id} onClick={this.handleClick.bind(this, item.id)}>
        <Image className='avatar' src={item.author.avatar_url}/>
        <Text className='tab'>{this.getTab(item.tab)}</Text>
        <View className='introduction'>
          <Text className='title'>{item.title}</Text>
          <View className='secondary'>
            <Text>{item.reply_count}/{item.visit_count}</Text>
            <Text>{moment(item.last_reply_at).fromNow()}</Text>
          </View>
        </View>
      </View>
    ))
  }

  render() {
    const { tab, loading, data } = this.state
    return (
      <View className='root'>
        <Header/>
        <View className='main'>
          <View className='nav'>
            {
              tabs.map((item) => (
                <Text
                  className={`item${tab === item.tab ? ' active' : ''}`}
                  key={item.tab}
                  onClick={this.toggleTab.bind(this, item.tab)}
                >
                  {item.name}
                </Text>
              ))
            }
          </View>
          <View className='content'>
            {this.travelData()}
            {loading ? <Loading/> : null}
          </View>
        </View>
      </View>
    )
  }
}

export default Index
