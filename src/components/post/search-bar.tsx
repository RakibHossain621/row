/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { Input, DatePicker, Select } from 'antd';
import { debounce } from 'lodash';
import './index.less';
import { connect } from 'react-redux';

const { RangePicker } = DatePicker;

const { Search } = Input;
interface IProps {
  searching: boolean;
  handleSearch: Function;
  handleViewGrid?: Function;
  tab: string;
  dropdownValue?:string
  handleDropDown?:(value:string) => void
}

class SearchFeedBar extends PureComponent<IProps> {
  state = {
    q: '',
    isGrid: false,
    showSearch: false,
    showCalendar: false
  };

  componentDidUpdate(prevProps) {
    const { tab: prevTab } = prevProps;
    const { tab } = this.props;
    if (prevTab !== tab) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ q: '' });
    }
  }

  onSearch = debounce(async (val) => {
    const { handleSearch } = this.props;
    val === 'oldest'
      ? handleSearch({
        sortBy: 'createdAt',
        sort: 'asc'
      }) : handleSearch({
        sortBy: val,
        sort: 'desc'
      });
  }, 500);

  handleViewGrid(isGrid: boolean) {
    const { handleViewGrid: viewGrid } = this.props;
    this.setState({ isGrid });
    viewGrid(isGrid);
  }

  searchDateRange(dates: [any, any], dateStrings: [string, string]) {
    if (!dateStrings.length) return;
    const { handleSearch } = this.props;
    handleSearch({
      fromDate: dateStrings[0],
      toDate: dateStrings[1]
    });
  }

  render() {
    const {
      q, isGrid, showSearch, showCalendar
    } = this.state;
    const { searching , dropdownValue, handleDropDown} = this.props;
    return (
      <div className="search-post-bar">
        {showCalendar && (
          <RangePicker onChange={this.searchDateRange.bind(this)} />
        )}
        {showSearch && (
          <Search
            placeholder="Enter keyword here..."
            onChange={(e) => {
              e.persist();
              this.setState({ q: e?.target?.value || '' });
              this.onSearch(e);
            }}
            value={q}
            loading={searching}
            allowClear
            enterButton
          />
        )}
        <div className="grid-btns">
          {/* <a
            aria-hidden
            title="New Post"
            hidden={currentUser._id !== performer._id}
            href="/model/my-post/create"
          >
            <VideoCameraAddOutlined />
          </a> */}
          {/* <a aria-hidden className={showSearch ? 'active' : ''} onClick={() => this.setState({ showSearch: !showSearch, showCalendar: false })}><SearchOutlined /></a> */}
          {/* <a aria-hidden className={showCalendar ? 'active' : ''} onClick={() => this.setState({ showCalendar: !showCalendar, showSearch: false })}><CalendarOutlined /></a> */}
          <Select
            placeholder=""
            defaultValue="Newest"
            showSearch
            optionFilterProp="label"
            value={dropdownValue}
            onChange={(val) => {
              this.onSearch(val)
              handleDropDown(val)
            }}
          >
            <Select.Option key="newest" label="Newest" value="updatedAt">
              Newest
            </Select.Option>
            <Select.Option key="oldest" label="Oldest" value="oldest">
              Oldest
            </Select.Option>
            <Select.Option key="views" label="Most Viewed" value="views">
              Most Viewed
            </Select.Option>

          </Select>
          {/* <a
            aria-hidden
            className={isGrid ? 'active' : ''}
            onClick={this.handleViewGrid.bind(this, true)}
          >
            <AppstoreOutlined />
          </a>
          <a
            aria-hidden
            className={!isGrid ? 'active' : ''}
            onClick={this.handleViewGrid.bind(this, false)}
          >
            <MenuOutlined />
          </a> */}
        </div>
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  currentUser: { ...state.user.current }
});
export default connect(mapStates)(SearchFeedBar);
