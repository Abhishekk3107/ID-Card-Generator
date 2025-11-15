import React from 'react';
import { 
  ArrowDownTrayIcon, 
  CheckBadgeIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/solid';
import jsPDF from 'jspdf';

const ExportControls = ({ template, texts, customBackground, userPhoto }) => {
  // [Keep the same generateCanvas, exportAsPNG, exportAsJPG, exportAsPDF functions from before]
  
  const generateCanvas = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = template.width;
      canvas.height = template.height;
      const ctx = canvas.getContext('2d');

      const drawPhoto = () => {
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
          ctx.fillText(text.content, text.x, text.y);
        });
        resolve(canvas);
      };

      if (customBackground) {
        const img = new Image();
        img.src = customBackground;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawPhoto();
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
    <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-2xl p-6 border border-white/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <ArrowDownTrayIcon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Export</h2>
          <p className="text-sm text-gray-600">Download your ID card</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={exportAsPNG}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 group"
        >
          <ArrowDownTrayIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>Export as PNG</span>
        </button>

        <button
          onClick={exportAsJPG}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 group"
        >
          <ArrowDownTrayIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>Export as JPG</span>
        </button>

        <button
          onClick={exportAsPDF}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 group"
        >
          <DocumentChartBarIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>Export as PDF</span>
        </button>
      </div>

      <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm p-4 rounded-2xl border border-green-200/50 shadow-inner">
        <p className="text-sm text-green-900 font-bold mb-2 flex items-center gap-2">
          <CheckBadgeIcon className="w-5 h-5" />
          Print Specifications
        </p>
        <ul className="text-xs text-green-800 space-y-1">
          <li>• Standard Size: 85.6mm × 54mm</li>
          <li>• High Resolution: Print Ready</li>
          <li>• Professional Quality Output</li>
        </ul>
      </div>
    </div>
  );
};

export default ExportControls;
