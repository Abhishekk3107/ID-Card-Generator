import React, { useRef } from 'react';
import { 
  CameraIcon, 
  ArrowUpTrayIcon,
  TrashIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/solid';

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
    <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-2xl p-6 border border-white/50">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <CameraIcon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">ID Photo</h2>
          <p className="text-sm text-gray-600">Upload profile picture</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {userPhoto ? (
          <div className="relative group">
            <img 
              src={userPhoto} 
              alt="User" 
              className="w-full h-56 object-cover rounded-2xl border-4 border-white shadow-xl"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
              <div className="flex items-center gap-2 text-white font-semibold text-lg">
                <CheckCircleIcon className="w-6 h-6" />
                Photo Ready
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div 
              className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center border-4 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group" 
              onClick={() => fileInputRef.current.click()}
            >
              <CameraIcon className="w-20 h-20 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors" />
              <p className="text-gray-500 font-medium group-hover:text-blue-600 transition-colors">Click to upload</p>
            </div>
          </div>
        )}

        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
        >
          <ArrowUpTrayIcon className="w-5 h-5" />
          {userPhoto ? 'Change Photo' : 'Upload Photo'}
        </button>

        {userPhoto && (
          <button
            onClick={handleRemovePhoto}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <TrashIcon className="w-5 h-5" />
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

        <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-xl border border-blue-200/50">
          <p className="text-xs text-blue-900 font-semibold mb-2 flex items-center gap-2">
            <DocumentTextIcon className="w-4 h-4" />
            Photo Guidelines:
          </p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Passport-style photo recommended</li>
            <li>• Clear face visibility required</li>
            <li>• Plain background preferred</li>
            <li>• Formats: JPG, PNG</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
