import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

import axios from "axios";
import { BASE_URL } from "../../providers/config";
import {
  Typography
} from "antd";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer";
import { SizeType } from "antd/es/config-provider/SizeContext";
import CategoryNav from "../categories/categories_nav_bar";
const { Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


export default function Payment() {
  const location = useLocation();
  const category = location?.state || null;
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [size, setSize] = useState<SizeType>("small");


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
        <div style={{marginTop: "20px", marginBottom: "20px"}}>

        </div>
      <div
        style={{ position: "relative", left: "0", bottom: "0", width: "100%" }}
      >
        <Footer />
      </div>
    </div>
  );
}
