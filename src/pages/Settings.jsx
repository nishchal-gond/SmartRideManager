import { useAuth } from '../contexts/AuthContext';
import { User, Bell, Shield } from 'lucide-react';

export default function Settings() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#EAF6FF]">Settings</h1>
        <p className="mt-2 text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-[#00F0FF] mr-2" />
            <h2 className="text-xl font-semibold text-[#EAF6FF]">Account</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={currentUser?.email || ''}
                disabled
                className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-[#00F0FF] mr-2" />
            <h2 className="text-xl font-semibold text-[#EAF6FF]">Notifications</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-[#EAF6FF]">Ride reminders</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-[#EAF6FF]">Maintenance alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-[#EAF6FF]">Group ride invitations</span>
            </label>
          </div>
        </div>

        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-[#00F0FF] mr-2" />
            <h2 className="text-xl font-semibold text-[#EAF6FF]">Privacy</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-[#EAF6FF]">Share location in group rides</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-[#EAF6FF]">Make profile public</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
