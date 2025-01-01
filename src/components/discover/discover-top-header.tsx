import { CameraIcon, VideoIcon, HashtagIcon } from "src/icons"
import { AppButton } from "@components/ui/shared/AppButton";
import { ReactNode } from "react";
import { useRouter } from "next/router";

export const DiscoverTopHeader = ({
  activeTab,
  updateTab,
  children
}: {
  activeTab: string,
  updateTab: (tag: string) => void,
  children?: ReactNode
}) => {
  const router = useRouter()
  return (
    <header className='md:pb-3 flex flex-col items-start justify-center md:justify-between md:flex-row gap-2 w-full flex-wrap'>
      <div className="flex items-center justify-center gap-4 flex-col md:flex-row w-full md:w-auto lg:mr-8 md:mr-6">
        <h1 className="text-black/90 text-2xl">Discover</h1>
        <nav className="w-full md:w-auto bg-gray-200 p-1 rounded-full text-center flex items-center justify-center">
          <AppButton 
            className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'video' ? '' : 'bg-transparent'}`} 
            variant="tertiary" 
            onClick={() => {
              router.push(`/discover?tab=video`)
              updateTab('video')
            }}
          >
            <VideoIcon /> 
            <span>Video</span>
          </AppButton>
          <AppButton 
            className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'photo' ? '' : 'bg-transparent'}`} 
            variant="tertiary"
            onClick={() => {
              router.push(`/discover?tab=photo`)
              updateTab('photo')
            }}
          >
              <CameraIcon /> 
              <span>Photo</span>
          </AppButton>
          {/* <AppButton 
            className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'hashtag' ? '' : 'bg-transparent'}`} 
            variant="tertiary" 
            onClick={() => {
              router.push(`/discover?tab=hashtag`)
              updateTab('hashtag')
            }}
          >
            <HashtagIcon />
            <span>Hashtag</span>
          </AppButton> */}
        </nav>
      </div>
      {/* Search Children */}
      {children && children}
    </header>
  )
}