/* eslint-disable react/no-danger */
import { PureComponent } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { IUIConfig, IUser } from 'src/interfaces';
import { QuestionOutlined } from '@ant-design/icons';
import './footer.less';

interface IProps {
  currentUser: IUser;
  ui:IUIConfig
}
class Footer extends PureComponent<IProps> {
  render() {
    const { currentUser, ui } = this.props;
    return (
      <div className="main-footer">
        <ul className="footer-ul">
          {!currentUser._id ? (
            <>
              <div className="help-user">
                <Link href="/help">
                  <div className="ant-btn">
                    <QuestionOutlined />
                    {' '}
                    Help & Support
                  </div>

                </Link>
              </div>
              {/* eslint-disable-next-line react/no-danger  */}
              {ui.footerContent ? (
                <div
                  className="help-media-c sun-editor-editable"
                  style={{ display: 'contents' }}
                  dangerouslySetInnerHTML={{ __html: ui.footerContent }}
                />
              ) : (
                <div className="help-media-c">© 2023 Caster Media LLC</div>
              )}
              {/* <div className="mobile_button_row">
                <a className="img_link" href="#" target="_blank" rel="noreferrer">
                  <img
                    className="iOS_app_button"
                    src="https://store.cloudflare.steamstatic.com/public/images/mobile/download_apple_button.png"
                    alt=""
                  />

                </a>
                <a className="img_link" href="#" target="_blank" rel="noopener">
                  <img
                    className="android_app_button"
                    src="https://store.cloudflare.steamstatic.com/public/images/mobile/download_google_button.png"
                    alt=""
                  />
                </a>
              </div> */}
            </>
          ) : (
            <>
              <div className="help-user">
                <Link href="/help">
                  <div className="ant-btn">
                    <QuestionOutlined />
                    {' '}
                    Help & Support
                  </div>
                </Link>
              </div>
            </>
          )}
        </ul>
      </div>
    );
  }
}
const mapState = (state: any) => ({
  currentUser: state.user.current,
  ui: { ...state.ui }
});
const mapDispatch = {

};
export default connect(mapState, mapDispatch)(Footer);
