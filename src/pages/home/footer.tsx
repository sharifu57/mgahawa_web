import { Card, Form, Row, Col, Input, Button, Typography, Space } from "antd";
import React, { useState } from "react";
import { primaryColor } from "../../utilities/colors";
import { InstagramOutlined, createFromIconfontCN } from "@ant-design/icons";

const { Text } = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});
const iconSize = 23;

export default function Footer() {
  const [loading, setLoading] = useState(false);
  return (
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
          <Row gutter={24}>
            <Col span={18}>
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
                          rules={[{ required: true, message: "First Name" }]}
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
                          rules={[{ required: true, message: "Last Name" }]}
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
                          rules={[{ required: true, message: "Email" }]}
                        >
                          <Input
                            size="large"
                            type="email"
                            placeholder="Email"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24} style={{ marginBottom: 10 }}>
                      <Col span={12}>
                        <Form.Item
                          label=""
                          name="message"
                          rules={[{ required: true, message: "Email" }]}
                        >
                          <Input.TextArea />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item>
                          <Button
                            style={{ float: "right", width: "100%" }}
                            ghost
                            htmlType="submit"
                            size="large"
                            loading={loading}
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <p>Follow us: @mgahawa</p> 
              <Space>
                <InstagramOutlined  style={{fontSize: iconSize}}/>
                <IconFont type="icon-facebook" style={{ fontSize: iconSize }} />
                <IconFont type="icon-twitter" style={{ fontSize: iconSize }} />
              </Space>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}
