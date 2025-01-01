import { IModals } from "@interfaces/modals"
import { updateModals } from "@redux/modals/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"

interface ToggleModalProps {
  modals: IModals
}
export const TogglePhotoAndVideoCreatePost = ({modals}: ToggleModalProps) => {
  const dispatch = useDispatch()
  const [isDropdown, setIsDropdown] = useState(false)
  return (
    <li className="relative z-10">
      <button onClick={() => setIsDropdown(!isDropdown)} className="flex items-center justify-center w-full h-10 gap-2 px-4 my-5 text-sm text-white transition bg-purple-800 border hover:bg-purple-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 focus:ring-purple-800">
        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <g clipPath="url(#a)">
            <path fill="#fff" d="M11 5H9v4H5v2h4v4h2v-4h4V9h-4V5Z" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h20v20H0z" />
            </clipPath>
          </defs>
        </svg>

        <span> Add video/photo</span>
      </button>
      {isDropdown ? 
        <div className="bg-white absolute top-[101%] left-0 right-0 m-auto flex flex-col items-center justify-center rounded-lg border z-50">
          <button 
            className="px-2 py-3 hover:bg-purple-200 w-full rounded-t-lg"
            onClick={() => {
              setIsDropdown(false)
              dispatch(
                updateModals({
                  uploadPhotoModal: {
                    ...modals.uploadPhotoModal,
                    isOpen: true,
                  }
                }
              ))
            }}
          >
            Add Photo
          </button>
          <button 
            className="px-2 py-3 hover:bg-purple-200 w-full rounded-b-lg"
            onClick={() => {
              setIsDropdown(false)
              dispatch(updateModals({
                uploadVideoModal: {
                  ...modals.uploadVideoModal,
                  isOpen: true
                }
              }))
            }}
          >
            Add Video
          </button>
        </div>
      : null}
    </li>
  )
}