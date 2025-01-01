import { CameraIcon, VideoIcon, HashtagIcon } from "src/icons"
import { AppButton } from "@components/ui/shared/AppButton";
import { useRouter } from "next/router";

export const FollowingTrendingHeaderTabs = ({
  activeTab,
  updateTab
}: {
  activeTab: string,
  updateTab: (tag: string) => void
}) => {
  const router = useRouter()
  return (
    <header className='pb-3 flex flex-col items-center justify-center  gap-2 w-full flex-wrap mb-8'>
      <h1 className="text-black/90 text-2xl">Following</h1>
      <nav className="w-full md:w-auto bg-gray-200 p-1 rounded-full text-center flex items-center justify-center">
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'following-videos' ? '' : 'bg-transparent'}`} 
          variant="tertiary" 
          onClick={() => {
            updateTab('following-videos')
            router.push(`/following-post?tab=video`)
          }}
        >
          <VideoIcon /> 
          <span>Video</span>
        </AppButton>
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'following-photos' ? '' : 'bg-transparent'}`} 
          variant="tertiary"
          onClick={() => {
            updateTab('following-photos')
            router.push(`/following-post?tab=photo`)
          }}
        >
            <CameraIcon /> 
            <span>Photo</span>
        </AppButton>
      </nav>
    </header>
  )
}