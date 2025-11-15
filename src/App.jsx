import React, { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🎫ID Cardz.io - Professional ID Card Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Create complete ID cards with photo, name, designation, and all details
          </p>
        </header>

        <TemplateSelector
          templates={defaultTemplates}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
          onUploadTemplate={handleUploadTemplate}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 space-y-6">
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

          <div className="xl:col-span-2">
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

        <footer className="mt-12 text-center text-gray-600">
          <p>© 2025 ID Cardz.io</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
