/* eslint-disable react/require-default-props */
import React, { ChangeEvent, useState } from 'react';
import { ICountry, IBody, ILangguges } from '@interfaces/index';
import type { RadioChangeEvent } from 'antd';
import { CheckedIcon, SearchFilterIcon, SearchInputIcon } from 'src/icons';
import { AppButton } from '@components/ui/shared/AppButton';

interface IProps {
  onSubmit: Function;
  countries: ICountry[];
  languages: ILangguges[];
  bodyInfo: IBody;
  defaultFilterValue?: string;
  activeTab: string
  handleSubmitOrdering: (ordering: string) => void
}

export const TopModelsSearchFilter = ({
  onSubmit, countries, languages, bodyInfo, defaultFilterValue, activeTab, handleSubmitOrdering 
}: IProps) => {
  const [showMore, setShowMore] = useState(false);
  const [advancedFilterDropdown, setAdvancedFilterDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [q, setQ] = useState<string | null>(null);
  const [relationship, setRelationship] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [ethnicity, setEthnicity] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);

  const handleAdvancedFilter = () => {
    setAdvancedFilterDropdown(prevState => !prevState);
  };

  const handleSubmit = () => {
    onSubmit({
      showMore,
      sortBy,
      q,
      relationship,
      country,
      language,
      gender,
      ethnicity,
      age,
      height
    });
  };

  const handleSubmitRadio = async (e: RadioChangeEvent) => {
    setSortBy(e.target.value);
    onSubmit({
      showMore,
      sortBy: e.target.value,
      q,
      relationship,
      country,
      language,
      gender,
      ethnicity,
      age,
      height
    });
  };

  const {
    heights = [],
    genders = [],
    ethnicities = [],
    ages = []
  } = bodyInfo;

  return (
    <div className='relative md:ml-auto w-full md:w-auto py-4 md:pt-0 flex-1 flex flex-col justify-end items-center md:items-end gap-4'>
      {activeTab === 'model' ? 
        <div className="relative w-full">
          <SearchInputIcon className='absolute top-0 bottom-0 left-3 m-auto flex items-center justify-center' />
          <input
            placeholder="Search video"
            onChange={(evt) => setQ(evt.target.value)}
            onSubmit={handleSubmit}
            className='border border-gray-200 text-gray-400 rounded-full w-full pl-10'
          />
          <button
            onClick={handleAdvancedFilter}
            className='absolute right-2 top-0 bottom-0 bg-transparent px-3
            m-1 hover:bg-gray-200 rounded-full'
          >
            <SearchFilterIcon />
          </button>
        </div>
      : null}
      {advancedFilterDropdown ? 
        <div className='w-[98%] md:w-[500px] absolute top-[100%] right-0 left-0 m-auto md:left-auto shadow-md rounded-lg p-5  bg-white flex flex-wrap items-center justify-between z-50'>
          <header className='w-full pb-6'>
            <h3 className='text-xl text-gray-900 font-normal text-left'>Search filter</h3>
          </header>
          <div className="filter-item w-full pb-2">
            <label className="block mb-1 text-xs text-gray-700">Most Viewed</label>
            <select
              id="mostViewed" 
              className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setHeight(e.target.value)}
            >
              <option key="all" value="" selected>
                Fans
              </option>
              {heights.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.text}
                </option>
              ))}
            </select>
          </div>
          {countries && countries.length > 0 && (
            <div className="filter-item w-[49%] md:w-[30%] pb-4">
              <label className="block mb-1 text-xs text-gray-700">Location</label>
              <select 
                id="Location" 
                className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option key="All" selected value="">
                  Select
                </option>
                {countries.map((c) => (
                  <option key={c.code} label={c.name} value={c.code}>
                    <img alt="flag" src={c.flag} width="25px" />
                    &nbsp;
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="filter-item w-[49%] md:w-[30%] pb-4">
            <label className="block mb-1 text-xs text-gray-700">Gender</label>
            <select
              id="gender" 
              className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setGender(e.target.value)}
            >
              <option key="all" value="">
                Select
              </option>
              {genders.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.text}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item w-[49%] md:w-[30%] pb-4">
            <label className="block mb-1 text-xs text-gray-700">Ethnicity</label>
            <select
              id="Ethnicity" 
              className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setEthnicity(e.target.value)}
            >
              <option key="all" value="" selected>
                Select
              </option>
              {ethnicities.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.text}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item w-[49%] md:w-[30%] pb-4">
            <label className="block mb-1 text-xs text-gray-700">Age</label>
            <select
              id="age" 
              className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setAge(e.target.value)}
            >
              <option key="all" value="" selected>
                Select
              </option>
              {ages.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.text}
                </option>
              ))}
            </select>
          </div>
          {languages && languages.length > 0 && (
            <div className="filter-item w-[49%] md:w-[30%] pb-4">
              <label className="block mb-1 text-xs text-gray-700">Language</label>
              <select 
                id="Language" 
                className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option key="All" selected value="">
                  Select
                </option>
                {languages.map((language) => (
                  <option key={language.code} label={language.name} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="filter-item w-[49%] md:w-[30%] pb-4">
            <label className="block mb-1 text-xs text-gray-700">Relationship Status</label>
            <select 
              id="mostViewed" 
              className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setRelationship(e.target.value)}
            >
              <option selected>Select</option>
              <option key="active" value="active">Available</option>
              <option key="inactive" value="inactive">Taken</option>
            </select>
          </div>
          <footer className='w-full py-4 mt-4 border-t flex items-center justify-end gap-2'>
            <AppButton className='border-0' variant='tertiary'>
              Clear All
            </AppButton>
            <AppButton onClick={handleSubmit}>
              Apply
            </AppButton>
          </footer>
        </div>
      : null}
    </div>
  );
};

//             <Radio value="currentMonthViews">This Month</Radio>
{/* <Radio value="lastMonthViews">Last Month</Radio> */}
{/* <Radio value="views">All Time</Radio> */}