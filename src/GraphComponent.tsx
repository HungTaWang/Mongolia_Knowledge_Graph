import { useCallback, useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface Node {
  id: string;
  name: string;
  group: string;
  val: number;
  x?: number;
  y?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  label: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface GraphComponentProps {
  data: GraphData;
  onNodeClick: (node: Node) => void;
  selectedNode: Node | null;
}

const groupColors: Record<string, string> = {
  Geography: '#8b5cf6', // Purple
  Person: '#d97706',    // Amber
  Tech: '#0284c7',      // Light Blue
  Infrastructure: '#dc2626' // Red
};

export default function GraphComponent({ data, onNodeClick, selectedNode }: GraphComponentProps) {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle resize
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleNodeClick = useCallback(
    (node: any) => {
      if (fgRef.current) {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(2.5, 1000);
      }
      onNodeClick(node as Node);
    },
    [onNodeClick]
  );

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeLabel="" // We draw our own label
        nodeRelSize={6}
        linkColor={() => '#cbd5e1'}
        linkWidth={1.5}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkLabel="label"
        onNodeClick={handleNodeClick}
        backgroundColor="rgba(255, 255, 255, 0)"
        // Custom Node Drawing for always-visible text
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px "Noto Sans TC", sans-serif`;
          
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4); 

          const color = groupColors[node.group] || '#94a3b8';
          const isSelected = selectedNode?.id === node.id;

          // Draw Node Circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, Math.sqrt(node.val) * 2, 0, 2 * Math.PI, false);
          ctx.fillStyle = color;
          ctx.fill();
          
          if (isSelected) {
            ctx.lineWidth = 2 / globalScale;
            ctx.strokeStyle = '#0f172a';
            ctx.stroke();
          }

          // Draw Text Background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fillRect(
            node.x + Math.sqrt(node.val) * 2 + 2 / globalScale, 
            node.y - bckgDimensions[1] / 2, 
            bckgDimensions[0], 
            bckgDimensions[1]
          );

          // Draw Text
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = isSelected ? '#0f172a' : '#334155';
          ctx.fillText(
            label, 
            node.x + Math.sqrt(node.val) * 2 + 2 / globalScale + fontSize * 0.2, 
            node.y
          );
        }}
        // Enable reading edges easily
        linkCanvasObjectMode={() => 'after'}
        linkCanvasObject={(link: any, ctx, globalScale) => {
          const start = link.source;
          const end = link.target;
          
          if (typeof start !== 'object' || typeof end !== 'object') return;
          
          const textPos = Object.assign({}, ...['x', 'y'].map(c => ({
            // @ts-ignore
            [c]: start[c] + (end[c] - start[c]) / 2 
          })));

          const relLink = { x: end.x - start.x, y: end.y - start.y };
          let textAngle = Math.atan2(relLink.y, relLink.x);
          // maintain label text objective
          if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
          if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

          const fontSize = 10 / globalScale;
          ctx.font = `${fontSize}px "Noto Sans TC", sans-serif`;
          ctx.fillStyle = '#94a3b8';
          
          ctx.save();
          ctx.translate(textPos.x, textPos.y);
          ctx.rotate(textAngle);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(link.label, 0, -3 / globalScale);
          ctx.restore();
        }}
      />
    </div>
  );
}
