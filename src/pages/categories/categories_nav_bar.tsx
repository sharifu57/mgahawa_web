import { WhatsAppOutlined } from "@ant-design/icons";
import { Row, Col, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  primaryColor,
  AppfontSize,
  AppFontWeight
} from "../../utilities/colors";

interface LinkStyles {
  isActive: boolean;
  isPending: boolean;
  categories: any[];
}

const styles = ({ isActive, isPending }: LinkStyles) => ({
  color: isActive ? "grey" : "inherit",
  fontSize: AppfontSize,
  fontWeight: AppFontWeight,
  textDecoration: "none"
});

export default function CategoryNav({ categories }: { categories: any[] }) {
  return (
    <div style={{ background: primaryColor, padding: "1px", height: "10%" }}>
      <div style={{ marginLeft: "11%", marginRight: "12%", marginTop: "7px" }}>
        <Row gutter={24} style={{ paddingBottom: 0 }}>
          {categories.map((category) => (
            <Link to={`/view-category/${category.name}`}>
              <Menu
              mode="inline"
              style={{background: 'none'}}
              >
                <Menu.Item >
                  {category.name}
                </Menu.Item>
              </Menu>
            </Link>
          ))}
        </Row>
      </div>
    </div>
  );
}
