import React, { useState } from 'react';
import { 
  IdentificationIcon, 
  SparklesIcon, 
  BoltIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/solid';
import TemplateSelector from './components/TemplateSelector';
import TextEditor from './components/TextEditor';
import IDCardCanvas from './components/IDCardCanvas';
import ExportControls from './components/ExportControls';
import PhotoUpload from './components/PhotoUpload';
import { defaultTemplates } from './templates/defaultTemplates';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplates[0]);
  const [texts, setTexts] = useState(defaultTemplates[0].defaultTexts);
  const [selectedTextId, setSelectedTextId] = useState('name');
  const [customBackground, setCustomBackground] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setTexts([...template.defaultTexts]);
    setSelectedTextId(template.defaultTexts[0]?.id);
    setCustomBackground(null);
  };

  const handleUploadTemplate = (imageData) => {
    const customTemplate = {
      ...selectedTemplate,
      id: 'custom',
      name: 'Custom Template',
      background: '#ffffff',
    };
    setSelectedTemplate(customTemplate);
    setCustomBackground(imageData);
  };

  const handleUpdateText = (textId, updates) => {
    setTexts(texts.map(text => 
      text.id === textId ? { ...text, ...updates } : text
    ));
  };

  const handleSelectText = (textId) => {
    setSelectedTextId(textId);
  };

  const handlePhotoUpload = (photoData) => {
    setUserPhoto(photoData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-6 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Modern Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-3">
              <IdentificationIcon className="w-14 h-14 text-purple-600" />
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                  ID Cardz.io
                </h1>
              </div>
            </div>
            <p className="text-gray-700 text-lg md:text-xl font-medium mb-3">
              Create Professional ID Cards in Minutes
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-green-500" />
                Live Preview
              </span>
              <span className="flex items-center gap-2">
                <BoltIcon className="w-4 h-4 text-blue-500" />
                Drag & Drop
              </span>
              <span className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-purple-500" />
                Print Ready
              </span>
            </div>
          </div>
        </header>

        {/* Template Selector */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <TemplateSelector
            templates={defaultTemplates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
            onUploadTemplate={handleUploadTemplate}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="xl:col-span-1 space-y-6 animate-slide-right">
            <PhotoUpload 
              userPhoto={userPhoto}
              onPhotoUpload={handlePhotoUpload}
            />
            <TextEditor
              texts={texts}
              selectedTextId={selectedTextId}
              onUpdateText={handleUpdateText}
              onSelectText={handleSelectText}
            />
            <ExportControls
              template={selectedTemplate}
              texts={texts}
              customBackground={customBackground}
              userPhoto={userPhoto}
            />
          </div>

          {/* Main Preview Area */}
          <div className="xl:col-span-2 animate-slide-left">
            <IDCardCanvas
              template={selectedTemplate}
              texts={texts}
              selectedTextId={selectedTextId}
              onUpdateText={handleUpdateText}
              onSelectText={handleSelectText}
              customBackground={customBackground}
              userPhoto={userPhoto}
            />
          </div>
        </div>

        {/* Modern Footer */}
        <footer className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="backdrop-blur-sm bg-white/30 rounded-2xl p-6 border border-white/40 shadow-xl">
            
            <p className="text-sm text-gray-600">
              © 2025 ID Cardz.io - Professional Event Management Solution
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
