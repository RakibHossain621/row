export interface IFileUpload {
  /**
   * url to get file upload URL
   */
  url: string;

  /**
   * file binary data
   */
  file: File;
  /**
   * type of file eg avatar, feed-photo...
   */
  type?: string;
  /**
   * field name for file upload. Default is `file`
   */
  fieldName?: string;

  /**
   * post data when calling get file upload url
   */
  body?: any;

  /**
   * callback function for upload
   */
  onProgress?: Function;

  /**
   * custom metadata to be save
   * support duration, name, width, height, size
   */
  fileMetadata?: Record<string, any> | any;
}
