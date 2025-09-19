import React, { useState } from 'react';
import { TextField, Button, Stack, Alert } from '@mui/material';
import { isValidUrl, generateCode } from '../utils/shortener';
import { getStoredUrls, saveUrl } from '../services/storage';

export default function ShortenForm({ onUpdate }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    let url = input.trim();
    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    // If user forgot scheme, add https:// (good UX)
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

    if (!isValidUrl(url)) {
      setError('Malformed URL.');
      return;
    }

    const existing = getStoredUrls();
    if (existing.length >= 5) {
      setError('You can only shorten up to 5 URLs at once.');
      return;
    }

    let code = generateCode();
    while (existing.find(x => x.id === code)) code = generateCode();

    const entry = {
      id: code,
      originalUrl: url,
      shortUrl: `${window.location.origin}/${code}`,
      createdAt: new Date().toISOString(),
      clicks: 0
    };

    saveUrl(entry);
    setSuccess('URL shortened successfully — short link copied to clipboard if allowed.');
    setInput('');
    // copy to clipboard (best-effort)
    navigator.clipboard?.writeText(entry.shortUrl).catch(() => { /* ignore */ });

    if (onUpdate) onUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Enter URL to shorten"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          placeholder="https://example.com or example.com"
        />

        <Stack direction="row" spacing={1}>
          <Button variant="contained" type="submit">Shorten</Button>
          <Button variant="outlined" onClick={() => { setInput(''); setError(''); setSuccess(''); }}>Clear</Button>
        </Stack>
      </Stack>
    </form>
  );
}
