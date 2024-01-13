import React, { ReactElement, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Badge, Descriptions, Image, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string; // Assuming categoryChoice is an array of strings
  image: string; // Assuming the image field is a string representing the image path
  status: string; // Assuming statusChoice is an array of strings
  created_date: string; // Assuming the date is represented as a string, you might want to use a Date type
  last_change: string; // Assuming the last_change field is represented as a string, you might want to use a Date type
  last_changed_by: string;
  valid: boolean;
}
interface DisplayItem {
  key: string;
  label: string;
  children: any;
}

function DisplayPage() {
  const { id } = useParams();
  const [displayItems, setDisplayItems] = useState<DisplayItem[]>([]);
  const [imageLink, setImageLink] = useState<string>();
  const [loading, setLoading] = useState(true);

  const instance = axios.create({});
  const fetchData = async () => {
    try {
      const response = await instance.get(`products/${id}`);
      const product: Product = response.data.data;

      const items: DisplayItem[] = [
        {
          key: "1",
          label: "ID",
          children: product.id,
        },
        {
          key: "2",
          label: "标题",
          children: product.title,
        },
        {
          key: "3",
          label: "价格",
          children: product.price,
        },
        {
          key: "4",
          label: "描述",
          children: product.description,
        },
        {
          key: "5",
          label: "分类",
          children: (() => {
            if (product.category === "1") return "未分类";
            if (product.category === "2") return "服饰";
            if (product.category === "3") return "电子";
            if (product.category === "4") return "家居";
            if (product.category === "5") return "汽车";
          })(),
        },
        {
          key: "6",
          label: "状态",
          children: (() => {
            if (product.status === "1") return "未发布";
            if (product.status === "2") return "已发布";
            if (product.status === "3") return "未入库";
            if (product.status === "4") return "入库中";
            if (product.status === "5") return "已入库";
          })(),
        },
        {
          key: "7",
          label: "创建时间",
          children: product.created_date,
        },
        {
          key: "8",
          label: "上次改变时间",
          children: product.last_change,
        },
        {
          key: "9",
          label: "是否有效",
          children: (() => {
            if (product.valid === true) return "有效";
            return "无效";
          })(),
        },
      ];
      setDisplayItems(items);
      setImageLink(product.image);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading...">
      {loading ? (
        <div>DetailPage{id}</div>
      ) : (
        <>
          <div className="container">
            <Descriptions title="产品详情" bordered items={displayItems} />
            <Image
              width={500}
              src={String(instance.defaults.baseURL) + imageLink}
            />
          </div>
        </>
      )}
    </Spin>
  );
}

export default DisplayPage;
