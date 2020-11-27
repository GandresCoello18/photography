import React, { useEffect, useState } from "react";
import { toJson } from "unsplash-js";
import { unsplash } from "../api/unsplash";
import Cookies from "js-cookie";
import { Alert, Spin } from "antd";
import { useHistory } from "react-router-dom";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (!Cookies.get("code-access")) {
      setIsLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const myParam: string | any = urlParams.get("code");

      Cookies.set("code-access", myParam);

      unsplash.auth
        .userAuthentication(myParam)
        .then(toJson)
        .then((json) => {
          setIsLoading(false);
          unsplash.auth.setBearerToken(json.access_token);
          Cookies.set("bearerToken", json.access_token);
          history.push("/me");
        });
    }
  }, [history]);

  return (
    <>
      {isLoading && (
        <Spin>
          <Alert type="info" message="Autenticando......." />
        </Spin>
      )}
    </>
  );
}
