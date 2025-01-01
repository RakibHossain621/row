/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { getGlobalConfig } from '@services/config';
import { IPerformer } from '@interfaces/performer';
import { getResponseError } from '@lib/utils';
import { performerService } from '@services/performer.service';
import { fileService } from '@services/file.service';

interface IState {
  loading: boolean;
  uploading: boolean;
}

interface IProps {
  headers?: any;
  options?: any;
  onFinish: Function;
  user: IPerformer
}

export class CoverUpload extends PureComponent<IProps, IState> {
  state = {
    loading: false,
    uploading: false
  };

  beforeUpload = (file) => {
    const config = getGlobalConfig();
    const isLt2M = file.size / 1024 / 1024 < (config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5);
    if (!isLt2M) {
      message.error(`Avatar must be less than ${config.NEXT_PUBLIC_MAX_SIZE_IMAGE || 5}MB`);
      return false;
    }
    return this.handleUploadCover(file);
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

  handleUploadCover = async (file) => {
    try {
      const { user, onFinish } = this.props;
      this.setState({ uploading: true });
      const resp = await performerService.uploadCoverFiles(file, { uploaderId: user._id }, null);
      const { data: cover } = await fileService.getPublicInfo({ fileId: resp.fileId });
      if (cover) {
        onFinish({ coverId: resp.fileId, cover: cover?.url });
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
    const { headers, options } = this.props;
    return (
      <ImgCrop aspect={4.5 / 1} shape="rect" quality={1} modalTitle="Edit cover image" modalWidth={767}>
        <Upload
          accept="image/*"
          name={options.fieldName || 'file'}
          listType="picture-card"
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onPreview={this.onPreview}
          headers={headers}
        >
          {(loading || uploading) ? <LoadingOutlined /> : <EditOutlined />}
          {' '}
          Edit cover
        </Upload>
      </ImgCrop>
    );
  }
}
