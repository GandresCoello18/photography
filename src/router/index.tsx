import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "../pages/home";
import { NotFound } from "../pages/not-found";
import { Profile } from "../pages/profile";
import { SearchPage } from "../pages/search";
import { AuthPage } from "../pages/auth";
import { MeProfile } from "../pages/me-profile";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile/:username" component={Profile} />
          <Route exact path="/me" component={MeProfile} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
