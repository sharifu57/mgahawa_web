import { Col, Row, Card } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const [categories, setCategories] = useState<any[]>([]);
  const BASE_URL = "http://10.1.30.110:8003/api/v1/";

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}categories/`
      );
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
      <Row>
        <Col span={6} push={18} style={{ background: "red" }}>
          col-18 col-push-6
        </Col>
        <Col span={18} pull={6}>
          <Row gutter={24}>
            <Col span={8}>
              <Card title="Orders" bordered={true}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Customers" bordered={true}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Income" bordered={true}>
                Card content
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <div>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
