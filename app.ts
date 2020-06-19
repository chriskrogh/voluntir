import express, { Request, Response } from 'express';
import path from 'path';
import UserRouter from './src/routers/user';
import MediaRouter from './src/routers/media';
import CommunityRouter from './src/routers/community';
import EventRouter from './src/routers/event';
import 'dotenv/config';

// create server
const app = express();

// set client directory
const clientBuild = 'client/build';
const CLIENT_DIR = (path.basename(__dirname) === 'build')
  ? `../${clientBuild}`
  : clientBuild;

// use cors if in dev mode
if(process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('cors')());
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, CLIENT_DIR)));
app.use(express.json());

app.use(UserRouter);
app.use(MediaRouter);
app.use(CommunityRouter);
app.use(EventRouter);

// The "catchall" handler: for a request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, CLIENT_DIR, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log(`Server listening on ${PORT}`);
