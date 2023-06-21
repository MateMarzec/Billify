//Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//Components
import Articles from "./routes/Articles";
import Docs from "./routes/Docs";
import Contact from "./routes/Contact";
import Generate from "./routes/Generate";
import Home from "./routes/Home";
import PageNotFound from "./routes/PageNotFound";
import PostDetails from "./routes/PostDetails";
import RootLayout from "./routes/RootLayout";

//Styles
import "./variables.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/generate",
        element: <Generate />,
      },
      {
        path: "/resources/articles",
        element: <Articles />,
      },
      {
        path: "/resources/articles/:postUrl",
        element: <PostDetails />,
      },
      {
        path: "/resources/docs",
        element: <Docs />,
      },
      {
        path: "/resources/docs/:postUrl",
        element: <PostDetails />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
