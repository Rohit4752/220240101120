import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { incrementClicks } from '../services/storage';
import { Typography, CircularProgress, Alert } from '@mui/material';

export default function RedirectHandler() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('redirecting');

  useEffect(() => {
    const entry = incrementClicks(code);
    if (entry) {
      // small pause for UX, then navigate to original
      setTimeout(() => {
        window.location.replace(entry.originalUrl);
      }, 700);
    } else {
      // not found -> show an error and go home after 1.2s
      setStatus('notfound');
      setTimeout(() => navigate('/'), 1200);
    }
    // eslint-disable-next-line
  }, [code]);

  if (status === 'notfound') {
    return <Alert severity="error">Short code not found. Redirecting to home...</Alert>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>Redirecting to original URL...</Typography>
    </div>
  );
}
