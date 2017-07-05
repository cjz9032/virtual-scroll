import http from '@/src/utils/http'

var isMock = true
if (isMock) {
  require('./mocks')
}

/**
 * 获取用户数据
 */

export const userList = ({params = {type: 'guess'}, ...other}) => {
  return http('/userList', {
    params,
    ...other
  })
}
