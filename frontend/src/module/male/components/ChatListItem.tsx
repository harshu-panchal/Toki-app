import { MaterialSymbol } from '../types/material-symbol';
import type { Chat } from '../types/male.types';

interface ChatListItemProps {
  chat: Chat;
  onClick?: (chatId: string) => void;
}

export const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  const handleClick = () => {
    onClick?.(chat.id);
  };

  const getMessagePreview = () => {
    if (chat.messageType === 'image' || chat.messageType === 'photo') {
      return (
        <p className="text-sm font-normal text-gray-500 dark:text-[#cc8ea3] truncate flex items-center gap-1">
          <MaterialSymbol name="image" size={16} className="text-primary" />
          Sent a photo
        </p>
      );
    }
    return (
      <p
        className={`text-sm truncate pr-4 ${
          chat.hasUnread
            ? 'font-semibold text-gray-800 dark:text-gray-200'
            : 'font-normal text-gray-500 dark:text-gray-400'
        }`}
      >
        {chat.lastMessage}
      </p>
    );
  };

  const getReadStatusIcon = () => {
    if (!chat.readStatus) return null;

    if (chat.readStatus === 'read') {
      return (
        <MaterialSymbol
          name="done_all"
          size={18}
          className={chat.hasUnread ? 'text-primary' : 'text-gray-400 dark:text-gray-600'}
        />
      );
    }
    if (chat.readStatus === 'delivered') {
      return (
        <MaterialSymbol
          name="done_all"
          size={18}
          className="text-gray-400 dark:text-gray-600"
        />
      );
    }
    return (
      <MaterialSymbol
        name="done"
        size={18}
        className="text-gray-400 dark:text-gray-600"
      />
    );
  };

  return (
    <div
      onClick={handleClick}
      className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer mb-1 active:scale-[0.98]"
    >
      <div className="relative shrink-0">
        {/* VIP Ring */}
        {chat.isVIP && (
          <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-[#FFD93D] to-yellow-600 opacity-80" />
        )}
        <img
          alt={`${chat.userName} portrait`}
          className={`h-14 w-14 rounded-full object-cover border-2 border-white dark:border-[#230f16] ${
            chat.isVIP ? 'relative' : ''
          }`}
          src={chat.userAvatar}
        />
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#230f16] z-10" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <h4 className="text-base font-bold text-gray-900 dark:text-white truncate">
              {chat.userName}
            </h4>
            {chat.isVIP && (
              <MaterialSymbol
                name="star"
                filled
                size={16}
                className="text-gold shrink-0"
              />
            )}
          </div>
          <span
            className={`text-xs shrink-0 ml-2 ${
              chat.hasUnread
                ? 'font-medium text-primary'
                : 'text-gray-500 dark:text-[#cc8ea3]'
            }`}
          >
            {chat.timestamp}
          </span>
        </div>
        <div className="flex justify-between items-center">
          {getMessagePreview()}
          {chat.hasUnread && chat.unreadCount ? (
            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary shrink-0 ml-2">
              <span className="text-[10px] font-bold text-white">
                {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
              </span>
            </div>
          ) : (
            <div className="shrink-0 ml-2">{getReadStatusIcon()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

