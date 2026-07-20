import React, { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface City {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface Route {
  source: string;
  target: string;
  type?: string;
  label: string;
}

interface MapComponentProps {
  data: {
    cities: City[];
    routes: Route[];
  };
  selectedCity: City | null;
  onCityClick: (city: City) => void;
  filters: Record<string, boolean>;
}

export default function MapComponent({ data, selectedCity, onCityClick, filters }: MapComponentProps) {
  // Determine connected cities for the selected city
  const connectedCityIds = useMemo(() => {
    const ids = new Set<string>();
    if (selectedCity) {
      ids.add(selectedCity.id);
      data.routes.forEach(route => {
        if (route.source === selectedCity.id) ids.add(route.target);
        if (route.target === selectedCity.id) ids.add(route.source);
      });
    }
    return ids;
  }, [selectedCity, data.routes]);

  const getColorByType = (type: string | undefined) => {
    switch (type) {
      case 'tech': return '#0ea5e9'; // Blue
      case 'religion': return '#a855f7'; // Purple
      case 'people': return '#f59e0b'; // Amber/Orange
      case 'trade':
      default: return '#94a3b8'; // Slate/Gray
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "#f1f5f9" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 400,
          center: [65, 40]
        }}
        width={1000}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={1} center={[65, 40]} minZoom={0.5} maxZoom={5}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#cbd5e1", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Draw Routes */}
          {data.routes.map((route, i) => {
            const isVisible = route.type ? filters[route.type] !== false : filters['trade'] !== false;
            if (!isVisible) return null;

            const sourceCity = data.cities.find((c) => c.id === route.source);
            const targetCity = data.cities.find((c) => c.id === route.target);
            if (!sourceCity || !targetCity) return null;
            
            const color = getColorByType(route.type);

            return (
              <Line
                key={i}
                from={sourceCity.coordinates}
                to={targetCity.coordinates}
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                className="animated-route"
                style={{ opacity: 0.7 }}
              />
            );
          })}

          {/* Draw Cities */}
          {data.cities.map((city) => {
            const isSelected = selectedCity?.id === city.id;
            const isConnected = connectedCityIds.has(city.id);
            const showName = isSelected || isConnected;

            return (
              <Marker
                key={city.id}
                coordinates={city.coordinates}
                onClick={() => onCityClick(city)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  r={isSelected ? 8 : (isConnected ? 6 : 4)}
                  fill={isSelected ? "#dc2626" : "#8b5cf6"}
                  stroke="#fff"
                  strokeWidth={2}
                  data-tooltip-id="city-tooltip"
                  data-tooltip-content={city.name}
                  style={{ transition: "all 0.3s ease" }}
                />
                {showName && (
                  <text
                    textAnchor="middle"
                    y={isSelected ? -14 : -10}
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontSize: isSelected ? "13px" : "11px",
                      fontWeight: isSelected ? 700 : 600,
                      fill: isSelected ? "#0f172a" : "#334155",
                      pointerEvents: "none",
                      textShadow: "1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white"
                    }}
                  >
                    {city.name}
                  </text>
                )}
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
