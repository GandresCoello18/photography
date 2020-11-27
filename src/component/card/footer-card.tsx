/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { DownloadOutlined, LikeOutlined } from "@ant-design/icons";
import { Col, Divider, message, Row, Tag } from "antd";
import { json, unsplash } from "../../api/unsplash";
import { ModalFooterCard } from "./modal-footer-card";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

interface Props {
  setLikeId?: Function | any;
  id: string;
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
  setLikeId,
  id,
  likes,
  description,
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
    likeIcon: {
      color: "#479ae3",
      fontSize: 23,
      cursor: "pointer",
    },
    enlace: {
      textDecoration: "none",
      color: "#000",
    },
  };

  const [url, setUrl] = useState<string>("");

  const LikesPhotos = useSelector(
    (state: RootState) => state.LikesReducer.LikesPhoto
  );

  const downloadImg = async () => {
    unsplash.photos
      .downloadPhoto({ links: { download_location: download } })
      .then(json)
      .then(async (data) => setUrl(data.url));
  };

  const isLike = (id: string) => {
    return LikesPhotos.find((item: { id: string }) => item.id === id);
  };

  return (
    <>
      <Row justify="space-around" style={styles.space}>
        {id && (
          <Col
            xs={3}
            lg={1}
            onClick={() =>
              isLike(id)
                ? message.info("Ya sabemos que te gusta :D")
                : setLikeId(id)
            }
          >
            <LikeOutlined
              style={isLike(id) ? styles.likeIcon : styles.iconCard}
            />
          </Col>
        )}
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
