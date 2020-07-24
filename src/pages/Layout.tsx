import React from "react";
import { Route, Switch } from "react-router-dom";
import PostsPage from "./PostsPage";
import EditPostPage from "./EditPostPage";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1280px;
  width: 90%;
  min-width: 680px;
  margin: 0 auto;
  padding: 10px;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Switch>
        <Route path="/posts/edit/:id" exact>
          <EditPostPage />
        </Route>
        <Route path="/posts" exact>
          <PostsPage />
        </Route>
        <Route path="/" exact>
          <PostsPage />
        </Route>
      </Switch>
    </Wrapper>
  );
}
