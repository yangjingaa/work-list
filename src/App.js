import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import router from './router'
import Layout from './web/basics-web/layout/index'
import {LocaleProvider } from 'antd' //设置语言
import zh_CN from 'antd/lib/locale-provider/zh_CN';

class App extends Component {
    render() {
        // const basename = process.env.PUBLIC_URL || '';
        return (
            <BrowserRouter>
                <LocaleProvider locale={zh_CN}>
                    <Layout>
                        {router}
                    </Layout>
                </LocaleProvider>
            </BrowserRouter>
        );
    }
}

export default App;
