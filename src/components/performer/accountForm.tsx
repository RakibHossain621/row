/* eslint-disable react/require-default-props */
/* eslint-disable no-template-curly-in-string */
import { createRef, PureComponent } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  message,
  Popover
} from 'antd';
import {
  IPerformer, ICountry, IBody, ILangguges
} from 'src/interfaces';
import { AvatarUpload } from '@components/user/avatar-upload';
import { CoverUpload } from '@components/user/cover-upload';
import { TwitterOutlined, GoogleOutlined } from '@ant-design/icons';
import { getGlobalConfig } from '@services/config';
import moment from 'moment';
import { utilsService } from '@services/utils.service';
import { ROLE_PERMISSIONS } from 'src/constants';
// import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};
const { TextArea } = Input;

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!'
  },
  number: {
    range: 'Must be between ${min} and ${max}'
  }
};

interface IProps {
  onFinish: Function;
  onUpdatePassword : Function;
  onVerifyEmail: Function;
  countTime: number;
  user: IPerformer;
  updating: boolean;
  options?: {
    uploadHeaders?: any;
    avatarUploadUrl?: string;
    onAvatarUploaded?: Function;
    coverUploadUrl?: string;
    onCoverUploaded?: Function;
    beforeUpload?: Function;
    videoUploadUrl?: string;
    onVideoUploaded?: Function;
    uploadPercentage?: number;
  };
  countries: ICountry[];
  languages: ILangguges[];
  bodyInfo: IBody;
}

export class PerformerAccountForm extends PureComponent<IProps> {
  state = {
    isUploadingVideo: false,
    isVerifyAccount: false,
    states: [],
    cities: [],
    date: { year: null, day: null, month: null } as any,
    monthError: false,
    dayError: false,
    yearError: false
  };

  formRef: any;

