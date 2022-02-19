import request from './request'
import axios from 'axios'
let CancelToken=axios.CancelToken
export function getRecommendSong(cookie) {
  return request({
    url: '/recommend/songs',
    method: 'get',
    cancelToken:new CancelToken((cancel)=>{
      getRecommendSong.cancel=cancel
    }),
    params: {
      cookie: cookie
    }
  })
}
