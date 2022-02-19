import request from './request'
import axios from 'axios'
let CancelToken=axios.CancelToken
// 歌曲详情网络请求
export function getSongDeatilData(id) {
  return request({
    url: '/playlist/detail',
    cancelToken:new CancelToken((cancel)=>{
      getSongDeatilData.cancel=cancel
    }),
    params: {
      id
    }
  })
}