  componentDidMount() {
    const { user } = this.props;
    if (user.dateOfBirth) {
      const dateOfBirth = new Date(user.dateOfBirth);
      this.setState({ date: { year: dateOfBirth.getFullYear().toString() || (new Date().getFullYear() - 18).toString(), day: dateOfBirth.getDate().toString(), month: dateOfBirth.getMonth().toString() } });
    }
    if (
      user.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_VERIFIED)
      || user.roles.includes(ROLE_PERMISSIONS.ROLE_FAN_VERIFIED)
    ) {
      this.setState({ isVerifyAccount: true });
    }
    if (user?.country) {
      this.handleGetStates(user?.country);
      if (user?.state) {
        this.handleGetCities(user?.country, user?.state);
      }
    }
  }

  handleVideoChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ isUploadingVideo: true });
      return;
    }
    if (info.file.status === 'done') {
      message.success('Intro video was uploaded');
      this.setState({
        isUploadingVideo: false
      });
    }
  };

  handleGetStates = async (countryCode: string) => {
    const { user } = this.props;
    const resp = await utilsService.statesList(countryCode);
    const eState = resp.data.find((s) => s === user?.state);
    await this.setState({ states: resp.data });
    if (eState) {
      this.formRef.setFieldsValue({ state: eState });
    } else {
      this.formRef.setFieldsValue({ state: '', city: '' });
    }
  };

  handleGetCities = async (countryCode: string, state: string) => {
    const { user } = this.props;
    const resp = await utilsService.citiesList(countryCode, state);
    await this.setState({ cities: resp.data });
    const eCity = resp.data && resp.data.find((s) => s === user?.city);
    if (eCity) {
      this.formRef.setFieldsValue({ city: eCity });
    } else {
      this.formRef.setFieldsValue({ city: '' });
    }
  };

  beforeUploadVideo = (file) => {
    const isValid = file.size / 1024 / 1024
      < (getGlobalConfig().NEXT_PUBLIC_MAX_SIZE_TEASER || 200);
    if (!isValid) {
      message.error(
        `File is too large please provide an file ${
          getGlobalConfig().NEXT_PUBLIC_MAX_SIZE_TEASER || 200
        }MB or below`
      );
      return false;
    }
    return true;
  };

  render() {
    const {
      onFinish,
      user,
      updating,
      countries,
      languages,
      options,
      bodyInfo,
      onVerifyEmail,
      countTime = 60
    } = this.props;
    const { heights = [], genders = [], ethnicities = [] } = bodyInfo;
    const {
      uploadHeaders
    } = options;
    const {
      isUploadingVideo, states, cities, isVerifyAccount, date, dayError, monthError, yearError
    } = this.state;

    if (!this.formRef) this.formRef = createRef();

    return (
      <div>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={(val) => onFinish({ ...val, dateSelected: date })}
          validateMessages={validateMessages}
          initialValues={{
            ...user,
            dateOfBirth: (user.dateOfBirth && moment(user.dateOfBirth)) || ''
          }}
          scrollToFirstError
          className="account-form"
          ref={(ref) => {
            this.formRef = ref;
          }}
        >
          <div
            className="top-profile"
            style={{
              position: 'relative',
              marginBottom: 25,
              backgroundImage: user?.cover
                ? `url('${user.cover}')`
                : "url('/static/banner-image.jpg')"
            }}
          >
            <div className="avatar-upload">
              <AvatarUpload
                headers={uploadHeaders}
                image={user.avatar}
                user={user}
                onFinish={(val) => onFinish({ ...user, ...val, dateSelected: date })}
              />
            </div>
            <div className="cover-upload">
              <CoverUpload
                headers={uploadHeaders}
                options={{ fieldName: 'cover' }}
                user={user}
                onFinish={(val) => onFinish({ ...user, ...val, dateSelected: date })}
              />
            </div>
          </div>
          <Row>
            <Col lg={12} md={12} xs={24}>
              <Form.Item
                name="name"
                label="Display Name"
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  {
                    min: 3,
                    message: 'Display name must containt at least 3 characters'
                  }
                ]}
                hasFeedback
              >
                <Input disabled={isVerifyAccount} />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item
                name="username"
                label="Username"
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  { required: true, message: 'Please input your username!' },
                  {
                    pattern: new RegExp(/^[a-z0-9]+$/g),
                    message: 'Username must contain lowercase alphanumerics only'
                  },
                  {
                    min: 3,
                    message: 'Username must containt at least 3 characters'
                  }
                ]}
                hasFeedback
              >
                <Input
                  disabled={isVerifyAccount}
                  placeholder="user1, john99,..."
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="bio" label="Bio">
                <TextArea
                  rows={3}
                  placeholder="Tell people something about you..."
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item
                name="languages"
                label="Languages"
              >
                <Select>
                  {languages.map((l) => (
                    <Select.Option key={l.code} value={l.code}>
                      {l.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item
                name=""
                label="Date of Birth"
              >
                {/* <div className="dateOfBirth-form">
                  <MonthPicker
                    defaultValue="MM"
                    endYearGiven // mandatory if end={} is given in YearPicker
                    year={date.year} // mandatory
                    value={date.month} // mandatory
                    required
                    onChange={(month) => {
                      this.setState({ date: { ...date, month } });
                    }}
                    id="month"
                    classes={`dropdown ${dayError ? 'error' : ''}`}
                    optionClasses="option"
                  />
                  <DayPicker
                    defaultValue="DD"
                    year={date.year || 1900}
                    month={date.month}
                    endYearGiven
                    required
                    value={date.day}
                    onChange={(day) => {
                      this.setState({ date: { ...date, day } });
                    }}
                    id="day"
                    classes={`dropdown ${monthError ? 'error' : ''}`}
                    optionClasses="option"
                  />
                  <YearPicker
                    defaultValue="YYYY"
                    end={new Date().getFullYear() - 18}
                    reverse
                    required
                    value={date.year}
                    onChange={(year) => {
                      this.setState({ date: { ...date, year } });
                    }}
                    id="year"
                    classes={`dropdown ${yearError ? 'error' : ''}`}
                    optionClasses="option"
                  />
                </div> */}
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item
                name="country"
                label="Country"
              >
                <Select
                  showSearch
                  optionFilterProp="label"
                  onChange={(val: string) => this.handleGetStates(val)}
                >
                  {countries.map((c) => (
                    <Option value={c.code} label={c.name} key={c.code}>
                      <img alt="country_flag" src={c.flag} width="25px" />
                      {' '}
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  { message: 'Please select your gender!' }
                ]}
              >
                <Select>
                  {genders.map((s) => (
                    <Select.Option key={s.value} value={s.value}>
                      {s.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Form.Item name="state" label="State">
                <Select
                  placeholder="Select your state"
                  optionFilterProp="label"
                  showSearch
                  onChange={(val: string) => this.handleGetCities(
                    this.formRef.getFieldValue('country'),
                    val
                  )}
                >
                  {states?.length > 0
                  && states.map((state) => (
                    <Option value={state} label={state} key={state}>
                      {state}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item name="ethnicity" label="Ethnicity">
                <Select>
                  {ethnicities.map((s) => (
                    <Select.Option key={s.value} value={s.value}>
                      {s.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Form.Item name="city" label="City">
                <Select
                  placeholder="Select your city"
                  optionFilterProp="label"
                  showSearch
                >
                  {cities?.length > 0
                  && cities.map((city) => (
                    <Option value={city} label={city} key={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item name="relationship" label="Relationship Availability">
                <Select>
                  <Select.Option key="active" value="active">
                    Available
                  </Select.Option>
                  <Select.Option key="inactive" value="inactive">
                    Taken
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Form.Item name="height" label="Height">
                <Select showSearch>
                  {heights.map((s) => (
                    <Select.Option key={s.value} value={s.value}>
                      {s.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* <Col lg={24} md={24} xs={24}>
              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>
            </Col> */}
            {/* <Col lg={12} md={12} xs={24}>
              <Form.Item name="zipcode" label="Zip Code">
                <Input />
              </Form.Item>
            </Col> */}
            <Col lg={12} md={12} xs={24}>
              {user.twitterConnected && (
              <Form.Item>
                <p>
                  <TwitterOutlined
                    style={{ color: '#1ea2f1', fontSize: '30px' }}
                  />
                  {' '}
                  Signup/login via Twitter
                </p>
              </Form.Item>
              )}
              {user.googleConnected && (
              <Form.Item>
                <p>
                  <GoogleOutlined
                    style={{ color: '#d64b40', fontSize: '30px' }}
                  />
                  {' '}
                  Signup/login via Google
                </p>
              </Form.Item>
              )}
            </Col>
            <Col lg={24} md={24} xs={24}>
              <Form.Item
                name="email"
                label={(
                  <span style={{ fontSize: 10 }}>
                    Email Address
                    {'  '}
                    {user.verifiedEmail ? (
                      <Popover
                        title="Your email address is verified"
                        content={null}
                      >
                        <a className="success-color">Verified!</a>
                      </Popover>
                    ) : (
                      <Popover
                        content={(
                          <Button
                            type="primary"
                            onClick={() => onVerifyEmail()}
                            disabled={updating || countTime < 60}
                            loading={updating || countTime < 60}
                          >
                            Click here to
                            {' '}
                            {countTime < 60 ? 'resend' : 'send'}
                            {' '}
                            the
                            verification link
                            {' '}
                            {countTime < 60 && `${countTime}s`}
                          </Button>
                      )}
                      >
                        <a className="error-color">Not verified!</a>
                      </Popover>
                    )}
                  </span>
              )}
                rules={[
                  { type: 'email' },
                  { required: true, message: 'Please input your email address!' }
                ]}
                hasFeedback
                validateTrigger={['onChange', 'onBlur']}
              >
                <Input disabled={user.roles.includes(ROLE_PERMISSIONS.ROLE_MANAGED_ACCOUNT)} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ ...layout.wrapperCol }} className="text-center">
            <Button
              className="primary"
              type="primary"
              htmlType="submit"
              loading={updating || isUploadingVideo}
              disabled={updating || isUploadingVideo}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
