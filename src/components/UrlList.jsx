import React, { useEffect, useState } from 'react';
import { getStoredUrls, deleteUrl } from '../services/storage';
import {
  Card, CardContent, Typography, IconButton, Stack,
  Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UrlList({ onChange }) {
  const [list, setList] = useState([]);

  const refresh = () => setList(getStoredUrls());

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
  };

  const handleOpen = (shortUrl) => {
    window.open(shortUrl, '_blank');
  };

  const handleDelete = (id) => {
    deleteUrl(id);
    refresh();
    if (onChange) onChange();
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Your Shortened URLs</Typography>

        {list.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No shortened URLs yet.</Typography>
        ) : (
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(item => (
                <TableRow key={item.id}>
                  <TableCell style={{ wordBreak: 'break-all' }}>{item.shortUrl}</TableCell>
                  <TableCell style={{ wordBreak: 'break-all' }}>{item.originalUrl}</TableCell>
                  <TableCell>{item.clicks || 0}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" onClick={() => handleCopy(item.shortUrl)} title="Copy"><FileCopyIcon /></IconButton>
                      <IconButton size="small" onClick={() => handleOpen(item.shortUrl)} title="Open"><OpenInNewIcon /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(item.id)} title="Delete"><DeleteIcon /></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
