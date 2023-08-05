import { Col, Row, Card } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../providers/config";

export default function Dashboard() {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}categories/`
      );

      if (response){
        setCategories(response.data);
      }else{
        setCategories([''])
      }
      
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
        
        <Col span={18} >
          <Row gutter={24}>
            <Col span={8}>
              <Card title={categories.length} bordered={true}>
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

        <Col span={6}>
          <Card>

          </Card>
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
