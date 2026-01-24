import { Music as MusicIcon, Play, Pause } from 'lucide-react';

export default function Music() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#EAF6FF]">Music Sync</h1>
        <p className="mt-2 text-gray-400">Synchronize music with your group</p>
      </div>

      <div className="bg-[#121A22] rounded-lg p-12 border border-[#1a2332] text-center">
        <MusicIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400 mb-6">Music sync feature coming soon</p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6] inline-flex items-center">
            <Play className="w-5 h-5 mr-2" />
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
