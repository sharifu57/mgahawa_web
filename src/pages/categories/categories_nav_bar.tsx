import { WhatsAppOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
        <Row gutter={24} style={{ paddingBottom: 60 }}>
          {categories.map((category) => (
            <p key={category.id}>{category.id}</p>
          ))}
        </Row>
      </div>
    </div>
  );
}
