import { EditOutlined, EllipsisOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Card, Col, Row, Skeleton, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../providers/config";
import Meta from "antd/es/card/Meta";

export default function Order() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}orders/`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />
          },
          {
            title: "Orders"
          }
        ]}
      />

      <Space>
        <Row gutter={24} style={{ marginTop: 30 }}>
          {orders.map((order) => (
            <Col span={6}>
              <Card
                style={{ width: 400, marginTop: 16 }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />
                ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                    }
                    title={order.order_number}
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </>
  );
}
