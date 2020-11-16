import React from "react";
import {
  CommentOutlined,
  DownloadOutlined,
  LikeOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row, Tag } from "antd";
const downloadImage = require("download-image");

interface Props {
  Photo: any;
}

export function FooterCard({ Photo }: Props) {
  const styles = {
    space: {
      paddingTop: 13,
      paddingBottom: 13,
    },
    iconCard: {
      fontSize: 23,
      cursor: "pointer",
    },
    enlace: {
      textDecoration: "none",
      color: "#000",
    },
  };

  return (
    <>
      <Row justify="space-around" style={styles.space}>
        <Col xs={3} md={1}>
          {Photo.liked_by_user ? (
            <LikeOutlined
              style={{ color: "red", fontSize: 23, cursor: "pointer" }}
            />
          ) : (
            <LikeOutlined style={styles.iconCard} />
          )}
        </Col>
        <Col xs={3} md={1}>
          <CommentOutlined style={styles.iconCard} />
        </Col>
        <Col xs={3} md={1}>
          <ShareAltOutlined style={styles.iconCard} />
        </Col>
        <Col xs={14} md={19}>
          <p style={{ textAlign: "right" }}>
            <span
              onClick={() => downloadImage(Photo.urls.small, `./image.jpg`)}
            >
              <DownloadOutlined style={styles.iconCard} />{" "}
            </span>
            &nbsp; &nbsp;
            <SaveOutlined style={styles.iconCard} />
          </p>
        </Col>
        <Divider />
        <Col span={22}>
          {Photo.likes !== 0 && (
            <p>
              Le gusta a <b>{Photo.likes} personas</b>
            </p>
          )}
          <p>
            {Photo.description ? (
              Photo.description
            ) : (
              <Tag color="pink">No description</Tag>
            )}
          </p>
        </Col>
      </Row>
    </>
  );
}
