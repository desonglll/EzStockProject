import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
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
const columns: ColumnsType<Product> = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
];
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
        // console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Product> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Table
      rowKey="id" // 指定每行数据的唯一标识为 id
      rowSelection={rowSelection}
      columns={columns}
      dataSource={items.data}
      className="container"
    />
  );
}

export default ProductList;
