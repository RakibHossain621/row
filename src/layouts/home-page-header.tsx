/* eslint-disable react/require-default-props */
import PageHeader from "src/layouts/page-header";
import "./home-page-header.less";
import clsx from "clsx";


interface ITabProps {
  key: string;
  label?: string;
  tab: any;
  disabled?: boolean;
  icon?: JSX.Element
}
interface IProps {
  handleTabChange: Function;
  tabs: Array<ITabProps>;
  defaultTab?: string;
  className?:string
  title?:string
}

function HomePageHeader({ handleTabChange, tabs, defaultTab, title='Recommended', className }: IProps) {
  return (
    <div className="home-page-header" id="tab-header">
      <h3 className="home_title mb-2 text-center text-black">{title}</h3>
      <PageHeader
        bordered={false}
        className={clsx('home_page_header rounded-full p-1', className)}
      >
        {tabs.map((tab) => (
          <div
            className={`rounded-full flex items-center cursor-pointer gap-2 justify-center px-6 py-3 ${tab.key === defaultTab ? 'active_width' : 'flex-1'}`}
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.icon} <p className="text-[#ADADAD]">{tab.label}</p>
          </div>
        ))}
      </PageHeader>
    </div>
  );
}

export default HomePageHeader;
