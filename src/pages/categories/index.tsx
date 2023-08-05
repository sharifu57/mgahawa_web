import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  HomeOutlined,
  SettingOutlined,
  UploadOutlined
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Space,
  Spin,
  Upload
} from "antd";
import Meta from "antd/es/card/Meta";
import { SizeType } from "antd/es/config-provider/SizeContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../providers/config";

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'

  interface formData {
    title: string;
    description: string;
    file: string;
  }

  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0"
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const [form] = Form.useForm<formData>();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const crateNewCategory = async (values: formData) => {
    setLoading(true);
    console.log(values);

    try {
      const response = await axios.post(`${BASE_URL}create_category/`, values);

      if (response?.status >= 200 && response.status < 300) {
        console.log("____success created");

        setTimeout(() => {
          fetchCategories();
          setOpen(false);
          setLoading(false);
          form.resetFields();
        }, 2000);
      } else {
        <Alert
          message="Error Text"
          showIcon
          description="Error Description Error Description Error Description Error Description"
          type="error"
          action={
            <Button size="small" danger>
              Detail
            </Button>
          }
        />;
      }
    } catch (error) {
      setLoading(false);
      <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
      />;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Row gutter={24}>
        <Col span={22}>
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />
              },
              {
                title: "categories"
              }
            ]}
          />
        </Col>
        <Col span={2}>
          <Space wrap>
            <Button
              icon={<DownloadOutlined />}
              type="primary"
              onClick={showModal}
            >
              New
            </Button>

            <Modal
              title="Add Category"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form<formData>
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={(values) => {
                  console.log(values);
                  crateNewCategory(values);
                }}
              >
                <Form.Item
                  label="Category Name"
                  name="name"
                  rules={[{ required: true, message: "Category Name" }]}
                >
                  <Input
                    size="large"
                    type="text"
                    placeholder="Document Title ...."
                  />
                </Form.Item>

                <Form.Item
                  label="Code"
                  name="code"
                  rules={[{ required: false, message: "Code" }]}
                >
                  <Input
                    size="large"
                    type="text"
                    placeholder="Category Code...."
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ float: "right" }}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        </Col>
      </Row>
      <Space>
        <Row gutter={24} style={{ marginTop: 30 }}>
          {loading ? (
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          ) : (
            categories.map((category) => (
              <Col span={6}>
                <Card
                  style={{ width: 400, marginTop: 16 }}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />
                  ]}
                >
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      avatar={
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                      }
                      title={category.name}
                      description="This is the description"
                    />
                  </Skeleton>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Space>
    </>
  );
}
