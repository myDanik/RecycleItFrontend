import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SidebarMain from "./sidebars/SidebarMain";
import SidebarFilters from "./sidebars/SidebarFilters";
import SidebarInfo from "./sidebars/SidebarInfo";
import SidebarFeedback from "./sidebars/SidebarFeedback";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/sidebar/main" replace />} />
        <Route path="sidebar/main" element={<SidebarMain />} />
        <Route path="sidebar/filters" element={<SidebarFilters />} />
        <Route path="sidebar/info/:id" element={<SidebarInfo />} />
        <Route path="sidebar/feedback/:id" element={<SidebarFeedback />} />
      </Route>

      <Route path="*" element={<div style={{ padding: 20 }}>404 — Not found</div>} />
    </Routes>
  );
}