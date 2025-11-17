import React from "react";
import SidebarShell from "../shared/SidebarShell";

export default function SidebarFilters() {
  return (
    <SidebarShell title="Фильтры">
      <div className="filters-block">
        <h4>Тип отходов</h4>
        <label className="chk"><input type="checkbox" /> Стекло</label>
        <label className="chk"><input type="checkbox" /> Пластик</label>
        <label className="chk"><input type="checkbox" /> Металл</label>

        <hr />

        <h4>По времени работы</h4>
        <label className="chk"><input type="radio" name="time" /> Все</label>
        <label className="chk"><input type="radio" name="time" /> Открыто</label>

        <hr />

        <div className="filters-actions">
          <button className="btn ghost">Сбросить</button>
          <button className="btn">Применить</button>
        </div>
      </div>
    </SidebarShell>
  );
}
