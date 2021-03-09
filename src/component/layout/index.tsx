import { Col, Row } from "antd";
import React from "react";
import { Head } from "./head";

interface props {
  children: any;
  TitleHead: string;
}

export function Layout({ children, TitleHead }: props) {
  return (
    <>
      <Head title={TitleHead} />
      <Row justify="center">
        <Col
          xs={24}
          md={10}
          style={{
            backgroundColor: "#fff",
            height: "100vh",
            overflowX: "hidden",
          }}
        >
          {children}
        </Col>
      </Row>
    </>
  );
}
