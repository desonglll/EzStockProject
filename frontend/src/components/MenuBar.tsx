import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  DashboardOutlined,
  FileAddOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import ListPage from "../pages/ListPage";
import Dashboard from "../pages/Dashboard";
import { getCategory, getStatus } from "../utils/info";
import CreateProductPage from "../pages/CreateProductPage";

interface BreadItem {
  title: string;
  href: string;
}

interface Status {
  id: string;
  status_name: string;
  count: number;
}
interface Catagory {
  id: string;
  category_name: string;
  count: number;
}
interface Item {
  label: string;
  key: string;
  icon?: ReactNode;
  disabled?: boolean;
  children?: Item[];
}
const { Content, Footer } = Layout;

function MenuBar() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [statusItems, setStatusItems] = useState<Item[]>();
  const [cateItems, setCateItems] = useState<Item[]>();
  useEffect(() => {
    const fetchData = async () => {
      const statusData = await getStatus();
      const status_item = statusData.map((item: Status) => ({
        label: item.status_name,
        key: "/products/by_status/" + item.id,
      }));
      setStatusItems(status_item);
      const cateData = await getCategory();
      const cate_item = cateData.map((item: Catagory) => ({
        label: item.category_name,
        key: "/products/by_cate/" + item.id,
      }));
      setCateItems(cate_item);
    };
    fetchData();
  }, []);
  const items: MenuProps["items"] = [
    {
      label: "首页",
      key: "dashboard",
      icon: <AppstoreOutlined />,
    },
    {
      label: "根据状态",
      key: "status",
      icon: <DashboardOutlined />,
      children: statusItems,
    },
    {
      label: "根据分类",
      key: "category",
      icon: <OrderedListOutlined />,
      children: cateItems,
    },
    {
      label: "新建产品",
      key: "products/new",
      icon: <FileAddOutlined />,
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: "alipay",
    },
  ];
  const navigate = useNavigate();

  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadItem[]>([]);
  const location = useLocation();
  useEffect(() => {
    // 解析 location.pathname 并生成面包屑
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const items: BreadItem[] = pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}/`;
      return { href: url, title: snippet };
    });
    const newBread: BreadItem[] = [
      {
        href: "/",
        title: "首页",
      },
      ...items,
    ];
    console.log("useEffect called");
    setBreadcrumbItems(newBread);
    // console.log(items);
  }, [location.pathname, navigate]);
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.key);
  };

  const onSelect: MenuProps["onSelect"] = (e) => {
    console.log(e.key);
  };

  return (
    <>
      <Layout style={{ height: "100%" }}>
        {/* <Header style={{ display: "flex", alignItems: "center" }}> */}
        <Menu
          onClick={onClick}
          onSelect={onSelect}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {/* </Header> */}
        <br></br>

        <Content style={{ padding: "0 48px" }}>
          {/* <Breadcrumb items={breadcrumbItems} /> */}
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Content style={{ padding: "0 24px", height: "100%" }}>
              <Routes>
                <Route path="/" Component={Dashboard}></Route>
                <Route path="/dashboard" Component={Dashboard}></Route>
                <Route path="/products" Component={ListPage}></Route>
                <Route
                  path="/products/new"
                  Component={CreateProductPage}
                ></Route>

                <Route
                  path="/products/by_status/:sid?"
                  Component={ListPage}
                ></Route>
                <Route
                  path="/products/by_cate/:cid?"
                  Component={ListPage}
                ></Route>
                <Route
                  path="/products/detail/:id"
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
    </>
  );
}

export default MenuBar;
