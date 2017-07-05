import MockAdapter from 'axios-mock-adapter'
import http from '@/src/utils/http'
import range from 'lodash/range'

let mock = new MockAdapter(http, {delayResponse: 1000})

/**
 * 模拟大量用户数据
 */

mock.onGet(/\/userList.*/).reply(function (config) {
  let page = config.params.page
  if (page > 5) {
    return [200, {
      code: 200,
      data: []
    }]
  } else {
    let r = range((page - 1) * 50, page * 50).map(i => {
      return {id: i + 1, name: i + 1}
    })
    return [200, {
      code: 200,
      data: r
    }]
  }
})

module.exports = {}
