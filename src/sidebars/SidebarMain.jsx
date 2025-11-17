import React from "react";
import SidebarShell from "../shared/SidebarShell";
import { useNavigate } from "react-router-dom";

function ListItem({ id, name = "Пункт A", address = "ул. Примерная, 10", types = "Пластик, Бумага" }) {
  const navigate = useNavigate();

  function openInfo() {
    navigate(`/sidebar/info/${id}`);
  }

  return (
    <div className="list-item" onClick={openInfo} style={{ cursor: "pointer" }}>
      <div className="list-item-left">
        <div className="item-name">{name}</div>
        <div className="item-address">{address}</div>
        <div className="item-types">{types}</div>
      </div>

      <div className="list-item-right">
        <div className="item-hours">Открыто до 14:00</div>
        <div className="item-rating">★ 4.3 (12)</div>
      </div>
    </div>
  );
}

export default function SidebarMain() {
  const items = new Array(6).fill(0).map((_, i) => ({
    id: i,
    name: `Пункт ${String.fromCharCode(65 + i)}`,
    address: "ул. Примерная, 10",
    types: "Пластик, Бумага",
  }));

  return (
    <SidebarShell title="Список">
      <div className="list-controls">
        <div className="filters-note">Фильтры</div>
      </div>

      <div className="list">
        {items.map((it) => (
          <ListItem key={it.id} name={it.name} address={it.address} types={it.types} />
        ))}
      </div>
    </SidebarShell>
  );
}