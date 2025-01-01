import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import {
  message,
  Button,
  Select,
  Modal,
  Image,
  Input,
  Form,
  Row,
  Col,
  Radio
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import UploadList from '@components/file/list-media';
import UploadCropThumbnail from '@components/file/list-media-crop-thumbnail';
import { IFeed, IPerformer } from 'src/interfaces';
import { feedService } from '@services/index';
import Router from 'next/router';
import { connect } from 'react-redux';
import { getGlobalConfig } from '@services/config';
import { VideoPlayer } from '@components/common';
import type { RadioChangeEvent } from 'antd';
import { isMobile } from '@services/utils.service';
import './index.less';
import { getResponseError } from '@lib/utils';
import dynamic from 'next/dynamic';
import { generateUuid } from '@lib/string';
import { delay } from 'src/lib';

const CameraRecording = dynamic(() => import('@components/video/camera-recording'), { ssr: false });
const CapturePhoto = dynamic(() => import('@components/photo/capture-photo'), { ssr: false });
const VerifiedEmailForm = dynamic(() => import('@components/performer/verified-email-form'), { ssr: false });

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const validateMessages = {
  required: 'This field is required!'
};

interface IProps {
  // eslint-disable-next-line react/require-default-props
  type?: string;
  // eslint-disable-next-line react/require-default-props
  feed?: IFeed;
  currentUser: IPerformer;
}

const FeedForm = ({ type, feed, currentUser }: IProps) => {
  const [uploading, setUploading] = useState(false);
  const [thumbnailId, setThumbnailId] = useState(null);
  const [teaserId, setTeaserId] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [teaser, setTeaser] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileIds, setFileIds] = useState([]);
  const [radioValue, setRadioValue] = useState(1);
  const [valueCam, setValueCam] = useState({ facingMode: 'user' });
  const [isShowPreviewTeaser, setIsShowPreviewTeaser] = useState(false);
  const [, updateState] = React.useState() as any;
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [mobile, setMobile] = useState(false);
  const [openVerifiedEmailModal, setOpenVerifiedEmailModal] = useState(false);
  const [openCapturePhoto, setOpenCapturePhoto] = useState(false);

  const videoElem = useRef<HTMLVideoElement>(null);

  const handleDeleteFile = (field: string) => {
    if (field === 'thumbnail') {
      setThumbnail(null);
      setThumbnailId(null);
    }
    if (field === 'teaser') {
      setTeaser(null);
      setTeaserId(null);
    }
  };

  const onUploading = (file, resp: any) => {
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
    forceUpdate();
  };

  const onUploadingThumbnail = (file, resp: any) => {
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
  };

  const onChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    value === 1
      ? setValueCam({ facingMode: 'user' })
      : setValueCam({ facingMode: 'environment' });
    setRadioValue(value);
  };

  const onsubmit = async (item, values) => {
    console.log("{ ...values, type }", { ...values, type })
    try {
      setUploading(true);
      !item
        ? await feedService.create({ ...values, type })
        : await feedService.update(item._id, { ...values, type: item.type });
      message.success('Posted successfully!');
      setUploading(false);
      // Router.push(
      //   {
      //     pathname: '/model/profile',
      //     query: {
      //       username: currentUser?.username || currentUser?._id,
      //       tab: type
      //     }
      //   },
      //   `/model/profile/?username=${currentUser?.username || currentUser?._id}`
      // );
    } catch (err) {
      const error = await Promise.resolve(err);
      message.error(
        getResponseError(error) || 'Something went wrong, please try again'
      );
      setUploading(false);
    }
  };

  const beforeUploadThumbnail = async (file) => {
    if (!file) {
      return;
    }
    const config = getGlobalConfig();
    const isLt2M = file.size / 1024 / 1024 < (config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 0);
    if (!isLt2M) {
      message.error(
        `Image is too large please provide an image ${config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 0
        }MB or below`
      );
    }
    try {
      setUploading(true);
      const resp = await feedService.uploadFile(file, { uploaderId: currentUser._id }, onUploadingThumbnail.bind(this, file));
      setThumbnailId(resp?.data?.fileId);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setThumbnail({ url: reader.result });
      });
      reader.readAsDataURL(file);
    } catch (e) {
      message.error(`Thumbnail file ${file.name} error!`);
    } finally {
      setUploading(false);
    }
  };

  const captureThumbnail = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoElem.current.videoWidth;
      canvas.height = videoElem.current.videoHeight;
      canvas
        .getContext('2d')
        .drawImage(
          videoElem.current,
          0,
          0,
          videoElem.current.videoWidth,
          videoElem.current.videoHeight
        );
      const fileName = 'thumbnails.png';
      const base64 = canvas?.toDataURL('image/*');
      let file = null;
      const blobBin = atob(base64.split(',')[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i += 1) {
        array.push(blobBin.charCodeAt(i));
      }
      file = new File(
        [new Blob([new Uint8Array(array)], { type: 'image/*' })],
        fileName,
        {
          type: 'image/png'
        }
      );
      if (file?.size > 0) {
        beforeUploadThumbnail(file);
      }
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  const onFinishCameraRecoding = async (file) => {
    const config = getGlobalConfig();
    if (!file?.duration || file?.duration > (config.NEXT_PUBLIC_MAX_MINUTES_DURATION_VIDEO * 60 || 180)) {
      message.error(
        `You cannot post a video more than ${config.NEXT_PUBLIC_MAX_MINUTES_DURATION_VIDEO || 3
        } minutes long`,
        5
      );
      return false;
    }
    if (!file?.duration || file?.duration < (config.NEXT_PUBLIC_MIN_SECONDS_DURATION_VIDEO || 3)) {
      message.error(
        `You cannot post a video less than ${config.NEXT_PUBLIC_MIN_SECONDS_DURATION_VIDEO || 3
        } seconds long`,
        5
      );
      return false;
    }
    setFileList([file]);
    setUploading(true);
    const resp = await feedService.uploadFile(file, { uploaderId: currentUser._id }, onUploading.bind(this, file));
    setUploading(false);
    setFileIds([resp?.data?.fileId]);
    return true;
  };

  const onFinishPhotoCapture = async (fileUrl) => {
    try {
      const fileName = 'thumbnails.png';
      let file = null;
      const blobBin = atob(fileUrl.split(',')[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i += 1) {
        array.push(blobBin.charCodeAt(i));
      }
      file = new File(
        [new Blob([new Uint8Array(array)], { type: 'image/*' })],
        fileName,
        {
          type: 'image/png'
        }
      );
      setFileList([{
        thumnail: fileUrl,
        percent: 100,
        status: 'done',
        url: fileUrl,
        uid: generateUuid(),
        type: 'image/png'
      }]);
      setUploading(true);
      const resp = (await feedService.uploadPhoto(
        file,
        {},
        onUploading.bind(this, file)
      )) as any;
      setUploading(false);
      setOpenCapturePhoto(false);
      setFileIds([resp.data._id]);
      return true;
    } catch (error) {
      message.error('Error uploading ! Please try again');
      setUploading(false);
      setOpenCapturePhoto(false);
      return false;
    }
  };

  const remove = useCallback((file) => {
    setFileList(
      fileList.filter((f) => f?._id !== file?._id || f?.uid !== file?.uid)
    );
    setFileIds(fileIds.filter((id) => id !== file?._id));
  }, []);

  const getDuration = (file) => new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = function onLoadMetaData() {
        resolve(this);
      };
      video.onerror = function error() {
        Promise.reject(
          new Error('Invalid video. Please select a video file.')
        );
      };
      video.src = window.URL.createObjectURL(file);
    } catch (e) {
      reject(e);
    }
  });

  const beforeUpload = async (file, listFile) => {
    const config = getGlobalConfig();

    if (file.type.includes('image')) {
      const valid = file.size / 1024 / 1024 < (config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5);
      if (!valid) {
        message.error(
          `Image ${file.name} must be smaller than ${config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5
          }MB!`
        );
        return false;
      }
    }

    if (file.type.includes('video')) {
      const vid = (await getDuration(file)) as any;
      if (
        !vid?.duration
        || vid?.duration > (config.NEXT_PUBLIC_MAX_DURATION_VIDEO || 60)
      ) {
        message.error(
          `Video ${file.name} must be shorter than ${config.NEXT_PUBLIC_MAX_DURATION_VIDEO || 60
          } seconds !`
        );
        return false;
      }
      if (
        !vid?.duration
        || vid?.duration < (config.NEXT_PUBLIC_MIN_SECONDS_DURATION_VIDEO || 3)
      ) {
        message.error(
          `Video ${file.name} must be longer than ${config.NEXT_PUBLIC_MIN_SECONDS_DURATION_VIDEO || 3
          } seconds !`
        );
        return false;
      }
      const valid = file.size / 1024 / 1024 < (config.NEXT_PUBLIC_MAX_SIZE_TEASER || 200);
      if (!valid) {
        message.error(
          `Video ${file.name} must be smaller than ${config.NEXT_PUBLIC_MAX_SIZE_TEASER || 200
          }MB!`
        );
        return false;
      }
    }

    if (listFile.indexOf(file) === listFile.length - 1) {
      setUploading(true);
      const files = await Promise.all(
        listFile.map((f) => {
          const newFile = f;
          if (newFile.type.includes('video')) return f;
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            newFile.thumbnail = reader.result;
          });
          reader.readAsDataURL(newFile);
          return newFile;
        })
      );

      await setFileList(
        file.type.includes('video') ? files : [...fileList, ...files]
      );
      const newFileIds = file.type.includes('video') ? [] : [...fileIds];
      // eslint-disable-next-line no-restricted-syntax
      for (const fileItem of listFile) {
        try {
          // eslint-disable-next-line no-continue
          if (['uploading', 'done'].includes(fileItem.status) || fileItem._id) { continue; }
          fileItem.status = 'uploading';
          // eslint-disable-next-line no-await-in-loop
          const resp = await feedService.uploadFile(fileItem, { uploaderId: currentUser._id }, onUploading.bind(this, file));
          newFileIds.push(resp?.data?.fileId);
          fileItem._id = resp?.data?.fileId;
        } catch (e) {
          message.error(`File ${fileItem.name} error!`);
        }
      }
      setUploading(false);
      await setFileIds(newFileIds);
    }
    return true;
  };

  const submit = async (payload: any) => {
    if (!currentUser.verifiedEmail) {
      return setOpenVerifiedEmailModal(true);
    }

    const formValues = { ...payload };
    const description = `#${formValues.hashtag1?.split(' ').join('')} ${formValues?.hashtag2 ? `#${formValues?.hashtag2.split(' ').join('')}` : ''
    } ${formValues?.hashtag3 ? `#${formValues?.hashtag3.split(' ').join('')}` : ''
    } `;
    formValues.fromSourceId = currentUser._id;
    formValues.teaserId = teaserId;
    formValues.thumbnailId = thumbnailId;
    formValues.text = description.trim();
    formValues.fileIds = fileIds;

    if (['video', 'photo'].includes(feed?.type || type) && !fileIds.length) {
      message.error(`Please add ${feed?.type || type} file`);
      return false;
    }

    if (formValues.hashtag1 === formValues.hashtag2 || formValues.hashtag1 === formValues.hashtag3 || (formValues.hashtag2 && formValues.hashtag2 === formValues.hashtag3 && formValues.hashtag3)) {
      return message.error('The hashtag has been used, please use a different one');
    }
    console.log("feed, formValues", feed, formValues)
    return onsubmit(feed, formValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (fileList[0]?.percent === 100 && type === 'video' && fileIds.length > 0) {
        await delay(1000);
        captureThumbnail();
      }
    };
    fetchData();
  }, [fileList.length && fileIds.length && fileList[0]?.percent]);

  useEffect(() => {
    if (feed) {
      setFileList(feed.files ? feed.files : []);
      setFileIds(feed.fileIds ? feed.fileIds : []);
      setThumbnail(feed.thumbnail);
      setThumbnailId(feed.thumbnailId);
    }
    !feed && setFileList([]);
    setMobile(isMobile());
  }, [type]);

  return (
    <div className="feed-form">
      <Form
        {...layout}
        onFinish={(values) => {
          submit(values);
        }}
        validateMessages={validateMessages}
        initialValues={
          feed || {
            text: '',
            price: 4.99,
            isSale: false,
            status: 'active'
          }
        }
        scrollToFirstError
      >
        {['video', 'photo'].includes(feed?.type || type) && (
        <div className="border">
          <Form.Item
            label={
                (feed?.type || type) === 'video'
                  ? 'Step 1 : Attach up to 60 seconds video and select thumbnail'
                  : 'Step 1 : Attach photo'
              }
          >
            <Row>
              <Col md={24} xs={24}>
                {mobile && (feed?.type || type) === 'video' && (
                <Radio.Group onChange={onChange} value={radioValue}>
                  <Radio value={1}>Facing camera</Radio>
                  <Radio value={2}>Environment camera</Radio>
                </Radio.Group>
                )}
              </Col>
              {(feed?.type || type) === 'video' ? (
                <>
                  <Col md={12} xs={24}>
                    <CameraRecording
                      onFinish={onFinishCameraRecoding}
                      video={valueCam}
                    />
                  </Col>
                  <Col md={12} xs={24}>
                    <UploadCropThumbnail
                      type={feed?.type || type}
                      files={fileList}
                      remove={remove}
                      onAddMore={beforeUpload}
                      uploading={uploading}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col md={12} xs={24}>
                    {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                    {/* eslint-disable jsx-a11y/interactive-supports-focus  */}
                    <span
                      className="ant-upload-picture-card-wrapper avatar-uploader"
                      role="button"
                      onClick={() => setOpenCapturePhoto(true)}
                    >
                      <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
                        <span className="ant-upload" role="button">
                          <div>
                            <div style={{ marginTop: '8px' }}>Take Photo with Webcam</div>
                          </div>
                        </span>
                      </div>
                    </span>
                  </Col>
                  <Col md={12} xs={24}>
                    {openCapturePhoto && <CapturePhoto onFinish={onFinishPhotoCapture} onCancel={() => setOpenCapturePhoto(false)} capturing={uploading} />}
                    <UploadList
                      type={feed?.type || type}
                      files={fileList}
                      remove={remove}
                      onAddMore={beforeUpload}
                      uploading={uploading}
                    />
                  </Col>
                </>
              )}
            </Row>
          </Form.Item>
          <div className="vid-upload-thumbnail">
            {fileList[0]
                && fileList[0].percent === 100
                && (feed?.type || type) === 'video' && (
                  <>
                    <video
                      onContextMenu={(event) => { event.preventDefault(); }}
                      ref={videoElem}
                      id="video"
                      src={URL.createObjectURL(fileList[0])}
                      controls
                      controlsList="nodownload nofullscreen noplaybackrate"
                      disablePictureInPicture
                    />
                    <div className="capture-image">
                      <Button
                        loading={uploading}
                        disabled={uploading}
                        className="primary"
                        onClick={captureThumbnail}
                      >
                        Change thumbnail
                      </Button>
                    </div>
                  </>
            )}
          </div>
          <Row>
            {thumbnail && (feed?.type || type) === 'video' && (
            <Col md={24} xs={24}>
              <Form.Item>
                <div className="thumbnail-container">
                  <Button
                    type="primary"
                    className="delete-btn"
                    onClick={() => handleDeleteFile('thumbnail')}
                  >
                    <DeleteOutlined />
                  </Button>
                  <Image alt="thumbnail" src={thumbnail?.url} />
                </div>
              </Form.Item>
            </Col>
            )}
          </Row>
        </div>
        )}
        <Row>
          <Col md={12} xs={24}>
            <div className="post-border">
              <span className="post-title">Step 2 : Keywords</span>
              <Input.Group size="large">
                <Form.Item
                  name="hashtag1"
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[{ required: true }]}
                >
                  <Input
                    maxLength={25}
                    placeholder="Hashtag 1"
                    addonBefore="#"
                  />
                </Form.Item>
                <Form.Item
                  name="hashtag2"
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input
                    maxLength={25}
                    placeholder="Hashtag 2"
                    addonBefore="#"
                  />
                </Form.Item>
                <Form.Item
                  name="hashtag3"
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input
                    maxLength={25}
                    placeholder="Hashtag 3"
                    addonBefore="#"
                  />
                </Form.Item>
              </Input.Group>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="post-border">
              <span className="post-title">Step 3: Visibility</span>
              <Form.Item name="status">
                <Select>
                  <Select.Option key="active" value="active">
                    Public
                  </Select.Option>
                  <Select.Option key="inactive" value="inactive">
                    Only Me
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
        </Row>
        <div className="submit-btns custom">
          <Button
            className="primary"
            htmlType="submit"
            loading={uploading}
            disabled={uploading}
          >
            Submit
          </Button>
        </div>
      </Form>
      <Modal
        width={767}
        footer={null}
        onOk={() => setIsShowPreviewTeaser(false)}
        onCancel={() => setIsShowPreviewTeaser(false)}
        visible={isShowPreviewTeaser}
        destroyOnClose
      >
        <VideoPlayer
          {...{
            autoplay: true,
            controls: true,
            playsinline: true,
            fluid: true,
            sources: [
              {
                src: teaser?.url,
                type: 'video/mp4'
              }
            ]
          }}
        />
      </Modal>
      <Modal
        key="verified_email"
        className="subscription-modal"
        title="Please verify your email address"
        visible={openVerifiedEmailModal}
        footer={null}
        destroyOnClose
        onCancel={() => setOpenVerifiedEmailModal(false)}
      >
        <VerifiedEmailForm />
      </Modal>
    </div>
  );
};

const mapStates = (state: any) => ({
  currentUser: state.user.current
});

export default connect(mapStates)(FeedForm);
