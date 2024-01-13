import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Popconfirm,
  Popover,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Spin,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { getCategory, getStatus } from "../utils/info";

interface Status {
  id: string;
  status_name: string;
  count: number;
}
interface Category {
  id: string;
  category_name: string;
  count: number;
}
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
type ProductType = {
  id: number;
  title: string;
  price?: number;
  description?: string;
  category?: string; // Assuming categoryChoice is an array of strings
  image?: string; // Assuming the image field is a string representing the image path
  status?: string; // Assuming statusChoice is an array of strings
  created_date?: string; // Assuming the date is represented as a string, you might want to use a Date type
  last_change?: string; // Assuming the last_change field is represented as a string, you might want to use a Date type
  last_changed_by?: string;
  valid?: boolean;
};
interface Result {
  code: number;
  message: string;
  data: Product;
}
interface Choice {
  label: string;
  value: string;
  disabled?: boolean;
}

function DetailPage() {
  // 使用useParams获取路由参数
  const { id } = useParams();
  const [result, setResult] = useState<Result>();
  const [data, setData] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [statusChoice, setStatusChoice] = useState<Choice[]>();
  const [categoryChoice, setCategoryChoice] = useState<Choice[]>();
  const navigate = useNavigate();
  const instance = axios.create({
    // baseURL: "http://localhost:8000",
  });
  const fetchData = async () => {
    try {
      console.log(await getStatus());

      if (id != undefined) {
        //设置detail
        const response_detail = await instance.get(`products/${id}`);
        setResult(response_detail.data);
        setData(response_detail.data.data);
        //设置statusChoice
      }

      const statusData = await getStatus();
      const statusChoice = statusData.map((item: Status) => ({
        label: item.status_name,
        value: item.id,
        disabled: item.id === "0" ? true : false,
      }));
      setStatusChoice(statusChoice);
      //设置categoryChoice
      const categoryData: Category[] = await getCategory();
      const categoryChoice = categoryData.map((item: Category) => ({
        label: item.category_name,
        value: item.id,
        disabled: item.id === "0" ? true : false,
      }));
      setCategoryChoice(categoryChoice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onFinish = async (values: Product) => {
    // Form put action
    try {
      console.log(values);
      const response = await axios.put(`/products/${values.id}`, values);
      message.success("Click on Yes");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };
  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`);
  };
  const confirmDelete = async (e: number) => {
    console.log(e);
    await instance.delete(`/products/${e}`);
    message.success(`成功删除 ${e}`);
    navigate("/products/by_status/0");
    fetchData();
  };

  const cancelDelete = (e: number) => {
    console.log(e);
    message.error(`取消删除 ${e}`);
  };
  return (
    <Spin spinning={loading} tip="Loading...">
      <div>
        {loading ? (
          <div>DetailPage{id}</div>
        ) : (
          <>
            {
              <div style={{ marginLeft: 0 }}>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={{
                    id: data?.id,
                    title: data?.title,
                    description: data?.description,
                    // created_date: dayjs(data?.created_date).format("YYYY-MM-DD"),
                    // .format()会将其转换为字符串，故不可用
                    created_date: dayjs(data?.created_date),
                    last_change: dayjs(data?.last_change),
                    price: data?.price,
                    image: data?.image,
                    valid: String(data?.valid),
                    status: data?.status,
                    category: data?.category,
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className="container"
                >
                  <Form.Item<ProductType> label="编号" name={"id"}>
                    <Popover content={id} title="Id">
                      <Button type="primary">{id}</Button>
                    </Popover>
                  </Form.Item>
                  <Form.Item<ProductType> label="标题" name={"title"}>
                    <Input />
                  </Form.Item>
                  <Form.Item<ProductType> label="价格" name={"price"}>
                    <Input />
                  </Form.Item>
                  <Form.Item<ProductType>
                    label="Description"
                    name={"description"}
                  >
                    <TextArea
                      showCount
                      maxLength={500}
                      onChange={onChange}
                      style={{ height: 220, resize: "none" }}
                    />
                  </Form.Item>
                  <Form.Item<ProductType> label="分类" name={"category"}>
                    <Select
                      style={{ width: 120 }}
                      onChange={onChangeSelect}
                      options={categoryChoice}
                    />
                  </Form.Item>
                  <Form.Item<ProductType> label="产品状态" name={"status"}>
                    <Select
                      style={{ width: 120 }}
                      onChange={onChangeSelect}
                      options={statusChoice}
                    />
                  </Form.Item>
                  <Form.Item<ProductType>
                    label="Created Date"
                    name={"created_date"}
                  >
                    <DatePicker onChange={onChangeDate} />
                  </Form.Item>
                  <Form.Item<ProductType>
                    label="Last change"
                    name={"last_change"}
                  >
                    <DatePicker onChange={onChangeDate} disabled />
                  </Form.Item>
                  <Form.Item<ProductType> label="是否有效" name={"valid"}>
                    <Radio.Group onChange={onChangeRadio}>
                      <Radio.Button value="true">True</Radio.Button>
                      <Radio.Button value="false">False</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  {data && (
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Space>
                        <Button type="primary" htmlType="submit" disabled>
                          提交
                        </Button>
                        <Popconfirm
                          title="删除此产品"
                          description="要删除此产品吗？此操作不可恢复！"
                          onConfirm={() => confirmDelete(data.id)}
                          onCancel={() => cancelDelete(data.id)}
                          okText="确认"
                          cancelText="再想想"
                        >
                          <Button danger disabled>
                            删除
                          </Button>
                        </Popconfirm>
                      </Space>
                    </Form.Item>
                  )}
                </Form>
              </div>
              // data &&
            }
          </>
        )}
      </div>
    </Spin>
  );
}

export default DetailPage;
