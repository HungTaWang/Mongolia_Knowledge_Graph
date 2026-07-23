import { useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface MiniGraphProps {
  city: any;
  onEntityClick?: (entityName: string) => void;
}

export default function MiniGraph({ city, onEntityClick }: MiniGraphProps) {
  const graphData = useMemo(() => {
    const nodes = [
      { id: city.id, name: city.name, group: 'city', val: 10 }
    ];
    const links: any[] = [];

    // Add people nodes
    (city.people || []).forEach((person: string) => {
      nodes.push({ id: person, name: person, group: 'person', val: 5 });
      links.push({ source: city.id, target: person });
    });

    // Add religion/thought nodes
    (city.religion || []).forEach((r: string) => {
      nodes.push({ id: r, name: r, group: 'religion', val: 5 });
      links.push({ source: city.id, target: r });
    });

    return { nodes, links };
  }, [city]);

  const getColor = (node: any) => {
    switch(node.group) {
      case 'city': return '#dc2626';
      case 'person': return '#d97706';
      case 'religion': return '#9333ea';
      default: return '#94a3b8';
    }
  };

  return (
    <div style={{ height: '200px', width: '100%', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px', overflow: 'hidden' }}>
      <ForceGraph2D
        width={300}
        height={200}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={getColor}
        nodeRelSize={4}
        linkColor={() => 'rgba(148, 163, 184, 0.4)'}
        d3VelocityDecay={0.3}
        cooldownTicks={100}
        onNodeClick={(node: any) => {
          if (onEntityClick) {
            // For person/tech nodes, the base name is needed
            const baseName = node.name.split('(')[0].trim();
            onEntityClick(baseName);
          }
        }}
      />
    </div>
  );
}
