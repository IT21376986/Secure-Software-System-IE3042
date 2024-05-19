import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { UserOutlined, SettingOutlined, BankOutlined, MoneyCollectOutlined, DollarOutlined, CodepenCircleOutlined } from "@ant-design/icons";

import { Layout,  Menu, Typography, message } from "antd";
import { Header } from 'antd/es/layout/layout';
const { Footer, Sider } = Layout;

const { Text } = Typography;

const Container = () => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const items = [
                {
                    key: "profile",
                    to: "/profile",
                    label: "Profile",
                    icon: <UserOutlined />
                },
                {
                    key: "deposit",
                    to: "/deposit",
                    label: "Deposit",
                    icon: <MoneyCollectOutlined />
                },
                {
                    key: "withdraw",
                    to: "/withdraw",
                    label: "Withdraw",
                    icon: <DollarOutlined />
                },
                {
                    key: "loan",
                    to: "/loan",
                    label: "Loan",
                    icon: <BankOutlined />
                },
              
        {
            key: "admin",
            to: "/admin",
            label: "Transfer",
            icon: <SettingOutlined />
        }
    ];

    const handleOnClick = (e) => {
        console.log(e);
        const selected = items.find(item=>item.key===e.key);
        if(selected && selected.to)
          navigate(selected.to);
        else{
        }
    }

    useEffect(()=>{
        const publicKey = localStorage.getItem('publicKey');
        const password = localStorage.getItem('password');
        if(!publicKey || !password){
            navigate('/register');
            message.destroy();
            message.error("You have to be registered to view this page!");
        }
    },)

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["profile"]}
            defaultOpenKeys={["profile"]}
            mode="inline"
            onClick={handleOnClick}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              items: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <CodepenCircleOutlined style={{ color: "#fff", fontSize: "3vh" }} />
            <Text style={{fontSize: 30, color: '#fff', fontFamily: 'monospace'}}>Bank of Sri Lanka</Text>
          </Header>
          <Outlet />

          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Bank of Sri Lanka | BOSL
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Container