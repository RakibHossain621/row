import {
  Children, useState, useEffect, useRef
} from 'react';
import { connect } from 'react-redux';
import PageVisibility from 'react-page-visibility';
import { performerService } from '@services/performer.service';

interface IProps {
  children: any;
  loggedIn: boolean;
}
// let interval: any;

const CollectData = ({ children, loggedIn }: IProps) => {
  const [rotate, setRotate] = useState(true) as any;
  const timeout = useRef(null) as any;

  const sendRequest = async () => {
    if (timeout.current) clearTimeout(timeout.current);
    if (!loggedIn || !rotate) return;
    await performerService.setInternalProfile();
    timeout.current = setTimeout(() => {
      sendRequest();
    }, 10 * 60 * 1000);
  };

  const cancelSendRequest = () => {
    timeout.current && clearTimeout(timeout.current);
  };

  const handleVisibilityChange = (isVisible) => {
    setRotate(isVisible);
  };

  useEffect(() => {
    if (!loggedIn || !rotate) return cancelSendRequest();
    sendRequest();
    return () => {
      cancelSendRequest();
    };
  }, [loggedIn, rotate]);

  return (
    <PageVisibility onChange={handleVisibilityChange}>
      {Children.only(children)}
    </PageVisibility>
  );
};

const mapStates = (state: any) => ({
  loggedIn: state.auth.loggedIn
});

export default connect(mapStates, null)(CollectData);
