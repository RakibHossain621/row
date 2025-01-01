import Head from 'next/head';
import { FormEvent, PureComponent } from 'react';
import { connect, useDispatch } from 'react-redux';
import { message, Select } from 'antd';
import {
  IPerformer,
  IBanking,
  IUIConfig,
  ICountry,
  IBody,
  ILangguges,
  LanguageInfo,
  BodyInfoResponse,
  CountriesInfo
} from 'src/interfaces';
import {
  updatePerformer,
  updateCurrentUserAvatar,
  updateBanking,
  updateCurrentUserCover
} from 'src/redux/user/actions';
import {
  authService, utilsService
} from '@services/index';
// import {
//   PerformerAccountForm
// } from '@components/performer';
import '../../user/index.less';
import { ROLE_PERMISSIONS } from 'src/constants';
import moment from 'moment';
// import Link from 'next/link';
// import { UpdatePaswordForm } from '@components/user';
// import DefaultPrice from '@components/performer/default-price';
// import classNames from 'classnames';
import Router from 'next/router'
import { AppInput } from '@components/ui/shared/AppInput';
// import { AppIcon, iconVariants } from '@components/ui/shared/AppIcon';
import { AppButton, buttonVariants } from '@components/ui/shared/AppButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cookie from 'js-cookie'
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import AppVideoCard from '@components/ui/shared/AppVideoCard';

import { updateModals } from '@redux/modals/actions';
import { debug } from 'console';
import GoLiveModal from '@components/modals/goLiveModal';
import { IModals } from '@interfaces/modals';

import {  CameraSvg } from 'src/icons';
import StreamMutedListModal from '@components/modals/streamMutedListModal';
import { getGlobalConfig } from '@services/config';

interface IProps {
  currentUser: IPerformer;
  updatePerformer: Function;
  updatePassword: Function;
  updating: boolean;
  updateCurrentUserAvatar: Function;
  updateBanking: Function;
  onDeleteAccount: Function;
  ui: IUIConfig;
  updateCurrentUserCover: Function;
  countries: ICountry[];
  bodyInfo: IBody;
  languages: ILangguges[];
  modals: IModals;
  updateModals: Function;

}

