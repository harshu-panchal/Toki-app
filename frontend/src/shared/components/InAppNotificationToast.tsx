import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../core/context/GlobalStateContext';
import { MaterialSymbol } from './MaterialSymbol';

export const InAppNotificationToast = () => {
    const { notifications, clearNotification, user } = useGlobalState();
    const navigate = useNavigate();

    if (notifications.length === 0) return null;

    const handleNotificationClick = (notification: any) => {
        clearNotification(notification.id);

        if (notification.type === 'message' && notification.chatId) {
            const role = user?.role === 'female' ? 'female' : 'male';
            navigate(`/${role}/chat/${notification.chatId}`);
        }
    };

    return (
        <div className="fixed top-4 left-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className="pointer-events-auto bg-white dark:bg-[#2d1a24] rounded-2xl p-4 shadow-xl border border-pink-200 dark:border-pink-900/30 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 active:scale-95 transition-transform"
                >
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-xl">
                        <MaterialSymbol
                            name={notification.type === 'message' ? 'chat' : notification.type === 'gift' ? 'redeem' : 'notifications'}
                            className="text-pink-500"
                            size={24}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {notification.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {notification.message}
                        </p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <MaterialSymbol name="close" size={20} className="text-gray-400" />
                    </button>
                </div>
            ))}
        </div>
    );
};
