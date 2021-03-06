import React from "react";
import { TabBar } from 'antd-mobile';

// 导入路由
import { Route } from "react-router-dom";


import './index.css'

import News from '../News'
import HouseList from "../HouseList";
import Profile from "../Profile";
import Index from "../Index";


const tabItems = [
    {
        title: '首页',
        icon: 'icon-ind',
        path: '/home',
    },
    {
        title: '找房',
        icon: 'icon-findHouse',
        path: '/home/list',
    },
    {
        title: '资讯',
        icon: 'icon-infom',
        path: '/home/news',
    },
    {
        title: '我的',
        icon: 'icon-my',
        path: '/home/profile',
    },
]


/**
 * 问题：点击首页导航菜单，导航到找房列表页面时，找房菜单没有高亮
 * 原因：原来我们实现该功能的额时候，只考虑了点击以及第一次加载Home组件的情况，但是，我们没有考虑不重新加载Home组件时的路由切换，因为，这种情况下，我们的迪马没有覆盖到
 * (路由切换而组件没有重新加载)
 * 解决：
 *  思路：在路由切换时，也执行菜单高亮的逻辑代码
 *  钩子函数：添加componentDidUpdate
 *  在钩子函数中判断路由地址是否切换(因为路由的信息是通过props传递各组件的，所以通过更新前后的两个props)
 *  在路由地址切换时，让菜单高亮
 */
export default class Home extends React.Component {
    state = {
        // 默认选中
        /* selectedTab: 'redTab', */
        selectedTab: this.props.location.pathname
        /* // 是否隐藏
        hidden: false,
        // 是否全屏
        fullScreen: false, */
    };

    componentDidUpdate(prevProps) {
        console.log('上一次的路由信息', prevProps);
        console.log('当前的路由信息', this.props);
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                selectedTab: this.props.location.pathname
            })
        }
    }
    
    renderTaBarItem() {
        return (
            tabItems.map(item => <TabBar.Item
                icon={
                    <i className={`iconfont ${item.icon}`} ></i >
                }
                selectedIcon={
                    <i className={`iconfont ${item.icon}`} ></i>
                }
                title={item.title}
                key={item.title}
                /* dot */
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                    this.setState({
                        selectedTab: item.path,
                    });

                    // 路由切换
                    this.props.history.push(item.path)
                }}
            >
                {/* {this.renderContent('Friend')} */}
            </TabBar.Item >)
        )
    }

    /*     renderContent(pageText) {
            return (
                <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                    <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                    <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                hidden: !this.state.hidden,
                            });
                        }}
                    >
                        Click to show/hide tab-bar
                    </a>
                    <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                fullScreen: !this.state.fullScreen,
                            });
                        }}
                    >
                        Click to switch fullscreen
                    </a>
                </div>
            );
        } */

    render() {
        // console.log(this.props.location.pathname)
        return (
            <div className='home'>
                {/* 这是首页 */}
                {/* 渲染子路由 */}
                <Route exact path='/home' component={Index}></Route>
                <Route path='/home/list' component={HouseList}></Route>
                <Route path='/home/news' component={News}></Route>
                <Route path='/home/profile' component={Profile}></Route>

                {/* TabBar */}
                {/* <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}> */}
                <TabBar
                    tintColor="#21b97a"
                    barTintColor="white"
                    // 不渲染内容部分
                    noRenderContent="true"
                    hidden={this.state.hidden}
                >
                    {this.renderTaBarItem()}
                </TabBar>
            </div>
        )
    }
}