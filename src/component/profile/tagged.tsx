import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CardContent } from "../card/content-card";
import { Dispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { SetLikes } from "../../redux/modulos/likes";

interface Props {
  aggregated: Array<any>;
}

export function TaggedProfile({ aggregated }: Props) {
  const [likeId, setLikeId] = useState<string>("");
  const dispatch: Dispatch = useDispatch();

  const LikesPhotos = useSelector(
    (state: RootState) => state.LikesReducer.LikesPhoto
  );

  useEffect(() => {
    if (likeId) {
      const photo = aggregated
        .filter((item) => item.source)
        .find((item: { id: string }) => item.id === likeId);
      console.log(photo);
      dispatch(SetLikes([...LikesPhotos, ...[photo]]));
      setLikeId("");
    }
  }, [likeId, aggregated, dispatch, LikesPhotos]);

  return (
    <>
      {aggregated
        .filter((item) => item.source)
        .map((tag) => (
          <>
            <CardContent
              setLikeId={setLikeId}
              id={tag.source.cover_photo.id}
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
