import { Col, Divider, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { unsplash, json } from "../api/unsplash";
import { Layout } from "../component/layout";
import { CardsPlaceholder } from "../component/loader/cards-placeholder";
import { InfoProfile } from "../component/profile/info";
import { PublicationProfile } from "../component/profile/publications";
import { StatisticsProfile } from "../component/profile/statistics";
import { TaggedProfile } from "../component/profile/tagged";
import { TheyLikes } from "../component/profile/they-like";
import { StoriesProfile } from "../component/stories";
import { SvgLogo } from "../component/svg/logo";

interface Params {
  username: string;
}

export function Profile() {
  const params: Params = useParams();
  const { TabPane } = Tabs;
  const [user, setUser] = useState<any>();
  const [stories, setStories] = useState<Array<any>>([]);
  const [isStories, setIsStories] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    unsplash.users
      .profile(params.username)
      .then(json)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });

    unsplash.users
      .collections(params.username, 1, 15, "updated")
      .then(json)
      .then((data) => setStories(data));
  }, [params]);

  return (
    <>
      <Layout TitleHead={params.username}>
        <Row justify="space-around">
          <Col xs={24} md={12}>
            <Link to="/">
              <SvgLogo />
            </Link>
          </Col>
        </Row>
        <Divider />
        {isLoading ? (
          <CardsPlaceholder isLoading={isLoading} count={3} />
        ) : (
          <>
            <InfoProfile
              setIsStories={setIsStories}
              user={user}
              stories={stories}
            />
            <StoriesProfile
              avatar={user.profile_image.medium}
              username={user.username}
              isStories={isStories}
              setIsStories={setIsStories}
              stories={stories}
            />

            <Divider />

            <Tabs defaultActiveKey="Publications" centered>
              <TabPane tab="Publications" key="Publications">
                <p style={{ textAlign: "center", padding: 10 }}>
                  Ultimas <strong>3 Publicaciones.</strong>
                </p>
                <PublicationProfile
                  isProfile={true}
                  isLoading={isLoading}
                  avatar={user.profile_image.medium}
                  username={user.username}
                  publication={user.photos}
                />
              </TabPane>
              <TabPane tab="Tagged" key="Tagged">
                <TaggedProfile aggregated={user.tags.aggregated} />
              </TabPane>
              <TabPane tab="They like" key="They-like">
                <TheyLikes username={params.username} />
                <br />
                <br />
              </TabPane>
              <TabPane tab="statistics" key="statistics">
                <StatisticsProfile username={params.username} />
                <br />
                <br />
              </TabPane>
            </Tabs>
          </>
        )}
      </Layout>
    </>
  );
}
