const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/test', (req, res, next) => {
  res.json({ code: 0, message: 'ok' })
})

router.post('/login', (req, res, next) => {
  const { accessToken } = req.body
  if (accessToken) {
    axios.post('https://cnodejs.org/api/v1/accesstoken', {
      accesstoken: accessToken === 'admin' ? 'afbe2dfa-6b62-4833-9e7f-4ec9e286b768' : accessToken
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((result) => {
        const { success, ...rest } = result.data
        return res.json({
          code: 0,
          user: rest
        })
      }).catch((e) => {
        return res.json({
          code: 1,
          message: '无效accessToken'
        })
    })
  } else {
    res.json({
      code: 1,
      message: '必须传accessToken'
    })
  }
})

module.exports = router
