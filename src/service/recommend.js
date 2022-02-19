import request from './request'
import axios from 'axios'
let CancelToken = axios.CancelToken
export function getTopBanners() {
  return request({
    url: "/banner",
    cancelToken: new CancelToken((cancel) => {
      getTopBanners.cancel = cancel
    })
  })
}

// 热门推荐
export function getHotRecommends(limit) {
  return request({
    url: "/personalized",
    cancelToken: new CancelToken((cancel) => {
      getHotRecommends.cancel = cancel
    }),
    params: {
      limit
    }
  })
}

// 首页下的新碟上架
export function getNewAlbums() {
  return request({
    url: '/album/newest',
    cancelToken: new CancelToken((cancel) => {
      getNewAlbums.cancel = cancel
    }),
  })
}

// 入驻歌手
export function getSettleSinger(limit) {
  return request({
    url: '/artist/list',
    cancelToken: new CancelToken((cancel) => {
      getSettleSinger.cancel = cancel
    }),
    params: {
      limit
    }
  })
}