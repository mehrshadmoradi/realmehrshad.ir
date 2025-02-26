"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Fix Leaflet marker issue in Next.js
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapState } from "../types/types";

const customIcon = new L.Icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = () => {
  const initialState: MapState = {
    center: { lat: 37.2808, lng: 49.5832 },
    zoom: 11,
    markerPosition: { lat: 37.2808, lng: 49.5832 },
  };

  return (
    <MapContainer
      center={initialState.center}
      zoom={initialState.zoom}
      style={{ height: "430px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={initialState.markerPosition} icon={customIcon}>
        <Popup>This is where i live now.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
