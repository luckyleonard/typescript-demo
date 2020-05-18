import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/util';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; //泛匹配
  };
}

@controller('/api')
export class LoginController {
  static isLogin(req: RequestWithBody): boolean {
    return req.session ? req.session.login : false;
  }

  @get('/isLogin')
  isLogin(req: RequestWithBody, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    const result = getResponseData<responseResult.isLogin>(isLogin);
    res.json(result);
  }

  @post('/login')
  login(req: RequestWithBody, res: Response): void {
    const { password, username } = req.body;
    const isLogin: boolean = req.session ? req.session.login : false;
    if (isLogin) {
      res.json(getResponseData(true));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData<responseResult.login>(true));
      } else {
        res.json(
          getResponseData<responseResult.login>(false, 'wrong password')
        );
      }
    }
  }

  @get('/logout')
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<responseResult.logout>(true));
  }
}
