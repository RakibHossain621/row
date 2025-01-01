import { CameraIcon, VideoIcon, HashtagIcon } from "src/icons"
import { AppButton } from "@components/ui/shared/AppButton";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export const LiveNowHeaderTabs = ({
  activeTab,
  updateTab,
  children
}: {
  activeTab: string,
  updateTab: (tag: string) => void,
  children: ReactNode
}) => {
  const router = useRouter()
 
  return (
    <header className='pb-3 flex items-start justify-between gap-2 w-full flex-wrap'>
      <nav className="w-full md:w-auto bg-gray-200 p-1 rounded-full text-center flex items-center justify-center">
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center max-w-full w-[215px] ${activeTab === 'public' ? '' : 'bg-transparent'}`} 
          variant="tertiary" 
          size="sm"
          onClick={() => {
            updateTab('public')
            router.push(`/live-now?tab=public`)
          }}
        >
          <VideoIcon /> 
          <span className="whitespace-nowrap">Free live video cams</span>
        </AppButton>
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center max-w-full w-[215px] ${activeTab === 'private' ? '' : 'bg-transparent'}`} 
          variant="tertiary"
          size="sm"
          onClick={() => {
            updateTab('private')
            router.push(`/live-now?tab=private`)
          }}
        >
            <CameraIcon /> 
            <span>Private 1 on 1</span>
        </AppButton>
      </nav>
      {children}
    </header>
  )
}