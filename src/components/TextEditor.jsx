import React from 'react';
import { fontFamilies, colors } from '../templates/defaultTemplates';

const TextEditor = ({ texts, selectedTextId, onUpdateText, onSelectText }) => {
  const selectedText = texts.find(t => t.id === selectedTextId);

  if (!selectedText) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Text Editor</h2>
        <p className="text-gray-500">Select a text field to edit</p>
      </div>
    );
  }

  const handleChange = (property, value) => {
    onUpdateText(selectedTextId, { [property]: value });
  };

  // Group fields by category
  const organizationFields = texts.filter(t => t.id === 'organization');
  const personalFields = texts.filter(t => ['name', 'designation', 'department'].includes(t.id));
  const contactFields = texts.filter(t => ['employeeId', 'email', 'phone'].includes(t.id));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 Edit ID Card Fields</h2>
      
      {/* Field Selection by Category */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Organization Details
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {organizationFields.map((text) => (
            <button
              key={text.id}
              onClick={() => onSelectText(text.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTextId === text.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {text.label}
            </button>
          ))}
        </div>

        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Personal Information
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {personalFields.map((text) => (
            <button
              key={text.id}
              onClick={() => onSelectText(text.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTextId === text.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {text.label}
            </button>
          ))}
        </div>

        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Contact & ID
        </label>
        <div className="flex flex-wrap gap-2">
          {contactFields.map((text) => (
            <button
              key={text.id}
              onClick={() => onSelectText(text.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTextId === text.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {text.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current Field Editor */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Editing: {selectedText.label}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <input
              type="text"
              value={selectedText.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${selectedText.label}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                X Position
              </label>
              <input
                type="number"
                value={selectedText.x}
                onChange={(e) => handleChange('x', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Y Position
              </label>
              <input
                type="number"
                value={selectedText.y}
                onChange={(e) => handleChange('y', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Font Size: {selectedText.fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="48"
              value={selectedText.fontSize}
              onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={selectedText.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Text Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleChange('color', color)}
                  className={`w-full h-10 rounded-lg border-2 transition-all ${
                    selectedText.color === color
                      ? 'border-blue-500 scale-110'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Weight
              </label>
              <select
                value={selectedText.fontWeight}
                onChange={(e) => handleChange('fontWeight', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Light</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Text Align
              </label>
              <select
                value={selectedText.textAlign}
                onChange={(e) => handleChange('textAlign', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
