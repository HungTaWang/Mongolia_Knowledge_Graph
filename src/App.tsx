import { useState, useRef, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import MapComponent from './MapComponent';
import MiniGraph from './MiniGraph';
import GlobalGraph from './GlobalGraph';
import data from './data.json';
import { Users, Lightbulb, Route as RouteIcon, X, Map as MapIcon, Network } from 'lucide-react';

const rawGlossaryKeys = Object.keys((data as any).glossary || {});
const glossaryAliasMap: Record<string, string> = {};

rawGlossaryKeys.forEach(k => {
  glossaryAliasMap[k] = k;
  const baseName = k.split(' (')[0].trim();
  // Don't overwrite if baseName is already a full key for something else
  if (baseName && baseName !== k && !glossaryAliasMap[baseName]) {
    glossaryAliasMap[baseName] = k;
  }
});

const allGlossaryKeys = Object.keys(glossaryAliasMap).sort((a, b) => b.length - a.length);
const glossaryRegex = allGlossaryKeys.length > 0 ? new RegExp(`(${allGlossaryKeys.join('|')})`, 'g') : null;

export default function App() {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [modalContent, setModalContent] = useState<{title: string, desc: string, type: string} | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'thoughts' | 'tech' | 'people'>('map');
  
  // Time Slider State
  const [currentYear, setCurrentYear] = useState(2000);

  const formatYear = (year: number) => {
    if (year < 0) return `B.C. ${Math.abs(year)}`;
    return `A.D. ${year}`;
  };
  const chronicleRef = useRef<HTMLDivElement>(null);

  const [mapCenter, setMapCenter] = useState<[number, number]>([65, 40]);
  const [mapZoom, setMapZoom] = useState(1);

  // Filters for route types
  const [filters, setFilters] = useState<Record<string, boolean>>({
    tech: true,
    religion: true,
    people: true
  });

  const toggleFilter = (type: string) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getCityRoutes = (cityId: string) => {
    return data.routes.filter(r => (r.source === cityId || r.target === cityId) && filters[r.type || 'tech'] && r.numericYear <= currentYear);
  };

  const getCityName = (cityId: string) => {
    return data.cities.find(c => c.id === cityId)?.name || cityId;
  };

  const handleCityClick = (city: any) => {
    setSelectedCity(city);
    setMapCenter(city.coordinates as [number, number]);
    if (mapZoom < 3) setMapZoom(3);
  };

  const handleEntityClick = (entityName: string) => {
    const fullKey = glossaryAliasMap[entityName] || entityName;
    const entity = (data as any).glossary?.[fullKey];
    if (!entity) return;
    
    if (entity.type === 'city') {
      const city = data.cities.find((c: any) => c.id === entity.id);
      if (city) {
        handleCityClick(city);
      }
    } else {
      setModalContent({
        title: entityName,
        desc: entity.description,
        type: entity.type
      });
    }
  };

  const renderTextWithLinks = (text: string) => {
    if (!text || !glossaryRegex) return text;
    
    const parts = text.split(glossaryRegex);
    return parts.map((part, i) => {
      const fullKey = glossaryAliasMap[part];
      if (fullKey) {
        return (
          <span
            key={i}
            className="clickable-entity"
            onClick={() => handleEntityClick(fullKey)}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleBackToGlobal = () => {
    setSelectedCity(null);
    setMapCenter([65, 40]);
    setMapZoom(1);
  };

  // 當年份變更時，自動將全域紀事捲動到最近的事件
  useEffect(() => {
    if (!selectedCity && chronicleRef.current) {
      const focusElement = chronicleRef.current.querySelector('.chronicle-card.current-focus');
      if (focusElement) {
        focusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentYear, selectedCity]);

  return (
    <div className="app-container">
      <Tooltip id="city-tooltip" style={{ zIndex: 100, backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '6px' }} />

      <div className="map-container" style={{ position: 'relative' }}>
        {/* View Mode Selector */}
        <div className="view-mode-selector">
          <button className={`view-mode-btn ${viewMode === 'map' ? 'active map-active' : ''}`} onClick={() => setViewMode('map')}>
            <MapIcon size={16} /> <span className="btn-text">地圖</span>
          </button>
          <button className={`view-mode-btn ${viewMode === 'thoughts' ? 'active thoughts-active' : ''}`} onClick={() => setViewMode('thoughts')}>
            <Network size={16} /> <span className="btn-text">思想</span>
          </button>
          <button className={`view-mode-btn ${viewMode === 'tech' ? 'active tech-active' : ''}`} onClick={() => setViewMode('tech')}>
            <Network size={16} /> <span className="btn-text">技術</span>
          </button>
          <button className={`view-mode-btn ${viewMode === 'people' ? 'active people-active' : ''}`} onClick={() => setViewMode('people')}>
            <Network size={16} /> <span className="btn-text">人物</span>
          </button>
        </div>

        {viewMode === 'map' ? (
          <MapComponent 
            data={data}
            selectedCity={selectedCity}
            onCityClick={handleCityClick}
            filters={filters}
            center={mapCenter}
            zoom={mapZoom}
            currentYear={currentYear}
          />
        ) : (
          <GlobalGraph
            data={data}
            type={viewMode}
            currentYear={currentYear}
            onEntityClick={handleEntityClick}
          />
        )}
        
        {/* Time Slider Overlay */}
        <div className="time-slider-container">
          <div className="time-slider-header">
            <span>B.C. 800</span>
            <span className="current-year">{formatYear(currentYear)}</span>
            <span>A.D. 2000</span>
          </div>
          <input 
            type="range" 
            className="time-slider" 
            min="-800" 
            max="2000" 
            value={currentYear} 
            onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}
          />
        </div>

        {viewMode === 'map' && (
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
          </div>
        )}
      </div>

      <div className="info-panel">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ cursor: 'pointer' }} onClick={handleBackToGlobal}>
            <h1>泓達歷史小屋</h1>
            <p>以史為鏡，可以知興替</p>
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
              <MiniGraph city={selectedCity} onEntityClick={handleEntityClick} />

              <div className="description-box">
                {renderTextWithLinks(selectedCity.description)}
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
                          <h4 className="timeline-title">{renderTextWithLinks(event.title)}</h4>
                          <p className="timeline-desc">{renderTextWithLinks(event.description)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCity.people && selectedCity.people.length > 0 && (
                <>
                  <h3 className="section-title"><Users size={18} color="var(--badge-person)" /> 歷史人物</h3>
                  <div className="badge-container">
                    {selectedCity.people.map((p: string, i: number) => {
                      const baseName = p.split('(')[0].trim();
                      return (
                        <span key={i} className="badge clickable-entity-badge" style={{ backgroundColor: 'var(--badge-person)' }} onClick={() => handleEntityClick(baseName)}>{p}</span>
                      );
                    })}
                  </div>
                </>
              )}

              {selectedCity.tech && selectedCity.tech.length > 0 && (
                <>
                  <h3 className="section-title"><Lightbulb size={18} color="var(--badge-tech)" /> 人文與技術</h3>
                  <div className="badge-container">
                    {selectedCity.tech.map((t: string, i: number) => {
                      const baseName = t.split('(')[0].trim();
                      return (
                        <span key={i} className="badge clickable-entity-badge" style={{ backgroundColor: 'var(--badge-tech)' }} onClick={() => handleEntityClick(baseName)}>{t}</span>
                      );
                    })}
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
                      <span className="route-name">{direction} <strong
                        style={{ cursor: 'pointer', color: 'var(--accent-color)', textDecoration: 'underline' }}
                        onClick={() => {
                          const targetCityId = isSource ? route.target : route.source;
                          const city = data.cities.find(c => c.id === targetCityId);
                          if (city) handleCityClick(city);
                        }}
                      >{targetCityName}</strong></span>
                      <span className="route-path">{route.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            // 全域紀事視圖 (Global Chronicle Panel)
            <div className="global-chronicle" ref={chronicleRef}>
              <h3 style={{ marginBottom: '8px', color: 'var(--text-main)' }}>📜 文明演進與知識傳播全史</h3>
              {data.tour.map((tourStep: any, index: number) => {
                const isActive = tourStep.numericYear <= currentYear;
                const isClosest = isActive && (index === data.tour.length - 1 || data.tour[index+1].numericYear > currentYear);
                
                return (
                  <div key={index} className={`chronicle-card ${isActive ? 'active' : ''} ${isClosest ? 'current-focus' : ''}`} style={{ opacity: isActive ? 1 : 0.3 }}>
                    <div className="chronicle-year">{tourStep.year}</div>
                    <div className="chronicle-title">{renderTextWithLinks(tourStep.title)}</div>
                    <div 
                      className="chronicle-city" 
                      style={{ fontSize: '0.8rem', color: '#059669', marginBottom: '8px', cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => {
                        const city = data.cities.find(c => c.id === tourStep.cityId);
                        if (city) handleCityClick(city);
                      }}
                    >
                      📍 {getCityName(tourStep.cityId)}
                    </div>
                    <div className="chronicle-content">{renderTextWithLinks(tourStep.content)}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {modalContent && (
        <div className="modal-overlay" onClick={() => setModalContent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalContent(null)}><X size={20} /></button>
            <h3 style={{ marginBottom: '12px', color: 'var(--accent-color)', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
              {modalContent.title}
            </h3>
            <p style={{ lineHeight: '1.6' }}>{renderTextWithLinks(modalContent.desc)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
