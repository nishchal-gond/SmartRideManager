import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Bike, MapPin, Clock, Users, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalRides: 0,
    totalDistance: 0,
    activeGroups: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;

      try {
        // Fetch user's rides
        const ridesQuery = query(
          collection(db, 'rides'),
          where('userId', '==', currentUser.uid)
        );
        const ridesSnapshot = await getDocs(ridesQuery);
        
        const rides = ridesSnapshot.docs.map(doc => doc.data());
        const totalDistance = rides.reduce((sum, ride) => sum + (ride.distance || 0), 0);

        // Fetch active groups
        const groupsQuery = query(
          collection(db, 'groups'),
          where('members', 'array-contains', currentUser.uid)
        );
        const groupsSnapshot = await getDocs(groupsQuery);

        setStats({
          totalRides: rides.length,
          totalDistance: Math.round(totalDistance),
          activeGroups: groupsSnapshot.size,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  const quickActions = [
    { icon: Bike, label: 'Start Ride', path: '/rides', color: 'bg-[#00F0FF]' },
    { icon: Users, label: 'Group Ride', path: '/group-rides', color: 'bg-[#00F0FF]' },
    { icon: Music, label: 'Music Sync', path: '/music', color: 'bg-[#00F0FF]' },
    { icon: MapPin, label: 'View Map', path: '/group-rides', color: 'bg-[#00F0FF]' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#EAF6FF]">Dashboard</h1>
        <p className="mt-2 text-gray-400">Welcome back, {currentUser?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Rides</p>
              <p className="text-3xl font-bold text-[#EAF6FF] mt-2">{stats.totalRides}</p>
            </div>
            <Bike className="w-12 h-12 text-[#00F0FF]" />
          </div>
        </div>

        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Distance</p>
              <p className="text-3xl font-bold text-[#EAF6FF] mt-2">{stats.totalDistance} km</p>
            </div>
            <MapPin className="w-12 h-12 text-[#00F0FF]" />
          </div>
        </div>

        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Groups</p>
              <p className="text-3xl font-bold text-[#EAF6FF] mt-2">{stats.activeGroups}</p>
            </div>
            <Users className="w-12 h-12 text-[#00F0FF]" />
          </div>
        </div>
      </div>

      <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
        <h2 className="text-xl font-semibold text-[#EAF6FF] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="flex flex-col items-center justify-center p-6 bg-[#0B0F14] rounded-lg border border-[#1a2332] hover:border-[#00F0FF] transition-colors"
              >
                <Icon className={`w-8 h-8 ${action.color} text-[#0B0F14] p-2 rounded-lg mb-2`} />
                <span className="text-sm text-[#EAF6FF]">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
