/**导入第三方库 */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
//NavLink可以给组件添加路由被选中的样式，Redirect是重定向组件，from匹配到的路由会重定向到to的路由
import { NavLink, Redirect } from 'react-router-dom';
//Dropdown下拉菜单。Input搜索输入框，Menu右上角个人中心的菜单栏
import { Dropdown, Input, Menu } from 'antd';
//DownOutlined是下拉标志，SearchOutlined是搜索标志
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
/**导入自己写的 */
//导入防抖函数debounce
import { debounce } from '@/utils/format-utils.js';
//清除登录状态，用于用户退出登录
import { clearLoginState } from '@/utils/secret-key';
//导入链接常量
import { headerLinks } from '@/common/local-data';
//导入头部框架样式
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style';
//点击登录弹出来的注册登录小窗口
import ThemeLogin from '@/components/theme-login';
//创造Action给dispatch
import {
  getSearchSongListAction,/**搜索框输入时的列表 */
  changeFocusStateAction,/**改变搜索框焦点状态 */
} from './store/actionCreator';
import { getSongDetailAction } from '@/pages/player/store';

import { changeIsVisible } from '@/components/theme-login/store';


/**
 * 网站最顶部的组件
 */


export default memo(function JMAppHeader(props) {
  
  //组件数据
  const [isRedirect, setIsRedirect] = useState(false);
  const [value, setValue] = useState('');
  const [recordActive, setRecordActive] = useState(-1);
  // 头部导航路由，路由;我的音乐、发现音乐......
  const showSelectItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink
          key={item.title}
          to={item.link}
          className="header-item"
          activeClassName="link-active"
        >
          <em>{item.title}</em>
          <i className="icon"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} key={item.title} className="header-item">
          {item.title}
        </a>
      );
    }
  };

  // redux hook
  const dispatch = useDispatch();
  const { searchSongList, focusState, isLogin, profile } = useSelector(
    (state) => ({
      searchSongList: state.getIn(['themeHeader', 'searchSongList']),
      focusState: state.getIn(['themeHeader', 'focusState']),
      isLogin: state.getIn(['loginState', 'isLogin']),
      profile: state.getIn(['loginState', 'profile']),
    }),
    shallowEqual
  );

  //这里是一个ReactHooks的API，下面一些代码的作用是控制搜索框的焦点
  const inputRef = useRef();
  // (根据当前焦点状态设置input焦点)
  useEffect(() => {
    // 获取焦点
    if (focusState) inputRef.current.focus();
    // 失去焦点
    else inputRef.current.blur();
  }, [focusState]);

  //debounce()  函数防抖进行优化
  const changeInput = debounce((target) => {
    let value = target.value.trim();
    if (value.length < 1) return;
    // 显示下拉框
    dispatch(changeFocusStateAction(true));
    // 发送网络请求
    dispatch(getSearchSongListAction(value));
  }, 400);
  // 点击当前item歌曲项:渲染歌曲详情页面并播放歌曲
  const changeCurrentSong = (id, item) => {
    // 放到搜索文本框
    setValue(item.name + '-' + item.artists[0].name);
    //搜索
    dispatch(getSongDetailAction(id));
    // 隐藏下拉框
    dispatch(changeFocusStateAction(false));
    // 播放音乐
    document.getElementById('audio').autoplay = true;
  };

  // 表单回车:跳转到搜索详情
  /**useCallback函数会返回一个memoized函数
   * memoized函数实现原理：
   * 使用一组参数初次调用函数时，
   * 缓存参数和计算结果，
   * 当再次使用相同的参数调用该函数时，
   * 直接返回相应的缓存结果。
   */
  const handleEnter = useCallback(
    (e) => {
      // 说明当前光标有”高亮当前行“
      if (recordActive >= 0) {
        // 保存value
        setValue(
          searchSongList[recordActive].name +
            '-' +
            searchSongList[recordActive].artists[0].name
        );
      }
      dispatch(changeFocusStateAction(false));
      // 只要在搜索框回车: 都进行跳转
      setIsRedirect(true);
    },
    /** 函数更新的依赖项*/
    [dispatch, recordActive, searchSongList]
  );

  // 获取焦点
  const handleFocus = useCallback(() => {
    // 当文本获取焦点时,文本被选中状态
    inputRef.current.select();
    // 更改为获取焦点状态
    dispatch(changeFocusStateAction(true));
    // 修改状态重定向状态
    setIsRedirect(false);
  }, [dispatch]);

  // 监控用户是否按: "上"或"下"键（搜索的时候选择搜索项目）
  const watchKeyboard = useCallback(
    (even) => {
      let activeNumber = recordActive;
      if (even.keyCode === 38) {
        activeNumber--;
        activeNumber =
          activeNumber < 0 ? searchSongList?.length - 1 : activeNumber;
        setRecordActive(activeNumber);
      } else if (even.keyCode === 40) {
        activeNumber++;
        activeNumber =
          activeNumber >= searchSongList?.length ? 0 : activeNumber;
        setRecordActive(activeNumber);
      }
    },
    [recordActive, setRecordActive, searchSongList]
  );
  // 用户下拉JSX
  const profileDwonMenu = () => {
    return (
      isLogin ? (
        <Menu>
          <Menu.Item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="#/"
              onClick={(e) => e.preventDefault()}
            >
              {profile.nickname}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              rel="noopener noreferrer"
              href="#/user"
            >
              我的主页
            </a>
          </Menu.Item>
          {/* <Menu.Item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="#/"
            >
              没想好
            </a>
          </Menu.Item> */}
          <Menu.Item danger onClick={() => clearLoginState()}>退出登录</Menu.Item>
        </Menu>
      ) : ''
    );
  };

  const showProfileContent = () => {
    return (
      <img src={profile.avatarUrl} alt="" className="profile-img" />
      // <div>
      //   <img src={profile.avatarUrl} alt="" className="profile-img" />
      //   {/* <span>{profile.nickname}</span> */}
      // </div>
    )
  }

  // 返回的JSX
  return (
    <HeaderWrapper>
      <div className="content w1100">
        <HeaderLeft>
          <h1>
            <a href="#/" className="logo sprite_01">
              网易云音乐
            </a>
          </h1>
          <div className="header-group">
            {headerLinks.map((item, index) => {
              return showSelectItem(item, index);
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <div className="search-wrapper">
            <Input
              ref={inputRef}
              className="search "
              placeholder="音乐/歌手"
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => setIsRedirect(false) || setValue(e.target.value)}
              onInput={({ target }) => changeInput(target)}
              onFocus={handleFocus}
              onPressEnter={(e) => handleEnter(e)}
              value={value}
              onKeyDown={watchKeyboard}
            />
            {isRedirect && (
              <Redirect
                to={{
                  pathname: '/search/single',
                  search: `?song=${value}&type=1`,
                }}
              />
            )}
            <div
              className="down-slider"
              style={{ display: focusState ? 'block' : 'none' }}
            >
              <div className="search-header">
                <span className="discover">搜"歌曲"相关用户&gt;</span>
              </div>

              <div className="content">
                <div className="zuo">
                  <span className="song">单曲</span>
                </div>

                {/* <div className="you"> */}
                <span className="main">
                  {searchSongList &&
                    searchSongList.map((item, index) => {
                      return (
                        <div
                          className={
                            'item ' + (recordActive === index ? 'active' : '')
                          }
                          key={item.id}
                          onClick={() => changeCurrentSong(item.id, item)}
                        >
                          <span>{item.name}</span>-{item.artists[0].name}
                        </div>
                      );
                    })}
                </span>
              </div>
            </div>
          </div>
          <div className="center">创作者中心</div>
          <Dropdown overlay={profileDwonMenu}>
            <div
              className="login"
              onClick={() => !isLogin && dispatch(changeIsVisible(true))}
            >
              {/* {isLogin ? profile.nickname : '登录'} */}
              <a
                href="https://juejin.cn/user/606586151899166"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {isLogin ? showProfileContent() : '登录'} <DownOutlined />
              </a>
            </div>
          </Dropdown>
        </HeaderRight>
      </div>
      <div className="red-line"></div>
      <ThemeLogin />
    </HeaderWrapper>
  );
});
