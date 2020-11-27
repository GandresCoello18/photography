import { Col, Pagination, Row } from "antd";
import React, { useState, useEffect } from "react";
import { Layout } from "../component/layout";
import { CardsPlaceholder } from "../component/loader/cards-placeholder";
import { CardContent } from "../component/card/content-card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../redux";
import { Link, useHistory } from "react-router-dom";
import { SvgLogo } from "../component/svg/logo";
import { CircleStories } from "../component/stories/circle-storie";
import { InputSearch } from "../component/search/input";
import { json, unsplash } from "../api/unsplash";
import { SetSearch } from "../redux/modulos/search";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const SearchReducer = useSelector((state: RootState) => state.SearchReducer);
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (SearchReducer.results.length === 0) {
      history.push("/");
    }

    if (!SearchReducer.loading) {
      setIsLoading(false);
    }
  }, [SearchReducer, history]);

  const paginationSearch = async (page: number) => {
    setIsSearch(true);
    unsplash.search
      .photos(SearchReducer.search, page, 10, { orientation: "portrait" })
      .then(json)
      .then((data) => {
        setIsSearch(false);
        if (data.total) {
          dispatch(SetSearch({ ...data }));
        }
      });
  };

  return (
    <>
      <Layout TitleHead="Search">
        <Row justify="space-around">
          <Col xs={24} lg={12}>
            <Link to="/">
              <SvgLogo />
            </Link>
          </Col>
          <Col xs={24} lg={8} style={{ marginBottom: 14 }}>
            <CircleStories />
          </Col>
          <Col xs={22} lg={13}>
            <InputSearch />
          </Col>
        </Row>
        <br />
        <h3 style={{ textAlign: "center", padding: 10 }}>
          Se encontraron <strong>{SearchReducer.total}</strong> resultados de:{" "}
          <strong>{SearchReducer.search}</strong>
        </h3>
        <Row justify="center">
          <Col xs={23} md={21}>
            {SearchReducer.loading && (
              <CardsPlaceholder count={8} isLoading={isLoading} />
            )}
            {isSearch ? (
              <CardsPlaceholder count={8} isLoading={isSearch} />
            ) : (
              SearchReducer.results.map((photo: any) => (
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
              ))
            )}
          </Col>
          <Col xs={22} md={10}>
            <Pagination
              onChange={paginationSearch}
              defaultCurrent={SearchReducer.page ? SearchReducer.page : 1}
              total={SearchReducer.total_pages * 10}
            />
          </Col>
          <br />
          <br />
          <br />
          <br />
        </Row>
      </Layout>
    </>
  );
}
