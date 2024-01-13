import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getCategory, getInfo, getStatus } from "../utils/info";
import StatisticNumber from "../components/StatisticNumber";

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
interface Info {
  total: number;
  valid: number;
  invalid: number;
}
function Dashboard() {
  const [statusItems, setStatusItems] = useState({});
  const [cateItems, setCateItems] = useState({});
  const [infoItem, setInfoItem] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusData = await getStatus();
        const updatedItems = statusData.map((item: Status) => {
          if (item.id != "0") {
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
        // console.log(updatedItems);

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
        const cateData: Category[] = await getCategory();
        const updatedItems = cateData.map((item: Category) => {
          if (item.id != "0") {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        let updatedItems: any = [];
        await getInfo().then((infoData: Info | null) => {
          if (infoData != null) {
            updatedItems = [
              {
                value: infoData.valid,
                name: "有效",
              },
              {
                value: infoData.invalid,
                name: "无效",
              },
            ];
          }
        });

        const some_option = {
          title: {
            text: "仪表盘",
            subtext: "产品有效",
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

        // console.log(updatedItems);

        setInfoItem(some_option);
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
        <ReactECharts
          style={{ height: "500px", width: "50%" }}
          option={infoItem}
        />
      </div>
      <div>
        <StatisticNumber />
      </div>
    </>
  );
}

export default Dashboard;
