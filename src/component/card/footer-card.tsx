/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  CommentOutlined,
  DownloadOutlined,
  LikeOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row, Tag } from "antd";
import { json, unsplash } from "../../api/unsplash";

interface Props {
  likes: number;
  description: string;
  liked_by_user: boolean;
  title?: string;
  download?: string | any;
}

export function FooterCard({
  likes,
  description,
  liked_by_user,
  title,
  download,
}: Props) {
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

  const [url, setUrl] = useState<string>("");

  const downloadImg = async () => {
    unsplash.photos
      .downloadPhoto({ links: { download_location: download } })
      .then(json)
      .then(async (data) => setUrl(data.url));
  };

  return (
    <>
      <Row justify="space-around" style={styles.space}>
        <Col xs={3} lg={1}>
          {liked_by_user ? (
            <LikeOutlined
              style={{ color: "red", fontSize: 23, cursor: "pointer" }}
            />
          ) : (
            <LikeOutlined style={styles.iconCard} />
          )}
        </Col>
        <Col xs={3} lg={1}>
          <CommentOutlined style={styles.iconCard} />
        </Col>
        <Col xs={3} lg={1}>
          <ShareAltOutlined style={styles.iconCard} />
        </Col>
        {download && (
          <Col xs={14} lg={19}>
            <p style={{ textAlign: "right" }}>
              <a
                style={{ color: "#000" }}
                download
                href={url && url}
                onClick={downloadImg}
                target="_blank"
                rel="noreferrer"
              >
                <DownloadOutlined style={styles.iconCard} />{" "}
              </a>
              &nbsp; &nbsp;
              <SaveOutlined style={styles.iconCard} />
            </p>
          </Col>
        )}
        <Divider />
        <Col span={22}>
          {title && <strong>{title}</strong>}
          {likes !== 0 && (
            <p>
              Le gusta a <b>{likes} personas</b>
            </p>
          )}
          <p>
            {description ? description : <Tag color="pink">No description</Tag>}
          </p>
        </Col>
      </Row>
    </>
  );
}
