import React from 'react';
import jsPDF from 'jspdf';

const ExportControls = ({ template, texts, customBackground, userPhoto }) => {
  const generateCanvas = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = template.width;
      canvas.height = template.height;
      const ctx = canvas.getContext('2d');

      const drawPhoto = () => {
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
              ctx.beginPath();
              ctx.roundRect(x, y, width, height, borderRadius);
              ctx.clip();
              ctx.drawImage(img, x, y, width, height);
              ctx.restore();
              drawTexts();
            };
          } else {
            drawTexts();
          }
        } else {
          drawTexts();
        }
      };

      const drawTexts = () => {
        texts.forEach((text) => {
          ctx.font = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
          ctx.fillStyle = text.color;
          ctx.textAlign = text.textAlign;
          ctx.textBaseline = 'top';
          
          let xPos = text.x;
          ctx.fillText(text.content, xPos, text.y);
        });
        resolve(canvas);
      };

      // Draw background
      if (customBackground) {
        const img = new Image();
        img.src = customBackground;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawPhoto();
        };
      } else {
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
        drawPhoto();
      }
    });
  };

  const exportAsPNG = async () => {
    const canvas = await generateCanvas();
    const link = document.createElement('a');
    link.download = `id-card-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const exportAsJPG = async () => {
    const canvas = await generateCanvas();
    const link = document.createElement('a');
    link.download = `id-card-${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
  };

  const exportAsPDF = async () => {
    const canvas = await generateCanvas();
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [54, 85.6]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 54);
    pdf.save(`id-card-${Date.now()}.pdf`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">💾 Export Options</h2>
      
      <div className="space-y-3">
        <button
          onClick={exportAsPNG}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export as PNG
        </button>

        <button
          onClick={exportAsJPG}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export as JPG
        </button>

        <button
          onClick={exportAsPDF}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export as PDF (Print-Ready)
        </button>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>📋 Print Specifications:</strong>
        </p>
        <ul className="text-sm text-green-700 mt-2 space-y-1">
          <li>• Dimensions: 85.6mm × 54mm (Standard ID Card)</li>
          <li>• Complete with photo and all details</li>
          <li>• High resolution for professional printing</li>
          <li>• PDF optimized for print shops</li>
        </ul>
      </div>
    </div>
  );
};

export default ExportControls;
