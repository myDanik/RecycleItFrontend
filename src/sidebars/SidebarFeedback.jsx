import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarShell from "../shared/SidebarShell";

export default function SidebarFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();

  function submitFeedback(e) {
    e.preventDefault();
    navigate(`/sidebar/info/${id}`);
  }

  return (
    <SidebarShell title="Оставить отзыв">
      <form className="feedback-block" onSubmit={submitFeedback}>
        <label className="field">
          <span>Оцените пункт:</span>
          <div className="stars">☆ ☆ ☆ ☆ ☆</div>
        </label>

        <label className="field">
          <span>Текст отзыва:</span>
          <textarea placeholder="Как прошёл приём?" rows={5}></textarea>
        </label>

        <label className="field">
          <span>Прикрепить фото</span>
          <input type="file" />
        </label>

        <div className="feedback-actions" style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" className="btn ghost" onClick={() => navigate(`/sidebar/info/${id}`)}>Отмена</button>
          <button type="submit" className="btn">Отправить</button>
        </div>
      </form>
    </SidebarShell>
  );
}
