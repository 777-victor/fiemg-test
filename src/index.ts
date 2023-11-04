import { Request, Response } from 'express';
import { createServer } from './server';

const server = createServer();

const port = process.env.PORT || 3000;

server.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
