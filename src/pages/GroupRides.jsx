import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Users, Plus, MapPin } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function GroupRides() {
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setError('');
      const snapshot = await getDocs(collection(db, 'groups'));
      const groupsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupsData);
    } catch (err) {
      console.error('Error fetching groups:', err);
      setError('Failed to load groups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setError('');
      setSubmitting(true);
      await addDoc(collection(db, 'groups'), {
        name: groupName,
        leaderId: currentUser.uid,
        members: [currentUser.uid],
        createdAt: new Date(),
      });
      setGroupName('');
      setShowForm(false);
      fetchGroups();
    } catch (err) {
      console.error('Error creating group:', err);
      setError('Failed to create group. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#EAF6FF]">Group Rides</h1>
          <p className="mt-2 text-gray-400">Join or create group rides</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Group
        </button>
      </div>

      {error && (
        <div className="bg-[#FF2E2E]/20 border border-[#FF2E2E] rounded-lg p-4 text-[#FF2E2E]">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <h2 className="text-xl font-semibold text-[#EAF6FF] mb-4">Create New Group</h2>
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#EAF6FF] mb-2">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                placeholder="Weekend Warriors"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-[#1a2332] text-[#EAF6FF] rounded-md hover:bg-[#0B0F14]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create Group'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {groups.length === 0 ? (
        <div className="bg-[#121A22] rounded-lg p-12 border border-[#1a2332] text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No groups yet. Create your first group!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
              <h3 className="text-xl font-semibold text-[#EAF6FF] mb-4">{group.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{group.members?.length || 0} members</span>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6]">
                  View Map
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
