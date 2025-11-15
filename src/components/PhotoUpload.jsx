import React, { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { 
  CameraIcon, 
  ArrowUpTrayIcon,
  TrashIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ScissorsIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

const PhotoUpload = ({ userPhoto, onPhotoUpload }) => {
  const fileInputRef = useRef(null);
  const [tempImage, setTempImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
      onPhotoUpload(croppedImage);
      setShowCropper(false);
      setTempImage(null);
    } catch (e) {
      console.error(e);
    }
  };

  const cancelCrop = () => {
    setShowCropper(false);
    setTempImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
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
          <p className="text-sm text-gray-600">Upload & crop picture</p>
        </div>
      </div>
      
      {/* Image Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ScissorsIcon className="w-8 h-8 text-white" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">Crop Your Photo</h3>
                    <p className="text-blue-100 text-sm">Adjust to fit perfectly</p>
                  </div>
                </div>
                <button
                  onClick={cancelCrop}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="relative h-96 bg-gray-900">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={180 / 220}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="rect"
                showGrid={true}
                style={{
                  containerStyle: {
                    borderRadius: '0',
                  },
                }}
              />
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <span>🔍</span>
                  Zoom: {Math.round(zoom * 100)}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelCrop}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <XMarkIcon className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  onClick={createCroppedImage}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <li>• Use cropper to adjust position</li>
            <li>• Formats: JPG, PNG</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper function to create cropped image
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    }, 'image/jpeg');
  });
}

export default PhotoUpload;
