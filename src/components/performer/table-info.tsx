/* eslint-disable react/require-default-props */
import {
  Descriptions, Collapse, Button, Tooltip, Image
} from 'antd';
import { PureComponent } from 'react';
import { ICountry, IPerformer } from 'src/interfaces';
import { shortenLargeNumber } from '@lib/index';
import Link from 'next/link';
import moment from 'moment';
import { ROLE_PERMISSIONS } from 'src/constants';

interface IProps {
  performer: IPerformer;
  countries: ICountry[];
  ranking? : any;

}

export class PerformerInfo extends PureComponent<IProps> {
  detectURLs(str: string) {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return str.match(urlRegex);
  }

  replaceURLs(str: string) {
    if (!str) return 'No bio yet';

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    const result = str.replace(urlRegex, (url: string) => {
      let hyperlink = url;
      if (!hyperlink.match('^https?:\\/\\/')) {
        hyperlink = `http://${hyperlink}`;
      }
      return `<a href="${hyperlink}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    // eslint-disable-next-line consistent-return
    return result;
  }

  render() {
    const { performer, countries = [], ranking } = this.props;
    const country = countries.length && countries.find((c) => c.code === performer?.country);
    const dateOfBirth = (performer.dateOfBirth && moment(performer.dateOfBirth)) || '';
    return (
      <div className="per-infor">
        <Collapse defaultActiveKey={['1']} bordered={false} accordion>
          <div className="ranking-follower">
            <Link
              href={{
                pathname: '/model/list-follow',
                query: {
                  // tab: 'follower',
                  id: performer?._id
                }
              }}
              as={`/model/list-follow/${performer?._id}`}
            >
              <h3 style={{ color: 'blue', marginLeft: '15px', cursor: 'pointer' }}>

                {shortenLargeNumber(performer?.stats?.totalFollower || 0)}
                {' '}
                Fans
              </h3>

            </Link>
            {ranking && ranking?.mostFansPosition && ranking?.mostFansPosition < 101 && !performer?.roles.includes(ROLE_PERMISSIONS.ROLE_ADMIN) ? (
              <Tooltip title="Most Fans">
                <Link href={{
                  pathname: '/model',
                  query: {
                    tab: 'model',
                    filter: 'mostFollowed'
                  }
                }}
                >
                  <Button className="normal">
                    <Image
                      className="avatar"
                      src="/static/mostFollower.png"
                      alt="mostFollower"
                      preview={false}
                    />
                    <div>{ranking?.mostFansPosition}</div>
                  </Button>
                </Link>
              </Tooltip>
            ) : <></> }
          </div>
          <Collapse.Panel
            header={(
              <>
                {performer?.country
                  && (<img alt="flag" src={country?.flag} width="25px" />)}
                &nbsp;
                {country?.name}

              </>
            )}
            key="1"
          >

            <p
              className="bio"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: this.replaceURLs(performer?.bio) }}
            />

            <Descriptions className="performer-info">
              {performer?.gender && (
                <Descriptions.Item label="Gender">
                  {performer?.gender}
                </Descriptions.Item>
              )}
              {/* {performer?.sexualOrientation && <Descriptions.Item label="Sexual orientation">{performer?.sexualOrientation}</Descriptions.Item>}
              {performer?.bodyType && <Descriptions.Item label="Body Type">{performer?.bodyType}</Descriptions.Item>} */}
              {performer?.state && <Descriptions.Item label="State">{performer?.state}</Descriptions.Item>}
              {/* {performer?.city && <Descriptions.Item label="City">{performer?.city}</Descriptions.Item>} */}
              {performer?.country && <Descriptions.Item label="Country">{performer?.country}</Descriptions.Item>}
              {performer?.country && <Descriptions.Item label="Relationship Status">{performer?.relationship === 'active' ? 'Available' : 'Taken'}</Descriptions.Item>}

              {performer?.height && (
              <Descriptions.Item label="Height">
                {performer?.height}
                {' '}
                feet
              </Descriptions.Item>
              )}
              <Descriptions.Item label="DOB">{(dateOfBirth && moment(dateOfBirth).format('MMM/DD/YYYY')) || ''}</Descriptions.Item>

              {/* {performer?.weight && <Descriptions.Item label="Weight">{performer?.weight}</Descriptions.Item>}
              {performer?.eyes && <Descriptions.Item label="Eye color">{performer?.eyes}</Descriptions.Item>}
              {performer?.ethnicity && <Descriptions.Item label="Ethnicity">{performer?.ethnicity}</Descriptions.Item>}
              {performer?.hair && <Descriptions.Item label="Hair color">{performer?.hair}</Descriptions.Item>}
              {performer?.butt && <Descriptions.Item label="Butt size">{performer?.butt}</Descriptions.Item>} */}
            </Descriptions>
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }
}
