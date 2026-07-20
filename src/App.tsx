import { useState, useRef, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import MapComponent from './MapComponent';
import MiniGraph from './MiniGraph';
import data from './data.json';
import { Map as MapIcon, Users, Lightbulb, Building2, Route as RouteIcon } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  
  // Time Slider State
  const [currentYear, setCurrentYear] = useState(1400);
  const chronicleRef = useRef<HTMLDivElement>(null);

  const [mapCenter, setMapCenter] = useState<[number, number]>([65, 40]);
  const [mapZoom, setMapZoom] = useState(1);

  // Filters for route types
  const [filters, setFilters] = useState<Record<string, boolean>>({
    tech: true,
    religion: true,
    people: true,
    trade: true
  });

  const toggleFilter = (type: string) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getCityRoutes = (cityId: string) => {
    return data.routes.filter(r => (r.source === cityId || r.target === cityId) && filters[r.type || 'trade'] && r.numericYear <= currentYear);
  };

  const getCityName = (cityId: string) => {
    return data.cities.find(c => c.id === cityId)?.name || cityId;
  };

  const handleCityClick = (city: any) => {
    setSelectedCity(city);
    setMapCenter(city.coordinates as [number, number]);
    setMapZoom(3);
  };

  const handleBackToGlobal = () => {
    setSelectedCity(null);
    setMapCenter([65, 40]);
    setMapZoom(1);
  };

  // 當年份變更時，自動將全域紀事捲動到最近的事件
  useEffect(() => {
    if (!selectedCity && chronicleRef.current) {
      const activeElement = chronicleRef.current.querySelector('.chronicle-card.active');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentYear, selectedCity]);

  return (
    <div className="app-container">
      <Tooltip id="city-tooltip" style={{ zIndex: 100, backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '6px' }} />

      <div className="map-container">
        <MapComponent 
          data={data}
          selectedCity={selectedCity}
          onCityClick={handleCityClick}
          filters={filters}
          center={mapCenter}
          zoom={mapZoom}
          currentYear={currentYear}
        />
        
        {/* Time Slider Overlay */}
        <div className="time-slider-container">
          <div className="time-slider-header">
            <span>1200 年</span>
            <span className="current-year">公元 {currentYear} 年</span>
            <span>1400 年</span>
          </div>
          <input 
            type="range" 
            className="time-slider" 
            min="1200" 
            max="1400" 
            value={currentYear} 
            onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="filters-panel">
          <h3>傳播路線過濾</h3>
          <label className="filter-item">
            <input type="checkbox" checked={filters.tech} onChange={() => toggleFilter('tech')} />
            <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>─</span> 技術與科學 (Tech)
          </label>
          <label className="filter-item">
            <input type="checkbox" checked={filters.religion} onChange={() => toggleFilter('religion')} />
            <span style={{ color: '#a855f7', fontWeight: 'bold' }}>─</span> 宗教與思想 (Religion)
          </label>
          <label className="filter-item">
            <input type="checkbox" checked={filters.people} onChange={() => toggleFilter('people')} />
            <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>─</span> 人物與使團 (People)
          </label>
          <label className="filter-item">
            <input type="checkbox" checked={filters.trade} onChange={() => toggleFilter('trade')} />
            <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>─</span> 驛網與物流 (Trade)
          </label>
        </div>
      </div>

      <div className="info-panel">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ cursor: 'pointer' }} onClick={handleBackToGlobal}>
            <h1>蒼狼與白鹿的歷史軌跡</h1>
            <p>蒙古帝國與歐亞大陸的大整合</p>
          </div>
          {selectedCity && (
            <button onClick={handleBackToGlobal} style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              返回全域
            </button>
          )}
        </div>

        <div className="panel-content" style={{ height: 'calc(100% - 60px)' }}>
          {selectedCity ? (
            <div style={{ overflowY: 'auto', height: '100%', paddingRight: '8px' }}>
              <h2>{selectedCity.name}</h2>
              <MiniGraph city={selectedCity} />

              <div className="description-box">
                {selectedCity.description}
              </div>

              {selectedCity.events && selectedCity.events.length > 0 && (
                <div className="timeline-container">
                  <h3 className="section-title">📜 歷史紀事</h3>
                  <div className="timeline">
                    {selectedCity.events.filter((e: any) => !e.numericYear || e.numericYear <= currentYear).map((event: any, index: number) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <span className="timeline-year">{event.year}</span>
                          <h4 className="timeline-title">{event.title}</h4>
                          <p className="timeline-desc">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Badges ... (omitted for brevity, assume similar structure) */}
              {selectedCity.people && selectedCity.people.length > 0 && (
                <>
                  <h3 className="section-title"><Users size={18} color="var(--badge-person)" /> 歷史人物</h3>
                  <div className="badge-container">
                    {selectedCity.people.map((p: string, i: number) => (
                      <span key={i} className="badge" style={{ backgroundColor: 'var(--badge-person)' }}>{p}</span>
                    ))}
                  </div>
                </>
              )}

              {selectedCity.tech && selectedCity.tech.length > 0 && (
                <>
                  <h3 className="section-title"><Lightbulb size={18} color="var(--badge-tech)" /> 人文與技術</h3>
                  <div className="badge-container">
                    {selectedCity.tech.map((t: string, i: number) => (
                      <span key={i} className="badge" style={{ backgroundColor: 'var(--badge-tech)' }}>{t}</span>
                    ))}
                  </div>
                </>
              )}

              <h3 className="section-title" style={{ marginTop: '32px' }}>
                <RouteIcon size={18} color="var(--accent-color)" /> 相關傳播路線
              </h3>
              <ul className="route-list">
                {getCityRoutes(selectedCity.id).map((route, i) => {
                  const isSource = route.source === selectedCity.id;
                  const targetCityName = isSource ? getCityName(route.target) : getCityName(route.source);
                  const direction = isSource ? '前往' : '來自';
                  
                  return (
                    <li key={i} style={{ borderLeft: `3px solid ${route.type === 'tech' ? '#0ea5e9' : route.type === 'religion' ? '#a855f7' : route.type === 'people' ? '#f59e0b' : '#94a3b8'}` }}>
                      <span className="route-name">{direction} <strong>{targetCityName}</strong></span>
                      <span className="route-path">{route.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            // 全域紀事視圖 (Global Chronicle Panel)
            <div className="global-chronicle" ref={chronicleRef}>
              <h3 style={{ marginBottom: '8px', color: 'var(--text-main)' }}>📜 帝國擴張與文明傳播總覽</h3>
              {data.tour.map((tourStep: any, index: number) => {
                const isActive = tourStep.numericYear <= currentYear;
                // 我們可以設定最接近 currentYear 的為 "最 active"
                const isClosest = isActive && (index === data.tour.length - 1 || data.tour[index+1].numericYear > currentYear);
                
                return (
                  <div key={index} className={`chronicle-card ${isActive ? 'active' : ''}`} style={{ opacity: isActive ? (isClosest ? 1 : 0.7) : 0.3 }}>
                    <div className="chronicle-year">{tourStep.year}</div>
                    <div className="chronicle-title">{tourStep.title}</div>
                    <div className="chronicle-city" style={{ fontSize: '0.8rem', color: '#059669', marginBottom: '8px' }}>📍 {getCityName(tourStep.cityId)}</div>
                    <div className="chronicle-content">{tourStep.content}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
