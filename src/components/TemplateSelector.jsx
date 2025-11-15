import React, { useRef } from 'react';

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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 shadow-lg scale-105'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div
              className="h-40 flex items-center justify-center text-white font-bold text-xl"
              style={{ 
                background: template.background,
                aspectRatio: '856/540'
              }}
            >
              {template.name}
            </div>
            <div className="bg-gray-50 px-3 py-2 text-center text-sm text-gray-600">
              Horizontal • 856×540px
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          📤 Upload Custom Template (856×540px recommended)
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
