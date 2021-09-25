import React from "react";
import { Carousel, Flex, WhiteSpace } from 'antd-mobile';
import axios from "axios";


// 导入图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

import './index.scss'


// 导航菜单数据
const navs = [
    {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/home/list'
    },
    {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/home/list'
    },
    {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/map'
    },
    {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/rent/add'
    }
]
export default class Index extends React.Component {
    state = {
        // 轮播图状态数据
        /**
         * 轮播图不会自动播放
         * 从其他路由返回的时候，高度不够
         * 
         * 原因，轮播图数据是动态加载的，加载完成前后，数量不一致导致的
         * 
         * 解决问题：
         * 
         * 1，在状态中添加一个表示轮播图加载完成的数据，
         * 2.在轮播图加载完成时，修改该数据状态值为true
         * 3.只有在轮播图数据加载完成的情况下，才渲染轮播图组件
         */
        swipers: [],
        isSwiperLoaded: false,

        // 租房小组数据
        groups: [],
    }
    // 获取轮播图数据的方法
    async getSwipers() {
        const res = await axios.get("http://localhost:8080/home/swiper")
        this.setState(() => {
            return ({
                swipers: res.data.body,
                isSwiperLoaded: true,
            })
        })
    }

    async getGroups() {
        const res = await axios.get('http://127.0.0.1:8080/home/groups', {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        })
        console.log(res)
    }

    componentDidMount() {
        this.getSwipers()
        this.getGroups()
    }
    // 轮播图
    renderSwipers() {
        return (
            this.state.swipers.map(item => (
                <a
                    key={item.id}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%', height: 212 }}
                >
                    <img
                        src={`http://127.0.0.1:8080${item.imgSrc}`}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                    />
                </a>
            )))
    }

    // 导航栏
    renderNavs() {
        return (
            navs.map(item => <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
                <img src={item.img} alt='' />
                <h2>{item.title}</h2>
            </Flex.Item>)
        )
    }
    render() {
        return (
            <div className='index'>
                <div className='swiper'>
                    {
                        this.state.isSwiperLoaded ?
                            (<Carousel
                                autoplay
                                infinite
                                autoplayInterval={5000}
                            >
                                {this.renderSwipers()}
                            </Carousel>) : ('')
                    }
                </div>
                {/* 导航菜单 */}
                <Flex className='nav'>
                    {this.renderNavs()}
                </Flex>
            </div>
        );
    }
}