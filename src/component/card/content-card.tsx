import { Col, Row } from "antd";
import React from "react";
import { HeadCard } from "../card/head-card";
import { FooterCard } from "../card/footer-card";
interface Props {
  Photo?: any;
  children: any;
  avatar: string;
  created_at?: string;
  color?: string;
  username: string;
  isProfile?: boolean;
  likes?: number | any;
  description?: string | any;
  liked_by_user?: boolean | any;
  title?: string | any;
}

export function CardContent({
  children,
  avatar,
  created_at,
  color,
  username,
  isProfile,
  liked_by_user,
  likes,
  description,
  title,
}: Props) {
  const styles = {
    card: {
      border: 2,
      borderStyle: "solid",
      width: "100%",
      borderColor: "#cdcdcd",
      padding: 5,
      marginBottom: 50,
    },
  };

  return (
    <>
      <div style={styles.card}>
        <HeadCard
          avatar={avatar}
          created_at={created_at}
          color={color}
          username={username}
        />
        <Row justify="center">
          <Col span={24}>{children}</Col>
        </Row>
        {!isProfile && (
          <FooterCard
            likes={likes}
            liked_by_user={liked_by_user}
            description={description}
            title={title}
          />
        )}
      </div>
    </>
  );
}
