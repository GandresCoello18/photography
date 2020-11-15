import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title: string;
}

export function Head({ title }: Props) {
  return (
    <>
      <Helmet>
        <title>{title} | Artistic</title>
        <link rel="shortcut icon" href="artistic.svg" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
      </Helmet>
    </>
  );
}