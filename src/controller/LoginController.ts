import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, post } from './decorator';
import { getResponseData } from '../utils/util';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; //泛匹配
  };
}

@controller
class LoginController {
  @get('/')
  home(req: Request, res: Response) {
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
  }

  @get('/logout')
  logout(req: Request, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }

  @post('/login')
  login(req: RequestWithBody, res: Response) {
    const { password, username } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.json(getResponseData(false, 'repeat login'));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(false, 'wrong password'));
      }
    }
  }
}
