import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import CategoryNav from "./categories_nav_bar";

import ShowCategories from "./show_categories";
import axios from "axios";
import { BASE_URL } from "../../providers/config";

export default function ViewCategory() {
  const [categories, setCategories] = useState<any[]>([]);

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
    <>
      <Navbar />
      <div style={{ backgroundColor: "red", width: "100%" }}>
        <CategoryNav categories={categories} />
      </div>
    </>
  );
}
