import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table, { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { Button, Pagination, Popconfirm, Popover, Space, message } from "antd";

interface Product {
  key: React.Key;
  id: number;
  title: string;
  price: string;
  status: string;
  category: string;
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
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "分类",
      dataIndex: "category",
    },
    {
      title: "上次修改时间",
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // const [useable_data, setUseableData] = useState<Product[]>([]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };
  const fetchData = async (page: number = 1) => {
    try {
      if (sid != undefined) {
        console.log("Load sid: ", sid);
        const response = await instance.get(`/products/by_status/${sid}`, {
          params: {
            page: page,
          },
        });
        // console.log(response.data);
        setResult(response.data);
        const useable_data = response.data.data.map((item: Product) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          status: (() => {
            if (item.status === "1") return "未发布";
            if (item.status === "2") return "已发布";
            if (item.status === "3") return "未入库";
            if (item.status === "4") return "入库中";
            if (item.status === "5") return "已入库";
          })(),
          category: (() => {
            if (item.category === "1") return "未分类";
            if (item.category === "2") return "服饰";
            if (item.category === "3") return "电子";
            if (item.category === "4") return "家居";
            if (item.category === "5") return "汽车";
          })(),
          last_change: item.last_change,
        }));
        setItems(response.data.data);
        setItems(useable_data);

        setTotalItems(response.data.params["total_items"]); // 设置总条目数
        // console.log(response.data.params["total_items"]);
      } else if (cid != undefined) {
        console.log("Load cid: ", cid);
        const response = await instance.get(`/products/by_cate/${cid}`, {
          params: {
            page: page,
          },
        });
        // console.log(response.data);
        setResult(response.data);
        const useable_data = response.data.data.map((item: Product) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          status: (() => {
            if (item.status === "1") return "未发布";
            if (item.status === "2") return "已发布";
            if (item.status === "3") return "未入库";
            if (item.status === "4") return "入库中";
            if (item.status === "5") return "已入库";
          })(),
          category: (() => {
            if (item.category === "1") return "未分类";
            if (item.category === "2") return "服饰";
            if (item.category === "3") return "电子";
            if (item.category === "4") return "家居";
            if (item.category === "5") return "汽车";
          })(),
          last_change: item.last_change,
        }));
        setItems(response.data.data);
        setItems(useable_data);
        setTotalItems(response.data.params["total_items"]); // 设置总条目数
        // console.log(response.data.params["total_items"]);
      } else {
        // console.log("Load all: ");
        const response = await instance.get("/products/", {
          params: {
            page: page,
          },
        });
        setResult(response.data);
        const useable_data = response.data.data.map((item: Product) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          status: (() => {
            if (item.status === "1") return "未发布";
            if (item.status === "2") return "已发布";
            if (item.status === "3") return "未入库";
            if (item.status === "4") return "入库中";
            if (item.status === "5") return "已入库";
          })(),
          category: (() => {
            if (item.category === "1") return "未分类";
            if (item.category === "2") return "服饰";
            if (item.category === "3") return "电子";
            if (item.category === "4") return "家居";
            if (item.category === "5") return "汽车";
          })(),
          last_change: item.last_change,
        }));
        setItems(response.data.data);
        setItems(useable_data);

        setTotalItems(response.data.params["total_items"]); // 设置总条目数
        // console.log(response.data.params["total_items"]);
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
        pagination={false}
      />
      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={10} // 设置每页显示的条目数
        onChange={handlePageChange}
      />
    </>
  );
}

export default ListPage;
