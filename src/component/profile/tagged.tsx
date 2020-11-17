import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CardContent } from "../card/content-card";

interface Props {
  aggregated: Array<any>;
}

export function TaggedProfile({ aggregated }: Props) {
  return (
    <>
      {aggregated
        .filter((item) => item.source)
        .map((tag) => (
          <>
            <CardContent
              avatar={tag.source.cover_photo.user.profile_image.small}
              username={tag.source.cover_photo.user.username}
              created_at={tag.source.cover_photo.created_at}
              color={tag.source.cover_photo.color}
              isProfile={false}
              key={tag.source.cover_photo.id}
              title={tag.source.title}
              description={tag.source.description}
              likes={tag.source.cover_photo.likes}
            >
              <LazyLoadImage
                alt={tag.source.cover_photo.alt_description}
                height="auto"
                src={tag.source.cover_photo.urls.small}
                effect="blur"
                loading="eager"
                width="100%"
              />
            </CardContent>
          </>
        ))}
    </>
  );
}
