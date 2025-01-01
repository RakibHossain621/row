import { Checkbox } from 'antd';
import './confirm-message.less';
import { useContext } from 'react';
import { ConfirmContext } from './confirm-message-context';
import { IPerformer } from '@interfaces/performer';
import Link from 'next/link';

interface IProps {
  performer: IPerformer;
  currentUser: IPerformer;
}

const ConfirmMessage = ({ performer, currentUser }: IProps) => {
  const { confirm, setConfirm } = useContext(ConfirmContext);

  return (
    <div className="confirm-message-container">
      <div className='confirm-content'>
        <div className="checkbox">
        <img src="./static/gem.png" width="20px" alt="ruby" />
          {performer?.costPerMessage}
          {' '}
          <Checkbox
            checked={confirm}
            onChange={(event) => setConfirm(event.target.checked)}
          >
            Accept
          </Checkbox>
        </div>
        <div>Fee per 50 characters</div>
        <div className="descriptions">
          This fee will be refunded if
          {' '}
            <span aria-hidden className='username'>
              {performer.name || performer.username}
            </span>
          {' '}
          doesn't reply within 24 hours</div>
      </div>
      <div className="rubys-availabel">
        Available
        {' '}
        <img src="./static/gem.png" width="20px" alt="ruby" />
        {' '}
        ({currentUser?.rubyBalance})
      </div>
    </div>
  );
};

export default ConfirmMessage;
