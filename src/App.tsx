import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import MapComponent from './MapComponent';
import MiniGraph from './MiniGraph';
import data from './data.json';
import { Map as MapIcon, Users, Lightbulb, Building2, Route as RouteIcon } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  
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

  // 取得與該城市相關的所有路徑
  const getCityRoutes = (cityId: string) => {
    return data.routes.filter(r => (r.source === cityId || r.target === cityId) && filters[r.type || 'trade']);
  };

  const getCityName = (cityId: string) => {
    return data.cities.find(c => c.id === cityId)?.name || cityId;
  };

  return (
    <div className="app-container">
      {/* 游標提示：共用 Tooltip */}
      <Tooltip id="city-tooltip" style={{ zIndex: 100, backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '6px' }} />

      {/* 左側地圖 (手機版為上方) */}
      <div className="map-container">
        <MapComponent 
          data={data}
          selectedCity={selectedCity}
          onCityClick={setSelectedCity}
          filters={filters}
        />
        
        {/* 圖例過濾器 */}
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

      {/* 右側資訊面板 (手機版為下方) */}
      <div className="info-panel">
        <div className="panel-header">
          <h1>蒼狼與白鹿的歷史軌跡</h1>
          <p>蒙古帝國與歐亞大陸的大整合</p>
        </div>

        <div className="panel-content">
          {selectedCity ? (
            <>
              <h2>{selectedCity.name}</h2>
              
              {/* 次級圖譜：迷你力導向圖 */}
              <MiniGraph city={selectedCity} />

              <div className="description-box">
                {selectedCity.description}
              </div>

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

              {selectedCity.infrastructure && selectedCity.infrastructure.length > 0 && (
                <>
                  <h3 className="section-title"><Building2 size={18} color="var(--badge-infrastructure)" /> 基礎設施</h3>
                  <div className="badge-container">
                    {selectedCity.infrastructure.map((inf: string, i: number) => (
                      <span key={i} className="badge" style={{ backgroundColor: 'var(--badge-infrastructure)' }}>{inf}</span>
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
            </>
          ) : (
            <div className="default-state">
              <MapIcon size={48} style={{ color: '#cbd5e1', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '1.2rem', color: '#64748b' }}>點擊地圖上的城市</h2>
              <p style={{ marginTop: '8px' }}>
                探索 13-14 世紀歐亞大陸的歷史、人物與技術傳播路線。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
