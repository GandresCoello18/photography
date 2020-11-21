import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { unsplash, json } from "../api/unsplash";
import { CardContent } from "../component/card/content-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Layout } from "../component/layout";
import { SvgLogo } from "../component/svg/logo";
import { CardsPlaceholder } from "../component/loader/cards-placeholder";
import { CircleStories } from "../component/stories/circle-storie";
import { InputSearch } from "../component/search/input";

export function HomePage() {
  const [getPhoto, setPhoto] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(15);
  const [hasMore] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    unsplash.photos
      .listPhotos(1, limit, "latest")
      .then(json)
      .then((data) => {
        setPhoto(data);
        setIsLoading(false);
      });
  }, [limit]);

  return (
    <>
      <Layout TitleHead="Home">
        <Row justify="space-around">
          <Col xs={24} lg={12}>
            <SvgLogo />
          </Col>
          <Col xs={24} lg={8} style={{ marginBottom: 14 }}>
            <CircleStories />
          </Col>
          <Col xs={22} lg={13}>
            <InputSearch />
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col xs={23} md={21}>
            <InfiniteScroll
              style={{ overflow: "hidden" }}
              dataLength={getPhoto.length}
              next={() => setLimit(limit + 5)}
              hasMore={hasMore}
              loader={<CardsPlaceholder isLoading={isLoading} count={5} />}
            >
              {getPhoto.map((photo) => (
                <CardContent
                  avatar={photo.user.profile_image.small}
                  created_at={photo.created_at}
                  color={photo.color}
                  username={photo.user.username}
                  liked_by_user={photo.liked_by_user}
                  likes={photo.likes}
                  description={photo.description}
                  title={photo.title}
                  key={photo.id}
                >
                  <LazyLoadImage
                    alt={photo.alt_description}
                    height="auto"
                    src={photo.urls.small}
                    effect="blur"
                    width="100%"
                  />
                </CardContent>
              ))}
            </InfiniteScroll>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
