import { CountdownTimer } from './CountdownTimer';
import { Launch } from '../types/launch';
import { Rocket, MapPin, Calendar } from 'lucide-react';


interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const launchDate = new Date(launch.net).toLocaleString();

  return (
    <div style={{
      border: '1px solid #333',
      padding: '1.5rem',
      borderRadius: '8px',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#4fc3f7' }}>{launch.name}</h3>
      
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#aaa' }}>
        <strong>Status:</strong> {launch.status.name}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ddd' }}>
          <Rocket size={16} color="#4fc3f7" />
          <span>{launch.rocket.configuration.full_name} ({launch.launch_service_provider.name})</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ddd' }}>
          <MapPin size={16} color="#ff8a65" />
          <span>{launch.pad.location.name}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ddd' }}>
          <Calendar size={16} color="#aed581" />
          <span>{launchDate}</span>
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <CountdownTimer targetDate={launch.net} />
        </div>
      </div>
    </div>
  );
}