import React from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import SidebarShell from "../shared/SidebarShell";

function ListItem({ point, isSelected = false }) {
  const navigate = useNavigate();

  return (
    <div 
      className={`list-item ${isSelected ? "selected" : ""}`} 
      onClick={() => navigate(`/sidebar/info/${point.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="list-item-left">
        <div className="item-name">{point.name}</div>
        <div className="item-address">{point.address || "Адрес не указан"}</div>
        <div className="item-types">
          {point.waste_types?.join(", ") || "Типы не указаны"}
        </div>
      </div>
      <div className="list-item-right">
        {point.opens_at && point.closes_at && (
          <div className="item-hours">
            {point.opens_at.slice(0,5)} - {point.closes_at.slice(0,5)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SidebarMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const { points, loading, reloadPoints, searchQuery } = useOutletContext();

  // Получаем текущий выбранный ID из URL
  const getCurrentPointId = () => {
    const match = location.pathname.match(/\/info\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const selectedPointId = getCurrentPointId();

  return (
    <SidebarShell title="Список">
      {searchQuery && (
        <div style={{ 
          marginBottom: "10px", 
          padding: "8px", 
          background: "#e3f2fd", 
          borderRadius: "4px",
          fontSize: "14px" 
        }}>
          🔍 Поиск: <strong>{searchQuery}</strong>
          <button 
            onClick={() => navigate("/sidebar/main")}
            style={{ 
              float: "right", 
              background: "none", 
              border: "none", 
              color: "#666",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      {loading && <div className="loading">Загрузка пунктов...</div>}
      
      {!loading && points.length === 0 && (
        <div className="empty">
          {searchQuery ? "По вашему запросу ничего не найдено" : "Пункты не найдены"}
        </div>
      )}
      
      {!loading && points.length > 0 && (
        <div className="list">
          {points.map((point) => (
            <ListItem 
              key={point.id} 
              point={point} 
              isSelected={selectedPointId === point.id}
            />
          ))}
        </div>
      )}
      
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={reloadPoints} className="btn">
          Обновить список
        </button>
      </div>
    </SidebarShell>
  );
}