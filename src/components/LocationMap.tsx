import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const POSITION: [number, number] = [44.77676021205433, 20.407498420850896];

const mapMarkerIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView(POSITION, 17);

    mapRef.current = map;

    L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      attribution: '&copy; Google Maps',
      maxZoom: 20,
    }).addTo(map);

    const marker = L.marker(POSITION, { icon: mapMarkerIcon }).addTo(map);
    marker.bindPopup("Top Šiš Fast Food");

    return () => {
      marker.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div ref={mapContainerRef} className="h-[350px] w-full" aria-label="Mapa lokacije restorana" />
    </div>
  );
};

export default LocationMap;
