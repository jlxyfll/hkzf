import React from "react";
import { Carousel } from 'antd-mobile';
import axios from "axios";

export default class Index extends React.Component {
    state = {
        // 轮播图状态数据
        swipers: []
        // data: ['1', '2', '3'],
        // imgHeight: 176,
    }
    // 获取轮播图数据的方法
    async getSwipers() {
        const res = await axios.get("http://localhost:8080/home/swiper")
        this.setState(() => {
            return ({
                swipers: res.data.body
            })
        })
    }

    componentDidMount() {
        this.getSwipers()
    }
    // 轮播图
    renderSwipers() {
        return (
            this.state.swipers.map(item => (
                <a
                    key={item.it}
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

    render() {
        return (
            <div className='index'>
                <Carousel
                    autoplay={false}
                    infinite
                    autoplayInterval={5000}
                >
                    {this.renderSwipers()}
                </Carousel>
            </div>
        );
    }
}