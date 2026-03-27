import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app/index.css";

import { SiteLayout } from "@/app/site-layout";
import { GalleryPage } from "@/pages/gallery";
import { NotFoundPage } from "@/pages/error";
import { ContactPage } from "@/pages/contact";
import { HomePage } from "@/pages/home";
import { AboutPage } from "@/pages/about";
import { GalleryDetails } from "@/pages/gallery-details";

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/portfolio", element: <GalleryPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/gallery/:slug", element: <GalleryDetails /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
