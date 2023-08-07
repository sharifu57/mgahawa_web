import { Row, Col, Card, Avatar } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import categories from ".";
import axios from "axios";
import { BASE_URL } from "../../providers/config";
import { Link } from "react-router-dom";

interface ShowCategoriesProps {
  categories: any[]; // Replace 'any' with the actual type of your category object
}

export default function ShowCategories({ categories }: { categories: any[] }) {
  return (
    <div>
      <Row gutter={24} style={{ paddingBottom: 60 }}>
        {categories.map((category) => (
          <Col span={6} key={category.id}>
            <Link to={`/view-category/${category.name}`}>
              <Card
                style={{ width: 300, marginTop: 30 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                  }
                  title={category.name}
                  description="This is the description"
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
