import React, { useEffect, useState } from 'react';
import { getStoredUrls } from '../services/storage';
import { Typography, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function Stats() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getStoredUrls());
  }, []);

  const total = list.length;
  const totalClicks = list.reduce((s, i) => s + (i.clicks || 0), 0);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Statistics</Typography>

      <Card>
        <CardContent>
          <Typography variant="subtitle1">Total shortened: {total}</Typography>
          <Typography variant="subtitle1">Total clicks: {totalClicks}</Typography>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map(i => (
                <TableRow key={i.id}>
                  <TableCell style={{ wordBreak: 'break-all' }}>{i.shortUrl}</TableCell>
                  <TableCell style={{ wordBreak: 'break-all' }}>{i.originalUrl}</TableCell>
                  <TableCell>{i.clicks || 0}</TableCell>
                  <TableCell>{new Date(i.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
