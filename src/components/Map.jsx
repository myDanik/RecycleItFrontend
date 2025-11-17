import map from "../assets/map.png";


export default function MapPlaceholder() {
  return (
    <div className="map-container">
      <div className="map-inner">
        <div className="map-hint">
            <img src={map} alt="Map" />
        </div>
      </div>
    </div>
  );
}