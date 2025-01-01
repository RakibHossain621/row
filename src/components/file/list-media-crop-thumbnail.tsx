/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-nested-ternary */
import { PlayCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Progress,
  Tooltip,
  Upload,
  Image
} from 'antd';
import '../post/index.less';
import { memo } from 'react';

interface IProps {
  remove: Function;
  files: any[];
  onAddMore: Function;
  onBeforeUploadThumbnail?:Function
  uploading: boolean;
  type?: string;
}
const UploadCropThumbnail = ({
  remove: handleRemove, files, onAddMore: handleAddMore, uploading, type
}:IProps) => {
  const beforeUpload = (fileUpload, fileList) => {
    handleAddMore(fileUpload, fileList);
  };

  return (
    <div className="f-upload-list">
      {files && files.map((item) => (
        <div className="f-upload-item" key={item._id || item.uid}>
          <div className="f-upload-thumb">
            {(type === 'image' || item.type?.includes('feed-photo') || item.type?.includes('image'))
              ? <Image placeholder alt="img" src={item.url ? item.url : item.thumbnail} fallback="static/no-avatar.png" width="100%" />
              : (type === 'video' || item.type?.includes('video')) ? (
                <span className="f-thumb-vid" aria-hidden>
                  <PlayCircleOutlined />
                </span>
              ) : <img alt="img" src="/static/no-image.jpg" width="100%" />}
          </div>
          <div className="f-upload-name">
            <Tooltip title={item.name}>{item.name}</Tooltip>
          </div>
          {item?.size && (
          <div className="f-upload-size">
            {(item.size / (1024 * 1024)).toFixed(2)}
            {' '}
            MB
          </div>
          ) }
          {item.status !== 'uploading'
              && (
              <span className="f-remove">
                <Button type="primary" onClick={() => handleRemove(item)}>
                  <DeleteOutlined />
                </Button>
              </span>
              )}
          {item.percent && <Progress percent={Math.round(item.percent)} />}
        </div>
      ))}
      {(type === 'video' && !files.length) && (
        <div className="add-more">
          <Upload
            customRequest={() => true}
            accept={'video/*'}
            beforeUpload={beforeUpload}
            multiple={false}
            showUploadList={false}
            disabled={uploading}
            listType="picture"
          >
            Upload
            {' '}
            Video
          </Upload>
        </div>
      )}
    </div>
  );
};

export default memo(UploadCropThumbnail);
