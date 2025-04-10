import React from 'react';
import { Layout, Tabs, TabsProps, theme, Typography, Space } from 'antd';
// import { useLocation, useNavigate } from 'react-router-dom'; // Removed as they are not used
import './App.css';
import MapPage from "./pages/map";
import LinksCollection from "./pages/linksCollection";

const { Header, Content, Footer } = Layout; // Removed Sider as it's not used
const { Title, Text, Link } = Typography;

const App: React.FC = () => {
    const {
        token: { colorBgContainer, colorBgLayout }, // Use colorBgLayout for overall background
    } = theme.useToken();

    // const location = useLocation(); // Removed as they are not used
    // const navigator = useNavigate(); // Removed as they are not used

    const items: TabsProps['items'] = [
        {
            key: 'map', // Use meaningful keys
            label: '地下世界地图', // Keep the more descriptive label
            children: <MapPage />,
        },
        {
            key: 'links', // Use meaningful keys
            label: '常用传送门',
            children: <LinksCollection />,
        },
    ];

    return (
        // Add minHeight for full viewport height and a subtle background
        <Layout style={{ minHeight: '100vh', background: colorBgLayout }}>
            {/* Optional Header */}
            <Header style={{ display: 'flex', alignItems: 'center', background: colorBgContainer, padding: '0 24px', marginBottom: '16px' }}>
                 {/* You can add a logo or title here if needed */}
                 <Title level={3} style={{ color: '#1890ff', margin: 0 }}>地下世界地图工具</Title>
            </Header>

            {/* Add padding to the Content */}
            <Content style={{ padding: '0 24px' }}>
                 {/* Use className for styling instead of inline styles where possible */}
                <div className="main-content-wrapper" style={{ background: colorBgContainer }}>
                    <Tabs
                        defaultActiveKey="map" // Update default key
                        items={items}
                        centered
                        size={"large"}
                        className="main-tabs" // Add class for potential styling
                    />
                </div>
            </Content>
            {/* Redesigned Footer */}
            <Footer style={{ textAlign: 'center', padding: '12px 24px', background: 'transparent' }}>
                <Space direction="vertical" size="small">
                    <Text strong>宝石战争 - BND同盟会</Text>
                    <Text type="secondary">QQ群: 468647928 | Developed by 猴哥 NL</Text>
                    <Text italic type="secondary">请珍惜使用。</Text>
                </Space> {/* Add closing tag */}
            </Footer>
        </Layout>
    );
};

export default App;
