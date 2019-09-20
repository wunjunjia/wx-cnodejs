import LRU from 'lru-cache'

const cache = new LRU({
  maxAge: 1000 * 60
})

export default cache
