import { Avatar } from "antd";
import React from "react";

interface Props {
  stories: Array<any>;
}

export function CircleStories({ stories }: Props) {
  const styles: any = {
    container: {
      width: "100%",
      backgroundColor: "#adc0d1",
      display: "flex",
      overflowX: "scroll",
      marginTop: 40,
    },
    circleAvatar: {
      cursor: "pointer",
      border: 2,
      borderStyle: "solid",
      borderColor: "#94acc4",
      borderRadius: "50%",
    },
  };

  return (
    <>
      <div style={styles.container}>
        {[0, 1, 2, 3, 4, 5, 6].map((item) => (
          <div style={{ padding: 10 }} key={item}>
            <Avatar
              size="large"
              style={styles.circleAvatar}
              src={
                stories.length
                  ? stories[0]
                  : "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
