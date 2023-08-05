import { Avatar, Card, Col, Divider, Form, Input, Row, Typography } from "antd";
import { primaryColor } from "../../utilities/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../providers/config";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const { Text } = Typography;

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}categories/`);

      if (response) {
        console.log("__data");
        setCategories(response.data);
      } else {
        setCategories([""]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategory = () => {
    console.log("_____this is category");
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div style={{ background: "blue", padding: "10px" }}>
        <p>hello</p>
      </div>
      <Card
        bordered={false}
        style={{
          background: "white",
          borderRadius: "0",
          borderBottomColor: "grey"
        }}
      >
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <div style={{ float: "left" }}>
            <p>LOgo</p>
          </div>

          <div style={{ float: "right", justifyContent: "flex-end" }}>
            {/* <Menu style={{ display: "flex" }}>
            <Menu.Item>Cart</Menu.Item>
              <Menu.Item>Login</Menu.Item>
            </Menu> */}

            <ul style={{ display: "flex" }}>
              <li>One</li>
            </ul>
          </div>
        </div>
      </Card>
      <div style={{ background: "red" }}>
        <div style={{ marginLeft: "11%", marginRight: "11%" }}>
          <div style={{ float: "right" }}>
            <p>one</p>
          </div>
          <div style={{ float: "left" }}>
            <p>end</p>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          marginTop: 30,
          maxWidth: "100%"
        }}
      >
        <div style={{ height: "40vh" }}>
          <p>bunner</p>
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

          <div>
            <Row gutter={24} style={{ paddingBottom: 60 }}>
              {categories.map((category) => (
                <Col span={6} key={category.id}>
                  <Card
                    onClick={handleCategory}
                    style={{ width: 300, marginTop: 30 }}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                      }
                      title={category.name}
                      description="This is the description"
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <Card
          bordered={false}
          style={{
            background: "white",
            borderRadius: "0",
            backgroundColor: primaryColor
          }}
        >
          <div style={{ marginLeft: "10%", marginRight: "10%" }}>
            <div>
              <Text style={{ color: "white" }}>
                Tuma Maoni yako kwenye barua pepe hii
              </Text>

              <div style={{ marginTop: 20 }}>
                <Form>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Form.Item
                        label=""
                        name="name"
                        rules={[{ required: true, message: "Category Name" }]}
                      >
                        <Input
                          size="large"
                          type="text"
                          placeholder="First Name"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label=""
                        name="name"
                        rules={[{ required: true, message: "Category Name" }]}
                      >
                        <Input
                          size="large"
                          type="text"
                          placeholder="Last Name"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        label=""
                        name="name"
                        rules={[{ required: true, message: "Category Name" }]}
                      >
                        <Input size="large" type="email" placeholder="Email" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
