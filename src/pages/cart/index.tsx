import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

import axios from "axios";
import { BASE_URL } from "../../providers/config";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Table,
  Typography
} from "antd";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/footer";
import { SizeType } from "antd/es/config-provider/SizeContext";
import CategoryNav from "../categories/categories_nav_bar";
const { Text } = Typography;
import type { ColumnsType } from "antd/es/table";
import { primaryColor } from "../../utilities/colors";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Product",
    dataIndex: "name"
  },
  {
    title: "Quantity",
    dataIndex: "quantity"
  },
  {
    title: "Price",
    dataIndex: "price"
  },
  {
    title: "Actions",

    render: () => {
      return (
        <Button
          onClick={() => {
            console.log("____button this click");
          }}
        >
          Delete
        </Button>
      );
    }
  }
];

export default function Cart() {
  const location = useLocation();
  const category = location?.state || null;
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [size, setSize] = useState<SizeType>("small");

  const handleDelete = (key: React.Key) => {
    const updatedCartItems = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

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

  //products from localstorage fectch here

  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  const fetchProducts = async () => {
    const products = JSON.parse(localStorage.getItem("cartItems") ?? "");

    console.log(products);
    console.log("_____products");
    if (products) {
      setProducts(products);
    } else {
      setProducts([""]);
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category]);

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: "red", width: "100%" }}>
        <CategoryNav categories={categories} />
      </div>

      <div
        style={{
          marginLeft: "11%",
          marginRight: "12%",
          marginTop: "20px",
          marginBottom: "30px"
        }}
      >
        <Card>
          <Row gutter={24}>
            <Col span={14}>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Button
                    type="primary"
                    onClick={start}
                    disabled={!hasSelected}
                    loading={loading}
                  >
                    Reload
                  </Button>
                  <span style={{ marginLeft: 8 }}>
                    {hasSelected
                      ? `Selected ${selectedRowKeys.length} items`
                      : ""}
                  </span>
                </div>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={products}
                />
              </div>
            </Col>
            <Col span={10}>
              <Card>
                <h4>Order Summary</h4>
                <Divider />

                <div>
                  <Row gutter={24}>
                    <Col span={22}>Quantity</Col>
                    <Col span={2}>{totalQuantity}</Col>
                  </Row>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <Row gutter={24}>
                    <Col span={19}>Total Price</Col>
                    <Col span={5} style={{ float: "left" }}>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "TZS"
                      }).format(totalPrice)}
                    </Col>
                  </Row>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Link to={"/"}>
                      <Button
                        type="primary"
                        block
                        style={{ backgroundColor: primaryColor }}
                      >
                        Primary
                      </Button>
                    </Link>
                    <Button block>Default</Button>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <div
        style={{ position: "relative", left: "0", bottom: "0", width: "100%" }}
      >
        <Footer />
      </div>
    </div>
  );
}
