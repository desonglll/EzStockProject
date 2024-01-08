import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Status {
  status_id: string;
  status: string;
}
interface NavStatus {
  key: string;
  label: string;
}
interface Result {
  code: number;
  message: string;
  data: Status[];
}
function MenuBar() {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate(); // 使用 useNavigate 替代 useHistory
  const [result, setResult] = useState<Result>({
    code: 1,
    message: "success",
    data: [],
  });
  const [status, setStatus] = useState<NavStatus[]>();
  const instance = axios.create({
    baseURL: "http://localhost:8000/",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await instance.get("/products/status_nav/");
        setResult(result.data.data);
        const new_status: NavStatus[] = [];
        for (const key in result.data.data) {
          const value = result.data.data[key];
          new_status.push({
            key: key,
            label: value,
          });
        }
        setStatus(new_status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const items: MenuProps["items"] = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <MailOutlined />,
    },
    {
      label: "List",
      key: "list",
      icon: <MailOutlined />,
    },
    {
      label: "状态",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: status,
        },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "dashboard") {
      navigate("/dashboard"); // 请替换为你的路由路径
    }
    if (e.key === "list") {
      navigate("/list"); // 请替换为你的路由路径
    }
    if (e.key === "about") {
      navigate("/about"); // 请替换为你的路由路径
    }
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
}

export default MenuBar;
