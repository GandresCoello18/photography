import Cookies from "js-cookie";
import Unsplash, { toJson } from "unsplash-js";

export const unsplash = new Unsplash({
  accessKey: "fjcfOwmUmV6qRt375jx2nMyeUaJf0kZWeCA4uhxOQHk",
  secret: "uqVo4kYXzHUOcoXZgkiK7B6L3nKQgk90uCBj19Gvf-A",
  callbackUrl: "https://photography-lovat.vercel.app/auth",
  bearerToken: Cookies.get("bearerToken"),
});

export const json = toJson;

// production
// https://photography-lovat.vercel.app
