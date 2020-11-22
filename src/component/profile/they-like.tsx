import { Alert, Avatar, List, Spin } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { json, unsplash } from "../../api/unsplash";
import { CardsPlaceholder } from "../loader/cards-placeholder";

interface Props {
  username: string;
}

export function TheyLikes({ username }: Props) {
  const [follow, setFollow] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    limit === 10 && setIsLoading(true);
    unsplash.users
      .likes(username, 1, limit, "latest")
      .then(json)
      .then(async (data) => {
        setFollow([...data]);
        setIsLoading(false);
      });
  }, [limit, username]);

  return (
    <>
      <List itemLayout="horizontal" style={{ padding: 10 }}>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <InfiniteScroll
              style={{ overflow: "hidden" }}
              dataLength={follow.length}
              next={() => setLimit(limit + 10)}
              hasMore={true}
              loader={<CardsPlaceholder isLoading={isLoading} count={3} />}
            >
              {follow.map((item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.user.profile_image.small} />}
                    title={
                      <Link to={`/profile/${item.user.username}`}>
                        {item.user.username}
                      </Link>
                    }
                    description={item.user.bio}
                  />
                </List.Item>
              ))}
            </InfiniteScroll>

            {follow.length === 0 && (
              <Alert
                type="info"
                message="No tienes datos para mostrar aqui..."
              />
            )}
          </>
        )}
      </List>
    </>
  );
}
