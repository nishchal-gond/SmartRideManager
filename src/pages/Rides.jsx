import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Bike, Plus, MapPin, Clock } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Rides() {
  const { currentUser } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    distance: '',
    duration: '',
  });

  useEffect(() => {
    fetchRides();
  }, [currentUser]);

  const fetchRides = async () => {
    if (!currentUser) return;

    try {
      setError('');
      const ridesQuery = query(
        collection(db, 'rides'),
        where('userId', '==', currentUser.uid)
      );
      const snapshot = await getDocs(ridesQuery);
      const ridesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRides(ridesData);
    } catch (err) {
      console.error('Error fetching rides:', err);
      setError('Failed to load rides. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setError('');
      setSubmitting(true);
      await addDoc(collection(db, 'rides'), {
        ...formData,
        userId: currentUser.uid,
        distance: parseFloat(formData.distance),
        duration: parseInt(formData.duration),
        createdAt: new Date(),
      });
      setFormData({ name: '', distance: '', duration: '' });
      setShowForm(false);
      fetchRides();
    } catch (err) {
      console.error('Error adding ride:', err);
      setError('Failed to add ride. Please try again.');
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
          <h1 className="text-3xl font-bold text-[#EAF6FF]">My Rides</h1>
          <p className="mt-2 text-gray-400">Track your cycling activities</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Ride
        </button>
      </div>

      {error && (
        <div className="bg-[#FF2E2E]/20 border border-[#FF2E2E] rounded-lg p-4 text-[#FF2E2E]">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
          <h2 className="text-xl font-semibold text-[#EAF6FF] mb-4">Add New Ride</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#EAF6FF] mb-2">Ride Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                placeholder="Morning Ride"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#EAF6FF] mb-2">Distance (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#EAF6FF] mb-2">Duration (min)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                />
              </div>
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
                    Adding...
                  </>
                ) : (
                  'Add Ride'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {rides.length === 0 ? (
        <div className="bg-[#121A22] rounded-lg p-12 border border-[#1a2332] text-center">
          <Bike className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No rides yet. Start tracking your rides!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <div key={ride.id} className="bg-[#121A22] rounded-lg p-6 border border-[#1a2332]">
              <h3 className="text-xl font-semibold text-[#EAF6FF] mb-4">{ride.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{ride.distance} km</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{ride.duration} minutes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
