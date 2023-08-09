import { Col, Divider, Row, Typography } from "antd";
import {
  AppFontWeight,
  AppfontSize,
  primaryColor
} from "../../utilities/colors";
import { useEffect, useState } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Footer from "../../components/footer";
import Banner from "./banner";
import Navbar from "../../components/navbar";
import ShowCategories from "../categories/show_categories";
import { fetchCategories } from "../categories/categories_utils";

const { Text } = Typography;

interface LinkStyles {
  isActive: boolean;
  isPending: boolean;
}

const styles = ({ isActive, isPending }: LinkStyles) => ({
  color: isActive ? "grey" : "inherit",
  fontSize: AppfontSize,
  fontWeight: AppFontWeight,
  textDecoration: "none"
});

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    fetchCategoriesData();
  });

  return (
    <>
      <div style={{ background: primaryColor, padding: "1px", height: "10%" }}>
        <div
          style={{ marginLeft: "11%", marginRight: "12%", marginTop: "7px" }}
        >
          <ul style={{ display: "flex", float: "right", listStyle: "none" }}>
            <li style={{ marginLeft: 10 }}>
              <NavLink
                to="/one"
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? "grey" : "white",
                    fontSize: AppfontSize,
                    fontWeight: AppFontWeight,
                    textDecoration: "none"
                  };
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? "active" : isPending ? "pending" : "";
                }}
              >
                Contact Us
              </NavLink>
            </li>

            <li style={{ marginLeft: 10 }}>
              <NavLink
                to="/one"
                style={styles}
                className={({ isActive, isPending }) => {
                  return isActive ? "active" : isPending ? "pending" : "";
                }}
              >
                Help
              </NavLink>
            </li>
          </ul>
          <Row>
            <Col>
              <WhatsAppOutlined style={{ color: "white" }} />
            </Col>
            <Col>
              <p style={{ color: "white", marginLeft: "5px" }}>
                +255 657 871 769
              </p>
            </Col>
          </Row>
        </div>
      </div>

      <Navbar />
      <div
        style={{
          marginTop: 30,
          maxWidth: "100%"
        }}
      >
        <div style={{ height: "40vh" }}>
          <Banner />
        </div>

        <div style={{ marginLeft: "11%", marginRight: "11%" }}>
          <div>
            <Row gutter={24}>
              <Col span={2}>
                <Text
                  style={{
                    backgroundColor: primaryColor,
                    padding: 10,
                    borderRadius: 20,
                    color: "white",
                    fontWeight: "400px"
                  }}
                >
                  Categories
                </Text>
              </Col>
              <Col span={20} push={2}>
                <Divider />
              </Col>
            </Row>
          </div>

          <ShowCategories categories={categories} />
        </div>
      </div>

      <Footer />
    </>
  );
}
