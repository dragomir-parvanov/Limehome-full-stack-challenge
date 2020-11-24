import express from 'express';
import path from 'path';
export const configureClientServing = (app: ReturnType<typeof express>) => {
  const clientPath = path.join(
    '../../../../limehome-full-stack-challenge-client/'
  );
  app.use('*.*', express.static(clientPath, { maxAge: '1y' }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientPath, 'index.html'));
  });
};
