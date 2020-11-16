import { Avatar, Col, Row } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  avatar: string;
  created_at?: string;
  username: string;
  color?: string;
}

export function HeadCard({ avatar, created_at, username, color }: Props) {
  const styles = {
    space: {
      paddingTop: 13,
      paddingBottom: 13,
    },
    enlace: {
      textDecoration: "none",
      color: "#000",
    },
  };

  return (
    <>
      <Row justify="space-around" style={styles.space}>
        <Col span={14}>
          <Avatar
            style={{
              border: 2,
              borderStyle: "solid",
              borderColor: color ? color : "#94acc4",
            }}
            src={avatar}
          />
          &nbsp; &nbsp;
          <Link to={`/profile/${username}`} style={styles.enlace}>
            <strong>{username}</strong>
          </Link>
        </Col>
        <Col span={8}>
          <span style={{ color: "#696969" }}>
            {created_at && moment(created_at).format("LLL")}
          </span>
        </Col>
      </Row>
    </>
  );
}
