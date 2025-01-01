import { TrofeoIcon, CameraIcon, VideoIcon } from "src/icons"
import { AppButton } from "@components/ui/shared/AppButton";
import { ReactNode } from "react";

export const ModelTopHeader = ({
  handleTabChange,
  activeTab,
  children
}: {
  handleTabChange: (tab: any) => Promise<void>,
  activeTab: string,
  children: ReactNode
}) => {
  return (
    <header className='md:pb-3 flex flex-col items-start justify-center md:justify-between md:flex-row gap-2 w-full flex-wrap'>
      <div className="flex items-center justify-center gap-4 flex-col md:flex-row w-full md:w-auto lg:mr-8 md:mr-6">
        <h1 className="text-black/90 text-2xl">Most Viewed</h1>
        <nav className="w-full md:w-auto bg-gray-200 p-1 rounded-full text-center flex items-center justify-center">
          <AppButton 
            className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'model' ? '' : 'bg-transparent'}`} 
            variant="tertiary" 
            onClick={() => handleTabChange('model')}
          >
              <TrofeoIcon /> 
              <span>Models</span>
          </AppButton>
          <AppButton 
            className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'video' ? '' : 'bg-transparent'}`} 
            variant="tertiary"
            onClick={() => handleTabChange('video')}
          >
              <VideoIcon /> 
              <span>Video</span>
          </AppButton>
          <AppButton 
            className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'photo' ? '' : 'bg-transparent'}`} 
            variant="tertiary" 
            onClick={() => handleTabChange('photo')}
          >
              <CameraIcon /> 
              <span>Photo</span>
          </AppButton>
        </nav>
      </div>
      {/* Search Children */}
      {children}
    </header>
  )
}