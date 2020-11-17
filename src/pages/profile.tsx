import { Col, Divider, Input, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { unsplash, json } from "../api/unsplash";
import { Layout } from "../component/layout";
import { CardsPlaceholder } from "../component/loader/cards-placeholder";
import { InfoProfile } from "../component/profile/info";
import { PublicationProfile } from "../component/profile/publications";
import { StatisticsProfile } from "../component/profile/statistics";
import { TaggedProfile } from "../component/profile/tagged";
import { SvgLogo } from "../component/svg/logo";

interface Params {
  username: string;
}

export function Profile() {
  const params: Params = useParams();
  const { TabPane } = Tabs;
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { Search } = Input;

  useEffect(() => {
    setIsLoading(true);
    unsplash.users
      .profile(params.username)
      .then(json)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
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
          <Col xs={22} md={13}>
            <Search
              placeholder="Palabras claves"
              loading
              style={{ borderRadius: 50 }}
            />
          </Col>
        </Row>
        <Divider />
        {isLoading ? (
          <CardsPlaceholder isLoading={isLoading} count={1} />
        ) : (
          <>
            <InfoProfile user={user} />

            <Divider />

            <Tabs defaultActiveKey="Publications" centered>
              <TabPane tab="Publications" key="Publications">
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
