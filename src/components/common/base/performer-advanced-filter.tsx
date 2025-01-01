/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import {
  Input, Button, Select, Radio, Space
} from 'antd';
import { omit } from 'lodash';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ICountry, IBody, ILangguges } from '@interfaces/index';
import type { RadioChangeEvent } from 'antd';

interface IProps {
  onSubmit: Function;
  countries: ICountry[];
  languages:ILangguges[];
  bodyInfo: IBody;
  defaultFilterValue?: string;
}

export class PerformerAdvancedFilter extends PureComponent<IProps> {
  state = {
    showMore: false

  };

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(omit(this.state, ['showMore']));
  }

  handleSubmitRadio = async (e: RadioChangeEvent) => {
    const { onSubmit } = this.props;
    await this.setState({ sortBy: e.target.value });
    onSubmit(omit(this.state, ['showMore']));
  };

  render() {
    const {
      countries, bodyInfo, languages, defaultFilterValue
    } = this.props;
    const { showMore } = this.state;
    const {
      heights = [],
      genders = [],
      ethnicities = [],
      ages = []
    } = bodyInfo;

    return (
      <div style={{ width: '100%' }}>
        <div className="filter-block custom">
          <div className="filter-item">
            <span className="title"> MOST</span>
            <Radio.Group onChange={this.handleSubmitRadio} value={`${defaultFilterValue}`}>
              <Space direction="vertical">
                <Radio value="mostFollowed">Fans</Radio>
                <Radio value="earningCurrentMonth">Supported this month</Radio>
                <Radio value="mostView">Total Library views</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="filter-item" style={{ justifyContent: 'center' }}>
            <Button
              className="secondary"
              style={{ width: 'fit-content', height: 'fit-content', backgroundColor: '#c0349a' }}
              onClick={() => this.setState({ showMore: !showMore })}
            >
              Search
              {' '}
              {showMore ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </Button>
          </div>
        </div>
        <div className={!showMore ? 'filter-block hide' : 'filter-block custom'}>
          <div className="filter-item custom">
            <Input
              placeholder="Enter keyword"
              onChange={(evt) => this.setState({ q: evt.target.value })}
              onPressEnter={this.handleSubmit.bind(this)}
            />
          </div>
          <div className="filter-item">
            <Select
              // eslint-disable-next-line no-nested-ternary
              onChange={(val: any) => this.setState({ relationship: val }, () => this.handleSubmit())}
              style={{ width: '100%' }}
              defaultValue=""
            >
              <Select.Option key="all" value="">
                All Relationship Availability
              </Select.Option>
              <Select.Option key="active" value="active">
                Available
              </Select.Option>
              <Select.Option key="inactive" value="inactive">
                Taken
              </Select.Option>
            </Select>
          </div>
          {countries && countries.length > 0 && (
            <div className="filter-item">
              <Select
                onChange={(val) => this.setState({ country: val }, () => this.handleSubmit())}
                style={{ width: '100%' }}
                placeholder="Countries"
                defaultValue=""
                showSearch
                optionFilterProp="label"
              >
                <Select.Option key="All" label="" value="">
                  All countries
                </Select.Option>
                {countries.map((c) => (
                  <Select.Option key={c.code} label={c.name} value={c.code}>
                    <img alt="flag" src={c.flag} width="25px" />
                    &nbsp;
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
          {languages && languages.length > 0 && (
            <div className="filter-item">
              <Select
                onChange={(val) => this.setState({ languages: val }, () => this.handleSubmit())}
                style={{ width: '100%' }}
                placeholder="Languages"
                defaultValue=""
                showSearch
                optionFilterProp="label"
              >
                <Select.Option key="All" label="" value="">
                  All languages
                </Select.Option>
                {languages.map((language) => (
                  <Select.Option key={language.code} label={language.name} value={language.code}>
                    {language.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
          <div className="filter-item">
            <Select
              onChange={(val) => this.setState({ gender: val }, () => this.handleSubmit())}
              style={{ width: '100%' }}
              defaultValue=""
            >
              <Select.Option key="all" value="">
                All genders
              </Select.Option>
              {genders.map((s) => (
                <Select.Option key={s.value} value={s.value}>
                  {s.text}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <Select
              onChange={(val) => this.setState({ ethnicity: val }, () => this.handleSubmit())}
              style={{ width: '100%' }}
              placeholder="Ethnicity"
              defaultValue=""
            >
              <Select.Option key="all" value="">
                All ethnicities
              </Select.Option>
              {ethnicities.map((s) => (
                <Select.Option key={s.value} value={s.value}>
                  {s.text}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <Select
              onChange={(val) => this.setState({ age: val }, () => this.handleSubmit())}
              style={{ width: '100%' }}
              placeholder="Age"
              defaultValue=""
            >
              <Select.Option key="all" value="">
                All ages
              </Select.Option>
              {ages.map((s) => (
                <Select.Option key={s.value} value={s.value}>
                  {s.text}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <Select
              onChange={(val) => this.setState({ height: val }, () => this.handleSubmit())}
              style={{ width: '100%' }}
              placeholder="Height"
              defaultValue=""
            >
              <Select.Option key="all" value="">
                All heights
              </Select.Option>
              {heights.map((s) => (
                <Select.Option key={s.value} value={s.value}>
                  {s.text}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="filter-item" />
        </div>
      </div>
    );
  }
}
