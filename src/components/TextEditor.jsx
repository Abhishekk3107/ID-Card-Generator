import React from 'react';
import { 
  PencilSquareIcon,
  BuildingOfficeIcon,
  UserIcon,
  PhoneIcon,
  AdjustmentsHorizontalIcon,
  SwatchIcon
} from '@heroicons/react/24/solid';
import { fontFamilies, colors } from '../templates/defaultTemplates';

const TextEditor = ({ texts, selectedTextId, onUpdateText, onSelectText }) => {
  const selectedText = texts.find(t => t.id === selectedTextId);

  if (!selectedText) {
    return (
      <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-2xl p-6 border border-white/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            <PencilSquareIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Text Editor</h2>
            <p className="text-sm text-gray-600">Customize your ID card</p>
          </div>
        </div>
        <div className="bg-orange-50/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-dashed border-orange-300 text-center">
          <AdjustmentsHorizontalIcon className="w-16 h-16 text-orange-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Select a text field to edit</p>
        </div>
      </div>
    );
  }

  const handleChange = (property, value) => {
    onUpdateText(selectedTextId, { [property]: value });
  };

  const organizationFields = texts.filter(t => t.id === 'organization');
  const personalFields = texts.filter(t => ['name', 'designation', 'department'].includes(t.id));
  const contactFields = texts.filter(t => ['employeeId', 'email', 'phone'].includes(t.id));

  return (
    <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-2xl p-6 border border-white/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
          <PencilSquareIcon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Text Editor</h2>
          <p className="text-sm text-gray-600">Editing: <span className="font-semibold text-purple-600">{selectedText.label}</span></p>
        </div>
      </div>
      
      {/* Field Selection */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
            <BuildingOfficeIcon className="w-4 h-4" />
            Organization
          </label>
          <div className="flex flex-wrap gap-2">
            {organizationFields.map((text) => (
              <button
                key={text.id}
                onClick={() => onSelectText(text.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedTextId === text.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-purple-100 border-2 border-purple-200'
                }`}
              >
                {text.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Personal Info
          </label>
          <div className="flex flex-wrap gap-2">
            {personalFields.map((text) => (
              <button
                key={text.id}
                onClick={() => onSelectText(text.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedTextId === text.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-blue-100 border-2 border-blue-200'
                }`}
              >
                {text.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            Contact & ID
          </label>
          <div className="flex flex-wrap gap-2">
            {contactFields.map((text) => (
              <button
                key={text.id}
                onClick={() => onSelectText(text.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedTextId === text.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-green-100 border-2 border-green-200'
                }`}
              >
                {text.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="space-y-4 bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/70">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <PencilSquareIcon className="w-4 h-4" />
            Content
          </label>
          <input
            type="text"
            value={selectedText.content}
            onChange={(e) => handleChange('content', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 bg-white/90 font-medium transition-all"
            placeholder={`Enter ${selectedText.label}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              X Position
            </label>
            <input
              type="number"
              value={selectedText.x}
              onChange={(e) => handleChange('x', parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 bg-white/90 font-mono transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              Y Position
            </label>
            <input
              type="number"
              value={selectedText.y}
              onChange={(e) => handleChange('y', parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 bg-white/90 font-mono transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Font Size: <span className="text-purple-600">{selectedText.fontSize}px</span>
          </label>
          <input
            type="range"
            min="12"
            max="48"
            value={selectedText.fontSize}
            onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={selectedText.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 bg-white/90 font-medium cursor-pointer transition-all"
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <SwatchIcon className="w-4 h-4" />
            Text Color
          </label>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleChange('color', color)}
                className={`w-full h-12 rounded-xl border-4 transition-all transform hover:scale-110 shadow-md ${
                  selectedText.color === color
                    ? 'border-purple-500 scale-110 ring-4 ring-purple-300'
                    : 'border-white hover:border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Font Weight
            </label>
            <select
              value={selectedText.fontWeight}
              onChange={(e) => handleChange('fontWeight', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 bg-white/90 font-medium cursor-pointer transition-all"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Light</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Alignment
            </label>
            <select
              value={selectedText.textAlign}
              onChange={(e) => handleChange('textAlign', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 bg-white/90 font-medium cursor-pointer transition-all"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
