import React from "react";
import { Button } from 'antd-mobile'

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import CityList from "./pages/Citylist";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 根组件
        <Button>登录</Button> */}

        {/* 配置导航菜单 */}

        {/* <ul>
          <li>
            <Link to='/home'>首页</Link>
          </li>
          <li>
            <Link to='/citylist'>城市选择</Link>
          </li>
        </ul> */}

        {/* 配置路由 */}
        {/* 首页路由处理 */ }
        <Route exact path='/' render={() => <Redirect to='/home' />}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/citylist' component={CityList}></Route>
      </div>
    </Router>
  );
}

export default App;
