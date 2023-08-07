import axios from "axios";
import { BASE_URL } from "../../providers/config";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}categories/`);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
