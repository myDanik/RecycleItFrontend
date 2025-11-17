import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarShell from "../shared/SidebarShell";

export default function SidebarInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  function openFeedback() {
    navigate(`/sidebar/feedback/${id}`);
  }

  return (
    <SidebarShell title="Информация о пункте приёма вторсырья">
      <div className="info-block">
        <h4>Пункт: {id ? `Пункт №${id}` : "—"}</h4>
        <p className="muted">Адрес: ул. Примерная, 10 — Открыто</p>

        <div className="types-row">
          <span className="tag">Бумага</span>
          <span className="tag">Стекло</span>
          <span className="tag">Пластик</span>
        </div>

        <hr />

        <h5>Часы работы</h5>
        <p className="muted">Пн-Пт 09:00 — 18:00</p>

        <h5>Контакты</h5>
        <p className="muted">+7 (900) 000-00-00 • example.org</p>

        <hr />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <button className="btn ghost" onClick={() => navigate("/sidebar/main")}>Назад к списку</button>
          <button className="btn" onClick={openFeedback}>Оставить отзыв</button>
        </div>

        <hr />

        <h5>Отзывы</h5>
        <div className="review">
          <div className="review-name">Иван</div>
          <div className="review-text">Быстро и аккуратно</div>
          <div className="review-meta">★5 • 14.09.2025</div>
        </div>
      </div>
    </SidebarShell>
  );
}
