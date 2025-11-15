import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

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

  // Calculate optimal scale based on container width
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const maxWidth = containerWidth - 40; // Account for padding
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
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = borderWidth;
          ctx.beginPath();
          ctx.roundRect(x - borderWidth/2, y - borderWidth/2, width + borderWidth, height + borderWidth, borderRadius);
          ctx.stroke();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.roundRect(x, y, width, height, borderRadius);
          ctx.fill();

          if (userPhoto) {
            const img = new Image();
            img.src = userPhoto;
            img.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.roundRect(x, y, width, height, borderRadius);
              ctx.clip();
              ctx.drawImage(img, x, y, width, height);
              ctx.restore();
            };
          } else {
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
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6" ref={containerRef}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center">
        Live Preview - Professional ID Card
      </h2>

      {/* Mobile Arrow Controls */}
      {isMobile && selectedTextId && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-semibold mb-3 text-center">
            Move Selected: {texts.find(t => t.id === selectedTextId)?.label}
          </p>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleMove('up')}
              className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-md active:scale-95 transition-transform"
            >
              ↑
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => handleMove('left')}
                className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-md active:scale-95 transition-transform"
              >
                ←
              </button>
              <button
                onClick={() => handleMove('down')}
                className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-md active:scale-95 transition-transform"
              >
                ↓
              </button>
              <button
                onClick={() => handleMove('right')}
                className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-md active:scale-95 transition-transform"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Preview Container */}
      <div className="flex justify-center w-full">
        <div
          className="relative border-4 border-gray-300 rounded-lg overflow-hidden shadow-xl"
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
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tips:</strong>
        </p>
        <ul className="text-sm text-blue-700 mt-2 space-y-1">
          {isMobile ? (
            <>
              <li>• Tap any text to select it</li>
              <li>• Use arrow buttons to move selected text</li>
              <li>• Edit content using the editor panel below</li>
            </>
          ) : (
            <>
              <li>• Click and drag text to reposition</li>
              <li>• Click text to select for editing</li>
              <li>• Customize in the text editor panel</li>
            </>
          )}
        </ul>
      </div>

      {scale < 1 && (
        <div className="text-xs mt-2 text-center text-orange-700 bg-orange-50 rounded p-2">
          ⚡ Preview scaled to {(scale * 100).toFixed(0)}% to fit your screen
        </div>
      )}
    </div>
  );
};

export default IDCardCanvas;
