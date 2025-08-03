import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, File, Image, Video, Music, FileText, 
  X, CheckCircle, AlertCircle, BarChart3, 
  Trash2, Eye, Download, Zap, Cloud
} from 'lucide-react';
import { SoloCard } from './SoloCard';
import { SoloButton } from './SoloButton';

interface FileUploadSystemProps {
  userRole: 'student' | 'parent' | 'educator' | 'admin';
  category?: string;
  folder?: string;
  onUploadComplete?: (files: any[]) => void;
  maxFiles?: number;
  className?: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: 'uploading' | 'completed' | 'failed' | 'processing';
  progress: number;
  category?: string;
  aiProcessing?: boolean;
}

export const FileUploadSystem: React.FC<FileUploadSystemProps> = ({
  userRole,
  category = 'general',
  folder,
  onUploadComplete,
  maxFiles = 10,
  className = ''
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // File size limits based on user role
  const maxSizes = {
    student: 50 * 1024 * 1024, // 50MB
    parent: 30 * 1024 * 1024,  // 30MB
    educator: 200 * 1024 * 1024, // 200MB
    admin: 1024 * 1024 * 1024   // 1GB
  };

  const maxSize = maxSizes[userRole];

  // Supported file types
  const supportedTypes = {
    documents: ['.pdf', '.doc', '.docx', '.txt'],
    images: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    videos: ['.mp4', '.webm', '.mov', '.avi'],
    audio: ['.mp3', '.wav', '.m4a'],
    other: ['.json', '.csv', '.xlsx']
  };

  const allSupportedTypes = Object.values(supportedTypes).flat();

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    if (supportedTypes.images.some(ext => ext.includes(extension || ''))) return Image;
    if (supportedTypes.videos.some(ext => ext.includes(extension || ''))) return Video;
    if (supportedTypes.audio.some(ext => ext.includes(extension || ''))) return Music;
    if (supportedTypes.documents.some(ext => ext.includes(extension || ''))) return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File) => {
    // Check file size
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)} limit for ${userRole} users`;
    }

    // Check file type
    const extension = '.' + file.name.toLowerCase().split('.').pop();
    if (!allSupportedTypes.includes(extension)) {
      return `File type ${extension} is not supported`;
    }

    return null;
  };

  const uploadFileToCloudFlare = async (file: File, uploadUrl: string) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setFiles(prev => prev.map(f => 
            f.name === file.name ? { ...f, progress } : f
          ));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });
  };

  const handleFileUpload = async (filesToUpload: File[]) => {
    setIsUploading(true);

    try {
      const token = localStorage.getItem('auth_token');

      for (const file of filesToUpload) {
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          setFiles(prev => [...prev, {
            id: Date.now().toString() + Math.random().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'failed',
            progress: 0,
            category
          }]);
          console.error(validationError);
          continue;
        }

        // Add file to list with uploading status
        const fileId = Date.now().toString() + Math.random().toString();
        setFiles(prev => [...prev, {
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          progress: 0,
          category,
          aiProcessing: shouldProcessWithAI(file.name)
        }]);

        try {
          // Get signed upload URL
          const urlResponse = await fetch(`${API_BASE}/api/files/upload-url`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              fileName: file.name,
              fileType: file.type,
              folder: folder || `${category}/${userRole}`
            })
          });

          if (!urlResponse.ok) {
            throw new Error('Failed to get upload URL');
          }

          const { uploadData } = await urlResponse.json();

          // Upload directly to CloudFlare R2
          await uploadFileToCloudFlare(file, uploadData.uploadUrl);

          // Update file status
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { 
              ...f, 
              status: 'completed', 
              progress: 100,
              url: uploadData.publicUrl 
            } : f
          ));

          // Mark as processing if AI-compatible
          if (shouldProcessWithAI(file.name)) {
            setTimeout(() => {
              setFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, status: 'processing' } : f
              ));
            }, 1000);

            // Simulate AI processing completion
            setTimeout(() => {
              setFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, status: 'completed' } : f
              ));
            }, 5000);
          }

        } catch (error) {
          console.error('Upload failed:', error);
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, status: 'failed' } : f
          ));
        }
      }

      // Call completion callback
      if (onUploadComplete) {
        const completedFiles = files.filter(f => f.status === 'completed');
        onUploadComplete(completedFiles);
      }

    } finally {
      setIsUploading(false);
    }
  };

  const shouldProcessWithAI = (fileName: string) => {
    const aiSupportedExtensions = ['.pdf', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.mp4', '.webm', '.mp3', '.wav'];
    const extension = '.' + fileName.toLowerCase().split('.').pop();
    return aiSupportedExtensions.includes(extension);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    handleFileUpload(droppedFiles);
  }, [files.length, maxFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    handleFileUpload(selectedFiles);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [files.length, maxFiles]);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'failed': return AlertCircle;
      case 'processing': return Zap;
      default: return Cloud;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'processing': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Area */}
      <SoloCard
        className={`transition-all duration-300 ${
          isDragging 
            ? 'border-solo-primary bg-solo-primary-light border-dashed border-2' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="text-center py-12"
        >
          <div className="mb-6">
            <Upload className={`mx-auto h-12 w-12 ${isDragging ? 'text-solo-primary' : 'text-gray-400'}`} />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-solo-dark">
                Upload Files to CloudFlare R2
              </h3>
              <p className="text-solo-gray-600 mt-2">
                Drag and drop files here, or click to select files
              </p>
            </div>

            <div className="text-sm text-solo-gray-500 space-y-1">
              <p>Max file size: <strong>{formatFileSize(maxSize)}</strong> ({userRole} user)</p>
              <p>Supported: PDF, Images, Videos, Audio, Documents</p>
              <p>Max files: {maxFiles}</p>
            </div>

            <SoloButton
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mx-auto"
            >
              Choose Files
            </SoloButton>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={allSupportedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </SoloCard>

      {/* File List */}
      {files.length > 0 && (
        <SoloCard title="Uploaded Files" className="space-y-4">
          {files.map((file) => {
            const FileIcon = getFileIcon(file.name);
            const StatusIcon = getStatusIcon(file.status);
            
            return (
              <div key={file.id} className="flex items-center justify-between p-4 bg-solo-gray-50 rounded-lg">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-10 h-10 bg-solo-primary-light rounded-lg flex items-center justify-center">
                    <FileIcon className="w-5 h-5 text-solo-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-solo-dark truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-solo-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span className="capitalize">{file.category}</span>
                      {file.aiProcessing && (
                        <span className="flex items-center">
                          <Zap className="w-3 h-3 mr-1" />
                          AI Processing
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Progress bar for uploading files */}
                  {file.status === 'uploading' && (
                    <div className="w-24">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-solo-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-solo-gray-500 mt-1">
                        {file.progress.toFixed(0)}%
                      </div>
                    </div>
                  )}

                  {/* Status icon */}
                  <StatusIcon className={`w-5 h-5 ${getStatusColor(file.status)}`} />

                  {/* Action buttons */}
                  <div className="flex space-x-1">
                    {file.status === 'completed' && file.url && (
                      <>
                        <button
                          onClick={() => window.open(file.url, '_blank')}
                          className="p-1 hover:bg-solo-gray-200 rounded"
                          title="View file"
                        >
                          <Eye className="w-4 h-4 text-solo-gray-600" />
                        </button>
                        <button
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = file.url!;
                            a.download = file.name;
                            a.click();
                          }}
                          className="p-1 hover:bg-solo-gray-200 rounded"
                          title="Download file"
                        >
                          <Download className="w-4 h-4 text-solo-gray-600" />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-red-100 rounded"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Upload Summary */}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-solo-gray-600">
                  Total: {files.length} files
                </span>
                <span className="text-solo-gray-600">
                  Size: {formatFileSize(files.reduce((sum, f) => sum + f.size, 0))}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-solo-gray-400" />
                <span className="text-solo-gray-600">
                  {files.filter(f => f.status === 'completed').length} uploaded
                </span>
              </div>
            </div>
          </div>
        </SoloCard>
      )}
    </div>
  );
};