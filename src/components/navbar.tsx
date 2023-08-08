import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppFontWeight, AppfontSize, MarginRight } from "../utilities/colors";

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

export default function Navbar() {
  const [storedItems, setStoredItem] = useState<any[]>([]);

  useEffect(() => {

    const dataStored = localStorage.getItem('cartItems')

    console.log("____data stored")
    console.log(dataStored)

    if(dataStored != null){
      const parsedDada = JSON.parse(dataStored)
      setStoredItem(parsedDada)
      console.log("__parsed data")
      console.log(parsedDada)
    }else{
      setStoredItem([])
    }
   
  }, []);

  return (
    <>
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
                  to="/cart"
                  style={styles}
                  className={({ isActive, isPending }) => {
                    return isActive ? "active" : isPending ? "pending" : "";
                  }}
                >
                  <ShoppingCartOutlined style={{ fontSize: 20 }} />
                  <span style={{ fontSize: 10, fontWeight: 600 }}>
                    {storedItems ? storedItems.length : 0}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
