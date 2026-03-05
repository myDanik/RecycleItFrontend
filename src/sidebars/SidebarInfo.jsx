import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarShell from "../shared/SidebarShell";
import api from "../services/api";

export default function SidebarInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [point, setPoint] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = api.getCurrentUser();
  const isAdmin = api.isAdmin();
  const isAuthenticated = !!currentUser;

  console.log("currentUser:", currentUser);
  console.log("isAdmin:", isAdmin);

  useEffect(() => {
    if (id) {
      loadPoint();
      loadFeedback();
    }
  }, [id]);

  async function loadPoint() {
    try {
      const data = await api.getPointById(id);
      setPoint(data);
    } catch (err) {
      setError("Не удалось загрузить информацию о пункте");
    }
  }

  async function loadFeedback() {
    try {
      const data = await api.getFeedback(id);
      setFeedback(data);
    } catch (err) {
      console.error("Не удалось загрузить отзывы:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePoint() {
    if (!window.confirm("Удалить этот пункт?")) return;
    try {
      await api.deletePoint(id);
      navigate("/sidebar/main");
    } catch (err) {
      alert(err.message || "Ошибка удаления");
    }
  }

  async function handleDeleteFeedback(feedbackId) {
    if (!window.confirm("Удалить отзыв?")) return;
    try {
      await api.deleteFeedback(feedbackId);
      setFeedback(feedback.filter((f) => f.id !== feedbackId));
    } catch (err) {
      alert(err.message || "Ошибка удаления отзыва");
    }
  }

  if (loading) return <SidebarShell title="Загрузка..." />;
  if (error) return (
    <SidebarShell title="Ошибка">
      <div className="error">{error}</div>
      <button onClick={() => navigate("/sidebar/main")}>Назад</button>
    </SidebarShell>
  );
  if (!point) return (
    <SidebarShell title="Не найдено">
      <div>Пункт не найден</div>
      <button onClick={() => navigate("/sidebar/main")}>Назад</button>
    </SidebarShell>
  );

  return (
    <SidebarShell title={point.name}>
      <div className="info-block">
        <p><strong>Адрес:</strong> {point.address || "Не указан"}</p>
        {point.waste_types && point.waste_types.length > 0 && (
          <div style={{ margin: "10px 0" }}>
            <strong>Принимает:</strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
              {point.waste_types.map((type, i) => (
                <span key={i} className="tag">{type}</span>
              ))}
            </div>
          </div>
        )}
        {point.opens_at && point.closes_at && (
          <p><strong>Часы работы:</strong> {point.opens_at.slice(0, 5)} - {point.closes_at.slice(0, 5)}</p>
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn ghost" onClick={() => navigate("/sidebar/main")}>Назад</button>

          {isAuthenticated && (
            <button className="btn" onClick={() => navigate(`/sidebar/feedback/${id}`)}>
              Оставить отзыв
            </button>
          )}

          {isAdmin && (
            <>
              <button className="btn ghost" onClick={handleDeletePoint}>
                Удалить пункт
              </button>
            </>
          )}
        </div>

        <hr style={{ margin: "20px 0" }} />
        <h5>Отзывы</h5>
        {feedback.length === 0 ? (
          <div className="empty">Отзывов пока нет</div>
        ) : (
          feedback.map((item) => {
            const canDelete = isAdmin || currentUser?.id === item.user_id;
            return (
              <div key={item.id} className="review">
                <div className="review-name">
                  {item.username || "Аноним"}
                </div>
                <div className="review-text">{item.message}</div>
                <div className="review-meta" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    {item.rating ? `★${item.rating} • ` : ""}
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteFeedback(item.id)}
                      style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "12px" }}
                    >
                      Удалить
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </SidebarShell>
  );
}