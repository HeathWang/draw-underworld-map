import React from 'react';
import {UserOutlined,} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import AppRoutes from "./router/AppRoutes";
import MenuItem from "antd/lib/menu/MenuItem";
import './App.css';

const {Header, Content, Footer, Sider} = Layout;

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [collapsed, setCollapsed] = React.useState(false);
    const location = useLocation();
    const navigator = useNavigate();

    return (
        <Layout hasSider style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
            >
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                    <MenuItem key={"2"} icon={<UserOutlined/>} title={"地下尖塔"}>
                        <Link to="/undermap">地下尖塔绘制</Link>
                    </MenuItem>
                    <MenuItem key={"1"} icon={<UserOutlined/>} title={"名人堂"}>
                        <Link to="/person">名人堂</Link>
                    </MenuItem>
                </Menu>
            </Sider>

            <Layout >

                <Content style={{ margin: '0 6px' }}>
                    <div style={{padding: 6, textAlign: 'center', background: colorBgContainer}}>
                        <AppRoutes></AppRoutes>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <div className="global-footer">
                        宝石战争-BND同盟会
                    </div>
                    <div>
                        群号:468647928 coding by 猴哥 NL
                    </div>
                </Footer>
            </Layout>
        </Layout>

    );
};

export default App;
