import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";

interface Props {
  isLoading: boolean;
  count: number;
}

export function CardsPlaceholder({ isLoading, count }: Props) {
  const [Skeletons, setSkeletons] = useState<Array<number>>([]);

  useEffect(() => {
    let item: Array<number> = [];
    for (let i = 0; i < count; i++) item.push(i);
    setSkeletons(item);
  }, [count]);

  return (
    <>
      {Skeletons.map((item) => (
        <div style={{ padding: 10 }} key={item}>
          <Skeleton loading={isLoading} active avatar />
        </div>
      ))}
    </>
  );
}
