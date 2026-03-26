"use client";

import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

type IndiaMapProps = {
  data?: { id: string; value: number }[];
  markers?: {
    markerOffset: number;
    name: string;
    coordinates: [number, number];
  }[];
  type?: "geo" | "heat" | "choropleth";
};
// 🌍 GeoJSON
const geoUrl =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

// 🎨 Colors
const STATE_COLORS = [
  "#00c6ff",
  "#0072ff",
  "#f7971e",
  "#ff6a00",
  "#ff3cac",
  "#784ba0",
  "#2b86c5",
];

// 🔴 Marker (FIXED TYPE)
const mainPoint: { coordinates: [number, number] } = {
  coordinates: [86.90, 25.58],
};

// 📍 Bihar Locations
const BIHAR_DATA = [
  "Patna","Danapur","Bihta","Fatuha","Barh",
  "Gaya","Bodh Gaya","Muzaffarpur","Kanti",
  "Bhagalpur","Darbhanga","Nalanda","Rajgir",
  "Begusarai","Purnia","Katihar","Chapra",
  "Hajipur","Samastipur","Siwan","Ara",
  "Buxar","Motihari","Munger","Saharsa",
  "Madhepura","Araria","Kishanganj","Sitamarhi"
];

export default function IndiaMap(props: IndiaMapProps) {

  // ✅ FIX TYPE
  const [zoom] = useState<number>(1);
  const [center] = useState<[number, number]>([92.1, 17.6]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BIHAR_DATA.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const visibleLocations = [
    BIHAR_DATA[currentIndex % BIHAR_DATA.length],
    BIHAR_DATA[(currentIndex + 1) % BIHAR_DATA.length],
    BIHAR_DATA[(currentIndex + 2) % BIHAR_DATA.length],
    BIHAR_DATA[(currentIndex + 3) % BIHAR_DATA.length],
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [80, 22],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={zoom} center={center}>
          
          {/* 🌈 STATES */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => {
                
                // ✅ FIX centroid type
                const centroid = geoCentroid(geo) as [number, number];

                return (
                  <g key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      fill={STATE_COLORS[index % STATE_COLORS.length]}
                      stroke="#fff"
                      strokeWidth={0.7}
                    />

                    <Marker coordinates={centroid}>
                      <text
                        textAnchor="middle"
                        style={{
                          fontSize: 8,
                          fill: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        {geo.properties.NAME_1}
                      </text>
                    </Marker>
                  </g>
                );
              })
            }
          </Geographies>

          {/* 🔴 Marker + UI */}
          <Marker coordinates={mainPoint.coordinates}>
            <g>
              
              <circle r={6} fill="red" stroke="#fff" strokeWidth={2} />

              <path
                d="M0 0 L0 -120 L220 -120"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="6,6"
                style={{
                  animation: "dashMove 2s linear infinite",
                }}
              />

              <rect
                x={220}
                y={-170}
                width={240}
                height={150}
                rx={15}
                fill="rgba(0,0,0,0.85)"
                stroke="#00eaff"
              />

              <text x={240} y={-145} fill="#00eaff" fontSize={12} fontWeight={700}>
                📍 Live Locations
              </text>

              {visibleLocations.map((loc, i) => (
                <text
                  key={i}
                  x={240}
                  y={-120 + i * 22}
                  fill="#fff"
                  fontSize={11}
                  style={{
                    opacity: 0,
                    animation: "fadeText 0.6s forwards",
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  • {loc}
                </text>
              ))}
            </g>
          </Marker>

        </ZoomableGroup>
      </ComposableMap>

      {/* ✅ FIX: remove jsx */}
      <style>
        {`
        @keyframes dashMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -20; }
        }

        @keyframes fadeText {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}
      </style>
    </div>
  );
}