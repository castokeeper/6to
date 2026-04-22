import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Feed } from "./components/Feed";
import { PostDetail } from "./components/PostDetail";
import { Composer } from "./components/Composer";
import { Profile } from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Feed },
      { path: "post/:id", Component: PostDetail },
      { path: "compose", Component: Composer },
      { path: "profile", Component: Profile },
    ],
  },
]);
