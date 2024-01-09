import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table, { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { Button, Popconfirm, Popover, Space, message } from "antd";

interface Product {
  key: React.Key;
  id: number;
  title: string;
  price: string;
  status: string;
  last_change: any;
}

interface Result {
  code: number;
  message: string;
  data: Product[];
}

function ListPage() {
  const { sid } = useParams();
  const { cid } = useParams();

  const [result, setResult] = useState<Result>();
  const [items, setItems] = useState<Product[]>();
  const instance = axios.create({
    // baseURL: "http://localhost:8000",
  });
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
        onSelect: (changeableRowKeys: any[]) => {
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
        onSelect: (changeableRowKeys: any[]) => {
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

  const confirmDelete = async (e: number) => {
    console.log(e);
    await instance.delete(`/products/${e}`);
    message.success(`成功删除 ${e}`);
    fetchData();
  };

  const cancelDelete = (e: number) => {
    console.log(e);

    message.error(`取消删除 ${e}`);
  };

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 2,
      },
    },
    {
      title: "TITLE",
      dataIndex: "title",
    },
    {
      title: "PRICE",
      dataIndex: "price",
    },
    {
      title: "STATUS",
      dataIndex: "status",
    },
    {
      title: "LAST CHANGE",
      dataIndex: "last_change",
      sorter: {
        compare: (a, b) => {
          const dateA = new Date(a.last_change).getTime();
          const dateB = new Date(b.last_change).getTime();
          return dateA - dateB;
        },
        multiple: 2,
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popover content={"详情操作"} title="详情">
            <Button type="primary" href={`/products/detail/${record.id}`}>
              详情
            </Button>
          </Popover>
          <Popover content={"删除操作"} title="删除">
            <Popconfirm
              title="删除此产品"
              description="要删除此产品吗？此操作不可恢复！"
              onConfirm={() => confirmDelete(record.id)}
              onCancel={() => cancelDelete(record.id)}
              okText="确认"
              cancelText="再想想"
            >
              <Button danger disabled>
                删除
              </Button>
            </Popconfirm>
          </Popover>
        </Space>
      ),
    },
  ];
  const fetchData = async () => {
    try {
      if (sid != undefined) {
        console.log("Load sid: ", sid);
        const response = await instance.get(`/products/by_status/${sid}`);
        // console.log(response.data);
        setResult(response.data);
        setItems(response.data.data);
      } else if (cid != undefined) {
        console.log("Load cid: ", cid);
        const response = await instance.get(`/products/by_cate/${cid}`);
        // console.log(response.data);
        setResult(response.data);
        setItems(response.data.data);
      } else {
        console.log("Load all: ");
        const response = await instance.get("/products/");
        // console.log(response.data);
        setResult(response.data);
        setItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [location.pathname]);

  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={items}
        rowKey="id"
      />

      {/* <ul className="list-group">
        {items?.map((item: Product) => (
          <li className="list-group-item list-group-item-action" key={item.id}>
            <Link to={`/products/detail/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default ListPage;
