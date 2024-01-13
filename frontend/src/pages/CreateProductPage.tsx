import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Spin,
  TimePicker,
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
  const [loading, setLoading] = useState(true);
  const [statusChoice, setStatusChoice] = useState<Choice[]>();
  const [categoryChoice, setCategoryChoice] = useState<Choice[]>();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      console.log(await getStatus());
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
      values.last_change = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const response = await axios.post(`/products/`, values);
      message.success("Click on Yes");
      // navigate to list page after submit
      navigate("/products/by_status/0");
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

  return (
    <Spin spinning={loading} tip="Loading...">
      {loading ? (
        <div>DetailPage{id}</div>
      ) : (
        <>
          {
            <div style={{ marginLeft: 0 }}>
              <Form
                name="wrap"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                  description: "Coming soon",
                  created_date: dayjs(),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="container"
              >
                <Form.Item<ProductType>
                  label="标题"
                  name={"title"}
                  rules={[{ required: true, message: "请输入标题" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<ProductType>
                  label="价格"
                  name={"price"}
                  rules={[{ required: true, message: "请输入价格" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<ProductType>
                  label="Description"
                  name={"description"}
                  rules={[{ required: true, message: "请输入描述" }]}
                >
                  <TextArea
                    showCount
                    maxLength={500}
                    onChange={onChange}
                    style={{ height: 220, resize: "none" }}
                  />
                </Form.Item>
                <Form.Item<ProductType>
                  label="分类"
                  name={"category"}
                  rules={[{ required: true, message: "请选择分类" }]}
                >
                  <Select
                    style={{ width: 120 }}
                    onChange={onChangeSelect}
                    options={categoryChoice}
                  />
                </Form.Item>
                <Form.Item<ProductType>
                  label="产品状态"
                  name={"status"}
                  rules={[{ required: true, message: "请选择状态" }]}
                >
                  <Select
                    style={{ width: 120 }}
                    onChange={onChangeSelect}
                    options={statusChoice}
                  />
                </Form.Item>
                <Form.Item<ProductType>
                  label="Created Date"
                  name={"created_date"}
                  rules={[{ required: true, message: "请选择创建时间" }]}
                >
                  <DatePicker onChange={onChangeDate} />
                </Form.Item>

                <Form.Item<ProductType>
                  label="是否有效"
                  name={"valid"}
                  rules={[{ required: true, message: "请选择是否有效" }]}
                >
                  <Radio.Group onChange={onChangeRadio}>
                    <Radio.Button value="true">True</Radio.Button>
                    <Radio.Button value="false">False</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                {
                  <Form.Item
                    wrapperCol={{ offset: 8, span: 16 }}
                    rules={[{ required: true }]}
                  >
                    <Space>
                      <Button type="primary" htmlType="submit">
                        提交
                      </Button>
                    </Space>
                  </Form.Item>
                }
              </Form>
            </div>
            // data &&
          }
        </>
      )}
    </Spin>
  );
}

export default DetailPage;
