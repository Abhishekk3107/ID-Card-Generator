import React, { useRef } from 'react';

const PhotoUpload = ({ userPhoto, onPhotoUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onPhotoUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoUpload(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📸 Photo Upload</h2>
      
      <div className="space-y-4">
        {userPhoto ? (
          <div className="text-center">
            <img 
              src={userPhoto} 
              alt="User" 
              className="w-32 h-40 object-cover rounded-lg mx-auto border-4 border-blue-500 shadow-lg"
            />
            <p className="text-sm text-green-600 font-semibold mt-2">✓ Photo Uploaded</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-32 h-40 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-6xl">📷</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">No photo uploaded</p>
          </div>
        )}

        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {userPhoto ? 'Change Photo' : 'Upload Photo'}
        </button>

        {userPhoto && (
          <button
            onClick={handleRemovePhoto}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Remove Photo
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>📋 Photo Guidelines:</strong>
          </p>
          <ul className="text-xs text-blue-700 mt-1 space-y-1">
            <li>• Passport-style photo recommended</li>
            <li>• Clear face visibility</li>
            <li>• Plain background preferred</li>
            <li>• Formats: JPG, PNG</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
