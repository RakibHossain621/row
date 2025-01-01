import React, { useState, useEffect, FormEvent } from 'react';
import { IPerformer } from 'src/interfaces';
import { authService, performerService } from '@services/index';
import { AppButton } from '@components/ui/shared/AppButton';
import { CheckedIcon, NoVerifiedIcon, WarningIcon } from 'src/icons';
import { UploadFileIcon } from '@components/dashboard/icons';
import { useRouter } from 'next/router';

interface IProps {
  user: IPerformer;
  onFinish: (data: any) => void;
}

const StatusComponents = {
  'pending': {
    bg: 'bg-warning-500',
    label: 'Pending',
    icon: () => <WarningIcon />
  },
  'verified': {
    bg: 'bg-success-700',
    label: 'Verified',
    icon: () => <CheckedIcon />
  },
  'noverified': {
    bg: 'bg-red-500',
    label: 'Not verified',
    icon: () => <NoVerifiedIcon />
  } 
}

export const PerformerVerificationForm: React.FC<IProps> = ({ user, onFinish }) => {
  const router = useRouter()
  const [idImage, setIdImage] = useState<string>('');
  const [fileIdImage, setFileIdImage] = useState<File | null>(null)
  const [documentImage, setDocumentImage] = useState<string>('');
  const [, forceUpdate] = useState('')
  const [fileDocumentIdImage, setFileDocumentIdImage] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false);

  const [status, setStatus] = useState<'pending' | 'verified' | 'noverified'>('noverified')
  const [idStatus, setIdStatus] = useState<'pending' | 'verified' | 'noverified'>('noverified')
  const [documentStatus, setDocumentStatus] = useState<'pending' | 'verified' | 'noverified'>('noverified')

  useEffect(() => {
    if (user.documentVerification) {
      setDocumentImage(user.documentVerification.url);
      setDocumentStatus('pending')
      
      if (user.verifiedDocument) {
        setStatus('verified')
      } else {
        setStatus('pending')
      }
    }

    if (user.idVerification) {
      setIdImage(user.idVerification.url);
      setIdStatus('pending')

      if (user.verifiedDocument) {
        setStatus('verified')
      } else {
        setStatus('pending')
      }
    }
  }, [user]);

  const userHeaders = {
    authorization: authService.getToken()
  };

  const onUploading = (file, resp: any) => {
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';

    forceUpdate('')
  };

  const onSendVerificationDocuments = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileIdImage) {
      try {
        await performerService.uploadDocumentFiles(fileIdImage, {}, onUploading.bind(this, fileIdImage), 'document');
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    }
  
    if (fileDocumentIdImage) {
      try {
        await performerService.uploadDocumentFiles(fileDocumentIdImage, {}, onUploading.bind(this, fileDocumentIdImage), 'selfie-document');
      } catch (error) {
        console.error('Error uploading selfie document:', error);
      }
    }
  
    setFileDocumentIdImage(null);
    setFileIdImage(null);

    router.reload()
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 py-6'>
        <p className='text-black text-lg'>Complete your verification to ensure that only you can monetize the content that you created.</p>
        <div className={['p-6 py-8 rounded-lg flex items-center justify-center', StatusComponents[status].bg].join(" ")}>
          <p className='text-3xl text-white'>{StatusComponents[status].label}</p>
        </div>
      </div>
      <form onSubmit={onSendVerificationDocuments} className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-4 flex-col md:flex-row">
        <div className="border rounded-lg p-4 flex flex-col items-start justify-start">
          <label className='text-lg text-black/90 pb-6 flex w-full items-center justify-between'>
            <span>Your government issued ID</span> 
            {StatusComponents[idStatus].icon()}
          </label>
          {idImage ? (
            <img className='m-auto' alt="id-img" src={idImage} style={{ maxHeight: '150px' }} />
          ) : (
            <div className="bg-gray-100 w-full rounded-lg text-center relative" style={{ aspectRatio: '3/1', backgroundImage: fileIdImage ? `url(${fileIdImage})`: 'none' }}>
              <label className=' flex items-center justify-center flex-col absolute w-full h-full inset-0 m-auto' htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                {fileIdImage ? (
                  <img src={fileIdImage.name} alt="file" style={{ width: '100%' }} />
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
                accept={'image/*'}
                style={{ display: 'none' }}
                onChange={(e) => {
                  setFileIdImage(e.target.files[0])
                  setIdImage(URL.createObjectURL(e.target.files[0]))
                }}
                disabled={uploading}
              />
            </div>
          )}
          <ul className="text-black/90 text-md py-6">
            <li>1- Government-issued ID card</li>
            <li>2- National ID card</li>
            <li>3- Passport</li>
            <li>4- Driving license</li>
          </ul>
          <footer className='pb-4 pt-6 text-right border-t mt-auto w-full space-x-1'>
            <AppButton type={'reset'} size='base' variant='tertiary' className='border-0'>
              Cancel 
            </AppButton>
            <AppButton type={'submit'} size='base'>
              Submit 
            </AppButton>
          </footer>
        </div>

        <div className="form-item border rounded-lg p-4 flex flex-col items-stretch justify-center">
          <label className='text-lg text-black/90 pb-6 flex w-full items-center justify-between'>
            <span>Selfie + your ID + handwritten note</span>
            {StatusComponents[documentStatus].icon()}
          </label>
          {documentImage ? (
            <img className='m-auto' alt="id-img" src={idImage} style={{ maxHeight: '150px' }} />
          ) : (
            <div className="bg-gray-100 w-full rounded-lg text-center relative" style={{ aspectRatio: '3/1', backgroundImage: fileDocumentIdImage ? `url(${fileDocumentIdImage})`: 'none' }}>
              <label className=' flex items-center justify-center flex-col absolute w-full h-full inset-0 m-auto' htmlFor="file-upload-document" style={{ cursor: 'pointer' }}>
                {fileDocumentIdImage ? (
                  <img src={fileDocumentIdImage.name} alt="file" style={{ width: '100%' }} />
                ) : (
                  <div className='flex items-center justify-center flex-col'>
                    <UploadFileIcon />
                    <span className='max-w-[3rem]'>Upload Photo</span>
                  </div>
                )}
              </label>
              <input
                id="file-upload-document"
                type="file"
                accept={'image/*'}
                style={{ display: 'none' }}
                onChange={(e) => {
                  setFileDocumentIdImage(e.target.files[0])
                  setDocumentImage(URL.createObjectURL(e.target.files[0]))
                }}
                disabled={uploading}
              />
            </div>
          )}
          <ul className="text-black text-md py-6">
            <li>
              1- On a blank piece of white paper write your name, today's date and our website address{' '}
              {window.location.hash}
            </li>
            <li>2- Hold your paper and your ID so we can clearly see both</li>
            <li>
              3- Take a selfie of you, your ID and your handwritten note. All three elements (you, your
              ID and your writing) must be clearly visible without copying or editing
            </li>
          </ul>
          <footer className='pb-4 pt-6 text-right border-t mt-auto w-full space-x-1'>
            <AppButton type={'reset'} size='base' variant='tertiary' className='border-0'>
              Cancel 
            </AppButton>
            <AppButton type={'submit'} size='base'>
              Submit 
            </AppButton>
          </footer>
        </div>
      </form>
    </>
  );
};
