import React, { useEffect, useState } from "react";
import { unsplash, json } from "../api/unsplash";
import Cookies from "js-cookie";
import { Alert, Button, Col, Divider, message, Row, Tabs } from "antd";
import { Layout } from "../component/layout";
import { SvgLogo } from "../component/svg/logo";
import { InputSearch } from "../component/search/input";
import { InfoProfile } from "../component/profile/info";
import { CardsPlaceholder } from "../component/loader/cards-placeholder";
import { PublicationProfile } from "../component/profile/publications";
import { StatisticsProfile } from "../component/profile/statistics";
import { Link } from "react-router-dom";

export function MeProfile() {
  const [meProfile, setMeProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { TabPane } = Tabs;

  useEffect(() => {
    if (Cookies.get("code-access")) {
      setIsLoading(true);
      unsplash.currentUser
        .profile()
        .then(json)
        .then((data) => {
          setMeProfile(data);
          setIsLoading(false);
        })
        .catch((error) => message.error(error.message));
    }
  }, []);

  const singIn = () => {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      "public",
      "read_user",
      "write_user",
      "read_photos",
      "write_photos",
      "write_likes",
      "write_followers",
      "read_collections",
      "write_collections",
    ]);

    // eslint-disable-next-line no-restricted-globals
    location.assign(authenticationUrl);
  };

  return (
    <>
      <Layout TitleHead="Mi Perfil">
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
        {Cookies.get("code-access") ? (
          isLoading ? (
            <CardsPlaceholder isLoading={isLoading} count={3} />
          ) : (
            meProfile && (
              <>
                <InfoProfile user={meProfile} stories={[]} />

                <Divider />

                <Tabs defaultActiveKey="Publications" centered>
                  <TabPane tab="Publications" key="Publications">
                    <PublicationProfile
                      isProfile={true}
                      isLoading={isLoading}
                      avatar={meProfile.profile_image.medium}
                      username={meProfile.username}
                      publication={meProfile.photos}
                    />
                  </TabPane>
                  <TabPane tab="statistics" key="statistics">
                    <StatisticsProfile username={meProfile.username} />
                    <br />
                    <br />
                  </TabPane>
                </Tabs>
              </>
            )
          )
        ) : (
          <Row justify="center">
            <Col xs={22} md={13}>
              <Alert
                message="Necesitas autorizacion por parte de Unsplash"
                description={
                  <>
                    Inicia session para
                    <ul>
                      <li>Ver este perfil (por defecto perfil del autor).</li>
                      <li>Ver estadisticas</li>
                    </ul>
                  </>
                }
                type="info"
                showIcon
              />
              <br />
              <Button type="primary" onClick={singIn}>
                Iniciar Session
              </Button>
            </Col>
          </Row>
        )}
      </Layout>
    </>
  );
}
