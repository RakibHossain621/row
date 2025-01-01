/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Alert, Button, Modal, message
} from 'antd';

import { useEffect, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import getBlobDuration from 'get-blob-duration';
import { getGlobalConfig } from '@services/config';
import Webcam from 'react-webcam';

export interface ICameraRecording {
  onFinish?: Function;
  video?: any
}

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }

  return <video ref={videoRef} width="100%" height={500} autoPlay controls muted />;
};
const audio = true;

export default function CameraRecording({
  onFinish,
  video
}: ICameraRecording) {
  const [started, setStated] = useState(false);
  const [file, setFile] = useState<File | null>(null)

  const mediaRef = useRef(null);
  const config = getGlobalConfig();
  const Timer = useRef(null);

  const {
    status, startRecording, stopRecording, previewStream, mediaBlobUrl, error, clearBlobUrl
  } = useReactMediaRecorder({
    video,
    audio,
    onStop: async (urlBlob, blob) => {
      mediaRef.current = blob;
      if (mediaRef.current) {
        const b: any = mediaRef.current;
        // A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = 'recording.mp4';
        const duration = await getBlobDuration(b);
        b.duration = duration;
        console.log('on stop file b', b)
        console.log('mediaBlobUrl', mediaBlobUrl)
        setFile(b)
        // onFinish(b as File)
      }
    }
  });

  // const onOK = async () => {
  //   setOpenModal(false);
  //   if (mediaRef.current) {
  //     const b: any = mediaRef.current;
  //     // A Blob() is almost a File() - it's just missing the two properties below which we will add
  //     b.lastModifiedDate = new Date();
  //     b.name = 'recording.mp4';
  //     const duration = await getBlobDuration(b);
  //     b.duration = duration;
  //     onFinish(b as File);
  //   }
  // };

  const onCancel = async () => {
    if (previewStream && !mediaBlobUrl && status === 'recording') {
      message.error('Please stop recording');
      return;
    }
    started && setStated(false);
    clearBlobUrl();
  };

  useEffect(() => {
    if (status === 'stopped' && started) {
      onCancel();
    }
  }, [status]);

  return (
    <>
      <div className="text-center">
        {error && (
          <Alert type="error" message={`An error occured: ${error}`} />
        )}
        {mediaBlobUrl && (
          <video
              onContextMenu={(event) => { event.preventDefault(); }}
              src={mediaBlobUrl}
              autoPlay
              loop
              muted
              width="100%"
              height={500}
            /> 
        )}

        {previewStream && file && !started ? (
          <VideoPreview stream={previewStream} />
        ) : (
          <Webcam
            audio={false}
            screenshotFormat="image/png"
            width="100%"
            videoConstraints={{
              facingMode: 'user'
            }}
            ref={mediaRef}
            className='pb-6'
          />
        )}
        {started && status === 'recording' ? (
          <Button
            onClick={() => {
              clearTimeout(Timer.current);
              setStated(false);
              stopRecording();
            }}
            type="primary"
            danger
          >
            Stop Recording
          </Button>
        ): (
          <button 
          className="h-12 w-12 rounded-full bg-red-700 hover:bg-red-600 transition-all" 
          onClick={() => {
            setStated(true);
            startRecording();
            Timer.current = setTimeout(() => {
              stopRecording();
            }, (config.NEXT_PUBLIC_MAX_MINUTES_DURATION_VIDEO * 60 * 1000) + 2000);
          }}></button>
        )}
      </div>
    </>
  );
}

CameraRecording.defaultProps = {
  onFinish: () => { }
};
