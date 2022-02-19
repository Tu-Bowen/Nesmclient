import request from './request'
import axios from 'axios'
let CancelToken=axios.CancelToken
// 获取用户歌单
export const getUserSongList = (userId ) => {
  return request({
    url: '/user/playlist',
    cancelToken:new CancelToken((cancel)=>{
      getUserInfo.cancel=cancel
    }),
    params: {
      uid: userId,
      timestamp: new Date().getTime()
    }
  })
}

// 创建歌单
export const setCreateUserSongList = (name,cookie) => {
  return request({
    url: '/playlist/create',
    params: {
      name,
      cookie
    }
  })
}

// 获取用户信息
export const getUserInfo = (cookie) => {
  return request({
    url: '/user/subcount',
    params: {
      cookie
    }
  })
}

