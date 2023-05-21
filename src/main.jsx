import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Articles from "./routes/Articles";
import Docs from "./routes/Docs";
import Generate from "./routes/Generate";
import PageNotFound from "./routes/PageNotFound";
import RootLayout from "./routes/RootLayout";
import "./variables.css"
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/generate",
        element: <Generate />,
      },
      {
        path: "/resources/articles",
        element: <Articles />,
      },
      {
        path: "/resources/docs",
        element: <Docs />,
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
