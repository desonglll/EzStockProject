import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Col, Row, Statistic } from "antd";
import { getInfo } from "../utils/info";

const formatter = (value: number) => <CountUp end={value} separator="," />;
interface Info {
  total: number;
  valid: number;
  invalid: number;
}
function StatisticNumber() {
  const [infoItem, setInfoItem] = useState({});
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getInfo().then((infoData: Info | null) => {
          if (infoData != null) {
            setTotal(infoData.total);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Active Users" value={total} formatter={formatter} />
      </Col>
      <Col span={12}>
        <Statistic
          title="Account Balance (CNY)"
          value={total}
          precision={1}
          formatter={formatter}
        />
      </Col>
    </Row>
  );
}

export default StatisticNumber;
