import React from 'react';
import { BackIcon } from './icons';

interface SettingsScreenProps {
  onBack: () => void;
  onEnableNotifications: () => void;
  notificationPermission: NotificationPermission;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onEnableNotifications, notificationPermission }) => {
  
  const renderNotificationStatus = () => {
    switch (notificationPermission) {
      case 'granted':
        return (
          <div className="text-center p-4 bg-green-500/20 text-green-300 rounded-lg">
            <p className="font-semibold">الإشعارات مفعلة.</p>
            <p className="text-sm">ستتلقى إشعارًا عند إضافة تلاوات جديدة.</p>
          </div>
        );
      case 'denied':
        return (
          <div className="text-center p-4 bg-red-500/20 text-red-300 rounded-lg">
            <p className="font-semibold">الإشعارات محظورة.</p>
            <p className="text-sm">للحصول على التحديثات، يرجى تفعيل الإشعارات من إعدادات المتصفح الخاص بك.</p>
          </div>
        );
      case 'default':
      default:
        return (
            <button 
              onClick={onEnableNotifications}
              className="w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors text-lg shadow-lg shadow-cyan-500/30"
            >
              تفعيل الإشعارات
            </button>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      <header className="flex items-center mb-6">
        <button onClick={onBack} aria-label="Go back" className="p-2 rounded-full hover:bg-slate-700 transition-colors">
          <BackIcon className="w-8 h-8 text-cyan-400" />
        </button>
        <h2 className="text-3xl font-bold text-center flex-grow text-cyan-400 pr-10">الإعدادات</h2>
      </header>
      <div className="space-y-4 bg-slate-800/50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-slate-100">إشعارات التلاوات الجديدة</h3>
        {renderNotificationStatus()}
      </div>
    </div>
  );
};

export default SettingsScreen;
