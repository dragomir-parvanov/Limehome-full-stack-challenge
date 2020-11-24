import express from 'express';
import path from 'path';
export const configureClientServing = (app: ReturnType<typeof express>) => {
  app.get('*', (req, res) => {
    const fileUrl = req.originalUrl === '/' ? '/index.html' : req.originalUrl;
    res.sendFile(
      path.resolve('dist/limehome-full-stack-challenge-client' + fileUrl) // can't use express.static, atleast on windows
    );
  });
};
