import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "../pages/home";
import { NotFound } from "../pages/not-found";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}