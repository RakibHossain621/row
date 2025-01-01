/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Button, Modal } from 'antd';
import {
  useCallback, useRef
} from 'react';
import Webcam from 'react-webcam';
import { isMobile } from 'react-device-detect';

interface IProps {
  onFinish: (src: any) => void;
  onCancel : ()=> void;
  capturing : boolean;
}

export default function CapturePhoto({ onFinish, onCancel, capturing }: IProps) {
  const webcamRef = useRef(null);

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      onFinish(imageSrc);
    },
    [webcamRef]
  );

  const videoConstraints = {
    facingMode: 'user'
  };

  if (isMobile) return null;

  return (
    <>
      <div className="text-center">
        <Webcam
          audio={false}
          screenshotFormat="image/png"
          width="100%"
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <div className="pt-4">
          <button className="h-12 w-12 rounded-full bg-red-700 hover:bg-red-600 transition-all" onClick={capture}></button>
        </div>
      </div>
    </>
  );
}
