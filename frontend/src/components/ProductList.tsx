import React, { useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

import { Avatar, List, Space } from "antd";
import axios from "axios";
interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
}
interface Result {
  code: number;
  message: string;
  data: Product[];
}
function ProductList() {
  const [items, setItems] = useState<Result>({
    code: 1,
    message: "success",
    data: [],
  });
  const instance = axios.create({
    baseURL: "http://localhost:8000/",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await instance.get("products/");
        setItems(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={items.data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={""} />}
              title={<a href={""}>{item.title}</a>}
              description={item.description}
            />
            {item.description}
          </List.Item>
        )}
      />
    </>
  );
}

export default ProductList;
