import { CameraIcon, VideoIcon, HashtagIcon } from "src/icons"
import { AppButton } from "@components/ui/shared/AppButton";
import { useRouter } from "next/router";

export const TrendingHeaderTabs = ({
  activeTab,
  updateTab
}: {
  activeTab: string,
  updateTab: (tag: string) => void
}) => {
  const router = useRouter()
  return (
    <header className='pb-3 flex flex-col items-center justify-center  gap-2 w-full flex-wrap'>
      <h1 className="text-black/90 text-2xl">Trending</h1>
      <nav className="w-full md:w-auto bg-gray-200 p-1 rounded-full text-center flex items-center justify-center">
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'trending-videos' ? '' : 'bg-transparent'}`} 
          variant="tertiary" 
          onClick={() => {
            updateTab('trending-videos')
            router.push(`/trending?tab=video`)
          }}
        >
          <VideoIcon /> 
          <span>Video</span>
        </AppButton>
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'trending-photos' ? '' : 'bg-transparent'}`} 
          variant="tertiary"
          onClick={() => {
            updateTab('trending-photos')
            router.push(`/trending?tab=photo`)
          }}
        >
            <CameraIcon /> 
            <span>Photo</span>
        </AppButton>
      </nav>
    </header>
  )
}