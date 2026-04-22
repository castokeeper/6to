import { createBrowserRouter } from "react-router";
import { MobileLayout } from "./mobile-components/MobileLayout";
import { Splash } from "./mobile-components/Splash";
import { Login } from "./mobile-components/Login";
import { Home } from "./mobile-components/Home";
import { Explore } from "./mobile-components/Explore";
import { NewPost } from "./mobile-components/NewPost";
import { Notifications } from "./mobile-components/Notifications";
import { Profile } from "./mobile-components/Profile";
import { PostDetail } from "./mobile-components/PostDetail";
import { PetProfile } from "./mobile-components/PetProfile";
import { Messages } from "./mobile-components/Messages";
import { Settings } from "./mobile-components/Settings";
import { Search } from "./mobile-components/Search";

export const mobileRouter = createBrowserRouter([
  {
    path: "/",
    element: <Splash />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/app",
    element: <MobileLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "new-post", element: <NewPost /> },
      { path: "notifications", element: <Notifications /> },
      { path: "profile", element: <Profile /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "pet/:id", element: <PetProfile /> },
      { path: "messages", element: <Messages /> },
      { path: "settings", element: <Settings /> },
      { path: "search", element: <Search /> },
    ],
  },
]);
