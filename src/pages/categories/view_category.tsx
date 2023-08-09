import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import CategoryNav from "./categories_nav_bar";
import axios from "axios";
import { BASE_URL } from "../../providers/config";
import { Breadcrumb, Button, Card, Col, Row, Typography } from "antd";
import {
  DownloadOutlined,
  HomeOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import Footer from "../../components/footer";
import Meta from "antd/es/card/Meta";
import { address } from "../../providers/config";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { primaryColor, secondaryColor } from "../../utilities/colors";
import { useLocation } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);

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
      if (p.id === product.id) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });

    setProducts(updatedProducts);
  };

  const handleAddtoCart = async (product: any) => {
    console.log("___add to cart");
    setLoading(true);

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((p) => {
        if (p.id === product.id) {
          return { ...p, loading: true };
        }
        return p;
      });
      return updatedProducts;
    });

    try {
      const existingCartItem = cartItems.find((item) => item.id === product.id);

      if (existingCartItem) {
        console.log("___existing items");
        console.log(existingCartItem);
        const updatesCartItems = cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatesCartItems);
        updateLocalStorage(updatesCartItems);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
        updateLocalStorage([...cartItems, { ...product, quantity: 1 }]);
      }

      setTimeout(() => {
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((p) => {
            if (p.id === product.id) {
              return { ...p, loading: false };
            }
            return p;
          });
          return updatedProducts;
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setLoading(false);
    }
  };

  const updateLocalStorage = (cartItems: any) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('cartItems')?? "")
    console.log("____get from ls")
    console.log(ls)

    
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

                    <div
                      onClick={() => handleAddtoCart(product)}
                      style={{
                        backgroundColor: primaryColor,
                        borderRadius: "40px",
                        padding: 1,
                        cursor: product.loading ? "not-allowed" : "pointer"
                      }}
                    >
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                          color: secondaryColor
                        }}
                      >
                        {product.loading ? "adding...." : "Add to Cart"}
                      </p>
                    </div>
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
