import { updateModals } from "@redux/modals/actions"
import { useDispatch } from "react-redux"

export const JoinRoomButton = ({
  isLivePrivate,
  performer,
  totalFollowers
}: {
  isLivePrivate?: boolean,
  performer: any,
  totalFollowers: number
}) => {
  const dispatch = useDispatch()

  return (
    <>
      <button 
        className='bg-transparent rounded-full border border-white text-white hover:bg-white hover:text-black/90 p-1 px-3'
        onClick={(e) => {
          e.stopPropagation()
          if (isLivePrivate) {
            dispatch(
              updateModals({
                confirmPrivateVideoModal: {
                  isOpen: true,
                  performerInfos: performer,
                  performerTotalFollowers: totalFollowers
                }
              })
            )
            // dispatch(
            //   updateModals({
            //     isNotEnoughRubysLiveModal: true
            //   })
            // )
            return
          }
        }}
      >
        Join room
      </button>
    </>
  )
}