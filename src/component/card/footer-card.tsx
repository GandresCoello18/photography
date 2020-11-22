/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  DownloadOutlined,
  LikeOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row, Tag } from "antd";
import { json, unsplash } from "../../api/unsplash";
import { ModalFooterCard } from "./modal-footer-card";

interface Props {
  likes: number;
  description: string;
  liked_by_user: boolean;
  title?: string;
  download?: string | any;
  username: string;
  instagram_user?: string;
  twitter_user?: string;
}

export function FooterCard({
  likes,
  description,
  liked_by_user,
  title,
  download,
  username,
  instagram_user,
  twitter_user,
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
          {download && (
            <ModalFooterCard
              username={username}
              instagram_user={instagram_user}
              twitter_user={twitter_user}
              download={download}
            />
          )}
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
