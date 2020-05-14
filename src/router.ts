import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import NewsAnalyzer from './newsAnalyzer';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action = "/getData">
          <input type="password" name="password"/>
          <button>submit</button>
        </form>
      </body>
    </html>
  `);
});

router.post('/getData', (req: Request, res: Response) => {
  if (req.body.password === '123') {
    const url = `https://news.ycombinator.com/`;
    const analyzer = NewsAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('get data Success!');
  } else {
    res.send('your password is incorrect');
  }
});

export default router;
