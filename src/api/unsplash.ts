import Cookies from "js-cookie";
import Unsplash, { toJson } from "unsplash-js";

export const unsplash = new Unsplash({
  accessKey: "ywvwMaZ7n-kdpiF4aiAgFsJztp9CGPzeeM_YINxKLHU",
  secret: "eq8akYXxOB6dIOItz6CZkma670XnQXHvccCKU5fAz34",
  callbackUrl: "https://photography-lovat.vercel.app/auth",
  bearerToken: Cookies.get("bearerToken"),
});

export const json = toJson;

// production
// https://photography-lovat.vercel.app
