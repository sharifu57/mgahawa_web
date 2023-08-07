import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import CategoryNav from "./categories_nav_bar";

import ShowCategories from "./show_categories";
import axios from "axios";
import { BASE_URL } from "../../providers/config";
import { Breadcrumb, Button, Card, Col, Layout, Row, Typography } from "antd";
import {
  DownloadOutlined,
  HomeOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Meta from "antd/es/card/Meta";
import { address } from "../../providers/config";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { primaryColor } from "../../utilities/colors";
const { Text } = Typography;

interface CategoryInt {
  id: number;
  name: string;
}

export default function ViewCategory() {
  const location = useLocation();
  const category = location?.state || null;
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<CategoryInt | null>(
    null
  );

  const [size, setSize] = useState<SizeType>("small"); // default is 'middle'

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}categories/`);
      if (response.data) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProducts = async (categoryId: any) => {
    try {
      const response = await axios.get(`${BASE_URL}products/${categoryId}/`);
      console.log(`${BASE_URL}products/${categoryId}/`);
      console.log(response.data);
      if (response?.data) {
        setProducts(response.data);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    console.log(`${address}`);
    fetchCategories();
    if (category?.id) {
      getProducts(category.id);
    }
  }, [category]);

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: "red", width: "100%" }}>
        <CategoryNav categories={categories} />
      </div>

      <div style={{ marginLeft: "11%", marginRight: "12%", marginTop: "20px" }}>
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />
            },
            {
              title: category?.name
            }
          ]}
        />

        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Row gutter={24}>
            {products.map((product) => (
              <Col span={6} key={product.id}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      alt={`${address}`}
                      src={`${address}${product.image}`}
                      height={300}
                    />
                  }
                >
                  <Meta title={product.name} description={product.price} />

                  <div style={{ marginTop: "10px" }}>
                    <Row gutter={10} style={{ alignItems: "center" }}>
                      <Col span={4}>
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<MinusOutlined />}
                          size={size}
                          style={{ backgroundColor: primaryColor }}
                        />
                      </Col>
                      <Col span={2}>{product.quantity}</Col>
                      <Col span={4}>
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<PlusOutlined />}
                          size={size}
                          style={{ backgroundColor: primaryColor }}
                        />
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div style={{ position: "fixed", left: "0", bottom: "0", width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
}
