import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import CategoryNav from "./categories_nav_bar";

import ShowCategories from "./show_categories";
import axios from "axios";
import { BASE_URL } from "../../providers/config";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Layout,
  Row,
  Typography,
  notification
} from "antd";
import {
  DownloadOutlined,
  HomeOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Meta from "antd/es/card/Meta";
import { address } from "../../providers/config";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { primaryColor, secondaryColor } from "../../utilities/colors";
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

  const [cartItems, setCartItems] = useState<any[]>([]);
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

      if (response?.data) {
        setProducts(response.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handleDecreaseQuantity = (product: any) => {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: Math.max(p.quantity - 1, 0) };
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const handleIncreateQuantity = (product: any) => {
    const updatedProducts = products.map((p) => {
      if (p.id == product.id) {
        return { ...p, quantity: Math.max(p.quantity + 1) };
      }
      return p;
    });

    setProducts(updatedProducts);
  };

  const handleAddtoCart = (product: any) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatesCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatesCartItems);
      updateLocalStorage(updatesCartItems);

      console.log("____updated cart");
      console.log(updatesCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      updateLocalStorage(setCartItems);
    }
  };

  const updateLocalStorage = (cartItems: any) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
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
          {products.length === 0 ? (
            <p>No Products available</p>
          ) : (
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

                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <Row gutter={10} style={{ alignItems: "center" }}>
                        <Col span={4}>
                          <Button
                            onClick={() => handleDecreaseQuantity(product)}
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
                            onClick={() => handleIncreateQuantity(product)}
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            size={size}
                            style={{ backgroundColor: primaryColor }}
                          />
                        </Col>
                      </Row>
                    </div>

                    <Link
                      to={"#"}
                      style={{ marginTop: "20px" }}
                      onClick={() => handleAddtoCart(product)}
                    >
                      <div
                        style={{
                          backgroundColor: primaryColor,
                          borderRadius: "35px"
                        }}
                      >
                        <div style={{ padding: 1 }}>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "10px",
                              color: secondaryColor
                            }}
                          >
                            Add to Cart
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>

      <div
        style={{ position: "relative", left: "0", bottom: "0", width: "100%" }}
      >
        <Footer />
      </div>
    </div>
  );
}
