import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// هاد السطر باش الماركر ديال الخريطة يبان مزيان
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapEvents({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function DashboardMap() {
  const [coords, setCoords] = useState({ lat: 31.6295, lng: -7.9811 });

  return (
    <div style={{ padding: '20px' }}>
      <h3>اختاري موقع المزرعة:</h3>
      <div style={{ height: "400px", width: "100%", borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer center={[31.6295, -7.9811]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coords.lat, coords.lng]} />
          <MapEvents setCoords={setCoords} />
        </MapContainer>
      </div>
      <p style={{ marginTop: '15px' }}>
        <strong>Latitude:</strong> {coords.lat.toFixed(6)} | 
        <strong> Longitude:</strong> {coords.lng.toFixed(6)}
      </p>
    </div>
  );
}