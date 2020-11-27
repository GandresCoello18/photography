import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { unsplash, json } from "../api/unsplash";
import { CardContent } from "../component/card/content-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Layout } from "../component/layout";
import { SvgLogo } from "../component/svg/logo";
import { Dispatch, RootState } from "../redux";
import { SetPhotos } from "../redux/modulos/listPhoto";
import { CardsPlaceholder } from "../component/loader/cards-placeholder";
import { CircleStories } from "../component/stories/circle-storie";
import { InputSearch } from "../component/search/input";
import { useDispatch, useSelector } from "react-redux";
import { SelectedPhoto } from "../component/selected/tag-photo";

export function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(15);
  const dispatch: Dispatch = useDispatch();

  const ListPhotos = useSelector((state: RootState) => state.ListPhotos);

  useEffect(() => {
    if (isScroll) {
      if (ListPhotos.photos.length < 50) {
        setIsLoading(true);
        unsplash.photos
          .listPhotos(1, limit, "latest")
          .then(json)
          .then((data) => {
            dispatch(SetPhotos([...ListPhotos.photos, ...data]));
            setIsLoading(false);
          });
      }
    }
  }, [ListPhotos, dispatch, isScroll, limit]);

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
        <Row justify="space-around">
          <Col xs={5} lg={2}>
            <SelectedPhoto title="Of the day" color="success" soruce="daily" />
          </Col>
          <Col xs={5} lg={2}>
            <SelectedPhoto
              title="Of the week"
              color="magenta"
              soruce="weekly"
            />
          </Col>
          <Col xs={5} lg={2}>
            <SelectedPhoto title="Random" color="orange" soruce="random" />
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col xs={23} md={21}>
            <InfiniteScroll
              style={{ overflow: "hidden" }}
              dataLength={ListPhotos.photos.length}
              next={() => {
                setLimit(limit + 5);
                setIsScroll(limit < 50 ? true : false);
              }}
              hasMore={limit < 50 ? true : false}
              loader={
                <CardsPlaceholder
                  isLoading={isLoading ? isLoading : ListPhotos.loading}
                  count={5}
                />
              }
            >
              {ListPhotos.photos.map((photo: any, index: number) => (
                <CardContent
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
            </InfiniteScroll>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
