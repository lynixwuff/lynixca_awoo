'use client';

import { useState } from 'react';

interface Photo {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  uploadDate: string;
  isPublic: boolean;
}

interface GalleryGridProps {
  photos: Photo[];
  onEdit: (photo: Photo) => void;
  onDelete: (id: number) => void;
  onTogglePublic: (id: number, isPublic: boolean) => void;
}

export default function GalleryGrid({ photos, onEdit, onDelete, onTogglePublic }: GalleryGridProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  const togglePhotoSelection = (id: number) => {
    setSelectedPhotos(prev => 
      prev.includes(id) 
        ? prev.filter(photoId => photoId !== id)
        : [...prev, id]
    );
  };

  const selectAllPhotos = () => {
    setSelectedPhotos(filteredPhotos.map(photo => photo.id));
  };

  const clearSelection = () => {
    setSelectedPhotos([]);
  };

  const deleteSelected = () => {
    if (confirm(`Delete ${selectedPhotos.length} selected photos?`)) {
      selectedPhotos.forEach(id => onDelete(id));
      setSelectedPhotos([]);
    }
  };

  const filteredPhotos = photos.filter(photo => {
    if (filter === 'all') return true;
    if (filter === 'public') return photo.isPublic;
    if (filter === 'private') return !photo.isPublic;
    return photo.category === filter;
  });

  const categories = ['all', 'public', 'private', ...Array.from(new Set(photos.map(p => p.category)))];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <i className="fas fa-th"></i>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">
            {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
          </span>
          {selectedPhotos.length > 0 && (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-cyan-400 text-sm">
                {selectedPhotos.length} selected
              </span>
              <button
                onClick={deleteSelected}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              >
                <i className="fas fa-trash mr-1"></i>
                Delete
              </button>
              <button
                onClick={clearSelection}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {filteredPhotos.length > 0 && (
        <div className="flex items-center gap-2">
          <button
            onClick={selectAllPhotos}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
          >
            Select All
          </button>
          <button
            onClick={clearSelection}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Photo Grid/List */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-images text-gray-500 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Photos Found</h3>
          <p className="text-gray-400">
            {filter === 'all' 
              ? 'Upload some photos to get started!' 
              : `No photos found in "${filter}" category.`}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`relative group bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedPhotos.includes(photo.id)
                  ? 'border-green-500'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedPhotos.includes(photo.id)}
                  onChange={() => togglePhotoSelection(photo.id)}
                  className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                />
              </div>

              {/* Public/Private Badge */}
              <div className="absolute top-2 right-2 z-10">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  photo.isPublic 
                    ? 'bg-green-600/80 text-white' 
                    : 'bg-gray-600/80 text-gray-300'
                }`}>
                  {photo.isPublic ? 'Public' : 'Private'}
                </span>
              </div>

              {/* Image */}
              <div className="aspect-square bg-gray-700">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => onEdit(photo)}
                  className="p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                  title="Edit Photo"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => onTogglePublic(photo.id, !photo.isPublic)}
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  title={photo.isPublic ? 'Make Private' : 'Make Public'}
                >
                  <i className={`fas ${photo.isPublic ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <button
                  onClick={() => onDelete(photo.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete Photo"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <h4 className="text-white text-sm font-medium truncate">{photo.title}</h4>
                <p className="text-gray-400 text-xs truncate">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPhotos.length === filteredPhotos.length}
                      onChange={() => selectedPhotos.length === filteredPhotos.length ? clearSelection() : selectAllPhotos()}
                      className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Photo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Uploaded</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPhotos.map((photo) => (
                  <tr key={photo.id} className="hover:bg-gray-700/30">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedPhotos.includes(photo.id)}
                        onChange={() => togglePhotoSelection(photo.id)}
                        className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{photo.title}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-purple-600/20 text-purple-300 rounded-full">
                        {photo.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        photo.isPublic 
                          ? 'bg-green-600/20 text-green-300' 
                          : 'bg-gray-600/20 text-gray-300'
                      }`}>
                        {photo.isPublic ? 'Public' : 'Private'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{photo.uploadDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEdit(photo)}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => onTogglePublic(photo.id, !photo.isPublic)}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                          title={photo.isPublic ? 'Make Private' : 'Make Public'}
                        >
                          <i className={`fas ${photo.isPublic ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                        <button
                          onClick={() => onDelete(photo.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
