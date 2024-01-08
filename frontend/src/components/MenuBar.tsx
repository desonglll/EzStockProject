import React, { ReactNode, useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import ListPage from "../pages/ListPage";
import Dashboard from "../pages/Dashboard";

interface BreadItem {
  title: string;
  href: string;
}
const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = [
  {
    key: 0,
    label: "Home",
  },
  {
    key: 1,
    label: "Products",
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

  const [currentNav, setCurrentNav] = useState(0);
  const navigate = useNavigate();
  const onClickNav = (e: any) => {
    console.log(e.key);
    if (e.key === "0") {
      setCurrentNav(0);
      navigate("/dashboard");
    }
    if (e.key === "1") {
      setCurrentNav(1);
      navigate("/products");
    }
  };

  const links = [
    {
      href: "/",
      title: "首页",
    },
    {
      href: "/dashboard",
      title: "控制台",
    },
    {
      href: "/products",
      title: "产品",
    },
  ];

  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadItem[]>([]);
  const location = useLocation();
  const changeCurrentNav = () => {
    console.log(location.pathname);
    if (location.pathname === "/products") {
      console.log(1);
      return "1";
    }
    return "0";
  };
  useEffect(() => {
    changeCurrentNav();
    // 解析 location.pathname 并生成面包屑
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    const items: BreadItem[] = pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return { href: url, title: snippet };
    });

    const newBread: BreadItem[] = [
      {
        href: "/",
        title: "首页",
      },
      ...items,
    ];
    // if (links.some((link) => link.href === location.pathname)) {
    //   const matchedLink = links.find((link) => link.href === location.pathname);

    //   if (matchedLink) {
    //     const newBread: BreadItem[] = [
    //       ...breadcrumbItems,
    //       { title: matchedLink.title, href: matchedLink.href },
    //     ];

    //     console.log(newBread);
    //     setBreadcrumbItems(newBread);
    //   }
    // }

    setBreadcrumbItems(newBread);
    // console.log(items);
  }, [location]);
  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[changeCurrentNav()]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={onClickNav}
        />
      </Header>

      <Content style={{ padding: "0 48px" }}>
        {/* <Breadcrumb items={breadcrumbItems} /> */}
        <Breadcrumb items={breadcrumbItems} />
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
              <Route path="/products" Component={ListPage}></Route>
              <Route path="/dashboard" Component={Dashboard}></Route>
              <Route path="/products/detail/:id" Component={DetailPage}></Route>
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
