import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Plus,
  X,
  Upload,
  Link as LinkIcon,
  Trash2,
  Heart,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag
} from 'lucide-react';

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: 'prenup' | 'ceremony' | 'reception' | 'details' | 'guest';
  author?: string;
  dateAdded?: string;
  isCustom?: boolean;
}

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'prenup-1',
    url: 'https://i.imgur.com/4Nur8WX.jpeg',
    caption: 'Quiet promises under the golden mountain sky',
    category: 'prenup',
    author: 'Official Prenup',
  },
  {
    id: 'prenup-covenant',
    url: 'https://i.imgur.com/MroFofm.jpeg',
    caption: 'Wifey & Hubby — walking hand in hand towards our sweetest forever',
    category: 'prenup',
    author: 'Official Prenup',
  },
  {
    id: 'prenup-garden',
    url: 'https://i.imgur.com/wPkO9oM.jpeg',
    caption: 'Smiling under the floral arch in our sacred journey',
    category: 'prenup',
    author: 'Official Prenup',
  },
  {
    id: 'details-1',
    url: '/src/assets/images/wedding_rings_details_1790264394445.jpg',
    caption: 'Two bands, one timeless covenant on deckle-edge paper',
    category: 'details',
    author: 'Official Details',
  },
  {
    id: 'reception-1',
    url: '/src/assets/images/wedding_reception_decor_1790264405293.jpg',
    caption: 'Warm romantic banquet styled in blush pink, orchid, and candlelight',
    category: 'reception',
    author: 'Venue Showcase',
  },
  {
    id: 'prenup-2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: 'Every gentle glance holds a lifetime of devotion',
    category: 'prenup',
    author: 'Prenup Collection',
  },
  {
    id: 'prenup-3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    caption: 'Walking hand in hand towards our sweetest forever',
    category: 'prenup',
    author: 'Prenup Collection',
  },
  {
    id: 'prenup-4',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Laughter, joy, and the beginning of our greatest adventure',
    category: 'prenup',
    author: 'Prenup Collection',
  },
];

const LOCAL_STORAGE_KEY = 'wedding_user_added_photos_v1';

