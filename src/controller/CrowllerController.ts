import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import NewsAnalyzer from '../utils/newsAnalyzer';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; //泛匹配
  };
}

const checkLogin = (
  req: RequestWithBody,
  res: Response,
  next: NextFunction
) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, `please login <a href='/'>login</a>`));
  }
};

@controller
class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response) {
    const url = `https://news.ycombinator.com/`;
    const analyzer = NewsAnalyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData(true));
  }

  @get('/showData')
  showData(req: RequestWithBody, res: Response) {
    try {
      const filePath = path.resolve(__dirname, '../../data/news.json');
      const result = fs.readFileSync(filePath, 'utf-8');
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(false, 'get data first'));
    }
  }
}
