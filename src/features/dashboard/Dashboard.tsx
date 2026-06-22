import { useEffect, useState } from 'react';
import { fetchUpcomingLaunches } from '../../services/spaceDevsApi';
import { Launch } from '../../types/launch';
import { Rocket, MapPin } from 'lucide-react'; 

export function Dashboard() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpcomingLaunches()
      .then((data) => {
        setLaunches(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Ignition sequence start... Loading launch data...</div>;
  if (error) return <div>Error loading telemetry: {error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1> OrbitWatch Dashboard</h1>
      <h2>Upcoming Global Rocket Launches</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
        {launches.map((launch) => (
          <div 
            key={launch.id} 
            style={{ border: '1px solid #ccc', padding: '1.5rem', borderRadius: '8px' }}
          >
            <h3>{launch.name}</h3>
            <p style={{ color: '#666' }}>
              <strong>Status:</strong> {launch.status.name}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', color: '#444' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Rocket size={16} /> {launch.rocket.configuration.full_name}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={16} /> {launch.pad.location.name}
              </span>
            </div>
            
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#777' }}>
              Launch Window: {new Date(launch.net).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}