import { Request } from 'express';

export type SpotifyCodeRequest = Request & {
  code?: string;
};