export const PhotoManager: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Form states for adding photo
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [inputUrl, setInputUrl] = useState('');
  const [inputCaption, setInputCaption] = useState('');
  const [inputAuthor, setInputAuthor] = useState('');
  const [inputCategory, setInputCategory] = useState<'prenup' | 'ceremony' | 'reception' | 'details' | 'guest'>('guest');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load user photos from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PhotoItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos([...parsed, ...DEFAULT_PHOTOS]);
        }
      }
    } catch (e) {
      console.warn('Could not load custom photos from localStorage', e);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size is larger than 5MB. Please choose a smaller image.');
      return;
    }

    setFormError(null);
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const result = loadEvt.target?.result as string;
      setFilePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const photoUrl = uploadMode === 'file' ? filePreview : inputUrl.trim();

    if (!photoUrl) {
      setFormError(uploadMode === 'file' ? 'Please choose an image file to upload.' : 'Please enter a valid image URL.');
      return;
    }

    if (uploadMode === 'url' && !photoUrl.startsWith('http') && !photoUrl.startsWith('data:image')) {
      setFormError('Please enter a full URL starting with https://');
      return;
    }

    setIsSubmitting(true);

    const newPhoto: PhotoItem = {
      id: `custom-${Date.now()}`,
      url: photoUrl,
      caption: inputCaption.trim() || 'Shared wedding memory',
      category: inputCategory,
      author: inputAuthor.trim() || 'Guest Contributor',
      dateAdded: new Date().toLocaleDateString(),
      isCustom: true,
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);

    // Save to localStorage
    try {
      const customOnly = updated.filter((p) => p.isCustom);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // Storage might be exceeded if base64 is huge
    }

    // Reset and close
    setInputUrl('');
    setInputCaption('');
    setInputAuthor('');
    setFilePreview(null);
    setIsSubmitting(false);
    setIsUploadModalOpen(false);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this photo?')) return;

    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);

    try {
      const customOnly = updated.filter((p) => p.isCustom);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // ignore
    }
  };

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((p) => (activeCategory === 'custom' ? p.isCustom : p.category === activeCategory));

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="w-full">
      {/* Gallery Header & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-sans-body text-xs uppercase tracking-[3px] text-[#C2A379] font-medium">
            Memories & Snapshots
          </span>
          <h3 className="font-serif-title text-3xl sm:text-4xl text-[#3A3530] font-normal">
            Moments Before Forever
          </h3>
          <p className="font-sans-body text-xs sm:text-sm text-[#7A7067] mt-1">
            Browse our prenup memories or add your own photos to the celebration album.
          </p>
        </div>

        {/* Action Button: Add Photos */}
        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#C2A379] text-[#3A3530] hover:bg-[#C2A379] hover:text-white transition-all text-xs font-sans-body uppercase tracking-wider shadow-xs hover:shadow-md cursor-pointer shrink-0"
        >
          <Camera className="w-4 h-4 text-[#C2A379] group-hover:text-white" />
          <span>Add Photos</span>
        </button>
      </div>

      {/* Category Filter Pills / Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar text-xs font-sans-body">
        {[
          { id: 'all', label: `All Photos (${photos.length})` },
          { id: 'prenup', label: 'Prenup Collection' },
          { id: 'details', label: 'Rings & Details' },
          { id: 'reception', label: 'Venue & Banquet' },
          {
            id: 'custom',
            label: `Guest Added (${photos.filter((p) => p.isCustom).length})`,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-[#3A3530] text-white shadow-xs font-medium'
                : 'bg-[#FAF7F2] text-[#6E645D] hover:bg-[#EFE7DC] border border-[#E8DCCF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group relative rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E8DCCF] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image Container with zoom & parallax effect */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#E3BC9A] font-medium block">
                    {photo.author || 'Glensan & Junah'}
                  </span>
                  <p className="text-xs font-serif-title font-medium leading-snug line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
                <div className="ml-auto text-white/80 p-1.5 rounded-full bg-black/40 hover:bg-black/60">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Custom badge & delete */}
              {photo.isCustom && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#8E4585]/90 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs font-medium">
                  <Sparkles className="w-2.5 h-2.5" />
                  Guest Upload
                </div>
              )}

              {photo.isCustom && (
                <button
                  type="button"
                  onClick={(e) => handleDeletePhoto(photo.id, e)}
                  title="Delete this photo"
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Caption & Category Card */}
            <div className="p-3.5 bg-white flex flex-col justify-between flex-1">
              <p className="font-serif-title text-sm text-[#3A3530] font-medium line-clamp-2">
                {photo.caption}
              </p>
              <div className="mt-2 pt-2 border-t border-[#F2ECE4] flex items-center justify-between text-[10px] text-[#8C827A] font-sans-body">
                <span className="capitalize">{photo.category}</span>
                <span>{photo.author || 'Glensan & Junah'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-16 bg-[#FAF7F2] rounded-xl border border-dashed border-[#D8C7B0]">
          <Camera className="w-8 h-8 text-[#C2A379] mx-auto mb-2 opacity-60" />
          <p className="font-serif-title text-lg text-[#3A3530]">No photos in this category yet</p>
          <p className="text-xs text-[#8C827A] mt-1 mb-4">
            Be the first to share a photo for this wedding section!
          </p>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 text-xs font-sans-body uppercase tracking-wider rounded-md bg-[#C2A379] text-white hover:bg-[#A88B64]"
          >
            Add Photo Now
          </button>
        </div>
      )}

      {/* UPLOAD PHOTO MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-2xl border border-[#C2A379]/40 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C827A] hover:text-[#3A3530] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-sans-body uppercase tracking-[2px] text-[#C2A379] font-medium">
                <Camera className="w-3.5 h-3.5" />
                Wedding Album
              </div>
              <h3 className="font-serif-title text-2xl text-[#3A3530] font-normal mt-0.5">
                Add a Photo
              </h3>
              <p className="font-sans-body text-xs text-[#7A7067] mt-1">
                Upload a picture from your device or link an image to showcase in the wedding gallery.
              </p>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              {/* Mode Toggle: File Upload vs URL */}
              <div className="flex rounded-lg bg-[#F5EFE6] p-1 text-xs font-sans-body">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    uploadMode === 'file'
                      ? 'bg-white text-[#3A3530] font-medium shadow-xs'
                      : 'text-[#8C827A] hover:text-[#3A3530]'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload from Device
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    uploadMode === 'url'
                      ? 'bg-white text-[#3A3530] font-medium shadow-xs'
                      : 'text-[#8C827A] hover:text-[#3A3530]'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  Image URL
                </button>
              </div>

              {/* Upload Input Area */}
              {uploadMode === 'file' ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative border-2 border-dashed border-[#C2A379]/50 rounded-xl p-5 text-center bg-[#FAF7F2] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {filePreview ? (
                    <div className="space-y-2">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-xs object-contain"
                      />
                      <p className="text-[11px] text-[#A88B64] underline">Click to choose a different photo</p>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="w-8 h-8 text-[#C2A379] mx-auto mb-2" />
                      <p className="font-serif-title text-base text-[#3A3530]">Click to select a photo</p>
                      <p className="text-[11px] text-[#8C827A] mt-1">Supports JPG, PNG, WebP up to 5MB</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-[#3A3530] mb-1">
                    Direct Image URL *
                  </label>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => {
                      setInputUrl(e.target.value);
                      setFilePreview(e.target.value);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3 py-2 rounded-lg border border-[#D8C7B0] bg-white text-xs text-[#3A3530] focus:border-[#C2A379] focus:outline-none"
                  />
                  {inputUrl && (
                    <div className="mt-2">
                      <img
                        src={inputUrl}
                        alt="Preview"
                        onError={() => setFormError('Image preview failed. Please check the URL.')}
                        className="max-h-36 mx-auto rounded-md shadow-xs object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Caption Input */}
              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Photo Caption / Message
                </label>
                <input
                  type="text"
                  value={inputCaption}
                  onChange={(e) => setInputCaption(e.target.value)}
                  placeholder="e.g. Beautiful candid with the bride and groom"
                  className="w-full px-3 py-2 rounded-lg border border-[#D8C7B0] bg-white text-xs text-[#3A3530] focus:border-[#C2A379] focus:outline-none"
                />
              </div>

              {/* Contributor / Author */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#3A3530] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={inputAuthor}
                    onChange={(e) => setInputAuthor(e.target.value)}
                    placeholder="e.g. Best Man Marc / Nina"
                    className="w-full px-3 py-2 rounded-lg border border-[#D8C7B0] bg-white text-xs text-[#3A3530] focus:border-[#C2A379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3A3530] mb-1">
                    Category Tag
                  </label>
                  <select
                    value={inputCategory}
                    onChange={(e) => setInputCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#D8C7B0] bg-white text-xs text-[#3A3530] focus:border-[#C2A379] focus:outline-none"
                  >
                    <option value="prenup">Prenup</option>
                    <option value="ceremony">Ceremony</option>
                    <option value="reception">Reception</option>
                    <option value="details">Details</option>
                    <option value="guest">Guest Moments</option>
                  </select>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {formError}
                </p>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F0E6D8]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs text-[#6E645D] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#C2A379] hover:bg-[#A88B64] text-white text-xs font-sans-body uppercase tracking-wider transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Adding...' : 'Add to Album'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX */}
      {currentPhoto && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center cursor-default"
          >
            {/* Lightbox Image */}
            <div className="relative max-h-[75vh] overflow-hidden rounded-xl shadow-2xl">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Lightbox Caption & Info */}
            <div className="w-full max-w-xl text-center mt-3 px-4 text-white">
              <p className="font-serif-title text-lg sm:text-xl font-medium">
                {currentPhoto.caption}
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-white/70 mt-1">
                <span>{currentPhoto.author || 'Glensan & Junah'}</span>
                <span>·</span>
                <span className="capitalize">{currentPhoto.category}</span>
                <span>·</span>
                <span>
                  Photo {selectedPhotoIndex! + 1} of {filteredPhotos.length}
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-[-20px] sm:left-[-50px] top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                  title="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-[-20px] sm:right-[-50px] top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                  title="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-[-35px] right-0 p-1.5 rounded-full text-white/80 hover:text-white bg-black/40 hover:bg-black/80 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
