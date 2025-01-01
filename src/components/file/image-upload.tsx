import React, { useState, useEffect } from 'react';
import { getGlobalConfig } from '@services/config';
import { UploadFileIcon } from '@components/dashboard/icons';

interface IProps {
  accept?: string;
  imageUrl?: string;
  headers?: any;
  onUpload?: (file: File) => Promise<void> | void;
  options?: any;
  uploading?: boolean;
}

export const ImageDocumentsUpload: React.FC<IProps> = ({ accept, imageUrl: initialImageUrl, headers, onUpload, options = {}, uploading }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl || '');

  useEffect(() => {
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  const beforeUpload = async (file: File): Promise<boolean> => {
    const config = getGlobalConfig();
    const isLt5M = file.size / 1024 / 1024 < (config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5);

    if (!isLt5M) {
      alert(`Image is too large. Please provide an image ${config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5}MB or below.`);
      return false;
    }

    if (onUpload) {
      try {
        await onUpload(file);  // Certificando-se que a função async seja resolvida
        return true;  // Retornando true se tudo ocorreu bem
      } catch (error) {
        console.error("Upload failed:", error);
        return false;  // Retornando false em caso de erro
      }
    }

    return false;
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValid = await beforeUpload(file);
      if (isValid) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="bg-gray-100 w-full rounded-lg text-center relative" style={{ aspectRatio: '3/1', backgroundImage: imageUrl ? `url(${imageUrl})`: 'none' }}>
      <label className=' flex items-center justify-center flex-col absolute w-full h-full inset-0 m-auto' htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        {imageUrl ? (
          <img src={imageUrl} alt="file" style={{ width: '100%' }} />
        ) : (
          <div className='flex items-center justify-center flex-col'>
            <UploadFileIcon />
            <span className='max-w-[3rem]'>Upload Photo</span>
          </div>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept={accept || 'image/*'}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        disabled={uploading || loading}
      />
    </div>
  );
};
