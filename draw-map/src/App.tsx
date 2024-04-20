import React from 'react';
import {Layout, Tabs, TabsProps, theme} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import MapPage from "./pages/map";
import LinksCollection from "./pages/linksCollection";

const {Header, Content, Footer, Sider} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const location = useLocation();
    const navigator = useNavigate();

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '地图',
            children: <MapPage/>,
        },
        {
            key: '2',
            label: '传送门',
            children: <LinksCollection/>,
        },
    ];

    return (
        <Layout>

            <Content style={{margin: '0 6px'}}>
                <div style={{padding: 6, textAlign: 'center', background: colorBgContainer}}>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        centered
                        size={"large"}
                    />
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <div className="global-footer">
                    宝石战争-BND同盟会
                </div>
                <div>
                    群号:468647928 coding by 猴哥 NL
                </div>
                <div>
                    <span>且用且珍惜。</span>
                </div>
            </Footer>
            <img src={'/icons/ikun.gif'} style={{position: 'fixed', top: 0, left: 0, width: 100, height: 100}} alt={"鸡你太美"}/>
        </Layout>
    );
};

export default App;
