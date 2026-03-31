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

// ✅ Props (future use ke liye)
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

// 🔴 Marker (Bihta side)
const mainPoint: { coordinates: [number, number] } = {
  coordinates: [84.9, 26.58],
};

// 📍 Bihar Locations
const BIHAR_DATA = [
  "Patna", "Danapur", "Bihta", "Fatuha", "Barh",
  "Gaya", "Bodh Gaya", "Muzaffarpur", "Kanti",
  "Bhagalpur", "Darbhanga", "Nalanda", "Rajgir",
  "Begusarai", "Purnia", "Katihar", "Chapra",
  "Hajipur", "Samastipur", "Siwan", "Ara",
  "Buxar", "Motihari", "Munger", "Saharsa",
  "Madhepura", "Araria", "Kishanganj", "Sitamarhi"
];

export default function IndiaMap(props: IndiaMapProps) {
  const [zoom] = useState<number>(1);
  const [center] = useState<[number, number]>([80, 22]);
  const [geographyData, setGeographyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 🔄 Fetch Map Data
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(geoUrl);
        const data = await response.json();
        setGeographyData(data);
      } catch (error) {
        console.error("Error loading map data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapData();
  }, []);

  // 🔄 20 sec me next 10 (Carousel)
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 10) % BIHAR_DATA.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [isLoading]);

  // ✅ 10 locations at a time
  const visibleLocations = Array.from({ length: 10 }, (_, i) => {
    return BIHAR_DATA[(currentIndex + i) % BIHAR_DATA.length];
  });

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "550px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.05)",
          borderRadius: "12px",
          color: "#0072ff",
        }}
      >
        <div className="loader"></div>
        <p style={{ marginTop: "15px", fontWeight: 600, fontSize: "16px" }}>
          Loading Plot Data Map...
        </p>
        <style>{`
          .loader {
            width: 48px;
            height: 48px;
            border: 5px solid #0072ff;
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }
          @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [105, 15],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={zoom} center={center}>
          
          {/* 🌈 STATES */}
          <Geographies geography={geographyData}>
            {({ geographies }) =>
              geographies.map((geo, index) => {
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

          {/* 🔴 MAIN POINT + LINE + BOX */}
          <Marker coordinates={mainPoint.coordinates}>
            <g>
              
              {/* 🔴 DOT */}
              <circle r={6} fill="red" stroke="#fff" strokeWidth={2} />

              {/* ✨ LINE */}
              <path
                d="M0 0 L0 -120 L180 -120"
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
                x={180}
                y={-180}
                width={260}
                height={230}
                rx={15}
                fill="rgba(0,0,0,0.85)"
                stroke="#00eaff"
                strokeWidth={1.5}
              />

              {/* 📍 TITLE */}
              <text
                x={200}
                y={-155}
                fill="#00eaff"
                fontSize={14}
                fontWeight={700}
              >
                📍 Demanding Locations
              </text>

              {/* 🔄 10 CAROUSEL ITEMS */}
              {visibleLocations.map((loc, i) => (
                <text
                  key={`${currentIndex}-${i}`}
                  x={210}
                  y={-130 + i * 18}
                  fill="#fff"
                  fontSize={11}
                  style={{
                    opacity: 0,
                    animation: "fadeText 0.5s forwards",
                    animationDelay: `${i * 0.1}s`,
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
      <style>
        {`
        @keyframes dashMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -20; }
        }

        @keyframes fadeText {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
}