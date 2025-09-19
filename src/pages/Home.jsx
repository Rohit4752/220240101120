import React, { useState } from 'react';
import { Typography } from '@mui/material';
import ShortenForm from '../components/ShortenForm';
import UrlList from '../components/UrlList';

export default function Home() {
  const [tick, setTick] = useState(0);
  return (
    <div>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <Typography variant="body2" gutterBottom>
        Shorten up to 5 URLs. All data is stored in your browser's localStorage.
      </Typography>

      <ShortenForm onUpdate={() => setTick(t => t + 1)} />
      {/* key forces re-render when updated */}
      <UrlList key={tick} onChange={() => setTick(t => t + 1)} />
    </div>
  );
}
