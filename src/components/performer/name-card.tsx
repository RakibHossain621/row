/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { IPerformer } from 'src/interfaces';
import Link from 'next/link';
import { TickIcon } from 'src/icons';
import './performer.less';

import { connect } from 'react-redux';
import { streamService } from 'src/services';

interface IProps {
  performer: IPerformer;
  pathname: string;
  modelNumber: number;
  as: string;
  filter?:any;
  hideFollower?: boolean;
}

class PerformerNameCard extends PureComponent<IProps> {
  state = {
    streamId: null,
    totalFollowers: 0,
    number: this?.props?.modelNumber || 0

  }

  componentDidMount() {
    const { performer, filter } = this.props;
    this.setState({ totalFollowers: performer?.stats?.totalFollower });
    if (filter && filter?.q) {
      switch (filter.sortBy) {
        case 'mostFollowed':
          return this.setState({ number: performer?.ranking?.mostFansPosition || 0 });
6        // case 'earningCurrentMonth':
        //   return this.setState({ number: performer?.ranking?.mostSupportedPosition || 0 });
        // case 'mostView':
        //   return this.setState({ number: performer?.ranking?.feedViewsPosition || 0 });
        default: return null;
      }
    }
  }

  onMouseEnter = async () => {
    const { performer } = this.props;
    try {
      const resp = await Promise.resolve(streamService.getLiveStreaming(performer._id));
      if (resp.data) this.setState({ streamId: resp.data });
    } catch (error) {
      this.setState({ streamId: '' });
    }
  };

  render() {
    const {
      performer, modelNumber, pathname, as, filter, hideFollower
    } = this.props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { streamId, totalFollowers, number } = this.state;
    return (
      <div 
        className={`rounded-lg p-2 cursor-pointer ${performer.gender === 'female' ? 'bg-purple-900' : 'bg-blue-900'}`} 
        onMouseLeave={() => this.setState({ streamId: null })} 
        onMouseEnter={this.onMouseEnter}
      >
        <Link
          href={{
            pathname,
            query: {
              performer: JSON.stringify(performer),
              username: performer?.username || performer?._id
            }
          }}
          as={
            as
          }
        >
          <div className="">
            {filter && filter?.q 
              ? <p className="text-white font-semibold">{number || 'N/A'}</p> 
              : <p className="text-white font-semibold">{modelNumber || 'N/A'}</p> 
            }
            <p className="text-white font-semibold text-md flex items-center">
              {performer?.name?.split(' ')[0].substring(0, 15) || performer?.username?.split(' ')[0].substring(0, 15) || ''}
              {performer?.verifiedAccount && <TickIcon />}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}
const mapStates = (state: any) => ({
  currentUser: { ...state.user.current }
});

export default connect(mapStates)(PerformerNameCard);
