import React, { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const IDCardCanvas = ({ template, texts, selectedTextId, onUpdateText, onSelectText, customBackground, userPhoto }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const drawCanvas = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      if (customBackground) {
        const img = new Image();
        img.src = customBackground;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawPhotoPlaceholder();
        };
      } else {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        if (template.background.includes('linear-gradient')) {
          const matches = template.background.match(/#[0-9a-fA-F]{6}/g);
          if (matches && matches.length >= 2) {
            gradient.addColorStop(0, matches[0]);
            gradient.addColorStop(1, matches[1]);
          } else {
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
          }
        } else {
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawPhotoPlaceholder();
      }

      // Draw photo placeholder
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
          
          // Draw placeholder icon or photo
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

  const handleDrag = (textId, e, data) => {
    onUpdateText(textId, { x: data.x, y: data.y });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Preview - Professional ID Card</h2>
      
      <div className="flex justify-center">
        <div 
          ref={containerRef}
          className="relative border-4 border-gray-300 rounded-lg overflow-hidden shadow-xl"
          style={{
            width: `${template.width}px`,
            height: `${template.height}px`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={template.width}
            height={template.height}
            className="absolute top-0 left-0"
            id="id-card-canvas"
          />
          
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {texts.map((text) => (
              <Draggable
                key={text.id}
                position={{ x: text.x, y: text.y }}
                onDrag={(e, data) => handleDrag(text.id, e, data)}
                bounds="parent"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectText(text.id);
                  }}
                  className={`absolute cursor-move select-none pointer-events-auto transition-all ${
                    selectedTextId === text.id ? 'ring-2 ring-blue-500 ring-offset-2 z-10' : 'z-0'
                  }`}
                  style={{
                    fontSize: `${text.fontSize}px`,
                    fontFamily: text.fontFamily,
                    color: text.color,
                    fontWeight: text.fontWeight,
                    textAlign: text.textAlign,
                    whiteSpace: 'nowrap',
                    transform: text.textAlign === 'center' ? 'translateX(-50%)' : 
                              text.textAlign === 'right' ? 'translateX(-100%)' : 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: selectedTextId === text.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  }}
                >
                  {text.content}
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tips:</strong>
        </p>
        <ul className="text-sm text-blue-700 mt-2 space-y-1">
          <li>• Click and drag text elements to reposition them</li>
          <li>• Upload a photo using the control panel</li>
          <li>• All fields are editable and customizable</li>
          <li>• Standard horizontal ID card format (85.6mm × 54mm)</li>
        </ul>
      </div>
    </div>
  );
};

export default IDCardCanvas;
