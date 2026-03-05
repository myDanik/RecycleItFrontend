import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Map from "./Map";
import api from "../services/api";

export default function Layout() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();


  const getSelectedPointId = () => {
    const path = location.pathname;
    const match = path.match(/\/info\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  useEffect(() => {
    loadPoints();
  }, [searchQuery]);

  async function loadPoints() {
    setLoading(true);
    try {
      const data = await api.getPoints({ q: searchQuery || undefined });
      setPoints(data);
    } catch (err) {
      console.error("Ошибка загрузки пунктов:", err);
      setPoints([
        {
          id: 1,
          name: "Эко-центр на Красной площади",
          address: "Красная площадь, 1",
          waste_types: ["бумага", "пластик", "стекло"],
          opens_at: "09:00:00",
          closes_at: "21:00:00"
        },
        {
          id: 2,
          name: "Пункт приема на Арбате",
          address: "ул. Арбат, 25",
          waste_types: ["пластик", "металл"],
          opens_at: "08:00:00",
          closes_at: "20:00:00"
        },
        {
          id: 3,
          name: "Китай-город Эко",
          address: "ул. Варварка, 10",
          waste_types: ["стекло", "бумага"],
          opens_at: "10:00:00",
          closes_at: "22:00:00"
        },
        {
          id: 4,
          name: "Пресня Ресайклинг",
          address: "ул. Пресненская, 15",
          waste_types: ["пластик", "стекло", "металл"],
          opens_at: "08:30:00",
          closes_at: "19:30:00"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app-root">
      <div className="page-top">
        <Header onSearchChange={handleSearchChange} />
      </div>

      <div className="content-row">
        <aside className="map-area">
          <Map 
            points={points} 
            selectedPointId={getSelectedPointId()} 
          />
        </aside>

        <section className="sidebar-area">
          <Outlet context={{ 
            points, 
            loading, 
            reloadPoints: loadPoints,
            searchQuery 
          }} />
        </section>
      </div>
    </div>
  );
}