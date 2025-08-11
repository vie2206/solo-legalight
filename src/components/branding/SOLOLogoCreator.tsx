import React, { useState, useRef, useCallback } from 'react';
import { 
  Download, 
  Palette, 
  Type, 
  Move, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Grid, 
  Eye, 
  Copy, 
  Save, 
  RefreshCw, 
  Settings2, 
  Layers, 
  Square, 
  Circle, 
  Triangle, 
  Hexagon, 
  Star,
  Sparkles,
  Crown,
  Diamond
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';
import SOLOGlassIcon from '../icons/SOLOGlassIconsSystem';

// SOLO Brand Colors
const SOLO_BRAND_COLORS = {
  primary: '#0000FF', // SOLO Blue
  primaryLight: '#3333FF',
  primaryDark: '#0000CC',
  secondary: '#6366F1', // Indigo
  accent: '#EC4899', // Pink
  success: '#10B981', // Green
  warning: '#F59E0B', // Amber
  gray: '#6B7280'
};

// Logo Shape Categories based on UI8 Shapes Creator
type LogoShapeCategory = 'geometric' | 'organic' | 'abstract' | 'tech' | 'legal' | 'educational';
type LogoStyle = 'modern' | 'classic' | 'tech' | 'legal' | 'creative' | 'minimal';
type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoElement {
  id: string;
  type: 'shape' | 'text';
  shapeId?: string;
  text?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
  opacity: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
}

interface SOLOLogoCreatorProps {
  onLogoSave?: (logoData: any) => void;
  className?: string;
}

// Professional Shape Templates
const logoShapeTemplates = {
  geometric: [
    { 
      id: 'circle-1', 
      name: 'Modern Circle', 
      svg: '<circle cx="25" cy="25" r="20" fill="currentColor"/>',
      category: 'geometric',
      style: 'modern'
    },
    { 
      id: 'square-1', 
      name: 'Rounded Square', 
      svg: '<rect x="5" y="5" width="40" height="40" rx="8" fill="currentColor"/>',
      category: 'geometric',
      style: 'modern'
    },
    { 
      id: 'triangle-1', 
      name: 'Modern Triangle', 
      svg: '<polygon points="25,5 45,40 5,40" fill="currentColor"/>',
      category: 'geometric',
      style: 'modern'
    },
    { 
      id: 'hexagon-1', 
      name: 'Tech Hexagon', 
      svg: '<polygon points="25,2 40,12.5 40,37.5 25,48 10,37.5 10,12.5" fill="currentColor"/>',
      category: 'tech',
      style: 'tech'
    },
    { 
      id: 'diamond-1', 
      name: 'Premium Diamond', 
      svg: '<polygon points="25,5 40,20 25,45 10,20" fill="currentColor"/>',
      category: 'abstract',
      style: 'creative'
    },
  ],
  legal: [
    { 
      id: 'scale-1', 
      name: 'Justice Scale', 
      svg: `<g fill="currentColor">
        <rect x="23" y="10" width="4" height="30"/>
        <circle cx="15" cy="40" r="8"/>
        <circle cx="35" cy="40" r="8"/>
        <line x1="15" y1="32" x2="35" y2="32" stroke="currentColor" stroke-width="2"/>
      </g>`,
      category: 'legal',
      style: 'legal'
    },
    { 
      id: 'shield-1', 
      name: 'Legal Shield', 
      svg: '<path d="M25,5 L40,12 L40,30 C40,38 32,45 25,45 C18,45 10,38 10,30 L10,12 Z" fill="currentColor"/>',
      category: 'legal',
      style: 'legal'
    },
    { 
      id: 'pillar-1', 
      name: 'Justice Pillar', 
      svg: `<g fill="currentColor">
        <rect x="10" y="40" width="30" height="5"/>
        <rect x="15" y="15" width="5" height="25"/>
        <rect x="30" y="15" width="5" height="25"/>
        <rect x="12" y="10" width="26" height="5"/>
      </g>`,
      category: 'legal',
      style: 'classic'
    },
  ],
  educational: [
    { 
      id: 'book-1', 
      name: 'Open Book', 
      svg: `<g fill="currentColor">
        <path d="M10,15 Q25,10 40,15 L40,35 Q25,30 10,35 Z"/>
        <path d="M25,12 L25,32" stroke="currentColor" stroke-width="1"/>
      </g>`,
      category: 'educational',
      style: 'classic'
    },
    { 
      id: 'graduation-1', 
      name: 'Graduation Cap', 
      svg: `<g fill="currentColor">
        <polygon points="25,10 5,20 25,25 45,20"/>
        <polygon points="40,22 40,32 35,35 40,35"/>
      </g>`,
      category: 'educational',
      style: 'educational'
    },
    { 
      id: 'brain-1', 
      name: 'Smart Brain', 
      svg: '<path d="M15,20 C12,15 18,12 22,15 C25,10 35,12 38,18 C42,20 40,28 35,30 C38,35 30,38 25,35 C20,38 12,35 15,30 C10,28 8,20 15,20 Z" fill="currentColor"/>',
      category: 'educational',
      style: 'modern'
    },
  ],
  tech: [
    { 
      id: 'circuit-1', 
      name: 'Circuit Board', 
      svg: `<g fill="currentColor">
        <rect x="15" y="15" width="20" height="20" rx="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="38" cy="12" r="2"/>
        <circle cx="12" cy="38" r="2"/>
        <circle cx="38" cy="38" r="2"/>
        <line x1="12" y1="12" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
        <line x1="38" y1="12" x2="35" y2="15" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="38" x2="15" y2="35" stroke="currentColor" stroke-width="2"/>
        <line x1="38" y1="38" x2="35" y2="35" stroke="currentColor" stroke-width="2"/>
      </g>`,
      category: 'tech',
      style: 'tech'
    },
    { 
      id: 'network-1', 
      name: 'Network Nodes', 
      svg: `<g fill="currentColor">
        <circle cx="25" cy="15" r="4"/>
        <circle cx="15" cy="30" r="4"/>
        <circle cx="35" cy="30" r="4"/>
        <circle cx="25" cy="40" r="4"/>
        <line x1="25" y1="15" x2="15" y2="30" stroke="currentColor" stroke-width="2"/>
        <line x1="25" y1="15" x2="35" y2="30" stroke="currentColor" stroke-width="2"/>
        <line x1="15" y1="30" x2="35" y2="30" stroke="currentColor" stroke-width="2"/>
        <line x1="15" y1="30" x2="25" y2="40" stroke="currentColor" stroke-width="2"/>
        <line x1="35" y1="30" x2="25" y2="40" stroke="currentColor" stroke-width="2"/>
      </g>`,
      category: 'tech',
      style: 'tech'
    },
  ],
  abstract: [
    { 
      id: 'infinity-1', 
      name: 'Infinity Loop', 
      svg: '<path d="M15,25 C10,15 5,15 10,25 C15,35 20,35 15,25 C20,15 25,15 20,25 C25,35 30,35 25,25 C30,15 35,15 30,25 C35,35 40,35 35,25" stroke="currentColor" stroke-width="3" fill="none"/>',
      category: 'abstract',
      style: 'creative'
    },
    { 
      id: 'spiral-1', 
      name: 'Growth Spiral', 
      svg: '<path d="M25,25 C25,20 30,20 30,25 C30,32 20,32 20,25 C20,15 35,15 35,25 C35,40 10,40 10,25 C10,5 45,5 45,25" stroke="currentColor" stroke-width="3" fill="none"/>',
      category: 'abstract',
      style: 'creative'
    },
  ],
};

const SOLOLogoCreator: React.FC<SOLOLogoCreatorProps> = ({
  onLogoSave,
  className = ''
}) => {
  const [elements, setElements] = useState<LogoElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<LogoSize>('md');
  const [logoStyle, setLogoStyle] = useState<LogoStyle>('modern');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(100);
  
  const canvasRef = useRef<SVGSVGElement>(null);

  // Logo size configurations
  const logoSizes = {
    sm: { width: 200, height: 200, fontSize: 12 },
    md: { width: 300, height: 300, fontSize: 16 },
    lg: { width: 400, height: 400, fontSize: 20 },
    xl: { width: 500, height: 500, fontSize: 24 }
  };

  const currentSize = logoSizes[logoSize];

  // Add shape to canvas
  const addShape = useCallback((shapeTemplate: any) => {
    const newElement: LogoElement = {
      id: `element-${Date.now()}`,
      type: 'shape',
      shapeId: shapeTemplate.id,
      x: currentSize.width / 2 - 25,
      y: currentSize.height / 2 - 25,
      width: 50,
      height: 50,
      rotation: 0,
      color: SOLO_BRAND_COLORS.primary,
      opacity: 1
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  }, [currentSize]);

  // Add text to canvas
  const addText = useCallback((text: string = 'SOLO') => {
    const newElement: LogoElement = {
      id: `element-${Date.now()}`,
      type: 'text',
      text,
      x: currentSize.width / 2 - 50,
      y: currentSize.height / 2 + 60,
      width: 100,
      height: 30,
      rotation: 0,
      color: SOLO_BRAND_COLORS.primary,
      opacity: 1,
      fontSize: currentSize.fontSize + 4,
      fontFamily: 'Griggs-Sans, sans-serif',
      fontWeight: 'bold'
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  }, [currentSize]);

  // Update element properties
  const updateElement = useCallback((id: string, updates: Partial<LogoElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  }, []);

  // Delete element
  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  }, []);

  // Generate preset logos
  const generatePresetLogo = useCallback((preset: 'classic' | 'modern' | 'tech' | 'legal') => {
    setElements([]);
    
    const presets = {
      classic: () => {
        // Classic SOLO with pillar design
        addShape(logoShapeTemplates.legal.find(s => s.id === 'pillar-1')!);
        setTimeout(() => addText('SOLO'), 100);
      },
      modern: () => {
        // Modern geometric SOLO
        addShape(logoShapeTemplates.geometric.find(s => s.id === 'hexagon-1')!);
        setTimeout(() => addText('SOLO'), 100);
      },
      tech: () => {
        // Tech-focused design
        addShape(logoShapeTemplates.tech.find(s => s.id === 'network-1')!);
        setTimeout(() => addText('SOLO'), 100);
      },
      legal: () => {
        // Legal-focused design
        addShape(logoShapeTemplates.legal.find(s => s.id === 'scale-1')!);
        setTimeout(() => addText('SOLO'), 100);
      }
    };

    presets[preset]();
  }, [addShape, addText]);

  // Export logo
  const exportLogo = useCallback((format: 'svg' | 'png') => {
    if (!canvasRef.current) return;

    const svgElement = canvasRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    
    if (format === 'svg') {
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'solo-logo.svg';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'png') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = currentSize.width * 2; // 2x for retina
      canvas.height = currentSize.height * 2;
      
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'solo-logo.png';
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  }, [currentSize]);

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <SOLOGlassIcon name="achieve-crown" size="lg" variant="crystal" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">SOLO Logo Creator</h2>
              <p className="text-white/80">Professional logo design system</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportLogo('svg')}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              SVG
            </button>
            <button
              onClick={() => exportLogo('png')}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PNG
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Toolbox */}
        <div className="w-80 bg-gray-50 p-6 border-r border-gray-200 max-h-[600px] overflow-y-auto">
          {/* Quick Presets */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Quick Presets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => generatePresetLogo('modern')}
                className="px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
              >
                Modern
              </button>
              <button
                onClick={() => generatePresetLogo('legal')}
                className="px-3 py-2 bg-purple-100 text-purple-700 text-sm rounded-lg hover:bg-purple-200 transition-colors"
              >
                Legal
              </button>
              <button
                onClick={() => generatePresetLogo('tech')}
                className="px-3 py-2 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 transition-colors"
              >
                Tech
              </button>
              <button
                onClick={() => generatePresetLogo('classic')}
                className="px-3 py-2 bg-amber-100 text-amber-700 text-sm rounded-lg hover:bg-amber-200 transition-colors"
              >
                Classic
              </button>
            </div>
          </div>

          {/* Add Elements */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Add Elements
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => addText('SOLO')}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Type className="w-4 h-4" />
                Add Text
              </button>
            </div>
          </div>

          {/* Shape Categories */}
          {Object.entries(logoShapeTemplates).map(([category, shapes]) => (
            <div key={category} className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 capitalize flex items-center gap-2">
                {category === 'geometric' && <Square className="w-4 h-4" />}
                {category === 'legal' && <Crown className="w-4 h-4" />}
                {category === 'educational' && <Star className="w-4 h-4" />}
                {category === 'tech' && <Diamond className="w-4 h-4" />}
                {category === 'abstract' && <Circle className="w-4 h-4" />}
                {category} Shapes
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => addShape(shape)}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    <div 
                      className="w-8 h-8 mx-auto mb-1"
                      dangerouslySetInnerHTML={{
                        __html: `<svg viewBox="0 0 50 50" class="w-full h-full text-gray-600">${shape.svg}</svg>`
                      }}
                    />
                    <span className="text-xs text-gray-600">{shape.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Logo Settings */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Logo Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select
                  value={logoSize}
                  onChange={(e) => setLogoSize(e.target.value as LogoSize)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sm">Small (200x200)</option>
                  <option value="md">Medium (300x300)</option>
                  <option value="lg">Large (400x400)</option>
                  <option value="xl">Extra Large (500x500)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-8 border border-gray-200 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Show Grid</span>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    showGrid ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    showGrid ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Controls */}
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium px-2">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-lg transition-colors ${
                  showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {setElements([]); setSelectedElement(null);}}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-100">
            <div 
              className="relative bg-white shadow-lg"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center'
              }}
            >
              <svg
                ref={canvasRef}
                width={currentSize.width}
                height={currentSize.height}
                viewBox={`0 0 ${currentSize.width} ${currentSize.height}`}
                className="border border-gray-300"
                style={{ backgroundColor }}
              >
                {/* Grid */}
                {showGrid && (
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                )}
                {showGrid && (
                  <rect width="100%" height="100%" fill="url(#grid)" />
                )}

                {/* Render Elements */}
                {elements.map((element) => {
                  const isSelected = element.id === selectedElement;
                  
                  if (element.type === 'text') {
                    return (
                      <g key={element.id}>
                        <text
                          x={element.x}
                          y={element.y}
                          fontSize={element.fontSize}
                          fontFamily={element.fontFamily}
                          fontWeight={element.fontWeight}
                          fill={element.color}
                          opacity={element.opacity}
                          transform={`rotate(${element.rotation}, ${element.x}, ${element.y})`}
                          className={isSelected ? 'cursor-move' : 'cursor-pointer'}
                          onClick={() => setSelectedElement(element.id)}
                        >
                          {element.text}
                        </text>
                        {isSelected && (
                          <rect
                            x={element.x - 5}
                            y={element.y - element.fontSize! - 5}
                            width={element.width + 10}
                            height={element.height + 10}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                          />
                        )}
                      </g>
                    );
                  }

                  if (element.type === 'shape') {
                    const shapeTemplate = Object.values(logoShapeTemplates)
                      .flat()
                      .find(s => s.id === element.shapeId);
                    
                    return (
                      <g key={element.id}>
                        <g
                          transform={`translate(${element.x}, ${element.y}) rotate(${element.rotation}, ${element.width/2}, ${element.height/2}) scale(${element.width/50}, ${element.height/50})`}
                          opacity={element.opacity}
                          className={isSelected ? 'cursor-move' : 'cursor-pointer'}
                          onClick={() => setSelectedElement(element.id)}
                        >
                          <g
                            dangerouslySetInnerHTML={{
                              __html: shapeTemplate?.svg.replace('currentColor', element.color) || ''
                            }}
                          />
                        </g>
                        {isSelected && (
                          <rect
                            x={element.x - 2}
                            y={element.y - 2}
                            width={element.width + 4}
                            height={element.height + 4}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        )}
                      </g>
                    );
                  }
                  
                  return null;
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedEl && (
          <div className="w-80 bg-gray-50 p-6 border-l border-gray-200 max-h-[600px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Properties</h3>
              <button
                onClick={() => deleteElement(selectedEl.id)}
                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600">X</label>
                    <input
                      type="number"
                      value={Math.round(selectedEl.x)}
                      onChange={(e) => updateElement(selectedEl.id, { x: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Y</label>
                    <input
                      type="number"
                      value={Math.round(selectedEl.y)}
                      onChange={(e) => updateElement(selectedEl.id, { y: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Size */}
              {selectedEl.type === 'shape' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600">Width</label>
                      <input
                        type="number"
                        value={Math.round(selectedEl.width)}
                        onChange={(e) => updateElement(selectedEl.id, { width: parseInt(e.target.value) || 0 })}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Height</label>
                      <input
                        type="number"
                        value={Math.round(selectedEl.height)}
                        onChange={(e) => updateElement(selectedEl.id, { height: parseInt(e.target.value) || 0 })}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Text Properties */}
              {selectedEl.type === 'text' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                    <input
                      type="text"
                      value={selectedEl.text}
                      onChange={(e) => updateElement(selectedEl.id, { text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                    <input
                      type="range"
                      min="8"
                      max="72"
                      value={selectedEl.fontSize}
                      onChange={(e) => updateElement(selectedEl.id, { fontSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-600 text-center">{selectedEl.fontSize}px</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                    <select
                      value={selectedEl.fontWeight}
                      onChange={(e) => updateElement(selectedEl.id, { fontWeight: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    >
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                      <option value="lighter">Light</option>
                    </select>
                  </div>
                </>
              )}

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedEl.color}
                    onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                    className="w-12 h-8 border border-gray-200 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedEl.color}
                    onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm"
                  />
                </div>
                
                {/* Brand Colors */}
                <div className="grid grid-cols-4 gap-1 mt-2">
                  {Object.values(SOLO_BRAND_COLORS).map((color) => (
                    <button
                      key={color}
                      onClick={() => updateElement(selectedEl.id, { color })}
                      className="w-8 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Rotation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rotation</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={selectedEl.rotation}
                  onChange={(e) => updateElement(selectedEl.id, { rotation: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-gray-600 text-center">{selectedEl.rotation}°</div>
              </div>

              {/* Opacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedEl.opacity}
                  onChange={(e) => updateElement(selectedEl.id, { opacity: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-gray-600 text-center">{Math.round(selectedEl.opacity * 100)}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOLOLogoCreator;
export type { LogoElement, LogoShapeCategory, LogoStyle, LogoSize };