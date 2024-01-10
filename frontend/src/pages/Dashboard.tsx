import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getCategory, getStatus } from "../utils/info";

interface Status {
  id: string;
  status_name: string;
  count: number;
}
interface Catagory {
  id: string;
  category_name: string;
  count: number;
}
function Dashboard() {
  const [statusItems, setStatusItems] = useState({});
  const [cateItems, setCateItems] = useState({});
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
        setStatusItems(some_option);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cateData = await getCategory();
        const updatedItems = cateData.map((item: Catagory) => {
          if (item.id !== "0") {
            return {
              value: item.count,
              name: item.category_name,
            };
          }
        });

        const some_option = {
          title: {
            text: "仪表盘",
            subtext: "产品分类",
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
        setCateItems(some_option);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <ReactECharts
          style={{ height: "500px", width: "50%" }}
          option={statusItems}
        />
        <ReactECharts
          style={{ height: "500px", width: "50%" }}
          option={cateItems}
        />
      </div>
    </>
  );
}

export default Dashboard;
