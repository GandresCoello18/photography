import {
  InstagramOutlined,
  ShareAltOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Divider, Modal, Row } from "antd";
import React, { useState } from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { json, unsplash } from "../../api/unsplash";

interface Props {
  username: string;
  instagram_user?: string;
  twitter_user?: string;
  download?: string | any;
}

export function ModalFooterCard({
  username,
  instagram_user,
  twitter_user,
  download,
}: Props) {
  const styles = {
    iconCard: {
      fontSize: 23,
      cursor: "pointer",
    },
    icon: {
      fontSize: 20,
      paddingLeft: 10,
      color: "#94acc4",
    },
  };

  const [modal, setModal] = useState<boolean>(false);
  const [ShareUrl, setShareUrl] = useState<string>("");

  const UrlPhoto = (download: string) => {
    unsplash.photos
      .downloadPhoto({ links: { download_location: download } })
      .then(json)
      .then(async (data) => setShareUrl(data.url));
    setModal(true);
  };

  return (
    <>
      <ShareAltOutlined
        onClick={() => UrlPhoto(download)}
        style={styles.iconCard}
      />
      <Modal
        title="Compartir fotografia"
        footer={false}
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <Row justify="space-around">
          <Col xs={22}>
            <h2 style={{ fontWeight: "bold" }}>
              ¡Eh! Recuerda seguir a{" "}
              <a
                href={`https://unsplash.com/${username}`}
                rel="noreferrer"
                target="_blank"
              >
                {username}
              </a>
            </h2>
            <p>
              {instagram_user && (
                <a
                  href={"https://www.instagram.com/" + instagram_user}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramOutlined style={styles.icon} />
                </a>
              )}

              {twitter_user && (
                <a
                  href={"https://twitter.com/" + twitter_user}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterOutlined style={styles.icon} />
                </a>
              )}
            </p>
            <h3>
              Cada vez que sigues a{" "}
              <a
                href={`https://unsplash.com/${username}`}
                rel="noreferrer"
                target="_blank"
              >
                {username}
              </a>{" "}
              o algun otro fotografo en sus redes, el esta contento y orgulloso
              por su trabajo.
            </h3>
            <img
              src="https://www.flaticon.es/svg/static/icons/svg/2654/2654087.svg"
              alt="fotografo"
              height={200}
            />
          </Col>
          <Divider />
          <Col xs={22}>
            <Row justify="space-around">
              <Col xs={6} lg={1}>
                <WhatsappShareButton
                  url={ShareUrl}
                  openShareDialogOnClick={true}
                >
                  <WhatsappIcon size={35} borderRadius={15} />
                </WhatsappShareButton>
              </Col>
              <Col xs={6} lg={1}>
                <FacebookShareButton
                  url={ShareUrl}
                  openShareDialogOnClick={true}
                >
                  <FacebookIcon size={35} borderRadius={15} />
                </FacebookShareButton>
              </Col>

              <Col xs={6} lg={1}>
                <EmailShareButton url={ShareUrl} openShareDialogOnClick={true}>
                  <EmailIcon size={35} borderRadius={15} />
                </EmailShareButton>
              </Col>

              <Col xs={6} lg={1}>
                <TwitterShareButton
                  url={ShareUrl}
                  openShareDialogOnClick={true}
                >
                  <TwitterIcon size={35} borderRadius={15} />
                </TwitterShareButton>
              </Col>

              <Col xs={6} lg={1}>
                <TelegramShareButton
                  url={ShareUrl}
                  openShareDialogOnClick={true}
                >
                  <TelegramIcon size={35} borderRadius={15} />
                </TelegramShareButton>
              </Col>

              <Col xs={6} lg={1}>
                <LinkedinShareButton
                  url={ShareUrl}
                  openShareDialogOnClick={true}
                >
                  <LinkedinIcon size={35} borderRadius={15} />
                </LinkedinShareButton>
              </Col>

              <Col xs={6} lg={1}>
                <TumblrShareButton url={ShareUrl} openShareDialogOnClick={true}>
                  <TumblrIcon size={35} borderRadius={15} />
                </TumblrShareButton>
              </Col>

              <Col xs={6} lg={1}>
                <RedditShareButton url={ShareUrl} openShareDialogOnClick={true}>
                  <RedditIcon size={35} borderRadius={15} />
                </RedditShareButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
