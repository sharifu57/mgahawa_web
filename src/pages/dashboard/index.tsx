import { Col, Row, Card } from 'antd'
import React from 'react'

export default function Dashboard() {
  return (
    <Row >
        <Col span={6} push={18} style={{background: 'red'}}> 
            col-18 col-push-6
        </Col>
        <Col span={18} pull={6}>
        <Row gutter={24}>
            <Col span={8}>
            <Card title="Card title" bordered={true}>
                Card content
            </Card>
            </Col>
            <Col span={8}>
            <Card title="Card title" bordered={true}>
                Card content
            </Card>
            </Col>
            <Col span={8}>
            <Card title="Card title" bordered={true}>
                Card content
            </Card>
            </Col>
        </Row>
        </Col>
    </Row>
  )
}
