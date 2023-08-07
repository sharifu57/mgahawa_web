import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import CategoryNav from "./categories_nav_bar";

import ShowCategories from "./show_categories";
import axios from "axios";
import { BASE_URL } from "../../providers/config";
import { Breadcrumb, Layout } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";

interface CategoryInt {
  id: number;
  name: string;
}

export default function ViewCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<CategoryInt | null>(
    null
  );
  const { categoryId } = useParams();

  useEffect(() => {});

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

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Layout>
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
              title: categoryDetails ? categoryDetails.name : "Loading..."
            }
          ]}
        />
      </div>

      <div style={{ position: "fixed", left: "0", bottom: "0", width: "100%" }}>
        <Footer />
      </div>
    </Layout>
  );
}
