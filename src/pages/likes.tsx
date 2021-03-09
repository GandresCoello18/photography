import { Alert, Col, Result, Row } from "antd";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CardContent } from "../component/card/content-card";
import { Layout } from "../component/layout";
import { InputSearch } from "../component/search/input";
import { SvgLogo } from "../component/svg/logo";
import { RootState } from "../redux";

export default function LikesPage() {
  const likesReducer = useSelector(
    (state: RootState) => state.LikesReducer.LikesPhoto
  );

  return (
    <>
      <Layout TitleHead="Likes">
        <Row justify="space-around">
          <Col xs={24} lg={12}>
            <Link to="/">
              <SvgLogo />
            </Link>
          </Col>
          <Col xs={22} lg={13}>
            <InputSearch />
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col xs={23} md={21}>
            {likesReducer.map((photo: any, index: number) => (
              <CardContent
                id={""}
                avatar={photo.user.profile_image.small}
                created_at={photo.created_at}
                color={photo.color}
                username={photo.user.username}
                liked_by_user={photo.liked_by_user}
                likes={photo.likes}
                description={photo.description}
                title={photo.title}
                key={index}
                download={photo.links.download}
                instagram_user={photo.user.instagram_username}
                twitter_user={photo.user.twitter_username}
              >
                <LazyLoadImage
                  alt={photo.alt_description}
                  height="auto"
                  src={photo.urls.small}
                  effect="blur"
                  width="100%"
                  loading="lazy"
                />
              </CardContent>
            ))}
            {likesReducer.length === 0 && (
              <>
                <Result title="At the moment you don't like any pictures." />
              </>
            )}
          </Col>
        </Row>
      </Layout>
    </>
  );
}
