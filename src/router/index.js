import React from 'react'
import { Redirect } from 'react-router-dom'


//react懒加载组件
//React.lazy不能单独使用，需要配合React.suspense，suspence是用来包裹异步组件，添加loading效果等。
const JMDiscover = React.lazy(() => import('@/pages/discover'))
const JMRecommend = React.lazy(() =>import('@/pages/discover/child-pages/recommend'))
const JMToplist = React.lazy(() =>import('@/pages/discover/child-pages/toplist'))
const JMSongs = React.lazy(() => import('@/pages/discover/child-pages/songs'))
const JMDjradio = React.lazy(() =>import('@/pages/discover/child-pages/djradio'))
const JMArtist = React.lazy(() => import('@/pages/discover/child-pages/artist'))
const JMAlbum = React.lazy(() => import('@/pages/discover/child-pages/album'))

const JMSongDetail = React.lazy(() => import('@/pages/player'))
const JMFriend = React.lazy(() => import('@/pages/friend'))
const JMMine = React.lazy(() => import('@/pages/mine'))

const JMSearch = React.lazy(() => import('@/pages/search'))
const JMSingle = React.lazy(() => import('@/pages/search/child-pages/single'))
const JMSinger = React.lazy(() => import('@/pages/search/child-pages/singer'))
const JMSearchAlbum = React.lazy(() =>
  import('@/pages/search/child-pages/album')
)
const JMSonglist = React.lazy(() => import('@/pages/song-detail'))
const JMUser = React.lazy(() => import('@/pages/profile'))

const JM404 = React.lazy(() => import('@/pages/404'))
const routes = [
  { path: '/', exact: true, render: () => <Redirect to="/discover" /> },
  {
    path: '/discover',
    component: JMDiscover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      //发现音乐-推荐
      { path: '/discover/recommend', component: JMRecommend },
      //发现音乐-排行
      { path: '/discover/ranking', component: JMToplist, },
      //发现音乐-歌单
      { path: '/discover/songs', component: JMSongs },
      //发现音乐-每日推荐
      { path: '/discover/album', component: JMAlbum },
      { path: '/discover/djradio', component: JMDjradio },
      { path: '/discover/artist', component: JMArtist },
      { path: '/discover/song', component: JMSongDetail },
    ],
  },
  //我的音乐
  { path: '/mine', component: JMMine },
  //朋友
  { path: '/friend', component: JMFriend },
  //搜索界面
  {
    path: '/search',
    component: JMSearch,
    routes: [
      {
        path: '/search',
        exact: true,
        render: () => <Redirect to="/search/single?song=&type=1" />,
      },
      //通过单曲查询
      { path: '/search/single', component: JMSingle },
      //通过歌手查询
      { path: '/search/singer', component: JMSinger },
      { path: '/search/album/', component: JMSearchAlbum },
    ],
  },
  //推荐歌单列表
  {
    path: '/songlist',
    exact: true,
    component: JMSonglist,
  },
  {
    path: '/user',
    exact: true,
    component: JMUser,
  },
  //未知路由
  {
    component: JM404,
  },
]

export default routes
