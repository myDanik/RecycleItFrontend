import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MapPlaceholder from "./Map";

export default function Layout() {
  return (
    <div className="app-root">
      <div className="page-top">
        <Header />
      </div>

      <div className="content-row">
        <aside className="map-area">
          <MapPlaceholder />
        </aside>

        <section className="sidebar-area">
          <Outlet />
        </section>
      </div>
    </div>
  );
}