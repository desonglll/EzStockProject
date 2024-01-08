import React, { ReactNode, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import ListPage from "../pages/ListPage";
import Dashboard from "../pages/Dashboard";

interface BreadItem {
  title: ReactNode;
  link: string;
}
const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = [
  {
    key: 0,
    label: "Home",
  },
  {
    key: 1,
    label: "List",
  },
];

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

function MenuBar() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onClickNav = (e: any) => {
    console.log(e.key);
    if (e.key === "0") {
      navigate("/dashboard");
    }
    if (e.key === "1") {
      navigate("/list");
    }
  };
  const { Item } = Breadcrumb;

  const routes = [
    {
      path: "/",
      breadcrumbName: "首页",
    },
    {
      path: "/dashboard",
      breadcrumbName: "仪表盘",
    },
    {
      path: "/list",
      breadcrumbName: "产品列表",
    },
    {
      path: "/list/product/detail",
      breadcrumbName: "应用详情",
    },
  ];
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const route = routes.find((r) => r.path === url);
    if (route) {
      return (
        <Item key={url}>
          <Link to={url}>{route.breadcrumbName}</Link>
        </Item>
      );
    }
    return null;
  });
  const breadcrumbItems = [
    <Item key="home">
      <Link to="/">首页</Link>
    </Item>,
    ...extraBreadcrumbItems,
  ];
  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={onClickNav}
        />
      </Header>

      <Content style={{ padding: "0 48px" }}>
        {/* <Breadcrumb items={breadItem} /> */}
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Routes>
              <Route path="/" Component={Dashboard}></Route>
              <Route path="/list" Component={ListPage}></Route>
              <Route path="/dashboard" Component={Dashboard}></Route>
              <Route
                path="/list/product/detail/:id"
                Component={DetailPage}
              ></Route>
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default MenuBar;
