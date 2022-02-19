import request from './request'
import axios from 'axios'
let CancelToken=axios.CancelToken
export function getToplistInfo() {
  return request({
    url: '/toplist',
    cancelToken:new CancelToken((cancel)=>{
      getToplistInfo.cancel=cancel
    }),
  })
}

export function getToplistDetail(id) {
  return request({
    url: '/playlist/detail',
    cancelToken:new CancelToken((cancel)=>{
      getToplistDetail.cancel=cancel
    }),
    params: {
      id
    }
  })
}