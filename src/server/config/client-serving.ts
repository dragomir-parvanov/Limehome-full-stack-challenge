import express from 'express';
import path from 'path';
export const configureClientServing = (app: ReturnType<typeof express>) => {
  const clientPath = path.join(
    '../../../../limehome-full-stack-challenge-client/'
  );
  app.get('*', express.static(clientPath));
};
