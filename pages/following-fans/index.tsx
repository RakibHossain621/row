import React, { useCallback, useEffect } from "react";
import { connect, useDispatch,} from "react-redux";
import { AppButton } from "@components/ui/shared/AppButton";
import { updateTabValue } from "@redux/ui/actions";


const TrendingHeaderTabs: React.FC<{ handleTabChange: (tab: any) => void, selectedTabIndex: number; user: any ,performer }> = ({ handleTabChange, selectedTabIndex, user,performer }) => {
  const dispatch = useDispatch();
  const handleTabClick = useCallback(
    (tab: string, tabIndex: number) => {
      if (selectedTabIndexs !== tabIndex) {
        handleTabChange(tab);
        dispatch(updateTabValue(tabIndex));
      }
     
    },
    [handleTabChange, selectedTabIndex]
  );

  const selectedTabIndexs = Number(selectedTabIndex)
  
  useEffect(() => {

    if (selectedTabIndexs === 2 || selectedTabIndexs === 3) {
      const tab = selectedTabIndexs === 2 ? "follower" : "following";
      handleTabChange(tab);
    }
  }, [selectedTabIndexs]);

  

  return (
    <header className="pb-3 flex flex-col items-center justify-center gap-2 w-full flex-wrap">
      <nav className="w-full md:w-auto bg-gray-200 p-1 rounded-full text-center flex items-center justify-center">
        <AppButton
          className={`flex-1 border-0 flex items-center justify-center ${selectedTabIndexs === 2 ? "" : "bg-transparent"
            }`}
          variant="tertiary"
          onClick={() => handleTabClick("follower", 2)}
        >
          <div className="flex gap-3">
            <span>Fans</span>
            <span>{performer.stats.totalFollower}</span>
          </div>
        </AppButton>

        <AppButton
          className={`flex-1 border-0 flex items-center justify-center ${selectedTabIndexs === 3 ? "" : "bg-transparent"
            }`}
          variant="tertiary"
          onClick={() => handleTabClick("following", 3)}
        >
          <div className="flex gap-3">
            <span>Following</span>
            <span>{performer.stats.totalFollowing}</span>
          </div>
        </AppButton>
      </nav>
    </header>
  );
};

const mapStates = (state: any) => ({
  selectedTabIndex: state.ui.selectedTabIndex,
  user: { ...state.user.current }
})

const mapDispatch = {
  updateTabValue
}

export default connect(mapStates, mapDispatch)(TrendingHeaderTabs);
