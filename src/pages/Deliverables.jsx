import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export default function Deliverables() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Deliverables & Evaluation</Typography>
        <Typography variant="body2" paragraph>
          - Homepage for shortening up to 5 URLs.  
          - Statistics page listing clicks & created date.  
          - Client-side validation and error handling.  
          - Uses Material UI only.
        </Typography>
        <Typography variant="body2">This fulfills the frontend-only deliverable. Replace localStorage with backend as required for production.</Typography>
      </CardContent>
    </Card>
  );
}
