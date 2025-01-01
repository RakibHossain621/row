import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppInput } from '@components/ui/shared/AppInput';
import { AppButton } from '@components/ui/shared/AppButton';

import { connect, useDispatch } from 'react-redux';
import { updateModals } from '@redux/modals/actions';

import useClickOutside from 'src/hooks/useClickOutside';
import useDisableScroll from 'src/hooks/useDisabledScroll';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object({
  comment: yup
    .string()
    .required()
})

const AddCommentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { isLoading, isValid, errors } } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = (data) => {
    try {

    } catch (error) {
      console.error(error)
    }
  }


  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div tabIndex={-1} aria-hidden="true" className={`overflow-y-auto px-5 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? 'block' : 'hidden'}`}>
        <div ref={ref} role='dialog' className="w-full m-auto max-w-3xl min-h-[420px] overflow-x-hidden bg-white rounded-lg shadow">
          <div className="flex justify-between px-5 py-5 border-b rounded-t border-base-400">
            <h2 className="inline-flex items-center gap-x-2">
              <span className='text-xl text-black'>
                Add a comment
              </span>
            </h2>

            <button onClick={onClose} type="button" className="inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className='px-6 py-6'>
            <div className='mb-6'>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className='flex items-baseline gap-3'>
                  <div className='flex-grow'>
                    <AppInput size='sm' {...register("comment")} type="text" id="add-comment-modal-comment" rounded='full' placeholder="Add a comment" errorMessage={errors?.comment?.message} />
                  </div>

                  <AppButton className='w-20' type='submit'>Post</AppButton>
                </div>
              </form>
            </div>

            <div className='py-4 border-t border-base-400'>
              <div className='flex items-center justify-between'>
                <span className='font-semibold text-black'>200 comments</span>

                <div>
                  <select
                    defaultValue={'top'}
                    className="inline-flex items-center w-full text-purple-800 border-gray-300 rounded-lg sm:text-sm focus:outline-purple">
                    <option value="top">Sort by: Top comments</option>
                    <option value="recents"> Sort by: Most Recent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <article className="flex text-base bg-white rounded-lg">
                <div className='flex flex-col items-center self-start justify-center gap-1 mr-2'>
                  <label className='cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />

                    <svg className='text-black pointer-events-none peer-checked:text-purple-800' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
                      <mask id="mask0_2916_43095" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                        <rect x="0.5" width="20" height="20" fill='#D9D9D9' />
                      </mask>
                      <g mask="url(#mask0_2916_43095)">
                        <path d="M7.5 17V11.2083H3.5L10.5 2L17.5 11.2083H13.5V17H7.5ZM9 15.5H12V9.70833H14.4375L10.5 4.4375L6.5625 9.70833H9V15.5Z" className="fill-current" />
                      </g>
                    </svg>
                  </label>

                  <span className='text-xs text-black peer-checked:text-xl'> 5 </span>

                  <label className='cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />
                    <svg className='text-black pointer-events-none peer-checked:text-purple-800' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <g clipPath="url(#clip0_2916_43097)">
                        <mask id="mask0_2916_43097" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                          <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_2916_43097)">
                          <path d="M13.5 3.16162L13.5 8.95329L17.5 8.95329L10.5 18.1616L3.5 8.95329L7.5 8.95329L7.5 3.16162L13.5 3.16162ZM12 4.66162L9 4.66162L9 10.4533L6.5625 10.4533L10.5 15.7241L14.4375 10.4533L12 10.4533L12 4.66162Z" className="fill-current" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_2916_43097">
                          <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </label>
                </div>

                <div>
                  <footer className="flex flex-wrap items-center justify-end mb-2 gap-x-2">
                    <div className="flex items-center mr-auto">
                      <p className="inline-flex items-center mr-1 text-sm text-gray-900">
                        <img
                          className="w-10 h-10 mr-2 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough" />Michael Gough</p>

                      <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <g clipPath="url(#clip0_2916_43107)">
                          <mask id="mask0_2916_43107" maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="14">
                            <rect x="0.5" width="14" height="14" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_2916_43107)">
                            <path d="M5.56061 12.9498L4.46686 11.1415L2.41061 10.6748L2.6002 8.5748L1.2002 6.9998L2.6002 5.4248L2.41061 3.3248L4.46686 2.85814L5.56061 1.0498L7.5002 1.88105L9.43978 1.0498L10.5335 2.85814L12.5898 3.3248L12.4002 5.4248L13.8002 6.9998L12.4002 8.5748L12.5898 10.6748L10.5335 11.1415L9.43978 12.9498L7.5002 12.1186L5.56061 12.9498ZM6.75645 9.0998L10.2273 5.64355L9.48353 4.8998L6.75645 7.6123L5.51686 6.3873L4.77311 7.13105L6.75645 9.0998Z" fill="#2CB1EC" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_2916_43107">
                            <rect width="14" height="14" fill="white" transform="translate(0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className='relative flex items-center gap-1'>
                      <p className="text-xs text-base-600">
                        <time dateTime="2022-02-08"
                          title="February 8th, 2022">10 hours ago</time>
                      </p>

                      <div>
                        <label className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50">
                          <input type="checkbox" className='sr-only peer' />
                          <svg className="w-4 h-4 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Comment settings</span>

                          <div
                            className="absolute z-10 hidden translate-x-1/2 bg-white divide-y divide-gray-100 rounded shadow peer-checked:block -left-full top-9 w-36">
                            <ul className="py-1 text-sm text-gray-700">
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Edit</a>
                              </li>
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Remove</a>
                              </li>
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Report</a>
                              </li>
                            </ul>
                          </div>
                        </label>
                      </div>
                    </div>
                  </footer>

                  <p className="text-sm text-black t">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor emque laudantium, totam rem aperiam, eaque ipsa quae ab ill
                  </p>

                  <div className="flex items-center mt-4">
                    <button type="button" className="mr-4 text-sm font-semibold text-base-600 hover:underline">
                      Reply
                    </button>

                    <div className='w-6 h-px mr-2 bg-base-400'></div>

                    <button type="button" className="text-sm text-base-600 hover:underline">
                      View replies
                    </button>
                  </div>
                </div>
              </article>

              <article className="flex ml-6 text-base bg-white rounded-lg">
                <div className='flex flex-col items-center self-start justify-center gap-1 mr-2'>
                  <label className='cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />

                    <svg className='text-black pointer-events-none peer-checked:text-purple-800' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
                      <mask id="mask0_2916_43095" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                        <rect x="0.5" width="20" height="20" fill='#D9D9D9' />
                      </mask>
                      <g mask="url(#mask0_2916_43095)">
                        <path d="M7.5 17V11.2083H3.5L10.5 2L17.5 11.2083H13.5V17H7.5ZM9 15.5H12V9.70833H14.4375L10.5 4.4375L6.5625 9.70833H9V15.5Z" className="fill-current" />
                      </g>
                    </svg>
                  </label>

                  <span className='text-xs text-black peer-checked:text-xl'> 5 </span>

                  <label className='cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />
                    <svg className='text-black pointer-events-none peer-checked:text-purple-800' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <g clipPath="url(#clip0_2916_43097)">
                        <mask id="mask0_2916_43097" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                          <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_2916_43097)">
                          <path d="M13.5 3.16162L13.5 8.95329L17.5 8.95329L10.5 18.1616L3.5 8.95329L7.5 8.95329L7.5 3.16162L13.5 3.16162ZM12 4.66162L9 4.66162L9 10.4533L6.5625 10.4533L10.5 15.7241L14.4375 10.4533L12 10.4533L12 4.66162Z" className="fill-current" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_2916_43097">
                          <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </label>
                </div>

                <div>
                  <footer className="flex flex-wrap items-center justify-end mb-2 gap-x-2">
                    <div className="flex items-center mr-auto">
                      <p className="inline-flex items-center mr-1 text-sm text-gray-900">
                        <img
                          className="w-10 h-10 mr-2 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough" />Michael Gough</p>

                      <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <g clipPath="url(#clip0_2916_43107)">
                          <mask id="mask0_2916_43107" maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="14">
                            <rect x="0.5" width="14" height="14" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_2916_43107)">
                            <path d="M5.56061 12.9498L4.46686 11.1415L2.41061 10.6748L2.6002 8.5748L1.2002 6.9998L2.6002 5.4248L2.41061 3.3248L4.46686 2.85814L5.56061 1.0498L7.5002 1.88105L9.43978 1.0498L10.5335 2.85814L12.5898 3.3248L12.4002 5.4248L13.8002 6.9998L12.4002 8.5748L12.5898 10.6748L10.5335 11.1415L9.43978 12.9498L7.5002 12.1186L5.56061 12.9498ZM6.75645 9.0998L10.2273 5.64355L9.48353 4.8998L6.75645 7.6123L5.51686 6.3873L4.77311 7.13105L6.75645 9.0998Z" fill="#2CB1EC" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_2916_43107">
                            <rect width="14" height="14" fill="white" transform="translate(0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className='relative flex items-center gap-1'>
                      <p className="text-xs text-base-600">
                        <time dateTime="2022-02-08"
                          title="February 8th, 2022">10 hours ago</time>
                      </p>

                      <div>
                        <label className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50">
                          <input type="checkbox" className='sr-only peer' />
                          <svg className="w-4 h-4 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Comment settings</span>

                          <div
                            className="absolute z-10 hidden translate-x-1/2 bg-white divide-y divide-gray-100 rounded shadow peer-checked:block -left-full top-9 w-36">
                            <ul className="py-1 text-sm text-gray-700">
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Edit</a>
                              </li>
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Remove</a>
                              </li>
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Report</a>
                              </li>
                            </ul>
                          </div>
                        </label>
                      </div>
                    </div>
                  </footer>

                  <p className="text-sm text-black t">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor emque laudantium, totam rem aperiam, eaque ipsa quae ab ill
                  </p>

                  <div className="flex items-center mt-4">
                    <button type="button" className="mr-4 text-sm font-semibold text-base-600 hover:underline">
                      Reply
                    </button>

                    <div className='w-6 h-px mr-2 bg-base-400'></div>

                    <button type="button" className="text-sm text-base-600 hover:underline">
                      View replies
                    </button>
                  </div>
                </div>
              </article>

              <article className="flex ml-12 text-base bg-white rounded-lg">
                <div className='flex flex-col items-center self-start justify-center gap-1 mr-2'>
                  <label className='cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />

                    <svg className='text-black pointer-events-none peer-checked:text-purple-800' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
                      <mask id="mask0_2916_43095" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                        <rect x="0.5" width="20" height="20" fill='#D9D9D9' />
                      </mask>
                      <g mask="url(#mask0_2916_43095)">
                        <path d="M7.5 17V11.2083H3.5L10.5 2L17.5 11.2083H13.5V17H7.5ZM9 15.5H12V9.70833H14.4375L10.5 4.4375L6.5625 9.70833H9V15.5Z" className="fill-current" />
                      </g>
                    </svg>
                  </label>

                  <span className='text-xs text-black peer-checked:text-xl'> 5 </span>

                  <label className='cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />
                    <svg className='text-black pointer-events-none peer-checked:text-purple-800' xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <g clipPath="url(#clip0_2916_43097)">
                        <mask id="mask0_2916_43097" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                          <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_2916_43097)">
                          <path d="M13.5 3.16162L13.5 8.95329L17.5 8.95329L10.5 18.1616L3.5 8.95329L7.5 8.95329L7.5 3.16162L13.5 3.16162ZM12 4.66162L9 4.66162L9 10.4533L6.5625 10.4533L10.5 15.7241L14.4375 10.4533L12 10.4533L12 4.66162Z" className="fill-current" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_2916_43097">
                          <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </label>
                </div>

                <div>
                  <footer className="flex flex-wrap items-center justify-end mb-2 gap-x-2">
                    <div className="flex items-center mr-auto">
                      <p className="inline-flex items-center mr-1 text-sm text-gray-900">
                        <img
                          className="w-10 h-10 mr-2 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough" />Michael Gough</p>

                      <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <g clipPath="url(#clip0_2916_43107)">
                          <mask id="mask0_2916_43107" maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="14">
                            <rect x="0.5" width="14" height="14" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_2916_43107)">
                            <path d="M5.56061 12.9498L4.46686 11.1415L2.41061 10.6748L2.6002 8.5748L1.2002 6.9998L2.6002 5.4248L2.41061 3.3248L4.46686 2.85814L5.56061 1.0498L7.5002 1.88105L9.43978 1.0498L10.5335 2.85814L12.5898 3.3248L12.4002 5.4248L13.8002 6.9998L12.4002 8.5748L12.5898 10.6748L10.5335 11.1415L9.43978 12.9498L7.5002 12.1186L5.56061 12.9498ZM6.75645 9.0998L10.2273 5.64355L9.48353 4.8998L6.75645 7.6123L5.51686 6.3873L4.77311 7.13105L6.75645 9.0998Z" fill="#2CB1EC" />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_2916_43107">
                            <rect width="14" height="14" fill="white" transform="translate(0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className='relative flex items-center gap-1'>
                      <p className="text-xs text-base-600">
                        <time dateTime="2022-02-08"
                          title="February 8th, 2022">10 hours ago</time>
                      </p>

                      <div>
                        <label className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50">
                          <input type="checkbox" className='sr-only peer' />
                          <svg className="w-4 h-4 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Comment settings</span>

                          <div
                            className="absolute z-10 hidden translate-x-1/2 bg-white divide-y divide-gray-100 rounded shadow peer-checked:block -left-full top-9 w-36">
                            <ul className="py-1 text-sm text-gray-700">
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Edit</a>
                              </li>
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Remove</a>
                              </li>
                              <li>
                                <a href="#"
                                  className="block px-4 py-2 text-xs hover:bg-gray-100">Report</a>
                              </li>
                            </ul>
                          </div>
                        </label>
                      </div>
                    </div>
                  </footer>

                  <p className="text-sm text-black t">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor emque laudantium, totam rem aperiam, eaque ipsa quae ab ill
                  </p>

                  <div className="flex items-center mt-4">
                    <button type="button" className="mr-4 text-sm font-semibold text-base-600 hover:underline">
                      Reply
                    </button>

                    <div className='w-6 h-px mr-2 bg-base-400'></div>

                    <button type="button" className="text-sm text-base-600 hover:underline">
                      View replies
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 ${isOpen ? 'block' : 'hidden'}`} />
    </>
  );
};

const mapState = (state) => ({
  modals: { ...state.modals },
});

const mapDispatch = {
  updateModals,
};

export default connect(mapState, mapDispatch)(AddCommentModal);
