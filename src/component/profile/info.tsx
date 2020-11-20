import { Col, Row, Tag } from "antd";
import React from "react";
import millify from "millify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  InstagramOutlined,
  LikeOutlined,
  PictureOutlined,
  SolutionOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import moment from "moment";

interface Props {
  user: any;
  setIsStories?: Function | any;
  stories: Array<any>;
}

export function InfoProfile({ user, setIsStories, stories }: Props) {
  const styles: any = {
    biografia: {
      padding: 10,
      fontSize: 18.5,
      fontWeight: 400,
      marginTop: 5,
      border: 2,
      overflow: "hidden",
      borderStyle: "solid",
      borderColor: "#94acc4",
    },
    item_profile: {
      fontSize: 17,
    },
    icon: {
      fontSize: 17,
      color: "#94acc4",
    },
    space: {
      padding: 5,
    },
    updated_at: {
      textAlign: "right",
      padding: 15,
    },
  };

  return (
    <>
      <Row justify="space-around">
        <Col span={3} style={{ textAlign: "center" }}>
          <LazyLoadImage
            alt={user.username}
            height={70}
            effect="blur"
            onClick={() => stories.length && setIsStories(true)}
            src={user.profile_image.medium}
            style={{
              cursor: "pointer",
              border: 3,
              borderStyle: "solid",
              borderColor: stories.length ? "#ed9f19" : "#94acc4",
              borderRadius: "50%",
            }}
          />
          <br />
          <strong>{user.username}</strong>
          <Row justify="space-around" style={{ marginTop: 10 }}>
            {user.instagram_username && (
              <Col xs={22} md={12} style={styles.space}>
                <a
                  href={"https://www.instagram.com/" + user.instagram_username}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramOutlined style={styles.icon} />{" "}
                  <strong>Inst</strong>
                </a>
              </Col>
            )}
            {user.twitter_username && (
              <Col xs={22} md={12} style={styles.space}>
                <a
                  href={"https://twitter.com/" + user.twitter_username}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterOutlined style={styles.icon} /> <strong>Twi</strong>
                </a>
              </Col>
            )}
            <Col xs={22} md={12} style={styles.space}>
              <LikeOutlined style={styles.icon} />{" "}
              <strong>{millify(user.total_likes)}</strong>
            </Col>
            <Col xs={22} md={12} style={styles.space}>
              <PictureOutlined style={styles.icon} />{" "}
              <strong>{millify(user.total_photos)}</strong>
            </Col>
          </Row>
        </Col>
        <Col span={19}>
          <br />
          <Row justify="space-around">
            <Col xs={13} md={6}>
              <span style={styles.item_profile}>
                Publications: <strong>{user.photos.length}</strong>
              </span>
            </Col>
            <Col xs={13} md={6}>
              <span style={styles.item_profile}>
                Followed: <strong>{user.following_count}</strong>
              </span>
            </Col>
            <Col xs={13} md={6}>
              <span style={styles.item_profile}>
                Followers: <strong>{user.followers_count}</strong>
              </span>
            </Col>
            <Col xs={13} md={6}>
              <span style={styles.item_profile}>
                downloads: <strong>{millify(user.downloads)}</strong>
              </span>
            </Col>
            <Col span={20}>
              <p style={styles.biografia}>
                {user.bio ? (
                  <>
                    <SolutionOutlined style={styles.icon} />
                    &nbsp;
                    {user.bio}
                  </>
                ) : (
                  <Tag color="pink">No biografia</Tag>
                )}
                <br />
                <a href={user.portfolio_url} target="_blank" rel="noreferrer">
                  {user.portfolio_url}
                </a>
              </p>
              <span style={styles.updated_at}>
                Usuario desde:{" "}
                <strong>{moment(user.updated_at).format("LLL")}</strong>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
