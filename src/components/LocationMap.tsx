import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const POSITION: [number, number] = [44.77676021205433, 20.407498420850896];

const LocationMap = () => (
  <MapContainer
    center={POSITION}
    zoom={17}
    scrollWheelZoom={false}
    style={{ width: "100%", height: "350px" }}
    className="rounded-xl border border-border z-0"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={POSITION} icon={icon}>
      <Popup>Top Šiš Fast Food</Popup>
    </Marker>
  </MapContainer>
);

export default LocationMap;
