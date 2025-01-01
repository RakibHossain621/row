import { AppButton } from "@components/ui/shared/AppButton"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { CameraIcon, HashtagIcon, VideoIcon } from "src/icons"

export const BroadcasterTopHeader = ({
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
      <h1 className="text-black/90 text-2xl">Broadcaster Dashboard</h1>
      <nav className="w-full md:w-auto bg-gray-200 p-1 rounded-full text-center flex items-center justify-center">
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'dashboard' ? '' : 'bg-transparent'}`} 
          variant="tertiary" 
          onClick={() => {
            updateTab('dashboard')
          }}
        >
          <span>Dashboard</span>
        </AppButton>
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'verification' ? '' : 'bg-transparent'}`} 
          variant="tertiary"
          onClick={() => {
            updateTab('verification')
          }}
        >
            <span className="whitespace-nowrap">ID documents</span>
        </AppButton>
        <AppButton 
          className={`flex-1 border-0 flex items-center justify-center ${activeTab === 'settings' ? '' : 'bg-transparent'}`} 
          variant="tertiary" 
          onClick={() => {
            updateTab('settings')
          }}
        >
          <span>Settings</span>
        </AppButton>
      </nav>
      {/* Search Children */}
      {children && children}
    </header>
  )
}