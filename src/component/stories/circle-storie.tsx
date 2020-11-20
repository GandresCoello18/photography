import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { json, unsplash } from "../../api/unsplash";
import { StoriesProfile } from "./index";

export function CircleStories() {
  const styles: any = {
    container: {
      width: "100%",
      backgroundColor: "#d0e2f2",
      display: "flex",
      overflowX: "scroll",
      marginTop: 40,
    },
    circleAvatar: {
      cursor: "pointer",
      border: 2,
      borderStyle: "solid",
      borderColor: "#ed9f19",
      borderRadius: "50%",
    },
  };

  const [storieAll, setStoriesAll] = useState<Array<any>>([]);
  const [storieSelect, setStoriesSelect] = useState<Array<any>>([]);
  const [isStories, setIsStories] = useState<boolean>(false);
  const [Username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    unsplash.collections
      .listCollections(1, 20)
      .then(json)
      .then((data) => {
        setStoriesAll(data);
      });
  }, []);

  const ChangeStories = (id: string) => {
    const thisStorie = storieAll.find((item) => item.id === id);
    const source = thisStorie.tags.filter(
      (item: { source: any }) => item.source
    );
    const cover = source.map((item: { source: any }) => item.source);
    setStoriesSelect(cover);
    setUsername(thisStorie.user.username);
    setAvatar(thisStorie.user.profile_image.small);
    setIsStories(true);
  };

  return (
    <>
      <div style={styles.container}>
        {storieAll.map((item) => (
          <div
            style={{ padding: 10 }}
            key={item}
            onClick={() => ChangeStories(item.id)}
          >
            <Avatar
              size="large"
              style={styles.circleAvatar}
              src={item.user.profile_image.small}
            />
          </div>
        ))}
      </div>
      <StoriesProfile
        stories={storieSelect}
        isStories={isStories}
        setIsStories={setIsStories}
        avatar={avatar}
        username={Username}
      />
    </>
  );
}
