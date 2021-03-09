import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "../component/layout/navBar";
import { HomePage } from "../pages/home";
import { NotFound } from "../pages/not-found";

const Profile = React.lazy(() => import("../pages/profile"));
const MeProfile = React.lazy(() => import("../pages/me-profile"));
const SearchPage = React.lazy(() => import("../pages/search"));
const AuthPage = React.lazy(() => import("../pages/auth"));
const LikesPage = React.lazy(() => import("../pages/likes"));

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile/:username" component={Profile} />
          <Route exact path="/me" component={MeProfile} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/likes" component={LikesPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <NavBar />
      </BrowserRouter>
    </Suspense>
  );
}
