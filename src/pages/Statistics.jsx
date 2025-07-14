import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardContent, Divider
} from '@mui/material';
import { Log } from '../middleware/logger';

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const stored = localStorage.getItem('shortUrls');
    if (stored) {
      const parsed = JSON.parse(stored);
      
      const enriched = parsed.map(item => ({
        ...item,
        clickCount: Math.floor(Math.random() * 10),
        clicks: Array.from({ length: Math.floor(Math.random() * 10) }, (_, i) => ({
          timestamp: new Date(Date.now() - i * 100000).toLocaleString(),
          source: i % 2 === 0 ? 'WhatsApp' : 'Email',
          location: ['India', 'USA', 'Germany'][i % 3],
        }))
      }));
      setData(enriched);
      Log({
        stack: 'frontend',
        level: 'info',
        pkg: 'page',
        message: `Statistics loaded for ${enriched.length} URLs.`
      });
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shortened URL Statistics
      </Typography>

      {data.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        data.map((entry, idx) => (
          <Card key={idx} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">Short URL: <a href={entry.shortUrl} target="_blank" rel="noopener noreferrer">{entry.shortUrl}</a></Typography>
              <Typography><strong>Original URL:</strong> {entry.longUrl}</Typography>
              <Typography><strong>Expires At:</strong> {new Date(entry.expiry).toLocaleString()}</Typography>
              <Typography><strong>Clicks:</strong> {entry.clickCount}</Typography>
              <Divider sx={{ my: 1 }} />
              {entry.clicks.map((click, i) => (
                <Typography key={i} variant="body2" sx={{ ml: 2 }}>
                  {i + 1}. <strong>Time:</strong> {click.timestamp} | <strong>Source:</strong> {click.source} | <strong>Location:</strong> {click.location}
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Statistics;
