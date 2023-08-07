import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../providers/config";
import ShowCategories from "./show_categories";
import CategoryNav from "./categories_nav_bar";

export default function CategoryContainer() {
  const [categories, setCategories] = useState<any[]>([]);
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

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <ShowCategories categories={categories} />
      <CategoryNav categories={categories} />
    </>
  );
}
