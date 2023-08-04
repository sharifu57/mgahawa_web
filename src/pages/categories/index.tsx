import {
  DownloadOutlined,
  HomeOutlined,
  PlusCircleFilled,
  UserOutlined
} from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Row, Space } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState<any[]>([]);
  const BASE_URL = "http://10.1.30.110:8003/api/v1/";
  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'

  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0"
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    console.log("_____first");
    console.log(`${BASE_URL}categories`);
    fetchCategories();
  }, []);

  return (
    <>
      <Row gutter={24}>
        <Col span={22}>
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />
              },
              {
                title: "categories"
              }
            ]}
          />
        </Col>
        <Col span={2}>
          <Space wrap>
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleFilled />}
              size={size}
            >
              New
            </Button>
          </Space>
        </Col>
      </Row>
      <Space>
        <Row gutter={24} style={{ marginTop: 30 }}>
          {categories.map((category) => (
            <Col span={6}>
              <Card bordered={true} style={{ width: 400 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </>
  );
}
