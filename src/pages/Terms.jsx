import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export default function Terms() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Terms & Conditions</Typography>
        <Typography variant="body2" paragraph>
          This is a demo URL shortener for coursework. All shortened links and statistics are stored locally on your device.
        </Typography>
        <Typography variant="body2">Do not store confidential information. Use responsibly.</Typography>
      </CardContent>
    </Card>
  );
}
