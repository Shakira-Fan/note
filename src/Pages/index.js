//匯入React和路由相依性
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//匯入路徑
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';

//匯入共用版面配置元件
import Layout from '../components/Layout';


const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/mynotes" component={MyNotes} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage} />
            </Layout>
        </Router>
    );
}

export default Pages;
