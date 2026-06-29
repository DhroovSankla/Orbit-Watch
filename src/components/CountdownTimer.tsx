import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string; 
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  // Helper to calculate the difference between now and the launch time
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    // Ticks every 1 second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return <span style={{ color: '#aed581', fontWeight: 'bold' }}>🚀 Launched / Window Open</span>;
  }

  return (
    <div style={{ 
      fontSize: '0.95rem', 
      color: '#ffb74d', 
      fontFamily: 'monospace', 
      backgroundColor: '#2a2a2a', 
      padding: '0.4rem 0.8rem', 
      borderRadius: '4px',
      display: 'inline-block'
    }}>
      T-minus {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}