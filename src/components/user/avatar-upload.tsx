/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { getGlobalConfig } from '@services/config';
import { getResponseError } from '@lib/utils';
import { performerService } from '@services/performer.service';
import { IPerformer } from '@interfaces/performer';
import { fileService } from '@services/file.service';

interface IState {
  loading: boolean;
  avatarUrl: string;
  uploading : boolean;
}

interface IProps {
  image?: string;
  headers?: any;
  onFinish: Function;
  user: IPerformer;
}

export class AvatarUpload extends PureComponent<IProps, IState> {
  state = {
    loading: false,
    uploading: false,
    avatarUrl: '/static/no-avatar.png'
  };

  componentDidMount() {
    const { image } = this.props;
    if (image) {
      this.setState({ avatarUrl: image });
    }
  }

beforeUpload = (file) => {
  const config = getGlobalConfig();
  const isLt2M = file.size / 1024 / 1024 < (config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5);
  if (!isLt2M) {
    message.error(`Avatar must be less than ${config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5}MB`);
    return false;
  }
  return this.handleUploadAvatar(file);
}

  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  handleUploadAvatar = async (file) => {
    try {
      const { user, onFinish } = this.props;
      this.setState({ uploading: true });
      const resp = await performerService.uploadAvatarFiles(file, { uploaderId: user._id }, null);
      const { data: avatar } = await fileService.getPublicInfo({ fileId: resp.fileId });
      if (avatar) {
        await this.setState({ avatarUrl: avatar?.url });
        onFinish({ avatarId: resp.fileId, avatar: avatar?.url });
      }
    } catch (error) {
      const errorMessage = Promise.resolve(error);
      message.error(getResponseError(errorMessage) || 'Something went wrong');
    } finally {
      this.setState({ uploading: false });
    }
  }

  render() {
    const { loading, uploading } = this.state;
    const { avatarUrl } = this.state;
    const { headers } = this.props;
    return (
      <ImgCrop rotate shape="round" quality={1} modalTitle="Edit Avatar" modalWidth={767}>
        <Upload
          accept="image/*"
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onPreview={this.onPreview}
          headers={headers}
        >
          <img
            src={avatarUrl}
            alt="avatar"
            style={{
              width: '100%', height: '100%', maxWidth: 104, maxHeight: 104
            }}
          />
          {(loading || uploading) ? <LoadingOutlined /> : <CameraOutlined />}
        </Upload>
      </ImgCrop>
    );
  }
}
