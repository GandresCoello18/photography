import { PictureOutlined } from "@ant-design/icons";
import { Modal, Tag } from "antd";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  title: string;
  soruce: string;
  color: string;
}

export function SelectedPhoto({ title, soruce, color }: Props) {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Tag
        icon={<PictureOutlined />}
        color={color}
        onClick={() => setModal(true)}
      >
        {title}
      </Tag>

      <Modal
        title={title}
        visible={modal}
        footer={false}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <LazyLoadImage
          alt={`photo de: ${title}`}
          height="auto"
          src={`https://source.unsplash.com/${soruce}`}
          effect="blur"
          width="100%"
          loading="lazy"
        />
      </Modal>
    </>
  );
}
