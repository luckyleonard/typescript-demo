import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Crowller from './crowller';
import NewsAnalyzer from './newsAnalyzer';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
    //泛匹配
  };
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`    
    <html>
      <body>
        <a href='/getData'>get data</a>
        <a href='/showData'>show data</a>
        <a href='/logout'>logout</a>
      </body>
    </html>`);
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action = "/login">
          username:
          <input type="text" name="username"/>
          password:
          <input type="password" name="password"/>
          <button>login</button>
        </form>
      </body>
    </html>
  `);
  }
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password, username } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send('you still login');
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.send('login success');
    } else {
      res.send('login fail');
    }
  }
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
});

router.get('/getData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const url = `https://news.ycombinator.com/`;
    const analyzer = NewsAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.send('get data Success!');
  } else {
    res.send(`please login <a href='/'>login</a>`);
  }
});

router.get('/showData', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    try {
      const filePath = path.resolve(__dirname, '../data/news.json');
      const result = fs.readFileSync(filePath, 'utf-8');
      res.json(JSON.parse(result));
    } catch (e) {
      res.send(`get data first <a href='/getData'>get data</a>`);
    }
  } else {
    res.send(`please login <a href='/'>login</a>`);
  }
});

export default router;
