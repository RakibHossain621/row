/* eslint-disable react/require-default-props */
import React, { ChangeEvent, useState } from 'react';
import { SearchFilterIcon, SearchInputIcon } from 'src/icons';
import { AppButton } from '@components/ui/shared/AppButton';

interface IProps {
  activeTab: string,
  handleChangeType: (e: string) => void,
  typeForHashtag: string
}

export const DiscoverHashtagFilter = ({
  activeTab,
  handleChangeType,
  typeForHashtag
}: IProps) => {
  const [showMore, setShowMore] = useState(false);
  const [advancedFilterDropdown, setAdvancedFilterDropdown] = useState(false);

  return (
    <div className='relative md:ml-auto w-full md:w-auto py-4 md:pt-0 flex-1 flex flex-col justify-end items-center md:items-end gap-5'>
      <div className="relative w-full">
        <SearchInputIcon className='absolute top-0 bottom-0 left-3 m-auto flex items-center justify-center' />
        <input
          placeholder="Search video"
          className='border border-gray-200 text-gray-400 rounded-full w-full pl-10'
        />
        <button
          className='absolute right-2 top-0 bottom-0 bg-transparent px-3
          m-1 hover:bg-gray-200 rounded-full'
          onClick={() => setAdvancedFilterDropdown(!advancedFilterDropdown)}
        >
          <SearchFilterIcon />
        </button>
      </div>

      {advancedFilterDropdown ? 
        <div className='w-[98%] md:w-[500px] absolute top-[100%] right-0 left-0 m-auto md:left-auto shadow-md rounded-lg p-5  bg-white flex flex-wrap items-center justify-between z-50'>
          <header className='w-full pb-6'>
            <h3 className='text-xl font-normal text-gray-900 text-left'>Search filter</h3>
          </header>
          <div className='flex items-start justify-between gap-5'>
            <fieldset className='flex flex-col items-start'>
              <label htmlFor="mediatype">Media</label>
              <select 
                name='mediatype'
                className='w-full md:w-56 max-w-full rounded-xl text-gray-500 border-gray-200' 
              >
                <option value="">Select</option>
              </select>
            </fieldset>
            <fieldset className='flex flex-col items-start'>
              <label htmlFor="mediatype">Date Posted</label>
              <select 
                name='mediatype'
                className='w-full md:w-56 max-w-full rounded-xl text-gray-500 border-gray-200' 
              >
                <option value="">Select</option>
              </select>
            </fieldset>
          </div>
          <footer className='w-full py-4 mt-4 border-t flex items-center justify-end gap-2'>
            <AppButton className='border-0' variant='tertiary'>
              Clear All
            </AppButton>
            <AppButton onClick={() => null}>
              Apply
            </AppButton>
          </footer>
        </div>
      : null}

        <select 
          className='w-full md:w-56 max-w-full rounded-xl text-gray-500 border-gray-200' 
          onChange={(e) => handleChangeType(e.target.value)} 
          value={typeForHashtag}
        >
          <option value="video">Videos</option>
          <option value="photo">Photos</option>
        </select>
    </div>
  );
};