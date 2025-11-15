import React, { useRef } from 'react';
import { 
  SwatchIcon, 
  CloudArrowUpIcon,
  CheckBadgeIcon 
} from '@heroicons/react/24/solid';

const TemplateSelector = ({ templates, selectedTemplate, onSelectTemplate, onUploadTemplate }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUploadTemplate(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-2xl p-6 mb-6 border border-white/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <SwatchIcon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Choose Template</h2>
          <p className="text-sm text-gray-600">Select a design or upload your own</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {templates.map((template, index) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={`group cursor-pointer rounded-2xl overflow-hidden border-4 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-slide-up ${
              selectedTemplate?.id === template.id
                ? 'border-purple-500 shadow-2xl scale-105 ring-4 ring-purple-300'
                : 'border-white/60 hover:border-purple-300'
            }`}
          >
            <div
              className="h-40 flex items-center justify-center text-white font-bold text-xl relative overflow-hidden"
              style={{ background: template.background }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
              <span className="relative z-10 drop-shadow-lg">{template.name}</span>
              {selectedTemplate?.id === template.id && (
                <CheckBadgeIcon className="absolute top-3 right-3 w-8 h-8 text-white drop-shadow-lg" />
              )}
            </div>
            <div className={`px-4 py-3 text-center font-medium transition-colors ${
              selectedTemplate?.id === template.id
                ? 'bg-purple-500 text-white'
                : 'bg-white/80 text-gray-700 group-hover:bg-purple-50'
            }`}>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm">856 × 540px</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 group"
        >
          <CloudArrowUpIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>Upload Custom Background</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default TemplateSelector;
