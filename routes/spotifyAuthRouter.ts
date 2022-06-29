import express, { Router, Request, Response, NextFunction } from 'express';
import querystring from 'query-string';
import { SpotifyCodeRequest } from '../types';

import { generateRandomString } from '../utils';

const spotifyAuthRouter: Router = express.Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URL;

const stateKey = 'spotify_auth_state';
const scopes = [
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-follow-modify',
  'user-follow-read',
  'user-read-recently-played',
  'user-read-playback-position',
  'user-top-read',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'app-remote-control',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
  'user-library-read'
].join(' ');

spotifyAuthRouter.use((req: SpotifyCodeRequest, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now());
  if (req.query.code) {
    const code = req.query.code as string;
    req.code = code;
  }
  next();
});

spotifyAuthRouter.get('/auth-code', (req: SpotifyCodeRequest, res: Response) => {
  if (!req.code) {
    res.status(500).send({ error: 'Something went wrong!' });
  }

  res.redirect('/auth-code');
});

spotifyAuthRouter.get('/login', function (req: Request, res: Response) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scopes,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

export default spotifyAuthRouter;
