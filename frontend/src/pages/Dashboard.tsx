import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getStatus } from "../utils/info";

interface Status {
  id: string;
  status_name: string;
  count: number;
}

function Dashboard() {
  const [option, setOption] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusData = await getStatus();

        const updatedItems = statusData.map((item: Status) => {
          if (item.id !== "0") {
            return {
              value: item.count,
              name: item.status_name,
            };
          }
        });

        const some_option = {
          title: {
            text: "仪表盘",
            subtext: "产品状态",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: updatedItems,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        setOption(some_option);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {
        <ReactECharts
          style={{ height: "500px", width: "100%" }}
          option={option}
        />
      }
    </>
  );
}

export default Dashboard;
