import React, { Fragment, useEffect, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";
interface Status {
  count: number;
  status: string;
}
interface Info {
  total: number;
  status_info: Status[];
}
interface Result {
  code: number;
  message: string;
  data: Info;
}
function Dashboard() {
  const [result, setResult] = useState<Result>();
  const [status, setStatus] = useState<Status>();
  const [statusinfo, setStatusinfo] = useState<Info>();
  useEffect(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8000/",
    });
    const fetchData = async () => {
      try {
        const res = await instance.get("/products/info/");
        setResult(res.data);
        const statusInfo = res.data.data[1].status_info;
        setStatusinfo(statusInfo);
        const statusValues = statusInfo.map((info: Status) => info.status);
        setStatus(statusValues);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("main"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: statusInfo.map((info: Status) => info.status),
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: statusInfo.map((info: Status) => info.count),
            },
          ],
        });
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <div id="main" style={{ width: "100%", height: "400px" }} />
      <div>DashBoard</div>
    </Fragment>
  );
}

export default Dashboard;
