import { INotification } from "@interfaces/notification"
import { formatDate, formatDateFromnow } from "@lib/date"
import { setUnreadsNotification } from "@redux/notification/actions"
import { notificationService } from "@services/notification.service"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { connect } from "react-redux"

interface NotificationProps{
  setUnreadsNotification:Function
}

 const NotificationsList = ({ setUnreadsNotification } : NotificationProps) => {
  const router = useRouter()

  const [notifications, setNotifications] = useState<INotification[]>([])
  const [totalUnread, setTotalUnread] = useState(0)

  const getNotificationData = async () => {
    const notificationsResponse = await notificationService.search({})

    const totalNotificationsUnreadResponse = await notificationService.countUnread()

    setNotifications(notificationsResponse.data.data)
    setTotalUnread(totalNotificationsUnreadResponse.data)
  }

  const handleReadNotification = async (notificationId: string, type: string, refId: string) => {
    await notificationService.read(notificationId)

    if (type === 'comment' || type === 'created') {
      router.push(`/post/${refId}`)
    }
  }

  const handleReadAllNotifications = async () => {
    await notificationService.readAll();
    setUnreadsNotification(false)
  }

  useEffect(() => {
    getNotificationData()
  }, [])

  return (
    <section className="w-full p-6">
      <h1 className="text-black/90 text-2xl pb-6">Notifications</h1>

      <nav className="flex items-center gap-3 pb-4">
        <h2>Total unread: {totalUnread}</h2>
        <button className="cursor-pointer ml-auto p-2 border font-semibold" onClick={handleReadAllNotifications}>Mark as read</button>
        <button className="cursor-pointer p-2 border font-semibold" onClick={() => router.push('/notification-setting')}>Settings</button>
      </nav>
      <div className="flex flex-col gap-3 ">
        {notifications.map((notification) => (
          <button onClick={() => handleReadNotification(notification._id, notification.type, notification.refId)} className={`cursor-pointer w-full rounded p-4 flex items-start justify-start ${notification.read ? '' : 'bg-purple-100'}`} key={notification._id}>
            <img className="w-10 h-10 rounded-full" src={notification.thumbnail} alt="Notification Thumbnail" />
            <div className="px-4">
              <p className="text-black font-semibold pb-1">{notification.title}</p>
              <p className="text-left">{formatDateFromnow(notification.createdAt as unknown as Date)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}


const mapState = (state: any) => ({
  user: { ...state.user.current },
  ui: { ...state.ui },
});

const mapDispatch = {
  setUnreadsNotification
};

export default connect(mapState, mapDispatch)(NotificationsList)