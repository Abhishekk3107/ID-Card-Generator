import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  SparklesIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/solid';

const IDCardCanvas = ({
  template,
  texts,
  selectedTextId,
  onUpdateText,
  onSelectText,
  customBackground,
  userPhoto,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const maxWidth = containerWidth - 40;
      const cardWidth = template.width;
      
      if (maxWidth < cardWidth) {
        setScale(maxWidth / cardWidth);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [template.width]);

  useEffect(() => {
    const drawCanvas = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (customBackground) {
        const img = new Image();
        img.src = customBackground;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawPatterns();
          drawPhotoPlaceholder();
        };
      } else {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const matches = template.background.match(/#[0-9a-fA-F]{6}/g);
        if (matches && matches.length >= 2) {
          gradient.addColorStop(0, matches[0]);
          gradient.addColorStop(1, matches[1]);
        } else {
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawPatterns();
        drawPhotoPlaceholder();
      }

      function drawPatterns() {
        if (template.hasPattern && template.pattern) {
          template.pattern.elements.forEach(element => {
            ctx.save();
            if (element.type === 'circle') {
              ctx.beginPath();
              ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
              ctx.fillStyle = element.color;
              ctx.fill();
            } else if (element.type === 'rect') {
              if (element.rotation) {
                ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
                ctx.rotate((element.rotation * Math.PI) / 180);
                ctx.fillStyle = element.color;
                ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);
              } else {
                ctx.fillStyle = element.color;
                ctx.fillRect(element.x, element.y, element.width, element.height);
              }
            } else if (element.type === 'line') {
              ctx.strokeStyle = element.color;
              ctx.lineWidth = element.width;
              ctx.beginPath();
              ctx.moveTo(element.x1, element.y1);
              ctx.lineTo(element.x2, element.y2);
              ctx.stroke();
            }
            ctx.restore();
          });
        }
      }

      function drawPhotoPlaceholder() {
        if (template.hasPhoto && template.photoConfig) {
          const { x, y, width, height, borderRadius, borderColor, borderWidth } = template.photoConfig;
          
          // Draw border
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = borderWidth;
          ctx.beginPath();
          ctx.roundRect(x - borderWidth/2, y - borderWidth/2, width + borderWidth, height + borderWidth, borderRadius);
          ctx.stroke();

          // Draw photo background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.roundRect(x, y, width, height, borderRadius);
          ctx.fill();

          if (userPhoto) {
            const img = new Image();
            img.src = userPhoto;
            img.onload = () => {
              ctx.save();
              
              // Create clipping path for rounded corners
              ctx.beginPath();
              ctx.roundRect(x, y, width, height, borderRadius);
              ctx.clip();
              
              // Calculate aspect ratio fit (cover behavior)
              const imgAspect = img.width / img.height;
              const boxAspect = width / height;
              
              let drawWidth, drawHeight, drawX, drawY;
              
              if (imgAspect > boxAspect) {
                // Image is wider - fit to height
                drawHeight = height;
                drawWidth = height * imgAspect;
                drawX = x - (drawWidth - width) / 2; // Center horizontally
                drawY = y;
              } else {
                // Image is taller - fit to width
                drawWidth = width;
                drawHeight = width / imgAspect;
                drawX = x;
                drawY = y - (drawHeight - height) / 2; // Center vertically
              }
              
              ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
              ctx.restore();
            };
          } else {
            // Draw camera icon placeholder
            ctx.fillStyle = '#cccccc';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('📷', x + width/2, y + height/2 - 20);
            ctx.font = '14px Arial';
            ctx.fillText('Upload Photo', x + width/2, y + height/2 + 30);
          }
        }
      }
    };
    drawCanvas();
  }, [template, customBackground, userPhoto]);

  const scaledWidth = template.width * scale;
  const scaledHeight = template.height * scale;
  const isMobile = window.innerWidth < 900;

  const handleMove = (direction) => {
    if (!selectedTextId) return;
    const selectedText = texts.find(t => t.id === selectedTextId);
    if (!selectedText) return;

    const step = 2;
    let newX = selectedText.x;
    let newY = selectedText.y;

    switch(direction) {
      case 'up': newY -= step; break;
      case 'down': newY += step; break;
      case 'left': newX -= step; break;
      case 'right': newX += step; break;
    }

    onUpdateText(selectedTextId, { x: newX, y: newY });
  };

  return (
    <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/50" ref={containerRef}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <SparklesIcon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Live Preview</h2>
          <p className="text-sm text-gray-600">Professional ID Card</p>
        </div>
      </div>

      {/* Mobile Arrow Controls */}
      {isMobile && selectedTextId && (
        <div className="mb-4 p-4 bg-blue-50/80 backdrop-blur-sm rounded-2xl border border-blue-200">
          <p className="text-sm text-blue-900 font-semibold mb-3 text-center flex items-center justify-center gap-2">
            <CursorArrowRaysIcon className="w-4 h-4" />
            Move: {texts.find(t => t.id === selectedTextId)?.label}
          </p>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleMove('up')}
              className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all"
            >
              <ArrowUpIcon className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => handleMove('left')}
                className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleMove('down')}
                className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                <ArrowDownIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleMove('right')}
                className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                <ArrowRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Preview Container */}
      <div className="flex justify-center w-full">
        <div
          className="relative border-4 border-gray-300 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            maxWidth: '100%',
          }}
        >
          {/* Canvas Layer */}
          <div
            style={{
              width: `${template.width}px`,
              height: `${template.height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <canvas
              ref={canvasRef}
              width={template.width}
              height={template.height}
              className="block"
              id="id-card-canvas"
            />
          </div>
          
          {/* Text Elements Layer */}
          <div
            style={{
              width: `${template.width}px`,
              height: `${template.height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          >
            {texts.map((text) => (
              <Draggable
                key={text.id}
                position={{ x: text.x, y: text.y }}
                onDrag={(e, data) => {
                  onUpdateText(text.id, { x: data.x, y: data.y });
                }}
                bounds={{ left: 0, top: 0, right: template.width - 50, bottom: template.height - 20 }}
                disabled={isMobile}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectText(text.id);
                  }}
                  className={`absolute select-none pointer-events-auto transition-all ${
                    !isMobile ? 'cursor-move hover:opacity-80' : 'cursor-pointer'
                  } ${
                    selectedTextId === text.id ? 'ring-2 ring-blue-500 ring-offset-1 z-10' : 'z-0'
                  }`}
                  style={{
                    fontSize: `${text.fontSize}px`,
                    fontFamily: text.fontFamily,
                    color: text.color,
                    fontWeight: text.fontWeight,
                    textAlign: text.textAlign,
                    whiteSpace: 'nowrap',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: selectedTextId === text.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    left: 0,
                    top: 0,
                    transform: `translate(${text.x}px, ${text.y}px)`,
                  }}
                >
                  {text.content}
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-4 p-3 bg-blue-50/80 backdrop-blur-sm rounded-2xl border border-blue-200">
        <p className="text-sm text-blue-900 font-semibold mb-2">
          💡 Quick Tips:
        </p>
        <ul className="text-xs text-blue-800 space-y-1">
          {isMobile ? (
            <>
              <li>• Tap text to select it</li>
              <li>• Use arrow buttons to move</li>
              <li>• Edit in the panel below</li>
            </>
          ) : (
            <>
              <li>• Drag text to reposition</li>
              <li>• Click to select for editing</li>
              <li>• Customize in editor panel</li>
            </>
          )}
        </ul>
      </div>

      {scale < 1 && (
        <div className="text-xs mt-3 text-center text-purple-700 bg-purple-50/80 backdrop-blur-sm rounded-xl p-2 border border-purple-200">
          ⚡ Preview scaled to {(scale * 100).toFixed(0)}% to fit screen
        </div>
      )}
    </div>
  );
};

export default IDCardCanvas;
