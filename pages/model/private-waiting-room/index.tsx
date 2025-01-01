/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import {
  Layout, Button, Switch, message, InputNumber, Checkbox
} from 'antd';
import { connect } from 'react-redux';
import Head from 'next/head';
import { EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ISettings, IUIConfig } from 'src/interfaces';
import Error from 'next/error';
import Router from 'next/router';
import './index.less';
import { streamService } from '@services/stream.service';
import { PrivateRequest } from '@components/streaming/private-request';
import { updateCurrentUser, updatePerformer } from '@redux/user/actions';
import { performerService } from '@services/performer.service';
import { ROLE_PERMISSIONS } from 'src/constants';
import { getResponseError } from '@lib/utils';

interface IProps {
  currentUser: any;
  ui: IUIConfig;
  error: any;
  privateRequests: any;
  updateCurrentUser: Function;
  updatePerformer: Function;
  settings:ISettings
}
interface IState {
  isAvailable: number;
  privateChatPrice: number;
  openInput: boolean;
  isAccept: boolean;
  isReset: boolean;
  selectedRequest: any;
  hasRole:boolean;
  loading:boolean;
  countTime:number;
}

class ModelPrivateChatWaitingRoom extends PureComponent<IProps, IState> {
  static authenticate = true;

  static noredirect = true;

  textInput: any;

  _intervalCountdown: any;

  setTextInputRef: (element: any) => void;

  focusTextInput: () => void;

  constructor(props) {
    super(props);
    this.textInput = null;
    this.setTextInputRef = (element) => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      this.textInput.focus();
    };

