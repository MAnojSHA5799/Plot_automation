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

// 🌍 GeoJSON URL (Working)
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

// 🔴 Marker (Bihta side)
const mainPoint = {
  coordinates: [85.05, 25.58],
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

export default function IndiaMap() {
  const [zoom] = useState(1);
  const [center] = useState([91.1, 22.6]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔄 Auto Change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BIHAR_DATA.length);
    }, 3000); // 👉 30000 = 30 sec

    return () => clearInterval(interval);
  }, []);

  // 👇 Safe slicing (no empty issue)
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
        height: "600px",
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
                const centroid = geoCentroid(geo);

                return (
                  <g key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      fill={STATE_COLORS[index % STATE_COLORS.length]}
                      stroke="#fff"
                      strokeWidth={0.7}
                    />

                    {/* 🏷️ State Name */}
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

          {/* 🔴 Marker + Line + Box */}
          <Marker coordinates={mainPoint.coordinates}>
            <g>
              
              {/* 🔴 DOT */}
              <circle r={6} fill="red" stroke="#fff" strokeWidth={2} />

              {/* ✨ LINE */}
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

              {/* 📦 BOX */}
              <rect
                x={220}
                y={-170}
                width={240}
                height={150}
                rx={15}
                fill="rgba(0,0,0,0.85)"
                stroke="#00eaff"
              />

              {/* TITLE */}
              <text
                x={240}
                y={-145}
                fill="#00eaff"
                fontSize={12}
                fontWeight={700}
              >
                📍 Live Locations
              </text>

              {/* 🔄 TEXT */}
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

      {/* 🔥 Animations */}
      <style jsx>{`
        @keyframes dashMove {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -20;
          }
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
      `}</style>
    </div>
  );
}