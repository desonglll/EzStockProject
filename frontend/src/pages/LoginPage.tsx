import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const onSubmit = (e: any) => {
  console.log(e.username);
  console.log(e.password);
};

function LoginPage() {
  const instance = axios.create({ withCredentials: true });

  useEffect(() => {}, []);

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="primary" onClick={() => {}}>
              Logout
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default LoginPage;
