import React, { Component } from 'react'
import PageHeader from "src/layouts/page-header";
import "../../src/layouts/home-page-header.less";
import clsx from "clsx";
interface ITabProps {
  key?: string;
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
const tabs =[
  {
    key: 'Fanses',
    label: 'Fans'
  },
  {
    key: 'Follwer',
    label: 'Following'
  },
]

class followingFans  extends Component<IProps> { 

  render() {
    const { title,  defaultTab, handleTabChange, className } = this.props;
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
                 <p className="text-[#ADADAD]">{tab.label}</p>
               </div>
             ))}
           </PageHeader>
         </div>
    )
  }
}

export default followingFans;

