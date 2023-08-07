import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography
} from "antd";
import {
  AppFontWeight,
  AppfontSize,
  MarginRight,
  primaryColor
} from "../../utilities/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../providers/config";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  WhatsAppOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import { Link, NavLink } from "react-router-dom";
import Footer from "./footer";
import ShowCategories from "../categories/show";
import Banner from "./banner";

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
      <Card
        bordered={false}
        style={{
          background: "white",
          borderRadius: "0",
          borderBottomColor: "grey"
        }}
      >
        <div style={{ marginLeft: "10%", marginRight: "11%" }}>
          <div style={{ float: "left" }}>
            <p>LOgo</p>
          </div>

          <div style={{ float: "right", justifyContent: "flex-end" }}>
            <ul style={{ display: "flex", float: "right", listStyle: "none" }}>
              <li style={{ marginLeft: MarginRight }}>
                <NavLink
                  to="/one"
                  style={styles}
                  className={({ isActive, isPending }) => {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  HOME
                </NavLink>
              </li>

              <li style={{ marginLeft: MarginRight }}>
                <NavLink
                  to="/one"
                  style={styles}
                  className={({ isActive, isPending }) => {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  ABOUT US
                </NavLink>
              </li>

              <li style={{ marginLeft: MarginRight }}>
                <NavLink
                  to="/one"
                  style={styles}
                  className={({ isActive, isPending }) => {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  PRODUCTS
                </NavLink>
              </li>

              <li style={{ marginLeft: MarginRight }}>
                <NavLink
                  to="/one"
                  style={styles}
                  className={({ isActive, isPending }) => {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  <ShoppingCartOutlined  style={{fontSize: 20}}/>
                  <span style={{fontSize: 10, fontWeight: 600}}>40</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </Card>

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

          <ShowCategories />
        </div>
      </div>

      <Footer />
    </>
  );
}
