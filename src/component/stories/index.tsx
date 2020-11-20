import { LikeOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Spin, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import Stories from "react-insta-stories";

interface Props {
  stories: Array<any>;
  isStories: boolean;
  setIsStories: Function;
  avatar: string;
  username: string;
}

interface Storie {
  url: string;
  duration: number;
  seeMore: Function;
}

export function StoriesProfile({
  stories,
  isStories,
  setIsStories,
  avatar,
  username,
}: Props) {
  const styles: any = {
    seeMore: {
      backgroundColor: "rgba(0,0,0,0.4)",
      color: "#fff",
      padding: 17,
      height: "100%",
    },
    MoreContent: {
      position: "absolute",
      bottom: 10,
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: Array<Storie> = [];
  if (isStories) {
    // eslint-disable-next-line array-callback-return
    stories.map((item) => {
      return data.push({
        url: item.cover_photo.urls.small,
        duration: 6000,
        seeMore: ({ close }: any) => {
          return (
            <div onClick={close} style={styles.seeMore}>
              <div style={styles.MoreContent}>
                {item.description ? (
                  item.description
                ) : (
                  <Tag color="pink">No description</Tag>
                )}
                <Row justify="space-around">
                  <Col span={7}>
                    <LikeOutlined
                      style={{
                        cursor: "pointer",
                        color: item.cover_photo.liked_by_user
                          ? "#84a4b4"
                          : "#fff",
                      }}
                    />{" "}
                    <strong>{item.cover_photo.likes}</strong>
                  </Col>
                </Row>
              </div>
            </div>
          );
        },
      });
    });
    console.log(stories);
  }

  return (
    <>
      {data.length ? (
        <Modal
          title={
            <>
              <Avatar src={avatar} size="small" />
              &nbsp; &nbsp;
              <strong>{username}</strong>
            </>
          }
          visible={isStories}
          footer={false}
          onOk={() => setIsStories(false)}
          onCancel={() => setIsStories(false)}
        >
          <Row justify="center">
            <Col>
              <Stories
                stories={data}
                defaultInterval={1500}
                loader={<Spin size="large" />}
                storyStyles={{}}
                onAllStoriesEnd={() => setIsStories(false)}
              />
            </Col>
          </Row>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