type updatePasswordInputs = {
  changePassword: {
    value: string
  },
  newPassword: {
    value: string
  },
  confirmPassword: {
    value: string
  }
}
class AccountSettings extends PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      emailSending: false,
      countTime: 60,
      pwUpdating: false,
      copied: false,
      currentPerformer: { ...this.props.currentUser },
      selectedFile: null,
      countries: [] as CountriesInfo[],
      bodyInfo: null as BodyInfoResponse,
      languages: [] as LanguageInfo[],
      states: [] as string[]
    }
    this.handleFileChange = this.handleFileChange.bind(this); 
  }

  static authenticate = true;

  static onlyPerformer = true;

  static async getInitialProps() {
    const [countries, bodyInfo, languages] = await Promise.all([
      utilsService.countriesList(),
      utilsService.bodyInfo(),
      utilsService.languagesList()
    ]);
    return {
      countries: countries?.data || [],
      languages: languages?.data || [],
      bodyInfo: bodyInfo?.data
    };
  }

  _intervalCountdown: any;

  state = {
    emailSending: false,
    countTime: 60,
    pwUpdating: false,
    copied: false,
    currentPerformer: { ...this.props.currentUser },
    selectedFile: null,
    countries: [] ,
    bodyInfo: null,
    languages: [],
    states: []
  };

  handleCountdown = async () => {
    const { countTime } = this.state;
    this.setState({ countTime: countTime - 1 });
    this._intervalCountdown = setInterval(this.coundown.bind(this), 1000);
  };

  async handleUpdateBanking(data: IBanking) {
    const { currentUser, updateBanking: handleUpdateBanking } = this.props;
    await handleUpdateBanking({ ...data, performerId: currentUser._id });
  }

  onUploading = (file, resp: any) => {
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
    // forceUpdate();
  };

  onAvatarUploaded(data: any) {
    const { updateCurrentUserAvatar: handleUpdateAvt } = this.props;
    message.success('Changes saved');
    handleUpdateAvt(data.url);

  }

  onCoverUploaded(data: any) {
    const { updateCurrentUserCover: handleUpdateCover } = this.props;
    message.success('Changes saved');
    handleUpdateCover(data.url);
  }

  coundown() {
    const { countTime } = this.state;
    if (countTime === 0) {
      this.setState({ countTime: 60 });
      clearInterval(this._intervalCountdown);
      return null;
    }
    return this.setState({ countTime: countTime - 1 });
  }

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentUser, updatePerformer:handleUpdatePerformer } = this.props;
    const {currentPerformer} = this.state;
    const data = currentPerformer;
    if (typeof (data.languages) === 'string') {
      data.languages = [data.languages];
    }

    if (
      (data.name !== currentUser.name
        || data.username !== currentUser.username
        || data.email !== currentUser.email)
      && (currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_VERIFIED)
        || currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_FAN_VERIFIED))
    ) {
      message.error('Verified Account cant change name, username and email !');
      return;
    }
    const dateOfBirth = data.dateOfBirth;
    const dateOfBirthISO = new Date(dateOfBirth).toISOString();
    handleUpdatePerformer({
      ...currentUser,
      ...data,
      dateOfBirth:dateOfBirthISO,
      isUpdateProfile: true
    });
    updatePerformer(data);
  }

  async verifyEmail() {
    const { currentUser } = this.props;
    try {
      await this.setState({ emailSending: true });
      const resp = await authService.verifyEmail({
        sourceType: 'performer',
        source: currentUser
      });
      this.handleCountdown();
      resp.data && resp.data.message && message.success(resp.data.message);
    } catch (e) {
      const error = await e;
      message.success(
        error?.message || 'An error occured, please try again later'
      );
    } finally {
      this.setState({ emailSending: false });
    }
  }
  isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); 
  }

  async fetchState(code){
    const statesResponse = await utilsService.statesList(code);
    this.setState({
      states: statesResponse.data
    })
  }

  handleSelect = (name,value) =>{
    this.fetchState(value)
    this.setState((prevState:any) => ({
      currentPerformer: {
        ...prevState.currentPerformer,
        [name]: value
      }
    }));
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState:any) => ({
      currentPerformer: {
        ...prevState.currentPerformer,
        [name]: value
      }
    }));
  }

  async updatePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.target as unknown as updatePasswordInputs

    const {
      changePassword, 
      newPassword,
      confirmPassword 
    } = target

    if (newPassword.value !== confirmPassword.value) {
      return message.error('Confirm password not match')
    }

    try {
      await authService.updatePassword({ 
        source: 'performer',
        type: 'email',
        currentPassword: changePassword.value,
        password: newPassword.value
      });
      message.success('Changes saved.');
    } catch (e) {
      const err = await e;
      message.error(err?.message || 'An error occurred, please try again!');
    }
  }

  onCopy() {
    this.setState({ copied: true });

    setTimeout(() => this.setState({ copied: false }), 2500);
  };

  handleFileChange(event) {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
    const myHeaders = new Headers();
    myHeaders.append("Authorization", cookie.get('token'));
    const formdata = new FormData();
    formdata.append("file", file,file.name);
    const confg = getGlobalConfig()
    

  fetch(`${confg.NEXT_PUBLIC_API_ENDPOINT}/users/avatar/upload`, {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  })
    .then((response) => response.json())
    .then((result) =>this.onAvatarUploaded(result.data)  )
    .catch((error) => message.error(error.message));
    }

  async componentDidMount(){
    const data = await AccountSettings.getInitialProps();
    this.setState({
      languages: data.languages,
      countries:data.countries,
      bodyInfo: data.bodyInfo
    })
  }



  render() {
    const {
      currentUser, updating, ui, countries, bodyInfo, languages, modals,
  updateModals
    } = this.props;
    const {currentPerformer} = this.state;

    const { emailSending, countTime, pwUpdating } = this.state;
    const uploadHeaders = {
      authorization: authService.getToken()
    };

    return (
      <>
        <Head>
          <title>
            {ui && ui.siteName}
            {' '}
            | Edit Profile
          </title>
        </Head>

        <div>
          {/* Cover photo */}
          <div className='p-5 bg-purple-900 md:h-36 xl:h-72 rounded-xl'>
            <div className='flex items-start justify-between'>
              <div className='inline-flex items-center'>
                <span className="relative flex w-3 h-3 mr-2">
                  {/* <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-alertGreen animate-ping"></span> */}
                  <span className="relative inline-flex w-3 h-3 rounded-full bg-alertGreen"></span>
                </span>

                <span className='text-sm text-white'>Active</span>
              </div>
              <label htmlFor='edit-photo' className={`h-10 z-10 ${buttonVariants({ variant: 'tertiary' })}`}>
                  <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <mask id="mask0_3756_50402" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_3756_50402)">
                    <path d="M4.5 15.5H5.5625L13.375 7.6875L12.3125 6.625L4.5 14.4375V15.5ZM3 17V13.8125L13.375 3.4375C13.5278 3.28472 13.6933 3.17361 13.8716 3.10417C14.0499 3.03472 14.2374 3 14.4341 3C14.6308 3 14.8194 3.03472 15 3.10417C15.1806 3.17361 15.3472 3.28472 15.5 3.4375L16.5625 4.5C16.7153 4.65278 16.8264 4.81944 16.8958 5C16.9653 5.18056 17 5.36487 17 5.55296C17 5.75357 16.9651 5.94478 16.8954 6.12658C16.8256 6.3084 16.7147 6.47454 16.5625 6.625L6.1875 17H3ZM12.8344 7.16556L12.3125 6.625L13.375 7.6875L12.8344 7.16556Z" fill="#121212" />
                  </g>
                  </svg>
                  <span>Edit cover photo</span>
                <input type="file" id='edit-photo' className='hidden' accept="image/*" onChange={this.handleFileChange}  />
              </label>
            </div>
          </div>

          <div className='gap-5 pl-5 mb-4 -mt-8 md:-mt-12 xl:mb-8 xl:-mt-16'>
            <div className='flex flex-col gap-4 md:flex-row'>
              <div className='relative'>
              <div className='w-16 h-16  overflow-hidden border-4 border-white rounded-full md:w-32 md:h-32 xl:flex-shrink-0 xl:w-44 xl:h-44'>
                <img className='object-cover w-full h-full' src={this.state.selectedFile ? URL.createObjectURL(this.state.selectedFile) : currentPerformer.avatar || '/static/no-avatar.png'} alt="User avatar photo" />
              </div>
              <label htmlFor='upload_avatar' className='w-10 h-10 rounded-full bg-base-400 flex z-8 items-center justify-center absolute bottom-4 right-2'>
                <input id='upload_avatar' type='file' className='hidden' onChange={this.handleFileChange} />
                    <CameraSvg color='#525252'  />
                </label>
              </div>

              <div className='md:pt-16 xl:pt-20 flex  justify-between flex-1 flex-wrap'>
                <div>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl text-gray-900 xl:text-3xl'>
                    {currentPerformer.firstName} {currentPerformer.lastName}
                  </h2>

                  <svg className='block w-8 h-8' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clipPath="url(#clip0_2241_45931)">
                      <mask id="mask0_2241_45931" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                        <rect width="30" height="30" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2241_45931)">
                        <path d="M10.8438 27.75L8.5 23.875L4.09375 22.875L4.5 18.375L1.5 15L4.5 11.625L4.09375 7.125L8.5 6.125L10.8438 2.25L15 4.03125L19.1562 2.25L21.5 6.125L25.9062 7.125L25.5 11.625L28.5 15L25.5 18.375L25.9062 22.875L21.5 23.875L19.1562 27.75L15 25.9688L10.8438 27.75ZM13.4062 19.5L20.8438 12.0938L19.25 10.5L13.4062 16.3125L10.75 13.6875L9.15625 15.2812L13.4062 19.5Z" fill="#2CB1EC" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_2241_45931">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className='flex items-end gap-2 mb-4 md:mb-7'>
                  <span className='text-base text-black '>@{currentPerformer.username} </span>

                  <CopyToClipboard onCopy={() => this.onCopy()} text={`@${currentPerformer.username}`}>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clipPath="url(#clip0_3328_61555)">
                          <mask id="mask0_3328_61555" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                            <rect width="20" height="20" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_3328_61555)">
                            <path d="M7.5 15C7.0875 15 6.73438 14.8531 6.44062 14.5594C6.14687 14.2656 6 13.9125 6 13.5V3.5C6 3.0875 6.14687 2.73438 6.44062 2.44063C6.73438 2.14688 7.0875 2 7.5 2H15.5C15.9125 2 16.2656 2.14688 16.5594 2.44063C16.8531 2.73438 17 3.0875 17 3.5V13.5C17 13.9125 16.8531 14.2656 16.5594 14.5594C16.2656 14.8531 15.9125 15 15.5 15H7.5ZM7.5 13.5H15.5V3.5H7.5V13.5ZM4.5 18C4.0875 18 3.73437 17.8531 3.44062 17.5594C3.14687 17.2656 3 16.9125 3 16.5V5H4.5V16.5H14V18H4.5Z" fill="#D9D9D9" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_3328_61555">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </CopyToClipboard>

                  {this.state.copied ? <span className='text-xs text-gray-500'>Copied.</span> : null}
                </div>
                </div>
                <div className='flex items-center gap-4'>
              <AppButton onClick={() => updateModals({ isGoLiveModalOpen: true })} className='px-6' variant='error'>
                      Go Live
                    </AppButton>

                    <AppButton onClick={() => updateModals({ isGoLiveModalOpen: true })} className='px-6' variant='error'>
                      Go Private
                    </AppButton>
              </div>
              </div>
              
            </div>
          </div>

          <div className='pb-8'>
            <Tabs id='edit-profile-tabs'>
              <div className='flex flex-wrap items-center justify-between gap-6 mb-6'>
                <h3 className='font-semibold text-black'>
                  Personal details
                </h3>

                <TabList className='flex h-10 gap-1 px-[6px] py-1 bg-base-400 rounded-[20px] w-full sm:flex-auto sm:max-w-md'>
                  <Tab className='inline-flex items-center justify-center flex-grow gap-2 px-6 text-sm font-medium cursor-pointer rounded-3xl' selectedClassName='bg-white text-black'>Personal Details</Tab>
                  <Tab className='inline-flex items-center justify-center flex-grow gap-2 px-6 text-sm font-medium cursor-pointer rounded-3xl' selectedClassName='bg-white text-black'>Change Password</Tab>
                </TabList>
              </div>


              <TabPanel>
                <form onSubmit={this.submit.bind(this)} className='pb-8 mb-8  border-base-400' noValidate>
                  <div className='grid grid-cols-2 mb-6 gap-x-6 gap-y-4'>

                    <div>
                      <AppInput
                        label="First Name"
                        type="text"
                        id="edit-profile-first-name"
                        placeholder="First name"
                        required
                        name='firstName'
                        defaultValue={currentPerformer.firstName}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div>
                      <AppInput
                        label="Last Name"
                        type="text"
                        id="edit-profile-last-name"
                        placeholder="Last name"
                        required
                        name='lastName'
                        defaultValue={currentPerformer.lastName}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <AppInput
                      type="email"
                      id="edit-profile-email"
                      autoComplete="username"
                      label="Email Address"
                      required
                      name='email'
                      defaultValue={currentPerformer.email}
                      onChange={this.handleInputChange}
                    />

                    <AppInput
                      label="Date of Birth"
                      type="date"
                      id="edit-profile-date-of-birth"
                      placeholder="MMM/DD/YYYY"
                      name='dateOfBirth'
                      value={
                        this.isValidDate(currentPerformer.dateOfBirth)
                          ? new Date(currentPerformer.dateOfBirth).toISOString().substring(0, 10)
                          : ''
                      }
                      onChange={this.handleInputChange}
                    />

                    <div>
                      <AppInput
                        label="Display Name"
                        type="text"
                        id="edit-profile-display-name"
                        placeholder="Choose a unique name"
                        required
                        name='name'
                        defaultValue={currentPerformer.name}
                        onChange={this.handleInputChange}
                      />
                      <span className='flex mt-2 text-xs text-black'>Caster.com/{currentPerformer.username}</span>
                    </div>

                    <div>
                      <AppInput
                        label="Username"
                        type="text"
                        id="edit-profile-username"
                        placeholder="Change how your name appears"
                        required
                        name='username'
                        defaultValue={currentPerformer.username}
                        onChange={this.handleInputChange}
                      />
                      <span className='flex mt-2 text-xs text-black'>
                        Your current Caster username is {currentPerformer.username}.
                      </span>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Bio</label>
                      <textarea
                        id="edit-profile-biography"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white min-h-[3rem] rounded-lg border border-gray-300 focus:outline-none"
                        placeholder="Tell us a little about yourself"
                        name='bio'
                        defaultValue={currentPerformer.bio}
                        onChange={this.handleInputChange}
                      ></textarea>
                      <span className='flex justify-end mt-1 text-xs text-base-500'>0/400</span>
                    </div>

                    <div className='space-y-6 col-span-full'>
                      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        <div>
                          <label htmlFor="countries" className="block mb-2 text-xs text-base-700">Select country</label>
                          <Select
                            id="countries"
                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                            value={currentPerformer.country}
                            onChange={(value) => this.handleSelect('country', value)}
                            bordered={false}
                          >
                            <Select.Option value="" disabled>Choose a country</Select.Option>
                            {this.state.countries?.map((country) =>(
                            <Select.Option value={country?.code}>{country?.name}</Select.Option>
                            ))}
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="edit-profile-state" className="block mb-2 text-xs text-base-700">State</label>
                          <Select
                            id="edit-profile-state"
                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                            value={currentPerformer.state}
                            onChange={(value) => this.handleSelect('state',value)}
                            bordered={false}
                          >
                            <Select.Option value="" disabled>Select</Select.Option>
                            {this.state.states?.map((state) =>(
                            <Select.Option value={state}>{state}</Select.Option>
                            ))}
                          </Select>
                        </div>

                        <AppInput
                          label="City"
                          type="text"
                          id="edit-profile-city"
                          placeholder="What city are you residing in"
                          name='city'
                          defaultValue={currentPerformer.city}
                          onChange={this.handleInputChange}
                        />

                        <div>
                          <label htmlFor="edit-profile-gender" className="block mb-2 text-xs text-base-700">Gender</label>
                          <Select
                            id="edit-profile-gender"
                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                            value={currentPerformer.gender}
                            onChange={(value) => this.handleSelect('gender',value)}
                            bordered={false}
                          >
                            <Select.Option value="" disabled>Select</Select.Option>
                            {this.state.bodyInfo?.genders?.map((gender) =>(
                            <Select.Option value={gender?.value}>{gender?.text}</Select.Option>
                            ))}
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="edit-profile-ethnicity" className="block mb-2 text-xs text-base-700">Ethnicity</label>
                          <Select
                            id="edit-profile-ethnicity"
                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                            value={currentPerformer.ethnicity}
                            onChange={(value) => this.handleSelect('ethnicity',value)}
                            bordered={false}
                          >
                            <Select.Option value="" disabled>Select</Select.Option>
                            {this.state.bodyInfo?.ethnicities?.map((ethnicitie) =>(
                            <Select.Option value={ethnicitie?.value}>{ethnicitie?.text}</Select.Option>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="edit-profile-languages" className="block mb-2 text-xs text-base-700">Languages</label>
                          <Select
                            id="edit-profile-languages"
                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                            value={currentPerformer.languages}
                            onChange={(value) => this.handleSelect('languages',value)}
                            bordered={false}
                            mode='multiple'
                          >
                            <Select.Option value="" disabled>Select</Select.Option>
                            {this.state.languages?.map((language) =>(
                            <Select.Option value={language?.code}>{language?.name}</Select.Option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div className='grid gap-6 sm:grid-cols-2'>
                        <div>
                          <label htmlFor="edit-profile-relationship-status" className="block mb-2 text-xs text-base-700">Relationship status</label>
                          <Select
                            id="edit-profile-relationship-status"
                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                            value={currentPerformer.relationship}
                            onChange={(value) => this.handleSelect('relationship',value)}
                            bordered={false}
                          >
                            <Select.Option value="" disabled>Select</Select.Option>
                            <Select.Option value="active">Available</Select.Option>
                            <Select.Option value="inactive">Taken</Select.Option>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="edit-profile-height" className="block mb-2 text-xs text-base-700">Height</label>
                          <Select
                            id="edit-profile-height"
                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                            value={currentPerformer.height}
                            onChange={(value) => this.handleSelect('height',value)}
                            bordered={false}
                          >
                            <Select.Option value="" disabled>Select</Select.Option>
                            {this.state.bodyInfo?.heights?.map((height) =>(
                            <Select.Option value={height?.value}>{height?.text}</Select.Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-4'>
                    <button onClick={() => Router.push(`/model/profile?username=${currentPerformer.username}`)} type='button' className='font-semibold text-black hover:underline'>Cancel</button>
                    <button className={buttonVariants()}>Save</button>
                  </div>
                </form>
              </TabPanel>


              <TabPanel>
                <div className='pb-8 mb-8 border-b border-base-400'>
                  <h3 className='mb-6 font-semibold text-black'>
                    Change password
                  </h3>

                  <form onSubmit={this.updatePassword}>
                    <div className='grid mb-6 sm:grid-cols-2 gap-x-6 gap-y-4' >
                      <AppInput 
                        type="password" 
                        id="edit-profile-change-password" 
                        autoComplete='current-password' 
                        label="Current password" 
                        placeholder='Enter your current password' 
                        name='changePassword'
                        required 
                      />
                      <AppInput 
                        type="password" 
                        id="edit-profile-change-password-new" 
                        label="New password" 
                        placeholder='Enter your new password' 
                        name='newPassword'
                        required 
                      />

                      <div className="sm:col-span-1 sm:col-start-2">
                        <AppInput 
                          type="password" 
                          id="edit-profile-change-password-confirm-new" 
                          label="Confirm password" 
                          placeholder='Confirm your new password' 
                          name='confirmPassword'
                          required 
                        />
                      </div>
                    </div>

                    <div className='flex justify-end gap-4'>
                      <button type='button' className='font-semibold text-black hover:underline'>Cancel</button>

                      <button type='submit' className={buttonVariants()}>Save</button>
                    </div>
                  </form>
                </div>

                <button type='button' onClick={() => this.props.onDeleteAccount()} className="p-1 font-semibold text-purple-900 rounded-full focus:outline-none focus:ring-purple-800 focus:ring-1 focus:ring-inset hover:underline">
                  Delete account
                </button>
              </TabPanel>
            </Tabs>
          </div>


        </div>

        {/* <Layout>
          <div className="main-container user-account">
            <Tabs defaultActiveKey="basic" tabPosition="top" className="nav-tabs custom">
              <Tabs.TabPane tab={<span>Profile Settings</span>} key="basic">
                <PerformerAccountForm
                  onFinish={this.submit.bind(this)}
                  onUpdatePassword={this.updatePassword.bind(this)}
                  updating={updating || emailSending || pwUpdating}
                  countTime={countTime}
                  onVerifyEmail={this.verifyEmail.bind(this)}
                  user={currentUser}
                  options={{
                    uploadHeaders,
                    avatarUploadUrl: performerService.getAvatarUploadUrl(),
                    onAvatarUploaded: this.onAvatarUploaded.bind(this),
                    coverUploadUrl: performerService.getCoverUploadUrl(),
                    onCoverUploaded: this.onCoverUploaded.bind(this),
                    videoUploadUrl: performerService.getVideoUploadUrl()
                  }}
                  languages={languages}
                  countries={countries}
                  bodyInfo={bodyInfo}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Change Password</span>} key="password">
                <UpdatePaswordForm
                  onFinish={this.updatePassword.bind(this)}
                  updating={pwUpdating}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Layout> */}
          <GoLiveModal isOpen={modals.isGoLiveModalOpen} onClose={() => updateModals({ isGoLiveModalOpen: false })} />
          <StreamMutedListModal modalMutedList={[]} isOpen={modals.isStreamMutedListModalOpen} onClose={() => updateModals({ isStreamMutedListModalOpen: false })} />

      </>
    );
  }
}

const mapStates = (state: any) => ({
  currentUser: state.user.current,
  updating: state.user.updating,
  ui: { ...state.ui },
  modals: { ...state.modals },
});

const mapDispatch = (dispatch) => {
  return {
    updatePerformer: (data) => dispatch(updatePerformer(data)),
    updateCurrentUserAvatar: (data) => dispatch(updateCurrentUserAvatar(data)),
    updateBanking,
    updateCurrentUserCover: (data) => dispatch(updateCurrentUserCover(data)),
    updateModals: () => dispatch(updateModals({ isGoLiveModalOpen: true})),
    onDeleteAccount: () => dispatch(updateModals({ isDeleteAccountModalOpen: true }))
  }
};

export default connect(mapStates, mapDispatch)(AccountSettings);
