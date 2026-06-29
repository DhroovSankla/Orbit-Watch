import { useEffect, useState } from 'react';
import { fetchUpcomingLaunches } from '../../services/spaceDevsApi';
import { Launch } from '../../types/launch';
import { LaunchCard } from '../../components/LaunchCard'; // Imported our new component

export function Dashboard() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Added typed search state
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    launch.rocket.configuration.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '5rem' }}>Ignition sequence start... Loading launch data...</div>;
  if (error) return <div style={{ color: '#ff5252', textAlign: 'center', marginTop: '5rem' }}>Error loading telemetry: {error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>🚀 OrbitWatch Dashboard</h1>
      <h2 style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem', marginBottom: '2rem' }}>Upcoming Global Rocket Launches</h2>
      
  
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search missions or rockets (e.g., Falcon, Starlink)..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#222',
            color: '#fff',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredLaunches.length > 0 ? (
          filteredLaunches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No upcoming launches match your search criteria.</p>
        )}
      </div>
    </div>
  );
}