    this.state = {
      isAvailable: 0,
      privateChatPrice: 0,
      countTime: 60,
      openInput: false,
      isAccept: false,
      isReset: false,
      selectedRequest: null,
      hasRole: false,
      loading: false
    };
  }

  async componentDidMount() {
    const { currentUser } = this.props;
    try {
      this.setState({ loading: true });
      const resp = await performerService.checkRole({ roles: [ROLE_PERMISSIONS.ROLE_HOST_PRIVATE] });
      await this.setState({ hasRole: resp?.data, loading: false });
      if (currentUser) {
        this.setState({ privateChatPrice: currentUser.privateChatPrice, isAvailable: currentUser.privateChat });
      }
    } catch (error) {
      this.setState({ loading: false });
      const e = Promise.resolve(error);
      message.error(getResponseError(e));
    }
  }

  componentDidUpdate(prevProps) {
    const { privateRequests } = this.props;
    if (prevProps.privateRequests.length !== privateRequests.length && privateRequests.length === 1) {
      this.setState({ selectedRequest: privateRequests[0], isReset: true });
    }
  }

  handleRedirect() {
    const { isAvailable, selectedRequest } = this.state;
    if (!selectedRequest) {
      return message.error('Please select a user to join private chat');
    }
    if (isAvailable) {
      streamService.togglePrivateChatStatus();
      return Router.push(
        {
          pathname: '/model/live/privatechat',
          query: {
            id: selectedRequest.conversationId,
            userId: selectedRequest?.user._id
          }
        },
        '/model/privatechat'
      );
    }
    return message.error('Please accept all terms & conditions before go live');
  }

  async handleDeline() {
    this.setState({ isReset: true });
  }

  setPrice() {
    const { privateChatPrice } = this.state;
    if (privateChatPrice <= 0) {
      return message.error('The price cannot be set lower than 0');
    }
    const { currentUser, updatePerformer: handleUpdatePerformer } = this.props;
    handleUpdatePerformer({
      ...currentUser,
      ...{ privateChatPrice }
    });
    // Call the API to set the price
    message.success('Set the price successfully');
    this.setState({ openInput: false });
    return null;
  }

  handleCountdown = async () => {
    const { countTime } = this.state;
    this.setState({ countTime: countTime - 1 });
    this._intervalCountdown = setInterval(this.coundown.bind(this), 1000);
  };

  coundown() {
    const { countTime } = this.state;
    if (countTime === 0) {
      this.setState({ countTime: 60 });
      clearInterval(this._intervalCountdown);
      return null;
    }
    return this.setState({ countTime: countTime - 1 });
  }

  async togglePrivateChatStatus() {
    const { currentUser, updateCurrentUser: handleUpdateUser } = this.props;
    const { countTime, isAvailable } = this.state;
    if (countTime < 60) {
      return message.error(`You can rechange status after ${countTime} seconds`);
    }
    const data = await streamService.togglePrivateChatStatus();
    if (data) {
      // only countDown when turn off and turn on back
      isAvailable && this.handleCountdown();
      this.setState({ isAvailable: data.privateChat });
      return handleUpdateUser({ ...currentUser, privateChat: data.privateChat });
    }
    return true;
  }

  render() {
    const {
      error, ui, privateRequests, settings
    } = this.props;
    const {
      isAvailable, privateChatPrice, openInput, isAccept, selectedRequest, isReset, hasRole, loading
    } = this.state;

    if (error) {
      return <Error statusCode={error?.statusCode || 404} title={error?.message || "Sorry, we can't find this page"} />;
    }

    return (
      <Layout className="model-private-waiting-room">
        <Head>
          <title>{`${ui?.siteName} | Private Chat Waiting Room`}</title>
        </Head>
        <div className="main-container">
          <div className="page-heading header-title">
            <span>
              Create
              {' '}
              <br />
              {' '}
              Private Room
            </span>
          </div>
          <a href="/help/model-links/mo-go-private">
            <QuestionCircleOutlined />
          </a>
          {!loading && (
          <>
            {hasRole ? (
              <p className="notice">
                Come back to this page when you have over
                {' '}
                {settings.totalFollowerForPrivateChat}
                {' '}
                followers
              </p>
            ) : (
              <>
                <div className="chat-status-section">
                  <div className="text-center">
                    {openInput && openInput ? (
                      <>
                        <InputNumber
                          defaultValue={privateChatPrice}
                          style={{ width: '200px ' }}
                          placeholder="Please enter the price"
                          onChange={(val) => this.setState({ privateChatPrice: val })}
                          onPressEnter={() => this.setPrice()}
                        />
                        {' '}
                        <Button type="primary" onClick={() => this.setPrice()}>
                          Set Price
                        </Button>
                      </>
                    ) : (
                      <>
                        (
                        <span className="price">{privateChatPrice}</span>
                        )
                        {' '}
                        <img alt="" width={30} height={30} className="privateImg" src="/static/gem.png" />
                        /minute
                        {' '}
                        <EditOutlined onClick={() => this.setState({ openInput: true })} />
                      </>
                    )}
                  </div>
                  <div className="private-chat-status-section">
                    <Button className={isAvailable ? 'btn-notify active' : 'btn-notify'}>
                      {isAvailable ? 'Available for Private Chat' : 'Not Available for Private Chat'}
                    </Button>
                    {' '}
                    <Switch
                      checked={!!isAvailable}
                      onChange={() => this.togglePrivateChatStatus()}
                      checkedChildren="On"
                      unCheckedChildren="Off"
                    />
                  </div>
                </div>
                {privateRequests && privateRequests.length > 0 && (
                <>
                  <div className="notify-section">
                    <p>
                      Waiting for you to join
                      {' '}
                      <br />
                    </p>
                    {privateRequests.map((privateRequest) => (
                      <PrivateRequest
                        privateRequest={privateRequest}
                        key={privateRequest.conversationId}
                        onSelectRequest={() => this.setState({ selectedRequest: privateRequest, isReset: true })}
                        selected={selectedRequest && privateRequest.conversationId === selectedRequest.conversationId}
                        istimeDeline={!isReset}
                        isChecked={selectedRequest && privateRequest.conversationId === selectedRequest.conversationId}
                      />
                    ))}
                    <div>
                      <Button disabled={!isReset} onClick={() => this.setState({ isReset: false })}>
                        On My Way
                      </Button>
                      <p className="text-center">Extend timer 2 minutes</p>
                    </div>
                  </div>
                  <Button onClick={() => this.handleRedirect()} className="btn-go-live" disabled={!isAvailable || !isAccept}>
                    Start Private Live Chat Now
                  </Button>
                  <div className="guidelines">
                    <a>Guidelines on Private Chat</a>
                    <span>
                      <Checkbox defaultChecked={isAccept} onChange={() => this.setState({ isAccept: !isAccept })}>
                        Accept
                      </Checkbox>
                    </span>
                  </div>
                  <div className="last-updated">
                    <p>
                      Last Update
                      {' '}
                      <br />
                      January 4th 2020
                    </p>
                  </div>
                </>
                )}
              </>
            )}
          </>
          )}
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current },
  ...state.streaming,
  settings: { ...state.settings }
});

const mapDispatch = { updateCurrentUser, updatePerformer };

export default connect(mapStates, mapDispatch)(ModelPrivateChatWaitingRoom);
